import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPhysicalAssessmentsByPatientNumberApi,
  getLatestPhysicalAssessmentByPatientNumberApi,
  addPhysicalAssessmentApi,
  editPhysicalAssessmentApi,
} from "@/services/physicalAssessmentService";

export interface PhysicalAssessmentResponse {
  physicalAssessmentId: number;
  patientId: number;
  date: string;
  gait: string;
  appearance: string;
  defects: string;
  weight: number;
  height: number;
  bloodPressure: string;
  pulseRate: number;
  respiratoryRate: number;
  temperature: number;
  createdAt: string;
}

export const physicalAssessmentKeys = {
  all: ["physicalAssessments"] as const,
  lists: () => [...physicalAssessmentKeys.all, "list"] as const,
  list: (filters?: Record<string, any>) => [...physicalAssessmentKeys.lists(), filters] as const,
  details: () => [...physicalAssessmentKeys.all, "detail"] as const,
  detail: (id: string | number) => [...physicalAssessmentKeys.details(), id] as const,
  byPatientNumber: (patientNumber: string) =>
    [...physicalAssessmentKeys.all, "patientNumber", patientNumber] as const,
  latestByPatientNumber: (patientNumber: string) =>
    [...physicalAssessmentKeys.all, "latest", patientNumber] as const,
};

export const usePhysicalAssessmentByPatientNumber = (patientNumber: string) => {
  return useQuery({
    queryKey: physicalAssessmentKeys.byPatientNumber(patientNumber),
    queryFn: async () => {
      const response = await getPhysicalAssessmentsByPatientNumberApi(patientNumber);
      return response;
    },
    enabled: !!patientNumber,
  });
};

export const useLatestPhysicalAssessmentByPatientNumber = (patientNumber: string) => {
  return useQuery<PhysicalAssessmentResponse>({
    queryKey: physicalAssessmentKeys.latestByPatientNumber(patientNumber),
    queryFn: async () => {
      const response = await getLatestPhysicalAssessmentByPatientNumberApi(patientNumber);
      return response as PhysicalAssessmentResponse;
    },
    enabled: !!patientNumber,
  });
};

export const useSavePhysicalAssessment = () => {
  const queryClient = useQueryClient();

  return useMutation<
    PhysicalAssessmentResponse,
    Error,
    {
      physicalAssessmentId?: number;
      formData: any;
    }
  >({
    mutationFn: async ({
      physicalAssessmentId,
      formData,
    }: {
      physicalAssessmentId?: number;
      formData: any;
    }) => {
      if (physicalAssessmentId) {
        return (await editPhysicalAssessmentApi(
          physicalAssessmentId,
          formData,
        )) as PhysicalAssessmentResponse;
      } else {
        return (await addPhysicalAssessmentApi(formData)) as PhysicalAssessmentResponse;
      }
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch queries
      queryClient.invalidateQueries({ queryKey: physicalAssessmentKeys.all });
    },
  });
};

