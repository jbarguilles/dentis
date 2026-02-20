package cmsc128.dentapp.modules.radiographic_exam.services;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import cmsc128.dentapp.modules.patient.entities.Patient;
import cmsc128.dentapp.modules.patient.services.PatientService;
import cmsc128.dentapp.modules.radiographic_exam.dto.AddRadiographicExamDTO;
import cmsc128.dentapp.modules.radiographic_exam.entities.RadiographicExam;
import cmsc128.dentapp.modules.radiographic_exam.repositories.RadiographicExamRepository;

@Service
public class RadiographicExamServiceImpl implements RadiographicExamService {
  private final RadiographicExamRepository radiographicExamRepository;

  @Qualifier("PatientServiceImpl")
  private final PatientService patientService;

  public RadiographicExamServiceImpl(
      RadiographicExamRepository radiographicExamRepository, PatientService patientService) {
    this.radiographicExamRepository = radiographicExamRepository;
    this.patientService = patientService;
  }

  @Override
  public RadiographicExam saveRE(AddRadiographicExamDTO radiographicExamRequest) {

    Patient patient =
        patientService.findPatientByID(Long.valueOf(radiographicExamRequest.getPatientNumber()));
    RadiographicExam radiographicExam = new RadiographicExam();

    if (radiographicExamRequest.getReDate() != "") {
      radiographicExam.setReDate(java.sql.Date.valueOf(radiographicExamRequest.getReDate()));
    }
    radiographicExam.setToothNo(radiographicExamRequest.getToothNo());
    radiographicExam.setFindings(radiographicExamRequest.getFindings());
    radiographicExam.setNameOfClinician(radiographicExamRequest.getNameOfClinician());
    radiographicExam.setCliniciansSignature(radiographicExamRequest.getCliniciansSignature());

    return this.radiographicExamRepository.save(radiographicExam);
  }
}
