import { apiRequest } from "./api";

export interface ChartViewingRequestData {
  requester_name: string;
  crf_date: string;
  purpose: string;
  chart_number_requested: string;
  section: string;
  type: "viewing";
}

export interface ChartEditingRequestData {
  requester_name: string;
  crf_date: string;
  time: string;
  purpose: string;
  chart_number_requested: string;
  section: string;
  type: "editing";
}

export interface ChartRequestResponse {
  crfId: number;
  requesterName: string;
  crfDate: string;
  time?: string;
  purpose: string;
  chartNumberRequested: number;
  section: string;
  status: string;
  type: "viewing" | "editing";
}

class ChartRequestService {
  // Submit a chart viewing request
  async submitChartViewingRequest(data: ChartViewingRequestData): Promise<ChartRequestResponse> {
    try {
      const response = await apiRequest<ChartRequestResponse>("/chartrequest/add", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response;
    } catch (error) {
      console.error("Error submitting chart viewing request:", error);
      throw error;
    }
  }

  // Submit a chart editing request
  async submitChartEditingRequest(data: ChartEditingRequestData): Promise<ChartRequestResponse> {
    try {
      const response = await apiRequest<ChartRequestResponse>("/chartrequest/add", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response;
    } catch (error) {
      console.error("Error submitting chart editing request:", error);
      throw error;
    }
  }

  // Get all chart requests (for staff/faculty)
  async getAllChartRequests(): Promise<ChartRequestResponse[]> {
    try {
      const response = await apiRequest<ChartRequestResponse[]>("/chartrequest/getall");
      return response;
    } catch (error) {
      console.error("Error fetching chart requests:", error);
      throw error;
    }
  }

  // Get chart requests by requester (for clinicians)
  async getChartRequestsByRequester(requesterName: string): Promise<ChartRequestResponse[]> {
    try {
      const response = await apiRequest<ChartRequestResponse[]>(
        `/chartrequest/requester/${encodeURIComponent(requesterName)}`,
      );
      return response;
    } catch (error) {
      console.error("Error fetching chart requests by requester:", error);
      throw error;
    }
  }

  // Get chart requests by type (for filtering)
  async getChartRequestsByType(type: "viewing" | "editing"): Promise<ChartRequestResponse[]> {
    try {
      const response = await apiRequest<ChartRequestResponse[]>(`/chartrequest/type/${type}`);
      return response;
    } catch (error) {
      console.error("Error fetching chart requests by type:", error);
      throw error;
    }
  }

  // Update chart request status (for staff/faculty to approve/reject)
  async updateChartRequestStatus(id: number, status: string): Promise<ChartRequestResponse> {
    try {
      const response = await apiRequest<ChartRequestResponse>(
        `/chartrequest/decide?crfId=${id}&decision=${encodeURIComponent(status)}`,
        {
          method: "PUT",
        },
      );
      return response;
    } catch (error) {
      console.error("Error updating chart request status:", error);
      throw error;
    }
  }

  // Delete a chart request
  async deleteChartRequest(id: number): Promise<void> {
    try {
      await apiRequest<void>(`/chartrequest/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting chart request:", error);
      throw error;
    }
  }
}

export default new ChartRequestService();
