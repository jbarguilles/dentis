import { create } from "zustand";
import { DentalChartData, ToothValues } from "@/types/dental-chart";

// Initialize empty tooth values
const initializeToothValues = (): ToothValues[] =>
  Array(16)
    .fill(null)
    .map(() => ({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      center: 0,
    }));

// Initialize empty dental chart data
const initializeDentalChartData = (): DentalChartData => ({
  treatmentPlanValuesArrayTop: initializeToothValues(),
  treatmentPlanValuesArrayBottom: initializeToothValues(),
  lesionStatusValuesArrayTop: initializeToothValues(),
  lesionStatusValuesArrayBottom: initializeToothValues(),
  icdasValuesArrayTop: initializeToothValues(),
  icdasValuesArrayBottom: initializeToothValues(),
  existingConditionTop: Array(16)
    .fill(null)
    .map(() => []),
  existingConditionBottom: Array(16)
    .fill(null)
    .map(() => []),
  drawings: {},
  extractedTeeth: {},
});

interface DentalChartStore {
  chartData: DentalChartData;
  updateChartData: (data: DentalChartData) => void;
  updateToothValues: (
    arrayType:
      | "treatmentPlanValuesArrayTop"
      | "treatmentPlanValuesArrayBottom"
      | "lesionStatusValuesArrayTop"
      | "lesionStatusValuesArrayBottom"
      | "icdasValuesArrayTop"
      | "icdasValuesArrayBottom",
    index: number,
    values: ToothValues,
  ) => void;
  updateExistingCondition: (
    arrayType: "existingConditionTop" | "existingConditionBottom",
    index: number,
    conditions: string[],
  ) => void;
  updateDrawing: (key: string, dataUrl: string) => void;
  updateExtractedTooth: (key: string, extracted: boolean) => void;
  resetChartData: () => void;
  loadChartData: (data: DentalChartData) => void;
}

export const useDentalChartStore = create<DentalChartStore>((set, get) => ({
  chartData: initializeDentalChartData(),

  updateChartData: (data: DentalChartData) => {
    set({ chartData: data });
  },

  updateToothValues: (
    arrayType:
      | "treatmentPlanValuesArrayTop"
      | "treatmentPlanValuesArrayBottom"
      | "lesionStatusValuesArrayTop"
      | "lesionStatusValuesArrayBottom"
      | "icdasValuesArrayTop"
      | "icdasValuesArrayBottom",
    index: number,
    values: ToothValues,
  ) => {
    set((state) => {
      const newChartData = { ...state.chartData };
      const newArray = [...newChartData[arrayType]];
      newArray[index] = values;
      newChartData[arrayType] = newArray;
      return { chartData: newChartData };
    });
  },

  updateExistingCondition: (
    arrayType: "existingConditionTop" | "existingConditionBottom",
    index: number,
    conditions: string[],
  ) => {
    set((state) => {
      const newChartData = { ...state.chartData };
      const newArray = [...newChartData[arrayType]];
      newArray[index] = conditions;
      newChartData[arrayType] = newArray;
      return { chartData: newChartData };
    });
  },

  updateDrawing: (key: string, dataUrl: string) => {
    set((state) => ({
      chartData: {
        ...state.chartData,
        drawings: {
          ...state.chartData.drawings,
          [key]: dataUrl,
        },
      },
    }));
  },

  updateExtractedTooth: (key: string, extracted: boolean) => {
    set((state) => ({
      chartData: {
        ...state.chartData,
        extractedTeeth: {
          ...state.chartData.extractedTeeth,
          [key]: extracted,
        },
      },
    }));
  },

  resetChartData: () => {
    set({ chartData: initializeDentalChartData() });
  },

  loadChartData: (data: DentalChartData) => {
    set({ chartData: data });
  },
}));
