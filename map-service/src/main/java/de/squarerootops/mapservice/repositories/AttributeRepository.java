package de.squarerootops.mapservice.repositories;

import de.squarerootops.mapservice.models.entities.Attribute;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttributeRepository extends JpaRepository<Attribute, Long> {

  Optional<Attribute> getByGeneralAttributeId(Long generalId);

  Optional<Attribute> getByProjectAttributeId(Long projectId);
}
