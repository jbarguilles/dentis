"use server";

import chartRequestService, {
  ChartViewingRequestData,
  ChartEditingRequestData,
  ChartRequestResponse,
} from "../services/chartRequestService";

export interface ChartViewingFormData {
  requesterName: string;
  date: Date | undefined;
  purpose: string;
  chartNumber: string;
  section: string;
}

export interface ChartEditingFormData {
  requesterName: string;
  crfDate: string;
  time: string;
  purpose: string;
  chartNumberRequested: string;
  section: string;
}

export interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Submit a chart viewing request
export async function submitChartViewingRequest(
  formData: ChartViewingFormData,
): Promise<ActionResult<ChartRequestResponse>> {
  try {
    // Validate required fields
    if (!formData.requesterName?.trim()) {
      return { success: false, error: "Requester name is required" };
    }
    if (!formData.date) {
      return { success: false, error: "Date is required" };
    }
    if (!formData.purpose?.trim()) {
      return { success: false, error: "Purpose is required" };
    }
    if (!formData.chartNumber?.trim()) {
      return { success: false, error: "Chart number is required" };
    }
    if (!formData.section?.trim()) {
      return { success: false, error: "Section is required" };
    }

    // Transform form data to match API expectations
    const requestData: ChartViewingRequestData = {
      requester_name: formData.requesterName.trim(),
      crf_date: formData.date.toISOString().split("T")[0], // Format as YYYY-MM-DD
      purpose: formData.purpose.trim(),
      chart_number_requested: formData.chartNumber.trim(),
      section: formData.section.trim(),
      type: "viewing",
    };

    const response = await chartRequestService.submitChartViewingRequest(requestData);

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error("Error in submitChartViewingRequest action:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to submit chart viewing request",
    };
  }
}

// Submit a chart editing request
export async function submitChartEditingRequest(
  formData: ChartEditingFormData,
): Promise<ActionResult<ChartRequestResponse>> {
  try {
    // Validate required fields
    if (!formData.requesterName?.trim()) {
      return { success: false, error: "Requester name is required" };
    }
    if (!formData.crfDate) {
      return { success: false, error: "Date is required" };
    }
    if (!formData.time?.trim()) {
      return { success: false, error: "Time is required" };
    }
    if (!formData.purpose?.trim()) {
      return { success: false, error: "Purpose is required" };
    }
    if (!formData.chartNumberRequested?.trim()) {
      return { success: false, error: "Chart number is required" };
    }
    if (!formData.section?.trim()) {
      return { success: false, error: "Section is required" };
    }

    // Combine date and time for the API
    const dateTime = new Date(`${formData.crfDate}T${formData.time}`);

    // Transform form data to match API expectations
    const requestData: ChartEditingRequestData = {
      requester_name: formData.requesterName.trim(),
      crf_date: formData.crfDate,
      time: dateTime.toISOString(), // Convert to ISO string for the API
      purpose: formData.purpose.trim(),
      chart_number_requested: formData.chartNumberRequested.trim(),
      section: formData.section.trim(),
      type: "editing",
    };

    const response = await chartRequestService.submitChartEditingRequest(requestData);

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error("Error in submitChartEditingRequest action:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to submit chart editing request",
    };
  }
}

// Get all chart requests (for staff/faculty)
export async function getAllChartRequests(): Promise<ActionResult<ChartRequestResponse[]>> {
  try {
    const requests = await chartRequestService.getAllChartRequests();
    return {
      success: true,
      data: requests,
    };
  } catch (error) {
    console.error("Error in getAllChartRequests action:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch chart requests",
    };
  }
}

// Get chart requests by requester (for clinicians)
export async function getChartRequestsByRequester(
  requesterName: string,
): Promise<ActionResult<ChartRequestResponse[]>> {
  try {
    if (!requesterName?.trim()) {
      return { success: false, error: "Requester name is required" };
    }

    const requests = await chartRequestService.getChartRequestsByRequester(requesterName.trim());
    return {
      success: true,
      data: requests,
    };
  } catch (error) {
    console.error("Error in getChartRequestsByRequester action:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch chart requests",
    };
  }
}

// Get chart requests by type (for filtering)
export async function getChartRequestsByType(
  type: "viewing" | "editing",
): Promise<ActionResult<ChartRequestResponse[]>> {
  try {
    const requests = await chartRequestService.getChartRequestsByType(type);
    return {
      success: true,
      data: requests,
    };
  } catch (error) {
    console.error("Error in getChartRequestsByType action:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch chart requests",
    };
  }
}

// Update chart request status (for staff/faculty)
export async function updateChartRequestStatus(
  id: number,
  status: string,
): Promise<ActionResult<ChartRequestResponse>> {
  try {
    if (!id || id <= 0) {
      return { success: false, error: "Valid request ID is required" };
    }
    if (!status?.trim()) {
      return { success: false, error: "Status is required" };
    }

    const updatedRequest = await chartRequestService.updateChartRequestStatus(id, status.trim());
    return {
      success: true,
      data: updatedRequest,
    };
  } catch (error) {
    console.error("Error in updateChartRequestStatus action:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update chart request status",
    };
  }
}

// Delete a chart request
export async function deleteChartRequest(id: number): Promise<ActionResult<void>> {
  try {
    if (!id || id <= 0) {
      return { success: false, error: "Valid request ID is required" };
    }

    await chartRequestService.deleteChartRequest(id);
    return {
      success: true,
    };
  } catch (error) {
    console.error("Error in deleteChartRequest action:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete chart request",
    };
  }
}
