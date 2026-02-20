package cmsc128.dentapp.modules.patient_referral.dto;

import cmsc128.dentapp.modules.patient_referral.entities.PatientReferral;
import cmsc128.dentapp.modules.patient.entities.Patient;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePatientReferralDTO {
  
  @JsonProperty("chart_number")
  private String chartNumber;

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

  public PatientReferral mapToEntity(Patient patient) {
    PatientReferral referral = new PatientReferral();
    referral.setPatient(patient);
    referral.setTreatment(this.treatment);
    referral.setSpecifics(this.specifics);
    referral.setAge(this.age);
    referral.setMedicalAlert(this.medicalAlert);
    referral.setSectionOrigin(this.sectionOrigin);
    referral.setSectionDestination(this.sectionDestination);
    referral.setNotes(this.notes);
    return referral;
  }
}
