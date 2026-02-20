// src/actions/physicalAssessmentActions.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function addPhysicalAssessmentApi(formData: any) {
  const response = await fetch(`${API_URL}/physical-assessment/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Failed to add physical assessment");
  }
  return response.json();
}

export async function getLatestPhysicalAssessmentIdApi() {
  const response = await fetch(`${API_URL}/physical-assessment/getLatestID`);
  if (!response.ok) {
    throw new Error("Failed to fetch latest physical assessment ID");
  }
  return response.json();
}

export async function getPhysicalAssessmentByIdApi(physicalAssessmentId: number) {
  const response = await fetch(
    `${API_URL}/physical-assessment/findById?physicalAssessmentId=${physicalAssessmentId}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch physical assessment by ID");
  }
  return response.json();
}

export async function getPhysicalAssessmentsByPatientIdApi(patientId: number) {
  const response = await fetch(
    `${API_URL}/physical-assessment/findByPatientId?patientId=${patientId}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch physical assessments by patient ID");
  }
  return response.json();
}

export async function editPhysicalAssessmentApi(physicalAssessmentId: number, formData: any) {
  const response = await fetch(
    `${API_URL}/physical-assessment/edit?physicalAssessmentId=${physicalAssessmentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    },
  );
  if (!response.ok) {
    throw new Error("Failed to edit physical assessment");
  }
  return response.json();
}
