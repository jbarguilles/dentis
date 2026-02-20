package cmsc128.dentapp.modules.physical_assessment.entities;

import java.util.Date;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "PHYSICAL_ASSESSMENT")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PhysicalAssessment {
  @Id
  @SequenceGenerator(
      name = "PHYSICAL_ASSESSMENT_SEQ",
      sequenceName = "PHYSICAL_ASSESSMENT_SEQ",
      allocationSize = 1)
  @Column(name = "PHYSICAL_ASSESSMENT_ID", nullable = false)
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "PHYSICAL_ASSESSMENT_SEQ")
  private long physicalAssessmentId;

  @Column(name = "PATIENT_ID", nullable = false)
  private Long patientId;

  @Column(name = "DATE", nullable = false)
  private Date date;

  @Column(name = "GAIT", nullable = true)
  private String gait;

  @Column(name = "APPEARANCE", nullable = true)
  private String appearance;

  @Column(name = "DEFECTS", nullable = true)
  private String defects;

  @Column(name = "WEIGHT", nullable = true)
  private Double weight;

  @Column(name = "HEIGHT", nullable = true)
  private Double height;

  @Column(name = "BLOOD_PRESSURE", nullable = true)
  private String bloodPressure;

  @Column(name = "PULSE_RATE", nullable = true)
  private Integer pulseRate;

  @Column(name = "RESPIRATORY_RATE", nullable = true)
  private Integer respiratoryRate;

  @Column(name = "TEMPERATURE", nullable = true)
  private Double temperature;

  @Column(name = "CREATED_AT", nullable = false)
  private Date createdAt;
}
