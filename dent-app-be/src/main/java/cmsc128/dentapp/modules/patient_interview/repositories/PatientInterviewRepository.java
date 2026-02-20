package cmsc128.dentapp.modules.patient_interview.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cmsc128.dentapp.modules.patient_interview.entities.PatientInterview;

@Repository
public interface PatientInterviewRepository extends JpaRepository<PatientInterview, Long> {
  // Additional query methods if needed
}
