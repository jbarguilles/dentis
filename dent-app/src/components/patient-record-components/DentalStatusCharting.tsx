import React, { useState } from "react";
import { Plus, ExternalLink, ChevronDown, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ASChart from "./ASChart";
import { DentalChartData, ToothValues } from "@/types/dental-chart";
import { Dispatch, SetStateAction } from "react";
import PeriodontalChart from "./periodontal-chart/PeriodontalChart";

type ChartType =
  | "Dental Chart"
  | "Periodontal Chart"
  | "Orthodontic Chart"
  | "Treatment Plan Chart"
  | "X-Ray Chart";

interface Chart {
  id: string;
  type: ChartType;
  createdAt: Date | string;
}

interface DentalStatusChartingProps {
  patientNumber?: string;
  dentalChartData?: DentalChartData;
  onDentalChartUpdate?: (updates: Partial<DentalChartData>) => void;
  // AS Chart specific props
  treatmentPlanValuesArrayTop?: ToothValues[];
  setTreatmentPlanValuesArrayTop?: Dispatch<SetStateAction<ToothValues[]>>;
  treatmentPlanValuesArrayBottom?: ToothValues[];
  setTreatmentPlanValuesArrayBottom?: Dispatch<SetStateAction<ToothValues[]>>;
  lesionStatusValuesArrayTop?: ToothValues[];
  setLesionStatusValuesArrayTop?: Dispatch<SetStateAction<ToothValues[]>>;
  lesionStatusValuesArrayBottom?: ToothValues[];
  setLesionStatusValuesArrayBottom?: Dispatch<SetStateAction<ToothValues[]>>;
  icdasValuesArrayTop?: ToothValues[];
  setIcdasValuesArrayTop?: Dispatch<SetStateAction<ToothValues[]>>;
  icdasValuesArrayBottom?: ToothValues[];
  setIcdasValuesArrayBottom?: Dispatch<SetStateAction<ToothValues[]>>;
  existingConditionTop?: string[][];
  setExistingConditionTop?: Dispatch<SetStateAction<string[][]>>;
  existingConditionBottom?: string[][];
  setExistingConditionBottom?: Dispatch<SetStateAction<string[][]>>;
  drawings?: { [key: string]: string };
  setDrawings?: Dispatch<SetStateAction<{ [key: string]: string }>>;
  extractedTeeth?: { [key: string]: boolean };
  setExtractedTeeth?: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
}

function DentalStatusCharting({
  patientNumber,
  dentalChartData,
  onDentalChartUpdate,
}: DentalStatusChartingProps = {}) {
  // Initialize charts array - start with empty array
  const [charts, setCharts] = useState<Chart[]>([]);
  const router = useRouter();
  
  // Persist patientNumber to sessionStorage and retrieve it if needed
  const [currentPatientNumber, setCurrentPatientNumber] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return patientNumber || sessionStorage.getItem('currentPatientNumber') || 'unknown';
    }
    return patientNumber || 'unknown';
  });

  // Update sessionStorage whenever patientNumber prop changes
  React.useEffect(() => {
    if (patientNumber && typeof window !== 'undefined') {
      sessionStorage.setItem('currentPatientNumber', patientNumber);
      setCurrentPatientNumber(patientNumber);
    }
  }, [patientNumber]);

  const getChartRoute = (chartType: ChartType): string => {
    const routes: Record<ChartType, string> = {
      "Dental Chart": "dental-chart",
      "Periodontal Chart": "periodontal-chart",
      "Orthodontic Chart": "orthodontic-chart",
      "Treatment Plan Chart": "treatment-plan-chart",
      "X-Ray Chart": "x-ray-chart",
    };
    return `/patient-admission/${currentPatientNumber}/${routes[chartType]}`;
  };

  // Initialize arrays for 16 teeth (standard dental chart)
  const initializeTeethValues = (): ToothValues[] =>
    Array(16)
      .fill(null)
      .map(() => ({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        center: 0,
      }));

  // Store chart data in local state instead of sessionStorage
  const [chartDataStore, setChartDataStore] = useState<{ [chartId: string]: DentalChartData }>({});

  // Initialize with external dental chart data if provided
  React.useEffect(() => {
    if (dentalChartData) {
      // Create a default dental chart if one doesn't exist
      const defaultChart: Chart = {
        id: "main-dental-chart",
        type: "Dental Chart",
        createdAt: new Date(),
      };

      // Only add the chart if it doesn't already exist
      setCharts((prevCharts) => {
        const chartExists = prevCharts.some((chart) => chart.id === defaultChart.id);
        if (!chartExists) {
          return [defaultChart];
        }
        return prevCharts;
      });

      // Always update the chart data store with the latest data
      setChartDataStore((prev) => ({
        ...prev,
        [defaultChart.id]: dentalChartData,
      }));
    }
  }, [dentalChartData]);

  // Get chart data for a specific chart, with fallback to default values
  const getChartData = (chartId: string): DentalChartData => {
    return (
      chartDataStore[chartId] || {
        treatmentPlanValuesArrayTop: initializeTeethValues(),
        treatmentPlanValuesArrayBottom: initializeTeethValues(),
        lesionStatusValuesArrayTop: initializeTeethValues(),
        lesionStatusValuesArrayBottom: initializeTeethValues(),
        icdasValuesArrayTop: initializeTeethValues(),
        icdasValuesArrayBottom: initializeTeethValues(),
        existingConditionTop: Array(16)
          .fill(null)
          .map(() => []),
        existingConditionBottom: Array(16)
          .fill(null)
          .map(() => []),
        drawings: {},
        extractedTeeth: {},
      }
    );
  };

  // Update chart data for a specific chart
  const updateChartData = (chartId: string, updates: Partial<DentalChartData>) => {
    const updatedData = {
      ...getChartData(chartId),
      ...updates,
    };

    setChartDataStore((prev) => ({
      ...prev,
      [chartId]: updatedData,
    }));

    // If this is the main dental chart and we have an external update handler, call it
    if (
      (chartId === "main-dental-chart" || chartId.includes("Dental Chart")) &&
      onDentalChartUpdate
    ) {
      onDentalChartUpdate(updatedData);
    }
  };

  const chartTypes: ChartType[] = [
    "Dental Chart",
    "Periodontal Chart",
    "Orthodontic Chart",
    "Treatment Plan Chart",
    "X-Ray Chart",
  ];

  const deleteChart = (chartId: string) => {
    const chart = charts.find((c) => c.id === chartId);
    if (
      chart &&
      window.confirm(
        `Are you sure you want to delete the ${chart.type}? This action cannot be undone.`,
      )
    ) {
      setCharts(charts.filter((chart) => chart.id !== chartId));
      // Remove chart data from store
      setChartDataStore((prev) => {
        const newStore = { ...prev };
        delete newStore[chartId];
        return newStore;
      });
    }
  };

  const addChart = (type: ChartType) => {
    // Check if chart of this type already exists
    const existingChart = charts.find((chart) => chart.type === type);
    if (existingChart) {
      // Better UX: You could replace this with a toast notification if available
      console.warn(`A ${type} already exists. You can only have one chart of each type.`);
      return;
    }

    const newChart: Chart = {
      id: `chart-${Date.now()}`,
      type,
      createdAt: new Date(),
    };
    setCharts([...charts, newChart]);

    // Initialize chart data for the new chart
    const initialData: DentalChartData = {
      treatmentPlanValuesArrayTop: initializeTeethValues(),
      treatmentPlanValuesArrayBottom: initializeTeethValues(),
      lesionStatusValuesArrayTop: initializeTeethValues(),
      lesionStatusValuesArrayBottom: initializeTeethValues(),
      icdasValuesArrayTop: initializeTeethValues(),
      icdasValuesArrayBottom: initializeTeethValues(),
      existingConditionTop: Array(16)
        .fill(null)
        .map(() => []),
      existingConditionBottom: Array(16)
        .fill(null)
        .map(() => []),
      drawings: {},
      extractedTeeth: {},
    };

    setChartDataStore((prev) => ({
      ...prev,
      [newChart.id]: initialData,
    }));
  };

  const formatDate = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderChartContent = (chart: Chart) => {
    const chartData = getChartData(chart.id);

    // Create chart-specific handlers
    const defaultHandleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      // This function can be removed or kept for future form functionality
      console.log("Form change:", e.target.name, e.target.value);
    };

    const createSetter = (key: string) => (value: any) => {
      updateChartData(chart.id, { [key]: value });
    };

    switch (chart.type) {
      case "Dental Chart":
        return <ASChart />;
      case "Periodontal Chart":
        return <PeriodontalChart />;
      case "Orthodontic Chart":
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Orthodontic Chart</h3>
            <p className="text-muted-foreground">
              Orthodontic treatment chart content will be displayed here.
            </p>
            {/* Add your orthodontic chart component here */}
          </div>
        );
      case "Treatment Plan Chart":
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Treatment Plan Chart</h3>
            <p className="text-muted-foreground">
              Treatment plan chart content will be displayed here.
            </p>
            {/* Add your treatment plan chart component here */}
          </div>
        );
      case "X-Ray Chart":
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">X-Ray Chart</h3>
            <p className="text-muted-foreground">X-ray chart content will be displayed here.</p>
            {/* Add your x-ray chart component here */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Dental Charts</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="hover:cursor-pointer">
              <Plus className="w-4 h-4 mr-2" />
              Add Chart
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {chartTypes.map((chartType) => {
              const isAlreadyCreated = charts.some((chart) => chart.type === chartType);
              return (
                <DropdownMenuItem
                  key={chartType}
                  onClick={() => !isAlreadyCreated && addChart(chartType)}
                  className={`hover:cursor-pointer ${isAlreadyCreated ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isAlreadyCreated}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {chartType}
                  {isAlreadyCreated && (
                    <span className="ml-auto text-xs text-gray-500">Already created</span>
                  )}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {charts.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <p className="text-muted-foreground text-lg mb-4">No charts created yet</p>
          <p className="text-sm text-muted-foreground">
            Click the buttons above to add your first chart
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {charts.map((chart) => (
            <Card key={chart.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{chart.type}</CardTitle>
                    <CardDescription className="mt-1">
                      Created: {formatDate(chart.createdAt)}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hover:cursor-pointer h-8 w-8"
                      onClick={() => router.push(getChartRoute(chart.type))}
                      title="Open chart"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hover:cursor-pointer h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => deleteChart(chart.id)}
                      title="Delete chart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default DentalStatusCharting;
