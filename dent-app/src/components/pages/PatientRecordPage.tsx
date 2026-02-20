"use client";

import React, { useState, Dispatch, SetStateAction } from "react";
import { z } from "zod";
import PatientInformation from "../patient-record-components/patient-information/PatientInformation";
import PatientInterview from "../patient-record-components/PatientInterview";
import PhysicalAssessment from "../patient-record-components/physical-assessment/PhysicalAssessment";
import SoftTissueExamination from "../patient-record-components/SoftTissueExamination";
import DentalStatusCharting from "../patient-record-components/DentalStatusCharting";
import RadiographicExamination from "../patient-record-components/RadiographicExamination";
import ProblemList from "../patient-record-components/ProblemList";
import PeriodontalChart from "../patient-record-components/periodontal-chart/PeriodontalChart";
import { SocialHistoryFormData } from "../patient-record-components/patient-interview-sections/SocialHistorySection";
import { patientInterviewSchema } from "@/types/patient-interview";
import { ProblemListHandleChange } from "../../types/problem-list";
import { ExtendedMedicalHistoryData } from "../patient-record-components/patient-interview-sections/MedicalHistorySection";
import { useRouter, useSearchParams } from "next/navigation";
import { PatientRecordData } from "@/types/patient-record";

// Update the radiographicData schema to include imageData field
const formSchema = z.object({
  patientInterviewData: patientInterviewSchema,

  physicalAssessmentData: z.object({
    gait: z.string(),
    appearance: z.string(),
    defects: z.string(),
    weight: z.number(),
    height: z.number(),
    bloodPressure: z.number(),
    pulseRate: z.number(),
    temperature: z.number(),
    respiratoryRate: z.number(),
  }),

  softTissueData: z.object({
    lips: z.string(),
    gingiva: z.string(),
    tongue: z.string(),
    oralMucosa: z.string(),
  }),

  dentalStatusData: z.object({
    teethNotes: z.string(),
  }),

  periodontalChartData: z.object({
    upperTeeth: z.object({
      measurements: z.object({
        bop: z.array(z.array(z.array(z.string()))),
        mobility: z.array(z.string()),
        cal: z.array(z.array(z.array(z.string()))),
        ppd: z.array(z.array(z.array(z.string()))),
        cejGm: z.array(z.array(z.array(z.string()))),
      }),
      buttonStates: z.record(z.string(), z.boolean()),
    }),
    lowerTeeth: z.object({
      measurements: z.object({
        bop: z.array(z.array(z.array(z.string()))),
        mobility: z.array(z.string()),
        cal: z.array(z.array(z.array(z.string()))),
        ppd: z.array(z.array(z.array(z.string()))),
        cejGm: z.array(z.array(z.array(z.string()))),
      }),
      buttonStates: z.record(z.string(), z.boolean()),
    }),
  }),

  radiographicData: z.object({
    entries: z.array(
      z.object({
        id: z.string(),
        radiographType: z.string(),
        findings: z.string(),
        image: z.instanceof(File).nullable(),
        imageData: z.string().nullable(), // Add this field for base64 image data
        previewUrl: z.string(),
      }),
    ),
  }),

  problemListData: z.object({
    attending_clinician: z.string(),

    management_of_periodontal_disease: z.boolean(),

    od_class_i: z.boolean(),
    od_class_i_toothnum: z.string(),
    od_class_ii: z.boolean(),
    od_class_ii_toothnum: z.string(),
    od_class_iii: z.boolean(),
    od_class_iii_toothnum: z.string(),
    od_class_iv: z.boolean(),
    od_class_iv_toothnum: z.string(),
    od_class_v: z.boolean(),
    od_class_v_toothnum: z.string(),
    od_onlay: z.boolean(),
    od_onlay_toothnum: z.string(),

    et_pulp_sedation: z.boolean(),
    et_recementation_of_crowns: z.boolean(),
    et_temporary_fillings: z.boolean(),
    et_management_of_acute_infections: z.boolean(),
    et_management_of_traumatic_injuries: z.boolean(),

    // Emergency treatment entries (dynamic per tooth)
    emergency_treatment_entries: z.array(
      z.object({
        toothNumber: z.string(),
        treatments: z.array(z.string()),
        otherTreatment: z.string().optional(),
      }),
    ),

    fpd_laminates_veneers: z.boolean(),
    fpd_laminates_veneers_tooth_number: z.string(),
    fpd_single_crown: z.boolean(),
    fpd_single_crown_tooth_number: z.string(),
    fpd_bridge: z.boolean(),
    fpd_bridge_tooth_number: z.string(),

    endodontics_anterior: z.boolean(),
    endodontics_anterior_tooth_number: z.string(),
    endodontics_posterior: z.boolean(),
    endodontics_posterior_tooth_number: z.string(),
    endodontics_others: z.boolean(),
    endodontics_others_tooth_number: z.string(),
    endodontics_others_specify: z.string(),

    // Prosthodontics dynamic entries
    prostho_entries: z.array(
      z.object({
        toothNumber: z.string(),
        service: z.string(),
        otherService: z.string().optional(),
      }),
    ),

    rpd_maxillary: z.boolean(),
    rpd_mandibular: z.boolean(),
    cd_maxillary: z.boolean(),
    cd_mandibular: z.boolean(),

    extraction: z.boolean(),
    extraction_toothnum: z.string(),

    surgery_extraction: z.boolean(),
    surgery_extraction_toothnum: z.string(),
    surgery_odontectomy: z.boolean(),
    surgery_odontectomy_toothnum: z.string(),
    surgery_pedodontics: z.boolean(),
    surgery_pedodontics_toothnum: z.string(),
    surgery_orthodontics: z.boolean(),
    surgery_orthodontics_toothnum: z.string(),

    special_case: z.boolean(),
    special_case_toothnum: z.string(),

    endodontic_treatment: z.boolean(),
    endodontic_treatment_toothnum: z.string(),
    crown_bridge: z.boolean(),
    crown_bridge_toothnum: z.string(),
    orthodontic_treatment: z.boolean(),
    orthodontic_treatment_desc: z.string(),
    periodontal_treatment: z.boolean(),
    periodontal_treatment_desc: z.string(),
    pedodontic_treatment: z.boolean(),
    pedodontic_treatment_desc: z.string(),
    full_mouth_rehabilitation: z.boolean(),
    dental_implants: z.boolean(),
    others: z.boolean(),
    others_desc: z.string(),

    // Additions for complete integration
    prostho_complete_denture: z.boolean(),
    prostho_single_denture: z.boolean(),
    prostho_removable_partial_denture: z.boolean(),
    prostho_special_case: z.boolean(),
    prostho_special_case_treatments: z.array(z.string()),
  }),
});

export function PatientRecordPage() {
  const [formData, setFormData] = useState<PatientRecordData>({
    patientInformationData: {
      firstName: "Juan",
      middleName: "Santos",
      lastName: "Dela Cruz",
      suffix: "Jr",
      sex: "Male",
      civilStatus: "Single",
      birthdate: "1990-01-01",
      age: 33,
      houseStreetSubdivision: "123 Main Street, Green Village",
      barangay: "San Antonio",
      city: "Makati",
      province: "Metro Manila",
      region: "NCR",
      contactNumber: "+63 912 345 6789",
      emergencyContact: "Maria Dela Cruz",
      emergencyNumber: "+63 998 765 4321",
      emergencyRelationship: "Mother",
      patientNumber: "2025-12345",
    },
    dentalStatusData: {
      teethNotes: "",
    },
    softTissueData: {
      patientId: 0,
      date: "",
      headNeckTmj: "",
      lipsFrenum: "",
      mucosa: "",
      palate: "",
      pharynx: "",
      floorMouth: "",
      tongue: "",
      lymphNodes: "",
      salivaryGland: "",
      thyroid: "",
      gingiva: "",
    },
    periodontalChartData: {
      upperTeeth: {
        measurements: {
          bop: Array(16)
            .fill(null)
            .map(() =>
              Array(2)
                .fill(null)
                .map(() => ["", "", ""]),
            ),
          mobility: Array(16).fill(""),
          cal: Array(16)
            .fill(null)
            .map(() =>
              Array(2)
                .fill(null)
                .map(() => ["", "", ""]),
            ),
          ppd: Array(16)
            .fill(null)
            .map(() =>
              Array(2)
                .fill(null)
                .map(() => ["", "", ""]),
            ),
          cejGm: Array(16)
            .fill(null)
            .map(() =>
              Array(2)
                .fill(null)
                .map(() => ["", "", ""]),
            ),
        },
        buttonStates: {}, // Initialize empty button states object
      },
      lowerTeeth: {
        measurements: {
          bop: Array(16)
            .fill(null)
            .map(() =>
              Array(2)
                .fill(null)
                .map(() => ["", "", ""]),
            ),
          mobility: Array(16).fill(""),
          cal: Array(16)
            .fill(null)
            .map(() =>
              Array(2)
                .fill(null)
                .map(() => ["", "", ""]),
            ),
          ppd: Array(16)
            .fill(null)
            .map(() =>
              Array(2)
                .fill(null)
                .map(() => ["", "", ""]),
            ),
          cejGm: Array(16)
            .fill(null)
            .map(() =>
              Array(2)
                .fill(null)
                .map(() => ["", "", ""]),
            ),
        },
        buttonStates: {}, // Initialize empty button states object
      },
    },
    radiographicData: {
      entries: [
        {
          // Initialize with one entry
          id: `radiograph-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          radiographType: "",
          findings: "",
          image: null,
          imageData: null,
          previewUrl: "",
        },
      ],
    },
    physicalAssessmentData: {
      gait: "",
      appearance: "",
      defects: "",
      weight: 0,
      height: 0,
      bloodPressure: "",
      pulseRate: 0,
      temperature: 0,
      respiratoryRate: 0,
    },
    patientInterviewData: {
      chiefComplaintAndHistory: "",
      //Dental History
      dentalHistoryData: {
        lastDentalVisit: "",
        dentalVisitFrequency: "",
        lastVisitProcedures: "",
        anesthesiaResponse: "",
        dentalComplications: "",
      },
      //Medical History
      medicalHistoryData: {
        // Section 1: Medical Conditions
        afternoon_fever: false,
        breathing_problems: false,
        frequent_headaches: false,
        pacemakers_artificial_heart_valves: false,
        angina_pectoris_chest_pain: false,
        chemotherapy: false,
        frequent_high_fever: false,
        pain_in_joints: false,
        anxiety: false,
        chronic_cough: false,
        frequent_hunger: false,
        pain_upon_urination: false,
        arthritis: false,
        denied_permission_to_give_blood: false,
        frequent_thirst: false,
        pallor: false,
        asthma: false,
        depression: false,
        frequent_urination: false,
        pelvic_or_lower_abdominal_discomfort: false,
        bleeding_or_bruising_tendency: false,
        diabetes: false,
        goiter: false,
        sinusitis: false,
        blood_transfusion: false,
        dizziness: false,
        heart_attack: false,
        sudden_weight_loss_or_gain: false,
        blood_or_pus_in_urine: false,
        emphysema: false,
        high_blood_pressure: false,
        swollen_ankles: false,
        bloody_sputum: false,
        fainting_spell_or_loss_of_consciousness: false,
        nervousness: false,
        tremors: false,
        visual_impairment: false,
        others: false,
        s1_others_specify: "",

        // Section 2: Family History
        fh_bleeding_disorders: false,
        fh_cancer: false,
        fh_diabetes: false,
        fh_heart_disease: false,
        fh_others: false,
        fh_others_specify: "",

        // Section 3: Allergies
        allergies_drugs: false,
        allergies_drugs_specify: "",
        allergies_food: false,
        allergies_food_specify: "",
        allergies_rubber: false,
        allergies_rubber_specify: "",
        allergies_others: false,
        allergies_others_specify: "",

        // Section 4: Females (all as strings for radio compatibility)
        are_you_pregnant_now: "",
        females_pregnant_months: 0,
        are_you_breastfeeding_now: "",
        under_hormone_replacement_therapy: "",
        menstruation: "",
        females_contraceptive: "",
        females_contraceptive_type: "",

        // Legacy/other fields
        underPhysicianCare: "",
        physicianName: "",
        physicianPhone: "",
        everHospitalized: "",
        hospitalizationDate: "",
        hospitalizationReason: "",
        allergies: "",
        illnesses: "",
        medications: "",
        childhoodDiseases: "",
        medicalUpdate: "",
      },
      socialHistoryFormData: {
        tobacco_kind: "",
        tobacco_frequency: "",
        tobacco_years_of_use: "",
        tobacco_last_used: "",
        alcohol_kind: "",
        alcohol_frequency: "",
        alcohol_years_of_use: "",
        alcohol_last_used: "",
        drug_kind: "",
        drug_frequency: "",
        drug_years_of_use: "",
        drug_last_used: "",
        // Add these checkbox states
        tobacco_checked: false,
        alcohol_checked: false,
        drugs_checked: false,
      },
    },
    problemListData: {
      attending_clinician: "",

      management_of_periodontal_disease: false,
      periodontics_special_case: false,
      periodontics_special_case_treatments: [],

      od_class_i: false,
      od_class_i_toothnum: [],
      od_class_ii: false,
      od_class_ii_toothnum: [],
      od_class_iii: false,
      od_class_iii_toothnum: [],
      od_class_iv: false,
      od_class_iv_toothnum: [],
      od_class_v: false,
      od_class_v_toothnum: [],
      od_onlay: false,
      od_onlay_toothnum: [],
      od_special_case: false,
      od_special_case_treatments: [],

      // Emergency treatment entries (dynamic per tooth)
      emergency_treatment_entries: [],

      fpd_laminates_veneers: false,
      fpd_laminates_veneers_tooth_number: "",
      fpd_single_crown: false,
      fpd_single_crown_tooth_number: "",
      fpd_bridge: false,
      fpd_bridge_tooth_number: "",
      fpd_special_case: false,
      fpd_special_case_treatments: [],

      endodontics_anterior: false,
      endodontics_anterior_tooth_number: "",
      endodontics_posterior: false,
      endodontics_posterior_tooth_number: "",
      endodontics_special_case: false,
      endodontics_special_case_treatments: [],

      // Prosthodontics dynamic entries
      prostho_entries: [],

      surgery_extraction: false,
      surgery_extraction_toothnum: [],
      surgery_odontectomy: false,
      surgery_odontectomy_toothnum: [],
      surgery_special_case: false,
      surgery_special_case_treatments: [],

      ortho_fixed_appliance: false,
      ortho_fixed_appliance_tooth_number: [],
      ortho_removable_appliance: false,
      ortho_removable_appliance_tooth_number: [],
      ortho_space_maintainer: false,
      ortho_space_maintainer_tooth_number: [],
      ortho_special_case: false,
      ortho_special_case_treatments: [],

      pedodontics_pulpotomy: false,
      pedodontics_pulpotomy_tooth_number: [],
      pedodontics_pulpectomy: false,
      pedodontics_pulpectomy_tooth_number: [],
      pedodontics_strip_crown: false,
      pedodontics_strip_crown_tooth_number: [],
      pedodontics_stainless_steel_crown: false,
      pedodontics_stainless_steel_crown_tooth_number: [],
      pedodontics_special_case: false,
      pedodontics_special_case_treatments: [],

      // Additions for complete integration
      prostho_complete_denture: false,
      prostho_single_denture: false,
      prostho_removable_partial_denture: false,
      prostho_special_case: false,
      prostho_special_case_treatments: [],
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  const [chartType, setChartType] = useState<string>("dental");
  const [arch, setArch] = useState<"upper" | "lower">("upper");
  const [activeInterviewSection, setActiveInterviewSection] = useState("chiefComplaint");

  const [extendedMedicalData, setExtendedMedicalData] = useState<ExtendedMedicalHistoryData>({});

  const steps = {
    1: "Patient Information",
    2: "Patient Interview",
    3: "Physical Assessment",
    4: "Soft Tissue Examination",
    5: "Dental Charts",
    6: "Radiographic Examination",
    7: "Problem List",
  };

  // Dental chart persistent state
  type ToothBox = { top: number; right: number; bottom: number; left: number; center: number };
  type ToothBoxArray = ToothBox[];
  type ConditionArray = string[][];
  type DrawingsMap = { [key: string]: string };

  const [treatmentPlanValuesArrayTop, setTreatmentPlanValuesArrayTop]: [
    ToothBoxArray,
    Dispatch<SetStateAction<ToothBoxArray>>,
  ] = useState(Array(16).fill({ top: 0, right: 0, bottom: 0, left: 0, center: 0 }));
  const [treatmentPlanValuesArrayBottom, setTreatmentPlanValuesArrayBottom]: [
    ToothBoxArray,
    Dispatch<SetStateAction<ToothBoxArray>>,
  ] = useState(Array(16).fill({ top: 0, right: 0, bottom: 0, left: 0, center: 0 }));
  const [lesionStatusValuesArrayTop, setLesionStatusValuesArrayTop]: [
    ToothBoxArray,
    Dispatch<SetStateAction<ToothBoxArray>>,
  ] = useState(Array(16).fill({ top: 0, right: 0, bottom: 0, left: 0, center: 0 }));
  const [lesionStatusValuesArrayBottom, setLesionStatusValuesArrayBottom]: [
    ToothBoxArray,
    Dispatch<SetStateAction<ToothBoxArray>>,
  ] = useState(Array(16).fill({ top: 0, right: 0, bottom: 0, left: 0, center: 0 }));
  const [icdasValuesArrayTop, setIcdasValuesArrayTop]: [
    ToothBoxArray,
    Dispatch<SetStateAction<ToothBoxArray>>,
  ] = useState(Array(16).fill({ top: 0, right: 0, bottom: 0, left: 0, center: 0 }));
  const [icdasValuesArrayBottom, setIcdasValuesArrayBottom]: [
    ToothBoxArray,
    Dispatch<SetStateAction<ToothBoxArray>>,
  ] = useState(Array(16).fill({ top: 0, right: 0, bottom: 0, left: 0, center: 0 }));
  const [existingConditionTop, setExistingConditionTop]: [
    ConditionArray,
    Dispatch<SetStateAction<ConditionArray>>,
  ] = useState(Array(16).fill([]));
  const [existingConditionBottom, setExistingConditionBottom]: [
    ConditionArray,
    Dispatch<SetStateAction<ConditionArray>>,
  ] = useState(Array(16).fill([]));
  const [drawings, setDrawings]: [DrawingsMap, Dispatch<SetStateAction<DrawingsMap>>] = useState(
    {},
  );
  const [extractedTeeth, setExtractedTeeth] = useState<{ [key: string]: boolean }>({});

  // Patient Interview section handlers
  const handleChiefComplaintChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      patientInterviewData: {
        ...prev.patientInterviewData,
        chiefComplaintAndHistory: content,
      },
    }));
  };

  const handleDentalHistoryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      patientInterviewData: {
        ...prev.patientInterviewData,
        dentalHistoryData: {
          ...prev.patientInterviewData.dentalHistoryData,
          [name]: value,
        },
      },
    }));
  };

  const handleMedicalHistoryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, type, value } = e.target;
    // Type guard to check if the target is an HTMLInputElement (which has 'checked' property)
    const checked = e.target instanceof HTMLInputElement ? e.target.checked : undefined;

    // Special logic for pregnancy radio: reset months to 0 if "no" is selected
    if (name === "are_you_pregnant_now" && value === "no") {
      setFormData((prev) => ({
        ...prev,
        patientInterviewData: {
          ...prev.patientInterviewData,
          medicalHistoryData: {
            ...prev.patientInterviewData.medicalHistoryData,
            [name]: value,
            females_pregnant_months: 0,
          },
        },
      }));
      return;
    }
    // Always store females_pregnant_months as a number and clamp between 0 and 9
    if (name === "females_pregnant_months") {
      const numVal = Math.max(0, Math.min(9, Number(value)));
      setFormData((prev) => ({
        ...prev,
        patientInterviewData: {
          ...prev.patientInterviewData,
          medicalHistoryData: {
            ...prev.patientInterviewData.medicalHistoryData,
            [name]: numVal,
          },
        },
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      patientInterviewData: {
        ...prev.patientInterviewData,
        medicalHistoryData: {
          ...prev.patientInterviewData.medicalHistoryData,
          [name]: type === "checkbox" ? checked : value,
        },
      },
    }));
  };

  const handleMedicalHistorySelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    // First update the select field value
    handleMedicalHistoryChange(e);
    // Then clear related fields if the value is 'no'
    if (name === "underPhysicianCare" && value === "no") {
      setFormData((prev) => ({
        ...prev,
        patientInterviewData: {
          ...prev.patientInterviewData,
          medicalHistoryData: {
            ...prev.patientInterviewData.medicalHistoryData,
            physicianName: "",
            physicianPhone: "",
          },
        },
      }));
    }
    if (name === "everHospitalized" && value === "no") {
      setFormData((prev) => ({
        ...prev,
        patientInterviewData: {
          ...prev.patientInterviewData,
          medicalHistoryData: {
            ...prev.patientInterviewData.medicalHistoryData,
            hospitalizationDate: "",
            hospitalizationReason: "",
          },
        },
      }));
    }
  };

  const handleSocialHistoryChange = (newSocialHistoryData: SocialHistoryFormData) => {
    setFormData((prev) => ({
      ...prev,
      patientInterviewData: {
        ...prev.patientInterviewData,
        socialHistoryFormData: newSocialHistoryData,
      },
    }));
  };

  const handlePhysicalAssessmentChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
    }));
  };

  const handleSoftTissueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      softTissueData: {
        ...prev.softTissueData,
        [name]: value,
      },
    }));
  };

  const handleDentalStatusChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      dentalStatusData: {
        ...prev.dentalStatusData,
        [name]: value,
      },
    }));
  };

  const handleRadiographicChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      radiographicData: {
        ...prev.radiographicData,
        [field]: value,
      },
    }));
  };

  const handleProblemListChange: ProblemListHandleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      problemListData: {
        ...prev.problemListData,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Combine the form data and extended medical data for submission
    const completeFormData = {
      ...formData,
      extendedMedicalHistory: extendedMedicalData,
    };

    try {
      formSchema.parse(completeFormData);
      console.log("Form submitted:", completeFormData);
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      // Set the next step
      setCurrentStep(currentStep + 1);

      // Scroll to the top of the page smoothly
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        // Pass a callback to update formData.patientInformationData when a new patient is fetched
        return <PatientInformation />;
      case 2:
        return (
          <PatientInterview
            formData={formData.patientInterviewData}
            handleChiefComplaintChange={handleChiefComplaintChange}
            handleDentalHistoryChange={handleDentalHistoryChange}
            handleMedicalHistoryChange={handleMedicalHistoryChange}
            handleMedicalHistorySelectChange={handleMedicalHistorySelectChange}
            handleSocialHistoryChange={handleSocialHistoryChange}
            activeSection={activeInterviewSection}
            setActiveSection={setActiveInterviewSection}
          />
        );
      case 3:
        return (
          <PhysicalAssessment
            patientNumber="0"
            handleChange={handlePhysicalAssessmentChange}
          />
        );
      case 4:
        return (
          <SoftTissueExamination
            formData={formData.softTissueData}
            handleChange={handleSoftTissueChange}
          />
        );
      case 5:
        return (
          <div className="flex flex-col gap-1">
            {" "}
            {/* overflow-x-auto */}
            <div className="mb-4 flex items-center gap-2">
              <label htmlFor="chartType" className="font-medium whitespace-nowrap">
                Select Chart:{" "}
              </label>
              <select
                id="chartType"
                name="chartType"
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="dental">Dental Status Chart</option>
                <option value="periodontal">Periodontal Chart</option>
                {/* Add more chart options here as needed */}
              </select>
              {chartType === "periodontal" && (
                <div className="flex gap-2 ml-2">
                  <button
                    className={`px-3 py-1 rounded ${arch === "upper" ? "bg-green-800 text-white" : "bg-gray-200 text-green-800"} hover:cursor-pointer`}
                    onClick={() => setArch("upper")}
                    type="button"
                  >
                    Upper
                  </button>
                  <button
                    className={`px-3 py-1 rounded ${arch === "lower" ? "bg-green-800 text-white" : "bg-gray-200 text-green-800"} hover:cursor-pointer`}
                    onClick={() => setArch("lower")}
                    type="button"
                  >
                    Lower
                  </button>
                </div>
              )}
            </div>
            <div className="flex">
              {chartType === "dental" ? (
                <DentalStatusCharting
                  // formData={formData.dentalStatusData}
                  // handleChange={handleDentalStatusChange}
                  // treatmentPlanValuesArrayTop={treatmentPlanValuesArrayTop}
                  // setTreatmentPlanValuesArrayTop={setTreatmentPlanValuesArrayTop}
                  // treatmentPlanValuesArrayBottom={treatmentPlanValuesArrayBottom}
                  // setTreatmentPlanValuesArrayBottom={setTreatmentPlanValuesArrayBottom}
                  // lesionStatusValuesArrayTop={lesionStatusValuesArrayTop}
                  // setLesionStatusValuesArrayTop={setLesionStatusValuesArrayTop}
                  // lesionStatusValuesArrayBottom={lesionStatusValuesArrayBottom}
                  // setLesionStatusValuesArrayBottom={setLesionStatusValuesArrayBottom}
                  // icdasValuesArrayTop={icdasValuesArrayTop}
                  // setIcdasValuesArrayTop={setIcdasValuesArrayTop}
                  // icdasValuesArrayBottom={icdasValuesArrayBottom}
                  // setIcdasValuesArrayBottom={setIcdasValuesArrayBottom}
                  // existingConditionTop={existingConditionTop}
                  // setExistingConditionTop={setExistingConditionTop}
                  // existingConditionBottom={existingConditionBottom}
                  // setExistingConditionBottom={setExistingConditionBottom}
                  // drawings={drawings}
                  // setDrawings={setDrawings}
                  // extractedTeeth={extractedTeeth}
                  // setExtractedTeeth={setExtractedTeeth}
                />
              ) : chartType === "periodontal" ? (
                <PeriodontalChart />
              ) : (
                <div className="border p-4 rounded bg-gray-50 text-center">
                  Chart not available.
                </div>
              )}
            </div>
          </div>
        );
      case 6:
        return (
          <RadiographicExamination
            formData={formData.radiographicData}
            handleChange={handleRadiographicChange}
          />
        );
      case 7:
        return (
          <ProblemList formData={formData.problemListData} handleChange={handleProblemListChange} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center min-h-screen py-10">
      {/* adding w-[80%] here fixes the width and breaks the layout */}
      <div className="bg-white p-6 rounded-lg shadow-2xl">
        {/* Header with Patient Record title and patient number on the same line */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-red-900">Patient Record</h1>
          {searchParams.get("patientNumber") && (
            <div className="px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-sm font-medium text-green-800 mr-2">Patient Number:</span>
              <span className="text-lg font-semibold text-green-900">
                {searchParams.get("patientNumber")}
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {Object.entries(steps).map(([step, label]) => (
              <button
                key={step}
                onClick={() => setCurrentStep(Number(step))}
                className={`flex-1 px-4 py-2 rounded cursor-pointer ${
                  currentStep === Number(step)
                    ? "bg-red-900 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-red-900 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {renderStep()}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={prevStep}
              className={`px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 cursor-pointer ${
                currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentStep === 1}
            >
              Previous
            </button>

            {currentStep === totalSteps ? (
              <button
                type="submit"
                className="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 cursor-pointer"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 cursor-pointer"
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PatientRecordPage;
