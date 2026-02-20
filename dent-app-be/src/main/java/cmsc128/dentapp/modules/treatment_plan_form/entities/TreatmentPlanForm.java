package cmsc128.dentapp.modules.treatment_plan_form.entities;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import cmsc128.dentapp.modules.patient.entities.Patient;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "TREATMENT_PLAN_FORM")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TreatmentPlanForm {
  @Id
  @SequenceGenerator(name = "TPF_SEQ", sequenceName = "TPF_SEQ", allocationSize = 1)
  @Column(name = "TPF_ID", nullable = false)
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "TPF_SEQ")
  private Long tpfId;

  @JsonIgnore
  @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
  @JoinColumn(name = "PATIENT_ID", nullable = false)
  private Patient patient;

  @Column(name = "PROPOSED_TREATMENT_PLAN", length = 1000)
  private String proposedTreatmentPlan;

  @Column(name = "CLINICIAN_NAME", length = 80)
  private String clinicianName;

  @Column(name = "CLINICIAN_SIGNATURE", length = 10)
  private String clinicianSignature;

  @Column(name = "CLINICIAN_DATE")
  private Date clinicianDate;

  @Column(name = "FACULTY_NAME", length = 80)
  private String facultyName;

  @Column(name = "FACULTY_SIGNATURE", length = 10)
  private String facultySignature;

  @Column(name = "FACULTY_DATE")
  private Date facultyDate;

  public TreatmentPlanForm(
      String proposedTreatmentPlan,
      String clinicianName,
      String clinicianSignature,
      Date clinicianDate,
      String facultyName,
      String facultySignature,
      Date facultyDate) {
    this.proposedTreatmentPlan = proposedTreatmentPlan;
    this.clinicianName = clinicianName;
    this.clinicianSignature = clinicianSignature;
    this.clinicianDate = clinicianDate;
    this.facultyName = facultyName;
    this.facultySignature = facultySignature;
    this.facultyDate = facultyDate;
  }
}
