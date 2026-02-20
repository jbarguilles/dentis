// src/services/patientService.ts

import { apiRequest } from "./api";

export async function registerPatientApi(formData: any) {
  return apiRequest("/patient/register", {
    method: "POST",
    body: JSON.stringify(formData),
  });
}

export async function getLatestPatientIdApi() {
  return apiRequest("/patient/getLatestID");
}

export async function getPatientByNumberApi(patientNumber: string) {
  return apiRequest(`/patient/findByPatientNumber?patientNumber=${patientNumber}`);
}

export async function getPatientList() {
  return apiRequest("/patient/list");
}
