package de.squarerootops.mapservice.models.dtos;

import de.squarerootops.mapservice.calculationfacade.AffinityHolder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
public class RoleDto {

  private String roleName;
  private Float affinity;
  private Float averageAffinity;

  public RoleDto(String roleName, AffinityHolder affinityHolder) {
    this.roleName = roleName;
    this.affinity = affinityHolder.getAffinity();
    this.averageAffinity = affinityHolder.getAverageAffinity();
  }
}
