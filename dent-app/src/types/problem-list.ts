// Types for Problem List and all subsections

export type SpecialCaseTreatment = { tooth: string; treatment: string };
export type EmergencyTreatmentEntry = {
  toothNumber: string;
  treatment: string;
  otherTreatment?: string;
};

export interface ProblemListData {
  attending_clinician: string;

  management_of_periodontal_disease: boolean;
  periodontics_special_case: boolean;
  periodontics_special_case_treatments: SpecialCaseTreatment[];

  od_class_i: boolean;
  od_class_i_toothnum: string[];
  od_class_ii: boolean;
  od_class_ii_toothnum: string[];
  od_class_iii: boolean;
  od_class_iii_toothnum: string[];
  od_class_iv: boolean;
  od_class_iv_toothnum: string[];
  od_class_v: boolean;
  od_class_v_toothnum: string[];
  od_onlay: boolean;
  od_onlay_toothnum: string[];
  od_special_case: boolean;
  od_special_case_treatments: SpecialCaseTreatment[];

  surgery_extraction: boolean;
  surgery_extraction_toothnum: string[];
  surgery_odontectomy: boolean;
  surgery_odontectomy_toothnum: string[];
  surgery_special_case: boolean;
  surgery_special_case_treatments: SpecialCaseTreatment[];

  /**
   * Emergency treatment entries: each entry has a tooth number, selected treatments, and optional other treatment.
   */
  emergency_treatment_entries?: EmergencyTreatmentEntry[];

  fpd_laminates_veneers: boolean;
  fpd_laminates_veneers_tooth_number: string;
  fpd_single_crown: boolean;
  fpd_single_crown_tooth_number: string;
  fpd_bridge: boolean;
  fpd_bridge_tooth_number: string;
  fpd_special_case: boolean;
  fpd_special_case_treatments: SpecialCaseTreatment[];

  endodontics_anterior: boolean;
  endodontics_anterior_tooth_number: string;
  endodontics_posterior: boolean;
  endodontics_posterior_tooth_number: string;
  endodontics_special_case: boolean;
  endodontics_special_case_treatments: SpecialCaseTreatment[];

  prostho_complete_denture: boolean;
  prostho_single_denture: boolean;
  prostho_removable_partial_denture: boolean;
  prostho_special_case: boolean;
  prostho_special_case_treatments: SpecialCaseTreatment[];

  ortho_fixed_appliance: boolean;
  ortho_fixed_appliance_tooth_number: string[];
  ortho_removable_appliance: boolean;
  ortho_removable_appliance_tooth_number: string[];
  ortho_space_maintainer: boolean;
  ortho_space_maintainer_tooth_number: string[];
  ortho_special_case: boolean;
  ortho_special_case_treatments: SpecialCaseTreatment[];

  pedodontics_pulpotomy: boolean;
  pedodontics_pulpotomy_tooth_number: string[];
  pedodontics_pulpectomy: boolean;
  pedodontics_pulpectomy_tooth_number: string[];
  pedodontics_strip_crown: boolean;
  pedodontics_strip_crown_tooth_number: string[];
  pedodontics_stainless_steel_crown: boolean;
  pedodontics_stainless_steel_crown_tooth_number: string[];
  pedodontics_special_case: boolean;
  pedodontics_special_case_treatments: SpecialCaseTreatment[];

  // Prosthodontics dynamic entries
  prostho_entries?: Array<{
    toothNumber: string;
    service: string;
    otherService?: string;
  }>;
}

export type ProblemListHandleChange = (
  field: keyof ProblemListData,
  value:
    | string
    | boolean
    | string[]
    | SpecialCaseTreatment[]
    | EmergencyTreatmentEntry[]
    | { toothNumber: string; service: string; otherService?: string }[],
) => void;
