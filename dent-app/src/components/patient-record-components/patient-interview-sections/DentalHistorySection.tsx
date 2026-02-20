import React from "react";
import { DentalHistoryData } from "@/types/patient-interview";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  CalendarDays,
  Clock,
  Stethoscope,
  AlertTriangle,
  Activity,
  CalendarIcon,
} from "lucide-react";
import { format } from "date-fns";

interface DentalHistoryProps {
  formData: DentalHistoryData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const DentalHistorySection: React.FC<DentalHistoryProps> = ({ formData, handleChange }) => {
  // Provide default values if formData is undefined
  const defaultFormData = {
    lastDentalVisit: "",
    dentalVisitFrequency: "",
    lastVisitProcedures: "",
    anesthesiaResponse: "",
    dentalComplications: "",
  };

  const currentFormData = formData || defaultFormData;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="flex items-center gap-2 text-xl font-bold text-primary">Dental History</h3>
        <p className="text-muted-foreground">
          Complete dental care history and previous treatment information
        </p>
      </div>

      {/* Basic Visit Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="lastDentalVisit" className="flex items-center gap-2 text-sm font-medium">
            <CalendarDays className="h-4 w-4 text-blue-500" />
            Date of Last Visit
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-full h-10 pl-3 text-left font-normal ${
                  !currentFormData.lastDentalVisit && "text-muted-foreground"
                }`}
              >
                {currentFormData.lastDentalVisit ? (
                  format(new Date(currentFormData.lastDentalVisit), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={
                  currentFormData.lastDentalVisit
                    ? new Date(currentFormData.lastDentalVisit)
                    : undefined
                }
                defaultMonth={
                  currentFormData.lastDentalVisit
                    ? new Date(currentFormData.lastDentalVisit)
                    : undefined
                }
                onSelect={(date) => {
                  const event = {
                    target: {
                      name: "lastDentalVisit",
                      value: date ? format(date, "yyyy-MM-dd") : "",
                    },
                  } as React.ChangeEvent<HTMLInputElement>;
                  handleChange(event);
                }}
                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                captionLayout="dropdown"
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="dentalVisitFrequency"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Clock className="h-4 w-4 text-green-500" />
            Frequency of Dental Visits
          </Label>
          <Input
            id="dentalVisitFrequency"
            type="text"
            name="dentalVisitFrequency"
            value={currentFormData.dentalVisitFrequency}
            onChange={handleChange}
            placeholder="e.g., Every 6 months, Annually, As needed"
            className="h-10"
          />
        </div>
      </div>

      {/* Treatment History Section */}
      <div className="space-y-2">
        <Label
          htmlFor="lastVisitProcedures"
          className="flex items-center gap-2 text-sm font-medium"
        >
          <Activity className="h-4 w-4 text-blue-500" />
          Procedures Done on Last Visit
        </Label>
        <textarea
          id="lastVisitProcedures"
          name="lastVisitProcedures"
          value={currentFormData.lastVisitProcedures}
          onChange={handleChange}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
          placeholder="Describe procedures performed during last visit (e.g., cleaning, filling, extraction, etc.)"
          rows={3}
        />
      </div>

      {/* Anesthesia Response Section */}
      <div className="space-y-2">
        <Label htmlFor="anesthesiaResponse" className="flex items-center gap-2 text-sm font-medium">
          <Stethoscope className="h-4 w-4 text-purple-500" />
          Exposure and Response to Local Anesthesia
        </Label>
        <textarea
          id="anesthesiaResponse"
          name="anesthesiaResponse"
          value={currentFormData.anesthesiaResponse}
          onChange={handleChange}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
          placeholder="Describe any previous experiences with local anesthesia, allergic reactions, or unusual responses"
          rows={3}
        />
      </div>

      {/* Complications Section */}
      <div className="space-y-2">
        <Label
          htmlFor="dentalComplications"
          className="flex items-center gap-2 text-sm font-medium"
        >
          <AlertTriangle className="h-4 w-4 text-red-500" />
          Complications During and/or After Dental Procedures
        </Label>
        <textarea
          id="dentalComplications"
          name="dentalComplications"
          value={currentFormData.dentalComplications}
          onChange={handleChange}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
          placeholder="Describe any complications, adverse reactions, or problems experienced during or after dental treatments"
          rows={3}
        />
      </div>
    </div>
  );
};

export default DentalHistorySection;
