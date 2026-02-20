import React, { useState } from "react";
import TeethModal from "./TeethModal";
import { ToothValues, ConditionOption } from "@/types/dental-chart";
import { useDentalChartStore } from "@/stores/dentalChartStore";

// Use string paths for public images in Next.js
const tooth18 = "/teeth-image/18.png";
const tooth17 = "/teeth-image/17.png";
const tooth16 = "/teeth-image/16.png";
const tooth15 = "/teeth-image/15.png";
const tooth14 = "/teeth-image/14.png";
const tooth13 = "/teeth-image/13.png";
const tooth12 = "/teeth-image/12.png";
const tooth11 = "/teeth-image/11.png";
const tooth21 = "/teeth-image/21.png";
const tooth22 = "/teeth-image/22.png";
const tooth23 = "/teeth-image/23.png";
const tooth24 = "/teeth-image/24.png";
const tooth25 = "/teeth-image/25.png";
const tooth26 = "/teeth-image/26.png";
const tooth27 = "/teeth-image/27.png";
const tooth28 = "/teeth-image/28.png";

const tooth48 = "/teeth-image/48.png";
const tooth47 = "/teeth-image/47.png";
const tooth46 = "/teeth-image/46.png";
const tooth45 = "/teeth-image/45.png";
const tooth44 = "/teeth-image/44.png";
const tooth43 = "/teeth-image/43.png";
const tooth42 = "/teeth-image/42.png";
const tooth41 = "/teeth-image/41.png";
const tooth31 = "/teeth-image/31.png";
const tooth32 = "/teeth-image/32.png";
const tooth33 = "/teeth-image/33.png";
const tooth34 = "/teeth-image/34.png";
const tooth35 = "/teeth-image/35.png";
const tooth36 = "/teeth-image/36.png";
const tooth37 = "/teeth-image/37.png";
const tooth38 = "/teeth-image/38.png";

const ECBG = "/init_EC.png";

// ASChart no longer needs props - it uses Zustand store

// Square component
const Square: React.FC<{
  options: string[];
  values: ToothValues;
}> = ({ options, values }) => {
  return (
    <svg viewBox="0 0 80 45">
      <g id="buttons">
        <polygon
          id="top"
          points="0,0 80,0 60,13 20,13"
          fill="white"
          stroke="black"
          strokeWidth="1"
        />
        <text x="40" y="10" textAnchor="middle" fill="black" fontSize="10">
          {options[values.top]}
        </text>

        <polygon
          id="right"
          points="80,0 60,13 60,32 80,45"
          fill="white"
          stroke="black"
          strokeWidth="1"
        />
        <text x="70" y="26" textAnchor="middle" fill="black" fontSize="10">
          {options[values.right]}
        </text>

        <polygon
          id="bottom"
          points="80,45 60,32 20,32 0,45"
          fill="white"
          stroke="black"
          strokeWidth="1"
        />
        <text x="40" y="42" textAnchor="middle" fill="black" fontSize="10">
          {options[values.bottom]}
        </text>

        <polygon
          id="left"
          points="0,45 20,32 20,13 0,0"
          fill="white"
          stroke="black"
          strokeWidth="1"
        />
        <text x="10" y="26" textAnchor="middle" fill="black" fontSize="10">
          {options[values.left]}
        </text>

        <rect
          id="center"
          x="20"
          y="13"
          height="19"
          width="40"
          fill="white"
          stroke="black"
          strokeWidth="1"
        />
        <text x="40" y="26" textAnchor="middle" fill="black" fontSize="10">
          {options[values.center]}
        </text>

        <rect id="whole" x="0" y="0" height="45" width="80" fillOpacity="0" />
      </g>
    </svg>
  );
};

const ASChart: React.FC = () => {
  // Use Zustand store for data management
  const {
    chartData,
    updateToothValues,
    updateExistingCondition,
    updateDrawing,
    updateExtractedTooth,
  } = useDentalChartStore();

  // Extract data from store
  const {
    treatmentPlanValuesArrayTop,
    treatmentPlanValuesArrayBottom,
    lesionStatusValuesArrayTop,
    lesionStatusValuesArrayBottom,
    icdasValuesArrayTop,
    icdasValuesArrayBottom,
    existingConditionTop,
    existingConditionBottom,
    drawings,
    extractedTeeth,
  } = chartData;
  const treatmentPlans = [" ", "N", "T"];
  const lesionStatus = [" ", "+", "-"];
  const icdasCode = [" ", "0", "A", "B", "C"];

  // Default tooth values for safety
  const defaultToothValues: ToothValues = { top: 0, right: 0, bottom: 0, left: 0, center: 0 };

  const conditionOptions: ConditionOption[] = [
    { code: "Am", label: "Amalgam" },
    { code: "Co", label: "Composite" },
    { code: "GI", label: "Glass Ionomer" },
    { code: "TF", label: "Temporary Filling" },
    { code: "CD", label: "Complete Denture" },
    { code: "SD", label: "Single Denture" },
    { code: "RPD", label: "Removable Partial Denture" },
    { code: "\u2191", label: "Extrusion" },
    { code: "\u2193", label: "Intrusion" },
    { code: "\u2190", label: "Mesial Drifting" },
    { code: "\u2192", label: "Distal Drifting" },
    { code: "\u21B6", label: "Rotation" },
    { code: "PCC", label: "Post Core Crown" },
    { code: "RCT", label: "Root Canal Treatment" },
    { code: "PFS", label: "Pit and Fissure Sealant" },
    { code: "\u2715", label: "Extracted" },
    { code: "M", label: "Missing" },
    { code: "UE", label: "Unerupted" },
    { code: "IMP", label: "Impacted" },
    { code: "PFM", label: "Porcelain Fused to Metal" },
    { code: "CMR", label: "Cast Metal Restoration" },
    { code: "AC", label: "Acrylic Crown" },
    { code: "MC", label: "Metal Crown" },
    { code: "Coc", label: "Composite Crown" },
    { code: "Cec", label: "Ceramic Crown" },
  ];

  const [upperTeeth, setUpperTeeth] = useState([
    tooth18,
    tooth17,
    tooth16,
    tooth15,
    tooth14,
    tooth13,
    tooth12,
    tooth11,
    tooth21,
    tooth22,
    tooth23,
    tooth24,
    tooth25,
    tooth26,
    tooth27,
    tooth28,
  ]);

  const [lowerTeeth, setLowerTeeth] = useState([
    tooth48,
    tooth47,
    tooth46,
    tooth45,
    tooth44,
    tooth43,
    tooth42,
    tooth41,
    tooth31,
    tooth32,
    tooth33,
    tooth34,
    tooth35,
    tooth36,
    tooth37,
    tooth38,
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState({ index: 0, position: "" });

  const isExtracted = (position: string, index: number) =>
    extractedTeeth?.[`${position}-${index}`] || false;

  const handleSquareClick = (index: number, position: string) => {
    if (position === "top") {
      const currentValues = treatmentPlanValuesArrayTop[index];
      if (currentValues) {
        const updatedValues = {
          ...currentValues,
          center: (currentValues.center + 1) % treatmentPlans.length,
        };
        updateToothValues("treatmentPlanValuesArrayTop", index, updatedValues);
      }
    } else if (position === "bottom") {
      const currentValues = treatmentPlanValuesArrayBottom[index];
      if (currentValues) {
        const updatedValues = {
          ...currentValues,
          center: (currentValues.center + 1) % treatmentPlans.length,
        };
        updateToothValues("treatmentPlanValuesArrayBottom", index, updatedValues);
      }
    }
  };

  const handleSectionClick = (index: number, position: string) => {
    setSelectedSection({ index, position });
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleTreatmentChange = (values: ToothValues) => {
    if (selectedSection.position === "top") {
      updateToothValues("treatmentPlanValuesArrayTop", selectedSection.index, values);
    } else {
      updateToothValues("treatmentPlanValuesArrayBottom", selectedSection.index, values);
    }
  };

  const handleLesionChange = (values: ToothValues) => {
    if (selectedSection.position === "top") {
      updateToothValues("lesionStatusValuesArrayTop", selectedSection.index, values);
    } else {
      updateToothValues("lesionStatusValuesArrayBottom", selectedSection.index, values);
    }
  };

  const handleICDASChange = (values: ToothValues) => {
    if (selectedSection.position === "top") {
      updateToothValues("icdasValuesArrayTop", selectedSection.index, values);
    } else {
      updateToothValues("icdasValuesArrayBottom", selectedSection.index, values);
    }
  };

  const handleDrawingChange = (toothNumber: string, dataUrl: string) => {
    // Convert tooth number back to position and index to create the correct key
    const toothNum = parseInt(toothNumber);
    let position = "";
    let index = 0;

    // Determine position and index from tooth number
    const topTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
    const bottomTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

    const topIndex = topTeeth.indexOf(toothNum);
    const bottomIndex = bottomTeeth.indexOf(toothNum);

    if (topIndex !== -1) {
      position = "top";
      index = topIndex;
    } else if (bottomIndex !== -1) {
      position = "bottom";
      index = bottomIndex;
    } else {
      // Fallback to using selectedSection if tooth number not found
      position = selectedSection.position;
      index = selectedSection.index;
    }

    const key = `${position}-${index}`;
    updateDrawing(key, dataUrl);
  };

  const handleConditionSelect = (code: string) => {
    const { index, position } = selectedSection;
    if (position === "top") {
      const current = existingConditionTop[index] || [];
      let updated;
      if (current.includes(code)) {
        updated = current.filter((c: string) => c !== code);
      } else if (current.length < 2) {
        updated = [...current, code];
      } else {
        updated = [code]; // Replace if already 2
      }
      updateExistingCondition("existingConditionTop", index, updated);
    } else if (position === "bottom") {
      const current = existingConditionBottom[index] || [];
      let updated;
      if (current.includes(code)) {
        updated = current.filter((c: string) => c !== code);
      } else if (current.length < 2) {
        updated = [...current, code];
      } else {
        updated = [code];
      }
      updateExistingCondition("existingConditionBottom", index, updated);
    }
  };

  return (
    <div className="flex justify-center items-center my-2">
      <div
        className="chart-container overflow-x-auto"
        style={{ transform: "scale(1.1)", transformOrigin: "center" }}
      >
        <div id="container-wrapper" className="flex flex-col">
          {/* Top Treatment Plan Row */}
          <div className="container flex items-center">
            <div className="flex-shrink-0" style={{ width: "96px" }}>
              <svg
                viewBox="0 0 120 45"
                preserveAspectRatio="xMinYMid meet"
                style={{ display: "block" }}
              >
                <g>
                  <polygon
                    points="0,0 120,0 120,45 0,45"
                    fill="white"
                    stroke="black"
                    strokeWidth="1"
                  />
                  <text x="10" y="20" textAnchor="start" fill="black" fontSize="12">
                    Treatment Plan:
                  </text>
                  <text x="10" y="35" textAnchor="start" fill="black" fontSize="12">
                    NOC or TPOC
                  </text>
                </g>
              </svg>
            </div>

            <div className="flex">
              {[...Array(16)].map((_, index) => (
                <div
                  key={index}
                  className="w-16"
                  onClick={() => handleSectionClick(index, "top")}
                  style={{ position: "relative" }}
                >
                  <Square
                    options={treatmentPlans}
                    values={treatmentPlanValuesArrayTop?.[index] || defaultToothValues}
                  />
                  {isExtracted("top", index) && (
                    <svg
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                      }}
                      viewBox="0 0 80 45"
                    >
                      <line x1="0" y1="0" x2="80" y2="45" stroke="red" strokeWidth="4" />
                      <line x1="80" y1="0" x2="0" y2="45" stroke="red" strokeWidth="4" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Top Lesion Status Row */}
          <div className="container flex items-center">
            <div className="flex-shrink-0" style={{ width: "96px" }}>
              <svg
                viewBox="0 0 120 45"
                preserveAspectRatio="xMinYMid meet"
                style={{ display: "block" }}
              >
                <g>
                  <polygon
                    points="0,0 120,0 120,45 0,45"
                    fill="white"
                    stroke="black"
                    strokeWidth="1"
                  />
                  <text x="10" y="20" textAnchor="start" fill="black" fontSize="12">
                    Lesion Status:
                  </text>
                  <text x="10" y="35" textAnchor="start" fill="black" fontSize="12">
                    (+) or (-)
                  </text>
                </g>
              </svg>
            </div>

            <div className="flex">
              {[...Array(16)].map((_, index) => (
                <div
                  key={index}
                  className="w-16"
                  onClick={() => handleSectionClick(index, "top")}
                  style={{ position: "relative" }}
                >
                  <Square
                    options={lesionStatus}
                    values={lesionStatusValuesArrayTop?.[index] || defaultToothValues}
                  />
                  {isExtracted("top", index) && (
                    <svg
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                      }}
                      viewBox="0 0 80 45"
                    >
                      <line x1="0" y1="0" x2="80" y2="45" stroke="red" strokeWidth="4" />
                      <line x1="80" y1="0" x2="0" y2="45" stroke="red" strokeWidth="4" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Top ICDAS Code Row */}
          <div className="container flex items-center">
            <div className="flex-shrink-0" style={{ width: "96px" }}>
              <svg
                viewBox="0 0 120 45"
                preserveAspectRatio="xMinYMid meet"
                style={{ display: "block" }}
              >
                <g>
                  <polygon
                    points="0,0 120,0 120,45 0,45"
                    fill="white"
                    stroke="black"
                    strokeWidth="1"
                  />
                  <text x="10" y="20" textAnchor="start" fill="black" fontSize="12">
                    ICDAS Code:
                  </text>
                  <text x="10" y="35" textAnchor="start" fill="black" fontSize="10">
                    0, A, B, C, Restoration
                  </text>
                </g>
              </svg>
            </div>

            <div className="flex">
              {[...Array(16)].map((_, index) => (
                <div
                  key={index}
                  className="w-16"
                  onClick={() => handleSectionClick(index, "top")}
                  style={{ position: "relative" }}
                >
                  <Square
                    options={icdasCode}
                    values={icdasValuesArrayTop?.[index] || defaultToothValues}
                  />
                  {isExtracted("top", index) && (
                    <svg
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                      }}
                      viewBox="0 0 80 45"
                    >
                      <line x1="0" y1="0" x2="80" y2="45" stroke="red" strokeWidth="4" />
                      <line x1="80" y1="0" x2="0" y2="45" stroke="red" strokeWidth="4" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Top Existing Condition Row */}
          <div className="existingCondition-container">
            <div id="existing-condition" className="flex items-center">
              <div className="flex-shrink-0" style={{ width: "96px", height: "36px" }}>
                <svg
                  viewBox="0 0 120 45"
                  preserveAspectRatio="xMinYMid meet"
                  style={{ display: "block" }}
                >
                  <g>
                    <polygon
                      points="0,0 120,0 120,45 0,45"
                      fill="white"
                      stroke="black"
                      strokeWidth="1"
                    />
                    <text x="10" y="28" textAnchor="start" fill="black" fontSize="12">
                      Existing Condition
                    </text>
                  </g>
                </svg>
              </div>

              <div className="flex">
                {[...Array(16)].map((_, index) => (
                  <div
                    key={index}
                    className="w-[16vw] max-w-[64px] min-w-[40px]"
                    onClick={() => handleSectionClick(index, "top")}
                  >
                    <svg viewBox="0 0 80 45">
                      <g>
                        <polygon
                          points="0,0 80,0 80,45 0,45"
                          fill="white"
                          stroke="black"
                          strokeWidth="1"
                        />
                      </g>
                      {existingConditionTop[index] &&
                        (() => {
                          const codes = existingConditionTop[index];
                          if (codes.length === 1) {
                            return (
                              <text x={40} y={28} fontSize="16" fill="blue" textAnchor="middle">
                                {codes[0]}
                              </text>
                            );
                          } else if (codes.length === 2) {
                            const fontSize = 16;
                            const charWidth = 10;
                            const codeWidths = codes.map((code) => code.length * charWidth);
                            const totalWidth = codeWidths[0] + codeWidths[1] + 12;
                            const startX = 40 - totalWidth / 2;
                            return (
                              <>
                                <text
                                  x={startX + codeWidths[0] / 2}
                                  y={28}
                                  fontSize="16"
                                  fill="blue"
                                  textAnchor="middle"
                                >
                                  {codes[0]}
                                </text>
                                <text
                                  x={startX + codeWidths[0] + 12 + codeWidths[1] / 2}
                                  y={28}
                                  fontSize="16"
                                  fill="blue"
                                  textAnchor="middle"
                                >
                                  {codes[1]}
                                </text>
                              </>
                            );
                          } else {
                            return codes.map((code: string, i: number) => (
                              <text
                                key={code}
                                x={10 + i * 35}
                                y={28}
                                fontSize="16"
                                fill="blue"
                                textAnchor="middle"
                              >
                                {code}
                              </text>
                            ));
                          }
                        })()}
                      {isExtracted("top", index) && (
                        <g>
                          <line x1="0" y1="0" x2="80" y2="45" stroke="red" strokeWidth="4" />
                          <line x1="80" y1="0" x2="0" y2="45" stroke="red" strokeWidth="4" />
                        </g>
                      )}
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Teeth Diagrams Top Row */}
          <div className="teeth-container">
            <div id="teeth" className="flex items-center">
              <div className="flex-shrink-0" style={{ width: "96px" }}>
                <svg
                  viewBox="0 0 120 160"
                  preserveAspectRatio="xMinYMid meet"
                  style={{ display: "block" }}
                >
                  <g>
                    <polygon
                      points="0,0 120,0 120,160 0,160"
                      fill="white"
                      stroke="black"
                      strokeWidth="1"
                    />
                    <text x="10" y="50" textAnchor="start" fill="black" fontSize="12">
                      Facial
                    </text>
                    <text x="10" y="90" textAnchor="start" fill="black" fontSize="12">
                      Occlusal
                    </text>
                    <text x="10" y="130" textAnchor="start" fill="black" fontSize="12">
                      Palatal
                    </text>
                  </g>
                </svg>
              </div>

              <div className="flex">
                {upperTeeth.map((tooth, index) => {
                  const drawing = drawings?.[`top-${index}`];
                  return (
                    <div
                      key={index}
                      style={{ width: "64px", position: "relative" }}
                      onClick={() => handleSectionClick(index, "top")}
                    >
                      <svg
                        viewBox="0 0 80 160"
                        className="w-full h-auto"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <g>
                          <polygon
                            points="0,0 80,0 80,160 0,160"
                            fill="white"
                            stroke="black"
                            strokeWidth="1"
                          />
                          <line x1="0" y1="159" x2="80" y2="159" stroke="black" strokeWidth="1" />
                          {index === 7 && (
                            <line x1="79" y1="0" x2="79" y2="160" stroke="black" strokeWidth="1" />
                          )}
                          {index === 8 && (
                            <line x1="1" y1="0" x2="1" y2="160" stroke="black" strokeWidth="1" />
                          )}
                        </g>
                        <image href={tooth} x="2.5" y="5" width="75" height="150" />
                        {drawing && (
                          <image
                            href={drawing}
                            x="2.5"
                            y="5"
                            width="75"
                            height="150"
                            style={{ pointerEvents: "none" }}
                          />
                        )}
                      </svg>
                      {isExtracted("top", index) && (
                        <svg
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            pointerEvents: "none",
                          }}
                          viewBox="0 0 80 160"
                        >
                          <line x1="0" y1="0" x2="80" y2="160" stroke="red" strokeWidth="4" />
                          <line x1="80" y1="0" x2="0" y2="160" stroke="red" strokeWidth="4" />
                        </svg>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Teeth Diagrams Bottom Row */}
          <div className="teeth-container">
            <div id="teeth" className="flex items-center">
              <div className="flex-shrink-0" style={{ width: "96px" }}>
                <svg
                  viewBox="0 0 120 160"
                  preserveAspectRatio="xMinYMid meet"
                  style={{ display: "block" }}
                >
                  <g>
                    <polygon
                      points="0,0 120,0 120,160 0,160"
                      fill="white"
                      stroke="black"
                      strokeWidth="1"
                    />
                    <text x="10" y="50" textAnchor="start" fill="black" fontSize="12">
                      Facial
                    </text>
                    <text x="10" y="90" textAnchor="start" fill="black" fontSize="12">
                      Occlusal
                    </text>
                    <text x="10" y="130" textAnchor="start" fill="black" fontSize="12">
                      Lingual
                    </text>
                  </g>
                </svg>
              </div>

              <div className="flex">
                {lowerTeeth.map((tooth, index) => {
                  const drawing = drawings?.[`bottom-${index}`];
                  return (
                    <div
                      key={index}
                      style={{ width: "64px", position: "relative" }}
                      onClick={() => handleSectionClick(index, "bottom")}
                    >
                      <svg
                        viewBox="0 0 80 160"
                        className="w-full h-auto"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <g>
                          <polygon
                            points="0,0 80,0 80,160 0,160"
                            fill="white"
                            stroke="black"
                            strokeWidth="1"
                          />
                          <line x1="0" y1="1" x2="80" y2="1" stroke="black" strokeWidth="1" />
                          {index === 7 && (
                            <line x1="79" y1="0" x2="79" y2="160" stroke="black" strokeWidth="1" />
                          )}
                          {index === 8 && (
                            <line x1="1" y1="0" x2="1" y2="160" stroke="black" strokeWidth="1" />
                          )}
                        </g>
                        <image href={tooth} x="2.5" y="5" width="75" height="150" />
                        {drawing && (
                          <image
                            href={drawing}
                            x="2.5"
                            y="5"
                            width="75"
                            height="150"
                            style={{ pointerEvents: "none" }}
                          />
                        )}
                      </svg>
                      {isExtracted("bottom", index) && (
                        <svg
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            pointerEvents: "none",
                          }}
                          viewBox="0 0 80 160"
                        >
                          <line x1="0" y1="0" x2="80" y2="160" stroke="red" strokeWidth="4" />
                          <line x1="80" y1="0" x2="0" y2="160" stroke="red" strokeWidth="4" />
                        </svg>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Existing Condition Row */}
          <div className="existingCondition-container">
            <div id="existing-condition" className="flex items-center">
              <div className="flex-shrink-0" style={{ width: "96px", height: "36px" }}>
                <svg
                  viewBox="0 0 120 45"
                  preserveAspectRatio="xMinYMid meet"
                  style={{ display: "block" }}
                >
                  <g>
                    <polygon
                      points="0,0 120,0 120,45 0,45"
                      fill="white"
                      stroke="black"
                      strokeWidth="1"
                    />
                    <text x="10" y="28" textAnchor="start" fill="black" fontSize="12">
                      Existing Condition
                    </text>
                  </g>
                </svg>
              </div>

              <div className="flex">
                {[...Array(16)].map((_, index) => (
                  <div
                    key={index}
                    className="w-[16vw] max-w-[64px] min-w-[40px]"
                    onClick={() => handleSectionClick(index, "bottom")}
                  >
                    <svg viewBox="0 0 80 45">
                      <g>
                        <polygon
                          points="0,0 80,0 80,45 0,45"
                          fill="white"
                          stroke="black"
                          strokeWidth="1"
                        />
                      </g>
                      {existingConditionBottom[index] &&
                        (() => {
                          const codes = existingConditionBottom[index];
                          if (codes.length === 1) {
                            return (
                              <text x={40} y={28} fontSize="16" fill="blue" textAnchor="middle">
                                {codes[0]}
                              </text>
                            );
                          } else if (codes.length === 2) {
                            const fontSize = 16;
                            const charWidth = 10;
                            const codeWidths = codes.map((code) => code.length * charWidth);
                            const totalWidth = codeWidths[0] + codeWidths[1] + 12;
                            const startX = 40 - totalWidth / 2;
                            return (
                              <>
                                <text
                                  x={startX + codeWidths[0] / 2}
                                  y={28}
                                  fontSize="16"
                                  fill="blue"
                                  textAnchor="middle"
                                >
                                  {codes[0]}
                                </text>
                                <text
                                  x={startX + codeWidths[0] + 12 + codeWidths[1] / 2}
                                  y={28}
                                  fontSize="16"
                                  fill="blue"
                                  textAnchor="middle"
                                >
                                  {codes[1]}
                                </text>
                              </>
                            );
                          } else {
                            return codes.map((code: string, i: number) => (
                              <text
                                key={code}
                                x={10 + i * 35}
                                y={28}
                                fontSize="16"
                                fill="blue"
                                textAnchor="middle"
                              >
                                {code}
                              </text>
                            ));
                          }
                        })()}
                      {isExtracted("bottom", index) && (
                        <g>
                          <line x1="0" y1="0" x2="80" y2="45" stroke="red" strokeWidth="4" />
                          <line x1="80" y1="0" x2="0" y2="45" stroke="red" strokeWidth="4" />
                        </g>
                      )}
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom ICDAS Code Row */}
          <div className="container flex items-center">
            <div className="flex-shrink-0" style={{ width: "96px" }}>
              <svg
                viewBox="0 0 120 45"
                preserveAspectRatio="xMinYMid meet"
                style={{ display: "block" }}
              >
                <g>
                  <polygon
                    points="0,0 120,0 120,45 0,45"
                    fill="white"
                    stroke="black"
                    strokeWidth="1"
                  />
                  <text x="10" y="20" textAnchor="start" fill="black" fontSize="12">
                    ICDAS Code:
                  </text>
                  <text x="10" y="35" textAnchor="start" fill="black" fontSize="10">
                    0, A, B, C, Restoration
                  </text>
                </g>
              </svg>
            </div>

            <div className="flex">
              {[...Array(16)].map((_, index) => (
                <div
                  key={index}
                  className="w-16"
                  onClick={() => handleSectionClick(index, "bottom")}
                  style={{ position: "relative" }}
                >
                  <Square
                    options={icdasCode}
                    values={icdasValuesArrayBottom?.[index] || defaultToothValues}
                  />
                  {isExtracted("bottom", index) && (
                    <svg
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                      }}
                      viewBox="0 0 80 45"
                    >
                      <line x1="0" y1="0" x2="80" y2="45" stroke="red" strokeWidth="4" />
                      <line x1="80" y1="0" x2="0" y2="45" stroke="red" strokeWidth="4" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Lesion Status Row */}
          <div className="container flex items-center">
            <div className="flex-shrink-0" style={{ width: "96px" }}>
              <svg
                viewBox="0 0 120 45"
                preserveAspectRatio="xMinYMid meet"
                style={{ display: "block" }}
              >
                <g>
                  <polygon
                    points="0,0 120,0 120,45 0,45"
                    fill="white"
                    stroke="black"
                    strokeWidth="1"
                  />
                  <text x="10" y="20" textAnchor="start" fill="black" fontSize="12">
                    Lesion Status:
                  </text>
                  <text x="10" y="35" textAnchor="start" fill="black" fontSize="12">
                    (+) or (-)
                  </text>
                </g>
              </svg>
            </div>

            <div className="flex">
              {[...Array(16)].map((_, index) => (
                <div
                  key={index}
                  className="w-16"
                  onClick={() => handleSectionClick(index, "bottom")}
                  style={{ position: "relative" }}
                >
                  <Square
                    options={lesionStatus}
                    values={lesionStatusValuesArrayBottom?.[index] || defaultToothValues}
                  />
                  {isExtracted("bottom", index) && (
                    <svg
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                      }}
                      viewBox="0 0 80 45"
                    >
                      <line x1="0" y1="0" x2="80" y2="45" stroke="red" strokeWidth="4" />
                      <line x1="80" y1="0" x2="0" y2="45" stroke="red" strokeWidth="4" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Treatment Plan Row */}
          <div className="container flex items-center">
            <div className="flex-shrink-0" style={{ width: "96px" }}>
              <svg
                viewBox="0 0 120 45"
                preserveAspectRatio="xMinYMid meet"
                style={{ display: "block" }}
              >
                <g>
                  <polygon
                    points="0,0 120,0 120,45 0,45"
                    fill="white"
                    stroke="black"
                    strokeWidth="1"
                  />
                  <text x="10" y="20" textAnchor="start" fill="black" fontSize="12">
                    Treatment Plan:
                  </text>
                  <text x="10" y="35" textAnchor="start" fill="black" fontSize="12">
                    NOC or TPOC
                  </text>
                </g>
              </svg>
            </div>

            <div className="flex">
              {[...Array(16)].map((_, index) => (
                <div
                  key={index}
                  className="w-16"
                  onClick={() => handleSectionClick(index, "bottom")}
                  style={{ position: "relative" }}
                >
                  <Square
                    options={treatmentPlans}
                    values={treatmentPlanValuesArrayBottom?.[index] || defaultToothValues}
                  />
                  {isExtracted("bottom", index) && (
                    <svg
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                      }}
                      viewBox="0 0 80 45"
                    >
                      <line x1="0" y1="0" x2="80" y2="45" stroke="red" strokeWidth="4" />
                      <line x1="80" y1="0" x2="0" y2="45" stroke="red" strokeWidth="4" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TeethModal
        isOpen={showModal}
        onClose={handleModalClose}
        section={selectedSection}
        treatmentValues={
          selectedSection.position === "top"
            ? treatmentPlanValuesArrayTop?.[selectedSection.index] || defaultToothValues
            : treatmentPlanValuesArrayBottom?.[selectedSection.index] || defaultToothValues
        }
        lesionValues={
          selectedSection.position === "top"
            ? lesionStatusValuesArrayTop?.[selectedSection.index] || defaultToothValues
            : lesionStatusValuesArrayBottom?.[selectedSection.index] || defaultToothValues
        }
        icdasValues={
          selectedSection.position === "top"
            ? icdasValuesArrayTop?.[selectedSection.index] || defaultToothValues
            : icdasValuesArrayBottom?.[selectedSection.index] || defaultToothValues
        }
        savedDrawing={drawings?.[`${selectedSection.position}-${selectedSection.index}`]}
        onDrawingChange={handleDrawingChange}
        onTreatmentChange={handleTreatmentChange}
        onLesionChange={handleLesionChange}
        onICDASChange={handleICDASChange}
        existingCondition={
          selectedSection.position === "top"
            ? existingConditionTop?.[selectedSection.index] || []
            : existingConditionBottom?.[selectedSection.index] || []
        }
        onConditionSelect={handleConditionSelect}
        conditionOptions={conditionOptions}
        extracted={isExtracted(selectedSection.position, selectedSection.index)}
        setExtracted={(val: boolean) =>
          updateExtractedTooth(`${selectedSection.position}-${selectedSection.index}`, val)
        }
      />
    </div>
  );
};

export default ASChart;
