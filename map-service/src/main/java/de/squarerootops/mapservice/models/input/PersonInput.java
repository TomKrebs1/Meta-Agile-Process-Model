package de.squarerootops.mapservice.models.input;

import lombok.Value;

@Value
public class PersonInput {

  private String id;
  private String userName;
  private String firstName;
  private String lastName;
  private boolean darkModeOn;
}
