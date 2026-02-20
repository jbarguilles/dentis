"use client";

import React, { useState, useEffect, useMemo } from "react";
import ChartViewingRequest from "../../components/ChartViewingRequest";
import ChartEditingRequest from "../../components/ChartEditingRequest";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Plus, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import apiService from "../../services/apiService";
import chartRequestService, { ChartRequestResponse } from "../../services/chartRequestService";

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  role: "CLINICIAN" | "FACULTY" | "STAFF" | "ADMIN" | "SUPERADMIN";
  email: string;
}

// Update interface to match API response
interface ChartRequest extends ChartRequestResponse {}

function ChartRequestPage() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<
    "CLINICIAN" | "FACULTY" | "STAFF" | "ADMIN" | "SUPERADMIN" | null
  >(null);
  const [requests, setRequests] = useState<ChartRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequestType, setSelectedRequestType] = useState<"viewing" | "editing" | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(requests.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRequests = requests.slice(startIndex, endIndex);

  // Fetch user info and requests on component mount
  useEffect(() => {
    const fetchUserAndRequests = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch current user info
        const userResponse = await apiService.getCurrentUser();
        setUser(userResponse);
        setRole(userResponse.role);

        // Fetch requests based on user role
        let requestsResponse: ChartRequest[] = [];

        if (userResponse.role === "CLINICIAN") {
          // For clinicians, fetch their own requests using their full name
          const fullName = `${userResponse.firstName} ${userResponse.lastName}`;
          requestsResponse = await chartRequestService.getChartRequestsByRequester(fullName);
        } else if (userResponse.role === "FACULTY") {
          // For faculty, fetch editing requests
          requestsResponse = await chartRequestService.getChartRequestsByType("editing");
        } else if (userResponse.role === "STAFF") {
          // For staff, fetch viewing requests
          requestsResponse = await chartRequestService.getChartRequestsByType("viewing");
        }

        setRequests(requestsResponse);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndRequests();
  }, []);

  // Define columns for the table
  const columns: ColumnDef<ChartRequest>[] = useMemo(
    () => [
      {
        accessorKey: "crfDate",
        header: "Date",
      },
      {
        accessorKey: "time",
        header: "Time",
        cell: ({ row }) => row.getValue("time") || "N/A",
      },
      {
        accessorKey: "purpose",
        header: "Purpose",
      },
      {
        accessorKey: "chartNumberRequested",
        header: "Chart Number",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                status === "APPROVED"
                  ? "bg-green-100 text-green-800"
                  : status === "REJECTED"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
          const type = row.getValue("type") as string;
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                type === "editing" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
              }`}
            >
              {type === "editing" ? "Editing" : "Viewing"}
            </span>
          );
        },
      },
    ],
    [],
  );

  // Initialize React Table
  const table = useReactTable({
    data: currentRequests,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRequestTypeSelect = (requestType: string) => {
    if (requestType === "Chart Viewing") {
      setSelectedRequestType("viewing");
    } else if (requestType === "Chart Editing") {
      setSelectedRequestType("editing");
    }
    setIsDialogOpen(true);
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxVisiblePages = 7;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      
      if (currentPage <= 3) {
        for (let i = 2; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('ellipsis-end');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push('ellipsis-start');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
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

  const header = (
    <div className="space-y-2">
      <h1 className="text-4xl font-bold text-[#800000] tracking-tight">Chart Requests</h1>
      <p className="text-gray-600">
        {role === "CLINICIAN" && "Manage and view all your submitted chart requests."}
        {role === "FACULTY" && "Review and manage chart editing requests."}
        {role === "STAFF" && "Review and manage chart viewing requests."}
      </p>
    </div>
  );

  return (
    <div className="flex-1 space-y-6 px-16 py-8 md:py-12">
      <div className="space-y-6">
      {header}

      {loading && (
        <div className="bg-white rounded-lg shadow-md border-t-4 border-[#800000]">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
              <span className="ml-2 text-gray-500">Loading requests...</span>
            </div>
          </div>
        </div>
      )}

      {error && (
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to load requests</h3>
            <p className="text-gray-500 mb-6">{error}</p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="bg-white rounded-lg shadow-md border-t-4 border-[#800000]">
          <div className="p-6 space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {role === "CLINICIAN" && "My Chart Requests"}
                  {role === "FACULTY" && "Chart Editing Requests"}
                  {role === "STAFF" && "Chart Viewing Requests"}
                </h2>
                <p className="text-sm text-gray-500">
                  {role === "CLINICIAN" && "Track and manage your submitted requests"}
                  {role === "FACULTY" && "Review and approve editing requests"}
                  {role === "STAFF" && "Review and approve viewing requests"}
                </p>
              </div>
              {role === "CLINICIAN" && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleRequestTypeSelect("Chart Viewing")}
                    variant="outline"
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Chart Viewing Request
                  </Button>
                  <Button 
                    onClick={() => handleRequestTypeSelect("Chart Editing")} 
                    className="gap-2 bg-gradient-to-br from-[#800000] to-[#990000] text-white hover:shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    Chart Editing Request
                  </Button>
                </div>
              )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>
                    {selectedRequestType === "viewing"
                      ? "Chart Viewing Request"
                      : "Chart Editing Request"}
                  </DialogTitle>
                </DialogHeader>
                {selectedRequestType === "viewing" ? (
                  <ChartViewingRequest />
                ) : (
                  <ChartEditingRequest />
                )}
              </DialogContent>
            </Dialog>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                          <div className="text-lg font-medium mb-2">No requests found</div>
                          <div className="text-sm">
                            {role === "CLINICIAN" &&
                              "You haven't submitted any chart requests yet."}
                            {role === "FACULTY" && "No chart editing requests are available."}
                            {role === "STAFF" && "No chart viewing requests are available."}
                          </div>
                          {role === "CLINICIAN" && (
                            <div className="text-sm mt-2 text-blue-600">
                              Click the buttons above to create your first request.
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            {table.getRowModel().rows?.length > 0 && (
              <div className="flex items-center justify-between px-2 py-4">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                  <span className="font-medium">{Math.min(endIndex, requests.length)}</span> of{" "}
                  <span className="font-medium">{requests.length}</span> requests
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
                        return (
                          <span
                            key={`${page}-${index}`}
                            className="px-2 text-gray-500"
                          >
                            ...
                          </span>
                        );
                      }
                      
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
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default ChartRequestPage;
