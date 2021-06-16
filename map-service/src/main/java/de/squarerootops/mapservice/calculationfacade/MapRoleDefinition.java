package de.squarerootops.mapservice.calculationfacade;

import static de.squarerootops.mapservice.calculationfacade.enums.AttributeEnum.analytical;
import static de.squarerootops.mapservice.calculationfacade.enums.AttributeEnum.communication;
import static de.squarerootops.mapservice.calculationfacade.enums.AttributeEnum.costConscious;
import static de.squarerootops.mapservice.calculationfacade.enums.AttributeEnum.creative;
import static de.squarerootops.mapservice.calculationfacade.enums.AttributeEnum.criticallyQuestioning;
import static de.squarerootops.mapservice.calculationfacade.enums.AttributeEnum.experience;
import static de.squarerootops.mapservice.calculationfacade.enums.AttributeEnum.implementationOriented;
import static de.squarerootops.mapservice.calculationfacade.enums.AttributeEnum.planning;
import static de.squarerootops.mapservice.calculationfacade.enums.AttributeEnum.resilience;
import static de.squarerootops.mapservice.calculationfacade.enums.AttributeEnum.structured;
import static de.squarerootops.mapservice.calculationfacade.enums.AttributeEnum.visionary;

import de.squarerootops.mapservice.calculationfacade.enums.AttributeEnum;
import de.squarerootops.mapservice.calculationfacade.roles.Role;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import lombok.Getter;

@Getter
public class MapRoleDefinition {

  private final String roleDefinitionName;

  private final List<Role> activeRoles;

  public MapRoleDefinition(String roleDefinitionName) {
    this.roleDefinitionName = roleDefinitionName;
    this.activeRoles = roleListInit();
  }

  private List<Role> roleListInit() {
    List<Role> roleList = new ArrayList<>();

    Map<AttributeEnum, Integer> teamworkerMap = Map.of(resilience, 1, experience, 1);
    roleList.add(new Role("teamworker", teamworkerMap, Arrays.asList(implementationOriented)));

    Map<AttributeEnum, Integer> communicatorMap = Map.of(communication, 3, experience, 1);
    roleList.add(new Role("communicator", communicatorMap, Arrays.asList(structured, analytical)));

    Map<AttributeEnum, Integer> expertMap = Map.of(experience, 2, communication, 1);
    roleList.add(new Role("expert", expertMap, Arrays.asList(structured, analytical, planning, implementationOriented)));

    Map<AttributeEnum, Integer> troubleShooterMap = Map.of(resilience, 3, experience, 1);
    roleList.add( new Role("troubleShooter", troubleShooterMap, Arrays.asList(criticallyQuestioning, structured, analytical)));

    Map<AttributeEnum, Integer> creativeMap = Map.of(experience, 3);
    roleList.add( new Role("creativeMind", creativeMap, Arrays.asList(visionary, creative)));

    Map<AttributeEnum, Integer> qualityMap = Map.of(experience, 2, communication,  1);
    roleList.add( new Role("qualityTester", qualityMap, Arrays.asList(costConscious, criticallyQuestioning, structured)));

    return roleList;
  }
}
