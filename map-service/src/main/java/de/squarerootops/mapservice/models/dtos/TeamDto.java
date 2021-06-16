package de.squarerootops.mapservice.models.dtos;

import de.squarerootops.mapservice.models.entities.PersonAssessment;
import de.squarerootops.mapservice.models.entities.Team;
import java.util.List;
import java.util.Set;
import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.beans.BeanUtils;

@Data
@SuperBuilder
public class TeamDto {

  private long id;

  private String teamName;
  private String inviteToken;

  private List<PersonDto> teamMembers;

  private Set<PersonAssessmentDto> personAssessments;

  public TeamDto(Team team) {
    BeanUtils.copyProperties(team, this);
  }
}
