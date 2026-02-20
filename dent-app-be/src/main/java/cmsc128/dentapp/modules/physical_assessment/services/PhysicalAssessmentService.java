package cmsc128.dentapp.modules.physical_assessment.services;

import java.util.List;

import org.springframework.stereotype.Service;

import cmsc128.dentapp.modules.physical_assessment.dto.PhysicalAssessmentDTO;
import cmsc128.dentapp.modules.physical_assessment.entities.PhysicalAssessment;

@Service
public interface PhysicalAssessmentService {
  PhysicalAssessment findPhysicalAssessmentById(Long physicalAssessmentId);

  PhysicalAssessment addPhysicalAssessment(PhysicalAssessmentDTO physicalAssessmentDTO);

  PhysicalAssessment editPhysicalAssessment(
      Long physicalAssessmentId, PhysicalAssessmentDTO physicalAssessmentDTO);

  List<PhysicalAssessment> findByPatientId(Long patientId);

  List<PhysicalAssessment> findByPatientNumber(String patientNumber);

  PhysicalAssessment findLatestByPatientNumber(String patientNumber);

  Long findLatestPhysicalAssessmentId();
}
