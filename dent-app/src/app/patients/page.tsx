"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { usePatients } from "@/hooks/usePatients";

const ITEMS_PER_PAGE = 10;

export default function PatientsPage() {
  const { data: patients = [], isLoading, error } = usePatients();
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  
  // Pagination logic
  const totalPages = Math.ceil(patients.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPatients = patients.slice(startIndex, endIndex);

  const header = (
    <div className="space-y-2">
      <h1 className="text-4xl font-bold text-[#800000] tracking-tight">Patients</h1>
      <p className="text-gray-600">Manage and view all patient records in the system.</p>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex-1 space-y-6 px-16 py-8 md:py-12">
        <div className="mx-auto max-w-5xl space-y-6">
        {header}
        <div className="bg-white rounded-lg shadow-md border-t-4 border-[#800000]">
          <div className="p-6 space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Patient Directory</h2>
                <p className="text-sm text-gray-500">All registered patients in the clinic</p>
              </div>
              <Link href="/patient-admission">
                <Button className="bg-gradient-to-br from-[#800000] to-[#990000] text-white hover:shadow-md">
                  New Patient
                </Button>
              </Link>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Patient Number</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-5 w-48" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-32" />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <Skeleton className="h-8 w-8 rounded" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between px-2 py-4">
              <Skeleton className="h-5 w-64" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-32" />
                <Skeleton className="h-9 w-20" />
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 space-y-6 px-16 py-8 md:py-12">
        <div className="space-y-6">
        {header}
        <div className="bg-white rounded-lg shadow-md border-t-4 border-[#800000]">
          <div className="p-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to load patients</h3>
            <p className="text-gray-500 mb-6">
              There was an error connecting to the server. Please try
              again later.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }

  const hasPatients = patients.length > 0;

  const handleViewPatient = (patientNumber: string) => {
    router.push(`/patient-admission?patientNumber=${patientNumber}`);
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxVisiblePages = 7; // Show max 7 page buttons
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      if (currentPage <= 3) {
        // Near the beginning: show 1, 2, 3, 4, ..., last
        for (let i = 2; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('ellipsis-end');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end: show 1, ..., last-3, last-2, last-1, last
        pageNumbers.push('ellipsis-start');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // In the middle: show 1, ..., current-1, current, current+1, ..., last
        pageNumbers.push('ellipsis-start');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push('ellipsis-end');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="flex-1 space-y-6 px-16 py-8 md:py-12">
      <div className="space-y-6">
      {header}

      {hasPatients ? (
        <div className="bg-white rounded-lg shadow-md border-t-4 border-[#800000]">
          <div className="p-6 space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Patient Directory</h2>
                <p className="text-sm text-gray-500">All registered patients in the clinic</p>
              </div>
              <Link href="/patient-admission">
                <Button className="bg-gradient-to-br from-[#800000] to-[#990000] text-white hover:shadow-md">
                  New Patient
                </Button>
              </Link>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Patient Number</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPatients.map((patient) => (
                    <TableRow key={patient.patientNumber}>
                      <TableCell className="font-medium text-gray-900">{patient.name}</TableCell>
                      <TableCell className="text-gray-700">{patient.patientNumber}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:cursor-pointer"
                          onClick={() => handleViewPatient(patient.patientNumber)}
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View patient record</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-2 py-4">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">{Math.min(endIndex, patients.length)}</span> of{" "}
                <span className="font-medium">{patients.length}</span> patients
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, index) => {
                    if (typeof page === 'string') {
                      // Render ellipsis
                      return (
                        <span
                          key={`${page}-${index}`}
                          className="px-2 text-gray-500"
                        >
                          ...
                        </span>
                      );
                    }
                    
                    // Render page number button
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={
                          currentPage === page
                            ? "bg-[#800000] hover:bg-[#990000]"
                            : ""
                        }
                      >
                        {page}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md border-t-4 border-[#800000]">
          <div className="p-8 text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-[#800000]/10 text-[#800000] flex items-center justify-center">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No patients found</h3>
            <p className="text-gray-500">
              Get started by adding your first patient to the system.
            </p>
            <Link href="/patient-admission">
              <Button className="bg-gradient-to-br from-[#800000] to-[#990000] text-white hover:shadow-md">
                Add Your First Patient
              </Button>
            </Link>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
