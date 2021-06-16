package de.squarerootops.mapservice.mutations;

import de.squarerootops.mapservice.models.dtos.TeamDto;
import de.squarerootops.mapservice.models.input.JoinTeamInput;
import de.squarerootops.mapservice.models.input.TeamInput;
import de.squarerootops.mapservice.services.TeamService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import org.springframework.stereotype.Component;

@Component
public class TeamMutation implements GraphQLMutationResolver {

  private final TeamService teamService;

  public TeamMutation(TeamService teamService) {
    this.teamService = teamService;
  }

  TeamDto addNewTeam(TeamInput teamInput) {
    return teamService.addNewTeam(teamInput);
  }

  public TeamDto personTeamJoin(JoinTeamInput joinTeamInput) {
    return teamService.joinTeamWithToken(joinTeamInput);
  }
}
