"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import { registerPatientApi, getLatestPatientIdApi } from "@/services/patientService";
import { usePatientByNumber } from "@/hooks/usePatients";
import { formSchema, type PatientInformationForm } from "./patientInformationSchema";
import type { PatientInformation } from "@/types/patient-information";

// Define API response types
interface Patient {
  patientID: number;
  patientNumber: string;
  // Add other fields as needed
}

interface PatientInformationProps {
  patientNumber?: string;
}

const PatientInformation: React.FC<PatientInformationProps> = ({ patientNumber }) => {
  const queryClient = useQueryClient();
  const [formattedDate, setFormattedDate] = useState<string>("");

  // Fetch patient data if patientNumber is provided
  const {
    data: fetchedPatient,
    isLoading: isLoadingPatient,
    error: patientError,
  } = usePatientByNumber(patientNumber);

  // Initialize form for registration mode
  const form = useForm<PatientInformationForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      registration_date: new Date(),
      last_name: "",
      first_name: "",
      middle_name: "",
      suffix: "",
      sex: "Male",
      civil_status: "Single",
      birthdate: undefined,
      contact_number: "",
      emergency_contact: "",
      emergency_number: "",
      emergency_relationship: "",
      house_street_subdivision: "",
      barangay: "",
      city: "",
      province: "",
      region: "",
    },
  });

  // Function to load patient data from session storage
  const loadPatientDataFromSession = useCallback(() => {
    try {
      const sessionData = sessionStorage.getItem("currentPatientData");
      if (sessionData) {
        const patientData: PatientInformation = JSON.parse(sessionData);

        // Convert dates from ISO strings to Date objects
        const registrationDate = new Date(patientData.registrationDate);
        const birthdate = new Date(patientData.birthdate);

        // Use setTimeout to ensure the state updates have been processed before setting form values
        setTimeout(() => {
          // Prefill the form with session data
          form.reset({
            registration_date: registrationDate,
            last_name: patientData.lastName,
            first_name: patientData.firstName,
            middle_name: patientData.middleName,
            suffix: patientData.suffix || "",
            sex: patientData.sex,
            civil_status: patientData.civilStatus,
            birthdate: birthdate,
            contact_number: patientData.contactNumber,
            emergency_contact: patientData.emergencyContact,
            emergency_number: patientData.emergencyNumber,
            emergency_relationship: patientData.emergencyRelationship,
            house_street_subdivision: patientData.houseStreetSubdivision,
            barangay: patientData.barangay,
            city: patientData.city,
            province: patientData.province,
            region: patientData.region,
          });
        }, 100); // Increased timeout to ensure state updates are processed
      }
    } catch (error) {
      console.error("Error loading patient data from session storage:", error);
      toast.error("Failed to load patient data");
    }
  }, [form]);

  // Watch birthdate to calculate age
  const watchedBirthdate = form.watch("birthdate");

  // Load patient data from API if patientNumber is provided
  useEffect(() => {
    if (fetchedPatient) {
      try {
        // Convert dates from ISO strings to Date objects
        const registrationDate = fetchedPatient.registrationDate
          ? new Date(fetchedPatient.registrationDate)
          : new Date();
        const birthdate = fetchedPatient.birthdate ? new Date(fetchedPatient.birthdate) : undefined;

        // Prefill the form with fetched patient data
        setTimeout(() => {
          form.reset({
            registration_date: registrationDate,
            last_name: fetchedPatient.lastName || "",
            first_name: fetchedPatient.firstName || "",
            middle_name: fetchedPatient.middleName || "",
            suffix: fetchedPatient.suffix || "",
            sex: (fetchedPatient.sex as "Male" | "Female") || "Male",
            civil_status:
              (fetchedPatient.civilStatus as "Single" | "Married" | "Widowed" | "Divorced") ||
              "Single",
            birthdate: birthdate,
            contact_number: fetchedPatient.contactNumber || "",
            emergency_contact: fetchedPatient.emergencyContact || "",
            emergency_number: fetchedPatient.emergencyNumber || "",
            emergency_relationship: fetchedPatient.emergencyRelationship || "",
            house_street_subdivision: fetchedPatient.houseStreetSubdivision || "",
            barangay: fetchedPatient.barangay || "",
            city: fetchedPatient.city || "",
            province: fetchedPatient.province || "",
            region: fetchedPatient.region || "",
          });
        }, 100);
      } catch (error) {
        console.error("Error loading patient data from API:", error);
        toast.error("Failed to load patient data");
      }
    }
  }, [fetchedPatient, form]);

  // Load patient data from session storage after location data is loaded (if no patientNumber provided)
  useEffect(() => {
    if (!patientNumber) {
      loadPatientDataFromSession();
    }
  }, [patientNumber, loadPatientDataFromSession]);

  useEffect(() => {
    if (watchedBirthdate) {
      const formatted = watchedBirthdate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      setFormattedDate(formatted);
    }
  }, [watchedBirthdate]);

  // Form submission for registration
  async function onSubmit(values: PatientInformationForm) {
    try {
      const birthDate = values.birthdate;
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      // Get the latest patient ID first to generate patient number
      const latestPatientId = (await getLatestPatientIdApi()) as number;

      // Generate patient number based on latest ID (increment by 1)
      // If no patients exist, start with 1
      const nextPatientId = (latestPatientId || 0) + 1;
      const patientNumber = `2025-${String(nextPatientId).padStart(4, "0")}`;

      // Convert dates to strings for the API and include patient_number
      const formDataWithAge = {
        ...values,
        age,
        patient_number: patientNumber,
        registration_date: values.registration_date.toISOString().split("T")[0],
        birthdate: values.birthdate.toISOString().split("T")[0],
      };

      // Register the patient
      const result = (await registerPatientApi(formDataWithAge)) as Patient;

      if (result && result.patientID) {
        // Invalidate the patients query to refresh the data
        await queryClient.invalidateQueries({ queryKey: ["patients"] });

        // Show success toast
        toast.success("Patient registered successfully!", {
          description: patientNumber,
          duration: 4000,
          style: {
            background: "#22c55e",
            color: "white",
            fontWeight: "bold",
            border: "none",
          },
          descriptionClassName: "text-white font-semibold text-lg",
        });

        // Clear session storage after successful registration
        sessionStorage.removeItem("currentPatientData");

        // Reset form and call success callback
        form.reset();
      } else {
        toast.error("Registration failed", {
          description: "An unknown error occurred",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Registration failed", {
        description: "An error occurred while registering the patient",
      });
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <Separator />
            </div>

            <FormField
              control={form.control}
              name="registration_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Registration Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-[240px] pl-3 text-left font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        captionLayout="dropdown"
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="middle_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter middle name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="suffix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Suffix (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Jr., Sr., III, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sex</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select sex" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="civil_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Civil Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select civil status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Widowed">Widowed</SelectItem>
                        <SelectItem value="Divorced">Divorced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Birthdate</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-full pl-3 text-left font-normal ${
                              !field.value && "text-muted-foreground"
                            }`}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          captionLayout="dropdown"
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="09xxxxxxxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Emergency Contact</h2>
              <Separator />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="emergency_contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter emergency contact name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emergency_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="09xxxxxxxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emergency_relationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Mother, Father, Spouse" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Address Information Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Address Information</h2>
              <Separator />
            </div>

            <FormField
              control={form.control}
              name="house_street_subdivision"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>House/Street/Subdivision</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter house number, street, subdivision" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter region" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter province" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City/Municipality</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter city/municipality" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="barangay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Barangay</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter barangay" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PatientInformation;
