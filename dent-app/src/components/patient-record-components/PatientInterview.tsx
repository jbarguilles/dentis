import React from "react";
import ChiefComplaintSection from "./patient-interview-sections/ChiefComplaintSection";
import MedicalHistorySection, {
  ExtendedMedicalHistoryData,
} from "./patient-interview-sections/MedicalHistorySection";
import DentalHistorySection from "./patient-interview-sections/DentalHistorySection";
import SocialHistorySection from "./patient-interview-sections/SocialHistorySection";
import MedicalHistoryChart from "./patient-interview-sections/MedicalHistoryChart";
import {
  PatientInterviewData,
  SocialHistoryData,
  MedicalHistoryData,
} from "@/types/patient-interview";

interface Props {
  formData: PatientInterviewData;
  handleChiefComplaintChange: (content: string) => void;
  handleDentalHistoryChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleMedicalHistoryChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  handleMedicalHistorySelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleMedicalHistoryCheckboxChange?: (
    fieldName: keyof MedicalHistoryData,
    value: boolean,
  ) => void;
  handleSocialHistoryChange: (newData: SocialHistoryData) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const PatientInterview: React.FC<Props> = ({
  formData,
  handleChiefComplaintChange,
  handleDentalHistoryChange,
  handleMedicalHistoryChange,
  handleMedicalHistorySelectChange,
  handleMedicalHistoryCheckboxChange,
  handleSocialHistoryChange,
  activeSection,
}) => {
  return (
    <div>
      {activeSection === "chiefComplaint" && (
        <ChiefComplaintSection
          value={formData.chiefComplaintAndHistory}
          onChange={handleChiefComplaintChange}
        />
      )}
      {activeSection === "dentalHistory" && (
        <DentalHistorySection
          formData={formData.dentalHistoryData}
          handleChange={handleDentalHistoryChange}
        />
      )}
      {activeSection === "medicalHistory" && (
        <MedicalHistorySection
          formData={formData.medicalHistoryData}
          handleChange={handleMedicalHistoryChange}
          handleSelectChange={handleMedicalHistorySelectChange}
          handleCheckboxChange={handleMedicalHistoryCheckboxChange}
        />
      )}
      {activeSection === "medicalHistoryChart" && (
        <MedicalHistoryChart
          formData={formData.medicalHistoryData}
          handleChange={handleMedicalHistoryChange}
        />
      )}
      {activeSection === "socialHistory" && (
        <SocialHistorySection
          formData={formData.socialHistoryFormData}
          setFormData={handleSocialHistoryChange}
        />
      )}
    </div>
  );
};

export default PatientInterview;
