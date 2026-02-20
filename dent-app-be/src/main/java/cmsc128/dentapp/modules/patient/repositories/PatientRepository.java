package cmsc128.dentapp.modules.patient.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cmsc128.dentapp.modules.patient.entities.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
  Optional<Patient> findByPatientNumber(String patientNumber);

  Patient findPatientByPatientID(Long patientID);

  Patient findTopByOrderByPatientIDDesc();
}
