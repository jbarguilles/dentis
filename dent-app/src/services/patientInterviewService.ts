// src/services/patientInterviewService.ts

import { PatientInterviewData } from "@/types/patient-interview";
import { apiRequest } from "./api";

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
  shortness_of_breath: boolean;
  persistent_bad_breath: boolean;
  high_blood_pressure: boolean;
  diarrhea: boolean;
  rapid_weight_gain_or_loss: boolean;
  persistent_cough: boolean;
  blood_transfusion: boolean;
  dizziness: boolean;
  sleepiness: boolean;
  rapid_heartbeat: boolean;
  cancer_or_tumor: boolean;
  excessive_appetite: boolean;
  swelling_of_ankles_or_hands: boolean;
  sores_that_did_not_heal: boolean;
  chest_pain: boolean;
  excessive_perspiration: boolean;
  swelling_of_face_or_neck: boolean;
  tingling_or_numbness: boolean;
  chronic_diarrhea: boolean;
  excessive_thirst: boolean;
  thrombophlebitis: boolean;
  tumor_or_growth: boolean;
  congenital_heart_defect: boolean;
  fainting_or_seizures: boolean;
  swelling_of_lymph_nodes: boolean;
  ulcers: boolean;

  // Medical History Chart - Section 2: Family History
  fh_diabetes: boolean;
  fh_high_blood_pressure: boolean;
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
  are_you_pregnant_now: boolean;
  are_you_breastfeeding_now: boolean;
  under_hormone_replacement_therapy: boolean;
  menstruation: boolean;
  females_pregnant_months: string;
  females_contraceptive: boolean;
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
  // Use the same payload structure as the original actions file
  const requestPayload: any = {
    patientNumber,

    // Chief Complaint
    chiefComplaintAndHistory: patientInterviewData.chiefComplaintAndHistory,

    // Dental History
    lastDentalVisit: patientInterviewData.dentalHistoryData.lastDentalVisit,
    dentalVisitFrequency: patientInterviewData.dentalHistoryData.dentalVisitFrequency,
    lastVisitProcedures: patientInterviewData.dentalHistoryData.lastVisitProcedures,
    anesthesiaResponse: patientInterviewData.dentalHistoryData.anesthesiaResponse,
    dentalComplications: patientInterviewData.dentalHistoryData.dentalComplications,

    // Copy all medical history and social history properties
    ...patientInterviewData.medicalHistoryData,
    ...patientInterviewData.socialHistoryFormData,
  };

  return apiRequest("/patient-interview/add", {
    method: "POST",
    body: JSON.stringify(requestPayload),
  });
};
