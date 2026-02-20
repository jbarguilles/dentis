package cmsc128.dentapp.modules.patient_referral.services;

import cmsc128.dentapp.modules.patient.entities.Patient;
import cmsc128.dentapp.modules.patient.repositories.PatientRepository;
import cmsc128.dentapp.modules.patient_referral.dto.CreatePatientReferralDTO;
import cmsc128.dentapp.modules.patient_referral.dto.PatientReferralResponseDTO;
import cmsc128.dentapp.modules.patient_referral.dto.UpdatePatientReferralDTO;
import cmsc128.dentapp.modules.patient_referral.entities.PatientReferral;
import cmsc128.dentapp.modules.patient_referral.entities.ReferralStatus;
import cmsc128.dentapp.modules.patient_referral.repositories.PatientReferralRepository;
import cmsc128.dentapp.modules.user.entities.User;
import cmsc128.dentapp.modules.user.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class PatientReferralServiceImpl implements PatientReferralService {
  
  private final PatientReferralRepository patientReferralRepository;
  private final PatientRepository patientRepository;
  private final UserRepository userRepository;

  public PatientReferralServiceImpl(
      PatientReferralRepository patientReferralRepository,
      PatientRepository patientRepository,
      UserRepository userRepository) {
    this.patientReferralRepository = patientReferralRepository;
    this.patientRepository = patientRepository;
    this.userRepository = userRepository;
  }

  @Override
  @Transactional
  public PatientReferralResponseDTO createReferral(CreatePatientReferralDTO createDTO, Long userId) {
    // Validate and get patient
    Patient patient = patientRepository.findByPatientNumber(createDTO.getChartNumber())
        .orElseThrow(() -> new RuntimeException("Patient with chart number " + createDTO.getChartNumber() + " not found"));
    
    // Get user
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));
    
    // Create referral
    PatientReferral referral = createDTO.mapToEntity(patient);
    referral.setReferredBy(user);
    referral.setStatus(ReferralStatus.PENDING);
    
    PatientReferral savedReferral = patientReferralRepository.save(referral);
    
    return PatientReferralResponseDTO.fromEntity(savedReferral);
  }

  @Override
  @Transactional(readOnly = true)
  public Page<PatientReferralResponseDTO> getAllReferrals(
      int page,
      int size,
      String search,
      String treatment,
      String sectionOrigin,
      String sectionDestination,
      ReferralStatus status) {
    
    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
    
    Page<PatientReferral> referrals = patientReferralRepository.findAllWithFilters(
        search,
        treatment,
        sectionOrigin,
        sectionDestination,
        status,
        pageable
    );
    
    return referrals.map(PatientReferralResponseDTO::fromEntity);
  }

  @Override
  @Transactional(readOnly = true)
  public PatientReferralResponseDTO getReferralById(Long referralId) {
    PatientReferral referral = patientReferralRepository.findByIdWithRelations(referralId)
        .orElseThrow(() -> new RuntimeException("Referral not found with id: " + referralId));
    
    return PatientReferralResponseDTO.fromEntity(referral);
  }

  @Override
  @Transactional
  public PatientReferralResponseDTO updateReferral(Long referralId, UpdatePatientReferralDTO updateDTO) {
    PatientReferral referral = patientReferralRepository.findById(referralId)
        .orElseThrow(() -> new RuntimeException("Referral not found with id: " + referralId));
    
    // Update fields
    if (updateDTO.getTreatment() != null) {
      referral.setTreatment(updateDTO.getTreatment());
    }
    if (updateDTO.getSpecifics() != null) {
      referral.setSpecifics(updateDTO.getSpecifics());
    }
    if (updateDTO.getAge() != null) {
      referral.setAge(updateDTO.getAge());
    }
    if (updateDTO.getMedicalAlert() != null) {
      referral.setMedicalAlert(updateDTO.getMedicalAlert());
    }
    if (updateDTO.getSectionOrigin() != null) {
      referral.setSectionOrigin(updateDTO.getSectionOrigin());
    }
    if (updateDTO.getSectionDestination() != null) {
      referral.setSectionDestination(updateDTO.getSectionDestination());
    }
    if (updateDTO.getNotes() != null) {
      referral.setNotes(updateDTO.getNotes());
    }
    
    PatientReferral updatedReferral = patientReferralRepository.save(referral);
    
    return PatientReferralResponseDTO.fromEntity(updatedReferral);
  }

  @Override
  @Transactional
  public PatientReferralResponseDTO acceptReferral(Long referralId, Long userId) {
    PatientReferral referral = patientReferralRepository.findById(referralId)
        .orElseThrow(() -> new RuntimeException("Referral not found with id: " + referralId));
    
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));
    
    referral.setStatus(ReferralStatus.ACCEPTED);
    referral.setAcceptedBy(user);
    referral.setAcceptedAt(new Date());
    
    PatientReferral updatedReferral = patientReferralRepository.save(referral);
    
    return PatientReferralResponseDTO.fromEntity(updatedReferral);
  }

  @Override
  @Transactional
  public PatientReferralResponseDTO rejectReferral(Long referralId, Long userId) {
    PatientReferral referral = patientReferralRepository.findById(referralId)
        .orElseThrow(() -> new RuntimeException("Referral not found with id: " + referralId));
    
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));
    
    referral.setStatus(ReferralStatus.REJECTED);
    referral.setAcceptedBy(user);
    referral.setAcceptedAt(new Date());
    
    PatientReferral updatedReferral = patientReferralRepository.save(referral);
    
    return PatientReferralResponseDTO.fromEntity(updatedReferral);
  }

  @Override
  @Transactional
  public void deleteReferral(Long referralId) {
    if (!patientReferralRepository.existsById(referralId)) {
      throw new RuntimeException("Referral not found with id: " + referralId);
    }
    patientReferralRepository.deleteById(referralId);
  }

  @Override
  public boolean validateChartNumber(String chartNumber) {
    return patientRepository.findByPatientNumber(chartNumber).isPresent();
  }
}
