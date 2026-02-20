package cmsc128.dentapp.modules.patient_interview.controllers;

import org.springframework.web.bind.annotation.*;

import cmsc128.dentapp.modules.patient_interview.dto.AddPatientInterviewDTO;
import cmsc128.dentapp.modules.patient_interview.entities.PatientInterview;
import cmsc128.dentapp.modules.patient_interview.services.PatientInterviewService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/patient-interview")
public class PatientInterviewController {

  private final PatientInterviewService patientInterviewService;

  public PatientInterviewController(PatientInterviewService patientInterviewService) {
    this.patientInterviewService = patientInterviewService;
  }

  @PostMapping(path = "/add")
  public PatientInterview addInterviewData(@RequestBody AddPatientInterviewDTO request) {

    return patientInterviewService.addPatientInterviewData(request);
  }
}
