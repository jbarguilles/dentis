import React, { useState, useRef, useEffect } from "react";

export type OptionType = { value: string; label: string };

interface CustomMultiSelectProps {
  options: OptionType[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
  disabled?: boolean;
}

const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  const filteredOptions = options; // No filtering

  // Group options by dental quadrant (11-18, 21-28, 31-38, 41-48)
  const groupedOptions = {
    upperRight: filteredOptions
      .filter((option) => {
        const value = parseInt(option.value);
        return value >= 11 && value <= 18;
      })
      .sort((a, b) => parseInt(a.value) - parseInt(b.value)),
    upperLeft: filteredOptions
      .filter((option) => {
        const value = parseInt(option.value);
        return value >= 21 && value <= 28;
      })
      .sort((a, b) => parseInt(a.value) - parseInt(b.value)),
    lowerLeft: filteredOptions
      .filter((option) => {
        const value = parseInt(option.value);
        return value >= 31 && value <= 38;
      })
      .sort((a, b) => parseInt(a.value) - parseInt(b.value)),
    lowerRight: filteredOptions
      .filter((option) => {
        const value = parseInt(option.value);
        return value >= 41 && value <= 48;
      })
      .sort((a, b) => parseInt(a.value) - parseInt(b.value)),
    other: filteredOptions.filter((option) => {
      const value = parseInt(option.value);
      return (
        isNaN(value) ||
        value < 11 ||
        (value > 18 && value < 21) ||
        (value > 28 && value < 31) ||
        (value > 38 && value < 41) ||
        value > 48
      );
    }),
  };

  const handleToggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const handleRemove = (optionValue: string) => {
    onChange(value.filter((v) => v !== optionValue));
  };

  const handleRemoveAll = () => {
    onChange([]);
  };

  const selectedLabels = value.map((v) => {
    const option = options.find((o) => o.value === v);
    return { value: v, label: option ? option.label : v };
  });
  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`border border-gray-300 rounded px-3 py-2 min-h-[38px] ${
          disabled ? "bg-gray-100 cursor-not-allowed opacity-70" : "cursor-pointer"
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {/* Top right controls */}
        <div className="absolute right-2 top-2 flex items-center gap-2 z-10">
          {/* Clear all button */}
          {selectedLabels.length > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveAll();
              }}
              className="text-red-500 hover:text-red-700 hover:cursor-pointer"
              title="Clear all"
              tabIndex={-1}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          {/* Dropdown arrow button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) setIsOpen(!isOpen);
            }}
            className={`focus:outline-none hover:cursor-pointer ${disabled ? "cursor-not-allowed" : ""}`}
            disabled={disabled}
            tabIndex={-1}
          >
            <svg
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        {/* Selected items */}
        <div className="flex flex-wrap gap-1 items-center">
          {selectedLabels.length > 0 ? (
            <>
              {selectedLabels.map(({ label, value: val }) => (
                <span
                  key={val}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-sm text-sm flex items-center gap-1"
                >
                  {label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(val);
                    }}
                    className="ml-1 text-blue-500 hover:text-blue-700 hover:cursor-pointer"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              ))}
            </>
          ) : (
            <span className="text-gray-500" onClick={() => setIsOpen(!isOpen)}>
              {placeholder}
            </span>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
          {/* Removed search input */}
          <div className="grid grid-cols-4 gap-1 p-2">
            {/* Column 1: Upper Right (11-18) */}
            <div className="flex flex-col gap-1">
              {groupedOptions.upperRight.map((option) => (
                <div
                  key={option.value}
                  className={`px-2 py-1 cursor-pointer hover:bg-gray-100 rounded flex items-center gap-1.5 ${
                    value.includes(option.value) ? "bg-blue-50" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(option.value);
                  }}
                >
                  <input
                    type="checkbox"
                    checked={value.includes(option.value)}
                    onChange={() => {}}
                    className="w-3.5 h-3.5 flex-shrink-0"
                  />
                  <span className="text-sm truncate">{option.label}</span>
                </div>
              ))}
            </div>
            {/* Column 2: Upper Left (21-28) */}
            <div className="flex flex-col gap-1">
              {groupedOptions.upperLeft.map((option) => (
                <div
                  key={option.value}
                  className={`px-2 py-1 cursor-pointer hover:bg-gray-100 rounded flex items-center gap-1.5 ${
                    value.includes(option.value) ? "bg-blue-50" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(option.value);
                  }}
                >
                  <input
                    type="checkbox"
                    checked={value.includes(option.value)}
                    onChange={() => {}}
                    className="w-3.5 h-3.5 flex-shrink-0"
                  />
                  <span className="text-sm truncate">{option.label}</span>
                </div>
              ))}
            </div>
            {/* Column 3: Lower Left (31-38) */}
            <div className="flex flex-col gap-1">
              {groupedOptions.lowerLeft.map((option) => (
                <div
                  key={option.value}
                  className={`px-2 py-1 cursor-pointer hover:bg-gray-100 rounded flex items-center gap-1.5 ${
                    value.includes(option.value) ? "bg-blue-50" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(option.value);
                  }}
                >
                  <input
                    type="checkbox"
                    checked={value.includes(option.value)}
                    onChange={() => {}}
                    className="w-3.5 h-3.5 flex-shrink-0"
                  />
                  <span className="text-sm truncate">{option.label}</span>
                </div>
              ))}
            </div>
            {/* Column 4: Lower Right (41-48) */}
            <div className="flex flex-col gap-1">
              {groupedOptions.lowerRight.map((option) => (
                <div
                  key={option.value}
                  className={`px-2 py-1 cursor-pointer hover:bg-gray-100 rounded flex items-center gap-1.5 ${
                    value.includes(option.value) ? "bg-blue-50" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(option.value);
                  }}
                >
                  <input
                    type="checkbox"
                    checked={value.includes(option.value)}
                    onChange={() => {}}
                    className="w-3.5 h-3.5 flex-shrink-0"
                  />
                  <span className="text-sm truncate">{option.label}</span>
                </div>
              ))}
            </div>
            {/* Other options that don't fit the quadrants */}
            {groupedOptions.other.length > 0 && (
              <div className="col-span-4 mt-2 pt-2 border-t border-gray-200">
                {groupedOptions.other.map((option) => (
                  <div
                    key={option.value}
                    className={`px-2 py-1 cursor-pointer hover:bg-gray-100 rounded inline-flex items-center gap-1.5 mr-2 mb-1 ${
                      value.includes(option.value) ? "bg-blue-50" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggle(option.value);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={value.includes(option.value)}
                      onChange={() => {}}
                      className="w-3.5 h-3.5 flex-shrink-0"
                    />
                    <span className="text-sm truncate">{option.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* No options found message is not needed since all options are always shown */}
        </div>
      )}
    </div>
  );
};

export default CustomMultiSelect;
