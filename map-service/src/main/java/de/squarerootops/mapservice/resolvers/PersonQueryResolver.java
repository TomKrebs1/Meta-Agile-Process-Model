package de.squarerootops.mapservice.resolvers;

import de.squarerootops.mapservice.models.dtos.PersonDto;
import de.squarerootops.mapservice.services.PersonService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class PersonQueryResolver implements GraphQLQueryResolver {

  private final PersonService personService;

  public PersonQueryResolver(PersonService personService) {
    this.personService = personService;
  }

  @Transactional
  public PersonDto getPerson(String id, String userName) {
    PersonDto person = personService.getPerson(id, userName);
    return person;
  }
}
