package de.squarerootops.mapservice.models.entities;

import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Person {

  @Id
  private String id;
  private String userName;
  private String firstName;
  private String lastName;

  private boolean darkModeOn;

  @ManyToMany(mappedBy = "teamMembers")
  private List<Team> joinedTeams;

  @OneToMany(mappedBy = "assessmentOwner")
  private Set<PersonAssessment> personAssessments;

  @OneToMany(mappedBy = "assessmentTarget")
  private Set<PersonAssessment> foreignAssessments;

  @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinColumn(name = "attribute_id", referencedColumnName = "id")
  private Attribute attribute;

  public Person() {
    this.attribute = new Attribute();
    this.joinedTeams = new LinkedList<>();
  }

  public Person(String id, String userName) {
    this();
    this.id = id;
    this.userName = userName;
  }

  public ProjectAttribute getProjectAttribute() {
    return attribute.getProjectAttribute();
  }

  public GeneralAttribute getGeneralAttribute() {
    return attribute.getGeneralAttribute();
  }


}
