// src/services/physicalAssessmentService.ts

import { apiRequest } from "./api";

export async function addPhysicalAssessmentApi(formData: any) {
  return apiRequest("/physical-assessment/add", {
    method: "POST",
    body: JSON.stringify(formData),
  });
}

export async function getLatestPhysicalAssessmentIdApi() {
  return apiRequest("/physical-assessment/getLatestID");
}

export async function getPhysicalAssessmentByIdApi(physicalAssessmentId: number) {
  return apiRequest(`/physical-assessment/findById?physicalAssessmentId=${physicalAssessmentId}`);
}

export async function getPhysicalAssessmentsByPatientIdApi(patientId: number) {
  return apiRequest(`/physical-assessment/findByPatientId?patientId=${patientId}`);
}

export async function getPhysicalAssessmentsByPatientNumberApi(patientNumber: string) {
  return apiRequest(`/physical-assessment/findByPatientNumber?patientNumber=${patientNumber}`);
}

export async function getLatestPhysicalAssessmentByPatientNumberApi(patientNumber: string) {
  return apiRequest(
    `/physical-assessment/findLatestByPatientNumber?patientNumber=${patientNumber}`,
  );
}

export async function editPhysicalAssessmentApi(physicalAssessmentId: number, formData: any) {
  return apiRequest(`/physical-assessment/edit?physicalAssessmentId=${physicalAssessmentId}`, {
    method: "PUT",
    body: JSON.stringify(formData),
  });
}
