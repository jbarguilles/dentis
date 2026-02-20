import { PatientInterviewData } from "@/types/patient-interview";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface SavePatientInterviewRequest {
  patientNumber: number;
  chiefComplaintAndHistory: string;

  // Dental History
  lastDentalVisit: string;
  dentalVisitFrequency: string;
  lastVisitProcedures: string;
  anesthesiaResponse: string;
  dentalComplications: string;

  // Medical History - Basic Fields
  underPhysicianCare: string;
  physicianName: string;
  physicianPhone: string;
  everHospitalized: string;
  hospitalizationDate: string;
  hospitalizationReason: string;
  allergies: string;
  illnesses: string;
  medications: string;
  childhoodDiseases: string;
  medicalUpdate: string;

  // Medical History Chart - Section 1: Medical Conditions
  afternoon_fever: boolean;
  breathing_problems: boolean;
  frequent_headaches: boolean;
  pacemakers_artificial_heart_valves: boolean;
  angina_pectoris_chest_pain: boolean;
  chemotherapy: boolean;
  frequent_high_fever: boolean;
  pain_in_joints: boolean;
  anxiety: boolean;
  chronic_cough: boolean;
  frequent_hunger: boolean;
  pain_upon_urination: boolean;
  arthritis: boolean;
  denied_permission_to_give_blood: boolean;
  frequent_thirst: boolean;
  pallor: boolean;
  asthma: boolean;
  depression: boolean;
  frequent_urination: boolean;
  pelvic_or_lower_abdominal_discomfort: boolean;
  bleeding_or_bruising_tendency: boolean;
  diabetes: boolean;
  goiter: boolean;
  sinusitis: boolean;
  blood_transfusion: boolean;
  dizziness: boolean;
  heart_attack: boolean;
  sudden_weight_loss_or_gain: boolean;
  blood_or_pus_in_urine: boolean;
  emphysema: boolean;
  high_blood_pressure: boolean;
  swollen_ankles: boolean;
  bloody_sputum: boolean;
  fainting_spell_or_loss_of_consciousness: boolean;
  nervousness: boolean;
  tremors: boolean;
  visual_impairment: boolean;
  others: boolean;
  s1_others_specify: string;

  // Medical History Chart - Section 2: Family History
  fh_diabetes: boolean;
  fh_heart_disease: boolean;
  fh_bleeding_disorders: boolean;
  fh_cancer: boolean;
  fh_others: boolean;
  fh_others_specify: string;

  // Medical History Chart - Section 3: Allergies
  allergies_drugs: boolean;
  allergies_drugs_specify: string;
  allergies_food: boolean;
  allergies_food_specify: string;
  allergies_rubber: boolean;
  allergies_rubber_specify: string;
  allergies_others: boolean;
  allergies_others_specify: string;

  // Medical History Chart - Section 4: Females
  are_you_pregnant_now: string;
  are_you_breastfeeding_now: string;
  under_hormone_replacement_therapy: string;
  menstruation: string;
  females_pregnant_months: number;
  females_contraceptive: string;
  females_contraceptive_type: string;

  // Social History
  tobacco_kind: string;
  tobacco_frequency: string;
  tobacco_years_of_use: string;
  tobacco_last_used: string;
  alcohol_kind: string;
  alcohol_frequency: string;
  alcohol_years_of_use: string;
  alcohol_last_used: string;
  drug_kind: string;
  drug_frequency: string;
  drug_years_of_use: string;
  drug_last_used: string;
  tobacco_checked: boolean;
  alcohol_checked: boolean;
  drugs_checked: boolean;
}

export const savePatientInterview = async (
  patientInterviewData: PatientInterviewData,
  patientNumber: number = 1,
): Promise<any> => {
  try {
    // Transform the PatientInterviewData to match the backend DTO structure
    const requestPayload: SavePatientInterviewRequest = {
      patientNumber,

      // Chief Complaint
      chiefComplaintAndHistory: patientInterviewData.chiefComplaintAndHistory,

      // Dental History
      lastDentalVisit: patientInterviewData.dentalHistoryData.lastDentalVisit,
      dentalVisitFrequency: patientInterviewData.dentalHistoryData.dentalVisitFrequency,
      lastVisitProcedures: patientInterviewData.dentalHistoryData.lastVisitProcedures,
      anesthesiaResponse: patientInterviewData.dentalHistoryData.anesthesiaResponse,
      dentalComplications: patientInterviewData.dentalHistoryData.dentalComplications,

      // Medical History - Basic Fields
      underPhysicianCare: patientInterviewData.medicalHistoryData.underPhysicianCare,
      physicianName: patientInterviewData.medicalHistoryData.physicianName,
      physicianPhone: patientInterviewData.medicalHistoryData.physicianPhone,
      everHospitalized: patientInterviewData.medicalHistoryData.everHospitalized,
      hospitalizationDate: patientInterviewData.medicalHistoryData.hospitalizationDate,
      hospitalizationReason: patientInterviewData.medicalHistoryData.hospitalizationReason,
      allergies: patientInterviewData.medicalHistoryData.allergies,
      illnesses: patientInterviewData.medicalHistoryData.illnesses,
      medications: patientInterviewData.medicalHistoryData.medications,
      childhoodDiseases: patientInterviewData.medicalHistoryData.childhoodDiseases,
      medicalUpdate: patientInterviewData.medicalHistoryData.medicalUpdate,

      // Medical History Chart - Section 1: Medical Conditions
      afternoon_fever: patientInterviewData.medicalHistoryData.afternoon_fever,
      breathing_problems: patientInterviewData.medicalHistoryData.breathing_problems,
      frequent_headaches: patientInterviewData.medicalHistoryData.frequent_headaches,
      pacemakers_artificial_heart_valves:
        patientInterviewData.medicalHistoryData.pacemakers_artificial_heart_valves,
      angina_pectoris_chest_pain:
        patientInterviewData.medicalHistoryData.angina_pectoris_chest_pain,
      chemotherapy: patientInterviewData.medicalHistoryData.chemotherapy,
      frequent_high_fever: patientInterviewData.medicalHistoryData.frequent_high_fever,
      pain_in_joints: patientInterviewData.medicalHistoryData.pain_in_joints,
      anxiety: patientInterviewData.medicalHistoryData.anxiety,
      chronic_cough: patientInterviewData.medicalHistoryData.chronic_cough,
      frequent_hunger: patientInterviewData.medicalHistoryData.frequent_hunger,
      pain_upon_urination: patientInterviewData.medicalHistoryData.pain_upon_urination,
      arthritis: patientInterviewData.medicalHistoryData.arthritis,
      denied_permission_to_give_blood:
        patientInterviewData.medicalHistoryData.denied_permission_to_give_blood,
      frequent_thirst: patientInterviewData.medicalHistoryData.frequent_thirst,
      pallor: patientInterviewData.medicalHistoryData.pallor,
      asthma: patientInterviewData.medicalHistoryData.asthma,
      depression: patientInterviewData.medicalHistoryData.depression,
      frequent_urination: patientInterviewData.medicalHistoryData.frequent_urination,
      pelvic_or_lower_abdominal_discomfort:
        patientInterviewData.medicalHistoryData.pelvic_or_lower_abdominal_discomfort,
      bleeding_or_bruising_tendency:
        patientInterviewData.medicalHistoryData.bleeding_or_bruising_tendency,
      diabetes: patientInterviewData.medicalHistoryData.diabetes,
      goiter: patientInterviewData.medicalHistoryData.goiter,
      sinusitis: patientInterviewData.medicalHistoryData.sinusitis,
      blood_transfusion: patientInterviewData.medicalHistoryData.blood_transfusion,
      dizziness: patientInterviewData.medicalHistoryData.dizziness,
      heart_attack: patientInterviewData.medicalHistoryData.heart_attack,
      sudden_weight_loss_or_gain:
        patientInterviewData.medicalHistoryData.sudden_weight_loss_or_gain,
      blood_or_pus_in_urine: patientInterviewData.medicalHistoryData.blood_or_pus_in_urine,
      emphysema: patientInterviewData.medicalHistoryData.emphysema,
      high_blood_pressure: patientInterviewData.medicalHistoryData.high_blood_pressure,
      swollen_ankles: patientInterviewData.medicalHistoryData.swollen_ankles,
      bloody_sputum: patientInterviewData.medicalHistoryData.bloody_sputum,
      fainting_spell_or_loss_of_consciousness:
        patientInterviewData.medicalHistoryData.fainting_spell_or_loss_of_consciousness,
      nervousness: patientInterviewData.medicalHistoryData.nervousness,
      tremors: patientInterviewData.medicalHistoryData.tremors,
      visual_impairment: patientInterviewData.medicalHistoryData.visual_impairment,
      others: patientInterviewData.medicalHistoryData.others,
      s1_others_specify: patientInterviewData.medicalHistoryData.s1_others_specify,

      // Medical History Chart - Section 2: Family History
      fh_diabetes: patientInterviewData.medicalHistoryData.fh_diabetes,
      fh_heart_disease: patientInterviewData.medicalHistoryData.fh_heart_disease,
      fh_bleeding_disorders: patientInterviewData.medicalHistoryData.fh_bleeding_disorders,
      fh_cancer: patientInterviewData.medicalHistoryData.fh_cancer,
      fh_others: patientInterviewData.medicalHistoryData.fh_others,
      fh_others_specify: patientInterviewData.medicalHistoryData.fh_others_specify,

      // Medical History Chart - Section 3: Allergies
      allergies_drugs: patientInterviewData.medicalHistoryData.allergies_drugs,
      allergies_drugs_specify: patientInterviewData.medicalHistoryData.allergies_drugs_specify,
      allergies_food: patientInterviewData.medicalHistoryData.allergies_food,
      allergies_food_specify: patientInterviewData.medicalHistoryData.allergies_food_specify,
      allergies_rubber: patientInterviewData.medicalHistoryData.allergies_rubber,
      allergies_rubber_specify: patientInterviewData.medicalHistoryData.allergies_rubber_specify,
      allergies_others: patientInterviewData.medicalHistoryData.allergies_others,
      allergies_others_specify: patientInterviewData.medicalHistoryData.allergies_others_specify,

      // Medical History Chart - Section 4: Females
      are_you_pregnant_now: patientInterviewData.medicalHistoryData.are_you_pregnant_now,
      are_you_breastfeeding_now: patientInterviewData.medicalHistoryData.are_you_breastfeeding_now,
      under_hormone_replacement_therapy:
        patientInterviewData.medicalHistoryData.under_hormone_replacement_therapy,
      menstruation: patientInterviewData.medicalHistoryData.menstruation,
      females_pregnant_months: patientInterviewData.medicalHistoryData.females_pregnant_months,
      females_contraceptive: patientInterviewData.medicalHistoryData.females_contraceptive,
      females_contraceptive_type:
        patientInterviewData.medicalHistoryData.females_contraceptive_type,

      // Social History
      tobacco_kind: patientInterviewData.socialHistoryFormData.tobacco_kind,
      tobacco_frequency: patientInterviewData.socialHistoryFormData.tobacco_frequency,
      tobacco_years_of_use: patientInterviewData.socialHistoryFormData.tobacco_years_of_use,
      tobacco_last_used: patientInterviewData.socialHistoryFormData.tobacco_last_used,
      alcohol_kind: patientInterviewData.socialHistoryFormData.alcohol_kind,
      alcohol_frequency: patientInterviewData.socialHistoryFormData.alcohol_frequency,
      alcohol_years_of_use: patientInterviewData.socialHistoryFormData.alcohol_years_of_use,
      alcohol_last_used: patientInterviewData.socialHistoryFormData.alcohol_last_used,
      drug_kind: patientInterviewData.socialHistoryFormData.drug_kind,
      drug_frequency: patientInterviewData.socialHistoryFormData.drug_frequency,
      drug_years_of_use: patientInterviewData.socialHistoryFormData.drug_years_of_use,
      drug_last_used: patientInterviewData.socialHistoryFormData.drug_last_used,
      tobacco_checked: patientInterviewData.socialHistoryFormData.tobacco_checked,
      alcohol_checked: patientInterviewData.socialHistoryFormData.alcohol_checked,
      drugs_checked: patientInterviewData.socialHistoryFormData.drugs_checked,
    };

    console.log("Sending patient interview data:", requestPayload);

    const response = await fetch(`${API_URL}/patient-interview/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to save patient interview: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("Patient interview saved successfully:", result);
    return result;
  } catch (error) {
    console.error("Error saving patient interview:", error);
    throw error;
  }
};
