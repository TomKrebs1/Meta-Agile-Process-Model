package de.squarerootops.mapservice.resolvers.team;

import de.squarerootops.mapservice.models.dtos.PersonDto;
import de.squarerootops.mapservice.models.dtos.TeamDto;
import de.squarerootops.mapservice.services.TeamService;
import graphql.kickstart.tools.GraphQLResolver;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@AllArgsConstructor
public class PersonResolver implements GraphQLResolver<TeamDto> {

  private final TeamService teamService;

  public List<PersonDto> teamMembers(TeamDto team) {
    return teamService.getTeamMembers(team.getId());
  }
}
