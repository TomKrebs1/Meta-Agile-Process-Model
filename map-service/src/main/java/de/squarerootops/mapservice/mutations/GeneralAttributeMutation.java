package de.squarerootops.mapservice.mutations;

import de.squarerootops.mapservice.models.entities.GeneralAttribute;
import de.squarerootops.mapservice.models.input.GeneralAttributeInput;
import de.squarerootops.mapservice.services.GeneralAttributeService;
import de.squarerootops.mapservice.services.PersonService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import org.springframework.stereotype.Component;

@Component
public class GeneralAttributeMutation implements GraphQLMutationResolver {

  private final GeneralAttributeService generalAttributeService;

  public GeneralAttributeMutation(PersonService personService,
      GeneralAttributeService generalAttributeService) {
    this.generalAttributeService = generalAttributeService;
  }

  public GeneralAttribute updateGeneralAttribute(GeneralAttributeInput generalAttributeInput) {
    return generalAttributeService.updateGeneralAttribute(generalAttributeInput);
  }
}
