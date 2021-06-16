package de.squarerootops.mapservice.models.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ProjectAttribute {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private boolean visionary;
  private boolean creative;
  private boolean costConscious;
  private boolean criticallyQuestioning;
  private boolean structured;
  private boolean analytical;
  private boolean planning;
  private boolean implementationOriented;

  @OneToOne(mappedBy = "projectAttribute")
  private Attribute attribute;
}
