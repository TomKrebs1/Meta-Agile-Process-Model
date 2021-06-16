package de.squarerootops.mapservice.calculationfacade.roles;

import de.squarerootops.mapservice.calculationfacade.enums.AttributeEnum;
import lombok.Getter;

@Getter
public class RoleMapping {

  private final AttributeEnum generalAttribute;
  private final AttributeEnum projectAttribute;

  public RoleMapping(AttributeEnum generalAttribute, AttributeEnum projectAttribute) {
    this.generalAttribute = generalAttribute;
    this.projectAttribute = projectAttribute;
  }
}
