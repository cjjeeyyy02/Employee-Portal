import { useState } from "react";
import { Download, Calendar, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const MetricCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  valueColor,
}: {
  icon: React.ElementType;
  title: string;
  value: string | number;
  subtitle: string;
  valueColor?: string;
}) => (
  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
    <div className="flex items-start justify-between mb-2">
      <h3 className="text-xs font-medium text-slate-600">{title}</h3>
      <Icon className="w-4 h-4 text-slate-400" />
    </div>
    <div className="mb-2">
      <p className={`text-2xl font-bold ${valueColor || "text-gray-900"}`}>
        {value}
      </p>
    </div>
    <p className="text-xs text-slate-500">{subtitle}</p>
  </div>
);

interface LeaveRequest {
  id: string;
  name: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  appliedDate: string;
  hasConflict?: boolean;
  conflictMessage?: string;
}

interface LeaveBalance {
  id: string;
  name: string;
  department: string;
  annualLeave: { used: number; total: number; remaining: number };
  sickLeave: { used: number; total: number; remaining: number };
  personalLeave: { used: number; total: number; remaining: number };
}

const leaveRequests: LeaveRequest[] = [
  {
    id: "1",
    name: "Mike Chen",
    department: "Engineering",
    leaveType: "Annual Leave",
    startDate: "2024-12-23",
    endDate: "2024-12-30",
    days: 6,
    reason: "Holiday vacation with family",
    appliedDate: "2024-12-01",
  },
  {
    id: "2",
    name: "Lisa Park",
    department: "Design",
    leaveType: "Sick Leave",
    startDate: "2024-12-25",
    endDate: "2024-12-25",
    days: 1,
    reason: "Medical appointment",
    appliedDate: "2024-12-10",
    hasConflict: true,
    conflictMessage: "Another team member has overlapping leave dates",
  },
  {
    id: "3",
    name: "Alex Kim",
    department: "Engineering",
    leaveType: "Personal Leave",
    startDate: "2024-12-20",
    endDate: "2024-12-20",
    days: 1,
    reason: "Family emergency",
    appliedDate: "2024-12-12",
  },
];

const leaveBalances: LeaveBalance[] = [
  {
    id: "1",
    name: "Mike Chen",
    department: "Engineering",
    annualLeave: { used: 8, total: 25, remaining: 17 },
    sickLeave: { used: 2, total: 10, remaining: 8 },
    personalLeave: { used: 1, total: 5, remaining: 4 },
  },
  {
    id: "2",
    name: "Lisa Park",
    department: "Design",
    annualLeave: { used: 12, total: 25, remaining: 13 },
    sickLeave: { used: 5, total: 10, remaining: 5 },
    personalLeave: { used: 2, total: 5, remaining: 3 },
  },
  {
    id: "3",
    name: "Alex Kim",
    department: "Engineering",
    annualLeave: { used: 5, total: 25, remaining: 20 },
    sickLeave: { used: 1, total: 10, remaining: 9 },
    personalLeave: { used: 0, total: 5, remaining: 5 },
  },
  {
    id: "4",
    name: "Emma Wilson",
    department: "Engineering",
    annualLeave: { used: 15, total: 25, remaining: 10 },
    sickLeave: { used: 3, total: 10, remaining: 7 },
    personalLeave: { used: 1, total: 5, remaining: 4 },
  },
];

interface AttendanceReport {
  id: string;
  name: string;
  department: string;
  attendanceRate: number;
  hoursThisWeek: number;
  avgClockIn: string;
  lateCount: number;
  status: "excellent" | "good" | "warning" | "critical";
}

const attendanceReports: AttendanceReport[] = [
  {
    id: "1",
    name: "Mike Chen",
    department: "Engineering",
    attendanceRate: 96.8,
    hoursThisWeek: 40,
    avgClockIn: "09:05",
    lateCount: 2,
    status: "good",
  },
  {
    id: "2",
    name: "Lisa Park",
    department: "Design",
    attendanceRate: 94.2,
    hoursThisWeek: 38,
    avgClockIn: "09:15",
    lateCount: 5,
    status: "warning",
  },
  {
    id: "3",
    name: "Alex Kim",
    department: "Engineering",
    attendanceRate: 98.5,
    hoursThisWeek: 42,
    avgClockIn: "08:55",
    lateCount: 0,
    status: "excellent",
  },
  {
    id: "4",
    name: "Emma Wilson",
    department: "Engineering",
    attendanceRate: 97.3,
    hoursThisWeek: 39,
    avgClockIn: "09:00",
    lateCount: 1,
    status: "good",
  },
];

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "excellent":
      return "bg-green-100 text-green-800";
    case "good":
      return "bg-blue-100 text-blue-800";
    case "warning":
      return "bg-yellow-100 text-yellow-800";
    case "critical":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusLabel = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export default function TeamAttendance() {
  const [activeTab, setActiveTab] = useState("leave-requests");

  const tabs = [
    { id: "leave-requests", label: "Leave Requests" },
    { id: "leave-balances", label: "Leave Balances" },
    { id: "attendance-reports", label: "Attendance Reports" },
  ];

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  Attendance & Leave Management
                </h1>
                <p className="text-xs text-gray-600">
                  Approve leave requests and monitor team attendance
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" className="gap-2 h-8 text-sm px-3">
                  <Download className="w-4 h-4" />
                  Export Reports
                </Button>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700 h-8 text-sm px-3">
                  <Calendar className="w-4 h-4" />
                  Team Calendar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-4 gap-3 mb-5">
            <MetricCard
              icon={AlertCircle}
              title="Pending Requests"
              value="3"
              subtitle="1 with conflicts"
              valueColor="text-orange-600"
            />
            <MetricCard
              icon={CheckCircle2}
              title="Team Attendance"
              value="96.2%"
              subtitle="+1.5% from last month"
              valueColor="text-green-600"
            />
            <MetricCard
              icon={AlertCircle}
              title="On Leave Today"
              value="2"
              subtitle="Out of 8 team members"
              valueColor="text-blue-600"
            />
            <MetricCard
              icon={Calendar}
              title="Avg Hours/Week"
              value="39.8h"
              subtitle="Within target range"
              valueColor="text-purple-600"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 pb-8">
          {/* Tabs */}
          <div className="flex gap-1 mb-4 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Leave Requests Tab Content */}
          {activeTab === "leave-requests" && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  Pending Leave Requests
                </h2>
                <p className="text-xs text-gray-500">
                  Review and approve team leave applications
                </p>
              </div>

              {leaveRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
                >
                  {request.hasConflict && (
                    <div className="mb-3 flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
                      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800">
                        ⚠️ {request.conflictMessage}
                      </p>
                    </div>
                  )}

                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-3">
                        <h3 className="font-semibold text-sm text-gray-900">
                          {request.name}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {request.department}
                        </p>
                      </div>

                      <div className="mb-3">
                        <div className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium mb-2">
                          {request.leaveType}
                        </div>
                        {request.hasConflict && (
                          <div className="inline-block ml-2 px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                            Conflict Risk
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-gray-600 mb-1">
                        <span className="font-medium">
                          {request.startDate} to {request.endDate}
                        </span>{" "}
                        ({request.days} days)
                      </p>
                      <p className="text-xs text-gray-600 mb-2">
                        Reason: {request.reason}
                      </p>
                      <p className="text-xs text-gray-500">
                        Applied: {request.appliedDate}
                      </p>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        className="h-8 text-xs px-3 bg-green-600 hover:bg-green-700 text-white"
                        title="Approve leave"
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        className="h-8 text-xs px-3"
                        title="Deny leave"
                      >
                        <XCircle className="w-3 h-3 mr-1" />
                        Deny
                      </Button>
                      <Button
                        variant="outline"
                        className="h-8 text-xs px-3"
                        title="View details"
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Leave Balances Tab Content */}
          {activeTab === "leave-balances" && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  Team Leave Balances
                </h2>
                <p className="text-xs text-gray-500">
                  Monitor your team's leave entitlements and usage
                </p>
              </div>

              {leaveBalances.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="mb-4">
                    <h3 className="font-semibold text-sm text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {member.department}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {/* Annual Leave */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-900">
                          Annual Leave
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        {member.annualLeave.used}/{member.annualLeave.total} days
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{
                            width: `${(member.annualLeave.used / member.annualLeave.total) * 100}%`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-600">
                        {member.annualLeave.remaining} days remaining
                      </p>
                    </div>

                    {/* Sick Leave */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-900">
                          Sick Leave
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        {member.sickLeave.used}/{member.sickLeave.total} days
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-orange-600 h-1.5 rounded-full"
                          style={{
                            width: `${(member.sickLeave.used / member.sickLeave.total) * 100}%`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-600">
                        {member.sickLeave.remaining} days remaining
                      </p>
                    </div>

                    {/* Personal Leave */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-900">
                          Personal Leave
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        {member.personalLeave.used}/{member.personalLeave.total} days
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-green-600 h-1.5 rounded-full"
                          style={{
                            width: `${(member.personalLeave.used / member.personalLeave.total) * 100}%`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-600">
                        {member.personalLeave.remaining} days remaining
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Attendance Reports Tab Content */}
          {activeTab === "attendance-reports" && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  Team Attendance Reports
                </h2>
                <p className="text-xs text-gray-500">
                  Monitor team attendance patterns and performance
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">
                          Employee
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">
                          Attendance Rate
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">
                          Hours This Week
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">
                          Avg Clock In
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">
                          Late Count
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">
                          Status
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {attendanceReports.map((report) => (
                        <tr
                          key={report.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-3">
                            <div>
                              <p className="text-xs font-semibold text-gray-900">
                                {report.name}
                              </p>
                              <p className="text-xs text-gray-600">
                                {report.department}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-900">
                            {report.attendanceRate}%
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-900">
                            {report.hoursThisWeek}h
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-900">
                            {report.avgClockIn}
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-900">
                            {report.lateCount}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(report.status)}`}
                            >
                              {getStatusLabel(report.status)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                className="h-7 text-xs px-2"
                                title="View details"
                              >
                                View Details
                              </Button>
                              {report.status === "warning" && (
                                <Button
                                  variant="outline"
                                  className="h-7 text-xs px-2"
                                  title="Correct attendance"
                                >
                                  Correct
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
