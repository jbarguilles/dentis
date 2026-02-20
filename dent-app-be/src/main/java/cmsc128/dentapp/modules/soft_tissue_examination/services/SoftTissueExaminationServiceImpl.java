package cmsc128.dentapp.modules.soft_tissue_examination.services;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import cmsc128.dentapp.Service.FileStorageService;
import cmsc128.dentapp.modules.patient.entities.Patient;
import cmsc128.dentapp.modules.patient.services.PatientService;
import cmsc128.dentapp.modules.soft_tissue_examination.dto.AddSoftTissueExaminationDTO;
import cmsc128.dentapp.modules.soft_tissue_examination.entities.SoftTissueExamination;
import cmsc128.dentapp.modules.soft_tissue_examination.repositories.SoftTissueExaminationRepository;

@Service
public class SoftTissueExaminationServiceImpl implements SoftTissueExaminationService {
  private final SoftTissueExaminationRepository softTissueExaminationRepository;
  private final FileStorageService fileStorageService;

  @Qualifier("PatientServiceImpl")
  private final PatientService patientService;

  public SoftTissueExaminationServiceImpl(
      SoftTissueExaminationRepository softTissueExaminationRepository,
      FileStorageService fileStorageService,
      PatientService patientService) {
    this.softTissueExaminationRepository = softTissueExaminationRepository;
    this.fileStorageService = fileStorageService;
    this.patientService = patientService;
  }

  @Override
  public SoftTissueExamination saveSTE(AddSoftTissueExaminationDTO softTissueExaminationRequest) {
    Patient patient =
        patientService.findPatientByID(softTissueExaminationRequest.getPatientNumber());
    SoftTissueExamination softTissueExamination = new SoftTissueExamination();

    if (softTissueExaminationRequest.getDate() != null
        && !softTissueExaminationRequest.getDate().isEmpty()) {
      softTissueExamination.setDate(Date.valueOf(softTissueExaminationRequest.getDate()));
    }

    softTissueExamination.setHeadNeckTmj(softTissueExaminationRequest.getHeadNeckTmj());
    softTissueExamination.setMucosa(softTissueExaminationRequest.getMucosa());
    softTissueExamination.setPharynx(softTissueExaminationRequest.getPharynx());
    softTissueExamination.setTongue(softTissueExaminationRequest.getTongue());
    softTissueExamination.setSalivaryGland(softTissueExaminationRequest.getSalivaryGland());
    softTissueExamination.setGingiva(softTissueExaminationRequest.getGingiva());
    softTissueExamination.setLipsFrenum(softTissueExaminationRequest.getLipsFrenum());
    softTissueExamination.setPalate(softTissueExaminationRequest.getPalate());
    softTissueExamination.setFloorOfMouth(softTissueExaminationRequest.getFloorOfMouth());
    softTissueExamination.setLymphNodes(softTissueExaminationRequest.getLymphNodes());
    softTissueExamination.setThyroid(softTissueExaminationRequest.getThyroid());

    // Process image byte arrays and save as files
    try {
      if (softTissueExaminationRequest.getMouthImageData() != null
          && softTissueExaminationRequest.getMouthImageData().length > 0) {
        String mouthPath =
            fileStorageService.saveDrawingImage(
                softTissueExaminationRequest.getPatientNumber(),
                "mouth",
                softTissueExaminationRequest.getMouthImageData());
        softTissueExamination.setMouthImagePath(mouthPath);
      }

      if (softTissueExaminationRequest.getNeckImageData() != null
          && softTissueExaminationRequest.getNeckImageData().length > 0) {
        String neckPath =
            fileStorageService.saveDrawingImage(
                softTissueExaminationRequest.getPatientNumber(),
                "neck",
                softTissueExaminationRequest.getNeckImageData());
        softTissueExamination.setNeckImagePath(neckPath);
      }

      if (softTissueExaminationRequest.getTongueImageData() != null
          && softTissueExaminationRequest.getTongueImageData().length > 0) {
        String tonguePath =
            fileStorageService.saveDrawingImage(
                softTissueExaminationRequest.getPatientNumber(),
                "tongue",
                softTissueExaminationRequest.getTongueImageData());
        softTissueExamination.setTongueImagePath(tonguePath);
      }

      if (softTissueExaminationRequest.getUnderTongueImageData() != null
          && softTissueExaminationRequest.getUnderTongueImageData().length > 0) {
        String underTonguePath =
            fileStorageService.saveDrawingImage(
                softTissueExaminationRequest.getPatientNumber(),
                "under_tongue",
                softTissueExaminationRequest.getUnderTongueImageData());
        softTissueExamination.setUnderTongueImagePath(underTonguePath);
      }
    } catch (Exception e) {
      // Log error but continue saving the examination data
      System.err.println("Error saving drawing images: " + e.getMessage());
    }

    return softTissueExaminationRepository.save(softTissueExamination);
  }

  @Override
  public SoftTissueExamination findSoftTissueExaminationById(Long steId) {
    return softTissueExaminationRepository.findById(steId).orElse(null);
  }

  //    @Override
  //    public List<SoftTissueExamination> findByPatientId(Long patientId) {
  //        return softTissueExaminationRepository.findByPatient_PatientID(patientId);
  //    }

  @Override
  public SoftTissueExamination editSoftTissueExamination(
      Long steId, AddSoftTissueExaminationDTO softTissueExaminationRequest) {
    SoftTissueExamination softTissueExamination = findSoftTissueExaminationById(steId);
    if (softTissueExamination == null) {
      return null;
    }

    //        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    //        try {
    //            if(softTissueExaminationRequest.getDate() != null &&
    // !softTissueExaminationRequest.getDate().isEmpty()) {
    //                Date date = dateFormat.parse(softTissueExaminationRequest.getDate());
    //                softTissueExamination.setDate(date);
    //            }
    //        } catch (ParseException e) {
    //            e.printStackTrace();
    //        }

    softTissueExamination.setHeadNeckTmj(softTissueExaminationRequest.getHeadNeckTmj());
    softTissueExamination.setMucosa(softTissueExaminationRequest.getMucosa());
    softTissueExamination.setPharynx(softTissueExaminationRequest.getPharynx());
    softTissueExamination.setTongue(softTissueExaminationRequest.getTongue());
    softTissueExamination.setSalivaryGland(softTissueExaminationRequest.getSalivaryGland());
    softTissueExamination.setGingiva(softTissueExaminationRequest.getGingiva());
    softTissueExamination.setLipsFrenum(softTissueExaminationRequest.getLipsFrenum());
    softTissueExamination.setPalate(softTissueExaminationRequest.getPalate());
    softTissueExamination.setFloorOfMouth(softTissueExaminationRequest.getFloorOfMouth());
    softTissueExamination.setLymphNodes(softTissueExaminationRequest.getLymphNodes());
    softTissueExamination.setThyroid(softTissueExaminationRequest.getThyroid());

    // Update image paths
    softTissueExamination.setMouthImagePath(softTissueExaminationRequest.getMouthImagePath());
    softTissueExamination.setNeckImagePath(softTissueExaminationRequest.getNeckImagePath());
    softTissueExamination.setTongueImagePath(softTissueExaminationRequest.getTongueImagePath());
    softTissueExamination.setUnderTongueImagePath(
        softTissueExaminationRequest.getUnderTongueImagePath());

    return softTissueExaminationRepository.save(softTissueExamination);
  }

  @Override
  public Long findLatestSoftTissueExaminationId() {
    SoftTissueExamination latest = softTissueExaminationRepository.findTopByOrderBySteIdDesc();
    return (latest == null) ? 0 : latest.getSteId();
  }

  @Override
  public String saveDrawingImage(Long patientId, String imageType, MultipartFile imageFile)
      throws Exception {
    // Validate file
    if (imageFile.isEmpty()) {
      throw new IllegalArgumentException("Image file cannot be empty");
    }

    // Validate file type
    String contentType = imageFile.getContentType();
    if (contentType == null || !contentType.startsWith("image/")) {
      throw new IllegalArgumentException("File must be an image");
    }

    // Validate file size (e.g., max 10MB)
    if (imageFile.getSize() > 10 * 1024 * 1024) {
      throw new IllegalArgumentException("File size cannot exceed 10MB");
    }

    // Save file using FileStorageService and return path
    return fileStorageService.saveDrawingImage(patientId, imageType, imageFile);
  }
}
