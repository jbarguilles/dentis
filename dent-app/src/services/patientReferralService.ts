// src/services/patientReferralService.ts

import { apiRequest } from "./api";
import type {
  CreatePatientReferralRequest,
  UpdatePatientReferralRequest,
  PaginatedReferralResponse,
  PatientReferral,
  ReferralStatus,
  ChartNumberValidationResponse,
} from "@/types/referral";

export async function createReferralApi(data: CreatePatientReferralRequest): Promise<PatientReferral> {
  return apiRequest("/patient-referral/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getReferralListApi(
  page: number = 0,
  size: number = 10,
  search?: string,
  treatment?: string,
  sectionOrigin?: string,
  sectionDestination?: string,
  status?: ReferralStatus
): Promise<PaginatedReferralResponse> {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("size", size.toString());
  
  if (search) params.append("search", search);
  if (treatment) params.append("treatment", treatment);
  if (sectionOrigin) params.append("sectionOrigin", sectionOrigin);
  if (sectionDestination) params.append("sectionDestination", sectionDestination);
  if (status) params.append("status", status);

  return apiRequest(`/patient-referral/list?${params.toString()}`);
}

export async function getReferralByIdApi(id: number): Promise<PatientReferral> {
  return apiRequest(`/patient-referral/findById?id=${id}`);
}

export async function updateReferralApi(
  id: number,
  data: UpdatePatientReferralRequest
): Promise<PatientReferral> {
  return apiRequest(`/patient-referral/edit?id=${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function acceptReferralApi(id: number): Promise<PatientReferral> {
  return apiRequest(`/patient-referral/accept?id=${id}`, {
    method: "PUT",
  });
}

export async function rejectReferralApi(id: number): Promise<PatientReferral> {
  return apiRequest(`/patient-referral/reject?id=${id}`, {
    method: "PUT",
  });
}

export async function deleteReferralApi(id: number): Promise<{ message: string }> {
  return apiRequest(`/patient-referral/delete?id=${id}`, {
    method: "DELETE",
  });
}

export async function validateChartNumberApi(chartNumber: string): Promise<ChartNumberValidationResponse> {
  return apiRequest(`/patient-referral/validate-chart?chartNumber=${chartNumber}`);
}
