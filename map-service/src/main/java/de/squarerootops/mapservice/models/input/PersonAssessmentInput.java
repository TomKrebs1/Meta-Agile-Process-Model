package de.squarerootops.mapservice.models.input;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class PersonAssessmentInput {

  private String assessmentOwnerId;
  private String assessmentTargetId;
  private long teamId;

  private boolean isActive;

}
