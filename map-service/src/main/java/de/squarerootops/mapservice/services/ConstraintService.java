package de.squarerootops.mapservice.services;

import de.squarerootops.mapservice.models.entities.GeneralAttribute;
import de.squarerootops.mapservice.models.entities.ProjectAttribute;
import de.squarerootops.mapservice.repositories.AttributeRepository;
import de.squarerootops.mapservice.repositories.PersonRepositorie;
import de.squarerootops.mapservice.services.utils.ServiceUtils;
import java.util.NoSuchElementException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class ConstraintService {

  public static final int MAXIMUM_ACTIVE_ATTRIBUTES = 8;
  private final PersonRepositorie personRepositorie;
  private final AttributeRepository attributeRepository;


  @Transactional
  public boolean maximumAttributesSet(ProjectAttribute attribute) {
    GeneralAttribute generalAttribute =
        attributeRepository.getByProjectAttributeId(attribute.getId()).orElseThrow(
            () -> new NoSuchElementException(
                String.format("No General with that id was found %d", attribute.getId())))
            .getGeneralAttribute();
    return isMaximumBreached(generalAttribute, attribute);
  }

  @Transactional
  public boolean maximumAttributesSet(GeneralAttribute attribute) {
    ProjectAttribute projectAttribute =
        attributeRepository.getByGeneralAttributeId(attribute.getId()).orElseThrow(
            () -> new NoSuchElementException(
                String.format("No Project with that id was found %d", attribute.getId())))
            .getProjectAttribute();
    return isMaximumBreached(attribute, projectAttribute);
  }

  private boolean isMaximumBreached(GeneralAttribute general, ProjectAttribute project) {
    return getCountOfActiveAttributes(general, project) > (MAXIMUM_ACTIVE_ATTRIBUTES);
  }

  private long getCountOfActiveAttributes(GeneralAttribute general, ProjectAttribute project) {
    return ServiceUtils.mergeGerneralAndProjectAttributes(general, project)
        .values().stream()
        .filter(attributeValue -> attributeValue >= 1)
        .count();
  }
}
