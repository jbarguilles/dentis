"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { submitChartViewingRequest, ChartViewingFormData } from "../actions/chartRequestActions";
import { useAuth } from "@/contexts/AuthContext";

interface ChartRequestData {
  date: Date | undefined;
  purpose: string;
  chartNumber: string;
  section: string;
}

function ChartViewingRequest() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<ChartRequestData>({
    date: new Date(), // Default to today's date
    purpose: "", // Ensure it's always a string
    chartNumber: "", // Ensure it's always a string
    section: "",
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

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      date: date,
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

      const formDataForAction: ChartViewingFormData = {
        requesterName: fullName,
        date: formData.date,
        purpose: formData.purpose,
        chartNumber: formData.chartNumber,
        section: formData.section,
      };

      const result = await submitChartViewingRequest(formDataForAction);

      if (result.success) {
        // Reset form after successful submission
        setFormData({
          date: new Date(),
          purpose: "",
          chartNumber: "",
          section: "",
        });

        setMessage({
          type: "success",
          text: "Chart viewing request submitted successfully!",
        });
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to submit chart viewing request",
        });
      }
    } catch (error) {
      console.error("Error submitting chart viewing request:", error);
      setMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      {/* Date Field */}
      <div className="space-y-2">
        <Label htmlFor="date">
          Date <span className="text-destructive">*</span>
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !formData.date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.date ? format(formData.date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.date}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-2">
        <Label htmlFor="chartNumber">
          Chart Number Requested <span className="text-destructive">*</span>
        </Label>
        <Input
          type="text"
          id="chartNumber"
          name="chartNumber"
          value={formData.chartNumber || ""} // Ensure it's never undefined
          onChange={handleChange}
          placeholder="Enter chart number (e.g., 2025-12345)"
          required
        />
      </div>

      {/* Purpose Field */}
      <div className="space-y-2">
        <Label htmlFor="purpose">
          Purpose <span className="text-destructive">*</span>
        </Label>
        <textarea
          id="purpose"
          name="purpose"
          value={formData.purpose || ""} // Ensure it's never undefined
          onChange={handleChange}
          placeholder="Please describe the purpose of requesting this chart..."
          required
          rows={6}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical"
        />
      </div>

      {/* Section Field */}
      <div className="space-y-2">
        <Label htmlFor="section">
          Section <span className="text-destructive">*</span>
        </Label>
        <Input
          type="text"
          id="section"
          name="section"
          value={formData.section || ""}
          onChange={handleChange}
          placeholder="Enter the section (e.g., Dental History, Treatment Plan)"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" disabled={loading} className="px-6">
          {loading ? "Submitting..." : "Submit Request"}
        </Button>
      </div>
    </form>
  );
}

export default ChartViewingRequest;
