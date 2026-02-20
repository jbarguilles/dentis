package cmsc128.dentapp.modules.soft_tissue_examination.entities;

import java.util.Date;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "SOFT_TISSUE_EXAMINATION")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SoftTissueExamination {
  @Id
  @SequenceGenerator(name = "STE_SEQ", sequenceName = "STE_SEQ", allocationSize = 1)
  @Column(name = "STE_ID", nullable = false)
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "STE_SEQ")
  private Long steId;

  //    @JsonIgnore
  //    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, fetch = FetchType.LAZY)
  //    @JoinColumn(name = "PATIENT_ID", nullable = false)
  //    private Patient patient;

  @Column(name = "STE_DATE")
  private Date date;

  @Column(name = "HEAD_NECK_TMJ")
  private String headNeckTmj;

  @Column(name = "MUCOSA")
  private String mucosa;

  @Column(name = "PHARYNX")
  private String pharynx;

  @Column(name = "TONGUE")
  private String tongue;

  @Column(name = "SALIVARY_GLAND")
  private String salivaryGland;

  @Column(name = "GINGIVA")
  private String gingiva;

  @Column(name = "LIPS_FRENUM")
  private String lipsFrenum;

  @Column(name = "PALATE")
  private String palate;

  @Column(name = "FLOOR_OF_MOUTH")
  private String floorOfMouth;

  @Column(name = "LYMPH_NODES")
  private String lymphNodes;

  @Column(name = "THYROID")
  private String thyroid;

  // Image file paths for drawings
  @Column(name = "MOUTH_IMAGE_PATH")
  private String mouthImagePath;

  @Column(name = "NECK_IMAGE_PATH")
  private String neckImagePath;

  @Column(name = "TONGUE_IMAGE_PATH")
  private String tongueImagePath;

  @Column(name = "UNDER_TONGUE_IMAGE_PATH")
  private String underTongueImagePath;

  public SoftTissueExamination(
      Date date,
      String headNeckTmj,
      String mucosa,
      String pharynx,
      String tongue,
      String salivaryGland,
      String gingiva,
      String lipsFrenum,
      String palate,
      String floorOfMouth,
      String lymphNodes,
      String thyroid) {
    this.date = date;
    this.headNeckTmj = headNeckTmj;
    this.mucosa = mucosa;
    this.pharynx = pharynx;
    this.tongue = tongue;
    this.salivaryGland = salivaryGland;
    this.gingiva = gingiva;
    this.lipsFrenum = lipsFrenum;
    this.palate = palate;
    this.floorOfMouth = floorOfMouth;
    this.lymphNodes = lymphNodes;
    this.thyroid = thyroid;
  }
}
