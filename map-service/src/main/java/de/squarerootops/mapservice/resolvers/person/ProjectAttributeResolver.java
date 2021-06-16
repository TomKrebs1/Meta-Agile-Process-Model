package de.squarerootops.mapservice.resolvers.person;

import de.squarerootops.mapservice.models.dtos.PersonDto;
import de.squarerootops.mapservice.models.entities.ProjectAttribute;
import de.squarerootops.mapservice.services.ProjectAttributeService;
import graphql.kickstart.tools.GraphQLResolver;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ProjectAttributeResolver implements GraphQLResolver<PersonDto> {

  private final ProjectAttributeService projectAttributeService;

  public ProjectAttributeResolver(
      ProjectAttributeService projectAttributeService) {
    this.projectAttributeService = projectAttributeService;
  }

  public ProjectAttribute projectAttribute(PersonDto person) {
    return projectAttributeService.getProjectAttributeByPerson(person);
  }
}
