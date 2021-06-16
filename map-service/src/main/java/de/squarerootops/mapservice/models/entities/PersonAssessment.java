package de.squarerootops.mapservice.models.entities;

import javax.persistence.CascadeType;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PersonAssessment {

  @EmbeddedId
  private PersonAssessmentKey id;

  @ManyToOne
  @MapsId("assessmentOwnerId")
  @JoinColumn(name = "assessmentOwner_id")
  private Person assessmentOwner;

  @ManyToOne
  @MapsId("teamId")
  @JoinColumn(name = "team_id")
  private Team team;

  @ManyToOne
  @MapsId("assessmentTargetId")
  @JoinColumn(name = "assessmentTarget_id")
  private Person assessmentTarget;

  @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinColumn(name = "attribute_id", referencedColumnName = "id")
  private Attribute attribute;

  private boolean isActive;

  public PersonAssessment(PersonAssessmentKey key) {
    this.id = key;
    this.attribute = new Attribute();
  }

  public GeneralAttribute getGeneralAttribute() {
    return attribute.getGeneralAttribute();
  }

  public ProjectAttribute getProjectAttribute() {
    return attribute.getProjectAttribute();
  }

}
