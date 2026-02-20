import React, { useEffect, useState, useCallback, useRef } from "react";
import { PhysicalAssessmentData } from "./physical-assessment.type";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  useLatestPhysicalAssessmentByPatientNumber,
  useSavePhysicalAssessment,
} from "./usePhysicalAssessment";

interface Props {
  patientNumber: string;
  onChange?: (data: PhysicalAssessmentData) => void;
  handleChange?: (field: string, value: any) => void;
}

const initialFormData: PhysicalAssessmentData = {
  gait: "",
  appearance: "",
  defects: "",
  weight: 0,
  height: 0,
  bloodPressure: "",
  pulseRate: 0,
  respiratoryRate: 0,
  temperature: 0,
};

const PhysicalAssessment: React.FC<Props> = ({
  patientNumber,
  onChange,
  handleChange,
}) => {
  const [localFormData, setLocalFormData] = useState<PhysicalAssessmentData>(initialFormData);
  const [physicalAssessmentId, setPhysicalAssessmentId] = useState<number | undefined>();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const latestFormDataRef = useRef<PhysicalAssessmentData>(initialFormData);

  // Fetch the latest physical assessment for this patient
  const { data: latestPhysicalAssessment, isLoading } =
    useLatestPhysicalAssessmentByPatientNumber(patientNumber);

  // Save mutation
  const savePhysicalAssessment = useSavePhysicalAssessment();

  // Initialize form data from fetched data or external formData
  useEffect(() => {
    if (latestPhysicalAssessment) {
      const fetchedData: PhysicalAssessmentData = {
        gait: latestPhysicalAssessment.gait || "",
        appearance: latestPhysicalAssessment.appearance || "",
        defects: latestPhysicalAssessment.defects || "",
        weight: latestPhysicalAssessment.weight || 0,
        height: latestPhysicalAssessment.height || 0,
        bloodPressure: latestPhysicalAssessment.bloodPressure || "",
        pulseRate: latestPhysicalAssessment.pulseRate || 0,
        respiratoryRate: latestPhysicalAssessment.respiratoryRate || 0,
        temperature: latestPhysicalAssessment.temperature || 0,
      };
      setLocalFormData(fetchedData);
      setPhysicalAssessmentId(latestPhysicalAssessment.physicalAssessmentId);
    }
  }, [latestPhysicalAssessment]);

  // Immediate save function (used on unmount)
  const saveImmediately = useCallback(
    (dataToSave: PhysicalAssessmentData) => {
      const saveData = {
        ...dataToSave,
        patientId: latestPhysicalAssessment?.patientId,
        date: new Date().toISOString().split("T")[0],
      };

      savePhysicalAssessment.mutate(
        {
          physicalAssessmentId,
          formData: saveData,
        },
        {
          onSuccess: (savedData) => {
            console.log("Physical assessment saved on unmount");
          },
          onError: (error) => {
            console.error("Failed to save physical assessment on unmount:", error);
          },
        },
      );
    },
    [physicalAssessmentId, latestPhysicalAssessment, savePhysicalAssessment],
  );

  // Debounced save function
  const debouncedSave = useCallback(
    (dataToSave: PhysicalAssessmentData) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      setSaveStatus("saving");

      debounceTimer.current = setTimeout(() => {
        // Prepare data for saving
        const saveData = {
          ...dataToSave,
          patientId: latestPhysicalAssessment?.patientId,
          date: new Date().toISOString().split("T")[0],
        };

        savePhysicalAssessment.mutate(
          {
            physicalAssessmentId,
            formData: saveData,
          },
          {
            onSuccess: (savedData) => {
              setHasUnsavedChanges(false);
              setPhysicalAssessmentId(savedData.physicalAssessmentId);
              setSaveStatus("saved");
              console.log("Physical assessment auto-saved successfully");
              
              // Reset save status after 2 seconds
              setTimeout(() => setSaveStatus("idle"), 2000);
            },
            onError: (error) => {
              console.error("Failed to save physical assessment:", error);
              setSaveStatus("error");
              
              // Reset error status after 3 seconds
              setTimeout(() => setSaveStatus("idle"), 3000);
            },
          },
        );
      }, 2000); // 2 second debounce
    },
    [physicalAssessmentId, latestPhysicalAssessment, savePhysicalAssessment],
  );

  // Cleanup debounce timer and save on unmount
  useEffect(() => {
    return () => {
      // Save immediately if there are unsaved changes
      if (hasUnsavedChanges && latestFormDataRef.current) {
        // Clear the timer
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }
        // Save immediately
        saveImmediately(latestFormDataRef.current);
      }
    };
  }, [hasUnsavedChanges, saveImmediately]);

  const handleFieldChange = (field: string, value: any) => {
    const updatedData = {
      ...localFormData,
      [field]: value,
    };

    setLocalFormData(updatedData);
    latestFormDataRef.current = updatedData; // Keep ref updated for unmount save
    setHasUnsavedChanges(true);

    // Call external handlers if provided (for backward compatibility)
    if (onChange) {
      onChange(updatedData);
    } else if (handleChange) {
      handleChange(field, value);
    }

    // Trigger debounced save
    debouncedSave(updatedData);
  };

  const formData = localFormData;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#800000] mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading physical assessment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-white">
      {/* Auto-save indicator */}
      {saveStatus !== "idle" && (
        <div
          className={`flex items-center gap-2 text-sm px-4 py-2 rounded-md ${
            saveStatus === "saving"
              ? "text-amber-600 bg-amber-50"
              : saveStatus === "saved"
                ? "text-green-600 bg-green-50"
                : "text-red-600 bg-red-50"
          }`}
        >
          {saveStatus === "saving" && (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving changes...
            </>
          )}
          {saveStatus === "saved" && (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Saved successfully
            </>
          )}
          {saveStatus === "error" && (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Failed to save
            </>
          )}
        </div>
      )}

      {/* General Section */}
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-2">
          <h3 className="text-xl font-semibold text-gray-900 tracking-tight">General Assessment</h3>
          <p className="text-sm text-gray-600 mt-1">Physical appearance and mobility evaluation</p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label htmlFor="gait" className="text-sm font-medium text-gray-700">
              Gait
            </Label>
            <Input
              id="gait"
              type="text"
              value={formData.gait}
              onChange={(e) => handleFieldChange("gait", e.target.value)}
              placeholder="Enter gait assessment"
              className="transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="appearance" className="text-sm font-medium text-gray-700">
              Appearance
            </Label>
            <Input
              id="appearance"
              type="text"
              value={formData.appearance}
              onChange={(e) => handleFieldChange("appearance", e.target.value)}
              placeholder="Enter appearance notes"
              className="transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="defects" className="text-sm font-medium text-gray-700">
              Defects
            </Label>
            <Input
              id="defects"
              type="text"
              value={formData.defects}
              onChange={(e) => handleFieldChange("defects", e.target.value)}
              placeholder="Enter any defects observed"
              className="transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Vital Signs Section */}
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-2">
          <h3 className="text-xl font-semibold text-gray-900 tracking-tight">Vital Signs</h3>
          <p className="text-sm text-gray-600 mt-1">Patient's physiological measurements</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-sm font-medium text-gray-700">
              Weight <span className="text-gray-500 font-normal">(kg)</span>
            </Label>
            <Input
              id="weight"
              type="number"
              value={formData.weight}
              onChange={(e) =>
                handleFieldChange("weight", e.target.value === "" ? 0 : Number(e.target.value))
              }
              onFocus={(e) => {
                if (e.target.value === "0") e.target.select();
              }}
              placeholder="0"
              min="0"
              step="0.1"
              className="transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height" className="text-sm font-medium text-gray-700">
              Height <span className="text-gray-500 font-normal">(cm)</span>
            </Label>
            <Input
              id="height"
              type="number"
              value={formData.height}
              onChange={(e) =>
                handleFieldChange("height", e.target.value === "" ? 0 : Number(e.target.value))
              }
              onFocus={(e) => {
                if (e.target.value === "0") e.target.select();
              }}
              placeholder="0"
              min="0"
              step="0.1"
              className="transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bloodPressure" className="text-sm font-medium text-gray-700">
              Blood Pressure <span className="text-gray-500 font-normal">(mmHg)</span>
            </Label>
            <Input
              id="bloodPressure"
              type="text"
              value={formData.bloodPressure}
              onChange={(e) => handleFieldChange("bloodPressure", e.target.value)}
              placeholder="e.g., 120/80"
              className="transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pulseRate" className="text-sm font-medium text-gray-700">
              Pulse Rate <span className="text-gray-500 font-normal">(bpm)</span>
            </Label>
            <Input
              id="pulseRate"
              type="number"
              value={formData.pulseRate}
              onChange={(e) =>
                handleFieldChange("pulseRate", e.target.value === "" ? 0 : Number(e.target.value))
              }
              onFocus={(e) => {
                if (e.target.value === "0") e.target.select();
              }}
              placeholder="0"
              min="0"
              className="transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="respiratoryRate" className="text-sm font-medium text-gray-700">
              Respiratory Rate <span className="text-gray-500 font-normal">(/min)</span>
            </Label>
            <Input
              id="respiratoryRate"
              type="number"
              value={formData.respiratoryRate}
              onChange={(e) =>
                handleFieldChange(
                  "respiratoryRate",
                  e.target.value === "" ? 0 : Number(e.target.value),
                )
              }
              onFocus={(e) => {
                if (e.target.value === "0") e.target.select();
              }}
              placeholder="0"
              min="0"
              className="transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="temperature" className="text-sm font-medium text-gray-700">
              Temperature <span className="text-gray-500 font-normal">(°C)</span>
            </Label>
            <Input
              id="temperature"
              type="number"
              step="0.1"
              value={formData.temperature}
              onChange={(e) =>
                handleFieldChange("temperature", e.target.value === "" ? 0 : Number(e.target.value))
              }
              onFocus={(e) => {
                if (e.target.value === "0") e.target.select();
              }}
              placeholder="0.0"
              min="0"
              className="transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalAssessment;