package de.squarerootops.mapservice.repositories;

import de.squarerootops.mapservice.models.entities.Team;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepositorie extends JpaRepository<Team, Long> {

  Optional<Team> findByInviteToken(String inviteToken);
}
