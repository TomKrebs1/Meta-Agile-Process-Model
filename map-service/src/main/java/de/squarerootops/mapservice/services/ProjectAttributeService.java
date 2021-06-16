package de.squarerootops.mapservice.services;

import de.squarerootops.mapservice.models.dtos.PersonDto;
import de.squarerootops.mapservice.models.entities.ProjectAttribute;
import de.squarerootops.mapservice.models.input.ProjectAttributeInput;
import de.squarerootops.mapservice.repositories.ProjectAttributeRepositorie;
import de.squarerootops.mapservice.services.utils.ServiceUtils;
import graphql.GraphQLException;
import java.util.NoSuchElementException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ProjectAttributeService {

  private final ProjectAttributeRepositorie projectAttributeRepositorie;
  private final ConstraintService constraintService;

  public ProjectAttribute getProjectAttributeByPerson(PersonDto person) {
    return projectAttributeRepositorie.findById(person.getProjectAttribute().getId()).orElseThrow(
        () -> new NoSuchElementException("No ProjectAttribute found")
    );
  }

  public ProjectAttribute updateProjectAttribute(ProjectAttributeInput projectAttributeInput) {
    ProjectAttribute attributeToUpdate = ServiceUtils
        .copyAttributes(projectAttributeInput,
            getProjectAttributeById(projectAttributeInput.getId()));

    if (constraintService.maximumAttributesSet(attributeToUpdate)) {
      throw new GraphQLException("Maximum Number of Attributes Exceeded");
    }

    return projectAttributeRepositorie
        .save(attributeToUpdate);
  }

  protected ProjectAttribute getProjectAttributeById(long id) {
    return projectAttributeRepositorie.findById(id).orElseThrow(
        () -> new NoSuchElementException(String
            .format("No ProjectAttribute with that id was found %d",
                id)
        ));
  }
}
