package cmsc128.dentapp.modules.chart.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import cmsc128.dentapp.modules.patient.entities.Patient;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "CHART")
@Data
@NoArgsConstructor
public class Chart {
  @Id
  @SequenceGenerator(name = "CHART_SEQ", sequenceName = "CHART_SEQ", allocationSize = 1)
  @Column(name = "CHART_ID", nullable = false)
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "CHART_SEQ")
  private long chartID;

  // ===== RELATIONSHIPS =====
  @JsonIgnore
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "PATIENT_ID", nullable = false)
  private Patient patient;

  @Column(name = "TEETH11_PATH", nullable = true)
  private String teeth11Path;

  @Column(name = "TEETH12_PATH", nullable = true)
  private String teeth12Path;

  @Column(name = "TEETH13_PATH", nullable = true)
  private String teeth13Path;

  @Column(name = "TEETH14_PATH", nullable = true)
  private String teeth14Path;

  @Column(name = "TEETH15_PATH", nullable = true)
  private String teeth15Path;

  @Column(name = "TEETH16_PATH", nullable = true)
  private String teeth16Path;

  @Column(name = "TEETH17_PATH", nullable = true)
  private String teeth17Path;

  @Column(name = "TEETH18_PATH", nullable = true)
  private String teeth18Path;

  @Column(name = "TEETH21_PATH", nullable = true)
  private String teeth21Path;

  @Column(name = "TEETH22_PATH", nullable = true)
  private String teeth22Path;

  @Column(name = "TEETH23_PATH", nullable = true)
  private String teeth23Path;

  @Column(name = "TEETH24_PATH", nullable = true)
  private String teeth24Path;

  @Column(name = "TEETH25_PATH", nullable = true)
  private String teeth25Path;

  @Column(name = "TEETH26_PATH", nullable = true)
  private String teeth26Path;

  @Column(name = "TEETH27_PATH", nullable = true)
  private String teeth27Path;

  @Column(name = "TEETH28_PATH", nullable = true)
  private String teeth28Path;

  @Column(name = "TEETH31_PATH", nullable = true)
  private String teeth31Path;

  @Column(name = "TEETH32_PATH", nullable = true)
  private String teeth32Path;

  @Column(name = "TEETH33_PATH", nullable = true)
  private String teeth33Path;

  @Column(name = "TEETH34_PATH", nullable = true)
  private String teeth34Path;

  @Column(name = "TEETH35_PATH", nullable = true)
  private String teeth35Path;

  @Column(name = "TEETH36_PATH", nullable = true)
  private String teeth36Path;

  @Column(name = "TEETH37_PATH", nullable = true)
  private String teeth37Path;

  @Column(name = "TEETH38_PATH", nullable = true)
  private String teeth38Path;

  @Column(name = "TEETH41_PATH", nullable = true)
  private String teeth41Path;

  @Column(name = "TEETH42_PATH", nullable = true)
  private String teeth42Path;

  @Column(name = "TEETH43_PATH", nullable = true)
  private String teeth43Path;

  @Column(name = "TEETH44_PATH", nullable = true)
  private String teeth44Path;

  @Column(name = "TEETH45_PATH", nullable = true)
  private String teeth45Path;

  @Column(name = "TEETH46_PATH", nullable = true)
  private String teeth46Path;

  @Column(name = "TEETH47_PATH", nullable = true)
  private String teeth47Path;

  @Column(name = "TEETH48_PATH", nullable = true)
  private String teeth48Path;

  @Column(name = "EC11_PATH", nullable = true)
  private String EC11Path;

  @Column(name = "EC12_PATH", nullable = true)
  private String EC12Path;

  @Column(name = "EC13_PATH", nullable = true)
  private String EC13Path;

  @Column(name = "EC14_PATH", nullable = true)
  private String EC14Path;

  @Column(name = "EC15_PATH", nullable = true)
  private String EC15Path;

  @Column(name = "EC16_PATH", nullable = true)
  private String EC16Path;

  @Column(name = "EC17_PATH", nullable = true)
  private String EC17Path;

  @Column(name = "EC18_PATH", nullable = true)
  private String EC18Path;

  @Column(name = "EC21_PATH", nullable = true)
  private String EC21Path;

  @Column(name = "EC22_PATH", nullable = true)
  private String EC22Path;

  @Column(name = "EC23_PATH", nullable = true)
  private String EC23Path;

  @Column(name = "EC24_PATH", nullable = true)
  private String EC24Path;

  @Column(name = "EC25_PATH", nullable = true)
  private String EC25Path;

  @Column(name = "EC26_PATH", nullable = true)
  private String EC26Path;

  @Column(name = "EC27_PATH", nullable = true)
  private String EC27Path;

  @Column(name = "EC28_PATH", nullable = true)
  private String EC28Path;

  @Column(name = "EC31_PATH", nullable = true)
  private String EC31Path;

  @Column(name = "EC32_PATH", nullable = true)
  private String EC32Path;

  @Column(name = "EC33_PATH", nullable = true)
  private String EC33Path;

  @Column(name = "EC34_PATH", nullable = true)
  private String EC34Path;

  @Column(name = "EC35_PATH", nullable = true)
  private String EC35Path;

  @Column(name = "EC36_PATH", nullable = true)
  private String EC36Path;

  @Column(name = "EC37_PATH", nullable = true)
  private String EC37Path;

  @Column(name = "EC38_PATH", nullable = true)
  private String EC38Path;

  @Column(name = "EC41_PATH", nullable = true)
  private String EC41Path;

  @Column(name = "EC42_PATH", nullable = true)
  private String EC42Path;

  @Column(name = "EC43_PATH", nullable = true)
  private String EC43Path;

  @Column(name = "EC44_PATH", nullable = true)
  private String EC44Path;

  @Column(name = "EC45_PATH", nullable = true)
  private String EC45Path;

  @Column(name = "EC46_PATH", nullable = true)
  private String EC46Path;

  @Column(name = "EC47_PATH", nullable = true)
  private String EC47Path;

  @Column(name = "EC48_PATH", nullable = true)
  private String EC48Path;

  @Column(name = "TREATMENT_PLANS", nullable = true)
  private String treatmentPlans;

  @Column(name = "LESION_STATUSES", nullable = true)
  private String lesionStatuses;

  @Column(name = "ICDAS_CODES", nullable = true)
  private String icdasCodes;
}
