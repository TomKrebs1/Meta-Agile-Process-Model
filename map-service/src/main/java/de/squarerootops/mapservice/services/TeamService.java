package de.squarerootops.mapservice.services;

import de.squarerootops.mapservice.exceptions.NoTeamFoundException;
import de.squarerootops.mapservice.models.dtos.PersonDto;
import de.squarerootops.mapservice.models.dtos.TeamDto;
import de.squarerootops.mapservice.models.entities.Person;
import de.squarerootops.mapservice.models.entities.Team;
import de.squarerootops.mapservice.models.input.JoinTeamInput;
import de.squarerootops.mapservice.models.input.PersonAssessmentInput;
import de.squarerootops.mapservice.models.input.TeamInput;
import de.squarerootops.mapservice.repositories.PersonAssessmentRepositorie;
import de.squarerootops.mapservice.repositories.TeamRepositorie;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@AllArgsConstructor
public class TeamService {

  private final TeamRepositorie teamRepositorie;
  private final PersonAssessmentRepositorie assessmentRepositorie;
  private final AssessmentService assessmentService;
  private final PersonService personService;

  public TeamDto getTeamById(Long id) {
    Team team = getTeamByIdFromDb(id);
    return new TeamDto(team);
  }

  public TeamDto addNewTeam(TeamInput teamInput) {
    if (teamInput.getPersonToCreate() == null) {
      throw new RuntimeException("Person ID needed for Team Creation");
    }
    Team newTeam = new Team();
    newTeam.setTeamName(teamInput.getTeamName());

    Person person = personService.getPersonFromDb(teamInput.getPersonToCreate());

    newTeam.addNewPersonToTeam(person);

    teamRepositorie.save(newTeam);
    assessmentService
        .saveNewPersonAssessment(PersonAssessmentInput.builder()
            .assessmentOwnerId(person.getId())
            .assessmentTargetId(person.getId())
            .teamId(newTeam.getId())
            .build());
    return new TeamDto(newTeam);
  }

  @Transactional
  public TeamDto joinTeamWithToken(JoinTeamInput joinTeamInput) {
    Team team = teamRepositorie.findByInviteToken(joinTeamInput.getTeamToken()).orElseThrow(
        () -> new NoSuchElementException(
            String.format("No Team found for Token %s", joinTeamInput.getTeamToken()))
    );
    Person person = personService.getPersonFromDb(joinTeamInput.getPersonId());
    if (!person.getJoinedTeams().contains(team)) {
      team.addNewPersonToTeam(person);
      log.info(String.format("%s joined team %s", person.getId(), team.getId()));
    }

    teamRepositorie.save(team);
    assessmentService
        .saveNewPersonAssessment(PersonAssessmentInput.builder()
            .assessmentOwnerId(person.getId())
            .assessmentTargetId(person.getId())
            .teamId(team.getId())
            .build());
    return new TeamDto(team);
  }

  @Transactional
  public List<PersonDto> getTeamMembers(Long teamId) {
    Team team = getTeamByIdFromDb(teamId);
    return team.getTeamMembers().stream()
        .map(PersonDto::new)
        .collect(Collectors.toList());
  }

  protected Team getTeamByIdFromDb(Long id) {
    return teamRepositorie.findById(id).orElseThrow(
        () -> new NoTeamFoundException(
            String.format("No Team found for ID %s", id))
    );
  }


}
