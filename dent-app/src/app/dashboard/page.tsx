"use client";

import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import {
  Users,
  FileText,
  ClipboardList,
  Calendar,
  CheckCircle,
  AlertCircle,
  UserPlus,
} from "lucide-react";

function DashboardContent() {
  const { user } = useAuth();

  const stats = [
    {
      title: "Total Patients",
      value: "1,234",
      icon: Users,
      color: "bg-blue-500",
      trend: "+12% from last month",
    },
    {
      title: "Pending Requests",
      value: "24",
      icon: ClipboardList,
      color: "bg-yellow-500",
      trend: "5 new today",
    },
    {
      title: "Completed Records",
      value: "892",
      icon: CheckCircle,
      color: "bg-green-500",
      trend: "Up to date",
    },
    {
      title: "Active Referrals",
      value: "67",
      icon: Calendar,
      color: "bg-purple-500",
      trend: "12 pending",
    },
  ];

  const recentActivities = [
    { type: "New Patient", description: "Patient John Doe registered", time: "2 hours ago" },
    { type: "Chart Request", description: "Dental chart review requested", time: "4 hours ago" },
    { type: "Referral", description: "Patient referred to Orthodontics", time: "1 day ago" },
  ];

  return (
    <div className="flex-1 space-y-6 px-16 py-8 md:py-12">
      <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-[#800000] tracking-tight">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600">Here's what's happening with your clinic today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#800000]"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-2">{stat.trend}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md min-h-[240px]">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-gradient-to-br from-[#800000] to-[#990000] text-white rounded-lg hover:shadow-lg transition-shadow font-medium">
              <UserPlus className="h-5 w-5 mb-2" />
              <div className="text-sm">New Patient</div>
            </button>
            <button className="p-4 bg-gradient-to-br from-[#800000] to-[#990000] text-white rounded-lg hover:shadow-lg transition-shadow font-medium">
              <FileText className="h-5 w-5 mb-2" />
              <div className="text-sm">Create Record</div>
            </button>
            <button className="p-4 bg-gradient-to-br from-[#800000] to-[#990000] text-white rounded-lg hover:shadow-lg transition-shadow font-medium">
              <ClipboardList className="h-5 w-5 mb-2" />
              <div className="text-sm">View Requests</div>
            </button>
            <button className="p-4 bg-gradient-to-br from-[#800000] to-[#990000] text-white rounded-lg hover:shadow-lg transition-shadow font-medium">
              <Calendar className="h-5 w-5 mb-2" />
              <div className="text-sm">Referrals</div>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-md border-t-4 border-[#800000]">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                <div className="mt-1 p-2 bg-[#800000]/10 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-[#800000]" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{activity.type}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

export default Dashboard;
