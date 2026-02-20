package cmsc128.dentapp.Entities.DTO;

import java.sql.Date;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import cmsc128.dentapp.Entities.ChartRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddChartRequestDTO {
  @JsonProperty("requester_name")
  private String requesterName;

  @JsonProperty("crf_date")
  private String crfDate;

  @JsonProperty("time")
  private LocalDateTime time;

  @JsonProperty("purpose")
  private String purpose;

  @JsonProperty("chart_number_requested")
  private String chartNumberRequested;

  @JsonProperty("section")
  private String section;

  @JsonProperty("type")
  private String type;

  public ChartRequest mapToCRF() {

    ChartRequest chartRequest = new ChartRequest();

    chartRequest.setRequesterName(this.requesterName);
    chartRequest.setCrfDate(Date.valueOf(this.crfDate));
    chartRequest.setTime(this.time);
    chartRequest.setPurpose(this.purpose);
    chartRequest.setChartNumberRequested(Long.valueOf(this.chartNumberRequested));
    chartRequest.setSection(this.section);
    chartRequest.setStatus("processing");
    chartRequest.setType(this.type);

    return chartRequest;
  }
}
