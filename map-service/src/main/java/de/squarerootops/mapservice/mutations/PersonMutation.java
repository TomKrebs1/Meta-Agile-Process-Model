package de.squarerootops.mapservice.mutations;

import de.squarerootops.mapservice.models.dtos.PersonDto;
import de.squarerootops.mapservice.models.input.PersonInput;
import de.squarerootops.mapservice.services.PersonService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class PersonMutation implements GraphQLMutationResolver {

  private final PersonService personService;

  public PersonMutation(PersonService personService) {
    this.personService = personService;
  }

  public PersonDto updatePerson(PersonInput personInput) {
    if (personInput.getId() == null) {
      throw new RuntimeException("ID needed moron!!!");
    }
    return personService.updatePerson(personInput);
  }
}
