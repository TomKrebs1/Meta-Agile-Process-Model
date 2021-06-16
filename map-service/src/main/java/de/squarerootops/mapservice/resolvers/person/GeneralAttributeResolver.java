package de.squarerootops.mapservice.resolvers.person;

import de.squarerootops.mapservice.models.dtos.PersonDto;
import de.squarerootops.mapservice.models.entities.GeneralAttribute;
import de.squarerootops.mapservice.services.GeneralAttributeService;
import graphql.kickstart.tools.GraphQLResolver;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class GeneralAttributeResolver implements GraphQLResolver<PersonDto> {

  private final GeneralAttributeService generalAttributeService;

  public GeneralAttributeResolver(
      GeneralAttributeService generalAttributeService) {
    this.generalAttributeService = generalAttributeService;
  }

  public GeneralAttribute generalAttribute(PersonDto person) {
    return generalAttributeService.getGeneralAttributeByPerson(person);
  }
}
