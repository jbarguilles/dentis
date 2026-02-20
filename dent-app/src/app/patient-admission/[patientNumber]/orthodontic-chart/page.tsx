"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrthodonticChartPage() {
  const router = useRouter();
  const params = useParams();
  const patientNumber = params.patientNumber as string;

  const handleGoBack = () => {
    router.push(`/patient-admission?patientNumber=${patientNumber}&section=dental-charts`);
  };

  const handleSaveChart = () => {
    // Save chart data logic here
    console.log("Orthodontic chart saved successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="outline"
            onClick={handleGoBack}
            title="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Orthodontic Chart</h1>
            <p className="text-sm text-muted-foreground">
              Patient: {patientNumber}
            </p>
          </div>
        </div>
        <Button onClick={handleSaveChart} className="bg-blue-600 hover:bg-blue-700">
          Save Chart
        </Button>
      </div>

      {/* Chart Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Orthodontic Chart</h2>
          <p className="text-muted-foreground">Orthodontic chart component will be displayed here</p>
        </div>
      </div>
    </div>
  );
}
