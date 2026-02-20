package cmsc128.dentapp.modules.patient_referral.entities;

import java.util.Date;

import cmsc128.dentapp.modules.patient.entities.Patient;
import cmsc128.dentapp.modules.user.entities.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "PATIENT_REFERRAL")
@Data
@NoArgsConstructor
public class PatientReferral {
  @Id
  @SequenceGenerator(name = "PATIENT_REFERRAL_SEQ", sequenceName = "PATIENT_REFERRAL_SEQ", allocationSize = 1)
  @Column(name = "REFERRAL_ID", nullable = false)
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "PATIENT_REFERRAL_SEQ")
  private Long referralId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "PATIENT_ID", nullable = false)
  private Patient patient;

  @Column(name = "TREATMENT", nullable = false)
  private String treatment;

  @Column(name = "SPECIFICS", nullable = false, columnDefinition = "TEXT")
  private String specifics;

  @Column(name = "AGE", nullable = false)
  private Integer age;

  @Column(name = "MEDICAL_ALERT", nullable = false)
  private String medicalAlert;

  @Column(name = "SECTION_ORIGIN", nullable = false)
  private String sectionOrigin;

  @Column(name = "SECTION_DESTINATION", nullable = false)
  private String sectionDestination;

  @Column(name = "NOTES", nullable = false, columnDefinition = "TEXT")
  private String notes;

  @Enumerated(EnumType.STRING)
  @Column(name = "STATUS", nullable = false)
  private ReferralStatus status;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "REFERRED_BY", nullable = false)
  private User referredBy;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "ACCEPTED_BY")
  private User acceptedBy;

  @Column(name = "CREATED_AT", nullable = false)
  @Temporal(TemporalType.TIMESTAMP)
  private Date createdAt;

  @Column(name = "ACCEPTED_AT")
  @Temporal(TemporalType.TIMESTAMP)
  private Date acceptedAt;

  @PrePersist
  protected void onCreate() {
    createdAt = new Date();
    if (status == null) {
      status = ReferralStatus.PENDING;
    }
  }
}
