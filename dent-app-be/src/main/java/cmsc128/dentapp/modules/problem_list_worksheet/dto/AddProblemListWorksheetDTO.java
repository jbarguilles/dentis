package cmsc128.dentapp.modules.problem_list_worksheet.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import cmsc128.dentapp.modules.patient.entities.Patient;
import cmsc128.dentapp.modules.patient.services.PatientService;
import cmsc128.dentapp.modules.problem_list_worksheet.entities.ProblemListWorksheet;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddProblemListWorksheetDTO {

  @JsonProperty("patientNumber")
  private Long patientNumber;

  @JsonProperty("attending_clinician")
  private String attendingClinician;

  @JsonProperty("management_of_periodontal_disease")
  private Boolean managementOfPeriodontalDisease;

  @JsonProperty("od_class_i")
  private Boolean odClass1;

  @JsonProperty("od_class_i_toothnum")
  private String odClass1Toothnum;

  @JsonProperty("od_class_ii")
  private Boolean odClass2;

  @JsonProperty("od_class_ii_toothnum")
  private String odClass2Toothnum;

  @JsonProperty("od_class_iii")
  private Boolean odClass3;

  @JsonProperty("od_class_iii_toothnum")
  private String odClass3Toothnum;

  @JsonProperty("od_class_iv")
  private Boolean odClass4;

  @JsonProperty("od_class_iv_toothnum")
  private String odClass4Toothnum;

  @JsonProperty("od_class_v")
  private Boolean odClass5;

  @JsonProperty("od_class_v_toothnum")
  private String odClass5Toothnum;

  @JsonProperty("od_onlay")
  private Boolean odOnlay;

  @JsonProperty("od_onlay_toothnum")
  private String odOnlayToothnum;

  @JsonProperty("surgery_extraction")
  private Boolean surgeryExtraction;

  @JsonProperty("surgery_extraction_toothnum")
  private String surgeryExtractionToothnum;

  @JsonProperty("surgery_odontectomy")
  private Boolean surgeryOdonectomy;

  @JsonProperty("surgery_odontectomy_toothnum")
  private String surgeryOdonectomyToothnum;

  @JsonProperty("surgery_special_case")
  private Boolean surgerySpecialCase;

  @JsonProperty("surgery_special_case_toothnum")
  private String surgerySpecialCaseToothnum;

  @JsonProperty("surgery_pedodontics")
  private Boolean surgeryPedodontics;

  @JsonProperty("surgery_pedodontics_toothnum")
  private String surgeryPedodonticsToothnum;

  @JsonProperty("surgery_orthodontics")
  private Boolean surgeryOrthodontics;

  @JsonProperty("surgery_orthodontics_toothnum")
  private String surgeryOrthodonticsToothnum;

  @JsonProperty("et_pulp_sedation")
  private Boolean etPulpSedation;

  @JsonProperty("et_recementation_of_crowns")
  private Boolean etRecementationOfCrowns;

  @JsonProperty("et_temporary_fillings")
  private Boolean etTemporaryFillings;

  @JsonProperty("et_management_of_acute_infections")
  private Boolean etManagementOfAcuteInfections;

  @JsonProperty("et_management_of_traumatic_injuries")
  private Boolean etManagementOfTraumaticInjuries;

  @JsonProperty("fpd_laminates_veneers")
  private Boolean fpdLaminatesVeneers;

  @JsonProperty("fpd_laminates_veneers_tooth_number")
  private String fpdLaminatesVeneersToothNumber;

  @JsonProperty("fpd_single_crown")
  private Boolean fpdSingleCrown;

  @JsonProperty("fpd_single_crown_tooth_number")
  private String fpdSingleCrownToothNumber;

  @JsonProperty("fpd_bridge")
  private Boolean fpdBridge;

  @JsonProperty("fpd_bridge_tooth_number")
  private String fpdBridgeToothNumber;

  @JsonProperty("endodontics_anterior")
  private Boolean endodonticsAnterior;

  @JsonProperty("endodontics_anterior_tooth_number")
  private String endodonticsAnteriorToothNumber;

  @JsonProperty("endodontics_posterior")
  private Boolean endodonticsPosterior;

  @JsonProperty("endodontics_posterior_tooth_number")
  private String endodonticsPosteriorToothNumber;

  @JsonProperty("endodontics_others")
  private Boolean endodonticsOthers;

  @JsonProperty("endodontics_others_tooth_number")
  private String endodonticsOthersToothNumber;

  @JsonProperty("endodontics_others_specify")
  private String endodonticsOthersSpecify;

  @JsonProperty("p_complete_denture")
  private Boolean pCompleteDenture;

  @JsonProperty("p_single_denture")
  private Boolean pSingleDenture;

  @JsonProperty("p_removable_partial_denture")
  private Boolean pRemovablePartialDenture;

  @JsonProperty("p_other_denture_services")
  private Boolean otherDentureServices;

  public ProblemListWorksheet mapToPLW(PatientService patientService) {
    ProblemListWorksheet problemListWorksheet = new ProblemListWorksheet();

    problemListWorksheet.setAttendingClinician(this.attendingClinician);
    problemListWorksheet.setManagementOfPeriodontalDisease(this.managementOfPeriodontalDisease);
    problemListWorksheet.setOdClass1(this.odClass1);
    problemListWorksheet.setOdClass1Toothnum(this.odClass1Toothnum);
    problemListWorksheet.setOdClass2(this.odClass2);
    problemListWorksheet.setOdClass2Toothnum(this.odClass2Toothnum);
    problemListWorksheet.setOdClass3(this.odClass3);
    problemListWorksheet.setOdClass3Toothnum(this.odClass3Toothnum);
    problemListWorksheet.setOdClass4(this.odClass4);
    problemListWorksheet.setOdClass4Toothnum(this.odClass4Toothnum);
    problemListWorksheet.setOdClass5(this.odClass5);
    problemListWorksheet.setOdClass5Toothnum(this.odClass5Toothnum);
    problemListWorksheet.setOdOnlay(this.odOnlay);
    problemListWorksheet.setOdOnlayToothnum(this.odOnlayToothnum);
    problemListWorksheet.setSurgeryExtraction(this.surgeryExtraction);
    problemListWorksheet.setSurgeryExtractionToothnum(this.surgeryExtractionToothnum);
    problemListWorksheet.setSurgeryOdontectomy(this.surgeryOdonectomy);
    problemListWorksheet.setSurgeryOdontectomyToothnum(this.surgeryOdonectomyToothnum);
    problemListWorksheet.setSurgerySpecialCase(this.surgerySpecialCase);
    problemListWorksheet.setSurgerySpecialCaseToothnum(this.surgerySpecialCaseToothnum);
    problemListWorksheet.setSurgeryPedodontics(this.surgeryPedodontics);
    problemListWorksheet.setSurgeryPedodonticsToothnum(this.surgeryPedodonticsToothnum);
    problemListWorksheet.setSurgeryOrthodontics(this.surgeryOrthodontics);
    problemListWorksheet.setSurgeryOrthodonticsToothnum(this.surgeryOrthodonticsToothnum);
    problemListWorksheet.setEtPulpSedation(this.etPulpSedation);
    problemListWorksheet.setEtRecementationOfCrowns(this.etRecementationOfCrowns);
    problemListWorksheet.setEtTemporaryFillings(this.etTemporaryFillings);
    problemListWorksheet.setEtManagementOfAcuteInfections(this.etManagementOfAcuteInfections);
    problemListWorksheet.setEtManagementOfTraumaticInjuries(this.etManagementOfTraumaticInjuries);
    problemListWorksheet.setFpdLaminatesVeneers(this.fpdLaminatesVeneers);
    problemListWorksheet.setFpdLaminatesVeneersToothNumber(this.fpdLaminatesVeneersToothNumber);
    problemListWorksheet.setFpdSingleCrown(this.fpdSingleCrown);
    problemListWorksheet.setFpdSingleCrownToothNumber(this.fpdSingleCrownToothNumber);
    problemListWorksheet.setFpdBridge(this.fpdBridge);
    problemListWorksheet.setFpdBridgeToothNumber(this.fpdBridgeToothNumber);
    problemListWorksheet.setEndodonticsAnterior(this.endodonticsAnterior);
    problemListWorksheet.setEndodonticsAnteriorToothNumber(this.endodonticsAnteriorToothNumber);
    problemListWorksheet.setEndodonticsPosterior(this.endodonticsPosterior);
    problemListWorksheet.setEndodonticsPosteriorToothNumber(this.endodonticsPosteriorToothNumber);
    problemListWorksheet.setEndodonticsOthers(this.endodonticsOthers);
    problemListWorksheet.setEndodonticsOthersToothNumber(this.endodonticsOthersToothNumber);
    problemListWorksheet.setEndodonticsOthersSpecify(this.endodonticsOthersSpecify);
    problemListWorksheet.setPCompleteDenture(this.pCompleteDenture);
    problemListWorksheet.setPSingleDenture(this.pSingleDenture);
    problemListWorksheet.setPRemovablePartialDenture(this.pRemovablePartialDenture);
    problemListWorksheet.setPOtherDentureServices(this.otherDentureServices);

    Patient patient = patientService.findPatientByID(this.patientNumber);
    problemListWorksheet.setPatient(patient);

    return problemListWorksheet;
  }
}
