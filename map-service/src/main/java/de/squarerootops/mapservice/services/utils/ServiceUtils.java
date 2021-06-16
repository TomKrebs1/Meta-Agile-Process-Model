package de.squarerootops.mapservice.services.utils;

import de.squarerootops.mapservice.models.entities.GeneralAttribute;
import de.squarerootops.mapservice.models.entities.ProjectAttribute;
import java.beans.FeatureDescriptor;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

public class ServiceUtils {

  public static <T extends Object> T copyAttributes(Object source, T target) {
    BeanUtils.copyProperties(source, target, getNullPropertyNames(source));
    return target;
  }

  public static Map<String, Object> getPropertysMap(Object source, String... igrnoredPropertys) {
    final BeanWrapper src = new BeanWrapperImpl(source);
    List<String> ignoreList = Arrays.asList(igrnoredPropertys);

    return Arrays.stream(src.getPropertyDescriptors())
        .filter(property -> src.getPropertyValue(property.getName()) != null)
        .filter(property -> !ignoreList.contains(property.getName()))
        .filter(property -> src.getPropertyType(property.getName()).isPrimitive())
        .collect(
            Collectors.toMap(FeatureDescriptor::getName, p -> src.getPropertyValue(p.getName())));
  }

  public static Map<String, Integer> mergeGerneralAndProjectAttributes(
      GeneralAttribute generalAttribute, ProjectAttribute projectAttribute) {
    Map<String, Object> propertysMap = new HashMap<>();

    propertysMap.putAll(
        ServiceUtils.getPropertysMap(generalAttribute));
    propertysMap.putAll(
        ServiceUtils.getPropertysMap(projectAttribute));

    return propertysMap.entrySet().stream()
        .collect(Collectors
            .toMap(Entry::getKey, value -> Boolean.compare((Boolean) value.getValue(), false)));
  }

  private static String[] getNullPropertyNames(Object source) {
    final BeanWrapper src = new BeanWrapperImpl(source);

    return Arrays.stream(src.getPropertyDescriptors())
        .filter(p -> src.getPropertyValue(p.getName()) == null)
        .map(FeatureDescriptor::getName)
        .toArray(String[]::new);
  }
}
