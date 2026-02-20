package cmsc128.dentapp.modules.soft_tissue_examination.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import cmsc128.dentapp.modules.soft_tissue_examination.dto.AddSoftTissueExaminationDTO;
import cmsc128.dentapp.modules.soft_tissue_examination.entities.SoftTissueExamination;
import cmsc128.dentapp.modules.soft_tissue_examination.services.SoftTissueExaminationService;

@CrossOrigin
@RestController
@RequestMapping(path = {"/soft-tissue-examination"})
public class SoftTissueExaminationController {
  private final SoftTissueExaminationService softTissueExaminationService;

  public SoftTissueExaminationController(
      SoftTissueExaminationService softTissueExaminationService) {
    this.softTissueExaminationService = softTissueExaminationService;
  }

  @PostMapping(path = {"/add"})
  @ResponseBody
  public SoftTissueExamination addSoftTissueExamination(
      @RequestBody AddSoftTissueExaminationDTO addSoftTissueExaminationDTO) {
    return this.softTissueExaminationService.saveSTE(addSoftTissueExaminationDTO);
  }

  @GetMapping(path = {"/getLatestID"})
  @ResponseBody
  public Long getLatestID() {
    return this.softTissueExaminationService.findLatestSoftTissueExaminationId();
  }

  @GetMapping(path = {"/findById"})
  @ResponseBody
  public SoftTissueExamination findSoftTissueExaminationById(
      @RequestParam(value = "steId") Long steId) {
    return this.softTissueExaminationService.findSoftTissueExaminationById(steId);
  }

  //    @GetMapping(path = {"/findByPatientId"})
  //    @ResponseBody
  //    public List<SoftTissueExamination> findByPatientId(@RequestParam(value = "patientId") Long
  // patientId) {
  //        return this.softTissueExaminationService.findByPatientId(patientId);
  //    }

  @PutMapping(path = {"/edit"})
  @ResponseBody
  public SoftTissueExamination editSoftTissueExamination(
      @RequestParam Long steId,
      @RequestBody AddSoftTissueExaminationDTO addSoftTissueExaminationDTO) {
    return this.softTissueExaminationService.editSoftTissueExamination(
        steId, addSoftTissueExaminationDTO);
  }

  @PostMapping(path = {"/save-drawing"})
  @ResponseBody
  public ResponseEntity<?> saveDrawingImage(
      @RequestParam("patient_id") Long patientId,
      @RequestParam("image_type") String imageType,
      @RequestParam("image_data") MultipartFile imageFile) {
    try {
      // Validate inputs
      if (patientId == null || imageType == null || imageFile.isEmpty()) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("success", false);
        errorResponse.put("error", "Missing required parameters");
        return ResponseEntity.badRequest().body(errorResponse);
      }

      String imagePath =
          softTissueExaminationService.saveDrawingImage(patientId, imageType, imageFile);

      Map<String, Object> response = new HashMap<>();
      response.put("success", true);
      response.put("image_path", imagePath);

      return ResponseEntity.ok(response);
    } catch (Exception e) {
      Map<String, Object> errorResponse = new HashMap<>();
      errorResponse.put("success", false);
      errorResponse.put("error", e.getMessage());

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
  }
}
