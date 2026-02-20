package cmsc128.dentapp.modules.periodontal_chart.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PeriodontalChartToothDTO {

  @JsonProperty("tooth_id")
  private Long toothId;

  @JsonProperty("tooth_number")
  private Integer toothNumber;

  // PI (Plaque Index) fields
  @JsonProperty("top_pi")
  private Boolean topPi;

  @JsonProperty("bottom_pi")
  private Boolean bottomPi;

  // BOP (Bleeding on Probing) fields
  @JsonProperty("top_left_bop")
  private Integer topLeftBop;

  @JsonProperty("top_mid_bop")
  private Integer topMidBop;

  @JsonProperty("top_right_bop")
  private Integer topRightBop;

  @JsonProperty("bot_left_bop")
  private Integer botLeftBop;

  @JsonProperty("bot_mid_bop")
  private Integer botMidBop;

  @JsonProperty("bot_right_bop")
  private Integer botRightBop;

  // MOB (Mobility) field
  @JsonProperty("mob")
  private Integer mob;

  // SUP (Suppuration) field
  @JsonProperty("sup")
  private Boolean sup;

  // CAL (Clinical Attachment Level) fields
  @JsonProperty("top_left_cal")
  private Integer topLeftCal;

  @JsonProperty("top_mid_cal")
  private Integer topMidCal;

  @JsonProperty("top_right_cal")
  private Integer topRightCal;

  @JsonProperty("bot_left_cal")
  private Integer botLeftCal;

  @JsonProperty("bot_mid_cal")
  private Integer botMidCal;

  @JsonProperty("bot_right_cal")
  private Integer botRightCal;

  // PPD (Probing Pocket Depth) fields
  @JsonProperty("ppd_left")
  private Integer ppdLeft;

  @JsonProperty("ppd_mid")
  private Integer ppdMid;

  @JsonProperty("ppd_right")
  private Integer ppdRight;

  // CEJGM (Cemento-Enamel Junction to Gingival Margin) fields
  @JsonProperty("cejgm_left")
  private Integer cejgmLeft;

  @JsonProperty("cejgm_mid")
  private Integer cejgmMid;

  @JsonProperty("cejgm_right")
  private Integer cejgmRight;
}
