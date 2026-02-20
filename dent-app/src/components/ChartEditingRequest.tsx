"use client";

import React, { useState } from "react";
import { submitChartEditingRequest, ChartEditingFormData } from "../actions/chartRequestActions";
import { useAuth } from "@/contexts/AuthContext";

interface ChartEditRequestData {
  crfDate: string;
  time: string;
  purpose: string;
  chartNumberRequested: string;
  section: string;
  type: string;
}

function ChartEditingRequest() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<ChartEditRequestData>({
    crfDate: new Date().toISOString().split("T")[0], // Default to today's date
    time: "",
    purpose: "",
    chartNumberRequested: "",
    section: "",
    type: "editing",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Get the full name from authenticated user
      const fullName = user
        ? `${user.firstName}${user.middleName ? " " + user.middleName : ""} ${user.lastName}`.trim()
        : "";

      if (!fullName) {
        setMessage({
          type: "error",
          text: "Unable to determine requester name. Please refresh and try again.",
        });
        setLoading(false);
        return;
      }

      const formDataForAction: ChartEditingFormData = {
        requesterName: fullName,
        crfDate: formData.crfDate,
        time: formData.time,
        purpose: formData.purpose,
        chartNumberRequested: formData.chartNumberRequested,
        section: formData.section,
      };

      const result = await submitChartEditingRequest(formDataForAction);

      if (result.success) {
        // Reset form after successful submission
        setFormData({
          crfDate: new Date().toISOString().split("T")[0],
          time: "",
          purpose: "",
          chartNumberRequested: "",
          section: "",
          type: "editing",
        });

        setMessage({
          type: "success",
          text: "Chart editing request submitted successfully!",
        });
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to submit chart editing request",
        });
      }
    } catch (error) {
      console.error("Error submitting chart editing request:", error);
      setMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-red-900">Edit Patient Chart</h1>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`mb-4 p-3 rounded-md ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Chart Number Requested Field */}
        <div>
          <label
            htmlFor="chartNumberRequested"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Chart Number Requested <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="chartNumberRequested"
            name="chartNumberRequested"
            value={formData.chartNumberRequested}
            onChange={handleChange}
            placeholder="Enter chart number (e.g., 2025-12345)"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-900 focus:border-red-900"
          />
        </div>

        {/* Date Field */}
        <div>
          <label htmlFor="crfDate" className="block text-sm font-medium text-gray-700 mb-2">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="crfDate"
            name="crfDate"
            value={formData.crfDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-900 focus:border-red-900"
          />
        </div>

        {/* Time Field */}
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
            Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-900 focus:border-red-900"
          />
        </div>

        {/* Purpose Field */}
        <div>
          <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
            Purpose <span className="text-red-500">*</span>
          </label>
          <textarea
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            placeholder="Please describe the purpose of editing this chart..."
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-900 focus:border-red-900 resize-vertical"
          />
        </div>

        {/* Section Field */}
        <div>
          <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-2">
            Section <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="section"
            name="section"
            value={formData.section}
            onChange={handleChange}
            placeholder="Enter the section (e.g., Dental History, Treatment Plan)"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-900 focus:border-red-900"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2 transition-colors hover:cursor-pointer ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChartEditingRequest;
