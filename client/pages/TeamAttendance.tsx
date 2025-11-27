import { useState } from "react";
import {
  Download,
  Calendar,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

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
  <div className="bg-white rounded-md p-2 border border-gray-200">
    <div className="flex items-start justify-between mb-1.5">
      <h3 className="text-xs font-medium text-gray-700">{title}</h3>
      <Icon className="w-4 h-4 text-gray-400" />
    </div>
    <div className="mb-1.5">
      <p className={`text-2xl font-bold ${valueColor || "text-gray-900"}`}>
        {value}
      </p>
    </div>
    <p className="text-xs text-gray-600">{subtitle}</p>
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
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("leave-requests");
  const [pendingRequests, setPendingRequests] = useState<LeaveRequest[]>(leaveRequests);
  const [approvedRequests, setApprovedRequests] = useState<LeaveRequest[]>([]);
  const [deniedRequests, setDeniedRequests] = useState<LeaveRequest[]>([]);
  const [selectedDetail, setSelectedDetail] = useState<LeaveRequest | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    type: "approve" | "deny";
    request: LeaveRequest;
  } | null>(null);

  const handleExportReports = () => {
    try {
      const headers = ["Name", "Department", "Attendance Rate", "Hours/Week", "Avg Clock In", "Late Count", "Status"];

      const rows = attendanceReports.map(report => [
        report.name,
        report.department,
        `${report.attendanceRate}%`,
        `${report.hoursThisWeek}h`,
        report.avgClockIn,
        report.lateCount,
        getStatusLabel(report.status),
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute("download", `attendance_reports_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Export Successful",
        description: "Attendance reports exported as CSV file.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Error exporting reports. Please try again.",
      });
    }
  };

  const handleTeamCalendar = () => {
    toast({
      title: "Team Calendar",
      description: "Opening team calendar view...",
    });
  };

  const handleApproveLeave = (request: LeaveRequest) => {
    setConfirmModal({ type: "approve", request });
  };

  const confirmApprove = () => {
    if (confirmModal && confirmModal.type === "approve") {
      const request = confirmModal.request;
      setPendingRequests(pendingRequests.filter(r => r.id !== request.id));
      setApprovedRequests([...approvedRequests, request]);
      toast({
        title: "✓ Leave Approved",
        description: `${request.name}'s ${request.leaveType} from ${request.startDate} to ${request.endDate} has been approved.`,
      });
      setConfirmModal(null);
      setSelectedDetail(null);
    }
  };

  const handleDenyLeave = (request: LeaveRequest) => {
    setConfirmModal({ type: "deny", request });
  };

  const confirmDeny = () => {
    if (confirmModal && confirmModal.type === "deny") {
      const request = confirmModal.request;
      setPendingRequests(pendingRequests.filter(r => r.id !== request.id));
      setDeniedRequests([...deniedRequests, request]);
      toast({
        title: "✗ Leave Rejected",
        description: `${request.name}'s ${request.leaveType} request has been rejected.`,
      });
      setConfirmModal(null);
      setSelectedDetail(null);
    }
  };

  const handleViewDetails = (request: LeaveRequest) => {
    setSelectedDetail(request);
    toast({
      title: "Details",
      description: `Viewing ${request.name}'s leave request details...`,
    });
  };

  const handleCorrectAttendance = (name: string) => {
    toast({
      title: "Correct Attendance",
      description: `Opening correction form for ${name}...`,
    });
  };

  const tabs = [
    { id: "leave-requests", label: `Leave Requests (${pendingRequests.length})` },
    { id: "leave-balances", label: "Leave Balances" },
    { id: "attendance-reports", label: "Attendance Reports" },
    { id: "approved", label: `Approved (${approvedRequests.length})` },
    { id: "denied", label: `Rejected (${deniedRequests.length})` },
  ];

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto px-3 py-1.5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-lg font-semibold text-gray-900 mb-0">
                  Attendance & Leave Management
                </h1>
                <p className="text-xs text-gray-600 mt-0.5">
                  Approve leave requests and monitor team attendance
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  className="gap-2 h-7 text-xs px-2"
                  onClick={handleExportReports}
                >
                  <Download className="w-3 h-3" />
                  Export Reports
                </Button>
                <Button
                  className="gap-2 bg-blue-600 hover:bg-blue-700 h-7 text-xs px-2"
                  onClick={handleTeamCalendar}
                >
                  <Calendar className="w-3 h-3" />
                  Team Calendar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="mx-auto px-3 py-1">
          <div className="grid grid-cols-4 gap-2 mb-2">
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
        <div className="mx-auto px-3 pb-3">
          {/* Tabs */}
          <div className="flex gap-1 mb-2 border-b border-gray-200">
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

              {pendingRequests.map((request) => (
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
                        onClick={() => handleApproveLeave(request)}
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        className="h-8 text-xs px-3"
                        title="Deny leave"
                        onClick={() => handleDenyLeave(request)}
                      >
                        <XCircle className="w-3 h-3 mr-1" />
                        Deny
                      </Button>
                      <Button
                        variant="outline"
                        className="h-8 text-xs px-3"
                        title="View details"
                        onClick={() => handleViewDetails(request)}
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
                    <p className="text-xs text-gray-600">{member.department}</p>
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
                        {member.annualLeave.used}/{member.annualLeave.total}{" "}
                        days
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
                        {member.personalLeave.used}/{member.personalLeave.total}{" "}
                        days
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

          {/* Approved Requests Tab */}
          {activeTab === "approved" && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  Approved Leave Requests
                </h2>
                <p className="text-xs text-gray-500">
                  History of approved leave requests
                </p>
              </div>

              {approvedRequests.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-2 opacity-50" />
                  <p className="text-sm text-gray-600">No approved requests yet</p>
                </div>
              ) : (
                approvedRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white rounded-lg shadow-sm border border-green-200 bg-green-50 p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-gray-900">
                          {request.name}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {request.department}
                        </p>
                        <div className="mt-2 inline-block px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {request.leaveType}
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          {request.startDate} to {request.endDate} ({request.days} days)
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-xs font-medium text-green-600">Approved</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Denied Requests Tab */}
          {activeTab === "denied" && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  Rejected Leave Requests
                </h2>
                <p className="text-xs text-gray-500">
                  History of rejected leave requests
                </p>
              </div>

              {deniedRequests.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
                  <XCircle className="w-12 h-12 text-red-600 mx-auto mb-2 opacity-50" />
                  <p className="text-sm text-gray-600">No rejected requests yet</p>
                </div>
              ) : (
                deniedRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white rounded-lg shadow-sm border border-red-200 bg-red-50 p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-gray-900">
                          {request.name}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {request.department}
                        </p>
                        <div className="mt-2 inline-block px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          {request.leaveType}
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          {request.startDate} to {request.endDate} ({request.days} days)
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span className="text-xs font-medium text-red-600">Rejected</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
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
                                onClick={() => handleViewDetails({
                                  id: report.id,
                                  name: report.name,
                                  department: report.department,
                                  leaveType: "Attendance Correction",
                                  startDate: new Date().toISOString().split('T')[0],
                                  endDate: new Date().toISOString().split('T')[0],
                                  days: 0,
                                  reason: `Attendance adjustment - Current rate: ${report.attendanceRate}%`,
                                  appliedDate: new Date().toISOString().split('T')[0],
                                })}
                              >
                                View Details
                              </Button>
                              {report.status === "warning" && (
                                <Button
                                  variant="outline"
                                  className="h-7 text-xs px-2"
                                  title="Correct attendance"
                                  onClick={() =>
                                    handleCorrectAttendance(report.name)
                                  }
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

          {/* Confirmation Modal */}
          {confirmModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
                {/* Icon */}
                <div className="flex justify-center pt-6">
                  {confirmModal.type === "approve" ? (
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
                      <XCircle className="w-8 h-8 text-red-600" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="text-center px-6 py-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">
                    {confirmModal.type === "approve"
                      ? "Approve Leave Request?"
                      : "Reject Leave Request?"}
                  </h2>

                  <p className="text-sm text-gray-600 mb-4">
                    {confirmModal.type === "approve"
                      ? "You are about to approve the leave request for"
                      : "You are about to reject the leave request for"}
                  </p>

                  {/* Request Details */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                    <p className="font-semibold text-sm text-gray-900 mb-1">
                      {confirmModal.request.name}
                    </p>
                    <p className="text-xs text-gray-600 mb-3">
                      {confirmModal.request.department}
                    </p>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Leave Type:</span>
                        <span className="font-medium text-gray-900">
                          {confirmModal.request.leaveType}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium text-gray-900">
                          {confirmModal.request.days} days
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Period:</span>
                        <span className="font-medium text-gray-900">
                          {confirmModal.request.startDate} to {confirmModal.request.endDate}
                        </span>
                      </div>
                    </div>

                    {confirmModal.request.hasConflict && (
                      <div className="mt-3 p-2 bg-amber-100 border border-amber-200 rounded-md">
                        <p className="text-xs text-amber-800 font-medium">
                          ⚠️ Conflict warning: {confirmModal.request.conflictMessage}
                        </p>
                      </div>
                    )}
                  </div>

                  {confirmModal.type === "approve" ? (
                    <p className="text-sm text-gray-600">
                      This will approve the leave and adjust the team schedule accordingly.
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600">
                      This action cannot be undone. The employee will be notified of the rejection.
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    className="flex-1 h-10 text-sm font-medium"
                    onClick={() => setConfirmModal(null)}
                  >
                    Cancel
                  </Button>
                  {confirmModal.type === "approve" ? (
                    <Button
                      className="flex-1 h-10 bg-green-600 hover:bg-green-700 text-white text-sm font-medium"
                      onClick={confirmApprove}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  ) : (
                    <Button
                      className="flex-1 h-10 bg-red-600 hover:bg-red-700 text-white text-sm font-medium"
                      onClick={confirmDeny}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Details Panel */}
          {selectedDetail && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Request Details
                    </h2>
                    <p className="text-xs text-gray-600 mt-1">
                      {selectedDetail.name} - {selectedDetail.department}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedDetail(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Type and Status */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase">
                        Leave Type
                      </label>
                      <div className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {selectedDetail.leaveType}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase">
                        Duration
                      </label>
                      <p className="mt-2 text-sm font-medium text-gray-900">
                        {selectedDetail.days} days
                      </p>
                    </div>
                  </div>

                  {/* Date Range */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase">
                        Start Date
                      </label>
                      <p className="mt-2 text-sm text-gray-900">
                        {new Date(selectedDetail.startDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase">
                        End Date
                      </label>
                      <p className="mt-2 text-sm text-gray-900">
                        {new Date(selectedDetail.endDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Reason */}
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase block mb-2">
                      Reason
                    </label>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                      {selectedDetail.reason}
                    </p>
                  </div>

                  {/* Applied Date */}
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase">
                      Applied Date
                    </label>
                    <p className="mt-2 text-sm text-gray-600">
                      {new Date(selectedDetail.appliedDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Conflict Warning */}
                  {selectedDetail.hasConflict && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                      <p className="text-sm text-amber-900 font-medium">
                        ⚠️ {selectedDetail.conflictMessage}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <Button
                      className="flex-1 h-10 bg-green-600 hover:bg-green-700 text-white text-sm font-medium"
                      onClick={() => handleApproveLeave(selectedDetail)}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve Request
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 h-10 text-sm font-medium"
                      onClick={() => handleDenyLeave(selectedDetail)}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Deny Request
                    </Button>
                    <Button
                      variant="outline"
                      className="h-10 px-4 text-sm font-medium"
                      onClick={() => setSelectedDetail(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
