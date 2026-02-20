// src/api/patient.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerPatientApi(formData: any) {
  const response = await fetch(`${API_URL}/patient/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Failed to register patient");
  }
  return response.json();
}

export async function getLatestPatientIdApi() {
  const response = await fetch(`${API_URL}/patient/getLatestID`);
  if (!response.ok) {
    throw new Error("Failed to fetch latest patient ID");
  }
  return response.json();
}

export async function getPatientByNumberApi(patientNumber: string) {
  const response = await fetch(
    `${API_URL}/patient/findByPatientNumber?patientNumber=${patientNumber}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch patient by number");
  }
  return response.json();
}
