package cmsc128.dentapp.Entities.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

import cmsc128.dentapp.modules.medical_history.dto.AddMedicalHistoryDTO;
import cmsc128.dentapp.modules.problem_list_worksheet.dto.AddProblemListWorksheetDTO;
import cmsc128.dentapp.modules.radiographic_exam.dto.AddRadiographicExamDTO;
import cmsc128.dentapp.modules.soft_tissue_examination.dto.AddSoftTissueExaminationDTO;
import cmsc128.dentapp.modules.treatment_plan_form.dto.AddTreatmentPlanFormDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EditPatientDTO {

  @JsonProperty("patientID")
  private Long patientID;

  @JsonProperty("registration_date")
  private String registrationDate;

  @JsonProperty("surname")
  private String surname;

  @JsonProperty("first_name")
  private String firstName;

  @JsonProperty("middle_name")
  private String middleName;

  @JsonProperty("gender")
  private String gender;

  @JsonProperty("civil_status")
  private String civilStatus;

  @JsonProperty("birthdate")
  private String birthdate;

  @JsonProperty("age")
  private String age;

  @JsonProperty("address")
  private String address;

  @JsonProperty("cellphone_number")
  private String cellphoneNumber;

  @JsonProperty("cp_name")
  private String contactPersonName;

  @JsonProperty("cp_number")
  private String contactPersonNumber;

  @JsonProperty("cp_relationship")
  private String contactPersonRelationship;

  @JsonProperty("scaling")
  private Boolean scaling;

  @JsonProperty("extraction")
  private Boolean extraction;

  @JsonProperty("root_canal")
  private Boolean rootCanal;

  @JsonProperty("complete_dentures")
  private Boolean completeDenturesRPD;

  @JsonProperty("removable_partial_dentures")
  private Boolean removablePartialDentures;

  @JsonProperty("wisdom_tooth_removal")
  private Boolean wisdomToothRemoval;

  @JsonProperty("medical_history_chart")
  private AddMedicalHistoryDTO medicalHistoryRequest;

  @JsonProperty("problem_list_worksheet")
  private AddProblemListWorksheetDTO problemListWorksheetRequest;

  @JsonProperty("radiographic_exam")
  private AddRadiographicExamDTO radiographicExamRequest;

  @JsonProperty("soft_tissue_examination")
  private AddSoftTissueExaminationDTO softTissueExaminationRequest;

  @JsonProperty("treatment_plan_form_request")
  private AddTreatmentPlanFormDTO treatmentPlanFormRequest;
}
