import { z } from "zod";

// Chief Complaint Section
export interface ChiefComplaintData {
  chiefComplaintAndHistory: string;
}

// Dental History Section
export interface DentalHistoryData {
  lastDentalVisit: string;
  dentalVisitFrequency: string;
  lastVisitProcedures: string;
  anesthesiaResponse: string;
  dentalComplications: string;
}

// Medical History Section
export interface MedicalHistoryData {
  // Original fields
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
  // Extended medical history chart fields
  // Section 1: Medical conditions
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

  // Section 2: Family History
  fh_diabetes: boolean;
  fh_heart_disease: boolean;
  fh_bleeding_disorders: boolean;
  fh_cancer: boolean;
  fh_others: boolean;
  fh_others_specify: string;

  // Section 3: Allergies
  allergies_drugs: boolean;
  allergies_drugs_specify: string;
  allergies_food: boolean;
  allergies_food_specify: string;
  allergies_rubber: boolean;
  allergies_rubber_specify: string;
  allergies_others: boolean;
  allergies_others_specify: string;

  // Section 4: Females
  are_you_pregnant_now: string;
  are_you_breastfeeding_now: string;
  under_hormone_replacement_therapy: string;
  menstruation: string;
  females_pregnant_months: number;
  females_contraceptive: string;
  females_contraceptive_type: string;
}

// Social History Section
export interface SocialHistoryData {
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
  // Checkbox states
  tobacco_checked: boolean;
  alcohol_checked: boolean;
  drugs_checked: boolean;
}

// Combined Patient Interview Data
export interface PatientInterviewData {
  chiefComplaintAndHistory: string;
  // Dental History
  dentalHistoryData: DentalHistoryData;
  // Medical History
  medicalHistoryData: MedicalHistoryData;
  // Social History
  socialHistoryFormData: SocialHistoryData;
}

// Zod schemas for validation
export const chiefComplaintSchema = z.object({
  chiefComplaintAndHistory: z.string(),
});

export const dentalHistorySchema = z.object({
  lastDentalVisit: z.string(),
  dentalVisitFrequency: z.string(),
  lastVisitProcedures: z.string(),
  anesthesiaResponse: z.string(),
  dentalComplications: z.string(),
});

export const medicalHistorySchema = z.object({
  // Original fields
  underPhysicianCare: z.string(),
  physicianName: z.string(),
  physicianPhone: z.string(),
  everHospitalized: z.string(),
  hospitalizationDate: z.string(),
  hospitalizationReason: z.string(),
  allergies: z.string(),
  illnesses: z.string(),
  medications: z.string(),
  childhoodDiseases: z.string(),
  medicalUpdate: z.string(),
  // Extended medical history chart fields - Section 1
  afternoon_fever: z.boolean().default(false),
  breathing_problems: z.boolean().default(false),
  frequent_headaches: z.boolean().default(false),
  pacemakers_artificial_heart_valves: z.boolean().default(false),
  angina_pectoris_chest_pain: z.boolean().default(false),
  chemotherapy: z.boolean().default(false),
  frequent_high_fever: z.boolean().default(false),
  pain_in_joints: z.boolean().default(false),
  anxiety: z.boolean().default(false),
  chronic_cough: z.boolean().default(false),
  frequent_hunger: z.boolean().default(false),
  pain_upon_urination: z.boolean().default(false),
  arthritis: z.boolean().default(false),
  denied_permission_to_give_blood: z.boolean().default(false),
  frequent_thirst: z.boolean().default(false),
  pallor: z.boolean().default(false),
  asthma: z.boolean().default(false),
  depression: z.boolean().default(false),
  frequent_urination: z.boolean().default(false),
  pelvic_or_lower_abdominal_discomfort: z.boolean().default(false),
  bleeding_or_bruising_tendency: z.boolean().default(false),
  diabetes: z.boolean().default(false),
  goiter: z.boolean().default(false),
  sinusitis: z.boolean().default(false),
  blood_transfusion: z.boolean().default(false),
  dizziness: z.boolean().default(false),
  heart_attack: z.boolean().default(false),
  sudden_weight_loss_or_gain: z.boolean().default(false),
  blood_or_pus_in_urine: z.boolean().default(false),
  emphysema: z.boolean().default(false),
  high_blood_pressure: z.boolean().default(false),
  swollen_ankles: z.boolean().default(false),
  bloody_sputum: z.boolean().default(false),
  fainting_spell_or_loss_of_consciousness: z.boolean().default(false),
  nervousness: z.boolean().default(false),
  tremors: z.boolean().default(false),
  visual_impairment: z.boolean().default(false),
  others: z.boolean().default(false),
  s1_others_specify: z.string().default(""),

  // Section 2: Family History
  fh_diabetes: z.boolean().default(false),
  fh_heart_disease: z.boolean().default(false),
  fh_bleeding_disorders: z.boolean().default(false),
  fh_cancer: z.boolean().default(false),
  fh_others: z.boolean().default(false),
  fh_others_specify: z.string().default(""),

  // Section 3: Allergies
  allergies_drugs: z.boolean().default(false),
  allergies_drugs_specify: z.string().default(""),
  allergies_food: z.boolean().default(false),
  allergies_food_specify: z.string().default(""),
  allergies_rubber: z.boolean().default(false),
  allergies_rubber_specify: z.string().default(""),
  allergies_others: z.boolean().default(false),
  allergies_others_specify: z.string().default(""),

  // Section 4: Females
  are_you_pregnant_now: z.string().default(""),
  are_you_breastfeeding_now: z.string().default(""),
  under_hormone_replacement_therapy: z.string().default(""),
  menstruation: z.string().default(""),
  females_pregnant_months: z
    .number()
    .min(0, { message: "Cannot be less than 0" })
    .max(9, { message: "Cannot be more than 9" })
    .default(0),
  females_contraceptive: z.string().default(""),
  females_contraceptive_type: z.string().default(""),
});

export const socialHistorySchema = z.object({
  tobacco_kind: z.string().default(""),
  tobacco_frequency: z.string().default(""),
  tobacco_years_of_use: z.string().default(""),
  tobacco_last_used: z.string().default(""),
  alcohol_kind: z.string().default(""),
  alcohol_frequency: z.string().default(""),
  alcohol_years_of_use: z.string().default(""),
  alcohol_last_used: z.string().default(""),
  drug_kind: z.string().default(""),
  drug_frequency: z.string().default(""),
  drug_years_of_use: z.string().default(""),
  drug_last_used: z.string().default(""),
  tobacco_checked: z.boolean().default(false),
  alcohol_checked: z.boolean().default(false),
  drugs_checked: z.boolean().default(false),
});

export const patientInterviewSchema = z.object({
  chiefComplaintAndHistory: z.string(),
  // Dental History
  dentalHistoryData: dentalHistorySchema,
  //Medical History
  medicalHistoryData: medicalHistorySchema,
  // Social History
  socialHistoryFormData: socialHistorySchema,
});
