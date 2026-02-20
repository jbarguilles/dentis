package cmsc128.dentapp.modules.periodontal_chart.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "PERIODONTAL_CHART_TOOTH")
@Data
@NoArgsConstructor
public class PeriodontalChartTooth {
  @Id
  @SequenceGenerator(
      name = "PERIODONTAL_CHART_TOOTH_SEQ",
      sequenceName = "PERIODONTAL_CHART_TOOTH_SEQ",
      allocationSize = 1)
  @Column(name = "TOOTH_ID", nullable = false)
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "PERIODONTAL_CHART_TOOTH_SEQ")
  private Long toothId;

  @Column(name = "TOOTH_NUMBER", nullable = true)
  private Integer toothNumber;

  // PI (Plaque Index) fields
  @Column(name = "TOP_PI", nullable = true)
  private Boolean topPi;

  @Column(name = "BOTTOM_PI", nullable = true)
  private Boolean bottomPi;

  // BOP (Bleeding on Probing) fields - can be positive, negative, or 0
  @Column(name = "TOP_LEFT_BOP", nullable = true)
  private Integer topLeftBop;

  @Column(name = "TOP_MID_BOP", nullable = true)
  private Integer topMidBop;

  @Column(name = "TOP_RIGHT_BOP", nullable = true)
  private Integer topRightBop;

  @Column(name = "BOT_LEFT_BOP", nullable = true)
  private Integer botLeftBop;

  @Column(name = "BOT_MID_BOP", nullable = true)
  private Integer botMidBop;

  @Column(name = "BOT_RIGHT_BOP", nullable = true)
  private Integer botRightBop;

  // MOB (Mobility) field
  @Column(name = "MOB", nullable = true)
  private Integer mob;

  // SUP (Suppuration) field
  @Column(name = "SUP", nullable = true)
  private Boolean sup;

  // CAL (Clinical Attachment Level) fields
  @Column(name = "TOP_LEFT_CAL", nullable = true)
  private Integer topLeftCal;

  @Column(name = "TOP_MID_CAL", nullable = true)
  private Integer topMidCal;

  @Column(name = "TOP_RIGHT_CAL", nullable = true)
  private Integer topRightCal;

  @Column(name = "BOT_LEFT_CAL", nullable = true)
  private Integer botLeftCal;

  @Column(name = "BOT_MID_CAL", nullable = true)
  private Integer botMidCal;

  @Column(name = "BOT_RIGHT_CAL", nullable = true)
  private Integer botRightCal;

  // PPD (Probing Pocket Depth) fields
  @Column(name = "PPD_LEFT", nullable = true)
  private Integer ppdLeft;

  @Column(name = "PPD_MID", nullable = true)
  private Integer ppdMid;

  @Column(name = "PPD_RIGHT", nullable = true)
  private Integer ppdRight;

  // CEJGM (Cemento-Enamel Junction to Gingival Margin) fields - can be positive, negative, or 0
  @Column(name = "CEJGM_LEFT", nullable = true)
  private Integer cejgmLeft;

  @Column(name = "CEJGM_MID", nullable = true)
  private Integer cejgmMid;

  @Column(name = "CEJGM_RIGHT", nullable = true)
  private Integer cejgmRight;

  // ===== RELATIONSHIPS =====
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "PERIODONTAL_CHART_ID")
  private PeriodontalChart periodontalChart;
}
