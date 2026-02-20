package cmsc128.dentapp.modules.patient_interview.entities;

import cmsc128.dentapp.modules.patient.entities.Patient;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "PATIENT_INTERVIEW_DATA")
@Table(name = "patient_interview")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PatientInterview {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  // ===== CHIEF COMPLAINT SECTION =====
  @Column(name = "chief_complaint_and_history", length = 2000)
  private String chiefComplaintAndHistory;

  // ===== DENTAL HISTORY SECTION =====
  @Column(name = "last_dental_visit")
  private String lastDentalVisit;

  @Column(name = "dental_visit_frequency", length = 500)
  private String dentalVisitFrequency;

  @Column(name = "last_visit_procedures", length = 1000)
  private String lastVisitProcedures;

  @Column(name = "anesthesia_response", length = 1000)
  private String anesthesiaResponse;

  @Column(name = "dental_complications", length = 1000)
  private String dentalComplications;

  // ===== MEDICAL HISTORY SECTION - Basic Fields =====
  @Column(name = "under_physician_care", length = 500)
  private String underPhysicianCare;

  @Column(name = "physician_name", length = 200)
  private String physicianName;

  @Column(name = "physician_phone", length = 50)
  private String physicianPhone;

  @Column(name = "ever_hospitalized", length = 500)
  private String everHospitalized;

  @Column(name = "hospitalization_date")
  private String hospitalizationDate;

  @Column(name = "hospitalization_reason", length = 1000)
  private String hospitalizationReason;

  @Column(name = "allergies", length = 1000)
  private String allergies;

  @Column(name = "illnesses", length = 1000)
  private String illnesses;

  @Column(name = "medications", length = 1000)
  private String medications;

  @Column(name = "childhood_diseases", length = 1000)
  private String childhoodDiseases;

  @Column(name = "medical_update", length = 1000)
  private String medicalUpdate;

  // ===== MEDICAL HISTORY CHART - Section 1: Medical Conditions =====
  @Column(name = "afternoon_fever")
  private Boolean afternoonFever = false;

  @Column(name = "breathing_problems")
  private Boolean breathingProblems = false;

  @Column(name = "frequent_headaches")
  private Boolean frequentHeadaches = false;

  @Column(name = "pacemakers_artificial_heart_valves")
  private Boolean pacemakersArtificialHeartValves = false;

  @Column(name = "angina_pectoris_chest_pain")
  private Boolean anginaPectorisChestPain = false;

  @Column(name = "chemotherapy")
  private Boolean chemotherapy = false;

  @Column(name = "frequent_high_fever")
  private Boolean frequentHighFever = false;

  @Column(name = "pain_in_joints")
  private Boolean painInJoints = false;

  @Column(name = "anxiety")
  private Boolean anxiety = false;

  @Column(name = "chronic_cough")
  private Boolean chronicCough = false;

  @Column(name = "frequent_hunger")
  private Boolean frequentHunger = false;

  @Column(name = "pain_upon_urination")
  private Boolean painUponUrination = false;

  @Column(name = "arthritis")
  private Boolean arthritis = false;

  @Column(name = "denied_permission_to_give_blood")
  private Boolean deniedPermissionToGiveBlood = false;

  @Column(name = "frequent_thirst")
  private Boolean frequentThirst = false;

  @Column(name = "pallor")
  private Boolean pallor = false;

  @Column(name = "asthma")
  private Boolean asthma = false;

  @Column(name = "depression")
  private Boolean depression = false;

  @Column(name = "frequent_urination")
  private Boolean frequentUrination = false;

  @Column(name = "pelvic_or_lower_abdominal_discomfort")
  private Boolean pelvicOrLowerAbdominalDiscomfort = false;

  @Column(name = "bleeding_or_bruising_tendency")
  private Boolean bleedingOrBruisingTendency = false;

  @Column(name = "diabetes")
  private Boolean diabetes = false;

  @Column(name = "goiter")
  private Boolean goiter = false;

  @Column(name = "sinusitis")
  private Boolean sinusitis = false;

  @Column(name = "blood_transfusion")
  private Boolean bloodTransfusion = false;

  @Column(name = "dizziness")
  private Boolean dizziness = false;

  @Column(name = "heart_attack")
  private Boolean heartAttack = false;

  @Column(name = "sudden_weight_loss_or_gain")
  private Boolean suddenWeightLossOrGain = false;

  @Column(name = "blood_or_pus_in_urine")
  private Boolean bloodOrPusInUrine = false;

  @Column(name = "emphysema")
  private Boolean emphysema = false;

  @Column(name = "high_blood_pressure")
  private Boolean highBloodPressure = false;

  @Column(name = "swollen_ankles")
  private Boolean swollenAnkles = false;

  @Column(name = "bloody_sputum")
  private Boolean bloodySputum = false;

  @Column(name = "fainting_spell_or_loss_of_consciousness")
  private Boolean faintingSpellOrLossOfConsciousness = false;

  @Column(name = "nervousness")
  private Boolean nervousness = false;

  @Column(name = "tremors")
  private Boolean tremors = false;

  @Column(name = "visual_impairment")
  private Boolean visualImpairment = false;

  @Column(name = "others_medical_condition")
  private Boolean othersMedicalCondition = false;

  @Column(name = "s1_others_specify", length = 500)
  private String s1OthersSpecify;

  // ===== MEDICAL HISTORY CHART - Section 2: Family History =====
  @Column(name = "fh_diabetes")
  private Boolean fhDiabetes = false;

  @Column(name = "fh_heart_disease")
  private Boolean fhHeartDisease = false;

  @Column(name = "fh_bleeding_disorders")
  private Boolean fhBleedingDisorders = false;

  @Column(name = "fh_cancer")
  private Boolean fhCancer = false;

  @Column(name = "fh_others")
  private Boolean fhOthers = false;

  @Column(name = "fh_others_specify", length = 500)
  private String fhOthersSpecify;

  // ===== MEDICAL HISTORY CHART - Section 3: Allergies =====
  @Column(name = "allergies_drugs")
  private Boolean allergiesDrugs = false;

  @Column(name = "allergies_drugs_specify", length = 500)
  private String allergiesDrugsSpecify;

  @Column(name = "allergies_food")
  private Boolean allergiesFood = false;

  @Column(name = "allergies_food_specify", length = 500)
  private String allergiesFoodSpecify;

  @Column(name = "allergies_rubber")
  private Boolean allergiesRubber = false;

  @Column(name = "allergies_rubber_specify", length = 500)
  private String allergiesRubberSpecify;

  @Column(name = "allergies_others")
  private Boolean allergiesOthers = false;

  @Column(name = "allergies_others_specify", length = 500)
  private String allergiesOthersSpecify;

  // ===== MEDICAL HISTORY CHART - Section 4: Females =====
  @Column(name = "are_you_pregnant_now", length = 200)
  private String areYouPregnantNow;

  @Column(name = "are_you_breastfeeding_now", length = 200)
  private String areYouBreastfeedingNow;

  @Column(name = "under_hormone_replacement_therapy", length = 200)
  private String underHormoneReplacementTherapy;

  @Column(name = "menstruation", length = 200)
  private String menstruation;

  @Column(name = "females_pregnant_months")
  private Integer femalesPregnantMonths = 0;

  @Column(name = "females_contraceptive", length = 200)
  private String femalesContraceptive;

  @Column(name = "females_contraceptive_type", length = 200)
  private String femalesContraceptiveType;

  // ===== SOCIAL HISTORY SECTION =====
  @Column(name = "tobacco_kind", length = 200)
  private String tobaccoKind;

  @Column(name = "tobacco_frequency", length = 200)
  private String tobaccoFrequency;

  @Column(name = "tobacco_years_of_use", length = 100)
  private String tobaccoYearsOfUse;

  @Column(name = "tobacco_last_used", length = 200)
  private String tobaccoLastUsed;

  @Column(name = "alcohol_kind", length = 200)
  private String alcoholKind;

  @Column(name = "alcohol_frequency", length = 200)
  private String alcoholFrequency;

  @Column(name = "alcohol_years_of_use", length = 100)
  private String alcoholYearsOfUse;

  @Column(name = "alcohol_last_used", length = 200)
  private String alcoholLastUsed;

  @Column(name = "drug_kind", length = 200)
  private String drugKind;

  @Column(name = "drug_frequency", length = 200)
  private String drugFrequency;

  @Column(name = "drug_years_of_use", length = 100)
  private String drugYearsOfUse;

  @Column(name = "drug_last_used", length = 200)
  private String drugLastUsed;

  // Checkbox states for social history
  @Column(name = "tobacco_checked")
  private Boolean tobaccoChecked = false;

  @Column(name = "alcohol_checked")
  private Boolean alcoholChecked = false;

  @Column(name = "drugs_checked")
  private Boolean drugsChecked = false;

  // ===== RELATIONSHIP =====
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "patient_id")
  private Patient patient;
}
