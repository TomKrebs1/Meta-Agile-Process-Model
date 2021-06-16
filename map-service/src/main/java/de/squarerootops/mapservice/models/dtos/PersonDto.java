package de.squarerootops.mapservice.models.dtos;

import de.squarerootops.mapservice.models.entities.GeneralAttribute;
import de.squarerootops.mapservice.models.entities.Person;
import de.squarerootops.mapservice.models.entities.ProjectAttribute;
import java.util.List;
import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.beans.BeanUtils;

@Data
@SuperBuilder
public class PersonDto {

  private String id;
  private String userName;
  private String firstName;
  private String lastName;

  private boolean darkModeOn;

  private ProjectAttribute projectAttribute;

  private GeneralAttribute generalAttribute;

  private List<TeamDto> joinedTeams;

  public PersonDto(Person person) {
    BeanUtils.copyProperties(person, this);
  }
}
