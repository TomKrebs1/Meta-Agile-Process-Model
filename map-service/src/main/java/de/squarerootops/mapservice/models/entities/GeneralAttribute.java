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
public class GeneralAttribute {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private boolean communication;
  private boolean experience;
  private boolean resilience;

  @OneToOne(mappedBy = "generalAttribute")
  private Attribute attribute;
}
