"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { CreatePatientReferralDialog } from "@/app/patient-referral/CreatePatientReferralDialog";
import { ChevronLeft, ChevronRight, Search, Loader2, AlertCircle } from "lucide-react";
import { ReferralCard } from "./ReferralCard";
import { usePatientReferrals, useAcceptReferral, useRejectReferral } from "@/hooks/usePatientReferrals";
import { toast } from "sonner";
import { TREATMENT_OPTIONS } from "./treatment-options";
import type { ReferralStatus } from "@/types/referral";

const CLINICAL_SECTIONS = ["OD", "OM", "OP", "Prostho", "Ortho"];
const STATUS_OPTIONS: ReferralStatus[] = ["PENDING", "ACCEPTED", "REJECTED"];

function PatientReferralPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filters, setFilters] = useState<{
    treatment: string;
    sectionOrigin: string;
    sectionDestination: string;
    status: string;
  }>({
    treatment: "",
    sectionOrigin: "",
    sectionDestination: "",
    status: "",
  });

  // Debounce search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(0); // Reset to first page on search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch referrals
  const { data, isLoading, error, isError } = usePatientReferrals({
    page: currentPage,
    size: 10,
    search: debouncedSearch || undefined,
    treatment: filters.treatment || undefined,
    sectionOrigin: filters.sectionOrigin || undefined,
    sectionDestination: filters.sectionDestination || undefined,
    status: (filters.status as ReferralStatus) || undefined,
  });

  const acceptMutation = useAcceptReferral();
  const rejectMutation = useRejectReferral();

  const handleAcceptReferral = async (referralId: number) => {
    try {
      await acceptMutation.mutateAsync(referralId);
      toast.success("Referral accepted successfully");
    } catch (error: any) {
      console.error("Error accepting referral:", error);
      toast.error(error.message || "Failed to accept referral");
    }
  };

  const handleRejectReferral = async (referralId: number) => {
    try {
      await rejectMutation.mutateAsync(referralId);
      toast.success("Referral rejected successfully");
    } catch (error: any) {
      console.error("Error rejecting referral:", error);
      toast.error(error.message || "Failed to reject referral");
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    // Convert "all" to empty string for backend
    const actualValue = value === "all" ? "" : value;
    setFilters(prev => ({ ...prev, [key]: actualValue }));
    setCurrentPage(0); // Reset to first page on filter change
  };

  const clearFilters = () => {
    setFilters({
      treatment: "",
      sectionOrigin: "",
      sectionDestination: "",
      status: "",
    });
    setSearchTerm("");
    setDebouncedSearch("");
    setCurrentPage(0);
  };

  const hasActiveFilters = 
    filters.treatment || 
    filters.sectionOrigin || 
    filters.sectionDestination || 
    filters.status || 
    debouncedSearch;

  const referrals = data?.content || [];
  const totalPages = data?.totalPages || 0;
  const totalElements = data?.totalElements || 0;

  return (
    <div className="flex-1 space-y-6 px-16 py-8 md:py-12">
      <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-[#800000] tracking-tight">Patient Referrals</h1>
          <p className="text-gray-600">
            View and manage patient referrals between clinical sections
          </p>
        </div>

        <CreatePatientReferralDialog />
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by chart number or patient name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          )}
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Status Filter */}
          <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {STATUS_OPTIONS.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Treatment Filter */}
          <Select value={filters.treatment} onValueChange={(value) => handleFilterChange("treatment", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by treatment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Treatments</SelectItem>
              {TREATMENT_OPTIONS.map((treatment) => (
                <SelectItem key={treatment} value={treatment}>
                  {treatment}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Section Origin Filter */}
          <Select value={filters.sectionOrigin} onValueChange={(value) => handleFilterChange("sectionOrigin", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Origin section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Origins</SelectItem>
              {CLINICAL_SECTIONS.map((section) => (
                <SelectItem key={section} value={section}>
                  {section}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Section Destination Filter */}
          <Select value={filters.sectionDestination} onValueChange={(value) => handleFilterChange("sectionDestination", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Destination section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Destinations</SelectItem>
              {CLINICAL_SECTIONS.map((section) => (
                <SelectItem key={section} value={section}>
                  {section}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Info */}
      {!isLoading && (
        <p className="text-sm text-muted-foreground">
          {totalElements === 0 
            ? "No referrals found" 
            : `Showing ${currentPage * 10 + 1}-${Math.min((currentPage + 1) * 10, totalElements)} of ${totalElements} referrals`
          }
        </p>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <p className="text-lg font-medium">Error loading referrals</p>
          <p className="text-sm text-muted-foreground">{error?.message || "Something went wrong"}</p>
        </div>
      )}

      {/* Referrals List */}
      {!isLoading && !isError && (
        <div className="space-y-4">
          {referrals.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No referrals found matching your criteria</p>
            </div>
          ) : (
            referrals.map((referral) => (
              <ReferralCard 
                key={referral.referral_id}
                referral={referral}
                onAccept={handleAcceptReferral}
                onReject={handleRejectReferral}
                isAccepting={acceptMutation.isPending && acceptMutation.variables === referral.referral_id}
                isRejecting={rejectMutation.isPending && rejectMutation.variables === referral.referral_id}
              />
            ))
          )}
        </div>
      )}

      {/* Pagination Controls */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-between border-t pt-4">
          <div className="text-sm text-muted-foreground">
            Page {currentPage + 1} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage === totalPages - 1}
              className="gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default PatientReferralPage;
