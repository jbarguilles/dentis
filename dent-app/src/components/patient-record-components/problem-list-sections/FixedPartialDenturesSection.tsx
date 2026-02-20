import React from "react";
import { ProblemListData, ProblemListHandleChange } from "../../../types/problem-list";
import OtherTreatmentsUI from "./OtherTreatments";
import CustomMultiSelect from "@/components/ui/CustomMultiSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Props {
  formData: ProblemListData;
  handleChange: ProblemListHandleChange;
  TOOTH_OPTIONS: { value: string; label: string }[];
}

const FixedPartialDenturesSection: React.FC<Props> = ({
  formData,
  handleChange,
  TOOTH_OPTIONS,
}) => (
  <div className="border-t pt-4">
    <h3 className="text-lg font-semibold text-black-800 mb-4">Fixed Partial Dentures</h3>
    <div className="flex flex-col gap-4">
      {[
        { label: "Laminates/Veneers", field: "fpd_laminates_veneers" },
        { label: "Single Crown", field: "fpd_single_crown" },
        { label: "Bridge", field: "fpd_bridge" },
      ].map(({ label, field }) => {
        const toothNumKey = `${field}_tooth_number` as keyof ProblemListData;
        return (
          <div key={field} className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <div className="flex items-center gap-2 pt-1">
                <Checkbox
                  checked={(formData?.[field as keyof ProblemListData] as boolean) || false}
                  onCheckedChange={(checked) =>
                    handleChange(field as keyof ProblemListData, checked)
                  }
                />
                <Label htmlFor={field} className="font-medium">
                  {label}
                </Label>
              </div>
            </div>
            <div className="ml-6">
              <CustomMultiSelect
                options={TOOTH_OPTIONS}
                value={
                  Array.isArray(formData[toothNumKey]) ? (formData[toothNumKey] as string[]) : []
                }
                onChange={(selected) =>
                  formData[field as keyof ProblemListData]
                    ? handleChange(toothNumKey, selected)
                    : null
                }
                placeholder="Select Tooth Number(s)"
                disabled={!formData[field as keyof ProblemListData]}
              />
            </div>
          </div>
        );
      })}
      {/* Special Case Section */}
      <OtherTreatmentsUI
        treatments={formData.fpd_special_case_treatments || []}
        handleTreatmentsChange={(treatments) =>
          handleChange("fpd_special_case_treatments", treatments)
        }
        checkboxFieldState={formData.fpd_special_case}
        handleCheckboxChange={(checked) => handleChange("fpd_special_case", checked)}
        toothOptions={TOOTH_OPTIONS}
        disabled={!formData.fpd_special_case}
      />
    </div>
  </div>
);

export default FixedPartialDenturesSection;
