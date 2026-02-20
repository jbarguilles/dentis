import { useQuery } from "@tanstack/react-query";
import { getPatientList, getPatientByNumberApi } from "@/services/patientService";
import { PatientListResponse } from "@/types/patients";

export const patientKeys = {
  all: ["patients"] as const,
  lists: () => [...patientKeys.all, "list"] as const,
  list: (filters?: Record<string, any>) => [...patientKeys.lists(), filters] as const,
  details: () => [...patientKeys.all, "detail"] as const,
  detail: (id: string | number) => [...patientKeys.details(), id] as const,
};

export interface Patient {
  id: string;
  patientNumber: string;
  name: string;
  // Include all the additional fields from PatientResponse
  patientID?: number;
  registrationDate?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  suffix?: string;
  sex?: string;
  civilStatus?: string;
  birthdate?: string;
  age?: number;
  contactNumber?: string;
  emergencyContact?: string;
  emergencyNumber?: string;
  emergencyRelationship?: string;
  houseStreetSubdivision?: string;
  barangay?: string;
  city?: string;
  province?: string;
  region?: string;
  createdAt?: string;
  charts?: any[];
}

export const usePatients = () => {
  return useQuery<PatientListResponse[]>({
    queryKey: patientKeys.all,
    queryFn: async () => {
      try {
        const response = await getPatientList();
        if (!Array.isArray(response)) {
          return [];
        }
        return response;
      } catch (error) {
        console.error("Error fetching patients:", error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1, // Only retry once
  });
};

export const usePatientByNumber = (patientNumber?: string) => {
  return useQuery<Patient>({
    queryKey: ["patient", patientNumber],
    queryFn: async () => {
      if (!patientNumber) {
        throw new Error("Patient number is required");
      }
      try {
        const response = await getPatientByNumberApi(patientNumber);
        return response as Patient;
      } catch (error) {
        console.error(`Error fetching patient ${patientNumber}:`, error);
        throw error;
      }
    },
    enabled: !!patientNumber, // Only run query if patientNumber is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1, // Only retry once
  });
};
