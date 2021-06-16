package de.squarerootops.mapservice.services;

import de.squarerootops.mapservice.calculationfacade.AffinityHolder;
import de.squarerootops.mapservice.calculationfacade.MapCalculationFacade;
import de.squarerootops.mapservice.exceptions.NoTeamFoundException;
import de.squarerootops.mapservice.models.dtos.AssessmentCalculationDto;
import de.squarerootops.mapservice.models.dtos.PersonAssessmentDto;
import de.squarerootops.mapservice.models.dtos.PersonDto;
import de.squarerootops.mapservice.models.dtos.RoleDto;
import de.squarerootops.mapservice.models.entities.Person;
import de.squarerootops.mapservice.models.entities.PersonAssessment;
import de.squarerootops.mapservice.models.entities.PersonAssessmentKey;
import de.squarerootops.mapservice.models.entities.Team;
import de.squarerootops.mapservice.models.input.PersonAssessmentInput;
import de.squarerootops.mapservice.repositories.PersonAssessmentRepositorie;
import de.squarerootops.mapservice.repositories.TeamRepositorie;
import de.squarerootops.mapservice.services.utils.ServiceUtils;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class AssessmentService {

  private final PersonAssessmentRepositorie personAssessmentRepositorie;

  private final PersonService personService;
  private final TeamRepositorie teamRepositorie;

  @Transactional
  public PersonAssessmentDto saveNewPersonAssessment(PersonAssessmentInput input) {
    Person assessmentOwner = personService.getPersonFromDb(input.getAssessmentOwnerId());
    Person assessmentTarget = personService.getPersonFromDb(input.getAssessmentTargetId());
    Team team = teamRepositorie.findById(input.getTeamId()).orElseThrow(
        () -> new NoTeamFoundException(
            String.format("No Team found for ID %s", input.getTeamId()))
    );

    if (!validatePersonAreMembersOfTeam(team, assessmentOwner, assessmentTarget)) {
      throw new RuntimeException("Persons not in Team");
    }

    PersonAssessmentKey key = getKeyFromInput(input);

    PersonAssessment savedAssessment = personAssessmentRepositorie
        .save(createNewPersonAssessment(key, assessmentOwner, assessmentTarget, team));
    return new PersonAssessmentDto(savedAssessment);
  }

  public Set<PersonAssessmentDto> getAssessmentsFromPersonInTeam(Long teamId, String userId) {
    Set<PersonAssessment> personAssessmentSet =
        personAssessmentRepositorie.findAllByAssessmentOwnerIdAndTeamId(userId, teamId);
    return personAssessmentSet.stream()
        .map((PersonAssessmentDto::getFromPersonAssessment))
        .collect(Collectors.toSet());
  }

  @Transactional
  public PersonAssessmentDto updatePersonAssessment(PersonAssessmentInput personAssessmentInput) {
    PersonAssessmentKey key = getKeyFromInput(personAssessmentInput);
    PersonAssessment personAssessment = personAssessmentRepositorie.findById(key).orElseThrow(
        () -> new NoSuchElementException(
            String.format("No Assessment found for %s", key)));
    PersonAssessment assessment = personAssessmentRepositorie
        .save(ServiceUtils.copyAttributes(personAssessmentInput, personAssessment));
    return PersonAssessmentDto.getFromPersonAssessment(assessment);
  }

  @Transactional
  public List<AssessmentCalculationDto> getCalculatedAssessmentsForTeam(long teamId) {
    MapCalculationFacade mapCalculationFacade = new MapCalculationFacade();
    List<AssessmentCalculationDto> calculationDtoList = new ArrayList<>();

    List<PersonAssessmentDto> assessmentDtos =
        personAssessmentRepositorie.findAllByTeamId(teamId).stream()
            .map(PersonAssessmentDto::getFromPersonAssessment)
            .collect(Collectors.toList());

    Set<PersonDto> personSet = assessmentDtos.stream()
        .map(PersonAssessmentDto::getAssessmentTarget)
        .collect(Collectors.toSet());

    for (var person : personSet) {
      Map<String, AffinityHolder> affinityMapForUser =
          mapCalculationFacade.getAffinityMapForUser(assessmentDtos, person.getId());

      List<RoleDto> roleDtos = affinityMapForUser.entrySet().stream()
          .map(a -> new RoleDto(a.getKey(), a.getValue()))
          .collect(Collectors.toList());
      calculationDtoList.add(new AssessmentCalculationDto(person.getId(), teamId, roleDtos));
    }
    return calculationDtoList;
  }

  private PersonAssessmentKey getKeyFromInput(PersonAssessmentInput input) {
    PersonAssessmentKey key = new PersonAssessmentKey();
    BeanUtils.copyProperties(input, key);
    return key;
  }

  private Boolean validatePersonAreMembersOfTeam(Team team, Person... persons) {
    return Arrays.stream(persons).allMatch((person) -> team.getTeamMembers().contains(person));
  }

  private PersonAssessment createNewPersonAssessment(PersonAssessmentKey key,
      Person assessmentOwner, Person assessmentTarget, Team team) {

    if (personAssessmentRepositorie.existsById(key)) {
      throw new RuntimeException("Assessment already exists");
    }

    PersonAssessment personAssessment = new PersonAssessment(key);
    personAssessment.setAssessmentOwner(assessmentOwner);
    personAssessment.setAssessmentTarget(assessmentTarget);
    personAssessment.setTeam(team);

    if (assessmentOwner.getId().equals(assessmentTarget.getId())) {
      personAssessment.setAttribute(assessmentOwner.getAttribute());
      personAssessment.setActive(true);
    }

    return personAssessment;
  }
}
