package de.squarerootops.mapservice.models.entities;

import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Team {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private String teamName;
  private String inviteToken;

  @ManyToMany
  @JoinTable(name = "team_membership",
      joinColumns = @JoinColumn(name = "team_id"),
      inverseJoinColumns = @JoinColumn(name = "person_id"))
  private List<Person> teamMembers;

  @OneToMany(mappedBy = "team")
  private Set<PersonAssessment> personAssessments;

  public Team() {
    this.inviteToken = UUID.randomUUID().toString();
    this.teamMembers = new LinkedList<>();
  }

  public void addNewPersonToTeam(Person person) {
    teamMembers.add(person);
  }
}
