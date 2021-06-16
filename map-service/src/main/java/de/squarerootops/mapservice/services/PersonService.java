package de.squarerootops.mapservice.services;

import de.squarerootops.mapservice.models.dtos.PersonDto;
import de.squarerootops.mapservice.models.dtos.TeamDto;
import de.squarerootops.mapservice.models.entities.Person;
import de.squarerootops.mapservice.models.entities.Team;
import de.squarerootops.mapservice.models.input.PersonInput;
import de.squarerootops.mapservice.repositories.PersonRepositorie;
import de.squarerootops.mapservice.services.utils.ServiceUtils;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
public class PersonService {

  PersonRepositorie personRepositorie;

  public PersonService(PersonRepositorie personRepositorie) {
    this.personRepositorie = personRepositorie;
  }

  @Transactional
  public PersonDto getPerson(String id, String userName) {
    Person person = personRepositorie.findById(id).orElseGet(
        () -> personRepositorie.save(new Person(id, userName)));
    return new PersonDto(person);
  }

  public PersonDto updatePerson(PersonInput personInput) {
    Person personToUpdate = getPersonFromDb(personInput.getId());
    Person save = personRepositorie.save(ServiceUtils.copyAttributes(personInput, personToUpdate));
    return new PersonDto(save);
  }

  @Transactional
  public List<TeamDto> getTeamsFromPerson(String id) {
    Person person = getPersonFromDb(id);
    List<Team> joinedTeams = person.getJoinedTeams();
    return joinedTeams.stream()
        .map(TeamDto::new)
        .collect(Collectors.toList());
  }

  Person getPersonFromDb(String personId) {
    return personRepositorie.findById(personId).orElseThrow(
        () -> new NoSuchElementException(
            String.format("No Person with that id was found %s", personId))
    );
  }
}
