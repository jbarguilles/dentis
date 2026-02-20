export interface PatientInformation {
  id: string;
  patientNumber: string;
  name: string;
  patientID: number;
  registrationDate: string;
  lastName: string;
  firstName: string;
  middleName: string;
  suffix: string;
  sex: "Male" | "Female";
  civilStatus: "Single" | "Married" | "Widowed" | "Divorced";
  birthdate: string;
  age: number;
  contactNumber: string;
  emergencyContact: string;
  emergencyNumber: string;
  emergencyRelationship: string;
  houseStreetSubdivision: string;
  barangay: string;
  city: string;
  province: string;
  region: string;
  createdAt: string;
}
