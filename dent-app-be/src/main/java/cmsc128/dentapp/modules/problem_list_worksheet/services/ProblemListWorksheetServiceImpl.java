package cmsc128.dentapp.modules.problem_list_worksheet.services;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import cmsc128.dentapp.modules.patient.entities.Patient;
import cmsc128.dentapp.modules.patient.services.PatientService;
import cmsc128.dentapp.modules.problem_list_worksheet.dto.AddProblemListWorksheetDTO;
import cmsc128.dentapp.modules.problem_list_worksheet.entities.ProblemListWorksheet;
import cmsc128.dentapp.modules.problem_list_worksheet.repositories.ProblemListWorksheetRepository;

@Service
public class ProblemListWorksheetServiceImpl implements ProblemListWorksheetService {
  private final ProblemListWorksheetRepository problemListWorksheetRepository;

  @Qualifier("PatientServiceImpl")
  private final PatientService patientService;

  public ProblemListWorksheetServiceImpl(
      ProblemListWorksheetRepository problemListWorksheetRepository,
      PatientService patientService) {
    this.problemListWorksheetRepository = problemListWorksheetRepository;
    this.patientService = patientService;
  }

  @Override
  public ProblemListWorksheet savePLW(AddProblemListWorksheetDTO problemListWorksheetRequest) {

    Patient patient =
        patientService.findPatientByID(problemListWorksheetRequest.getPatientNumber());
    ProblemListWorksheet problemListWorksheet = new ProblemListWorksheet();

    problemListWorksheet.setAttendingClinician(problemListWorksheetRequest.getAttendingClinician());
    problemListWorksheet.setManagementOfPeriodontalDisease(
        problemListWorksheetRequest.getManagementOfPeriodontalDisease());
    problemListWorksheet.setOdClass1(problemListWorksheetRequest.getOdClass1());
    problemListWorksheet.setOdClass1Toothnum(problemListWorksheetRequest.getOdClass1Toothnum());
    problemListWorksheet.setOdClass2(problemListWorksheetRequest.getOdClass2());
    problemListWorksheet.setOdClass2Toothnum(problemListWorksheetRequest.getOdClass2Toothnum());
    problemListWorksheet.setOdClass3(problemListWorksheetRequest.getOdClass3());
    problemListWorksheet.setOdClass3Toothnum(problemListWorksheetRequest.getOdClass3Toothnum());
    problemListWorksheet.setOdClass4(problemListWorksheetRequest.getOdClass4());
    problemListWorksheet.setOdClass4Toothnum(problemListWorksheetRequest.getOdClass4Toothnum());
    problemListWorksheet.setOdClass5(problemListWorksheetRequest.getOdClass5());
    problemListWorksheet.setOdClass5Toothnum(problemListWorksheetRequest.getOdClass5Toothnum());
    problemListWorksheet.setOdOnlay(problemListWorksheetRequest.getOdOnlay());
    problemListWorksheet.setOdOnlayToothnum(problemListWorksheetRequest.getOdOnlayToothnum());
    problemListWorksheet.setSurgeryExtraction(problemListWorksheetRequest.getSurgeryExtraction());
    problemListWorksheet.setSurgeryExtractionToothnum(
        problemListWorksheetRequest.getSurgeryExtractionToothnum());
    problemListWorksheet.setSurgeryOdontectomy(problemListWorksheetRequest.getSurgeryOdonectomy());
    problemListWorksheet.setSurgeryOdontectomyToothnum(
        problemListWorksheetRequest.getSurgeryOdonectomyToothnum());
    problemListWorksheet.setSurgerySpecialCase(problemListWorksheetRequest.getSurgerySpecialCase());
    problemListWorksheet.setSurgerySpecialCaseToothnum(
        problemListWorksheetRequest.getSurgerySpecialCaseToothnum());
    problemListWorksheet.setSurgeryPedodontics(problemListWorksheetRequest.getSurgeryPedodontics());
    problemListWorksheet.setSurgeryPedodonticsToothnum(
        problemListWorksheetRequest.getSurgeryPedodonticsToothnum());
    problemListWorksheet.setSurgeryOrthodontics(
        problemListWorksheetRequest.getSurgeryOrthodontics());
    problemListWorksheet.setSurgeryOrthodonticsToothnum(
        problemListWorksheetRequest.getSurgeryOrthodonticsToothnum());
    problemListWorksheet.setEtPulpSedation(problemListWorksheetRequest.getEtPulpSedation());
    problemListWorksheet.setEtRecementationOfCrowns(
        problemListWorksheetRequest.getEtRecementationOfCrowns());
    problemListWorksheet.setEtTemporaryFillings(
        problemListWorksheetRequest.getEtTemporaryFillings());
    problemListWorksheet.setEtManagementOfAcuteInfections(
        problemListWorksheetRequest.getEtManagementOfAcuteInfections());
    problemListWorksheet.setEtManagementOfTraumaticInjuries(
        problemListWorksheetRequest.getEtManagementOfTraumaticInjuries());
    problemListWorksheet.setFpdLaminatesVeneers(
        problemListWorksheetRequest.getFpdLaminatesVeneers());
    problemListWorksheet.setFpdLaminatesVeneersToothNumber(
        problemListWorksheetRequest.getFpdLaminatesVeneersToothNumber());
    problemListWorksheet.setFpdSingleCrown(problemListWorksheetRequest.getFpdSingleCrown());
    problemListWorksheet.setFpdSingleCrownToothNumber(
        problemListWorksheetRequest.getFpdSingleCrownToothNumber());
    problemListWorksheet.setFpdBridge(problemListWorksheetRequest.getFpdBridge());
    problemListWorksheet.setFpdBridgeToothNumber(
        problemListWorksheetRequest.getFpdBridgeToothNumber());
    problemListWorksheet.setEndodonticsAnterior(
        problemListWorksheetRequest.getEndodonticsAnterior());
    problemListWorksheet.setEndodonticsAnteriorToothNumber(
        problemListWorksheetRequest.getEndodonticsAnteriorToothNumber());
    problemListWorksheet.setEndodonticsPosterior(
        problemListWorksheetRequest.getEndodonticsPosterior());
    problemListWorksheet.setEndodonticsPosteriorToothNumber(
        problemListWorksheetRequest.getEndodonticsPosteriorToothNumber());
    problemListWorksheet.setEndodonticsOthers(problemListWorksheetRequest.getEndodonticsOthers());
    problemListWorksheet.setEndodonticsOthersToothNumber(
        problemListWorksheetRequest.getEndodonticsOthersToothNumber());
    problemListWorksheet.setEndodonticsOthersSpecify(
        problemListWorksheetRequest.getEndodonticsOthersSpecify());
    problemListWorksheet.setPCompleteDenture(problemListWorksheetRequest.getPCompleteDenture());
    problemListWorksheet.setPSingleDenture(problemListWorksheetRequest.getPSingleDenture());
    problemListWorksheet.setPRemovablePartialDenture(
        problemListWorksheetRequest.getPRemovablePartialDenture());
    problemListWorksheet.setPOtherDentureServices(
        problemListWorksheetRequest.getOtherDentureServices());

    return this.problemListWorksheetRepository.save(problemListWorksheet);
  }
}
