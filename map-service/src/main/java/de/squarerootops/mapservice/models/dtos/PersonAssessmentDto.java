package de.squarerootops.mapservice.models.dtos;

import de.squarerootops.mapservice.models.entities.GeneralAttribute;
import de.squarerootops.mapservice.models.entities.PersonAssessment;
import de.squarerootops.mapservice.models.entities.ProjectAttribute;
import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.beans.BeanUtils;

@Data
@SuperBuilder
public class PersonAssessmentDto {

  private PersonDto assessmentOwner;
  private PersonDto assessmentTarget;
  private TeamDto team;

  private GeneralAttribute generalAttribute;
  private ProjectAttribute projectAttribute;

  public PersonAssessmentDto() {
    this.generalAttribute = new GeneralAttribute();
    this.projectAttribute = new ProjectAttribute();
  }

  private Boolean isActive;

  public PersonAssessmentDto(PersonAssessment personAssessment) {
    BeanUtils.copyProperties(personAssessment, this);
  }

  public static PersonAssessmentDto getFromPersonAssessment(PersonAssessment assessment) {
    return PersonAssessmentDto.builder()
        .assessmentOwner(PersonDto.builder()
            .userName(assessment.getAssessmentOwner().getUserName())
            .build())
        .assessmentTarget(PersonDto.builder()
            .userName(assessment.getAssessmentTarget().getUserName())
            .id(assessment.getAssessmentTarget().getId())
            .build())
        .team(TeamDto.builder()
            .id(assessment.getTeam().getId())
            .teamName(assessment.getTeam().getTeamName())
            .build())
        .generalAttribute(assessment.getGeneralAttribute())
        .projectAttribute(assessment.getProjectAttribute())
        .isActive(assessment.isActive())
        .build();
  }
}
