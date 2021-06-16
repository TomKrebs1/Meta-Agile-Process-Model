package de.squarerootops.mapservice.mutations;

import de.squarerootops.mapservice.models.dtos.PersonAssessmentDto;
import de.squarerootops.mapservice.models.input.PersonAssessmentInput;
import de.squarerootops.mapservice.services.AssessmentService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@AllArgsConstructor
public class PersonAssessmentMutation implements GraphQLMutationResolver {

  private final AssessmentService assesmentService;

  public PersonAssessmentDto addPersonAssessment(PersonAssessmentInput personAssessmentInput) {
    log.info("new Assessment arrived for {} from {}", personAssessmentInput.getAssessmentTargetId(),
        personAssessmentInput.getAssessmentOwnerId());
    return assesmentService.saveNewPersonAssessment(personAssessmentInput);
  }

  public PersonAssessmentDto updatePersonAssessment(PersonAssessmentInput personAssessmentInput) {
    log.info("Assessment updated for {} from {}", personAssessmentInput.getAssessmentTargetId(),
        personAssessmentInput.getAssessmentOwnerId());
    return assesmentService.updatePersonAssessment(personAssessmentInput);
  }
}
