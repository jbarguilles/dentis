package cmsc128.dentapp.modules.patient.services;

import java.util.List;

import org.springframework.stereotype.Service;

import cmsc128.dentapp.Entities.DTO.EditPatientDTO;
import cmsc128.dentapp.modules.patient.dto.PatientListResponseDTO;
import cmsc128.dentapp.modules.patient.dto.RegisterPatientDTO;
import cmsc128.dentapp.modules.patient.entities.Patient;

@Service
public interface PatientService {
  public Patient findPatientByID(Long patientID);

  Patient registerPatient(RegisterPatientDTO patientRequest);

  Patient editPatient(Long patientID, EditPatientDTO editPatientDTO);

  Long findLatestPatientId();

  Patient findByPatientNumber(String patientNumber);

  List<PatientListResponseDTO> getPatientList();

  List<Patient> getAllPatients();
}
