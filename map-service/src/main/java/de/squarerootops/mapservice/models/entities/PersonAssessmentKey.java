package de.squarerootops.mapservice.models.entities;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@NoArgsConstructor
@Embeddable
public class PersonAssessmentKey implements Serializable {

  @Column(name = "assessmentOwner_id")
  String assessmentOwnerId;

  @Column(name = "team_id")
  Long teamId;

  @Column(name = "assessmentTarget_id")
  String assessmentTargetId;

  public String getAssessmentOwnerId() {
    return assessmentOwnerId;
  }

  public void setAssessmentOwnerId(String assessmentOwnerId) {
    this.assessmentOwnerId = assessmentOwnerId;
  }

  public Long getTeamId() {
    return teamId;
  }

  public void setTeamId(Long teamId) {
    this.teamId = teamId;
  }

  public String getAssessmentTargetId() {
    return assessmentTargetId;
  }

  public void setAssessmentTargetId(String assessmentTargetId) {
    this.assessmentTargetId = assessmentTargetId;
  }
}
