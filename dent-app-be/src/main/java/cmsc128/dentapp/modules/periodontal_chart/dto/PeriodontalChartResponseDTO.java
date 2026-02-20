package cmsc128.dentapp.modules.periodontal_chart.dto;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PeriodontalChartResponseDTO {

  @JsonProperty("periodontal_chart_id")
  private Long periodontalChartId;

  @JsonProperty("patient_id")
  private Long patientId;

  @JsonProperty("created_at")
  private Date createdAt;

  @JsonProperty("updated_at")
  private Date updatedAt;

  @JsonProperty("teeth")
  private List<PeriodontalChartToothDTO> teeth;
}
