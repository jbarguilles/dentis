import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { PeriodontalChartTooth } from "@/types/PeriodontalChartTypes";

interface PopoverContentProps {
  toothNumber: number;
  getToothData: (toothNumber: number) => PeriodontalChartTooth | undefined;
  updateToothData: (toothNumber: number, updates: Partial<PeriodontalChartTooth>) => void;
  formatBoolean: (value?: boolean) => string;
  parseBoolean: (value: string) => boolean | undefined;
  hasTopFurcation: (toothNumber: number) => boolean;
  hasBottomFurcation: (toothNumber: number) => boolean;
  hasBottomSingleFurcation: (toothNumber: number) => boolean;
  renderFurcationIcon: (state: number) => React.ReactNode;
}

// Helper function to render top-focused popover content
export const renderTopPopoverContent = ({
  toothNumber,
  getToothData,
  updateToothData,
  formatBoolean,
  parseBoolean,
  hasTopFurcation,
  renderFurcationIcon,
}: PopoverContentProps) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-center">Tooth {toothNumber}</h3>

    {/* Top PI Field */}
    <div className="space-y-2">
      <label className="text-sm font-medium">PI (+/-)</label>
      <Input
        value={formatBoolean(getToothData(toothNumber)?.topPi)}
        onChange={(e) => updateToothData(toothNumber, { topPi: parseBoolean(e.target.value) })}
      />
    </div>

    {/* Top BOP Fields */}
    <div className="space-y-2">
      <label className="text-sm font-medium">BOP</label>
      <div className="flex gap-2">
        <Input
          type="number"
          value={getToothData(toothNumber)?.topLeftBop ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              topLeftBop: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
        <Input
          type="number"
          value={getToothData(toothNumber)?.topMidBop ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              topMidBop: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
        <Input
          type="number"
          value={getToothData(toothNumber)?.topRightBop ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              topRightBop: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
      </div>
    </div>

    {/* Mobility Field (shared between top and bottom) */}
    <div className="space-y-2">
      <label className="text-sm font-medium">Mobility</label>
      <Input
        type="number"
        value={getToothData(toothNumber)?.mob ?? ""}
        onChange={(e) =>
          updateToothData(toothNumber, { mob: e.target.value ? Number(e.target.value) : undefined })
        }
      />
    </div>

    {/* Top CAL Fields */}
    <div className="space-y-2">
      <label className="text-sm font-medium">Top CAL (Clinical Attachment Level)</label>
      <div className="flex gap-2">
        <Input
          type="number"
          value={getToothData(toothNumber)?.topLeftCal ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              topLeftCal: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
        <Input
          type="number"
          value={getToothData(toothNumber)?.topMidCal ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              topMidCal: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
        <Input
          type="number"
          value={getToothData(toothNumber)?.topRightCal ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              topRightCal: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
      </div>
    </div>

    {/* PPD Fields (shared) */}
    <div className="space-y-2">
      <label className="text-sm font-medium">PPD</label>
      <div className="flex gap-2">
        <Input
          type="number"
          value={getToothData(toothNumber)?.ppdLeft ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              ppdLeft: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
        <Input
          type="number"
          value={getToothData(toothNumber)?.ppdMid ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              ppdMid: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
        <Input
          type="number"
          value={getToothData(toothNumber)?.ppdRight ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              ppdRight: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
      </div>
    </div>

    {/* CEJGM Fields (shared) */}
    <div className="space-y-2">
      <label className="text-sm font-medium">CEJ-GM</label>
      <div className="flex gap-2">
        <Input
          type="number"
          value={getToothData(toothNumber)?.cejgmLeft ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              cejgmLeft: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
        <Input
          type="number"
          value={getToothData(toothNumber)?.cejgmMid ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              cejgmMid: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
        <Input
          type="number"
          value={getToothData(toothNumber)?.cejgmRight ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              cejgmRight: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
      </div>
    </div>

    {/* Furcation Field (for specific teeth) */}
    {hasTopFurcation(toothNumber) && (
      <div className="space-y-2">
        <label className="text-sm font-medium">Furcation</label>
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((state) => (
            <Button
              key={state}
              variant="outline"
              size="sm"
              className={`w-10 h-10 p-0 ${getToothData(toothNumber)?.topFurcation === state ? "border-2 border-gray-800 bg-gray-50" : "border hover:bg-gray-100"}`}
              onClick={() => updateToothData(toothNumber, { topFurcation: state })}
            >
              {renderFurcationIcon(state)}
            </Button>
          ))}
        </div>
      </div>
    )}
  </div>
);

// Helper function to render bottom-focused popover content
export const renderBottomPopoverContent = ({
  toothNumber,
  getToothData,
  updateToothData,
  formatBoolean,
  parseBoolean,
  hasBottomFurcation,
  hasBottomSingleFurcation,
  renderFurcationIcon,
}: PopoverContentProps) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-center">Tooth {toothNumber}</h3>

    {/* CEJGM Fields (shared) */}
    <div className="space-y-2">
      <label className="text-sm font-medium">CEJ-GM</label>
      <div className="flex gap-2">
        <Input
          type="number"
          value={getToothData(toothNumber)?.cejgmLeft ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              cejgmLeft: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
        <Input
          type="number"
          value={getToothData(toothNumber)?.cejgmMid ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              cejgmMid: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
        <Input
          type="number"
          value={getToothData(toothNumber)?.cejgmRight ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              cejgmRight: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
      </div>
    </div>

    {/* PPD Fields (shared) */}
    <div className="space-y-2">
      <label className="text-sm font-medium">PPD</label>
      <div className="flex gap-2">
        <Input
          type="number"
          value={getToothData(toothNumber)?.ppdLeft ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              ppdLeft: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
        <Input
          type="number"
          value={getToothData(toothNumber)?.ppdMid ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              ppdMid: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
        <Input
          type="number"
          value={getToothData(toothNumber)?.ppdRight ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              ppdRight: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
      </div>
    </div>

    {/* Bottom CAL Fields */}
    <div className="space-y-2">
      <label className="text-sm font-medium">CAL</label>
      <div className="flex gap-2">
        <Input
          type="number"
          value={getToothData(toothNumber)?.botLeftCal ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              botLeftCal: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
        <Input
          type="number"
          value={getToothData(toothNumber)?.botMidCal ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              botMidCal: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
        <Input
          type="number"
          value={getToothData(toothNumber)?.botRightCal ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              botRightCal: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
      </div>
    </div>

    {/* Suppuration Field */}
    <div className="space-y-2">
      <label className="text-sm font-medium">Suppuration (+/-)</label>
      <Input
        value={formatBoolean(getToothData(toothNumber)?.sup)}
        onChange={(e) => updateToothData(toothNumber, { sup: parseBoolean(e.target.value) })}
      />
    </div>

    {/* Bottom BOP Fields */}
    <div className="space-y-2">
      <label className="text-sm font-medium">BOP</label>
      <div className="flex gap-2">
        <Input
          type="number"
          value={getToothData(toothNumber)?.botLeftBop ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              botLeftBop: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
        <Input
          type="number"
          value={getToothData(toothNumber)?.botMidBop ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              botMidBop: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
        <Input
          type="number"
          value={getToothData(toothNumber)?.botRightBop ?? ""}
          onChange={(e) =>
            updateToothData(toothNumber, {
              botRightBop: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="flex-1"
        />
      </div>
    </div>

    {/* Bottom PI Field */}
    <div className="space-y-2">
      <label className="text-sm font-medium">PI (+/-)</label>
      <Input
        value={formatBoolean(getToothData(toothNumber)?.bottomPi)}
        onChange={(e) => updateToothData(toothNumber, { bottomPi: parseBoolean(e.target.value) })}
      />
    </div>

    {/* Furcation Fields (for specific teeth) */}
    {hasBottomFurcation(toothNumber) && (
      <div className="space-y-2">
        <label className="text-sm font-medium">Furcation</label>
        <div className="space-y-2">
          <div className="flex gap-1">
            <span className="text-xs text-gray-600 w-16">Furc 1:</span>
            {[0, 1, 2, 3].map((state) => (
              <Button
                key={state}
                variant="outline"
                size="sm"
                className={`w-8 h-8 p-0 ${getToothData(toothNumber)?.bottomFurcation1 === state ? "border-2 border-gray-800 bg-gray-50" : "border hover:bg-gray-100"}`}
                onClick={() => updateToothData(toothNumber, { bottomFurcation1: state })}
              >
                {renderFurcationIcon(state)}
              </Button>
            ))}
          </div>
          <div className="flex gap-1">
            <span className="text-xs text-gray-600 w-16">Furc 2:</span>
            {[0, 1, 2, 3].map((state) => (
              <Button
                key={state}
                variant="outline"
                size="sm"
                className={`w-8 h-8 p-0 ${getToothData(toothNumber)?.bottomFurcation2 === state ? "border-2 border-gray-800 bg-gray-50" : "border hover:bg-gray-100"}`}
                onClick={() => updateToothData(toothNumber, { bottomFurcation2: state })}
              >
                {renderFurcationIcon(state)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    )}

    {/* Single Furcation Field (for teeth that only need one bottom furcation) */}
    {hasBottomSingleFurcation(toothNumber) && (
      <div className="space-y-2">
        <label className="text-sm font-medium">Furcation</label>
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((state) => (
            <Button
              key={state}
              variant="outline"
              size="sm"
              className={`w-10 h-10 p-0 ${getToothData(toothNumber)?.bottomFurcation1 === state ? "border-2 border-gray-800 bg-gray-50" : "border hover:bg-gray-100"}`}
              onClick={() => updateToothData(toothNumber, { bottomFurcation1: state })}
            >
              {renderFurcationIcon(state)}
            </Button>
          ))}
        </div>
      </div>
    )}
  </div>
);
