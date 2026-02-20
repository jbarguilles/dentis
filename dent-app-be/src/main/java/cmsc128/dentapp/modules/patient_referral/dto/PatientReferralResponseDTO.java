package cmsc128.dentapp.modules.patient_referral.dto;

import cmsc128.dentapp.modules.patient_referral.entities.PatientReferral;
import cmsc128.dentapp.modules.patient_referral.entities.ReferralStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class PatientReferralResponseDTO {
  
  @JsonProperty("referral_id")
  private Long referralId;

  @JsonProperty("patient_id")
  private Long patientId;

  @JsonProperty("chart_number")
  private String chartNumber;

  @JsonProperty("patient_name")
  private String patientName;

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

  @JsonProperty("status")
  private ReferralStatus status;

  @JsonProperty("referred_by")
  private String referredBy;

  @JsonProperty("referred_by_id")
  private Long referredById;

  @JsonProperty("accepted_by")
  private String acceptedBy;

  @JsonProperty("accepted_by_id")
  private Long acceptedById;

  @JsonProperty("created_at")
  private Date createdAt;

  @JsonProperty("accepted_at")
  private Date acceptedAt;

  public static PatientReferralResponseDTO fromEntity(PatientReferral referral) {
    PatientReferralResponseDTO dto = new PatientReferralResponseDTO();
    dto.setReferralId(referral.getReferralId());
    dto.setPatientId(referral.getPatient().getPatientID());
    dto.setChartNumber(referral.getPatient().getPatientNumber());
    dto.setPatientName(referral.getPatient().getFirstName() + " " + 
                       referral.getPatient().getLastName());
    dto.setTreatment(referral.getTreatment());
    dto.setSpecifics(referral.getSpecifics());
    dto.setAge(referral.getAge());
    dto.setMedicalAlert(referral.getMedicalAlert());
    dto.setSectionOrigin(referral.getSectionOrigin());
    dto.setSectionDestination(referral.getSectionDestination());
    dto.setNotes(referral.getNotes());
    dto.setStatus(referral.getStatus());
    dto.setCreatedAt(referral.getCreatedAt());
    dto.setAcceptedAt(referral.getAcceptedAt());
    
    if (referral.getReferredBy() != null) {
      dto.setReferredBy(referral.getReferredBy().getFirstName() + " " + 
                        referral.getReferredBy().getLastName());
      dto.setReferredById(referral.getReferredBy().getUserId());
    }
    
    if (referral.getAcceptedBy() != null) {
      dto.setAcceptedBy(referral.getAcceptedBy().getFirstName() + " " + 
                        referral.getAcceptedBy().getLastName());
      dto.setAcceptedById(referral.getAcceptedBy().getUserId());
    }
    
    return dto;
  }
}
