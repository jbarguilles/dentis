package cmsc128.dentapp.modules.patient_referral.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePatientReferralDTO {
  
  @JsonProperty("treatment")
  private String treatment;

  @JsonProperty("specifics")
  private String specifics;

  @JsonProperty("age")
  private Integer age;

  @JsonProperty("medical_alert")
  private String medicalAlert;

  @JsonProperty("section_origin")
  private String sectionOrigin;

  @JsonProperty("section_destination")
  private String sectionDestination;

  @JsonProperty("notes")
  private String notes;
}
