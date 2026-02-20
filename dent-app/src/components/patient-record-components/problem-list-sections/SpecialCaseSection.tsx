import React from "react";

interface SpecialCaseOtherTreatmentsUIProps {
  treatments: { tooth: string; treatment: string }[];
  handleChange: (treatments: { tooth: string; treatment: string }[]) => void;
  toothOptions: { value: string; label: string }[];
  disabled: boolean;
}

const SpecialCaseOtherTreatmentsUI: React.FC<SpecialCaseOtherTreatmentsUIProps> = ({
  treatments,
  handleChange,
  toothOptions,
  disabled,
}) => {
  const [selectedTooth, setSelectedTooth] = React.useState("");
  const [treatmentText, setTreatmentText] = React.useState("");

  const handleAdd = () => {
    if (!selectedTooth || !treatmentText || disabled) return;
    handleChange([...(treatments || []), { tooth: selectedTooth, treatment: treatmentText }]);
    setSelectedTooth("");
    setTreatmentText("");
  };
  const handleRemove = (idx: number) => {
    if (disabled) return;
    handleChange((treatments || []).filter((_, i) => i !== idx));
  };
  return (
    <>
      <div className={`flex gap-2 items-end`}>
        <select
          className="border rounded px-2 py-1"
          value={selectedTooth}
          onChange={(e) => setSelectedTooth(e.target.value)}
          disabled={disabled}
        >
          <option value="">Select Tooth</option>
          {toothOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <input
          className="border rounded px-2 py-1 flex-1"
          type="text"
          placeholder="Describe treatment"
          value={treatmentText}
          onChange={(e) => setTreatmentText(e.target.value)}
          disabled={disabled}
        />
        <button
          type="button"
          className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50 flex items-center gap-1 hover:bg-green-700 transition-colors cursor-pointer"
          onClick={handleAdd}
          disabled={disabled || !selectedTooth || !treatmentText}
          title="Add treatment for selected tooth"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add
        </button>
      </div>
      <ul className="mt-2 space-y-1">
        {(treatments || []).map((item, idx) => (
          <li key={idx} className="flex items-center gap-2 bg-gray-50 border rounded px-2 py-1">
            <span className="font-semibold">{item.tooth}</span>
            <span className="flex-1">{item.treatment}</span>
            <button
              type="button"
              className="text-red-500 hover:text-white hover:bg-red-500 rounded p-1 transition-colors cursor-pointer"
              onClick={() => handleRemove(idx)}
              title="Remove this treatment"
              disabled={disabled}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SpecialCaseOtherTreatmentsUI;
