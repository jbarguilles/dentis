// src/actions/softTissueExaminationActions.ts

import { SoftTissueExaminationData } from "../types/patient-record";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Backend DTO format (matches Java DTO)
interface AddSoftTissueExaminationDTO {
  patientNumber: number;
  DATE: string;
  HEAD_NECK_TMJ: string;
  LIPS_FRENUM: string;
  MUCOSA: string;
  PALATE: string;
  PHARYNX: string;
  FLOOR_OF_MOUTH: string;
  TONGUE: string;
  LYMPH_NODES: string;
  SALIVARY_GLAND: string;
  THYROID: string;
  GINGIVA: string;
  // Image data as byte arrays (following Chart pattern)
  mouth_image_data?: number[];
  neck_image_data?: number[];
  tongue_image_data?: number[];
  under_tongue_image_data?: number[];
  // Image paths (still keep for reference)
  mouth_image_path?: string;
  neck_image_path?: string;
  tongue_image_path?: string;
  under_tongue_image_path?: string;
}

// API Response types
interface SaveDrawingImageResponse {
  success: boolean;
  image_path: string;
}

interface SoftTissueExaminationResponse {
  steId: number;
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
  mouthImagePath?: string;
  neckImagePath?: string;
  tongueImagePath?: string;
  underTongueImagePath?: string;
}

interface LatestIdResponse {
  latestId: number;
}

export async function addSoftTissueExaminationApi(
  formData: AddSoftTissueExaminationDTO,
): Promise<SoftTissueExaminationResponse> {
  const response = await fetch(`${API_URL}/soft-tissue-examination/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Failed to add soft tissue examination");
  }
  return response.json();
}

export async function getLatestSoftTissueExaminationIdApi(): Promise<LatestIdResponse> {
  const response = await fetch(`${API_URL}/soft-tissue-examination/getLatestID`);
  if (!response.ok) {
    throw new Error("Failed to fetch latest soft tissue examination ID");
  }
  return response.json();
}

export async function getSoftTissueExaminationByIdApi(
  steId: number,
): Promise<SoftTissueExaminationResponse> {
  const response = await fetch(`${API_URL}/soft-tissue-examination/findById?steId=${steId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch soft tissue examination by ID");
  }
  return response.json();
}

export async function getSoftTissueExaminationsByPatientIdApi(
  patientId: number,
): Promise<SoftTissueExaminationResponse[]> {
  const response = await fetch(
    `${API_URL}/soft-tissue-examination/findByPatientId?patientId=${patientId}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch soft tissue examinations by patient ID");
  }
  return response.json();
}

export async function editSoftTissueExaminationApi(
  steId: number,
  formData: Partial<SoftTissueExaminationData>,
): Promise<SoftTissueExaminationResponse> {
  const response = await fetch(`${API_URL}/soft-tissue-examination/edit?steId=${steId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Failed to edit soft tissue examination");
  }
  return response.json();
}

export async function saveDrawingImageApi(
  patientId: number,
  imageType: string,
  imageDataUrl: string,
): Promise<SaveDrawingImageResponse> {
  // Convert base64 data URL to blob
  const response = await fetch(imageDataUrl);
  const blob = await response.blob();

  // Create FormData for multipart upload
  const formData = new FormData();
  formData.append("patient_id", patientId.toString());
  formData.append("image_type", imageType);
  formData.append("image_data", blob, `${imageType}_drawing.png`);

  const apiResponse = await fetch(`${API_URL}/soft-tissue-examination/save-drawing`, {
    method: "POST",
    body: formData, // Don't set Content-Type header, let browser set it for multipart
  });

  if (!apiResponse.ok) {
    throw new Error("Failed to save drawing image");
  }

  return apiResponse.json();
}
