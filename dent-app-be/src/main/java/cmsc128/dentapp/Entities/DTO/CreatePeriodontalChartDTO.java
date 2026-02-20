package cmsc128.dentapp.Entities.DTO;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import cmsc128.dentapp.modules.periodontal_chart.dto.PeriodontalChartToothDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePeriodontalChartDTO {

  @JsonProperty("patient_id")
  private Long patientId;

  @JsonProperty("teeth")
  private List<PeriodontalChartToothDTO> teeth;
}
