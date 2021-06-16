package de.squarerootops.mapservice.models.input;

import lombok.Value;

@Value
public class JoinTeamInput {

  private String teamToken;
  private String personId;
}
