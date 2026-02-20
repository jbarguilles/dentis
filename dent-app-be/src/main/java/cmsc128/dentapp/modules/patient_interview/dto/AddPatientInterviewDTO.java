package cmsc128.dentapp.modules.patient_interview.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import cmsc128.dentapp.modules.patient_interview.entities.PatientInterview;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddPatientInterviewDTO {

  // ===== CHIEF COMPLAINT SECTION =====
  private String chiefComplaintAndHistory;

  // ===== DENTAL HISTORY SECTION =====
  private String lastDentalVisit;
  private String dentalVisitFrequency;
  private String lastVisitProcedures;
  private String anesthesiaResponse;
  private String dentalComplications;

  // ===== MEDICAL HISTORY SECTION - Basic Fields =====
  private String underPhysicianCare;
  private String physicianName;
  private String physicianPhone;
  private String everHospitalized;
  private String hospitalizationDate;
  private String hospitalizationReason;
  private String allergies;
  private String illnesses;
  private String medications;
  private String childhoodDiseases;
  private String medicalUpdate;

  // ===== MEDICAL HISTORY CHART - Section 1: Medical Conditions =====
  @JsonProperty("afternoon_fever")
  private Boolean afternoonFever;

  @JsonProperty("breathing_problems")
  private Boolean breathingProblems;

  @JsonProperty("frequent_headaches")
  private Boolean frequentHeadaches;

  @JsonProperty("pacemakers_artificial_heart_valves")
  private Boolean pacemakersArtificialHeartValves;

  @JsonProperty("angina_pectoris_chest_pain")
  private Boolean anginaPectorisChestPain;

  private Boolean chemotherapy;

  @JsonProperty("frequent_high_fever")
  private Boolean frequentHighFever;

  @JsonProperty("pain_in_joints")
  private Boolean painInJoints;

  private Boolean anxiety;

  @JsonProperty("chronic_cough")
  private Boolean chronicCough;

  @JsonProperty("frequent_hunger")
  private Boolean frequentHunger;

  @JsonProperty("pain_upon_urination")
  private Boolean painUponUrination;

  private Boolean arthritis;

  @JsonProperty("denied_permission_to_give_blood")
  private Boolean deniedPermissionToGiveBlood;

  @JsonProperty("frequent_thirst")
  private Boolean frequentThirst;

  private Boolean pallor;

  private Boolean asthma;

  private Boolean depression;

  @JsonProperty("frequent_urination")
  private Boolean frequentUrination;

  @JsonProperty("pelvic_or_lower_abdominal_discomfort")
  private Boolean pelvicOrLowerAbdominalDiscomfort;

  @JsonProperty("bleeding_or_bruising_tendency")
  private Boolean bleedingOrBruisingTendency;

  private Boolean diabetes;

  private Boolean goiter;

  private Boolean sinusitis;

  @JsonProperty("blood_transfusion")
  private Boolean bloodTransfusion;

  private Boolean dizziness;

  @JsonProperty("heart_attack")
  private Boolean heartAttack;

  @JsonProperty("sudden_weight_loss_or_gain")
  private Boolean suddenWeightLossOrGain;

  @JsonProperty("blood_or_pus_in_urine")
  private Boolean bloodOrPusInUrine;

  private Boolean emphysema;

  @JsonProperty("high_blood_pressure")
  private Boolean highBloodPressure;

  @JsonProperty("swollen_ankles")
  private Boolean swollenAnkles;

  @JsonProperty("bloody_sputum")
  private Boolean bloodySputum;

  @JsonProperty("fainting_spell_or_loss_of_consciousness")
  private Boolean faintingSpellOrLossOfConsciousness;

  private Boolean nervousness;

  private Boolean tremors;

  @JsonProperty("visual_impairment")
  private Boolean visualImpairment;

  private Boolean others;

  @JsonProperty("s1_others_specify")
  private String s1OthersSpecify;

  // ===== MEDICAL HISTORY CHART - Section 2: Family History =====
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

  // ===== MEDICAL HISTORY CHART - Section 3: Allergies =====
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

  // ===== MEDICAL HISTORY CHART - Section 4: Females =====
  @JsonProperty("are_you_pregnant_now")
  private String areYouPregnantNow;

  @JsonProperty("are_you_breastfeeding_now")
  private String areYouBreastfeedingNow;

  @JsonProperty("under_hormone_replacement_therapy")
  private String underHormoneReplacementTherapy;

  private String menstruation;

  @JsonProperty("females_pregnant_months")
  private Integer femalesPregnantMonths;

  @JsonProperty("females_contraceptive")
  private String femalesContraceptive;

  @JsonProperty("females_contraceptive_type")
  private String femalesContraceptiveType;

  // ===== SOCIAL HISTORY SECTION =====
  @JsonProperty("tobacco_kind")
  private String tobaccoKind;

  @JsonProperty("tobacco_frequency")
  private String tobaccoFrequency;

  @JsonProperty("tobacco_years_of_use")
  private String tobaccoYearsOfUse;

  @JsonProperty("tobacco_last_used")
  private String tobaccoLastUsed;

  @JsonProperty("alcohol_kind")
  private String alcoholKind;

  @JsonProperty("alcohol_frequency")
  private String alcoholFrequency;

  @JsonProperty("alcohol_years_of_use")
  private String alcoholYearsOfUse;

  @JsonProperty("alcohol_last_used")
  private String alcoholLastUsed;

  @JsonProperty("drug_kind")
  private String drugKind;

  @JsonProperty("drug_frequency")
  private String drugFrequency;

  @JsonProperty("drug_years_of_use")
  private String drugYearsOfUse;

  @JsonProperty("drug_last_used")
  private String drugLastUsed;

  // Checkbox states for social history
  @JsonProperty("tobacco_checked")
  private Boolean tobaccoChecked;

  @JsonProperty("alcohol_checked")
  private Boolean alcoholChecked;

  @JsonProperty("drugs_checked")
  private Boolean drugsChecked;

  @JsonProperty("patient_id")
  private Long patientID;

  public PatientInterview mapToPatientInterview() {
    PatientInterview entity = new PatientInterview();

    // Chief Complaint Section
    entity.setChiefComplaintAndHistory(this.chiefComplaintAndHistory);

    // Dental History Section
    entity.setLastDentalVisit(this.lastDentalVisit);
    entity.setDentalVisitFrequency(this.dentalVisitFrequency);
    entity.setLastVisitProcedures(this.lastVisitProcedures);
    entity.setAnesthesiaResponse(this.anesthesiaResponse);
    entity.setDentalComplications(this.dentalComplications);

    // Medical History Section - Basic Fields
    entity.setUnderPhysicianCare(this.underPhysicianCare);
    entity.setPhysicianName(this.physicianName);
    entity.setPhysicianPhone(this.physicianPhone);
    entity.setEverHospitalized(this.everHospitalized);
    entity.setHospitalizationDate(this.hospitalizationDate);
    entity.setHospitalizationReason(this.hospitalizationReason);
    entity.setAllergies(this.allergies);
    entity.setIllnesses(this.illnesses);
    entity.setMedications(this.medications);
    entity.setChildhoodDiseases(this.childhoodDiseases);
    entity.setMedicalUpdate(this.medicalUpdate);

    // Medical History Chart - Section 1: Medical Conditions
    entity.setAfternoonFever(this.afternoonFever);
    entity.setBreathingProblems(this.breathingProblems);
    entity.setFrequentHeadaches(this.frequentHeadaches);
    entity.setPacemakersArtificialHeartValves(this.pacemakersArtificialHeartValves);
    entity.setAnginaPectorisChestPain(this.anginaPectorisChestPain);
    entity.setChemotherapy(this.chemotherapy);
    entity.setFrequentHighFever(this.frequentHighFever);
    entity.setPainInJoints(this.painInJoints);
    entity.setAnxiety(this.anxiety);
    entity.setChronicCough(this.chronicCough);
    entity.setFrequentHunger(this.frequentHunger);
    entity.setPainUponUrination(this.painUponUrination);
    entity.setArthritis(this.arthritis);
    entity.setDeniedPermissionToGiveBlood(this.deniedPermissionToGiveBlood);
    entity.setFrequentThirst(this.frequentThirst);
    entity.setPallor(this.pallor);
    entity.setAsthma(this.asthma);
    entity.setDepression(this.depression);
    entity.setFrequentUrination(this.frequentUrination);
    entity.setPelvicOrLowerAbdominalDiscomfort(this.pelvicOrLowerAbdominalDiscomfort);
    entity.setBleedingOrBruisingTendency(this.bleedingOrBruisingTendency);
    entity.setDiabetes(this.diabetes);
    entity.setGoiter(this.goiter);
    entity.setSinusitis(this.sinusitis);
    entity.setBloodTransfusion(this.bloodTransfusion);
    entity.setDizziness(this.dizziness);
    entity.setHeartAttack(this.heartAttack);
    entity.setSuddenWeightLossOrGain(this.suddenWeightLossOrGain);
    entity.setBloodOrPusInUrine(this.bloodOrPusInUrine);
    entity.setEmphysema(this.emphysema);
    entity.setHighBloodPressure(this.highBloodPressure);
    entity.setSwollenAnkles(this.swollenAnkles);
    entity.setBloodySputum(this.bloodySputum);
    entity.setFaintingSpellOrLossOfConsciousness(this.faintingSpellOrLossOfConsciousness);
    entity.setNervousness(this.nervousness);
    entity.setTremors(this.tremors);
    entity.setVisualImpairment(this.visualImpairment);
    entity.setOthersMedicalCondition(this.others);
    entity.setS1OthersSpecify(this.s1OthersSpecify);

    // Medical History Chart - Section 2: Family History
    entity.setFhDiabetes(this.fhDiabetes);
    entity.setFhHeartDisease(this.fhHeartDisease);
    entity.setFhBleedingDisorders(this.fhBleedingDisorders);
    entity.setFhCancer(this.fhCancer);
    entity.setFhOthers(this.fhOthers);
    entity.setFhOthersSpecify(this.fhOthersSpecify);

    // Medical History Chart - Section 3: Allergies
    entity.setAllergiesDrugs(this.allergiesDrugs);
    entity.setAllergiesDrugsSpecify(this.allergiesDrugsSpecify);
    entity.setAllergiesFood(this.allergiesFood);
    entity.setAllergiesFoodSpecify(this.allergiesFoodSpecify);
    entity.setAllergiesRubber(this.allergiesRubber);
    entity.setAllergiesRubberSpecify(this.allergiesRubberSpecify);
    entity.setAllergiesOthers(this.allergiesOthers);
    entity.setAllergiesOthersSpecify(this.allergiesOthersSpecify);

    // Medical History Chart - Section 4: Females
    entity.setAreYouPregnantNow(this.areYouPregnantNow);
    entity.setAreYouBreastfeedingNow(this.areYouBreastfeedingNow);
    entity.setUnderHormoneReplacementTherapy(this.underHormoneReplacementTherapy);
    entity.setMenstruation(this.menstruation);
    entity.setFemalesPregnantMonths(this.femalesPregnantMonths);
    entity.setFemalesContraceptive(this.femalesContraceptive);
    entity.setFemalesContraceptiveType(this.femalesContraceptiveType);

    // Social History Section
    entity.setTobaccoKind(this.tobaccoKind);
    entity.setTobaccoFrequency(this.tobaccoFrequency);
    entity.setTobaccoYearsOfUse(this.tobaccoYearsOfUse);
    entity.setTobaccoLastUsed(this.tobaccoLastUsed);
    entity.setAlcoholKind(this.alcoholKind);
    entity.setAlcoholFrequency(this.alcoholFrequency);
    entity.setAlcoholYearsOfUse(this.alcoholYearsOfUse);
    entity.setAlcoholLastUsed(this.alcoholLastUsed);
    entity.setDrugKind(this.drugKind);
    entity.setDrugFrequency(this.drugFrequency);
    entity.setDrugYearsOfUse(this.drugYearsOfUse);
    entity.setDrugLastUsed(this.drugLastUsed);
    entity.setTobaccoChecked(this.tobaccoChecked);
    entity.setAlcoholChecked(this.alcoholChecked);
    entity.setDrugsChecked(this.drugsChecked);

    return entity;
  }
}
