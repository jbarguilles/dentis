"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  PatientRecordData,
} from "@/types/patient-record";
import { PatientInterviewData, MedicalHistoryData } from "@/types/patient-interview";
import { DentalChartData, ToothValues } from "@/types/dental-chart";
import { Patient } from "@/hooks/usePatients";

// Import existing components
import PatientInformation from "@/components/patient-record-components/patient-information/PatientInformation";
import PatientInterview from "@/components/patient-record-components/PatientInterview";
import PhysicalAssessment from "@/components/patient-record-components/physical-assessment/PhysicalAssessment";
import SoftTissueExamination from "@/components/patient-record-components/SoftTissueExamination";
import DentalStatusCharting from "@/components/patient-record-components/DentalStatusCharting";
import RadiographicExamination from "@/components/patient-record-components/RadiographicExamination";
import ProblemList from "@/components/patient-record-components/ProblemList";

interface FormSection {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
  subsections?: { key: string; label: string }[];
}

const FORM_SECTIONS: FormSection[] = [
  {
    id: "patient-info",
    title: "Patient Information",
    description: "Basic patient demographics and contact details",
    component: PatientInformation,
  },
  {
    id: "patient-interview",
    title: "Patient Interview",
    description: "Medical history and chief complaints",
    component: PatientInterview,
    subsections: [
      { key: "chiefComplaint", label: "Chief Complaint" },
      { key: "dentalHistory", label: "Dental History" },
      { key: "medicalHistory", label: "Medical History" },
      { key: "socialHistory", label: "Social History" },
    ],
  },
  {
    id: "physical-assessment",
    title: "Physical Assessment",
    description: "Vital signs and general physical examination",
    component: PhysicalAssessment,
  },
  {
    id: "soft-tissue",
    title: "Soft Tissue Examination",
    description: "Oral and facial soft tissue evaluation",
    component: SoftTissueExamination,
  },
  {
    id: "dental-charts",
    title: "Dental Charts",
    description: "Dental status and periodontal charting",
    component: DentalStatusCharting,
  },
  {
    id: "radiographic",
    title: "Radiographic Examination",
    description: "X-ray findings and interpretations",
    component: RadiographicExamination,
  },
  {
    id: "problem-list",
    title: "Problem List",
    description: "Identified problems and treatment plans",
    component: ProblemList,
    subsections: [
      { key: "periodontics", label: "Periodontics" },
      { key: "operativeDentistry", label: "Operative Dentistry" },
      { key: "surgery", label: "Surgery" },
      { key: "pedodontics", label: "Pedodontics" },
      { key: "orthodontics", label: "Orthodontics" },
      { key: "emergencyTreatment", label: "Emergency Treatment" },
      { key: "fixedPartialDentures", label: "Fixed Partial Dentures" },
      { key: "endodontics", label: "Endodontics" },
      { key: "prosthodontics", label: "Prosthodontics" },
    ],
  },
];

function PatientAdmissionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check if this is for an existing patient (patientNumber passed as query param)
  const patientNumber = searchParams.get("patientNumber");
  const isExistingPatient = Boolean(patientNumber);
  
  // Get section and subsection from URL params
  const urlSection = searchParams.get("section");
  const urlSubsection = searchParams.get("subsection");

  // Helper function to initialize tooth values for dental charts
  const initializeTeethValues = (): ToothValues[] =>
    Array(16)
      .fill(null)
      .map(() => ({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        center: 0,
      }));

  // Helper function to initialize dental chart data
  const initializeDentalChartData = (): DentalChartData => ({
    treatmentPlanValuesArrayTop: initializeTeethValues(),
    treatmentPlanValuesArrayBottom: initializeTeethValues(),
    lesionStatusValuesArrayTop: initializeTeethValues(),
    lesionStatusValuesArrayBottom: initializeTeethValues(),
    icdasValuesArrayTop: initializeTeethValues(),
    icdasValuesArrayBottom: initializeTeethValues(),
    existingConditionTop: Array(16)
      .fill(null)
      .map(() => []),
    existingConditionBottom: Array(16)
      .fill(null)
      .map(() => []),
    drawings: {},
    extractedTeeth: {},
  });

  // Section and subsection tracking state
  // - currentSection: tracks which main section is active (0-7)
  // - currentSubsection: tracks which subsection is active within Patient Interview or Problem List
  // - patientInterviewSubsection: remembers the last selected Patient Interview subsection
  // - problemListSubsection: remembers the last selected Problem List subsection
  // These preferences are persisted in URL params and localStorage
  const [currentSection, setCurrentSection] = useState(() => {
    if (urlSection) {
      const sectionIndex = FORM_SECTIONS.findIndex(s => s.id === urlSection);
      return sectionIndex >= 0 ? sectionIndex : 0;
    }
    return 0;
  });
  const [currentSubsection, setCurrentSubsection] = useState(() => {
    return urlSubsection || "chiefComplaint";
  });
  const [patientInterviewSubsection, setPatientInterviewSubsection] = useState(() => {
    if (urlSubsection && urlSection === "patient-interview") {
      return urlSubsection;
    }
    if (typeof window !== "undefined") {
      return localStorage.getItem("patientInterviewSubsection") || "chiefComplaint";
    }
    return "chiefComplaint";
  });
  const [problemListSubsection, setProblemListSubsection] = useState(() => {
    if (urlSubsection && urlSection === "problem-list") {
      return urlSubsection;
    }
    if (typeof window !== "undefined") {
      return localStorage.getItem("problemListSubsection") || "periodontics";
    }
    return "periodontics";
  });

  // Dental Chart State
  const [dentalChartData, setDentalChartData] =
    useState<DentalChartData>(initializeDentalChartData);

  // AS Chart State - Initialize individual values for persistence
  const [treatmentPlanValuesArrayTop, setTreatmentPlanValuesArrayTop] =
    useState<ToothValues[]>(initializeTeethValues);
  const [treatmentPlanValuesArrayBottom, setTreatmentPlanValuesArrayBottom] =
    useState<ToothValues[]>(initializeTeethValues);
  const [lesionStatusValuesArrayTop, setLesionStatusValuesArrayTop] =
    useState<ToothValues[]>(initializeTeethValues);
  const [lesionStatusValuesArrayBottom, setLesionStatusValuesArrayBottom] =
    useState<ToothValues[]>(initializeTeethValues);
  const [icdasValuesArrayTop, setIcdasValuesArrayTop] =
    useState<ToothValues[]>(initializeTeethValues);
  const [icdasValuesArrayBottom, setIcdasValuesArrayBottom] =
    useState<ToothValues[]>(initializeTeethValues);
  const [existingConditionTop, setExistingConditionTop] = useState<string[][]>(
    Array(16)
      .fill(null)
      .map(() => []),
  );
  const [existingConditionBottom, setExistingConditionBottom] = useState<string[][]>(
    Array(16)
      .fill(null)
      .map(() => []),
  );
  const [drawings, setDrawings] = useState<{ [key: string]: string }>({});
  const [extractedTeeth, setExtractedTeeth] = useState<{ [key: string]: boolean }>({});

  const [formData, setFormData] = useState<PatientRecordData>({
    patientInterviewData: {
      chiefComplaintAndHistory: "",
      dentalHistoryData: {
        lastDentalVisit: "",
        dentalVisitFrequency: "",
        lastVisitProcedures: "",
        anesthesiaResponse: "",
        dentalComplications: "",
      },
      medicalHistoryData: {
        // Original fields
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
        // Medical conditions
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
        // Family History
        fh_diabetes: false,
        fh_heart_disease: false,
        fh_bleeding_disorders: false,
        fh_cancer: false,
        fh_others: false,
        fh_others_specify: "",
        // Allergies
        allergies_drugs: false,
        allergies_drugs_specify: "",
        allergies_food: false,
        allergies_food_specify: "",
        allergies_rubber: false,
        allergies_rubber_specify: "",
        allergies_others: false,
        allergies_others_specify: "",
        // Females
        are_you_pregnant_now: "",
        are_you_breastfeeding_now: "",
        under_hormone_replacement_therapy: "",
        menstruation: "",
        females_pregnant_months: 0,
        females_contraceptive: "",
        females_contraceptive_type: "",
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
        tobacco_checked: false,
        alcohol_checked: false,
        drugs_checked: false,
      },
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
    dentalStatusData: {
      teethNotes: "",
      dentalChartData: dentalChartData,
    },
    periodontalChartData: {
      upperTeeth: {
        measurements: {
          bop: [],
          mobility: [],
          cal: [],
          ppd: [],
          cejGm: [],
        },
        buttonStates: {},
      },
      lowerTeeth: {
        measurements: {
          bop: [],
          mobility: [],
          cal: [],
          ppd: [],
          cejGm: [],
        },
        buttonStates: {},
      },
    },
    radiographicData: {
      entries: [],
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
      surgery_extraction: false,
      surgery_extraction_toothnum: [],
      surgery_odontectomy: false,
      surgery_odontectomy_toothnum: [],
      surgery_special_case: false,
      surgery_special_case_treatments: [],
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
      prostho_complete_denture: false,
      prostho_single_denture: false,
      prostho_removable_partial_denture: false,
      prostho_special_case: false,
      prostho_special_case_treatments: [],
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
      prostho_entries: [],
    },
  });

  const currentSectionData = FORM_SECTIONS[currentSection];
  const CurrentComponent = currentSectionData.component;

  // Sync AS Chart individual states with dentalChartData
  useEffect(() => {
    const updatedDentalChartData = {
      treatmentPlanValuesArrayTop,
      treatmentPlanValuesArrayBottom,
      lesionStatusValuesArrayTop,
      lesionStatusValuesArrayBottom,
      icdasValuesArrayTop,
      icdasValuesArrayBottom,
      existingConditionTop,
      existingConditionBottom,
      drawings,
      extractedTeeth,
    };

    setDentalChartData(updatedDentalChartData);

    // Also update form data
    setFormData((prevForm) => ({
      ...prevForm,
      dentalStatusData: {
        ...prevForm.dentalStatusData,
        dentalChartData: updatedDentalChartData,
      },
    }));
  }, [
    treatmentPlanValuesArrayTop,
    treatmentPlanValuesArrayBottom,
    lesionStatusValuesArrayTop,
    lesionStatusValuesArrayBottom,
    icdasValuesArrayTop,
    icdasValuesArrayBottom,
    existingConditionTop,
    existingConditionBottom,
    drawings,
    extractedTeeth,
  ]);

  // Sync state with URL params whenever they change
  useEffect(() => {
    const section = searchParams.get("section");
    const subsection = searchParams.get("subsection");
    
    if (section) {
      const sectionIndex = FORM_SECTIONS.findIndex(s => s.id === section);
      if (sectionIndex >= 0 && sectionIndex !== currentSection) {
        setCurrentSection(sectionIndex);
      }
    }
    
    if (subsection && subsection !== currentSubsection) {
      setCurrentSubsection(subsection);
      
      // Update the appropriate subsection state
      const currentSectionData = FORM_SECTIONS[currentSection];
      if (currentSectionData.id === "patient-interview") {
        setPatientInterviewSubsection(subsection);
      } else if (currentSectionData.id === "problem-list") {
        setProblemListSubsection(subsection);
      }
    }
  }, [searchParams]);
  
  // Set initial URL on mount if not already set
  useEffect(() => {
    const section = searchParams.get("section");
    if (!section) {
      updateURL(currentSection, currentSubsection);
    }
  }, []); // Only run once on mount

  // Restore draft data from session storage when component mounts
  useEffect(() => {
    if (typeof window === "undefined") return;

    const draftData = sessionStorage.getItem("patientAdmissionDraft");
    if (draftData) {
      try {
        const parsedDraftData = JSON.parse(draftData);

        // Only restore if it's for the same patient or if it's a new patient draft
        const isDraftForCurrentPatient = parsedDraftData.patientNumber === patientNumber;
        const isNewPatientDraft = !parsedDraftData.patientNumber && !patientNumber;

        if (isDraftForCurrentPatient || isNewPatientDraft) {
          // Restore form data
          if (parsedDraftData.formData) {
            setFormData(parsedDraftData.formData);
          }

          // Restore dental chart data
          if (parsedDraftData.dentalChartData) {
            const { dentalChartData } = parsedDraftData;
            setTreatmentPlanValuesArrayTop(
              dentalChartData.treatmentPlanValuesArrayTop || initializeTeethValues(),
            );
            setTreatmentPlanValuesArrayBottom(
              dentalChartData.treatmentPlanValuesArrayBottom || initializeTeethValues(),
            );
            setLesionStatusValuesArrayTop(
              dentalChartData.lesionStatusValuesArrayTop || initializeTeethValues(),
            );
            setLesionStatusValuesArrayBottom(
              dentalChartData.lesionStatusValuesArrayBottom || initializeTeethValues(),
            );
            setIcdasValuesArrayTop(dentalChartData.icdasValuesArrayTop || initializeTeethValues());
            setIcdasValuesArrayBottom(
              dentalChartData.icdasValuesArrayBottom || initializeTeethValues(),
            );
            setExistingConditionTop(
              dentalChartData.existingConditionTop ||
                Array(16)
                  .fill(null)
                  .map(() => []),
            );
            setExistingConditionBottom(
              dentalChartData.existingConditionBottom ||
                Array(16)
                  .fill(null)
                  .map(() => []),
            );
            setDrawings(dentalChartData.drawings || {});
            setExtractedTeeth(dentalChartData.extractedTeeth || {});
          }

          // Restore navigation state
          if (parsedDraftData.currentSection !== undefined) {
            setCurrentSection(parsedDraftData.currentSection);
          }
          if (parsedDraftData.currentSubsection) {
            setCurrentSubsection(parsedDraftData.currentSubsection);
          }
          if (parsedDraftData.patientInterviewSubsection) {
            setPatientInterviewSubsection(parsedDraftData.patientInterviewSubsection);
          }
          if (parsedDraftData.problemListSubsection) {
            setProblemListSubsection(parsedDraftData.problemListSubsection);
          }

          console.log("Draft data restored from session storage:", parsedDraftData.timestamp);
        }
      } catch (error) {
        console.warn("Failed to restore draft data from session storage:", error);
        // Clear invalid draft data
        sessionStorage.removeItem("patientAdmissionDraft");
      }
    }
  }, []); // Empty dependency array - only run on mount

  // Helper function to update URL with section and subsection
  const updateURL = (sectionIndex: number, subsection?: string) => {
    const section = FORM_SECTIONS[sectionIndex];
    const params = new URLSearchParams();
    
    if (patientNumber) {
      params.set("patientNumber", patientNumber);
    }
    
    params.set("section", section.id);
    
    // Only add subsection param for sections that have subsections
    if (subsection && (section.id === "patient-interview" || section.id === "problem-list")) {
      params.set("subsection", subsection);
    }
    
    router.replace(`/patient-admission?${params.toString()}`, { scroll: false });
  };

  const handleNext = () => {
    if (currentSection < FORM_SECTIONS.length - 1) {
      const nextSection = currentSection + 1;
      setCurrentSection(nextSection);
      // Update currentSubsection based on the target section
      let nextSubsection = currentSubsection;
      if (FORM_SECTIONS[nextSection].id === "patient-interview") {
        nextSubsection = patientInterviewSubsection;
        setCurrentSubsection(patientInterviewSubsection);
      } else if (FORM_SECTIONS[nextSection].id === "problem-list") {
        nextSubsection = problemListSubsection;
        setCurrentSubsection(problemListSubsection);
      }
      updateURL(nextSection, nextSubsection);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      const previousSection = currentSection - 1;
      setCurrentSection(previousSection);
      // Update currentSubsection based on the target section
      let prevSubsection = currentSubsection;
      if (FORM_SECTIONS[previousSection].id === "patient-interview") {
        prevSubsection = patientInterviewSubsection;
        setCurrentSubsection(patientInterviewSubsection);
      } else if (FORM_SECTIONS[previousSection].id === "problem-list") {
        prevSubsection = problemListSubsection;
        setCurrentSubsection(problemListSubsection);
      }
      updateURL(previousSection, prevSubsection);
    }
  };

  const handleSectionClick = (index: number) => {
    setCurrentSection(index);
    // Update currentSubsection based on the target section
    let subsection = currentSubsection;
    if (FORM_SECTIONS[index].id === "patient-interview") {
      subsection = patientInterviewSubsection;
      setCurrentSubsection(patientInterviewSubsection);
    } else if (FORM_SECTIONS[index].id === "problem-list") {
      subsection = problemListSubsection;
      setCurrentSubsection(problemListSubsection);
    }
    updateURL(index, subsection);
  };

  const handleSubsectionClick = (subsectionKey: string) => {
    const currentSectionData = FORM_SECTIONS[currentSection];

    // Update the appropriate subsection state based on current section
    if (currentSectionData.id === "patient-interview") {
      setPatientInterviewSubsection(subsectionKey);
      setCurrentSubsection(subsectionKey);
      // Persist to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("patientInterviewSubsection", subsectionKey);
      }
    } else if (currentSectionData.id === "problem-list") {
      setProblemListSubsection(subsectionKey);
      setCurrentSubsection(subsectionKey);
      // Persist to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("problemListSubsection", subsectionKey);
      }
    }
    
    // Update URL with new subsection
    updateURL(currentSection, subsectionKey);
  };

  const updateFormData = (sectionId: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [`${sectionId}Data`]: data,
    }));
  };

  // Handle dental chart data updates
  const updateDentalChartData = (updates: Partial<DentalChartData>) => {
    setDentalChartData((prev) => {
      const newData = { ...prev, ...updates };
      // Also update in form data
      setFormData((prevForm) => ({
        ...prevForm,
        dentalStatusData: {
          ...prevForm.dentalStatusData,
          dentalChartData: newData,
        },
      }));
      return newData;
    });
  };

  // Handle change for AS Chart inputs
  const handleASChartChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    console.log("AS Chart form change:", e.target.name, e.target.value);
    // Handle any form inputs within AS Chart if needed
  };

  const handleCompleteAdmission = () => {
    // Handle form submission logic here
    console.log("Form data:", formData);
    // You can add API calls to save the patient data

    // Clear subsection preferences after successful completion
    if (typeof window !== "undefined") {
      localStorage.removeItem("patientInterviewSubsection");
      localStorage.removeItem("problemListSubsection");
    }

    // Clear draft data on successful completion
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("patientAdmissionDraft");
    }

    // Then redirect to patients list or confirmation page
    if (isExistingPatient) {
      sessionStorage.removeItem("currentPatientData");
    }
    router.push("/patients");
  };

  // Function to save current form state as draft to session storage
  const saveFormDataToDraft = () => {
    if (typeof window === "undefined") return;

    const draftData = {
      formData,
      dentalChartData: {
        treatmentPlanValuesArrayTop,
        treatmentPlanValuesArrayBottom,
        lesionStatusValuesArrayTop,
        lesionStatusValuesArrayBottom,
        icdasValuesArrayTop,
        icdasValuesArrayBottom,
        existingConditionTop,
        existingConditionBottom,
        drawings,
        extractedTeeth,
      },
      currentSection,
      currentSubsection,
      patientInterviewSubsection,
      problemListSubsection,
      timestamp: new Date().toISOString(),
      patientNumber: patientNumber || null,
    };

    sessionStorage.setItem("patientAdmissionDraft", JSON.stringify(draftData));
  };

  const handleBackClick = () => {
    // Save current form data as draft before navigating back
    saveFormDataToDraft();

    if (isExistingPatient) {
      sessionStorage.removeItem("currentPatientData");
    }
    // Optionally clear subsection preferences when user cancels
    // if (typeof window !== 'undefined') {
    //   localStorage.removeItem('patientInterviewSubsection');
    //   localStorage.removeItem('problemListSubsection');
    // }
    router.push("/patients");
  };

  return (
    <div className="container mx-auto px-16 py-8 md:py-12 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Button
            onClick={handleBackClick}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 hover:cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Patients
          </Button>
        </div>
        <h1 className="text-4xl font-bold text-[#800000] mb-2 tracking-tight">
          {isExistingPatient ? `Patient Admission - ${patientNumber}` : "New Patient Admission"}
        </h1>
        <p className="text-gray-600">Complete patient assessment and record management</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Section Navigation */}
        <div className="lg:col-span-1">
            <Card className="sticky top-4 border-t-4 border-[#800000] border-r border-b border-l border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-[#800000]">Sections</CardTitle>
                <CardDescription>Navigate between different assessment sections</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {FORM_SECTIONS.map((section, index) => {
                    return (
                      <div key={section.id}>
                        <button
                          onClick={() => handleSectionClick(index)}
                          className={`w-full text-left px-4 py-3 text-sm transition-colors border-l-4 hover:cursor-pointer ${
                            currentSection === index
                              ? "bg-rose-50 border-rose-600 text-rose-900 font-semibold"
                              : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{section.title}</span>
                          </div>
                        </button>

                        {/* Show subsections for Patient Interview and Problem List - always visible */}
                        {(section.id === "patient-interview" || section.id === "problem-list") &&
                          section.subsections && (
                            <div className="ml-4 border-l border-gray-200">
                              {section.subsections.map((subsection) => {
                                const isActive = currentSection === index && currentSubsection === subsection.key;

                                return (
                                  <button
                                    key={subsection.key}
                                    onClick={() => {
                                      // If clicking subsection of a different section, navigate to that section
                                      if (currentSection !== index) {
                                        setCurrentSection(index);
                                        setCurrentSubsection(subsection.key);
                                        
                                        // Update the appropriate subsection state
                                        if (section.id === "patient-interview") {
                                          setPatientInterviewSubsection(subsection.key);
                                          if (typeof window !== "undefined") {
                                            localStorage.setItem("patientInterviewSubsection", subsection.key);
                                          }
                                        } else if (section.id === "problem-list") {
                                          setProblemListSubsection(subsection.key);
                                          if (typeof window !== "undefined") {
                                            localStorage.setItem("problemListSubsection", subsection.key);
                                          }
                                        }
                                        
                                        updateURL(index, subsection.key);
                                      } else {
                                        handleSubsectionClick(subsection.key);
                                      }
                                    }}
                                    className={`w-full text-left px-4 py-2 text-xs transition-colors hover:cursor-pointer ${
                                      isActive
                                        ? "bg-rose-100 text-rose-900 font-semibold"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                    }`}
                                  >
                                    {subsection.label}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                      </div>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="border-t-4 border-[#800000] border-r border-b border-l border-gray-200 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      {currentSectionData.title}
                      {/* Show subsection title for sections with subsections */}
                      {(currentSectionData.id === "patient-interview" ||
                        currentSectionData.id === "problem-list") &&
                        currentSectionData.subsections && (
                          <span className="text-lg text-gray-600 font-normal">
                            {" › "}
                            {
                              currentSectionData.subsections.find(
                                (sub) => sub.key === currentSubsection,
                              )?.label
                            }
                          </span>
                        )}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {currentSectionData.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="text-xs font-medium text-gray-600">
                      {currentSection + 1}/{FORM_SECTIONS.length}
                    </span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#800000] to-[#990000] h-2 rounded-full transition-all"
                        style={{
                          width: `${((currentSection + 1) / FORM_SECTIONS.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="p-8">
                {/* Render Current Section Component */}
                <div className="min-h-[500px]">
                  {currentSectionData.id === "patient-info" && (
                    <CurrentComponent patientNumber={patientNumber} />
                  )}
                  {currentSectionData.id === "patient-interview" && (
                    <CurrentComponent
                      formData={formData.patientInterviewData}
                      onChange={(data: PatientInterviewData) =>
                        updateFormData("patientInterview", data)
                      }
                      activeSection={currentSubsection}
                      setActiveSection={handleSubsectionClick}
                      handleChiefComplaintChange={(content: string) => {
                        updateFormData("patientInterview", {
                          ...formData.patientInterviewData,
                          chiefComplaintAndHistory: content,
                        });
                      }}
                      handleDentalHistoryChange={(
                        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
                      ) => {
                        const { name, value } = e.target;
                        updateFormData("patientInterview", {
                          ...formData.patientInterviewData,
                          dentalHistoryData: {
                            ...formData.patientInterviewData.dentalHistoryData,
                            [name]: value,
                          },
                        });
                      }}
                      handleMedicalHistoryChange={(
                        e: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
                        >,
                      ) => {
                        const { name, value } = e.target;
                        updateFormData("patientInterview", {
                          ...formData.patientInterviewData,
                          medicalHistoryData: {
                            ...formData.patientInterviewData.medicalHistoryData,
                            [name]: value,
                          },
                        });
                      }}
                      handleMedicalHistorySelectChange={(
                        e: React.ChangeEvent<HTMLSelectElement>,
                      ) => {
                        const { name, value } = e.target;
                        updateFormData("patientInterview", {
                          ...formData.patientInterviewData,
                          medicalHistoryData: {
                            ...formData.patientInterviewData.medicalHistoryData,
                            [name]: value,
                          },
                        });
                      }}
                      handleMedicalHistoryCheckboxChange={(
                        fieldName: keyof MedicalHistoryData,
                        value: boolean,
                      ) => {
                        updateFormData("patientInterview", {
                          ...formData.patientInterviewData,
                          medicalHistoryData: {
                            ...formData.patientInterviewData.medicalHistoryData,
                            [fieldName]: value,
                          },
                        });
                      }}
                      handleSocialHistoryChange={(newData: any) => {
                        updateFormData("patientInterview", {
                          ...formData.patientInterviewData,
                          socialHistoryFormData: newData,
                        });
                      }}
                    />
                  )}
                  {currentSectionData.id === "physical-assessment" && (
                    <CurrentComponent
                      patientNumber={patientNumber}
                    />
                  )}
                  {currentSectionData.id === "soft-tissue" && (
                    <CurrentComponent
                      formData={formData.softTissueData}
                      onChange={(data: any) => updateFormData("softTissue", data)}
                    />
                  )}
                  {currentSectionData.id === "dental-charts" && (
                    <CurrentComponent
                      patientNumber={patientNumber}
                      dentalChartData={dentalChartData}
                      onDentalChartUpdate={updateDentalChartData}
                      // AS Chart specific props
                      treatmentPlanValuesArrayTop={treatmentPlanValuesArrayTop}
                      setTreatmentPlanValuesArrayTop={setTreatmentPlanValuesArrayTop}
                      treatmentPlanValuesArrayBottom={treatmentPlanValuesArrayBottom}
                      setTreatmentPlanValuesArrayBottom={setTreatmentPlanValuesArrayBottom}
                      lesionStatusValuesArrayTop={lesionStatusValuesArrayTop}
                      setLesionStatusValuesArrayTop={setLesionStatusValuesArrayTop}
                      lesionStatusValuesArrayBottom={lesionStatusValuesArrayBottom}
                      setLesionStatusValuesArrayBottom={setLesionStatusValuesArrayBottom}
                      icdasValuesArrayTop={icdasValuesArrayTop}
                      setIcdasValuesArrayTop={setIcdasValuesArrayTop}
                      icdasValuesArrayBottom={icdasValuesArrayBottom}
                      setIcdasValuesArrayBottom={setIcdasValuesArrayBottom}
                      existingConditionTop={existingConditionTop}
                      setExistingConditionTop={setExistingConditionTop}
                      existingConditionBottom={existingConditionBottom}
                      setExistingConditionBottom={setExistingConditionBottom}
                      drawings={drawings}
                      setDrawings={setDrawings}
                      extractedTeeth={extractedTeeth}
                      setExtractedTeeth={setExtractedTeeth}
                      handleChange={handleASChartChange}
                    />
                  )}
                  {currentSectionData.id === "radiographic" && (
                    <CurrentComponent
                      formData={formData.radiographicData}
                      handleChange={(field: string, value: any) =>
                        updateFormData("radiographic", {
                          ...formData.radiographicData,
                          [field]: value,
                        })
                      }
                    />
                  )}
                  {(currentSectionData.id === "periodontal-chart" ||
                    currentSectionData.id === "problem-list") &&
                    (currentSectionData.id === "problem-list" ? (
                      <CurrentComponent
                        formData={formData.problemListData}
                        handleChange={(field: any, value: any) =>
                          updateFormData("problemList", {
                            ...formData.problemListData,
                            [field]: value,
                          })
                        }
                        activeSection={currentSubsection}
                      />
                    ) : (
                      <CurrentComponent />
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                onClick={handlePrevious}
                disabled={currentSection === 0}
                variant="outline"
                className="flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </Button>

              <div className="flex gap-2">
                {currentSection === FORM_SECTIONS.length - 1 ? (
                  <Button onClick={handleCompleteAdmission} className="flex items-center gap-2 bg-gradient-to-br from-[#800000] to-[#990000] hover:shadow-lg transition-shadow">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Complete Admission
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="flex items-center gap-2 bg-gradient-to-br from-[#800000] to-[#990000] hover:shadow-lg transition-shadow">
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default PatientAdmissionPage;
