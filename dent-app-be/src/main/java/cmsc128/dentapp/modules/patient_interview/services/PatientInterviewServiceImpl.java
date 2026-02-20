package cmsc128.dentapp.modules.patient_interview.services;

import org.springframework.stereotype.Service;

import cmsc128.dentapp.modules.patient.entities.Patient;
import cmsc128.dentapp.modules.patient.repositories.PatientRepository;
import cmsc128.dentapp.modules.patient_interview.dto.AddPatientInterviewDTO;
import cmsc128.dentapp.modules.patient_interview.entities.PatientInterview;
import cmsc128.dentapp.modules.patient_interview.repositories.PatientInterviewRepository;

@Service
public class PatientInterviewServiceImpl implements PatientInterviewService {

  private final PatientInterviewRepository patientInterviewRepository;

  private final PatientRepository patientRepository;

  public PatientInterviewServiceImpl(
      PatientInterviewRepository patientInterviewRepository, PatientRepository patientRepository) {
    this.patientRepository = patientRepository;
    this.patientInterviewRepository = patientInterviewRepository;
  }

  @Override
  public PatientInterview addPatientInterviewData(AddPatientInterviewDTO addPatientInterviewDTO) {

    Patient patient =
        patientRepository.findPatientByPatientID(addPatientInterviewDTO.getPatientID());

    PatientInterview patientInterview = addPatientInterviewDTO.mapToPatientInterview();
    patientInterview.setPatient(patient); // Associate the patient with the interview

    return patientInterviewRepository.save(patientInterview); // Replace with actual implementation
  }
}
