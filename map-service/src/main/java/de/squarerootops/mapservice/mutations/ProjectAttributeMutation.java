package de.squarerootops.mapservice.mutations;

import de.squarerootops.mapservice.models.entities.ProjectAttribute;
import de.squarerootops.mapservice.models.input.ProjectAttributeInput;
import de.squarerootops.mapservice.services.ProjectAttributeService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import org.springframework.stereotype.Component;

@Component
public class ProjectAttributeMutation implements GraphQLMutationResolver {

  private ProjectAttributeService projectAttributeService;

  public ProjectAttributeMutation(ProjectAttributeService projectAttributeService) {
    this.projectAttributeService = projectAttributeService;
  }

  public ProjectAttribute updateProjectAttribute(ProjectAttributeInput projectAttributeInput) {
    return projectAttributeService.updateProjectAttribute(projectAttributeInput);
  }
}
