import { PatientInterviewData } from "./patient-interview";
import { ProblemListData } from "./problem-list";
import { DentalChartData } from "./dental-chart";
import { PatientInformationData } from "@/components/patient-record-components/patient-information/patient-information.type";
import { PhysicalAssessmentData } from "@/components/patient-record-components/physical-assessment/physical-assessment.type";

export interface SoftTissueExaminationData {
  patientId: number;
  date: string;
  headNeckTmj: string;
  lipsFrenum: string;
  mucosa: string;
  palate: string;
  pharynx: string;
  floorMouth: string;
  tongue: string;
  lymphNodes: string;
  salivaryGland: string;
  thyroid: string;
  gingiva: string;
  // Image paths (stored in database)
  mouthImagePath?: string;
  neckImagePath?: string;
  tongueImagePath?: string;
  underTongueImagePath?: string;
  // Local drawing data (not stored in database)
  drawings?: { [key: string]: string };
}

export interface PatientRecordData {
  patientInformationData: PatientInformationData;
  patientInterviewData: PatientInterviewData; // You can replace 'any' with a more specific type if available
  physicalAssessmentData: PhysicalAssessmentData;
  softTissueData: SoftTissueExaminationData;
  dentalStatusData: {
    teethNotes: string;
    dentalChartData?: DentalChartData;
  };
  periodontalChartData: {
    upperTeeth: {
      measurements: {
        bop: string[][][];
        mobility: string[];
        cal: string[][][];
        ppd: string[][][];
        cejGm: string[][][];
      };
      buttonStates: Record<string, boolean>;
    };
    lowerTeeth: {
      measurements: {
        bop: string[][][];
        mobility: string[];
        cal: string[][][];
        ppd: string[][][];
        cejGm: string[][][];
      };
      buttonStates: Record<string, boolean>;
    };
  };
  radiographicData: {
    entries: Array<{
      id: string;
      radiographType: string;
      findings: string;
      image: File | null;
      imageData: string | null;
      previewUrl: string;
    }>;
  };
  problemListData: ProblemListData;
}
