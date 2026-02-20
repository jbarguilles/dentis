package cmsc128.dentapp.modules.patient_referral.services;

import cmsc128.dentapp.modules.patient_referral.dto.CreatePatientReferralDTO;
import cmsc128.dentapp.modules.patient_referral.dto.PatientReferralResponseDTO;
import cmsc128.dentapp.modules.patient_referral.dto.UpdatePatientReferralDTO;
import cmsc128.dentapp.modules.patient_referral.entities.ReferralStatus;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface PatientReferralService {
  
  PatientReferralResponseDTO createReferral(CreatePatientReferralDTO createDTO, Long userId);
  
  Page<PatientReferralResponseDTO> getAllReferrals(
      int page,
      int size,
      String search,
      String treatment,
      String sectionOrigin,
      String sectionDestination,
      ReferralStatus status
  );
  
  PatientReferralResponseDTO getReferralById(Long referralId);
  
  PatientReferralResponseDTO updateReferral(Long referralId, UpdatePatientReferralDTO updateDTO);
  
  PatientReferralResponseDTO acceptReferral(Long referralId, Long userId);
  
  PatientReferralResponseDTO rejectReferral(Long referralId, Long userId);
  
  void deleteReferral(Long referralId);
  
  boolean validateChartNumber(String chartNumber);
}
