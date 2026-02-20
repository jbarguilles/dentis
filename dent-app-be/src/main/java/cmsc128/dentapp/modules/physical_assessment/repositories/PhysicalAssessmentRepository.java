package cmsc128.dentapp.modules.physical_assessment.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import cmsc128.dentapp.modules.physical_assessment.entities.PhysicalAssessment;

@Repository
public interface PhysicalAssessmentRepository extends JpaRepository<PhysicalAssessment, Long> {
  PhysicalAssessment findPhysicalAssessmentByPhysicalAssessmentId(Long physicalAssessmentId);

  List<PhysicalAssessment> findByPatientId(Long patientId);

  PhysicalAssessment findTopByOrderByPhysicalAssessmentIdDesc();

  @Query(
      "SELECT pa FROM PHYSICAL_ASSESSMENT pa JOIN PATIENT p ON pa.patientId = p.patientID WHERE p.patientNumber = :patientNumber")
  List<PhysicalAssessment> findByPatientNumber(@Param("patientNumber") String patientNumber);

  @Query(
      "SELECT pa FROM PHYSICAL_ASSESSMENT pa JOIN PATIENT p ON pa.patientId = p.patientID WHERE p.patientNumber = :patientNumber ORDER BY pa.createdAt DESC LIMIT 1")
  PhysicalAssessment findLatestByPatientNumber(@Param("patientNumber") String patientNumber);
}
