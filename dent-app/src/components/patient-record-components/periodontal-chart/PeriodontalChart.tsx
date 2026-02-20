import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Ban } from "lucide-react";
import { renderTopPopoverContent, renderBottomPopoverContent } from "./PopoverContent";
import type { PeriodontalChartTooth } from "@/types/PeriodontalChartTypes";

export interface PeriodontalChartData {
  periodontalChartId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  teeth: PeriodontalChartTooth[];
}

const PeriodontalChart: React.FC = () => {
  // Initialize chart data for all 32 teeth
  const initializeChartData = (): PeriodontalChartData => {
    const allToothNumbers = [
      // Upper teeth
      18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
      // Lower teeth
      48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
    ];

    const teeth: PeriodontalChartTooth[] = allToothNumbers.map((toothNumber) => ({
      toothNumber,
      topPi: undefined,
      bottomPi: undefined,
      topLeftBop: undefined,
      topMidBop: undefined,
      topRightBop: undefined,
      botLeftBop: undefined,
      botMidBop: undefined,
      botRightBop: undefined,
      mob: undefined,
      sup: undefined,
      topLeftCal: undefined,
      topMidCal: undefined,
      topRightCal: undefined,
      botLeftCal: undefined,
      botMidCal: undefined,
      botRightCal: undefined,
      ppdLeft: undefined,
      ppdMid: undefined,
      ppdRight: undefined,
      cejgmLeft: undefined,
      cejgmMid: undefined,
      cejgmRight: undefined,
      topFurcation: 0,
      bottomFurcation1: 0,
      bottomFurcation2: 0,
    }));

    return {
      teeth,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  const [chartData, setChartData] = useState<PeriodontalChartData>(initializeChartData());

  // State for popover management
  const [openPopover, setOpenPopover] = useState<{
    toothNumber: number;
    side: "left" | "right";
    toothIdx: number;
    rowType: string;
    position: "top" | "bottom";
  } | null>(null);

  // Numbering systems for teeth
  const teethNumbers = {
    upperLeft: [18, 17, 16, 15, 14, 13, 12, 11],
    upperRight: [21, 22, 23, 24, 25, 26, 27, 28],
    lowerLeft: [48, 47, 46, 45, 44, 43, 42, 41],
    lowerRight: [31, 32, 33, 34, 35, 36, 37, 38],
  };

  const leftNums = [...teethNumbers.upperLeft, ...teethNumbers.upperRight];
  const rightNums = [...teethNumbers.lowerLeft, ...teethNumbers.lowerRight];

  // Furcation configuration for specific teeth
  const furcationConfig = {
    // Teeth with single furcation button in top popover
    topFurcationTeeth: [18, 17, 16, 26, 27, 28, 48, 47, 46, 36, 37, 38],
    // Teeth with double furcation buttons in bottom popover
    bottomFurcationTeeth: [18, 17, 16, 14, 26, 27, 28, 24],
    // Teeth with single furcation button in bottom popover
    bottomSingleFurcationTeeth: [48, 47, 46, 36, 37, 38],
  };

  // Helper function to check if tooth has furcation features
  const hasTopFurcation = (toothNumber: number): boolean =>
    furcationConfig.topFurcationTeeth.includes(toothNumber);

  const hasBottomFurcation = (toothNumber: number): boolean =>
    furcationConfig.bottomFurcationTeeth.includes(toothNumber);

  const hasBottomSingleFurcation = (toothNumber: number): boolean =>
    furcationConfig.bottomSingleFurcationTeeth.includes(toothNumber);

  // Helper function to get tooth data by tooth number
  const getToothData = (toothNumber: number): PeriodontalChartTooth | undefined => {
    return chartData.teeth.find((tooth) => tooth.toothNumber === toothNumber);
  };

  // Helper function to update tooth data
  const updateToothData = (toothNumber: number, updates: Partial<PeriodontalChartTooth>) => {
    setChartData((prevData) => {
      const newTeeth = prevData.teeth.map((tooth) =>
        tooth.toothNumber === toothNumber ? { ...tooth, ...updates } : tooth,
      );
      return {
        ...prevData,
        teeth: newTeeth,
        updatedAt: new Date(),
      };
    });
  };

  // Helper function to format boolean values as +/-
  const formatBoolean = (value?: boolean): string => {
    if (value === undefined) return "";
    return value ? "+" : "-";
  };

  // Helper function to parse +/- input to boolean
  const parseBoolean = (value: string): boolean | undefined => {
    if (value === "+") return true;
    if (value === "-") return false;
    return undefined;
  };

  // Styles
  const labelStyle =
    "border border-gray-800 p-0.5 min-w-[32px] bg-transparent text-center font-bold text-xs text-black";

  // Helper function to render teeth number labels
  const renderToothNumberRow = () => (
    <tr>
      {leftNums.map((num, idx) => (
        <td key={`left-${num}`} className={labelStyle}>
          {num}
        </td>
      ))}
      <td className="min-w-[32px] border-none bg-transparent"></td>
      {rightNums.map((num, idx) => (
        <td key={`right-${num}`} className={labelStyle}>
          {num}
        </td>
      ))}
    </tr>
  );

  // Helper function to render furcation icons based on state
  const renderFurcationIcon = (state: number) => {
    switch (state) {
      case 0:
        return (
          <span title="Clear">
            <Ban className="w-4 h-4 text-gray-500" />
          </span>
        ); // Ban icon for no furcation
      case 1:
        return <div className="w-4 h-4 rounded-full border-2 border-black bg-transparent"></div>; // Hollow circle
      case 2:
        return (
          <div className="w-4 h-4 rounded-full border-2 border-black bg-gradient-to-r from-black from-50% to-transparent to-50%"></div>
        ); // Half shaded from left to right
      case 3:
        return <div className="w-4 h-4 rounded-full border-2 border-black bg-black"></div>; // Fully shaded circle
      default:
        return null;
    }
  };

  // Helper function to render a row of cells that follows tooth image widths
  const renderCellRow = (label: string, rowType: string, position: "top" | "bottom" = "top") => {
    const isPiRow = rowType === "pi"; // Both top and bottom PI rows will have popovers
    const popoverSide = position === "top" ? "bottom" : "top"; // Top PI shows popover below, bottom PI shows popover above

    return (
      <tr>
        {leftNums.map((num, idx) => (
          <td key={`cell-left-${num}`} className="border border-gray-800 p-0.5">
            {isPiRow ? (
              <Popover
                open={
                  openPopover?.toothNumber === num &&
                  openPopover?.side === "left" &&
                  openPopover?.position === position
                }
                onOpenChange={(open) => {
                  if (!open) {
                    setOpenPopover(null);
                  }
                }}
                modal={true}
              >
                <PopoverTrigger asChild>
                  <div
                    className={`h-5 w-full flex items-center justify-center text-xs cursor-pointer hover:bg-gray-100 transition-colors`}
                    onClick={() =>
                      setOpenPopover({
                        toothNumber: num,
                        side: "left",
                        toothIdx: idx,
                        rowType,
                        position,
                      })
                    }
                  >
                    {/* PI cell content */}
                  </div>
                </PopoverTrigger>
                <PopoverContent side={popoverSide} className="max-h-120 overflow-y-auto">
                  {position === "top"
                    ? renderTopPopoverContent({
                        toothNumber: num,
                        getToothData,
                        updateToothData,
                        formatBoolean,
                        parseBoolean,
                        hasTopFurcation,
                        hasBottomFurcation,
                        hasBottomSingleFurcation,
                        renderFurcationIcon,
                      })
                    : renderBottomPopoverContent({
                        toothNumber: num,
                        getToothData,
                        updateToothData,
                        formatBoolean,
                        parseBoolean,
                        hasTopFurcation,
                        hasBottomFurcation,
                        hasBottomSingleFurcation,
                        renderFurcationIcon,
                      })}
                </PopoverContent>
              </Popover>
            ) : (
              <div
                className={`h-5 w-full flex items-center justify-center text-xs cursor-pointer hover:bg-gray-100 transition-colors`}
                onClick={() => {
                  // Determine which PI cell should show the popover based on the clicked cell's position
                  setOpenPopover({
                    toothNumber: num,
                    side: "left",
                    toothIdx: idx,
                    rowType: "pi",
                    position,
                  });
                }}
              >
                {/* Other cell content */}
              </div>
            )}
          </td>
        ))}
        <td className={labelStyle}>{label}</td>
        {rightNums.map((num, idx) => (
          <td key={`cell-right-${num}`} className="border border-gray-800 p-0.5">
            {isPiRow ? (
              <Popover
                open={
                  openPopover?.toothNumber === num &&
                  openPopover?.side === "right" &&
                  openPopover?.position === position
                }
                onOpenChange={(open) => {
                  if (!open) {
                    setOpenPopover(null);
                  }
                }}
                modal={true}
              >
                <PopoverTrigger asChild>
                  <div
                    className={`h-5 w-full flex items-center justify-center text-xs cursor-pointer hover:bg-gray-100 transition-colors`}
                    onClick={() =>
                      setOpenPopover({
                        toothNumber: num,
                        side: "right",
                        toothIdx: idx,
                        rowType,
                        position,
                      })
                    }
                  >
                    {/* PI cell content */}
                  </div>
                </PopoverTrigger>
                <PopoverContent side={popoverSide} className="max-h-120 overflow-y-auto">
                  {position === "top"
                    ? renderTopPopoverContent({
                        toothNumber: num,
                        getToothData,
                        updateToothData,
                        formatBoolean,
                        parseBoolean,
                        hasTopFurcation,
                        hasBottomFurcation,
                        hasBottomSingleFurcation,
                        renderFurcationIcon,
                      })
                    : renderBottomPopoverContent({
                        toothNumber: num,
                        getToothData,
                        updateToothData,
                        formatBoolean,
                        parseBoolean,
                        hasTopFurcation,
                        hasBottomFurcation,
                        hasBottomSingleFurcation,
                        renderFurcationIcon,
                      })}
                </PopoverContent>
              </Popover>
            ) : (
              <div
                className={`h-5 w-full flex items-center justify-center text-xs cursor-pointer hover:bg-gray-100 transition-colors`}
                onClick={() => {
                  // Determine which PI cell should show the popover based on the clicked cell's position
                  setOpenPopover({
                    toothNumber: num,
                    side: "right",
                    toothIdx: idx,
                    rowType: "pi",
                    position,
                  });
                }}
              >
                {/* Other cell content */}
              </div>
            )}
          </td>
        ))}
      </tr>
    );
  };

  // Tooth-specific furcation position and size configuration
  const furcationConfiguration: {
    [toothNumber: number]: {
      topFurcation?: { x: number; y: number };
      bottomFurcation1?: { x: number; y: number };
      bottomFurcation2?: { x: number; y: number };
      symbolRadius?: number;
    };
  } = {
    // Upper left molars
    18: {
      topFurcation: { x: 58, y: 28.5 },
      bottomFurcation1: { x: 30, y: 72.5 },
      bottomFurcation2: { x: 76.5, y: 74.5 },
      symbolRadius: 6,
    },
    17: {
      topFurcation: { x: 50, y: 28 },
      bottomFurcation1: { x: 17, y: 76.5 },
      bottomFurcation2: { x: 60, y: 77 },
      symbolRadius: 6,
    },
    16: {
      topFurcation: { x: 50, y: 27.5 },
      bottomFurcation1: { x: 18, y: 77 },
      bottomFurcation2: { x: 74, y: 73 },
      symbolRadius: 6,
    },
    14: {
      bottomFurcation1: { x: 32.5, y: 76.5 },
      bottomFurcation2: { x: 72, y: 75 },
      symbolRadius: 5,
    },

    // Upper right molars
    24: {
      bottomFurcation1: { x: 28, y: 75 },
      bottomFurcation2: { x: 67.5, y: 76.5 },
      symbolRadius: 5,
    },
    26: {
      topFurcation: { x: 51, y: 27.5 },
      bottomFurcation1: { x: 26, y: 73 },
      bottomFurcation2: { x: 82, y: 77 },
      symbolRadius: 6,
    },
    27: {
      topFurcation: { x: 50, y: 28 },
      bottomFurcation1: { x: 40, y: 77 },
      bottomFurcation2: { x: 83, y: 76.5 },
      symbolRadius: 6,
    },
    28: {
      topFurcation: { x: 42, y: 28.5 },
      bottomFurcation1: { x: 23.5, y: 74.5 },
      bottomFurcation2: { x: 70, y: 72.5 },
      symbolRadius: 6,
    },

    // Lower left molars
    48: {
      topFurcation: { x: 56, y: 23.5 },
      bottomFurcation1: { x: 53, y: 76.5 },
      symbolRadius: 7,
    },
    47: {
      topFurcation: { x: 58, y: 23.5 },
      bottomFurcation1: { x: 51, y: 76.5 },
      symbolRadius: 7,
    },
    46: {
      topFurcation: { x: 48, y: 26 },
      bottomFurcation1: { x: 56, y: 75 },
      symbolRadius: 7,
    },

    // Lower right molars
    36: {
      topFurcation: { x: 52, y: 26 },
      bottomFurcation1: { x: 44, y: 75 },
      symbolRadius: 7,
    },
    37: {
      topFurcation: { x: 42, y: 23.5 },
      bottomFurcation1: { x: 49, y: 76.5 },
      symbolRadius: 7,
    },
    38: {
      topFurcation: { x: 44, y: 23.5 },
      bottomFurcation1: { x: 47, y: 76.5 },
      symbolRadius: 7,
    },
  };

  // Helper function to render furcation SVG symbol
  const renderFurcationSVG = (
    state: number,
    x: number,
    y: number,
    key: string,
    toothNumber?: number,
  ) => {
    if (state === 0) return null;

    // Get radius from configuration, default to 6 if not specified
    const radius = furcationConfiguration[toothNumber || 0]?.symbolRadius || 6;

    switch (state) {
      case 1:
        return (
          <circle
            key={key}
            cx={`${x}%`}
            cy={`${y}%`}
            r={radius}
            fill="transparent"
            stroke="black"
            strokeWidth="2"
          />
        );
      case 2:
        return (
          <g key={key}>
            <defs>
              <clipPath id={`half-clip-${key}`}>
                <rect x="0" y="0" width="50%" height="100%" />
              </clipPath>
            </defs>
            <circle
              cx={`${x}%`}
              cy={`${y}%`}
              r={radius}
              fill="transparent"
              stroke="black"
              strokeWidth="2"
            />
            <circle
              cx={`${x}%`}
              cy={`${y}%`}
              r={radius - 1}
              fill="black"
              clipPath={`url(#half-clip-${key})`}
            />
          </g>
        );
      case 3:
        return (
          <circle
            key={key}
            cx={`${x}%`}
            cy={`${y}%`}
            r={radius}
            fill="black"
            stroke="black"
            strokeWidth="2"
          />
        );
      default:
        return null;
    }
  };

  // Helper function to render tooth images
  const renderToothImages = () => (
    <tr>
      {teethNumbers.upperLeft.map((num, idx) => {
        const toothData = getToothData(num);
        return (
          <td key={`left-${num}`} className="p-0 border-0 align-bottom">
            <div className="relative">
              <img
                src={`/periodontal-chart-images/upper-teeth/column_${idx + 1}.png`}
                alt={`Tooth ${num}`}
                className="block h-72 object-contain w-full mx-auto"
              />
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Grid lines */}
                {Array.from({ length: 17 }).map((_, lineIdx) => (
                  <line
                    key={lineIdx}
                    x1="0"
                    x2="100%"
                    y1={`${(lineIdx + 1) * 2}%`}
                    y2={`${(lineIdx + 1) * 2}%`}
                    stroke="black"
                    strokeWidth="1"
                  />
                ))}
                {Array.from({ length: 17 }).map((_, lineIdx) => (
                  <line
                    key={`bottom-${lineIdx}`}
                    x1="0"
                    x2="100%"
                    y1={`${100 - (lineIdx + 1) * (35 / 18)}%`}
                    y2={`${100 - (lineIdx + 1) * (35 / 18)}%`}
                    stroke="black"
                    strokeWidth="1"
                  />
                ))}

                {/* Furcation symbols */}
                {hasTopFurcation(num) &&
                  toothData &&
                  furcationConfiguration[num]?.topFurcation &&
                  renderFurcationSVG(
                    toothData.topFurcation,
                    furcationConfiguration[num].topFurcation!.x,
                    furcationConfiguration[num].topFurcation!.y,
                    `upper-left-top-${num}`,
                    num,
                  )}
                {hasBottomFurcation(num) &&
                  toothData &&
                  furcationConfiguration[num]?.bottomFurcation1 &&
                  renderFurcationSVG(
                    toothData.bottomFurcation1,
                    furcationConfiguration[num].bottomFurcation1!.x,
                    furcationConfiguration[num].bottomFurcation1!.y,
                    `upper-left-bottom1-${num}`,
                    num,
                  )}
                {hasBottomFurcation(num) &&
                  toothData &&
                  furcationConfiguration[num]?.bottomFurcation2 &&
                  renderFurcationSVG(
                    toothData.bottomFurcation2,
                    furcationConfiguration[num].bottomFurcation2!.x,
                    furcationConfiguration[num].bottomFurcation2!.y,
                    `upper-left-bottom2-${num}`,
                    num,
                  )}
              </svg>
            </div>
          </td>
        );
      })}
      {teethNumbers.upperRight.map((num, idx) => {
        const toothData = getToothData(num);
        return (
          <td key={`right-${num}`} className="p-0 border-0 align-bottom">
            <div className="relative">
              <img
                src={`/periodontal-chart-images/upper-teeth/column_${8 - idx}.png`}
                alt={`Tooth ${num}`}
                className="block h-72 object-contain w-full mx-auto transform scale-x-[-1]"
              />
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Grid lines */}
                {Array.from({ length: 17 }).map((_, lineIdx) => (
                  <line
                    key={lineIdx}
                    x1="0"
                    x2="100%"
                    y1={`${(lineIdx + 1) * 2}%`}
                    y2={`${(lineIdx + 1) * 2}%`}
                    stroke="black"
                    strokeWidth="1"
                  />
                ))}
                {Array.from({ length: 17 }).map((_, lineIdx) => (
                  <line
                    key={lineIdx}
                    x1="0"
                    x2="100%"
                    y1={`${100 - (lineIdx + 1) * (35 / 18)}%`}
                    y2={`${100 - (lineIdx + 1) * (35 / 18)}%`}
                    stroke="black"
                    strokeWidth="1"
                  />
                ))}

                {/* Furcation symbols */}
                {hasTopFurcation(num) &&
                  toothData &&
                  furcationConfiguration[num]?.topFurcation &&
                  renderFurcationSVG(
                    toothData.topFurcation,
                    furcationConfiguration[num].topFurcation!.x,
                    furcationConfiguration[num].topFurcation!.y,
                    `upper-right-top-${num}`,
                    num,
                  )}
                {hasBottomFurcation(num) &&
                  toothData &&
                  furcationConfiguration[num]?.bottomFurcation1 &&
                  renderFurcationSVG(
                    toothData.bottomFurcation1,
                    furcationConfiguration[num].bottomFurcation1!.x,
                    furcationConfiguration[num].bottomFurcation1!.y,
                    `upper-right-bottom1-${num}`,
                    num,
                  )}
                {hasBottomFurcation(num) &&
                  toothData &&
                  furcationConfiguration[num]?.bottomFurcation2 &&
                  renderFurcationSVG(
                    toothData.bottomFurcation2,
                    furcationConfiguration[num].bottomFurcation2!.x,
                    furcationConfiguration[num].bottomFurcation2!.y,
                    `upper-right-bottom2-${num}`,
                    num,
                  )}
              </svg>
            </div>
          </td>
        );
      })}

      <td className="min-w-[28px] border-none bg-transparent"></td>

      {teethNumbers.lowerLeft.map((num, idx) => {
        const toothData = getToothData(num);
        return (
          <td key={`right-${num}`} className="p-0 border-0 align-bottom">
            <div className="relative">
              <img
                src={`/periodontal-chart-images/lower-teeth/column_${idx + 1}.png`}
                alt={`Tooth ${num}`}
                className="block h-72 object-contain w-full mx-auto"
              />
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Grid lines */}
                {Array.from({ length: 17 }).map((_, lineIdx) => (
                  <line
                    key={lineIdx}
                    x1="0"
                    x2="100%"
                    y1={`${(lineIdx + 1) * (34 / 18)}%`}
                    y2={`${(lineIdx + 1) * (34 / 18)}%`}
                    stroke="black"
                    strokeWidth="1"
                  />
                ))}
                {Array.from({ length: 17 }).map((_, lineIdx) => (
                  <line
                    key={lineIdx}
                    x1="0"
                    x2="100%"
                    y1={`${100 - (lineIdx + 1) * (34 / 18)}%`}
                    y2={`${100 - (lineIdx + 1) * (34 / 18)}%`}
                    stroke="black"
                    strokeWidth="1"
                  />
                ))}

                {/* Furcation symbols */}
                {hasTopFurcation(num) &&
                  toothData &&
                  furcationConfiguration[num]?.topFurcation &&
                  renderFurcationSVG(
                    toothData.topFurcation,
                    furcationConfiguration[num].topFurcation!.x,
                    furcationConfiguration[num].topFurcation!.y,
                    `lower-left-top-${num}`,
                    num,
                  )}
                {hasBottomSingleFurcation(num) &&
                  toothData &&
                  furcationConfiguration[num]?.bottomFurcation1 &&
                  renderFurcationSVG(
                    toothData.bottomFurcation1,
                    furcationConfiguration[num].bottomFurcation1!.x,
                    furcationConfiguration[num].bottomFurcation1!.y,
                    `lower-left-bottom-${num}`,
                    num,
                  )}
              </svg>
            </div>
          </td>
        );
      })}
      {teethNumbers.lowerRight.map((num, idx) => {
        const toothData = getToothData(num);
        return (
          <td key={`right-${num}`} className="p-0 border-0 align-bottom">
            <div className="relative">
              <img
                src={`/periodontal-chart-images/lower-teeth/column_${8 - idx}.png`}
                alt={`Tooth ${num}`}
                className="block h-72 object-contain w-full mx-auto transform scale-x-[-1]"
              />
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Grid lines */}
                {Array.from({ length: 17 }).map((_, lineIdx) => (
                  <line
                    key={lineIdx}
                    x1="0"
                    x2="100%"
                    y1={`${(lineIdx + 1) * (34 / 18)}%`}
                    y2={`${(lineIdx + 1) * (34 / 18)}%`}
                    stroke="black"
                    strokeWidth="1"
                  />
                ))}
                {Array.from({ length: 17 }).map((_, lineIdx) => (
                  <line
                    key={lineIdx}
                    x1="0"
                    x2="100%"
                    y1={`${100 - (lineIdx + 1) * (34 / 18)}%`}
                    y2={`${100 - (lineIdx + 1) * (34 / 18)}%`}
                    stroke="black"
                    strokeWidth="1"
                  />
                ))}

                {/* Furcation symbols */}
                {hasTopFurcation(num) &&
                  toothData &&
                  furcationConfiguration[num]?.topFurcation &&
                  renderFurcationSVG(
                    toothData.topFurcation,
                    furcationConfiguration[num].topFurcation!.x,
                    furcationConfiguration[num].topFurcation!.y,
                    `lower-right-top-${num}`,
                    num,
                  )}
                {hasBottomSingleFurcation(num) &&
                  toothData &&
                  furcationConfiguration[num]?.bottomFurcation1 &&
                  renderFurcationSVG(
                    toothData.bottomFurcation1,
                    furcationConfiguration[num].bottomFurcation1!.x,
                    furcationConfiguration[num].bottomFurcation1!.y,
                    `lower-right-bottom-${num}`,
                    num,
                  )}
              </svg>
            </div>
          </td>
        );
      })}
    </tr>
  );

  return (
    <div className="px-4 overflow-x-auto relative mb-6">
      <table className="table-auto border-collapse mx-auto">
        <tbody>
          {/* Top teeth numbers */}
          {renderToothNumberRow()}

          {renderCellRow("PI", "pi", "top")}
          {renderCellRow("BOP", "bop", "top")}
          {renderCellRow("Mob", "mobility", "top")}
          {renderCellRow("CAL", "cal", "top")}
          {renderCellRow("PPD", "ppd", "top")}
          {renderCellRow("CEJ-GM", "cejGm", "top")}

          {renderToothImages()}

          {renderCellRow("CEJ-GM", "cejGm", "bottom")}
          {renderCellRow("PPD", "ppd", "bottom")}
          {renderCellRow("CAL", "cal", "bottom")}
          {renderCellRow("Sup", "suppuration", "bottom")}
          {renderCellRow("BOP", "bop", "bottom")}
          {renderCellRow("PI", "pi", "bottom")}
          {/* Bottom teeth numbers */}
          {renderToothNumberRow()}
        </tbody>
      </table>
    </div>
  );
};

export default PeriodontalChart;
