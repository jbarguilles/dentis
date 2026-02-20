package cmsc128.dentapp.modules.patient_referral.controllers;

import cmsc128.dentapp.Security.JwtAuthenticationFilter.CustomAuthenticationDetails;
import cmsc128.dentapp.modules.patient_referral.dto.CreatePatientReferralDTO;
import cmsc128.dentapp.modules.patient_referral.dto.PatientReferralResponseDTO;
import cmsc128.dentapp.modules.patient_referral.dto.UpdatePatientReferralDTO;
import cmsc128.dentapp.modules.patient_referral.entities.ReferralStatus;
import cmsc128.dentapp.modules.patient_referral.services.PatientReferralService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping(path = {"/patient-referral"})
public class PatientReferralController {

  private final PatientReferralService patientReferralService;

  public PatientReferralController(PatientReferralService patientReferralService) {
    this.patientReferralService = patientReferralService;
  }

  private Long getCurrentUserId() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null && authentication.getDetails() instanceof CustomAuthenticationDetails) {
      CustomAuthenticationDetails details = (CustomAuthenticationDetails) authentication.getDetails();
      return details.getUserId();
    }
    throw new RuntimeException("User not authenticated");
  }

  @PostMapping(path = {"/create"})
  @ResponseBody
  public PatientReferralResponseDTO createReferral(@RequestBody CreatePatientReferralDTO createDTO) {
    Long userId = getCurrentUserId();
    return patientReferralService.createReferral(createDTO, userId);
  }

  @GetMapping(path = {"/list"})
  @ResponseBody
  public Page<PatientReferralResponseDTO> getAllReferrals(
      @RequestParam(value = "page", defaultValue = "0") int page,
      @RequestParam(value = "size", defaultValue = "10") int size,
      @RequestParam(value = "search", required = false) String search,
      @RequestParam(value = "treatment", required = false) String treatment,
      @RequestParam(value = "sectionOrigin", required = false) String sectionOrigin,
      @RequestParam(value = "sectionDestination", required = false) String sectionDestination,
      @RequestParam(value = "status", required = false) ReferralStatus status) {
    
    return patientReferralService.getAllReferrals(
        page, size, search, treatment, sectionOrigin, sectionDestination, status);
  }

  @GetMapping(path = {"/findById"})
  @ResponseBody
  public PatientReferralResponseDTO getReferralById(@RequestParam(value = "id") Long id) {
    return patientReferralService.getReferralById(id);
  }

  @PutMapping(path = {"/edit"})
  @ResponseBody
  public PatientReferralResponseDTO updateReferral(
      @RequestParam(value = "id") Long id,
      @RequestBody UpdatePatientReferralDTO updateDTO) {
    return patientReferralService.updateReferral(id, updateDTO);
  }

  @PutMapping(path = {"/accept"})
  @ResponseBody
  public PatientReferralResponseDTO acceptReferral(@RequestParam(value = "id") Long id) {
    Long userId = getCurrentUserId();
    return patientReferralService.acceptReferral(id, userId);
  }

  @PutMapping(path = {"/reject"})
  @ResponseBody
  public PatientReferralResponseDTO rejectReferral(@RequestParam(value = "id") Long id) {
    Long userId = getCurrentUserId();
    return patientReferralService.rejectReferral(id, userId);
  }

  @DeleteMapping(path = {"/delete"})
  @ResponseBody
  public ResponseEntity<Map<String, String>> deleteReferral(@RequestParam(value = "id") Long id) {
    patientReferralService.deleteReferral(id);
    Map<String, String> response = new HashMap<>();
    response.put("message", "Referral deleted successfully");
    return ResponseEntity.ok(response);
  }

  @GetMapping(path = {"/validate-chart"})
  @ResponseBody
  public ResponseEntity<Map<String, Boolean>> validateChartNumber(
      @RequestParam(value = "chartNumber") String chartNumber) {
    boolean isValid = patientReferralService.validateChartNumber(chartNumber);
    Map<String, Boolean> response = new HashMap<>();
    response.put("valid", isValid);
    return ResponseEntity.ok(response);
  }
}
