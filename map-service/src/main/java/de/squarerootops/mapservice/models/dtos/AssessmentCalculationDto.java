package de.squarerootops.mapservice.models.dtos;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AssessmentCalculationDto {

  private String personId;
  private long teamId;
  private List<RoleDto> roles;
}
