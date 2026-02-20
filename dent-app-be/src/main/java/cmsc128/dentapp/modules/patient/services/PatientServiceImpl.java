package cmsc128.dentapp.modules.patient.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import cmsc128.dentapp.Entities.DTO.*;
import cmsc128.dentapp.modules.medical_history.repositories.MedicalHistoryChartRepository;
import cmsc128.dentapp.modules.patient.dto.PatientListResponseDTO;
import cmsc128.dentapp.modules.patient.dto.RegisterPatientDTO;
import cmsc128.dentapp.modules.patient.entities.*;
import cmsc128.dentapp.modules.patient.repositories.PatientRepository;
import cmsc128.dentapp.modules.problem_list_worksheet.repositories.ProblemListWorksheetRepository;
import cmsc128.dentapp.modules.radiographic_exam.repositories.RadiographicExamRepository;
import cmsc128.dentapp.modules.soft_tissue_examination.repositories.SoftTissueExaminationRepository;
import cmsc128.dentapp.modules.treatment_plan_form.repositories.TreatmentPlanFormRepository;

@Service
public class PatientServiceImpl implements PatientService {
  private final PatientRepository patientRepository;

  public PatientServiceImpl(
      PatientRepository patientRepository,
      MedicalHistoryChartRepository medicalHistoryChartRepository,
      ProblemListWorksheetRepository problemListWorksheetRepository,
      RadiographicExamRepository radiographicExamRepository,
      SoftTissueExaminationRepository softTissueExaminationRepository,
      TreatmentPlanFormRepository treatmentPlanFormRepository) {
    this.patientRepository = patientRepository;
  }

  @Override
  public Patient findPatientByID(Long patientID) {
    return patientRepository.findPatientByPatientID(patientID);
  }

  @Override
  public Patient registerPatient(RegisterPatientDTO registerPatientDTO) {
    Patient patient = registerPatientDTO.mapToPatient();
    return this.patientRepository.save(patient);
  }

  @Override
  public Patient editPatient(Long patientID, EditPatientDTO editPatientDTO) {
    Patient patient = findPatientByID(patientID);

    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    try {
      Date registrationDate = dateFormat.parse(editPatientDTO.getRegistrationDate());
      patient.setRegistrationDate(registrationDate);
    } catch (ParseException e) {
      // Handle parsing exception
      e.printStackTrace();
    }

    patient.setLastName(editPatientDTO.getSurname());
    patient.setFirstName(editPatientDTO.getFirstName());
    patient.setMiddleName(editPatientDTO.getMiddleName());
    patient.setSex(editPatientDTO.getGender());
    patient.setCivilStatus(editPatientDTO.getCivilStatus());

    try {
      Date birthdate = dateFormat.parse(editPatientDTO.getBirthdate());
      patient.setBirthdate(birthdate);
    } catch (ParseException e) {
      // Handle parsing exception
      e.printStackTrace();
    }

    patient.setAge(Integer.valueOf(editPatientDTO.getAge()));
    patient.setContactNumber(editPatientDTO.getCellphoneNumber());
    patient.setEmergencyContact(editPatientDTO.getContactPersonName());
    patient.setEmergencyNumber(editPatientDTO.getContactPersonNumber());
    patient.setEmergencyRelationship(editPatientDTO.getContactPersonRelationship());

    return this.patientRepository.save(patient);
  }

  @Override
  public Long findLatestPatientId() {
    Patient latestPatient = patientRepository.findTopByOrderByPatientIDDesc();
    return (latestPatient == null) ? 0 : latestPatient.getPatientID();
  }

  public static Date convertToGMT8(Date date) {
    if (date == null) {
      return null;
    }
    // Convert Date to Instant and then to ZonedDateTime in the default timezone
    ZonedDateTime zonedDateTime = date.toInstant().atZone(ZoneId.systemDefault());
    // Convert ZonedDateTime to GMT+8
    ZonedDateTime gmt8ZonedDateTime = zonedDateTime.withZoneSameInstant(ZoneId.of("GMT+8"));
    // Convert ZonedDateTime back to Date
    return Date.from(gmt8ZonedDateTime.toInstant());
  }

  @Override
  public Patient findByPatientNumber(String patientNumber) {
    Optional optionalPatient = patientRepository.findByPatientNumber(patientNumber);

    if (optionalPatient.isPresent()) {
      Patient patient = (Patient) optionalPatient.get();
      return patient;
    }

    return null;
  }

  @Override
  public List<PatientListResponseDTO> getPatientList() {
    List<Patient> patients = patientRepository.findAll();
    return patients.stream()
        .map(
            patient ->
                new PatientListResponseDTO(
                    patient.getPatientID(),
                    patient.getPatientNumber(),
                    patient.getFirstName(),
                    patient.getMiddleName(),
                    patient.getLastName()))
        .toList();
  }

  @Override
  public List<Patient> getAllPatients() {
    return patientRepository.findAll();
  }
}
