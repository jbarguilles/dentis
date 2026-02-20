package cmsc128.dentapp.modules.patient.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import cmsc128.dentapp.Entities.DTO.EditPatientDTO;
import cmsc128.dentapp.modules.patient.dto.PatientListResponseDTO;
import cmsc128.dentapp.modules.patient.dto.RegisterPatientDTO;
import cmsc128.dentapp.modules.patient.entities.Patient;
import cmsc128.dentapp.modules.patient.services.PatientService;

@CrossOrigin
@RestController
@RequestMapping(path = {"/patient"})
public class PatientController {

  private final PatientService patientService;

  public PatientController(PatientService patientService) {
    this.patientService = patientService;
  }

  @PostMapping(path = {"/register"})
  @ResponseBody
  public Patient registerPatient(@RequestBody RegisterPatientDTO registerPatientDTO) {
    return this.patientService.registerPatient(registerPatientDTO);
  }

  @GetMapping(path = {"/getLatestID"})
  @ResponseBody
  public Long getLatestID() {
    return this.patientService.findLatestPatientId();
  }

  @GetMapping(path = {"/findByPatientNumber"})
  @ResponseBody
  public Patient getPatientByPatientNumber(
      @RequestParam(value = "patientNumber") String patientNumber) {
    return this.patientService.findByPatientNumber(patientNumber);
  }

  @PutMapping(path = {"/edit"})
  @ResponseBody
  public Patient editPatient(
      @RequestParam Long patientID, @RequestBody EditPatientDTO editPatientDTO) {
    return this.patientService.editPatient(patientID, editPatientDTO);
  }

  @GetMapping(path = {"/findById"})
  @ResponseBody
  public Patient findPatientById(@RequestParam(value = "patientID") Long patientID) {
    return this.patientService.findPatientByID(patientID);
  }

  @GetMapping(path = {"/list"})
  @ResponseBody
  public List<PatientListResponseDTO> getPatientList() {

    return this.patientService.getPatientList();
  }

  @GetMapping(path = {"/getAll"})
  @ResponseBody
  public List<Patient> getAllPatients() {
    return this.patientService.getAllPatients();
  }
}
