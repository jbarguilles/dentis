package cmsc128.dentapp.modules.chart.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import cmsc128.dentapp.modules.chart.entities.Chart;
import cmsc128.dentapp.modules.patient.services.PatientService;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddChartDTO {

  @JsonProperty("teeth11")
  private byte[] teeth11;

  @JsonProperty("teeth12")
  private byte[] teeth12;

  @JsonProperty("teeth13")
  private byte[] teeth13;

  @JsonProperty("teeth14")
  private byte[] teeth14;

  @JsonProperty("teeth15")
  private byte[] teeth15;

  @JsonProperty("teeth16")
  private byte[] teeth16;

  @JsonProperty("teeth17")
  private byte[] teeth17;

  @JsonProperty("teeth18")
  private byte[] teeth18;

  @JsonProperty("teeth21")
  private byte[] teeth21;

  @JsonProperty("teeth22")
  private byte[] teeth22;

  @JsonProperty("teeth23")
  private byte[] teeth23;

  @JsonProperty("teeth24")
  private byte[] teeth24;

  @JsonProperty("teeth25")
  private byte[] teeth25;

  @JsonProperty("teeth26")
  private byte[] teeth26;

  @JsonProperty("teeth27")
  private byte[] teeth27;

  @JsonProperty("teeth28")
  private byte[] teeth28;

  @JsonProperty("teeth31")
  private byte[] teeth31;

  @JsonProperty("teeth32")
  private byte[] teeth32;

  @JsonProperty("teeth33")
  private byte[] teeth33;

  @JsonProperty("teeth34")
  private byte[] teeth34;

  @JsonProperty("teeth35")
  private byte[] teeth35;

  @JsonProperty("teeth36")
  private byte[] teeth36;

  @JsonProperty("teeth37")
  private byte[] teeth37;

  @JsonProperty("teeth38")
  private byte[] teeth38;

  @JsonProperty("teeth41")
  private byte[] teeth41;

  @JsonProperty("teeth42")
  private byte[] teeth42;

  @JsonProperty("teeth43")
  private byte[] teeth43;

  @JsonProperty("teeth44")
  private byte[] teeth44;

  @JsonProperty("teeth45")
  private byte[] teeth45;

  @JsonProperty("teeth46")
  private byte[] teeth46;

  @JsonProperty("teeth47")
  private byte[] teeth47;

  @JsonProperty("teeth48")
  private byte[] teeth48;

  @JsonProperty("EC11")
  private byte[] EC11;

  @JsonProperty("EC12")
  private byte[] EC12;

  @JsonProperty("EC13")
  private byte[] EC13;

  @JsonProperty("EC14")
  private byte[] EC14;

  @JsonProperty("EC15")
  private byte[] EC15;

  @JsonProperty("EC16")
  private byte[] EC16;

  @JsonProperty("EC17")
  private byte[] EC17;

  @JsonProperty("EC18")
  private byte[] EC18;

  @JsonProperty("EC21")
  private byte[] EC21;

  @JsonProperty("EC22")
  private byte[] EC22;

  @JsonProperty("EC23")
  private byte[] EC23;

  @JsonProperty("EC24")
  private byte[] EC24;

  @JsonProperty("EC25")
  private byte[] EC25;

  @JsonProperty("EC26")
  private byte[] EC26;

  @JsonProperty("EC27")
  private byte[] EC27;

  @JsonProperty("EC28")
  private byte[] EC28;

  @JsonProperty("EC31")
  private byte[] EC31;

  @JsonProperty("EC32")
  private byte[] EC32;

  @JsonProperty("EC33")
  private byte[] EC33;

  @JsonProperty("EC34")
  private byte[] EC34;

  @JsonProperty("EC35")
  private byte[] EC35;

  @JsonProperty("EC36")
  private byte[] EC36;

  @JsonProperty("EC37")
  private byte[] EC37;

  @JsonProperty("EC38")
  private byte[] EC38;

  @JsonProperty("EC41")
  private byte[] EC41;

  @JsonProperty("EC42")
  private byte[] EC42;

  @JsonProperty("EC43")
  private byte[] EC43;

  @JsonProperty("EC44")
  private byte[] EC44;

  @JsonProperty("EC45")
  private byte[] EC45;

  @JsonProperty("EC46")
  private byte[] EC46;

  @JsonProperty("EC47")
  private byte[] EC47;

  @JsonProperty("EC48")
  private byte[] EC48;

  @JsonProperty("treatmentPlans")
  private String treatmentPlans;

  @JsonProperty("lesionStatuses")
  private String lesionStatuses;

  @JsonProperty("icdasCodes")
  private String icdasCodes;

  @JsonProperty("patientNumber")
  private String patientNumber;

  public AddChartDTO(
      byte[] teeth11,
      byte[] teeth12,
      byte[] teeth13,
      byte[] teeth14,
      byte[] teeth15,
      byte[] teeth16,
      byte[] teeth17,
      byte[] teeth18,
      byte[] teeth21,
      byte[] teeth22,
      byte[] teeth23,
      byte[] teeth24,
      byte[] teeth25,
      byte[] teeth26,
      byte[] teeth27,
      byte[] teeth28,
      byte[] teeth31,
      byte[] teeth32,
      byte[] teeth33,
      byte[] teeth34,
      byte[] teeth35,
      byte[] teeth36,
      byte[] teeth37,
      byte[] teeth38,
      byte[] teeth41,
      byte[] teeth42,
      byte[] teeth43,
      byte[] teeth44,
      byte[] teeth45,
      byte[] teeth46,
      byte[] teeth47,
      byte[] teeth48,
      byte[] EC11,
      byte[] EC12,
      byte[] EC13,
      byte[] EC14,
      byte[] EC15,
      byte[] EC16,
      byte[] EC17,
      byte[] EC18,
      byte[] EC21,
      byte[] EC22,
      byte[] EC23,
      byte[] EC24,
      byte[] EC25,
      byte[] EC26,
      byte[] EC27,
      byte[] EC28,
      byte[] EC31,
      byte[] EC32,
      byte[] EC33,
      byte[] EC34,
      byte[] EC35,
      byte[] EC36,
      byte[] EC37,
      byte[] EC38,
      byte[] EC41,
      byte[] EC42,
      byte[] EC43,
      byte[] EC44,
      byte[] EC45,
      byte[] EC46,
      byte[] EC47,
      byte[] EC48,
      String treatmentPlans,
      String lesionStatuses,
      String icdasCodes,
      String patientNumber) {
    this.teeth11 = teeth11;
    this.teeth12 = teeth12;
    this.teeth13 = teeth13;
    this.teeth14 = teeth14;
    this.teeth15 = teeth15;
    this.teeth16 = teeth16;
    this.teeth17 = teeth17;
    this.teeth18 = teeth18;
    this.teeth21 = teeth21;
    this.teeth22 = teeth22;
    this.teeth23 = teeth23;
    this.teeth24 = teeth24;
    this.teeth25 = teeth25;
    this.teeth26 = teeth26;
    this.teeth27 = teeth27;
    this.teeth28 = teeth28;
    this.teeth31 = teeth31;
    this.teeth32 = teeth32;
    this.teeth33 = teeth33;
    this.teeth34 = teeth34;
    this.teeth35 = teeth35;
    this.teeth36 = teeth36;
    this.teeth37 = teeth37;
    this.teeth38 = teeth38;
    this.teeth41 = teeth41;
    this.teeth42 = teeth42;
    this.teeth43 = teeth43;
    this.teeth44 = teeth44;
    this.teeth45 = teeth45;
    this.teeth46 = teeth46;
    this.teeth47 = teeth47;
    this.teeth48 = teeth48;
    this.EC11 = EC11;
    this.EC12 = EC12;
    this.EC13 = EC13;
    this.EC14 = EC14;
    this.EC15 = EC15;
    this.EC16 = EC16;
    this.EC17 = EC17;
    this.EC18 = EC18;
    this.EC21 = EC21;
    this.EC22 = EC22;
    this.EC23 = EC23;
    this.EC24 = EC24;
    this.EC25 = EC25;
    this.EC26 = EC26;
    this.EC27 = EC27;
    this.EC28 = EC28;
    this.EC31 = EC31;
    this.EC32 = EC32;
    this.EC33 = EC33;
    this.EC34 = EC34;
    this.EC35 = EC35;
    this.EC36 = EC36;
    this.EC37 = EC37;
    this.EC38 = EC38;
    this.EC41 = EC41;
    this.EC42 = EC42;
    this.EC43 = EC43;
    this.EC44 = EC44;
    this.EC45 = EC45;
    this.EC46 = EC46;
    this.EC47 = EC47;
    this.EC48 = EC48;
    this.treatmentPlans = treatmentPlans;
    this.lesionStatuses = lesionStatuses;
    this.icdasCodes = icdasCodes;
    this.patientNumber = patientNumber;
  }

  public Chart mapToChart(PatientService patientService) {
    Chart chart = new Chart();

    // Note: The Chart entity stores file paths, not byte arrays
    // These byte arrays would need to be saved as files first and then the paths stored
    // For now, we'll leave the paths as null or implement file saving logic elsewhere

    chart.setTreatmentPlans(this.treatmentPlans);
    chart.setLesionStatuses(this.lesionStatuses);
    chart.setIcdasCodes(this.icdasCodes);

    //        Patient patient = patientService.findPatientByID(Long.valueOf(patientNumber));
    //        chart.setPatient(patient);
    return chart;
  }
}
