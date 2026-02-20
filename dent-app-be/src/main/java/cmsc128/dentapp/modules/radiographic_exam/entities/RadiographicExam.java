package cmsc128.dentapp.modules.radiographic_exam.entities;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import cmsc128.dentapp.modules.patient.entities.Patient;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "RADIOGRAPHIC_EXAM")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RadiographicExam {
  @Id
  @SequenceGenerator(name = "RE_SEQ", sequenceName = "RE_SEQ", allocationSize = 1)
  @Column(name = "RE_ID", nullable = false)
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "RE_SEQ")
  private Long reId;

  @JsonIgnore
  @OneToOne(
      cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
      fetch = FetchType.LAZY)
  @JoinColumn(name = "PATIENT_ID", nullable = false)
  private Patient patient;

  @Column(name = "RE_DATE")
  private Date reDate;

  @Column(name = "TOOTH_NO")
  private Integer toothNo;

  @Column(name = "FINDINGS")
  private String findings;

  @Column(name = "NAME_OF_CLINICIAN")
  private String nameOfClinician;

  @Column(name = "CLINICIANS_SIGNATURE")
  private String cliniciansSignature;

  public RadiographicExam(
      Date reDate,
      Integer toothNo,
      String findings,
      String nameOfClinician,
      String cliniciansSignature) {
    this.reDate = reDate;
    this.toothNo = toothNo;
    this.findings = findings;
    this.nameOfClinician = nameOfClinician;
    this.cliniciansSignature = cliniciansSignature;
  }
}
