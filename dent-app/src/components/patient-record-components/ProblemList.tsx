"use client";

import React from "react";
import { ProblemListData, ProblemListHandleChange } from "@/types/problem-list";

// Import all section components
import PeriodonticsSection from "./problem-list-sections/PeriodonticsSection";
import OperativeDentistrySection from "./problem-list-sections/OperativeDentistrySection";
import SurgerySection from "./problem-list-sections/SurgerySection";
import PedodonticsSection from "./problem-list-sections/PedodonticsSection";
import OrthodonticsSection from "./problem-list-sections/OrthodonticsSection";
import EmergencyTreatmentSection from "./problem-list-sections/EmergencyTreatmentSection";
import FixedPartialDenturesSection from "./problem-list-sections/FixedPartialDenturesSection";
import EndodonticsSection from "./problem-list-sections/EndodonticsSection";
import ProsthodonticsSection from "./problem-list-sections/ProsthodonticsSection";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface ProblemListProps {
  formData: ProblemListData;
  handleChange: ProblemListHandleChange;
  activeSection?: string;
}

const ProblemList: React.FC<ProblemListProps> = ({
  formData,
  handleChange,
  activeSection = "periodontics",
}) => {
  // Define tooth options used by multiple sections
  const TOOTH_OPTIONS = [
    ...Array.from({ length: 8 }, (_, i) => ({ value: `${11 + i}`, label: `${11 + i}` })),
    ...Array.from({ length: 8 }, (_, i) => ({ value: `${21 + i}`, label: `${21 + i}` })),
    ...Array.from({ length: 8 }, (_, i) => ({ value: `${31 + i}`, label: `${31 + i}` })),
    ...Array.from({ length: 8 }, (_, i) => ({ value: `${41 + i}`, label: `${41 + i}` })),
  ];

  // Render the appropriate section based on activeSection
  const renderSection = () => {
    switch (activeSection) {
      case "periodontics":
        return <PeriodonticsSection formData={formData} handleChange={handleChange} />;
      case "operativeDentistry":
        return (
          <OperativeDentistrySection
            formData={formData}
            handleChange={handleChange}
            TOOTH_OPTIONS={TOOTH_OPTIONS}
          />
        );
      case "surgery":
        return (
          <SurgerySection
            formData={formData}
            handleChange={handleChange}
            TOOTH_OPTIONS={TOOTH_OPTIONS}
          />
        );
      case "pedodontics":
        return (
          <PedodonticsSection
            formData={formData}
            handleChange={handleChange}
            TOOTH_OPTIONS={TOOTH_OPTIONS}
          />
        );
      case "orthodontics":
        return (
          <OrthodonticsSection
            formData={formData}
            handleChange={handleChange}
            TOOTH_OPTIONS={TOOTH_OPTIONS}
          />
        );
      case "emergencyTreatment":
        return <EmergencyTreatmentSection formData={formData} handleChange={handleChange} />;
      case "fixedPartialDentures":
        return (
          <FixedPartialDenturesSection
            formData={formData}
            handleChange={handleChange}
            TOOTH_OPTIONS={TOOTH_OPTIONS}
          />
        );
      case "endodontics":
        return (
          <EndodonticsSection
            formData={formData}
            handleChange={handleChange}
            TOOTH_OPTIONS={TOOTH_OPTIONS}
          />
        );
      case "prosthodontics":
        return <ProsthodonticsSection formData={formData} handleChange={handleChange} />;
      default:
        return <PeriodonticsSection formData={formData} handleChange={handleChange} />;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Problem List</h2>
        <p className="text-gray-600">Identify problems and treatment plans for the patient.</p>
      </div>

      {/* Attending Clinician Field */}
      <div className="mb-6">
        <Label className="block text-sm font-medium text-gray-700 mb-2">Attending Clinician</Label>
        <Input
          type="text"
          value={formData?.attending_clinician || ""}
          onChange={(e) => handleChange("attending_clinician", e.target.value)}
          placeholder="Enter attending clinician name"
        />
      </div>

      {/* Render the active section */}
      {renderSection()}
    </div>
  );
};

export default ProblemList;
