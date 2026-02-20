package cmsc128.dentapp.modules.medical_history.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import cmsc128.dentapp.modules.medical_history.entities.MedicalHistoryChart;
import cmsc128.dentapp.modules.patient.entities.Patient;
import cmsc128.dentapp.modules.patient.services.PatientService;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddMedicalHistoryDTO {

  @JsonProperty("patientNumber")
  private Long patientNumber;

  @JsonProperty("high_blood_pressure")
  private Boolean highBloodPressure;

  @JsonProperty("heart_attack")
  private Boolean heartAttack;

  @JsonProperty("angina_pectoris_chest_pain")
  private Boolean anginaPectorisChestPain;

  @JsonProperty("swollen_ankles")
  private Boolean swollenAnkles;

  @JsonProperty("frequent_high_fever")
  private Boolean frequentHighFever;

  @JsonProperty("pacemakers_artificial_heart_valves")
  private Boolean pacemakersArtificialHeartValves;

  @JsonProperty("emphysema")
  private Boolean emphysema;

  @JsonProperty("asthma")
  private Boolean asthma;

  @JsonProperty("afternoon_fever")
  private Boolean afternoonFever;

  @JsonProperty("chronic_cough")
  private Boolean chronicCough;

  @JsonProperty("breathing_problems")
  private Boolean breathingProblems;

  @JsonProperty("bloody_sputum")
  private Boolean bloodySputum;

  @JsonProperty("sinusitis")
  private Boolean sinusitis;

  @JsonProperty("frequent_headaches")
  private Boolean frequentHeadaches;

  @JsonProperty("dizziness")
  private Boolean dizziness;

  @JsonProperty("fainting_spell_or_loss_of_consciousness")
  private Boolean faintingSpellOrLossOfConsciousness;

  @JsonProperty("visual_impairment")
  private Boolean visualImpairment;

  @JsonProperty("arthritis")
  private Boolean arthritis;

  @JsonProperty("pain_in_joints")
  private Boolean painInJoints;

  @JsonProperty("tremors")
  private Boolean tremors;

  @JsonProperty("blood_transfusion")
  private Boolean bloodTransfusion;

  @JsonProperty("denied_permission_to_give_blood")
  private Boolean deniedPermissionToGiveBlood;

  @JsonProperty("pallor")
  private Boolean pallor;

  @JsonProperty("diabetes")
  private Boolean diabetes;

  @JsonProperty("goiter")
  private Boolean goiter;

  @JsonProperty("bleeding_or_bruising_tendency")
  private Boolean bleedingOrBruisingTendency;

  @JsonProperty("sudden_weight_loss_gain")
  private Boolean suddenWeightLossGain;

  @JsonProperty("frequent_thirst")
  private Boolean frequentThirst;

  @JsonProperty("frequent_hunger")
  private Boolean frequentHunger;

  @JsonProperty("frequent_urination")
  private Boolean frequentUrination;

  @JsonProperty("chemotherapy")
  private Boolean chemotherapy;

  @JsonProperty("pain_upon_urination")
  private Boolean painUponUrination;

  @JsonProperty("blood_or_push_in_urine")
  private Boolean bloodOrPushInUrine;

  @JsonProperty("pelvic_or_lower_abdominal_discomfort")
  private Boolean pelvicOrLowerAbdominalDiscomfort;

  @JsonProperty("nervousness")
  private Boolean nervousness;

  @JsonProperty("depression")
  private Boolean depression;

  @JsonProperty("anxiety")
  private Boolean anxiety;

  @JsonProperty("s1_others")
  private Boolean s1Others;

  @JsonProperty("s1_others_specify")
  private String s1OthersSpecify;

  @JsonProperty("fh_diabetes")
  private Boolean fhDiabetes;

  @JsonProperty("fh_heart_disease")
  private Boolean fhHeartDisease;

  @JsonProperty("fh_bleeding_disorders")
  private Boolean fhBleedingDisorders;

  @JsonProperty("fh_cancer")
  private Boolean fhCancer;

  @JsonProperty("fh_others")
  private Boolean fhOthers;

  @JsonProperty("fh_others_specify")
  private String fhOthersSpecify;

  @JsonProperty("allergies_drugs")
  private Boolean allergiesDrugs;

  @JsonProperty("allergies_drugs_specify")
  private String allergiesDrugsSpecify;

  @JsonProperty("allergies_food")
  private Boolean allergiesFood;

  @JsonProperty("allergies_food_specify")
  private String allergiesFoodSpecify;

  @JsonProperty("allergies_rubber")
  private Boolean allergiesRubber;

  @JsonProperty("allergies_rubber_specify")
  private String allergiesRubberSpecify;

  @JsonProperty("allergies_others")
  private Boolean allergiesOthers;

  @JsonProperty("allergies_others_specify")
  private String allergiesOthersSpecify;

  @JsonProperty("females_pregnant")
  private Boolean femalesPregnant;

  @JsonProperty("females_pregnant_months")
  private Integer femalesPregnantMonths;

  @JsonProperty("females_breastfeeding")
  private Boolean femalesBreastfeeding;

  @JsonProperty("females_under_hrt")
  private Boolean femalesUnderHrt;

  @JsonProperty("females_menstruation")
  private Boolean femalesMenstruation;

  @JsonProperty("females_contraceptive")
  private Boolean femalesContraceptive;

  @JsonProperty("females_contraceptive_specify")
  private String femalesContraceptiveSpecify;

  public MedicalHistoryChart mapToMHC(PatientService patientService) {
    MedicalHistoryChart medicalHistoryChart = new MedicalHistoryChart();

    medicalHistoryChart.setHighBloodPressure(this.highBloodPressure);
    medicalHistoryChart.setHeartAttack(this.heartAttack);
    medicalHistoryChart.setAnginaPectorisChestPain(this.anginaPectorisChestPain);
    medicalHistoryChart.setSwollenAnkles(this.swollenAnkles);
    medicalHistoryChart.setFrequentHighFever(this.frequentHighFever);
    medicalHistoryChart.setPacemakersArtificialHeartValves(this.pacemakersArtificialHeartValves);
    medicalHistoryChart.setEmphysema(this.emphysema);
    medicalHistoryChart.setAsthma(this.asthma);
    medicalHistoryChart.setAfternoonFever(this.afternoonFever);
    medicalHistoryChart.setChronicCough(this.chronicCough);
    medicalHistoryChart.setBreathingProblems(this.breathingProblems);
    medicalHistoryChart.setBloodySputum(this.bloodySputum);
    medicalHistoryChart.setSinusitis(this.sinusitis);
    medicalHistoryChart.setFrequentHeadaches(this.frequentHeadaches);
    medicalHistoryChart.setDizziness(this.dizziness);
    medicalHistoryChart.setFaintingSpellOrLossOfConsciousness(
        this.faintingSpellOrLossOfConsciousness);
    medicalHistoryChart.setVisualImpairment(this.visualImpairment);
    medicalHistoryChart.setArthritis(this.arthritis);
    medicalHistoryChart.setPainInJoints(this.painInJoints);
    medicalHistoryChart.setTremors(this.tremors);
    medicalHistoryChart.setBloodTransfusion(this.bloodTransfusion);
    medicalHistoryChart.setDeniedPermissionToGiveBlood(this.deniedPermissionToGiveBlood);
    medicalHistoryChart.setPallor(this.pallor);
    medicalHistoryChart.setDiabetes(this.diabetes);
    medicalHistoryChart.setGoiter(this.goiter);
    medicalHistoryChart.setBleedingOrBruisingTendency(this.bleedingOrBruisingTendency);
    medicalHistoryChart.setSuddenWeightLossGain(this.suddenWeightLossGain);
    medicalHistoryChart.setFrequentThirst(this.frequentThirst);
    medicalHistoryChart.setFrequentHunger(this.frequentHunger);
    medicalHistoryChart.setFrequentUrination(this.frequentUrination);
    medicalHistoryChart.setChemotherapy(this.chemotherapy);
    medicalHistoryChart.setPainUponUrination(this.painUponUrination);
    medicalHistoryChart.setBloodOrPushInUrine(this.bloodOrPushInUrine);
    medicalHistoryChart.setPelvicOrLowerAbdominalDiscomfort(this.pelvicOrLowerAbdominalDiscomfort);
    medicalHistoryChart.setNervousness(this.nervousness);
    medicalHistoryChart.setDepression(this.depression);
    medicalHistoryChart.setAnxiety(this.anxiety);
    medicalHistoryChart.setS1Others(this.s1Others);
    medicalHistoryChart.setS1OthersSpecify(this.s1OthersSpecify);
    medicalHistoryChart.setFhDiabetes(this.fhDiabetes);
    medicalHistoryChart.setFhHeartDisease(this.fhHeartDisease);
    medicalHistoryChart.setFhBleedingDisorders(this.fhBleedingDisorders);
    medicalHistoryChart.setFhCancer(this.fhCancer);
    medicalHistoryChart.setFhOthers(this.fhOthers);
    medicalHistoryChart.setFhOthersSpecify(this.fhOthersSpecify);

    medicalHistoryChart.setAllergiesDrugs(this.allergiesDrugs);
    medicalHistoryChart.setAllergiesDrugsSpecify(this.allergiesDrugsSpecify);
    medicalHistoryChart.setAllergiesFood(this.allergiesFood);
    medicalHistoryChart.setAllergiesFoodSpecify(this.allergiesFoodSpecify);
    medicalHistoryChart.setAllergiesRubber(this.allergiesRubber);
    medicalHistoryChart.setAllergiesRubberSpecify(this.allergiesRubberSpecify);
    medicalHistoryChart.setAllergiesOthers(this.allergiesOthers);
    medicalHistoryChart.setAllergiesOthersSpecify(this.allergiesOthersSpecify);

    medicalHistoryChart.setFemalesPregnant(this.femalesPregnant);
    medicalHistoryChart.setFemalesPregnantMonths(this.femalesPregnantMonths);
    medicalHistoryChart.setFemalesBreastfeeding(this.femalesBreastfeeding);
    medicalHistoryChart.setFemalesUnderHrt(this.femalesUnderHrt);
    medicalHistoryChart.setFemalesMenstruation(this.femalesMenstruation);
    medicalHistoryChart.setFemalesContraceptive(this.femalesContraceptive);
    medicalHistoryChart.setFemalesContraceptiveSpecify(this.femalesContraceptiveSpecify);

    Patient patient = patientService.findPatientByID(Long.valueOf(this.patientNumber));
    medicalHistoryChart.setPatient(patient);

    return medicalHistoryChart;
  }
}
