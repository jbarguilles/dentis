package cmsc128.dentapp.modules.soft_tissue_examination.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import cmsc128.dentapp.modules.soft_tissue_examination.dto.AddSoftTissueExaminationDTO;
import cmsc128.dentapp.modules.soft_tissue_examination.entities.SoftTissueExamination;

@Service
public interface SoftTissueExaminationService {
  SoftTissueExamination saveSTE(AddSoftTissueExaminationDTO addSoftTissueExaminationDTO);

  SoftTissueExamination findSoftTissueExaminationById(Long steId);

  //    List<SoftTissueExamination> findByPatientId(Long patientId);
  SoftTissueExamination editSoftTissueExamination(
      Long steId, AddSoftTissueExaminationDTO addSoftTissueExaminationDTO);

  Long findLatestSoftTissueExaminationId();

  String saveDrawingImage(Long patientId, String imageType, MultipartFile imageFile)
      throws Exception;
}
