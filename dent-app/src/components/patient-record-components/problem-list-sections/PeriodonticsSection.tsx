import React from "react";
import { ProblemListData, ProblemListHandleChange } from "../../../types/problem-list";
import OtherTreatmentsUI from "./OtherTreatments";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Props {
  formData: ProblemListData;
  handleChange: ProblemListHandleChange;
}

const TOOTH_OPTIONS = [
  ...Array.from({ length: 8 }, (_, i) => ({ value: `${11 + i}`, label: `${11 + i}` })),
  ...Array.from({ length: 8 }, (_, i) => ({ value: `${21 + i}`, label: `${21 + i}` })),
  ...Array.from({ length: 8 }, (_, i) => ({ value: `${31 + i}`, label: `${31 + i}` })),
  ...Array.from({ length: 8 }, (_, i) => ({ value: `${41 + i}`, label: `${41 + i}` })),
];

const PeriodonticsSection: React.FC<Props> = ({ formData, handleChange }) => {
  // Safety check for handleChange
  const safeHandleChange =
    handleChange && typeof handleChange === "function" ? handleChange : () => {};

  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold text-black mb-4">Periodontics</h3>
      <div className="flex items-center space-x-2 mb-4">
        <Checkbox
          id="management-periodontal-disease"
          checked={formData?.management_of_periodontal_disease || false}
          onCheckedChange={(checked) =>
            safeHandleChange("management_of_periodontal_disease", checked)
          }
        />
        <Label htmlFor="management-periodontal-disease" className="font-medium">
          Management of Periodontal Disease
        </Label>
      </div>
      {/* Others Checkbox and Tooth-Treatment UI */}
      <OtherTreatmentsUI
        treatments={formData?.periodontics_special_case_treatments || []}
        handleTreatmentsChange={(treatments) =>
          safeHandleChange("periodontics_special_case_treatments", treatments)
        }
        checkboxFieldState={(formData?.periodontics_special_case as boolean) || false}
        handleCheckboxChange={(checkboxFieldState) =>
          safeHandleChange("periodontics_special_case", checkboxFieldState)
        }
        toothOptions={TOOTH_OPTIONS}
        disabled={!formData?.periodontics_special_case}
      />
    </div>
  );
};

export default PeriodonticsSection;
