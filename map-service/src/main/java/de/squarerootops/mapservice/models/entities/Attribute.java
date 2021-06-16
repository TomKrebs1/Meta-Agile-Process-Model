package de.squarerootops.mapservice.models.entities;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Attribute {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "generalAttribute_id", referencedColumnName = "id")
  private GeneralAttribute generalAttribute;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "projectAttribute_id", referencedColumnName = "id")
  private ProjectAttribute projectAttribute;

  public Attribute() {
    this.generalAttribute = new GeneralAttribute();
    this.projectAttribute = new ProjectAttribute();
  }
}
