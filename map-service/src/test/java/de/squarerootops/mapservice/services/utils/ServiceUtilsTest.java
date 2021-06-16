package de.squarerootops.mapservice.services.utils;

import static org.assertj.core.api.Assertions.assertThat;

import de.squarerootops.mapservice.models.entities.GeneralAttribute;
import de.squarerootops.mapservice.models.entities.Person;
import de.squarerootops.mapservice.models.input.PersonInput;
import java.util.Map;
import org.junit.jupiter.api.Test;

class ServiceUtilsTest {

  @Test
  public void testCopyAttributes() {
    PersonInput personInput = new PersonInput(null, "helloSir", null, "Happy", false);
    Person person = new Person();
    person.setFirstName("Fritz");
    person.setLastName("Heino");

    ServiceUtils.copyAttributes(personInput, person);

    assertThat(person.getId()).isNull();
    assertThat(person.getFirstName()).isEqualTo(person.getFirstName());
    assertThat(person.getLastName()).isEqualTo(personInput.getLastName());
    assertThat(person.getUserName()).isEqualTo(personInput.getUserName());
  }

  @Test
  public void testGetPropertysMap() {
    GeneralAttribute generalAttribute = new GeneralAttribute();
    generalAttribute.setResilience(true);

    Map<String, Object> propertysMap =
        ServiceUtils.getPropertysMap(generalAttribute);

    assertThat(propertysMap).isNotEmpty();
    assertThat(propertysMap.get("resilience")).isEqualTo(generalAttribute.isResilience());
    assertThat(propertysMap.get("experience")).isEqualTo(generalAttribute.isExperience());
  }
}
