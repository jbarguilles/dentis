import React from "react";
import CustomMultiSelect from "@/components/ui/CustomMultiSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import OtherTreatmentsUI from "./OtherTreatments";
import { ProblemListData, ProblemListHandleChange } from "../../../types/problem-list";

interface Props {
  formData: ProblemListData;
  handleChange: ProblemListHandleChange;
  TOOTH_OPTIONS: { value: string; label: string }[];
}

const pedoFields = [
  { label: "Pulpotomy", field: "pedo_pulpotomy" },
  { label: "Pulpectomy", field: "pedo_pulpectomy" },
  { label: "Strip Crown", field: "pedo_strip_crown" },
  { label: "Stainless Steel Crown", field: "pedo_ss_crown" },
];

const PedodonticsSection: React.FC<Props> = ({ formData, handleChange, TOOTH_OPTIONS }) => (
  <div className="border-t pt-4">
    <h3 className="text-lg font-semibold text-black mb-4">Pedodontics</h3>
    <div className="flex flex-col gap-4">
      {pedoFields.map(({ label, field }) => {
        const toothNumKey = `${field}_toothnum` as keyof ProblemListData;
        return (
          <div key={field} className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <div className="relative pt-1">
                <Checkbox
                  checked={(formData?.[field as keyof ProblemListData] as boolean) || false}
                  onCheckedChange={(checked) =>
                    handleChange(field as keyof ProblemListData, checked)
                  }
                />
              </div>
              <div className="flex-1">
                <Label className="font-medium mb-1">{label}</Label>
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
          </div>
        );
      })}
      {/* Special Case Section */}
      <OtherTreatmentsUI
        treatments={formData.pedodontics_special_case_treatments || []}
        handleTreatmentsChange={(treatments) =>
          handleChange("pedodontics_special_case_treatments", treatments)
        }
        checkboxFieldState={formData.pedodontics_special_case}
        handleCheckboxChange={(checked) => handleChange("pedodontics_special_case", checked)}
        toothOptions={TOOTH_OPTIONS}
        disabled={!formData.pedodontics_special_case}
      />
    </div>
  </div>
);

export default PedodonticsSection;
