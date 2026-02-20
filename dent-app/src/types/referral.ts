export type ReferralStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface PatientReferral {
  referral_id: number;
  patient_id: number;
  chart_number: string;
  patient_name: string;
  treatment: string;
  specifics: string;
  age: number;
  medical_alert: string;
  section_origin: string;
  section_destination: string;
  notes: string;
  status: ReferralStatus;
  referred_by: string;
  referred_by_id: number;
  accepted_by?: string;
  accepted_by_id?: number;
  created_at: string;
  accepted_at?: string;
}

export interface CreatePatientReferralRequest {
  chart_number: string;
  treatment: string;
  specifics: string;
  age: number;
  medical_alert: string;
  section_origin: string;
  section_destination: string;
  notes: string;
}

export interface UpdatePatientReferralRequest {
  treatment?: string;
  specifics?: string;
  age?: number;
  medical_alert?: string;
  section_origin?: string;
  section_destination?: string;
  notes?: string;
}

export interface PaginatedReferralResponse {
  content: PatientReferral[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface ChartNumberValidationResponse {
  valid: boolean;
}
