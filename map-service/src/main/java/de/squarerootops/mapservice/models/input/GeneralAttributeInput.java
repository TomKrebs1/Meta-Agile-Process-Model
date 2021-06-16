package de.squarerootops.mapservice.models.input;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class GeneralAttributeInput {

  private Long id;

  private Boolean communication;
  private Boolean experience;
  private Boolean resilience;
}
