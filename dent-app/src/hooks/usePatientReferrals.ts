// src/hooks/usePatientReferrals.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createReferralApi,
  getReferralListApi,
  getReferralByIdApi,
  updateReferralApi,
  acceptReferralApi,
  rejectReferralApi,
  deleteReferralApi,
  validateChartNumberApi,
} from "@/services/patientReferralService";
import type {
  CreatePatientReferralRequest,
  UpdatePatientReferralRequest,
  PaginatedReferralResponse,
  PatientReferral,
  ReferralStatus,
} from "@/types/referral";

// Query key factory for hierarchical invalidation
export const referralKeys = {
  all: ["patient-referrals"] as const,
  lists: () => [...referralKeys.all, "list"] as const,
  list: (filters?: {
    page?: number;
    size?: number;
    search?: string;
    treatment?: string;
    sectionOrigin?: string;
    sectionDestination?: string;
    status?: ReferralStatus;
  }) => [...referralKeys.lists(), filters] as const,
  details: () => [...referralKeys.all, "detail"] as const,
  detail: (id: number) => [...referralKeys.details(), id] as const,
  validation: (chartNumber: string) => [...referralKeys.all, "validate", chartNumber] as const,
};

interface UsePatientReferralsParams {
  page?: number;
  size?: number;
  search?: string;
  treatment?: string;
  sectionOrigin?: string;
  sectionDestination?: string;
  status?: ReferralStatus;
}

// Query: Get all referrals with filters
export const usePatientReferrals = (params: UsePatientReferralsParams = {}) => {
  const {
    page = 0,
    size = 10,
    search,
    treatment,
    sectionOrigin,
    sectionDestination,
    status,
  } = params;

  return useQuery<PaginatedReferralResponse>({
    queryKey: referralKeys.list({ page, size, search, treatment, sectionOrigin, sectionDestination, status }),
    queryFn: async () => {
      try {
        const response = await getReferralListApi(
          page,
          size,
          search,
          treatment,
          sectionOrigin,
          sectionDestination,
          status
        );
        return response;
      } catch (error) {
        console.error("Error fetching referrals:", error);
        throw error;
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

// Query: Get referral by ID
export const usePatientReferral = (id?: number) => {
  return useQuery<PatientReferral>({
    queryKey: referralKeys.detail(id!),
    queryFn: async () => {
      if (!id) {
        throw new Error("Referral ID is required");
      }
      try {
        const response = await getReferralByIdApi(id);
        return response;
      } catch (error) {
        console.error(`Error fetching referral ${id}:`, error);
        throw error;
      }
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });
};

// Query: Validate chart number
export const useValidateChartNumber = (chartNumber?: string) => {
  return useQuery({
    queryKey: referralKeys.validation(chartNumber || ""),
    queryFn: async () => {
      if (!chartNumber || chartNumber.trim() === "") {
        return { valid: false };
      }
      try {
        const response = await validateChartNumberApi(chartNumber);
        return response;
      } catch (error) {
        console.error(`Error validating chart number ${chartNumber}:`, error);
        return { valid: false };
      }
    },
    enabled: !!chartNumber && chartNumber.trim() !== "",
    staleTime: 5 * 60 * 1000, // 5 minutes - chart numbers don't change often
    gcTime: 10 * 60 * 1000,
    retry: 1,
  });
};

// Mutation: Create referral
export const useCreateReferral = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePatientReferralRequest) => createReferralApi(data),
    onMutate: async (newReferral) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: referralKeys.lists() });

      // Snapshot previous value
      const previousReferrals = queryClient.getQueryData(referralKeys.lists());

      // Optimistically update - add temporary referral to first page
      queryClient.setQueriesData(
        { queryKey: referralKeys.lists() },
        (old: PaginatedReferralResponse | undefined) => {
          if (!old) return old;

          const optimisticReferral: PatientReferral = {
            referral_id: Date.now(), // Temporary ID
            patient_id: 0,
            chart_number: newReferral.chart_number,
            patient_name: "Loading...",
            treatment: newReferral.treatment,
            specifics: newReferral.specifics,
            age: newReferral.age,
            medical_alert: newReferral.medical_alert,
            section_origin: newReferral.section_origin,
            section_destination: newReferral.section_destination,
            notes: newReferral.notes,
            status: "PENDING",
            referred_by: "You",
            referred_by_id: 0,
            created_at: new Date().toISOString(),
          };

          return {
            ...old,
            content: [optimisticReferral, ...old.content],
            totalElements: old.totalElements + 1,
          };
        }
      );

      return { previousReferrals };
    },
    onError: (err, newReferral, context) => {
      // Rollback on error
      if (context?.previousReferrals) {
        queryClient.setQueryData(referralKeys.lists(), context.previousReferrals);
      }
      console.error("Error creating referral:", err);
    },
    onSuccess: () => {
      // Invalidate all list queries to refetch
      queryClient.invalidateQueries({ queryKey: referralKeys.lists() });
    },
  });
};

// Mutation: Update referral
export const useUpdateReferral = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePatientReferralRequest }) =>
      updateReferralApi(id, data),
    onSuccess: (updatedReferral) => {
      // Update detail cache
      queryClient.setQueryData(
        referralKeys.detail(updatedReferral.referral_id),
        updatedReferral
      );
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: referralKeys.lists() });
    },
  });
};

// Mutation: Accept referral
export const useAcceptReferral = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => acceptReferralApi(id),
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: referralKeys.lists() });

      // Snapshot previous value
      const previousReferrals = queryClient.getQueryData(referralKeys.lists());

      // Optimistically update status
      queryClient.setQueriesData(
        { queryKey: referralKeys.lists() },
        (old: PaginatedReferralResponse | undefined) => {
          if (!old) return old;

          return {
            ...old,
            content: old.content.map((referral) =>
              referral.referral_id === id
                ? { ...referral, status: "ACCEPTED" as ReferralStatus }
                : referral
            ),
          };
        }
      );

      return { previousReferrals };
    },
    onError: (err, id, context) => {
      // Rollback on error
      if (context?.previousReferrals) {
        queryClient.setQueryData(referralKeys.lists(), context.previousReferrals);
      }
      console.error("Error accepting referral:", err);
    },
    onSuccess: (updatedReferral) => {
      // Update detail cache
      queryClient.setQueryData(
        referralKeys.detail(updatedReferral.referral_id),
        updatedReferral
      );
      // Invalidate list queries to get fresh data
      queryClient.invalidateQueries({ queryKey: referralKeys.lists() });
    },
  });
};

// Mutation: Reject referral
export const useRejectReferral = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => rejectReferralApi(id),
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: referralKeys.lists() });

      // Snapshot previous value
      const previousReferrals = queryClient.getQueryData(referralKeys.lists());

      // Optimistically update status
      queryClient.setQueriesData(
        { queryKey: referralKeys.lists() },
        (old: PaginatedReferralResponse | undefined) => {
          if (!old) return old;

          return {
            ...old,
            content: old.content.map((referral) =>
              referral.referral_id === id
                ? { ...referral, status: "REJECTED" as ReferralStatus }
                : referral
            ),
          };
        }
      );

      return { previousReferrals };
    },
    onError: (err, id, context) => {
      // Rollback on error
      if (context?.previousReferrals) {
        queryClient.setQueryData(referralKeys.lists(), context.previousReferrals);
      }
      console.error("Error rejecting referral:", err);
    },
    onSuccess: (updatedReferral) => {
      // Update detail cache
      queryClient.setQueryData(
        referralKeys.detail(updatedReferral.referral_id),
        updatedReferral
      );
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: referralKeys.lists() });
    },
  });
};

// Mutation: Delete referral
export const useDeleteReferral = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteReferralApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: referralKeys.all });
    },
  });
};
