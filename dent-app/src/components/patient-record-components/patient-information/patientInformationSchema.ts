import { z } from "zod";

export const formSchema = z.object({
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

export type PatientInformationForm = z.infer<typeof formSchema>;
