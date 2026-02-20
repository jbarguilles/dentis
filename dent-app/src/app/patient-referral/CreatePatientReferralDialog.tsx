"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, AlertCircle, Loader2, CheckCircle } from "lucide-react";
import { TREATMENT_OPTIONS } from "./treatment-options";
import { useCreateReferral, useValidateChartNumber } from "@/hooks/usePatientReferrals";
import { toast } from "sonner";
import type { CreatePatientReferralRequest } from "@/types/referral";

const CLINICAL_SECTIONS = ["OD", "OM", "OP", "Prostho", "Ortho"];

interface CreatePatientReferralDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreatePatientReferralDialog({
  open,
  onOpenChange,
}: CreatePatientReferralDialogProps) {
  const createReferralMutation = useCreateReferral();
  
  const [formData, setFormData] = useState({
    chartNumber: "",
    treatment: "",
    otherTreatment: "",
    age: "",
    medicalAlert: "",
    specifics: "",
    sectionOrigin: "",
    sectionDestination: "",
    notes: "",
  });

  const [chartNumberToValidate, setChartNumberToValidate] = useState("");
  const [hasBlurred, setHasBlurred] = useState(false);

  // Debounce chart number validation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.chartNumber && hasBlurred) {
        setChartNumberToValidate(formData.chartNumber);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.chartNumber, hasBlurred]);

  const chartValidation = useValidateChartNumber(chartNumberToValidate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    if (
      !formData.chartNumber ||
      !formData.treatment ||
      !formData.age ||
      !formData.medicalAlert ||
      !formData.specifics ||
      !formData.sectionOrigin ||
      !formData.sectionDestination ||
      !formData.notes
    ) {
      toast.error("All fields are required");
      return;
    }

    if (formData.treatment === "Others" && !formData.otherTreatment) {
      toast.error("Please specify the treatment type");
      return;
    }

    // Validate chart number
    if (!chartValidation.data?.valid) {
      toast.error("The chart number does not exist in the system");
      return;
    }

    // Prepare data for submission
    const requestData: CreatePatientReferralRequest = {
      chart_number: formData.chartNumber,
      treatment: formData.treatment === "Others" ? formData.otherTreatment : formData.treatment,
      specifics: formData.specifics,
      age: parseInt(formData.age, 10),
      medical_alert: formData.medicalAlert,
      section_origin: formData.sectionOrigin,
      section_destination: formData.sectionDestination,
      notes: formData.notes,
    };

    try {
      await createReferralMutation.mutateAsync(requestData);
      
      toast.success("Referral created successfully");

      // Reset form and close dialog
      handleReset();
      onOpenChange?.(false);
    } catch (error: any) {
      console.error("Error creating referral:", error);
      toast.error(error.message || "Failed to create referral. Please try again.");
    }
  };

  const handleReset = () => {
    setFormData({
      chartNumber: "",
      treatment: "",
      otherTreatment: "",
      age: "",
      medicalAlert: "",
      specifics: "",
      sectionOrigin: "",
      sectionDestination: "",
      notes: "",
    });
    setChartNumberToValidate("");
    setHasBlurred(false);
  };

  const handleCancel = () => {
    handleReset();
    onOpenChange?.(false);
  };

  const isChartNumberValid = chartValidation.data?.valid;
  const isChartNumberInvalid = hasBlurred && chartNumberToValidate && !chartValidation.isLoading && !isChartNumberValid;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Create Referral
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Create New Referral</DialogTitle>
          <DialogDescription>
            Fill in all required details to create a new patient referral
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4 px-1 overflow-y-auto flex-1">
          {/* Chart Number */}
          <div className="space-y-2">
            <Label htmlFor="chartNumber">
              Chart Number <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="chartNumber"
                value={formData.chartNumber}
                onChange={(e) => setFormData({ ...formData, chartNumber: e.target.value })}
                onBlur={() => setHasBlurred(true)}
                placeholder="e.g., 2026001"
                required
                className={isChartNumberInvalid ? "border-red-500" : isChartNumberValid ? "border-green-500" : ""}
              />
              {chartValidation.isLoading && formData.chartNumber && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
              )}
              {isChartNumberValid && (
                <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
              )}
              {isChartNumberInvalid && (
                <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
              )}
            </div>
            {isChartNumberInvalid && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Chart number does not exist
              </p>
            )}
          </div>

          {/* Treatment Needed and Age in one row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="treatment">
                Treatment Needed <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.treatment}
                onValueChange={(value) => setFormData({ ...formData, treatment: value })}
                required
              >
                <SelectTrigger id="treatment" className="w-full">
                  <SelectValue placeholder="Select treatment type" />
                </SelectTrigger>
                <SelectContent>
                  {TREATMENT_OPTIONS.map((treatment) => (
                    <SelectItem key={treatment} value={treatment}>
                      {treatment}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">
                Age <span className="text-red-500">*</span>
              </Label>
              <Input
                id="age"
                type="number"
                min="0"
                max="150"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="Enter patient age"
                required
              />
            </div>
          </div>

          {/* Other Treatment Specification */}
          {formData.treatment === "Others" && (
            <div className="space-y-2">
              <Label htmlFor="otherTreatment">
                Specify Treatment <span className="text-red-500">*</span>
              </Label>
              <Input
                id="otherTreatment"
                value={formData.otherTreatment}
                onChange={(e) => setFormData({ ...formData, otherTreatment: e.target.value })}
                placeholder="Enter treatment type"
                required
              />
            </div>
          )}

          {/* Medical Alert */}
          <div className="space-y-2">
            <Label htmlFor="medicalAlert">
              Medical Alert <span className="text-red-500">*</span>
            </Label>
            <Input
              id="medicalAlert"
              value={formData.medicalAlert}
              onChange={(e) => setFormData({ ...formData, medicalAlert: e.target.value })}
              placeholder="e.g., Hypertension, Diabetes, None"
              required
            />
          </div>

          {/* Specifics of Treatment */}
          <div className="space-y-2">
            <Label htmlFor="specifics">
              Specifics of Treatment <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="specifics"
              value={formData.specifics}
              onChange={(e) => setFormData({ ...formData, specifics: e.target.value })}
              placeholder="Enter specific treatment details"
              rows={3}
              required
            />
          </div>

          {/* Clinical Sections in one row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sectionOrigin">
                Clinical Section of Origin <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.sectionOrigin}
                onValueChange={(value) => setFormData({ ...formData, sectionOrigin: value })}
                required
              >
                <SelectTrigger id="sectionOrigin" className="w-full">
                  <SelectValue placeholder="Select origin section" />
                </SelectTrigger>
                <SelectContent>
                  {CLINICAL_SECTIONS.map((section) => (
                    <SelectItem key={section} value={section}>
                      {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sectionDestination">
                Clinical Section of Destination <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.sectionDestination}
                onValueChange={(value) => setFormData({ ...formData, sectionDestination: value })}
                required
              >
                <SelectTrigger id="sectionDestination" className="w-full">
                  <SelectValue placeholder="Select destination section" />
                </SelectTrigger>
                <SelectContent>
                  {CLINICAL_SECTIONS.map((section) => (
                    <SelectItem key={section} value={section}>
                      {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes and Special Indications */}
          <div className="space-y-2">
            <Label htmlFor="notes">
              Notes and Special Indications <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Enter any additional notes or special indications"
              rows={4}
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
              disabled={createReferralMutation.isPending}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={createReferralMutation.isPending || isChartNumberInvalid || !isChartNumberValid}
            >
              {createReferralMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create Referral
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
