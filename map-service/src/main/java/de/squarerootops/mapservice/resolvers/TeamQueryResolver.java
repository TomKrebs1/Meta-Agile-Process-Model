package de.squarerootops.mapservice.resolvers;

import de.squarerootops.mapservice.models.dtos.TeamDto;
import de.squarerootops.mapservice.services.TeamService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class TeamQueryResolver implements GraphQLQueryResolver {

  private final TeamService teamService;

  public TeamQueryResolver(TeamService teamService) {
    this.teamService = teamService;
  }

  @Transactional
  public TeamDto getTeam(Long id) {
    TeamDto team = teamService.getTeamById(id);
    return team;
  }
}
