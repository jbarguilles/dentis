package cmsc128.dentapp.modules.medical_history.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import cmsc128.dentapp.modules.patient.entities.Patient;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "MEDICAL_HISTORY_CHART")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MedicalHistoryChart {
  @Id
  @SequenceGenerator(name = "MHC_SEQ", sequenceName = "MHC_SEQ", allocationSize = 1)
  @Column(name = "MHC_ID", nullable = false)
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "MHC_SEQ")
  private Long mhcid;

  @JsonIgnore
  @OneToOne(
      cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
      fetch = FetchType.LAZY)
  @JoinColumn(name = "PATIENT_ID", nullable = false)
  private Patient patient;

  @Column(name = "HIGH_BLOOD_PRESSURE")
  private Boolean highBloodPressure;

  @Column(name = "HEART_ATTACK")
  private Boolean heartAttack;

  @Column(name = "ANGINA_PECTORIS_CHEST_PAIN")
  private Boolean anginaPectorisChestPain;

  @Column(name = "SWOLLEN_ANKLES")
  private Boolean swollenAnkles;

  @Column(name = "FREQUENT_HIGH_FEVER")
  private Boolean frequentHighFever;

  @Column(name = "PACEMAKERS_ARTIFICIAL_HEART_VALVES")
  private Boolean pacemakersArtificialHeartValves;

  @Column(name = "EMPHYSEMA")
  private Boolean emphysema;

  @Column(name = "ASTHMA")
  private Boolean asthma;

  @Column(name = "AFTERNOON_FEVER")
  private Boolean afternoonFever;

  @Column(name = "CHRONIC_COUGH")
  private Boolean chronicCough;

  @Column(name = "BREATHING_PROBLEMS")
  private Boolean breathingProblems;

  @Column(name = "BLOODY_SPUTUM")
  private Boolean bloodySputum;

  @Column(name = "SINUSITIS")
  private Boolean sinusitis;

  @Column(name = "FREQUENT_HEADACHES")
  private Boolean frequentHeadaches;

  @Column(name = "DIZZINESS")
  private Boolean dizziness;

  @Column(name = "FAINTING_SPELL_OR_LOSS_OF_CONSCIOUSNESS")
  private Boolean faintingSpellOrLossOfConsciousness;

  @Column(name = "VISUAL_IMPAIRMENT")
  private Boolean visualImpairment;

  @Column(name = "ARTHRITIS")
  private Boolean arthritis;

  @Column(name = "PAIN_IN_JOINTS")
  private Boolean painInJoints;

  @Column(name = "TREMORS")
  private Boolean tremors;

  @Column(name = "BLOOD_TRANSFUSION")
  private Boolean bloodTransfusion;

  @Column(name = "DENIED_PERMISSION_TO_GIVE_BLOOD")
  private Boolean deniedPermissionToGiveBlood;

  @Column(name = "PALLOR")
  private Boolean pallor;

  @Column(name = "DIABETES")
  private Boolean diabetes;

  @Column(name = "GOITER")
  private Boolean goiter;

  @Column(name = "BLEEDING_OR_BRUISING_TENDENCY")
  private Boolean bleedingOrBruisingTendency;

  @Column(name = "SUDDEN_WEIGHT_LOSS_GAIN")
  private Boolean suddenWeightLossGain;

  @Column(name = "FREQUENT_THIRST")
  private Boolean frequentThirst;

  @Column(name = "FREQUENT_HUNGER")
  private Boolean frequentHunger;

  @Column(name = "FREQUENT_URINATION")
  private Boolean frequentUrination;

  @Column(name = "CHEMOTHERAPY")
  private Boolean chemotherapy;

  @Column(name = "PAIN_UPON_URINATION")
  private Boolean painUponUrination;

  @Column(name = "BLOOD_OR_PUS_IN_URINE")
  private Boolean bloodOrPushInUrine;

  @Column(name = "PELVIC_OR_LOWER_ABDOMINAL_DISCOMFORT")
  private Boolean pelvicOrLowerAbdominalDiscomfort;

  @Column(name = "NERVOUSNESS")
  private Boolean nervousness;

  @Column(name = "DEPRESSION")
  private Boolean depression;

  @Column(name = "ANXIETY")
  private Boolean anxiety;

  @Column(name = "S1_OTHERS")
  private Boolean s1Others;

  @Column(name = "S1_OTHERS_SPECIFY")
  private String s1OthersSpecify;

  @Column(name = "FH_DIABETES")
  private Boolean fhDiabetes;

  @Column(name = "FH_HEART_DISEASE")
  private Boolean fhHeartDisease;

  @Column(name = "FH_BLEEDING_DISORDERS")
  private Boolean fhBleedingDisorders;

  @Column(name = "FH_CANCER")
  private Boolean fhCancer;

  @Column(name = "FH_OTHERS")
  private Boolean fhOthers;

  @Column(name = "FH_OTHERS_SPECIFY")
  private String fhOthersSpecify;

  @Column(name = "ALLERGIES_DRUGS")
  private Boolean allergiesDrugs;

  @Column(name = "ALLERGIES_DRUGS_SPECIFY")
  private String allergiesDrugsSpecify;

  @Column(name = "ALLERGIES_FOOD")
  private Boolean allergiesFood;

  @Column(name = "ALLERGIES_FOOD_SPECIFY")
  private String allergiesFoodSpecify;

  @Column(name = "ALLERGIES_RUBBER")
  private Boolean allergiesRubber;

  @Column(name = "ALLERGIES_RUBBER_SPECIFY")
  private String allergiesRubberSpecify;

  @Column(name = "ALLERGIES_OTHERS")
  private Boolean allergiesOthers;

  @Column(name = "ALLERGIES_OTHERS_SPECIFY")
  private String allergiesOthersSpecify;

  @Column(name = "FEMALES_PREGNANT")
  private Boolean femalesPregnant;

  @Column(name = "FEMALES_PREGNANT_MONTHS")
  private Integer femalesPregnantMonths;

  @Column(name = "FEMALES_BREASTFEEDING")
  private Boolean femalesBreastfeeding;

  @Column(name = "FEMALES_UNDER_HRT")
  private Boolean femalesUnderHrt;

  @Column(name = "FEMALES_MENSTRUATION")
  private Boolean femalesMenstruation;

  @Column(name = "FEMALES_CONTRACEPTIVE")
  private Boolean femalesContraceptive;

  @Column(name = "FEMALES_CONTRACEPTIVE_SPECIFY", length = 100)
  private String femalesContraceptiveSpecify;

  public MedicalHistoryChart(
      Boolean highBloodPressure,
      Boolean heartAttack,
      Boolean anginaPectorisChestPain,
      Boolean swollenAnkles,
      Boolean frequentHighFever,
      Boolean pacemakersArtificialHeartValves,
      Boolean emphysema,
      Boolean asthma,
      Boolean afternoonFever,
      Boolean chronicCough,
      Boolean breathingProblems,
      Boolean bloodySputum,
      Boolean sinusitis,
      Boolean frequentHeadaches,
      Boolean dizziness,
      Boolean faintingSpellOrLossOfConsciousness,
      Boolean visualImpairment,
      Boolean arthritis,
      Boolean painInJoints,
      Boolean tremors,
      Boolean bloodTransfusion,
      Boolean deniedPermissionToGiveBlood,
      Boolean pallor,
      Boolean diabetes,
      Boolean goiter,
      Boolean bleedingOrBruisingTendency,
      Boolean suddenWeightLossGain,
      Boolean frequentThirst,
      Boolean frequentHunger,
      Boolean frequentUrination,
      Boolean chemotherapy,
      Boolean painUponUrination,
      Boolean bloodOrPushInUrine,
      Boolean pelvicOrLowerAbdominalDiscomfort,
      Boolean nervousness,
      Boolean depression,
      Boolean anxiety,
      Boolean s1Others,
      String s1OthersSpecify,
      Boolean fhDiabetes,
      Boolean fhHeartDisease,
      Boolean fhBleedingDisorders,
      Boolean fhCancer,
      Boolean fhOthers,
      String fhOthersSpecify,
      Boolean allergiesDrugs,
      Boolean allergiesFood,
      Boolean allergiesRubber,
      Boolean allergiesOthers,
      String allergiesOthersSpecify,
      Boolean femalesPregnant,
      Integer femalesPregnantMonths,
      Boolean femalesBreastfeeding,
      Boolean femalesUnderHrt,
      Boolean femalesMenstruation,
      Boolean femalesContraceptive,
      String femalesContraceptiveSpecify) {
    this.highBloodPressure = highBloodPressure;
    this.heartAttack = heartAttack;
    this.anginaPectorisChestPain = anginaPectorisChestPain;
    this.swollenAnkles = swollenAnkles;
    this.frequentHighFever = frequentHighFever;
    this.pacemakersArtificialHeartValves = pacemakersArtificialHeartValves;
    this.emphysema = emphysema;
    this.asthma = asthma;
    this.afternoonFever = afternoonFever;
    this.chronicCough = chronicCough;
    this.breathingProblems = breathingProblems;
    this.bloodySputum = bloodySputum;
    this.sinusitis = sinusitis;
    this.frequentHeadaches = frequentHeadaches;
    this.dizziness = dizziness;
    this.faintingSpellOrLossOfConsciousness = faintingSpellOrLossOfConsciousness;
    this.visualImpairment = visualImpairment;
    this.arthritis = arthritis;
    this.painInJoints = painInJoints;
    this.tremors = tremors;
    this.bloodTransfusion = bloodTransfusion;
    this.deniedPermissionToGiveBlood = deniedPermissionToGiveBlood;
    this.pallor = pallor;
    this.diabetes = diabetes;
    this.goiter = goiter;
    this.bleedingOrBruisingTendency = bleedingOrBruisingTendency;
    this.suddenWeightLossGain = suddenWeightLossGain;
    this.frequentThirst = frequentThirst;
    this.frequentHunger = frequentHunger;
    this.frequentUrination = frequentUrination;
    this.chemotherapy = chemotherapy;
    this.painUponUrination = painUponUrination;
    this.bloodOrPushInUrine = bloodOrPushInUrine;
    this.pelvicOrLowerAbdominalDiscomfort = pelvicOrLowerAbdominalDiscomfort;
    this.nervousness = nervousness;
    this.depression = depression;
    this.anxiety = anxiety;
    this.s1Others = s1Others;
    this.s1OthersSpecify = s1OthersSpecify;
    this.fhDiabetes = fhDiabetes;
    this.fhHeartDisease = fhHeartDisease;
    this.fhBleedingDisorders = fhBleedingDisorders;
    this.fhCancer = fhCancer;
    this.fhOthers = fhOthers;
    this.fhOthersSpecify = fhOthersSpecify;
    this.allergiesDrugs = allergiesDrugs;
    this.allergiesFood = allergiesFood;
    this.allergiesRubber = allergiesRubber;
    this.allergiesOthers = allergiesOthers;
    this.allergiesOthersSpecify = allergiesOthersSpecify;
    this.femalesPregnant = femalesPregnant;
    this.femalesPregnantMonths = femalesPregnantMonths;
    this.femalesBreastfeeding = femalesBreastfeeding;
    this.femalesUnderHrt = femalesUnderHrt;
    this.femalesMenstruation = femalesMenstruation;
    this.femalesContraceptive = femalesContraceptive;
    this.femalesContraceptiveSpecify = femalesContraceptiveSpecify;
  }
}
