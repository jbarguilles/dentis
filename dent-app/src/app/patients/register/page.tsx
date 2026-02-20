"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import PatientInformation from "@/components/patient-record-components/patient-information/PatientInformation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function RegistrationLoader() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 mx-4">
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
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Registration Form</h3>
          <p className="text-gray-500">Preparing location data and form components...</p>
        </div>
      </div>
    </div>
  );
}

export default function PatientRegistrationPage() {
  const router = useRouter();

  const handleRegistrationSuccess = () => {
    router.push("/patients");
  };

  return (
    <Suspense fallback={<RegistrationLoader />}>
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
          <PatientInformation />
        </div>
      </div>
    </Suspense>
  );
}
