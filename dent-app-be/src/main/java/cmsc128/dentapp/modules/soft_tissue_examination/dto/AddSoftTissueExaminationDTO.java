package cmsc128.dentapp.modules.soft_tissue_examination.dto;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import cmsc128.dentapp.modules.patient.entities.Patient;
import cmsc128.dentapp.modules.patient.services.PatientService;
import cmsc128.dentapp.modules.soft_tissue_examination.entities.SoftTissueExamination;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddSoftTissueExaminationDTO {

  @JsonProperty("patientNumber")
  private Long patientNumber;

  @JsonProperty("DATE")
  private String date;

  @JsonProperty("HEAD_NECK_TMJ")
  private String headNeckTmj;

  @JsonProperty("MUCOSA")
  private String mucosa;

  @JsonProperty("PHARYNX")
  private String pharynx;

  @JsonProperty("TONGUE")
  private String tongue;

  @JsonProperty("SALIVARY_GLAND")
  private String salivaryGland;

  @JsonProperty("GINGIVA")
  private String gingiva;

  @JsonProperty("LIPS_FRENUM")
  private String lipsFrenum;

  @JsonProperty("PALATE")
  private String palate;

  @JsonProperty("FLOOR_OF_MOUTH")
  private String floorOfMouth;

  @JsonProperty("LYMPH_NODES")
  private String lymphNodes;

  @JsonProperty("THYROID")
  private String thyroid;

  // Image data as byte arrays (following Chart pattern)
  @JsonProperty("mouth_image_data")
  private byte[] mouthImageData;

  @JsonProperty("neck_image_data")
  private byte[] neckImageData;

  @JsonProperty("tongue_image_data")
  private byte[] tongueImageData;

  @JsonProperty("under_tongue_image_data")
  private byte[] underTongueImageData;

  // Image paths for drawings (still keep for file path storage)
  @JsonProperty("mouth_image_path")
  private String mouthImagePath;

  @JsonProperty("neck_image_path")
  private String neckImagePath;

  @JsonProperty("tongue_image_path")
  private String tongueImagePath;

  @JsonProperty("under_tongue_image_path")
  private String underTongueImagePath;

  public SoftTissueExamination mapToSTE(PatientService patientService) {
    SoftTissueExamination softTissueExamination = new SoftTissueExamination();

    softTissueExamination.setDate(Date.valueOf(this.date));
    softTissueExamination.setHeadNeckTmj(this.headNeckTmj);
    softTissueExamination.setMucosa(this.mucosa);
    softTissueExamination.setPharynx(this.pharynx);
    softTissueExamination.setTongue(this.tongue);
    softTissueExamination.setSalivaryGland(this.salivaryGland);
    softTissueExamination.setGingiva(this.gingiva);
    softTissueExamination.setLipsFrenum(this.lipsFrenum);
    softTissueExamination.setPalate(this.palate);
    softTissueExamination.setFloorOfMouth(this.floorOfMouth);
    softTissueExamination.setLymphNodes(this.lymphNodes);
    softTissueExamination.setThyroid(this.thyroid);

    // Set image paths
    softTissueExamination.setMouthImagePath(this.mouthImagePath);
    softTissueExamination.setNeckImagePath(this.neckImagePath);
    softTissueExamination.setTongueImagePath(this.tongueImagePath);
    softTissueExamination.setUnderTongueImagePath(this.underTongueImagePath);

    Patient patient = patientService.findPatientByID(this.patientNumber);
    //        softTissueExamination.setPatient(patient);
    return softTissueExamination;
  }
}
