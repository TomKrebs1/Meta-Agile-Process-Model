package de.squarerootops.mapservice.resolvers;

import de.squarerootops.mapservice.models.dtos.AssessmentCalculationDto;
import de.squarerootops.mapservice.services.AssessmentService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class AssessmentQueryResolver implements GraphQLQueryResolver {

  private final AssessmentService assessmentService;

  public List<AssessmentCalculationDto> getAssessmentCalculationForTeam(long teamId) {
    return assessmentService.getCalculatedAssessmentsForTeam(teamId);
  }
}
