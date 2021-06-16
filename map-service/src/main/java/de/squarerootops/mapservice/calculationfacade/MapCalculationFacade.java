package de.squarerootops.mapservice.calculationfacade;

import de.squarerootops.mapservice.calculationfacade.roles.Role;
import de.squarerootops.mapservice.calculationfacade.roles.RoleMapping;
import de.squarerootops.mapservice.models.dtos.PersonAssessmentDto;
import de.squarerootops.mapservice.services.utils.ServiceUtils;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.stream.Collectors;

public class MapCalculationFacade {

  public Map<String, AffinityHolder> getAffinityMapForUser(List<PersonAssessmentDto> assessmentList,
      String userId) {

    Map<String, AffinityHolder> affinityMap = new HashMap<>();
    Map<String, Integer> mergedAssessments = mergeAssessmentsForUser(assessmentList, userId);
    List<Role> mapRoleDefinition = new MapRoleDefinition("MAP").getActiveRoles();

    int assessmentCount = (int) assessmentList.stream()
        .filter(assessment -> assessment.getAssessmentTarget().getId().equals(userId))
        .count();

    for (Role role : mapRoleDefinition) {
      affinityMap.put(role.getRoleName(),
          calculateAffinityForRole(role, mergedAssessments, assessmentCount));
    }
    return affinityMap;
  }

  protected Map<String, Integer> mergeAssessmentsForUser(List<PersonAssessmentDto> assessmentList,
      String userId) {
    return assessmentList
        .parallelStream()
        .filter(assessment -> assessment.getAssessmentTarget().getId().equals(userId))
        .map(this::convertAssessmentsToMap)
        .flatMap(m -> m.entrySet().stream())
        .collect(Collectors.toMap(Entry::getKey, Entry::getValue, Integer::sum));
  }

  private AffinityHolder calculateAffinityForRole(Role role, Map<String, Integer> mergedAssessments,
      int assessmentCount) {
    Set<Entry<RoleMapping, Integer>> roleCalculationMap =
        role.getRoleCalculationMap().entrySet().stream()
            .filter(a -> a.getValue() != 0)
            .collect(Collectors.toSet());

    Map<String, Integer> filtertEntrys = mergedAssessments.entrySet().stream()
        .filter(a -> a.getValue() >= 2)
        .collect(Collectors.toMap(Entry::getKey, Entry::getValue));

    int maximumAffinity = roleCalculationMap.stream()
        .mapToInt(Entry::getValue)
        .sum() * assessmentCount;

    float roleAffinity = 0f;
    float averageRoleAffinity = 0f;
    for (var item : roleCalculationMap) {
      if (checkIfRoleKeyMatch(item.getKey(), filtertEntrys)) {
        roleAffinity += getMinValueOfRoleMapping(item.getKey(), filtertEntrys) * item.getValue();
      }
      averageRoleAffinity +=
          (getSumOfRoleMapping(item.getKey(), mergedAssessments) / 2f) * item.getValue();
    }
    float affinity = roleAffinity / maximumAffinity;
    float averageAffinity = averageRoleAffinity / maximumAffinity;

    return AffinityHolder.builder()
        .affinity(BigDecimal.valueOf(affinity).setScale(2, RoundingMode.HALF_UP)
            .floatValue())
        .averageAffinity(BigDecimal.valueOf(averageAffinity).setScale(2, RoundingMode.HALF_UP)
            .floatValue())
        .build();
  }

  private int getMinValueOfRoleMapping(RoleMapping roleMapping,
      Map<String, Integer> mergedAssessments) {
    int general = mergedAssessments.get(roleMapping.getGeneralAttribute().toString());
    int project = mergedAssessments.get(roleMapping.getProjectAttribute().toString());

    return Integer.min(general, project);
  }

  private int getSumOfRoleMapping(RoleMapping roleMapping, Map<String, Integer> mergedAssessments) {
    int general = mergedAssessments.get(roleMapping.getGeneralAttribute().toString());
    int project = mergedAssessments.get(roleMapping.getProjectAttribute().toString());

    return general + project;
  }

  private boolean checkIfRoleKeyMatch(RoleMapping roleMapping,
      Map<String, Integer> mergedAssessments) {
    return mergedAssessments.containsKey(roleMapping.getGeneralAttribute().toString())
        && mergedAssessments.containsKey(roleMapping.getProjectAttribute().toString());
  }

  private Map<String, Integer> convertAssessmentsToMap(PersonAssessmentDto assessmentDto) {
    return ServiceUtils
        .mergeGerneralAndProjectAttributes(assessmentDto.getGeneralAttribute(),
            assessmentDto.getProjectAttribute());
  }
}
