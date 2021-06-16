package de.squarerootops.mapservice.resolvers.person;

import de.squarerootops.mapservice.models.dtos.PersonDto;
import de.squarerootops.mapservice.models.dtos.TeamDto;
import de.squarerootops.mapservice.services.PersonService;
import graphql.kickstart.tools.GraphQLResolver;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@AllArgsConstructor
public class TeamResolver implements GraphQLResolver<PersonDto> {

  private final PersonService personService;

  public List<TeamDto> joinedTeams(PersonDto person) {
    return personService.getTeamsFromPerson(person.getId());
  }
}
