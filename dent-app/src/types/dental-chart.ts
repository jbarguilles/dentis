export interface ToothValues {
  top: number;
  right: number;
  bottom: number;
  left: number;
  center: number;
}

export interface DentalChartData {
  treatmentPlanValuesArrayTop: ToothValues[];
  treatmentPlanValuesArrayBottom: ToothValues[];
  lesionStatusValuesArrayTop: ToothValues[];
  lesionStatusValuesArrayBottom: ToothValues[];
  icdasValuesArrayTop: ToothValues[];
  icdasValuesArrayBottom: ToothValues[];
  existingConditionTop: string[][];
  existingConditionBottom: string[][];
  drawings: { [key: string]: string };
  extractedTeeth: { [key: string]: boolean };
}

export interface ConditionOption {
  code: string;
  label: string;
}
