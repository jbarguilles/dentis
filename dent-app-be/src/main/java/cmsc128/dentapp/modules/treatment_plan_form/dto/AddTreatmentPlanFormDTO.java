package cmsc128.dentapp.modules.treatment_plan_form.dto;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import cmsc128.dentapp.modules.patient.entities.Patient;
import cmsc128.dentapp.modules.patient.services.PatientService;
import cmsc128.dentapp.modules.treatment_plan_form.entities.TreatmentPlanForm;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddTreatmentPlanFormDTO {
  @JsonProperty("patientNumber")
  private Long patientNumber;

  @JsonProperty("proposedTreatmentPlan")
  private String proposedTreatmentPlan;

  @JsonProperty("clinicianName")
  private String clinicianName;

  @JsonProperty("clinicianSignature")
  private String clinicianSignature;

  @JsonProperty("clinicianDate")
  private String clinicianDate;

  @JsonProperty("facultyName")
  private String facultyName;

  @JsonProperty("facultySignature")
  private String facultySignature;

  @JsonProperty("facultyDate")
  private String facultyDate;

  public TreatmentPlanForm mapToTPF(PatientService patientService) {
    TreatmentPlanForm treatmentPlanForm = new TreatmentPlanForm();

    treatmentPlanForm.setProposedTreatmentPlan(this.proposedTreatmentPlan);
    treatmentPlanForm.setClinicianName(this.clinicianName);
    treatmentPlanForm.setClinicianSignature(this.clinicianSignature);
    if (this.clinicianDate != "") {
      treatmentPlanForm.setClinicianDate(Date.valueOf(this.clinicianDate));
    }
    treatmentPlanForm.setFacultyName(this.facultyName);
    treatmentPlanForm.setFacultySignature(this.facultySignature);
    if (this.facultyDate != "") {
      treatmentPlanForm.setFacultyDate(Date.valueOf(this.facultyDate));
    }

    Patient patient = patientService.findPatientByID(this.patientNumber);
    treatmentPlanForm.setPatient(patient);

    return treatmentPlanForm;
  }
}
