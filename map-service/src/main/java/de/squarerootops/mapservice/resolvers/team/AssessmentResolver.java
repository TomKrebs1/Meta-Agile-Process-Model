package de.squarerootops.mapservice.resolvers.team;

import de.squarerootops.mapservice.context.CustomGraphQLContext;
import de.squarerootops.mapservice.models.dtos.PersonAssessmentDto;
import de.squarerootops.mapservice.models.dtos.TeamDto;
import de.squarerootops.mapservice.services.AssessmentService;
import graphql.kickstart.tools.GraphQLResolver;
import graphql.schema.DataFetchingEnvironment;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@AllArgsConstructor
public class AssessmentResolver implements GraphQLResolver<TeamDto> {

  private final AssessmentService assessmentService;

  @Transactional
  public Set<PersonAssessmentDto> personAssessments(TeamDto teamDto, DataFetchingEnvironment environment) {

    CustomGraphQLContext context = environment.getContext();

    return assessmentService.getAssessmentsFromPersonInTeam(teamDto.getId(), context.getUserId());
  }
}
