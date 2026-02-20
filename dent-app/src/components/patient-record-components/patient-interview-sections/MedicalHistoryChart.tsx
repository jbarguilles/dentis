import React from "react";
import { MedicalHistoryData } from "@/types/patient-interview";

interface MedicalHistoryChartProps {
  formData: MedicalHistoryData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
}

const medicalConditionLabelKeyMap: Record<string, keyof MedicalHistoryData> = {
  "Afternoon fever": "afternoon_fever",
  "Breathing problems": "breathing_problems",
  "Frequent headaches": "frequent_headaches",
  "Pacemakers, artificial heart valves": "pacemakers_artificial_heart_valves",
  "Angina pectoris, chest pain": "angina_pectoris_chest_pain",
  Chemotherapy: "chemotherapy",
  "Frequent high fever": "frequent_high_fever",
  "Pain in joints": "pain_in_joints",
  Anxiety: "anxiety",
  "Chronic cough": "chronic_cough",
  "Frequent hunger": "frequent_hunger",
  "Pain upon urination": "pain_upon_urination",
  Arthritis: "arthritis",
  "Denied permission to give blood": "denied_permission_to_give_blood",
  "Frequent thirst": "frequent_thirst",
  Pallor: "pallor",
  Asthma: "asthma",
  Depression: "depression",
  "Frequent urination": "frequent_urination",
  "Pelvic or lower abdominal discomfort": "pelvic_or_lower_abdominal_discomfort",
  "Bleeding or bruising tendency": "bleeding_or_bruising_tendency",
  Diabetes: "diabetes",
  Goiter: "goiter",
  Sinusitis: "sinusitis",
  "Blood transfusion": "blood_transfusion",
  Dizziness: "dizziness",
  "Heart attack": "heart_attack",
  "Sudden weight loss or gain": "sudden_weight_loss_or_gain",
  "Blood or pus in urine": "blood_or_pus_in_urine",
  Emphysema: "emphysema",
  "High blood pressure": "high_blood_pressure",
  "Swollen ankles": "swollen_ankles",
  "Bloody sputum": "bloody_sputum",
  "Fainting spell or loss of consciousness": "fainting_spell_or_loss_of_consciousness",
  Nervousness: "nervousness",
  Tremors: "tremors",
  "Visual impairment": "visual_impairment",
  Others: "others",
};

const familyHistoryLabelKeyMap: Record<string, keyof MedicalHistoryData> = {
  "Bleeding disorders (Family History)": "fh_bleeding_disorders",
  "Cancer (Family History)": "fh_cancer",
  "Diabetes (Family History)": "fh_diabetes",
  "Heart Disease (Family History)": "fh_heart_disease",
  "Others (Family History)": "fh_others",
};

const MedicalHistoryChart: React.FC<MedicalHistoryChartProps> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6 pt-4 border-t">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-green-700">Medical History Chart</h4>
      </div>
      {/* Section 1 */}
      <div className="space-y-4">
        <h5 className="text-base font-medium text-green-600">
          Section 1: Do you have or have you had any of the following
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(medicalConditionLabelKeyMap).map(([item, key]) => (
            <div key={item} className="flex items-center gap-2 min-h-[40px]">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={key}
                  name={key}
                  onChange={handleChange}
                  checked={!!formData[key]}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500 h-4 w-4"
                />
              </div>
              <div className="flex-grow flex items-center gap-2">
                <label htmlFor={key} className="text-sm font-medium text-gray-700 cursor-pointer">
                  {item}
                </label>
                {item === "Others" && (
                  <input
                    type="text"
                    name="s1_others_specify"
                    placeholder="Specify"
                    onChange={handleChange}
                    value={
                      typeof formData.s1_others_specify === "string"
                        ? formData.s1_others_specify
                        : ""
                    }
                    className={`p-1.5 border rounded-md text-sm flex-grow min-w-[200px] ${!formData[key] ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed" : "border-gray-300"}`}
                    disabled={!formData[key]}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Section 2 */}
      <div className="space-y-4">
        <h5 className="text-base font-medium text-green-600">
          Section 2: Family History (Grandparents, Parents, siblings, children)
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3">
          {Object.entries(familyHistoryLabelKeyMap).map(([item, key]) => (
            <div key={item} className="flex items-center gap-2 min-h-[40px]">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={key}
                  name={key}
                  onChange={handleChange}
                  checked={!!formData[key]}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500 h-4 w-4"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <label htmlFor={key} className="text-sm font-medium text-gray-700 cursor-pointer">
                    {item.replace(" (Family History)", "")}
                  </label>
                  {item === "Others (Family History)" && (
                    <input
                      type="text"
                      name="fh_others_specify"
                      placeholder="Specify"
                      onChange={handleChange}
                      value={
                        typeof formData.fh_others_specify === "string"
                          ? formData.fh_others_specify
                          : ""
                      }
                      className={`p-1.5 border rounded-md text-sm flex-grow min-w-[200px] ${!formData[key] ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed" : "border-gray-300"}`}
                      disabled={!formData[key]}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Section 3 */}
      <div className="space-y-4">
        <h5 className="text-base font-medium text-green-600">Section 3: Allergies</h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Drugs", key: "allergies_drugs", specifyKey: "allergies_drugs_specify" },
            { label: "Food", key: "allergies_food", specifyKey: "allergies_food_specify" },
            { label: "Rubber", key: "allergies_rubber", specifyKey: "allergies_rubber_specify" },
            { label: "Others", key: "allergies_others", specifyKey: "allergies_others_specify" },
          ].map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={item.key}
                  name={item.key}
                  onChange={handleChange}
                  checked={!!formData[item.key as keyof MedicalHistoryData]}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500 h-4 w-4"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor={item.key}
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    {item.label}
                  </label>
                  <input
                    type="text"
                    name={item.specifyKey}
                    placeholder="Specify"
                    onChange={handleChange}
                    value={
                      typeof formData[item.specifyKey as keyof MedicalHistoryData] === "string"
                        ? (formData[item.specifyKey as keyof MedicalHistoryData] as string)
                        : ""
                    }
                    className={`p-1.5 border rounded-md text-sm flex-grow min-w-[200px] ${!formData[item.key as keyof MedicalHistoryData] ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed" : "border-gray-300"}`}
                    disabled={!formData[item.key as keyof MedicalHistoryData]}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Section 4 */}
      <div className="space-y-4">
        <h5 className="text-base font-medium text-green-600">Section 4: Females</h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Menstruation?", key: "menstruation", minW: "min-w-[180px]" },
            {
              label: "Under hormone replacement therapy?",
              key: "under_hormone_replacement_therapy",
              minW: "min-w-[250px]",
            },
            { label: "Are you pregnant now?", key: "are_you_pregnant_now", minW: "min-w-[180px]" },
            {
              label: "Are you breastfeeding now?",
              key: "are_you_breastfeeding_now",
              minW: "min-w-[250px]",
            },
          ].map((item) => (
            <div key={item.key} className="flex items-center gap-1">
              <label className={`text-sm font-medium text-gray-700 ${item.minW}`}>
                {item.label}
              </label>
              <label htmlFor={`${item.key}_yes`} className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  id={`${item.key}_yes`}
                  name={item.key}
                  value="yes"
                  onChange={handleChange}
                  checked={formData[item.key as keyof MedicalHistoryData] === "yes"}
                  className="text-green-600 focus:ring-green-500 h-4 w-4"
                />
                <span>Yes</span>
              </label>
              <label htmlFor={`${item.key}_no`} className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  id={`${item.key}_no`}
                  name={item.key}
                  value="no"
                  onChange={handleChange}
                  checked={formData[item.key as keyof MedicalHistoryData] === "no"}
                  className="text-green-600 focus:ring-green-500 h-4 w-4"
                />
                <span>No</span>
              </label>
            </div>
          ))}
          <div className="flex flex-col align-items-start gap-1">
            <label htmlFor="females_pregnant_months" className="text-sm font-medium text-gray-700">
              No. of months pregnant
            </label>
            <input
              type="number"
              id="females_pregnant_months"
              name="females_pregnant_months"
              onChange={(e) => {
                // Clamp value between 0 and 9, always store as number
                const val = Math.max(0, Math.min(9, Number(e.target.value)));
                // Create a synthetic event to pass to handleChange
                const syntheticEvent = {
                  ...e,
                  target: {
                    ...e.target,
                    value: val.toString(),
                    name: "females_pregnant_months",
                  },
                } as React.ChangeEvent<HTMLInputElement>;
                handleChange(syntheticEvent);
              }}
              value={formData.females_pregnant_months}
              className={`w-full p-1.5 border ${formData.are_you_pregnant_now === "yes" ? "border-gray-300" : "border-gray-200 bg-gray-100"} rounded-md text-sm`}
              disabled={formData.are_you_pregnant_now === "no"}
              min={0}
              max={9}
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <label
                htmlFor="females_contraceptive"
                className="text-sm font-medium text-gray-700 min-w-[250px]"
              >
                Taking any form of contraceptive?
              </label>
              <label className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  name="females_contraceptive_radio"
                  value="yes"
                  checked={formData.females_contraceptive === "yes"}
                  onChange={(e) => {
                    if (e.target.value === "yes") {
                      const syntheticEvent = {
                        ...e,
                        target: {
                          ...e.target,
                          name: "females_contraceptive",
                          value: "yes",
                        },
                      } as React.ChangeEvent<HTMLInputElement>;
                      handleChange(syntheticEvent);
                    }
                  }}
                  className="text-green-600 focus:ring-green-500 h-4 w-4"
                />
                <span>Yes</span>
              </label>
              <label className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  name="females_contraceptive_radio"
                  value="no"
                  checked={formData.females_contraceptive === "no"}
                  onChange={(e) => {
                    if (e.target.value === "no") {
                      // Reset both contraceptive and type fields
                      const syntheticEvent = {
                        ...e,
                        target: {
                          ...e.target,
                          name: "females_contraceptive",
                          value: "no",
                        },
                      } as React.ChangeEvent<HTMLInputElement>;
                      handleChange(syntheticEvent);
                      const syntheticTypeEvent = {
                        ...e,
                        target: {
                          ...e.target,
                          name: "females_contraceptive_type",
                          value: "",
                        },
                      } as React.ChangeEvent<HTMLInputElement>;
                      handleChange(syntheticTypeEvent);
                    }
                  }}
                  className="text-green-600 focus:ring-green-500 h-4 w-4"
                />
                <span>No</span>
              </label>
            </div>
            <div>
              <input
                type="text"
                id="females_contraceptive_type"
                name="females_contraceptive_type"
                onChange={handleChange}
                value={formData.females_contraceptive_type}
                className={`w-full p-1.5 border border-gray-300 rounded-md text-sm ${formData.females_contraceptive !== "yes" ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}`}
                disabled={formData.females_contraceptive !== "yes"}
                placeholder="Specify type"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistoryChart;
