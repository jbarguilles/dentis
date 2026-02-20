import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X } from "lucide-react";

export interface OtherTreatmentsUIProps {
  treatments: { tooth: string; treatment: string }[];
  checkboxFieldState: boolean;
  handleTreatmentsChange: (treatments: { tooth: string; treatment: string }[]) => void;
  handleCheckboxChange: (checkboxFieldState: boolean) => void;
  toothOptions: { value: string; label: string }[];
  disabled: boolean;
}

/**
 * Reusable UI component for adding/removing "other" treatments for a tooth.
 * Used in Operative Dentistry, Special Cases, etc.
 */
const OtherTreatmentsUI: React.FC<OtherTreatmentsUIProps> = ({
  treatments,
  handleTreatmentsChange,
  handleCheckboxChange,
  toothOptions,
  disabled,
  ...props
}) => {
  const [selectedTooth, setSelectedTooth] = React.useState("");
  const [treatmentText, setTreatmentText] = React.useState("");
  const handleAdd = () => {
    if (!selectedTooth || !treatmentText || !props.checkboxFieldState) return;
    handleTreatmentsChange([
      ...(treatments || []),
      { tooth: selectedTooth, treatment: treatmentText },
    ]);
    setSelectedTooth("");
    setTreatmentText("");
  };
  const handleRemove = (idx: number) => {
    if (!props.checkboxFieldState) return;
    handleTreatmentsChange((treatments || []).filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="flex items-center space-x-2 pt-1">
          <Checkbox
            id="special-case-checkbox"
            checked={props.checkboxFieldState}
            onCheckedChange={(checked) => {
              handleCheckboxChange(checked as boolean);
              // Reset input field values when checkbox is unchecked
              if (!checked) {
                setSelectedTooth("");
                setTreatmentText("");
              }
            }}
          />
          <Label htmlFor="special-case-checkbox" className="font-medium">
            Others/ Special Case
          </Label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[150px_1fr_auto] md:gap-y-4 items-end mb-4">
        <div className="space-y-2">
          <Label htmlFor="tooth-select" className="text-sm font-medium text-gray-700">
            Tooth Number
          </Label>
          <Select
            value={selectedTooth}
            onValueChange={setSelectedTooth}
            disabled={disabled || !props.checkboxFieldState}
          >
            <SelectTrigger
              id="tooth-select"
              className="h-10 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            >
              <SelectValue placeholder="Select tooth..." />
            </SelectTrigger>
            <SelectContent>
              {toothOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  Tooth {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="treatment-input" className="text-sm font-medium text-gray-700">
            Treatment Description
          </Label>
          <Input
            id="treatment-input"
            type="text"
            placeholder="Enter treatment description..."
            value={treatmentText}
            onChange={(e) => setTreatmentText(e.target.value)}
            disabled={disabled || !props.checkboxFieldState}
            className="h-10 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            onKeyDown={(e) => {
              if (e.key === "Enter" && selectedTooth && treatmentText && props.checkboxFieldState) {
                e.preventDefault();
                handleAdd();
              }
            }}
          />
        </div>

        <Button
          type="button"
          onClick={handleAdd}
          disabled={!props.checkboxFieldState || !selectedTooth || !treatmentText}
          className="bg-green-600 hover: cursor-pointer bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed h-10 px-4 transition-all duration-200"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Treatment
        </Button>
      </div>

      {treatments && treatments.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Added Treatments:</Label>
          {treatments.map((item, idx) => (
            <Card key={idx} className="bg-gray-50">
              <CardContent className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-green-700">Tooth {item.tooth}</span>
                  <span className="text-gray-700">{item.treatment}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(idx)}
                  disabled={disabled || !props.checkboxFieldState}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OtherTreatmentsUI;
