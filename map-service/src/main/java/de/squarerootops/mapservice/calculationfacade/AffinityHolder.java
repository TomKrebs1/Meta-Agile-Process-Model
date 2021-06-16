package de.squarerootops.mapservice.calculationfacade;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class AffinityHolder {

  private float affinity;
  private float averageAffinity;
}
