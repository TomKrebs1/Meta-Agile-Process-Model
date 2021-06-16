package de.squarerootops.mapservice.services;

import de.squarerootops.mapservice.models.dtos.PersonDto;
import de.squarerootops.mapservice.models.entities.GeneralAttribute;
import de.squarerootops.mapservice.models.input.GeneralAttributeInput;
import de.squarerootops.mapservice.repositories.GeneralAttributeRepositorie;
import de.squarerootops.mapservice.services.utils.ServiceUtils;
import graphql.GraphQLException;
import java.util.NoSuchElementException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class GeneralAttributeService {

  private final GeneralAttributeRepositorie generalAttributeRepositorie;
  private final ConstraintService constraintService;

  public GeneralAttribute getGeneralAttributeByPerson(PersonDto person) {
    return getGeneralAttributeById(person.getGeneralAttribute().getId());
  }

  public GeneralAttribute updateGeneralAttribute(GeneralAttributeInput generalAttributeInput) {

    GeneralAttribute attributeToUpdate = ServiceUtils
        .copyAttributes(generalAttributeInput,
            getGeneralAttributeById(generalAttributeInput.getId()));

    if (constraintService.maximumAttributesSet(attributeToUpdate)) {
      throw new GraphQLException("Maximum Number of Attributes Exceeded");
    }

    return generalAttributeRepositorie.save(attributeToUpdate);
  }

  protected GeneralAttribute getGeneralAttributeById(long id) {
    return generalAttributeRepositorie.findById(id).orElseThrow(
        () -> new NoSuchElementException(
            String.format("No GeneralAttribute with that id was found %d", id)
        ));
  }
}
