import React, { useState } from "react";
import { ProblemListData, ProblemListHandleChange } from "../../../types/problem-list";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui/collapsible";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";

interface Props {
  formData: ProblemListData;
  handleChange: ProblemListHandleChange;
}

const TREATMENT_OPTIONS = [
  "Pulp Sedation",
  "Recementation of Crowns",
  "Temporary Fillings",
  "Management of Acute Infections",
  "Management of Traumatic Injuries",
  "Other",
];

const EmergencyTreatmentSection: React.FC<Props> = ({ formData, handleChange }) => {
  const entries = formData.emergency_treatment_entries || [];
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const toggleItem = (index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleEntryChange = (idx: number, field: string, value: any) => {
    const updated = entries.map((entry, i) => (i === idx ? { ...entry, [field]: value } : entry));
    handleChange("emergency_treatment_entries", updated);
  };

  const addEntry = () => {
    const newIndex = entries.length;
    handleChange("emergency_treatment_entries", [
      ...entries,
      { toothNumber: "", treatment: TREATMENT_OPTIONS[0], otherTreatment: "" },
    ]);
    // Auto-expand the new entry
    setOpenItems((prev) => ({ ...prev, [newIndex]: true }));
  };

  const removeEntry = (idx: number) => {
    const updated = entries.filter((_, i) => i !== idx);
    handleChange("emergency_treatment_entries", updated);
    // Remove from openItems state
    setOpenItems((prev) => {
      const newState = { ...prev };
      delete newState[idx];
      // Adjust indices for remaining items
      const adjustedState: Record<number, boolean> = {};
      Object.entries(newState).forEach(([key, value]) => {
        const oldIndex = parseInt(key);
        if (oldIndex > idx) {
          adjustedState[oldIndex - 1] = value;
        } else if (oldIndex < idx) {
          adjustedState[oldIndex] = value;
        }
      });
      return adjustedState;
    });
  };

  // Tooth options from ProblemList
  const TOOTH_OPTIONS = [
    ...Array.from({ length: 8 }, (_, i) => ({ value: `${11 + i}`, label: `${11 + i}` })),
    ...Array.from({ length: 8 }, (_, i) => ({ value: `${21 + i}`, label: `${21 + i}` })),
    ...Array.from({ length: 8 }, (_, i) => ({ value: `${31 + i}`, label: `${31 + i}` })),
    ...Array.from({ length: 8 }, (_, i) => ({ value: `${41 + i}`, label: `${41 + i}` })),
  ];

  return (
    <div className="border-t pt-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-black-800">Emergency Treatment</h3>
        <Button
          type="button"
          onClick={addEntry}
          size="sm"
          className="bg-green-800 hover:bg-green-700 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Treatment
        </Button>
      </div>

      <div className="space-y-4">
        {entries.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-gray-600 mb-4 text-center">
                No emergency treatments recorded yet.
              </p>
              <Button
                type="button"
                onClick={addEntry}
                className="bg-green-800 hover:bg-green-700 cursor-pointer"
              >
                Add First Treatment
              </Button>
            </CardContent>
          </Card>
        ) : (
          entries.map((entry, idx) => (
            <Card key={idx} className="overflow-hidden">
              <Collapsible open={openItems[idx] ?? false} onOpenChange={() => toggleItem(idx)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-medium flex items-center gap-2">
                        {openItems[idx] ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                        Emergency Treatment #{idx + 1}
                        {entry.toothNumber && (
                          <span className="text-sm font-normal text-gray-600">
                            - Tooth {entry.toothNumber}
                          </span>
                        )}
                        {entry.treatment && (
                          <span className="text-sm font-normal text-gray-600">
                            - {entry.treatment}
                          </span>
                        )}
                      </CardTitle>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeEntry(idx);
                        }}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="pt-0 space-y-4">
                    {/* Tooth Number Selection */}
                    <div className="space-y-2">
                      <Label htmlFor={`tooth-${idx}`}>Tooth Number</Label>
                      <Select
                        value={entry.toothNumber}
                        onValueChange={(value) => handleEntryChange(idx, "toothNumber", value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select tooth number" />
                        </SelectTrigger>
                        <SelectContent>
                          {TOOTH_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Treatment Selection */}
                    <div className="space-y-3">
                      <Label>Emergency Treatment Type</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {TREATMENT_OPTIONS.map((option) => (
                          <label
                            key={option}
                            className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:bg-green-50 has-[:checked]:border-green-200"
                          >
                            <input
                              type="radio"
                              name={`treatment-${idx}`}
                              value={option}
                              checked={entry.treatment === option}
                              onChange={(e) => handleEntryChange(idx, "treatment", e.target.value)}
                              className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                            />
                            <span className="text-sm font-medium">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Other Treatment Input */}
                    {entry.treatment === "Other" && (
                      <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                        <Label htmlFor={`other-treatment-${idx}`}>Specify Other Treatment</Label>
                        <input
                          id={`other-treatment-${idx}`}
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          value={entry.otherTreatment || ""}
                          onChange={(e) => handleEntryChange(idx, "otherTreatment", e.target.value)}
                          placeholder="Enter specific treatment details"
                        />
                      </div>
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default EmergencyTreatmentSection;
