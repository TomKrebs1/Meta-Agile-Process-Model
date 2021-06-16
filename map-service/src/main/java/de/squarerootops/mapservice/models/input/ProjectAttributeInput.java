package de.squarerootops.mapservice.models.input;

import lombok.Data;
import lombok.Getter;
import lombok.Value;

@Data
@Getter
public class ProjectAttributeInput {

  private Long id;

  private Boolean visionary;
  private Boolean creative;
  private Boolean costConscious;
  private Boolean criticallyQuestioning;
  private Boolean structured;
  private Boolean analytical;
  private Boolean planning;
  private Boolean implementationOriented;


}
