import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { MedicalHistoryData } from "@/types/patient-interview";

interface MedicalHistoryProps {
  formData: MedicalHistoryData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleCheckboxChange?: (fieldName: keyof MedicalHistoryData, value: boolean) => void;
}

// Define additional props needed for the extended medical history form
export interface ExtendedMedicalHistoryData {
  [key: string]: string | boolean;
}

const MedicalHistorySection: React.FC<MedicalHistoryProps> = ({
  formData,
  handleChange,
  handleSelectChange,
  handleCheckboxChange,
}) => {
  // Early return if formData is not provided
  if (!formData) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">Loading medical history data...</p>
        </CardContent>
      </Card>
    );
  }

  // Handle select changes with proper typing
  const handleSelectChangeWrapper = (field: string) => (value: string) => {
    const event = {
      target: { name: field, value },
    } as React.ChangeEvent<HTMLSelectElement>;
    handleSelectChange(event);
  };

  // Handle input changes
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number = e.target.value;

    // Special validation for pregnancy months
    if (field === "females_pregnant_months") {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        // Clamp the value between 1 and 9
        value = Math.min(Math.max(numValue, 1), 9);
      } else if (value === "") {
        value = "";
      } else {
        return; // Don't update if it's not a valid number
      }
    } else {
      value = e.target.type === "number" ? Number(value) : value;
    }

    const event = {
      target: {
        name: field,
        value: value,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(event);
  };

  // Handle checkbox changes for medical conditions
  const handleMedicalConditionChange = (fieldName: keyof MedicalHistoryData) => {
    if (handleCheckboxChange) {
      handleCheckboxChange(fieldName, !formData?.[fieldName]);
    }
  };

  // Handle "Check All" for medical conditions
  const handleCheckAllMedicalConditions = () => {
    if (handleCheckboxChange) {
      sortedMedicalConditions.forEach(([, fieldName]) => {
        handleCheckboxChange(fieldName, true);
      });
    }
  };

  // Handle "Uncheck All" for medical conditions
  const handleUncheckAllMedicalConditions = () => {
    if (handleCheckboxChange) {
      sortedMedicalConditions.forEach(([, fieldName]) => {
        handleCheckboxChange(fieldName, false);
      });
    }
  };

  // Section 1: Medical conditions
  const medicalConditionLabelKeyMap: Record<string, keyof MedicalHistoryData> = {
    "Afternoon fever": "afternoon_fever",
    "Breathing problems": "breathing_problems",
    "Frequent headaches": "frequent_headaches",
    "Angina pectoris, chest pain": "angina_pectoris_chest_pain",
    Chemotherapy: "chemotherapy",
    "Frequent high fever": "frequent_high_fever",
    Anxiety: "anxiety",
    "Chronic cough": "chronic_cough",
    "Frequent hunger": "frequent_hunger",
    Arthritis: "arthritis",
    "Denied permission to give blood": "denied_permission_to_give_blood",
    "Frequent thirst": "frequent_thirst",
    Asthma: "asthma",
    Depression: "depression",
    "Frequent urination": "frequent_urination",
    "Bleeding or bruising tendency": "bleeding_or_bruising_tendency",
    Diabetes: "diabetes",
    Goiter: "goiter",
    "Blood transfusion": "blood_transfusion",
    Dizziness: "dizziness",
    "Heart attack": "heart_attack",
    "Blood or pus in urine": "blood_or_pus_in_urine",
    Emphysema: "emphysema",
    "High blood pressure": "high_blood_pressure",
    "Bloody sputum": "bloody_sputum",
    "Fainting spell or loss of consciousness": "fainting_spell_or_loss_of_consciousness",
    Nervousness: "nervousness",
    "Pacemakers, artificial heart valves": "pacemakers_artificial_heart_valves",
    "Pain in joints": "pain_in_joints",
    "Pain upon urination": "pain_upon_urination",
    Pallor: "pallor",
    "Pelvic or lower abdominal discomfort": "pelvic_or_lower_abdominal_discomfort",
    Sinusitis: "sinusitis",
    "Sudden weight loss or gain": "sudden_weight_loss_or_gain",
    "Swollen ankles": "swollen_ankles",
    Tremors: "tremors",
    "Visual impairment": "visual_impairment",
    Others: "others",
  };

  // Sort medical conditions alphabetically, but keep "Others" at the end
  const sortedMedicalConditions = Object.entries(medicalConditionLabelKeyMap)
    .filter(([label]) => label !== "Others")
    .sort(([a], [b]) => a.localeCompare(b))
    .concat([["Others", "others" as keyof MedicalHistoryData]]);

  // Split into 3 columns for top-to-bottom arrangement
  const itemsPerColumn = Math.ceil(sortedMedicalConditions.length / 3);
  const medicalConditionsColumns = [
    sortedMedicalConditions.slice(0, itemsPerColumn),
    sortedMedicalConditions.slice(itemsPerColumn, itemsPerColumn * 2),
    sortedMedicalConditions.slice(itemsPerColumn * 2),
  ];

  // Check if all medical conditions are selected
  const areAllMedicalConditionsChecked = sortedMedicalConditions.every(
    ([, fieldName]) => formData?.[fieldName] === true,
  );

  // Section 2: Family History
  const familyHistoryLabelKeyMap: Record<string, keyof MedicalHistoryData> = {
    "Bleeding disorders": "fh_bleeding_disorders",
    Diabetes: "fh_diabetes",
    "Heart Disease": "fh_heart_disease",
    Cancer: "fh_cancer",
    Others: "fh_others",
  };

  // Section 3: Allergies
  const allergiesLabelKeyMap: Record<string, keyof MedicalHistoryData> = {
    Drugs: "allergies_drugs",
    Food: "allergies_food",
    "Rubber/Latex": "allergies_rubber",
    Others: "allergies_others",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <h2 className="text-xl font-bold text-foreground">Medical History</h2>
      </div>

      <div className="space-y-6">
        {/* Basic Medical Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Medical Information</h3>
          <div className="space-y-6">
            {/* Physician Care Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="underPhysicianCare" className="text-sm font-medium">
                  Under Physician's Care?
                </Label>
                <Select
                  value={formData.underPhysicianCare}
                  onValueChange={handleSelectChangeWrapper("underPhysicianCare")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="physicianName" className="text-sm font-medium">
                  Physician's Name
                </Label>
                <Input
                  id="physicianName"
                  value={formData.physicianName}
                  onChange={handleInputChange("physicianName")}
                  disabled={formData.underPhysicianCare !== "yes"}
                  placeholder={
                    formData.underPhysicianCare !== "yes" ? "N/A" : "Enter physician name"
                  }
                  className={formData.underPhysicianCare !== "yes" ? "bg-muted" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="physicianPhone" className="text-sm font-medium">
                  Physician's Phone
                </Label>
                <Input
                  id="physicianPhone"
                  type="tel"
                  value={formData.physicianPhone}
                  onChange={handleInputChange("physicianPhone")}
                  disabled={formData.underPhysicianCare !== "yes"}
                  placeholder={formData.underPhysicianCare !== "yes" ? "N/A" : "Enter phone number"}
                  className={formData.underPhysicianCare !== "yes" ? "bg-muted" : ""}
                />
              </div>
            </div>

            {/* Hospitalization Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="everHospitalized" className="text-sm font-medium">
                  Ever Hospitalized?
                </Label>
                <Select
                  value={formData.everHospitalized}
                  onValueChange={handleSelectChangeWrapper("everHospitalized")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospitalizationDate" className="text-sm font-medium">
                  When?
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full h-10 pl-3 text-left font-normal ${
                        (!formData.hospitalizationDate || formData.everHospitalized !== "yes") &&
                        "text-muted-foreground"
                      } ${formData.everHospitalized !== "yes" ? "bg-muted" : ""}`}
                      disabled={formData.everHospitalized !== "yes"}
                    >
                      {formData.hospitalizationDate && formData.everHospitalized === "yes" ? (
                        format(new Date(formData.hospitalizationDate), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        formData.hospitalizationDate
                          ? new Date(formData.hospitalizationDate)
                          : undefined
                      }
                      defaultMonth={
                        formData.hospitalizationDate
                          ? new Date(formData.hospitalizationDate)
                          : undefined
                      }
                      onSelect={(date) => {
                        const event = {
                          target: {
                            name: "hospitalizationDate",
                            value: date ? format(date, "yyyy-MM-dd") : "",
                          },
                        } as React.ChangeEvent<HTMLInputElement>;
                        handleChange(event);
                      }}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      captionLayout="dropdown"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="hospitalizationReason" className="text-sm font-medium">
                  Hospitalized for what?
                </Label>
                <Input
                  id="hospitalizationReason"
                  value={formData.hospitalizationReason}
                  onChange={handleInputChange("hospitalizationReason")}
                  disabled={formData.everHospitalized !== "yes"}
                  placeholder={
                    formData.everHospitalized !== "yes" ? "N/A" : "Enter reason for hospitalization"
                  }
                  className={formData.everHospitalized !== "yes" ? "bg-muted" : ""}
                />
              </div>
            </div>

            {/* Medical Information Section */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="allergies" className="text-sm font-medium">
                  Known Allergies
                </Label>
                <Input
                  id="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange("allergies")}
                  placeholder="List any known allergies"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="illnesses" className="text-sm font-medium">
                  Current Illnesses
                </Label>
                <Input
                  id="illnesses"
                  value={formData.illnesses}
                  onChange={handleInputChange("illnesses")}
                  placeholder="List any current illnesses"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medications" className="text-sm font-medium">
                  Current Medications
                </Label>
                <Input
                  id="medications"
                  value={formData.medications}
                  onChange={handleInputChange("medications")}
                  placeholder="List any current medications"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="childhoodDiseases" className="text-sm font-medium">
                  Childhood Disease History
                </Label>
                <Input
                  id="childhoodDiseases"
                  value={formData.childhoodDiseases}
                  onChange={handleInputChange("childhoodDiseases")}
                  placeholder="List any childhood diseases"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medicalUpdate" className="text-sm font-medium">
                  Medical Update
                </Label>
                <Input
                  id="medicalUpdate"
                  value={formData.medicalUpdate}
                  onChange={handleInputChange("medicalUpdate")}
                  placeholder="Any recent medical updates"
                />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Medical Conditions Checklist */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Medical Conditions</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {medicalConditionsColumns.map((column, columnIndex) => (
                <div key={columnIndex} className="space-y-3">
                  {column.map(([label, fieldName]) => (
                    <div key={fieldName} className="flex items-center space-x-2">
                      <Checkbox
                        id={fieldName}
                        checked={!!formData[fieldName]}
                        onCheckedChange={() => handleMedicalConditionChange(fieldName)}
                      />
                      <Label htmlFor={fieldName} className="text-sm cursor-pointer leading-tight">
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {formData.others && (
              <div className="mt-4 space-y-2">
                <Label htmlFor="s1_others_specify" className="text-sm font-medium">
                  Please specify other conditions:
                </Label>
                <Input
                  id="s1_others_specify"
                  value={formData.s1_others_specify || ""}
                  onChange={handleInputChange("s1_others_specify")}
                  placeholder="Specify other medical conditions"
                />
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Family History */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Family History</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(familyHistoryLabelKeyMap).map(([label, fieldName]) => (
                <div key={fieldName} className="flex items-center space-x-2">
                  <Checkbox
                    id={fieldName}
                    checked={!!formData[fieldName]}
                    onCheckedChange={() => handleMedicalConditionChange(fieldName)}
                  />
                  <Label htmlFor={fieldName} className="text-sm cursor-pointer">
                    {label}
                  </Label>
                </div>
              ))}
            </div>

            {formData.fh_others && (
              <div className="mt-4 space-y-2">
                <Label htmlFor="fh_others_specify" className="text-sm font-medium">
                  Please specify other family history:
                </Label>
                <Input
                  id="fh_others_specify"
                  value={formData.fh_others_specify || ""}
                  onChange={handleInputChange("fh_others_specify")}
                  placeholder="Specify other family medical history"
                />
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Allergies Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Specific Allergies</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(allergiesLabelKeyMap).map(([label, fieldName]) => (
                <div key={fieldName} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={fieldName}
                      checked={!!formData[fieldName]}
                      onCheckedChange={() => handleMedicalConditionChange(fieldName)}
                    />
                    <Label htmlFor={fieldName} className="text-sm font-medium cursor-pointer">
                      {label}
                    </Label>
                  </div>
                  <Input
                    value={
                      (formData[`${fieldName}_specify` as keyof MedicalHistoryData] as string) || ""
                    }
                    onChange={handleInputChange(`${fieldName}_specify`)}
                    placeholder={`Specify ${label.toLowerCase()} allergies`}
                    disabled={!formData[fieldName]}
                    className={`ml-6 ${!formData[fieldName] ? "bg-muted text-muted-foreground" : ""}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        {/* Females Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">For Female Patients</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pregnancy Row */}
              <div className="space-y-2">
                <Label htmlFor="are_you_pregnant_now" className="text-sm font-medium">
                  Are you pregnant now?
                </Label>
                <Select
                  value={formData.are_you_pregnant_now}
                  onValueChange={handleSelectChangeWrapper("are_you_pregnant_now")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="not_applicable">Not Applicable</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="females_pregnant_months" className="text-sm font-medium">
                  How many months pregnant?
                </Label>
                <Input
                  id="females_pregnant_months"
                  type="number"
                  min="1"
                  max="9"
                  value={formData.females_pregnant_months || ""}
                  onChange={handleInputChange("females_pregnant_months")}
                  onBlur={(e) => {
                    const value = Number(e.target.value);
                    if (!isNaN(value) && value !== 0) {
                      const clampedValue = Math.min(Math.max(value, 1), 9);
                      if (value !== clampedValue) {
                        e.target.value = clampedValue.toString();
                        handleInputChange("females_pregnant_months")(e);
                      }
                    }
                  }}
                  disabled={formData.are_you_pregnant_now !== "yes"}
                  placeholder={
                    formData.are_you_pregnant_now !== "yes" ? "N/A" : "Enter number of months (1-9)"
                  }
                  className={
                    formData.are_you_pregnant_now !== "yes" ? "bg-muted text-muted-foreground" : ""
                  }
                />
              </div>

              {/* Contraceptive Row */}
              <div className="space-y-2">
                <Label htmlFor="females_contraceptive" className="text-sm font-medium">
                  Using contraceptives?
                </Label>
                <Select
                  value={formData.females_contraceptive}
                  onValueChange={handleSelectChangeWrapper("females_contraceptive")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="not_applicable">Not Applicable</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="females_contraceptive_type" className="text-sm font-medium">
                  Type of contraceptive
                </Label>
                <Input
                  id="females_contraceptive_type"
                  value={formData.females_contraceptive_type || ""}
                  onChange={handleInputChange("females_contraceptive_type")}
                  disabled={formData.females_contraceptive !== "yes"}
                  placeholder={
                    formData.females_contraceptive !== "yes"
                      ? "N/A"
                      : "Specify type of contraceptive"
                  }
                  className={
                    formData.females_contraceptive !== "yes" ? "bg-muted text-muted-foreground" : ""
                  }
                />
              </div>

              {/* Other Fields */}
              <div className="space-y-2">
                <Label htmlFor="are_you_breastfeeding_now" className="text-sm font-medium">
                  Are you breastfeeding now?
                </Label>
                <Select
                  value={formData.are_you_breastfeeding_now}
                  onValueChange={handleSelectChangeWrapper("are_you_breastfeeding_now")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="not_applicable">Not Applicable</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="under_hormone_replacement_therapy" className="text-sm font-medium">
                  Under hormone replacement therapy?
                </Label>
                <Select
                  value={formData.under_hormone_replacement_therapy}
                  onValueChange={handleSelectChangeWrapper("under_hormone_replacement_therapy")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="not_applicable">Not Applicable</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="menstruation" className="text-sm font-medium">
                  Menstruation status
                </Label>
                <Select
                  value={formData.menstruation}
                  onValueChange={handleSelectChangeWrapper("menstruation")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="irregular">Irregular</SelectItem>
                    <SelectItem value="menopause">Menopause</SelectItem>
                    <SelectItem value="not_applicable">Not Applicable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistorySection;
