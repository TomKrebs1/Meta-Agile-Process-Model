package de.squarerootops.mapservice.models.input;

import lombok.Value;

@Value
public class TeamInput {

  private long id;
  private String teamName;
  private String personToCreate;
}
