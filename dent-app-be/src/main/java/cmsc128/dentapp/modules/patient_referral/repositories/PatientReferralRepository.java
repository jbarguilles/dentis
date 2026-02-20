package cmsc128.dentapp.modules.patient_referral.repositories;

import cmsc128.dentapp.modules.patient_referral.entities.PatientReferral;
import cmsc128.dentapp.modules.patient_referral.entities.ReferralStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientReferralRepository extends JpaRepository<PatientReferral, Long> {
  
  PatientReferral findTopByOrderByReferralIdDesc();

  @Query("SELECT pr FROM PATIENT_REFERRAL pr " +
         "JOIN FETCH pr.patient p " +
         "LEFT JOIN FETCH pr.referredBy " +
         "LEFT JOIN FETCH pr.acceptedBy " +
         "WHERE (:search IS NULL OR :search = '' OR " +
         "LOWER(p.patientNumber) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
         "LOWER(p.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
         "LOWER(p.lastName) LIKE LOWER(CONCAT('%', :search, '%'))) " +
         "AND (:treatment IS NULL OR :treatment = '' OR pr.treatment = :treatment) " +
         "AND (:sectionOrigin IS NULL OR :sectionOrigin = '' OR pr.sectionOrigin = :sectionOrigin) " +
         "AND (:sectionDestination IS NULL OR :sectionDestination = '' OR pr.sectionDestination = :sectionDestination) " +
         "AND (:status IS NULL OR pr.status = :status)")
  Page<PatientReferral> findAllWithFilters(
      @Param("search") String search,
      @Param("treatment") String treatment,
      @Param("sectionOrigin") String sectionOrigin,
      @Param("sectionDestination") String sectionDestination,
      @Param("status") ReferralStatus status,
      Pageable pageable
  );

  @Query("SELECT pr FROM PATIENT_REFERRAL pr " +
         "JOIN FETCH pr.patient " +
         "LEFT JOIN FETCH pr.referredBy " +
         "LEFT JOIN FETCH pr.acceptedBy " +
         "WHERE pr.referralId = :referralId")
  Optional<PatientReferral> findByIdWithRelations(@Param("referralId") Long referralId);
}
