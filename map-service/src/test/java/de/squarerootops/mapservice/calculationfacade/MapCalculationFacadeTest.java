package de.squarerootops.mapservice.calculationfacade;

import static org.assertj.core.api.Assertions.assertThat;
import de.squarerootops.mapservice.models.dtos.PersonAssessmentDto;
import de.squarerootops.mapservice.models.dtos.PersonDto;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
class MapCalculationFacadeTest {

  @Test
  void testCalculateAffinity() {

    MapCalculationFacade calculationFacade = new MapCalculationFacade();

    Map<String, AffinityHolder> stringFloatMap =
        calculationFacade.getAffinityMapForUser(getTestAssessmentList(), "2");

    assertThat(stringFloatMap).isNotEmpty();
    assertThat(stringFloatMap.size()).isEqualTo(6);

    // affinity
    assertThat(stringFloatMap.get("communicator").getAffinity()).isEqualTo(0.33f);
    assertThat(stringFloatMap.get("creativeMind").getAffinity()).isEqualTo(0.0f);
    assertThat(stringFloatMap.get("expert").getAffinity()).isEqualTo(0.56f);
    assertThat(stringFloatMap.get("troubleShooter").getAffinity()).isEqualTo(0.47f);
    assertThat(stringFloatMap.get("teamworker").getAffinity()).isEqualTo(0.83f);
    assertThat(stringFloatMap.get("qualityTester").getAffinity()).isEqualTo(0.30f);

    // average Affinity
    assertThat(stringFloatMap.get("communicator").getAverageAffinity()).isEqualTo(0.63f);
    assertThat(stringFloatMap.get("creativeMind").getAverageAffinity()).isEqualTo(0.58f);
    assertThat(stringFloatMap.get("expert").getAverageAffinity()).isEqualTo(0.78f);
    assertThat(stringFloatMap.get("troubleShooter").getAverageAffinity()).isEqualTo(0.71f);
    assertThat(stringFloatMap.get("teamworker").getAverageAffinity()).isEqualTo(0.92f);
    assertThat(stringFloatMap.get("qualityTester").getAverageAffinity()).isEqualTo(0.72f);
  }

  @Test
  public void testMergeAssessmentsForUser() {

    MapCalculationFacade calculationFacade = new MapCalculationFacade();

    Map<String, Integer> stringIntegerMap =
        calculationFacade.mergeAssessmentsForUser(getTestAssessmentList(), "2");

    assertThat(stringIntegerMap).isNotEmpty();

    assertThat(stringIntegerMap.get("communication")).isEqualTo(2);
    assertThat(stringIntegerMap.get("experience")).isEqualTo(3);
    assertThat(stringIntegerMap.get("analytical")).isEqualTo(2);
    assertThat(stringIntegerMap.get("structured")).isEqualTo(1);
    assertThat(stringIntegerMap.get("visionary")).isEqualTo(0);
  }

  private List<PersonAssessmentDto> getTestAssessmentList() {
    List<PersonAssessmentDto> assessmentDtoList = new ArrayList<>();
    PersonAssessmentDto assessment1 = new PersonAssessmentDto();
    PersonAssessmentDto assessment2 = new PersonAssessmentDto();
    PersonAssessmentDto assessment3 = new PersonAssessmentDto();

    assessment1.setAssessmentOwner(PersonDto.builder()
        .id("1")
        .userName("Halo")
        .build());
    assessment1.setAssessmentTarget(PersonDto.builder()
        .id("2")
        .userName("dude")
        .build());
    assessment1.getGeneralAttribute().setExperience(true);
    assessment1.getGeneralAttribute().setCommunication(true);
    assessment1.getGeneralAttribute().setResilience(true);

    assessment1.getProjectAttribute().setCriticallyQuestioning(true);
    assessment1.getProjectAttribute().setStructured(true);
    assessment1.getProjectAttribute().setAnalytical(true);
    assessment1.getProjectAttribute().setPlanning(true);
    assessment1.getProjectAttribute().setImplementationOriented(true);

    assessmentDtoList.add(assessment1);

    assessment2.setAssessmentOwner(PersonDto.builder()
        .id("1")
        .userName("Fredosaurus")
        .build());
    assessment2.setAssessmentTarget(PersonDto.builder()
        .id("2")
        .userName("dude")
        .build());
    assessment2.getGeneralAttribute().setExperience(true);

    assessment2.getProjectAttribute().setCreative(true);
    assessment2.getProjectAttribute().setCriticallyQuestioning(true);
    assessment2.getProjectAttribute().setImplementationOriented(true);

    assessmentDtoList.add(assessment2);

    //
    assessment3.setAssessmentOwner(PersonDto.builder()
        .id("1")
        .userName("Hollow")
        .build());
    assessment3.setAssessmentTarget(PersonDto.builder()
        .id("2")
        .userName("dude")
        .build());
    assessment3.getGeneralAttribute().setExperience(true);
    assessment3.getGeneralAttribute().setCommunication(true);
    assessment3.getGeneralAttribute().setResilience(true);

    assessment3.getProjectAttribute().setCostConscious(true);
    assessment3.getProjectAttribute().setCriticallyQuestioning(true);
    assessment3.getProjectAttribute().setAnalytical(true);
    assessment3.getProjectAttribute().setPlanning(true);
    assessment3.getProjectAttribute().setImplementationOriented(true);

    assessmentDtoList.add(assessment3);
    return assessmentDtoList;
  }
}
