package cmsc128.dentapp.modules.soft_tissue_examination.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cmsc128.dentapp.modules.soft_tissue_examination.entities.SoftTissueExamination;

@Repository
public interface SoftTissueExaminationRepository
    extends JpaRepository<SoftTissueExamination, Long> {
  //    List<SoftTissueExamination> findByPatient_PatientID(Long patientId);
  SoftTissueExamination findTopByOrderBySteIdDesc();
}
