package cmsc128.dentapp.modules.physical_assessment.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import cmsc128.dentapp.modules.physical_assessment.dto.PhysicalAssessmentDTO;
import cmsc128.dentapp.modules.physical_assessment.entities.PhysicalAssessment;
import cmsc128.dentapp.modules.physical_assessment.services.PhysicalAssessmentService;

@CrossOrigin
@RestController
@RequestMapping(path = {"/physical-assessment"})
public class PhysicalAssessmentController {

  private final PhysicalAssessmentService physicalAssessmentService;

  public PhysicalAssessmentController(PhysicalAssessmentService physicalAssessmentService) {
    this.physicalAssessmentService = physicalAssessmentService;
  }

  @PostMapping(path = {"/add"})
  @ResponseBody
  public PhysicalAssessment addPhysicalAssessment(
      @RequestBody PhysicalAssessmentDTO physicalAssessmentDTO) {
    return this.physicalAssessmentService.addPhysicalAssessment(physicalAssessmentDTO);
  }

  @GetMapping(path = {"/getLatestID"})
  @ResponseBody
  public Long getLatestID() {
    return this.physicalAssessmentService.findLatestPhysicalAssessmentId();
  }

  @GetMapping(path = {"/findById"})
  @ResponseBody
  public PhysicalAssessment findPhysicalAssessmentById(
      @RequestParam(value = "physicalAssessmentId") Long physicalAssessmentId) {
    return this.physicalAssessmentService.findPhysicalAssessmentById(physicalAssessmentId);
  }

  @GetMapping(path = {"/findByPatientId"})
  @ResponseBody
  public List<PhysicalAssessment> findByPatientId(
      @RequestParam(value = "patientId") Long patientId) {
    return this.physicalAssessmentService.findByPatientId(patientId);
  }

  @GetMapping(path = {"/findByPatientNumber"})
  @ResponseBody
  public List<PhysicalAssessment> findByPatientNumber(
      @RequestParam(value = "patientNumber") String patientNumber) {
    return this.physicalAssessmentService.findByPatientNumber(patientNumber);
  }

  @GetMapping(path = {"/findLatestByPatientNumber"})
  @ResponseBody
  public PhysicalAssessment findLatestByPatientNumber(
      @RequestParam(value = "patientNumber") String patientNumber) {
    return this.physicalAssessmentService.findLatestByPatientNumber(patientNumber);
  }

  @PutMapping(path = {"/edit"})
  @ResponseBody
  public PhysicalAssessment editPhysicalAssessment(
      @RequestParam Long physicalAssessmentId,
      @RequestBody PhysicalAssessmentDTO physicalAssessmentDTO) {
    return this.physicalAssessmentService.editPhysicalAssessment(
        physicalAssessmentId, physicalAssessmentDTO);
  }
}
