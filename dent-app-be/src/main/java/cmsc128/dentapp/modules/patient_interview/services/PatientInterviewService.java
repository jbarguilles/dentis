package cmsc128.dentapp.modules.patient_interview.services;

import org.springframework.stereotype.Service;

import cmsc128.dentapp.modules.patient_interview.dto.AddPatientInterviewDTO;
import cmsc128.dentapp.modules.patient_interview.entities.PatientInterview;

@Service
public interface PatientInterviewService {

  PatientInterview addPatientInterviewData(AddPatientInterviewDTO addPatientInterviewDTO);
}
