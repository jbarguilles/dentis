package cmsc128.dentapp.modules.problem_list_worksheet.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import cmsc128.dentapp.modules.patient.entities.Patient;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "PROBLEM_LIST_WORKSHEET")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProblemListWorksheet {
  @Id
  @SequenceGenerator(name = "PLW_SEQ", sequenceName = "PLW_SEQ", allocationSize = 1)
  @Column(name = "plw_ID", nullable = false)
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "PLW_SEQ")
  private Long plwId;

  @JsonIgnore
  @OneToOne(
      cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
      fetch = FetchType.LAZY)
  @JoinColumn(name = "PATIENT_ID", nullable = false)
  private Patient patient;

  @Column(name = "ATTENDING_CLINICIAN")
  private String attendingClinician;

  @Column(name = "MANAGEMENT_OF_PERIODONTAL_DISEASE")
  private Boolean managementOfPeriodontalDisease;

  @Column(name = "OD_CLASS_1")
  private Boolean odClass1;

  @Column(name = "OD_CLASS_1_TOOTHNUM")
  private String odClass1Toothnum;

  @Column(name = "OD_CLASS_2")
  private Boolean odClass2;

  @Column(name = "OD_CLASS_2_TOOTHNUM")
  private String odClass2Toothnum;

  @Column(name = "OD_CLASS_3")
  private Boolean odClass3;

  @Column(name = "OD_CLASS_3_TOOTHNUM")
  private String odClass3Toothnum;

  @Column(name = "OD_CLASS_4")
  private Boolean odClass4;

  @Column(name = "OD_CLASS_4_TOOTHNUM")
  private String odClass4Toothnum;

  @Column(name = "OD_CLASS_5")
  private Boolean odClass5;

  @Column(name = "OD_CLASS_5_TOOTHNUM")
  private String odClass5Toothnum;

  @Column(name = "OD_ONLAY")
  private Boolean odOnlay;

  @Column(name = "OD_ONLAY_TOOTHNUM")
  private String odOnlayToothnum;

  @Column(name = "SURGERY_EXTRACTION")
  private Boolean surgeryExtraction;

  @Column(name = "SURGERY_EXTRACTION_TOOTHNUM")
  private String surgeryExtractionToothnum;

  @Column(name = "SURGERY_ODONTECTOMY")
  private Boolean surgeryOdontectomy;

  @Column(name = "SURGERY_ODONTECTOMY_TOOTHNUM")
  private String surgeryOdontectomyToothnum;

  @Column(name = "SURGERY_SPECIAL_CASE")
  private Boolean surgerySpecialCase;

  @Column(name = "SURGERY_SPECIAL_CASE_TOOTHNUM")
  private String surgerySpecialCaseToothnum;

  @Column(name = "SURGERY_PEDODONTICS")
  private Boolean surgeryPedodontics;

  @Column(name = "SURGERY_PEDODONTICS_TOOTHNUM")
  private String surgeryPedodonticsToothnum;

  @Column(name = "SURGERY_ORTHODONTICS")
  private Boolean surgeryOrthodontics;

  @Column(name = "SURGERY_ORTHODONTICS_TOOTHNUM")
  private String surgeryOrthodonticsToothnum;

  @Column(name = "ET_PULP_SEDATION")
  private Boolean etPulpSedation;

  @Column(name = "ET_RECEMENTATION_OF_CROWNS")
  private Boolean etRecementationOfCrowns;

  @Column(name = "ET_TEMPORARY_FILLINGS")
  private Boolean etTemporaryFillings;

  @Column(name = "ET_MANAGEMENT_OF_ACUTE_INFECTIONS")
  private Boolean etManagementOfAcuteInfections;

  @Column(name = "ET_MANAGEMENT_OF_TRAUMATIC_INJURIES")
  private Boolean etManagementOfTraumaticInjuries;

  @Column(name = "FPD_LAMINATES_VENEERS")
  private Boolean fpdLaminatesVeneers;

  @Column(name = "FPD_LAMINATES_VENEERS_TOOTH_NUMBER")
  private String fpdLaminatesVeneersToothNumber;

  @Column(name = "FPD_SINGLE_CROWN")
  private Boolean fpdSingleCrown;

  @Column(name = "FPD_SINGLE_CROWN_TOOTH_NUMBER")
  private String fpdSingleCrownToothNumber;

  @Column(name = "FPD_BRIDGE")
  private Boolean fpdBridge;

  @Column(name = "FPD_BRIDGE_TOOTH_NUMBER")
  private String fpdBridgeToothNumber;

  @Column(name = "ENDODONTICS_ANTERIOR")
  private Boolean endodonticsAnterior;

  @Column(name = "ENDODONTICS_ANTERIOR_TOOTH_NUMBER")
  private String endodonticsAnteriorToothNumber;

  @Column(name = "ENDODONTICS_POSTERIOR")
  private Boolean endodonticsPosterior;

  @Column(name = "ENDODONTICS_POSTERIOR_TOOTH_NUMBER")
  private String endodonticsPosteriorToothNumber;

  @Column(name = "ENDODONTICS_OTHERS")
  private Boolean endodonticsOthers;

  @Column(name = "ENDODONTICS_OTHERS_TOOTH_NUMBER")
  private String endodonticsOthersToothNumber;

  @Column(name = "ENDODONTICS_OTHERS_SPECIFY")
  private String endodonticsOthersSpecify;

  @Column(name = "P_COMPLETE_DENTURE")
  private Boolean pCompleteDenture;

  @Column(name = "P_SINGLE_DENTURE")
  private Boolean pSingleDenture;

  @Column(name = "P_REMOVABLE_PARTIAL_DENTURE")
  private Boolean pRemovablePartialDenture;

  @Column(name = "P_OTHER_DENTURE_SERVICES")
  private Boolean pOtherDentureServices;

  public ProblemListWorksheet(
      String attendingClinician,
      Boolean managementOfPeriodontalDisease,
      Boolean odClass1,
      String odClass1Toothnum,
      Boolean odClass2,
      String odClass2Toothnum,
      Boolean odClass3,
      String odClass3Toothnum,
      Boolean odClass4,
      String odClass4Toothnum,
      Boolean odClass5,
      String odClass5Toothnum,
      Boolean odOnlay,
      String odOnlayToothnum,
      Boolean surgeryExtraction,
      String surgeryExtractionToothnum,
      Boolean surgeryOdonectomy,
      String surgeryOdonectomyToothnum,
      Boolean surgerySpecialCase,
      String surgerySpecialCaseToothnum,
      Boolean surgeryPedodontics,
      String surgeryPedodonticsToothnum,
      Boolean surgeryOrthodontics,
      String surgeryOrthodonticsToothnum,
      Boolean etPulpSedation,
      Boolean etRecementationOfCrowns,
      Boolean etTemporaryFillings,
      Boolean etManagementOfAcuteInfections,
      Boolean etManagementOfTraumaticInjuries,
      Boolean fpdLaminatesVeneers,
      String fpdLaminatesVeneersToothNumber,
      Boolean fpdSingleCrown,
      String fpdSingleCrownToothNumber,
      Boolean fpdBridge,
      String fpdBridgeToothNumber,
      Boolean endodonticsAnterior,
      String endodonticsAnteriorToothNumber,
      Boolean endodonticsPosterior,
      String endodonticsPosteriorToothNumber,
      Boolean endodonticsOthers,
      String endodonticsOthersToothNumber,
      String endodonticsOthersSpecify,
      Boolean pCompleteDenture,
      Boolean pSingleDenture,
      Boolean pRemovablePartialDenture,
      Boolean otherDentureServices) {
    this.attendingClinician = attendingClinician;
    this.managementOfPeriodontalDisease = managementOfPeriodontalDisease;
    this.odClass1 = odClass1;
    this.odClass1Toothnum = odClass1Toothnum;
    this.odClass2 = odClass2;
    this.odClass2Toothnum = odClass2Toothnum;
    this.odClass3 = odClass3;
    this.odClass3Toothnum = odClass3Toothnum;
    this.odClass4 = odClass4;
    this.odClass4Toothnum = odClass4Toothnum;
    this.odClass5 = odClass5;
    this.odClass5Toothnum = odClass5Toothnum;
    this.odOnlay = odOnlay;
    this.odOnlayToothnum = odOnlayToothnum;
    this.surgeryExtraction = surgeryExtraction;
    this.surgeryExtractionToothnum = surgeryExtractionToothnum;
    this.surgeryOdontectomy = surgeryOdonectomy;
    this.surgeryOdontectomyToothnum = surgeryOdonectomyToothnum;
    this.surgerySpecialCase = surgerySpecialCase;
    this.surgerySpecialCaseToothnum = surgerySpecialCaseToothnum;
    this.surgeryPedodontics = surgeryPedodontics;
    this.surgeryPedodonticsToothnum = surgeryPedodonticsToothnum;
    this.surgeryOrthodontics = surgeryOrthodontics;
    this.surgeryOrthodonticsToothnum = surgeryOrthodonticsToothnum;
    this.etPulpSedation = etPulpSedation;
    this.etRecementationOfCrowns = etRecementationOfCrowns;
    this.etTemporaryFillings = etTemporaryFillings;
    this.etManagementOfAcuteInfections = etManagementOfAcuteInfections;
    this.etManagementOfTraumaticInjuries = etManagementOfTraumaticInjuries;
    this.fpdLaminatesVeneers = fpdLaminatesVeneers;
    this.fpdLaminatesVeneersToothNumber = fpdLaminatesVeneersToothNumber;
    this.fpdSingleCrown = fpdSingleCrown;
    this.fpdSingleCrownToothNumber = fpdSingleCrownToothNumber;
    this.fpdBridge = fpdBridge;
    this.fpdBridgeToothNumber = fpdBridgeToothNumber;
    this.endodonticsAnterior = endodonticsAnterior;
    this.endodonticsAnteriorToothNumber = endodonticsAnteriorToothNumber;
    this.endodonticsPosterior = endodonticsPosterior;
    this.endodonticsPosteriorToothNumber = endodonticsPosteriorToothNumber;
    this.endodonticsOthers = endodonticsOthers;
    this.endodonticsOthersToothNumber = endodonticsOthersToothNumber;
    this.endodonticsOthersSpecify = endodonticsOthersSpecify;
    this.pCompleteDenture = pCompleteDenture;
    this.pSingleDenture = pSingleDenture;
    this.pRemovablePartialDenture = pRemovablePartialDenture;
    this.pOtherDentureServices = otherDentureServices;
  }
}
