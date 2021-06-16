package de.squarerootops.mapservice.repositories;


import de.squarerootops.mapservice.models.entities.PersonAssessment;
import de.squarerootops.mapservice.models.entities.PersonAssessmentKey;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonAssessmentRepositorie extends JpaRepository<PersonAssessment, PersonAssessmentKey> {

  Set<PersonAssessment> findAllByAssessmentOwnerIdAndTeamId(String ownerId, long teamId);

  Set<PersonAssessment> findAllByTeamId(long teamId);
}
