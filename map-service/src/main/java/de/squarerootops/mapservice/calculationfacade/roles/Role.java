package de.squarerootops.mapservice.calculationfacade.roles;

import de.squarerootops.mapservice.calculationfacade.enums.AttributeEnum;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.Getter;

@Getter
public class Role {

  public static final String[] IGNORED_PROPERTIES = {"id", "person", "class"};
  private final String roleName;
  private Map<RoleMapping, Integer> roleCalculationMap;

  public Role(String roleName, Map<AttributeEnum, Integer> general,
      List<AttributeEnum> project) {
    this.roleName = roleName;
    this.roleCalculationMap = init(general, project);
  }

  private Map<RoleMapping, Integer> init(
      Map<AttributeEnum, Integer> generalAttributeMap, List<AttributeEnum> projectAtributeList) {
    Map<RoleMapping, Integer> roleMap = new HashMap<>();

    for (var gen : generalAttributeMap.entrySet()) {
      for (var proj : projectAtributeList) {
        roleMap.put(new RoleMapping(gen.getKey(), proj), gen.getValue());
      }
    }
    return roleMap;
  }
}
