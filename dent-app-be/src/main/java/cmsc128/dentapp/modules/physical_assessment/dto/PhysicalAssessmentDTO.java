package cmsc128.dentapp.modules.physical_assessment.dto;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import cmsc128.dentapp.modules.physical_assessment.entities.PhysicalAssessment;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PhysicalAssessmentDTO {

  @JsonProperty("patient_id")
  private Long patientId;

  @JsonProperty("date")
  private String date;

  @JsonProperty("gait")
  private String gait;

  @JsonProperty("appearance")
  private String appearance;

  @JsonProperty("defects")
  private String defects;

  @JsonProperty("weight")
  private Double weight;

  @JsonProperty("height")
  private Double height;

  @JsonProperty("blood_pressure")
  private String bloodPressure;

  @JsonProperty("pulse_rate")
  private Integer pulseRate;

  @JsonProperty("respiratory_rate")
  private Integer respiratoryRate;

  @JsonProperty("temperature")
  private Double temperature;

  public PhysicalAssessment mapToPhysicalAssessment() {
    PhysicalAssessment physicalAssessment = new PhysicalAssessment();
    physicalAssessment.setPatientId(this.patientId);
    physicalAssessment.setDate(Date.valueOf(this.date));
    physicalAssessment.setGait(this.gait);
    physicalAssessment.setAppearance(this.appearance);
    physicalAssessment.setDefects(this.defects);
    physicalAssessment.setWeight(this.weight);
    physicalAssessment.setHeight(this.height);
    physicalAssessment.setBloodPressure(this.bloodPressure);
    physicalAssessment.setPulseRate(this.pulseRate);
    physicalAssessment.setRespiratoryRate(this.respiratoryRate);
    physicalAssessment.setTemperature(this.temperature);
    physicalAssessment.setCreatedAt(new Date(System.currentTimeMillis()));

    return physicalAssessment;
  }
}
