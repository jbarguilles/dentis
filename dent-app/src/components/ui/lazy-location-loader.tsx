"use client";

import React, { useState, useEffect } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "sonner";

interface LocationData {
  philippineLocations: any;
}

interface LazyLocationLoaderProps {
  onLocationDataLoaded: (data: any) => void;
  children: (isLoading: boolean, loadLocationData: () => void) => React.ReactNode;
}

export const LazyLocationLoader: React.FC<LazyLocationLoaderProps> = ({
  onLocationDataLoaded,
  children,
}) => {
  const [isLoadingLocationData, setIsLoadingLocationData] = useState(false);
  const [locationDataLoaded, setLocationDataLoaded] = useState(false);

  const loadLocationData = async () => {
    if (locationDataLoaded) return;

    setIsLoadingLocationData(true);
    try {
      const philippineLocations = await import("../../../public/ph.json");
      onLocationDataLoaded(philippineLocations.default);
      setLocationDataLoaded(true);
      toast.success("Location data loaded successfully");
    } catch (error) {
      console.error("Failed to load location data:", error);
      toast.error("Failed to load location data. Please refresh the page.");
    } finally {
      setIsLoadingLocationData(false);
    }
  };

  return <>{children(isLoadingLocationData, loadLocationData)}</>;
};
