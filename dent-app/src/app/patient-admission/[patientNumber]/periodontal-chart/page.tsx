"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PeriodontalChart from "@/components/patient-record-components/periodontal-chart/PeriodontalChart";

export default function PeriodontalChartPage() {
  const router = useRouter();
  const params = useParams();
  const patientNumber = params.patientNumber as string;

  const handleGoBack = () => {
    router.push(`/patient-admission?patientNumber=${patientNumber}&section=dental-charts`);
  };

  const handleSaveChart = () => {
    // Save chart data logic here
    console.log("Periodontal chart saved successfully");
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
            <h1 className="text-2xl font-bold">Periodontal Chart</h1>
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
      <div className="p-6">
        <PeriodontalChart />
      </div>
    </div>
  );
}
