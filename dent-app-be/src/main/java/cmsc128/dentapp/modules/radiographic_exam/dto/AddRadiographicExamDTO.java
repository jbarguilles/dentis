package cmsc128.dentapp.modules.radiographic_exam.dto;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import cmsc128.dentapp.modules.patient.entities.Patient;
import cmsc128.dentapp.modules.patient.services.PatientService;
import cmsc128.dentapp.modules.radiographic_exam.entities.RadiographicExam;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddRadiographicExamDTO {
  @JsonProperty("patientNumber")
  private Long patientNumber;

  @JsonProperty("reDate")
  private String reDate;

  @JsonProperty("toothNo")
  private Integer toothNo;

  @JsonProperty("findings")
  private String findings;

  @JsonProperty("nameOfClinician")
  private String nameOfClinician;

  @JsonProperty("cliniciansSignature")
  private String cliniciansSignature;

  public RadiographicExam mapToRE(PatientService patientService) {
    RadiographicExam radiographicExam = new RadiographicExam();

    if (this.reDate != "") {
      radiographicExam.setReDate(Date.valueOf(this.reDate));
    }
    radiographicExam.setToothNo(this.toothNo);
    radiographicExam.setFindings(this.findings);
    radiographicExam.setNameOfClinician(this.nameOfClinician);
    radiographicExam.setCliniciansSignature(this.cliniciansSignature);

    Patient patient = patientService.findPatientByID(Long.valueOf(this.patientNumber));
    radiographicExam.setPatient(patient);

    return radiographicExam;
  }
}
