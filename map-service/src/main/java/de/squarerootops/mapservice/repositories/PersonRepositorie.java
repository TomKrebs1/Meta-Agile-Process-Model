package de.squarerootops.mapservice.repositories;

import de.squarerootops.mapservice.models.entities.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepositorie extends JpaRepository<Person, String> {
}
