"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft, CalendarIcon } from "lucide-react";
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
import type { PhilippinesData, ProvinceData, MunicipalityList } from "@/types/location";

// Define the form schema with zod
const formSchema = z.object({
  registration_date: z.date({
    required_error: "Registration date is required",
  }),
  last_name: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters")
    .nonempty("Last name is required"),
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters")
    .nonempty("First name is required"),
  middle_name: z.string().nonempty("Middle name is required"),
  suffix: z.string().optional(),
  sex: z.enum(["Male", "Female"]),
  civil_status: z.enum(["Single", "Married", "Widowed", "Divorced"]),
  birthdate: z.date({
    required_error: "Birthdate is required",
  }),
  contact_number: z
    .string()
    .min(11, "Cellphone number must be 11 digits")
    .max(11, "Cellphone number must be 11 digits")
    .regex(/^09\d{9}$/, "Must be a valid Philippine mobile number starting with 09"),
  emergency_contact: z.string().nonempty("Emergency contact is required"),
  emergency_number: z
    .string()
    .min(11, "Emergency number must be 11 digits")
    .max(11, "Emergency number must be 11 digits")
    .regex(/^09\d{9}$/, "Must be a valid Philippine mobile number starting with 09"),
  emergency_relationship: z.string().nonempty("Emergency relationship is required"),
  house_street_subdivision: z.string().nonempty("House/Street/Subdivision is required"),
  barangay: z.string().nonempty("Barangay is required"),
  city: z.string().nonempty("City/Municipality is required"),
  province: z.string().nonempty("Province is required"),
  region: z.string().nonempty("Region is required"),
});

// Define API response types
interface Patient {
  patientID: number;
  patientNumber: string;
  // Add other fields as needed
}

const toTitleCase = (str: string) => {
  const lowercaseWords = ["na", "of", "and", "the", "in", "on", "at", "to"];
  return str
    .toLowerCase()
    .split(" ")
    .map((word, index) => {
      if (/^[IVXLCDM]+$/i.test(word)) {
        return word.toUpperCase();
      }
      if (index !== 0 && lowercaseWords.includes(word.toLowerCase())) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export default function PatientRegistrationForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [formattedDate, setFormattedDate] = useState<string>("");

  const regionOrder = [
    "NCR",
    "CAR",
    "01",
    "02",
    "03",
    "4A",
    "4B",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "BARMM",
  ];
  const [regions, setRegions] = useState<PhilippinesData>({});
  const [isLoadingLocationData, setIsLoadingLocationData] = useState(true); // Start with loading true
  const [locationDataLoaded, setLocationDataLoaded] = useState(false);
  const [provinces, setProvinces] = useState<Record<string, ProvinceData>>({});
  const [municipalities, setMunicipalities] = useState<MunicipalityList>({});
  const [barangays, setBarangays] = useState<string[]>([]);

  // Lazy load Philippines location data
  const loadLocationData = async () => {
    if (locationDataLoaded) return;

    try {
      const response = await fetch("/ph.json");
      const philippineLocations = await response.json();
      setRegions(philippineLocations);
      setLocationDataLoaded(true);
    } catch (error) {
      console.error("Failed to load location data:", error);
      toast.error("Failed to load location data. Please refresh the page.");
    } finally {
      setIsLoadingLocationData(false);
    }
  };

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
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

  // Watch birthdate to calculate age
  const watchedBirthdate = form.watch("birthdate");

  // Load location data on component mount
  useEffect(() => {
    loadLocationData();
  }, []);

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

  // Handle region change
  const handleRegionChange = (regionCode: string) => {
    form.setValue("region", regionCode);
    form.setValue("province", "");
    form.setValue("city", "");
    form.setValue("barangay", "");

    if (regions[regionCode]) {
      setProvinces(regions[regionCode].province_list);
    } else {
      setProvinces({});
    }
    setMunicipalities({});
    setBarangays([]);
  };

  // Handle province change
  const handleProvinceChange = (provinceName: string) => {
    form.setValue("province", provinceName);
    form.setValue("city", "");
    form.setValue("barangay", "");

    if (provinces[provinceName]) {
      setMunicipalities(provinces[provinceName].municipality_list);
    } else {
      setMunicipalities({});
    }
    setBarangays([]);
  };

  // Handle city change
  const handleCityChange = (cityName: string) => {
    form.setValue("city", cityName);
    form.setValue("barangay", "");

    if (municipalities[cityName]) {
      setBarangays(municipalities[cityName].barangay_list);
    } else {
      setBarangays([]);
    }
  };

  // Form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
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

        // Reset form and navigate
        form.reset();
        router.push("/patients");
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
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8 mx-4">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/patients">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Patients
            </Button>
          </Link>
        </div>
        <p className="text-muted-foreground">Add a new patient to the system</p>
      </div>

      <div className="mx-4">
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

            {/* Address Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Address Information</h2>
                {isLoadingLocationData && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                    Loading location data...
                  </div>
                )}
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

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region</FormLabel>
                      <Select
                        onValueChange={handleRegionChange}
                        value={field.value}
                        disabled={isLoadingLocationData}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={
                                isLoadingLocationData ? "Loading regions..." : "Select region"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {regionOrder.map((regionCode) => (
                            <SelectItem key={regionCode} value={regionCode}>
                              {regions[regionCode]?.region_name || regionCode}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <Select onValueChange={handleProvinceChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select province" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(provinces).map((provinceName) => (
                            <SelectItem key={provinceName} value={provinceName}>
                              {toTitleCase(provinceName)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <Select onValueChange={handleCityChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select city/municipality" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(municipalities).map((cityName) => (
                            <SelectItem key={cityName} value={cityName}>
                              {toTitleCase(cityName)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select barangay" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {barangays.map((barangay) => (
                            <SelectItem key={barangay} value={barangay}>
                              {toTitleCase(barangay)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <Button
                className="hover:cursor-pointer"
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Reset Form
              </Button>
              <Button type="submit" className="hover:cursor-pointer">
                Register Patient
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
