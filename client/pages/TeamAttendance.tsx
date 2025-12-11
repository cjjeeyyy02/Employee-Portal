import { useState } from "react";
import {
  Download,
  Calendar,
  AlertCircle,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Search,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
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
  maternityLeave: { used: number; total: number; remaining: number };
  sabbaticalLeave: { used: number; total: number; remaining: number };
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
    maternityLeave: { used: 0, total: 3, remaining: 3 },
    sabbaticalLeave: { used: 0, total: 1, remaining: 1 },
  },
  {
    id: "2",
    name: "Lisa Park",
    department: "Design",
    annualLeave: { used: 12, total: 25, remaining: 13 },
    sickLeave: { used: 5, total: 10, remaining: 5 },
    personalLeave: { used: 2, total: 5, remaining: 3 },
    maternityLeave: { used: 0, total: 3, remaining: 3 },
    sabbaticalLeave: { used: 0, total: 1, remaining: 1 },
  },
  {
    id: "3",
    name: "Alex Kim",
    department: "Engineering",
    annualLeave: { used: 5, total: 25, remaining: 20 },
    sickLeave: { used: 1, total: 10, remaining: 9 },
    personalLeave: { used: 0, total: 5, remaining: 5 },
    maternityLeave: { used: 0, total: 3, remaining: 3 },
    sabbaticalLeave: { used: 0, total: 1, remaining: 1 },
  },
  {
    id: "4",
    name: "Emma Wilson",
    department: "Engineering",
    annualLeave: { used: 15, total: 25, remaining: 10 },
    sickLeave: { used: 3, total: 10, remaining: 7 },
    personalLeave: { used: 1, total: 5, remaining: 4 },
    maternityLeave: { used: 1, total: 3, remaining: 2 },
    sabbaticalLeave: { used: 0, total: 1, remaining: 1 },
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
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [selectedAttendanceReport, setSelectedAttendanceReport] = useState<AttendanceReport | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLeaveBalance, setSelectedLeaveBalance] = useState<LeaveBalance | null>(null);
  const [statusFilterOpen, setStatusFilterOpen] = useState(false);

  const handleExportReports = () => {
    try {
      // Create comprehensive HTML report
      const reportDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const totalPending = pendingRequests.length;
      const totalApproved = approvedRequests.length;
      const totalDenied = deniedRequests.length;
      const totalLeaveRequests = totalPending + totalApproved + totalDenied;

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Attendance & Leave Report</title>
          <style>
            body {
              font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              margin: 0;
              padding: 20px;
              color: #1F2937;
              background-color: #F9FAFB;
            }
            .container {
              max-width: 1200px;
              margin: 0 auto;
              background-color: white;
              padding: 40px;
              border-radius: 8px;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #111827;
              margin: 0 0 10px 0;
              font-size: 28px;
            }
            .report-date {
              color: #6B7280;
              font-size: 14px;
              margin-bottom: 30px;
              border-bottom: 1px solid #E5E7EB;
              padding-bottom: 20px;
            }
            .section {
              margin-bottom: 40px;
            }
            .section h2 {
              color: #374151;
              font-size: 16px;
              font-weight: 600;
              margin-bottom: 15px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              border-bottom: 2px solid #E5E7EB;
              padding-bottom: 10px;
            }
            .metrics-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 15px;
              margin-bottom: 20px;
            }
            .metric-card {
              background-color: #F3F4F6;
              padding: 15px;
              border-radius: 6px;
              border: 1px solid #E5E7EB;
            }
            .metric-label {
              color: #6B7280;
              font-size: 12px;
              font-weight: 600;
              margin-bottom: 5px;
              text-transform: uppercase;
            }
            .metric-value {
              color: #1F2937;
              font-size: 24px;
              font-weight: 700;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 15px;
            }
            thead {
              background-color: #F3F4F6;
              border-bottom: 2px solid #E5E7EB;
            }
            th {
              padding: 12px;
              text-align: left;
              font-weight: 600;
              color: #374151;
              font-size: 13px;
            }
            td {
              padding: 12px;
              border-bottom: 1px solid #E5E7EB;
              font-size: 13px;
            }
            tr:hover {
              background-color: #F9FAFB;
            }
            .status-badge {
              display: inline-block;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: 600;
            }
            .status-approved {
              background-color: #D1FAE5;
              color: #065F46;
            }
            .status-rejected {
              background-color: #FEE2E2;
              color: #991B1B;
            }
            .status-pending {
              background-color: #FEF3C7;
              color: #92400E;
            }
            .status-excellent {
              background-color: #D1FAE5;
              color: #065F46;
            }
            .status-good {
              background-color: #DBEAFE;
              color: #1E40AF;
            }
            .status-warning {
              background-color: #FEF3C7;
              color: #92400E;
            }
            .status-critical {
              background-color: #FEE2E2;
              color: #991B1B;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #E5E7EB;
              color: #6B7280;
              font-size: 12px;
              text-align: center;
            }
            @media print {
              body {
                background-color: white;
              }
              .container {
                box-shadow: none;
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Attendance & Leave Management Report</h1>
            <div class="report-date">Generated on ${reportDate}</div>

            <!-- Summary Section -->
            <div class="section">
              <h2>Executive Summary</h2>
              <div class="metrics-grid">
                <div class="metric-card">
                  <div class="metric-label">Total Leave Requests</div>
                  <div class="metric-value">${totalLeaveRequests}</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">Approved</div>
                  <div class="metric-value">${totalApproved}</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">Pending</div>
                  <div class="metric-value">${totalPending}</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">Rejected</div>
                  <div class="metric-value">${totalDenied}</div>
                </div>
              </div>
            </div>

            <!-- Attendance Reports Section -->
            <div class="section">
              <h2>Team Attendance Reports</h2>
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Attendance Rate</th>
                    <th>Hours/Week</th>
                    <th>Avg Clock In</th>
                    <th>Late Count</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${attendanceReports
                    .map(
                      (report) => `
                    <tr>
                      <td><strong>${report.name}</strong></td>
                      <td>${report.department}</td>
                      <td>${report.attendanceRate}%</td>
                      <td>${report.hoursThisWeek}h</td>
                      <td>${report.avgClockIn}</td>
                      <td>${report.lateCount}</td>
                      <td>
                        <span class="status-badge status-${report.status}">
                          ${getStatusLabel(report.status)}
                        </span>
                      </td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>

            <!-- Leave Requests Section -->
            <div class="section">
              <h2>Leave Requests Summary</h2>
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Leave Type</th>
                    <th>Duration</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${[...pendingRequests, ...approvedRequests, ...deniedRequests]
                    .map(
                      (request) => {
                        let status = "pending";
                        if (approvedRequests.find(r => r.id === request.id)) {
                          status = "approved";
                        } else if (deniedRequests.find(r => r.id === request.id)) {
                          status = "rejected";
                        }
                        return `
                    <tr>
                      <td><strong>${request.name}</strong></td>
                      <td>${request.department}</td>
                      <td>${request.leaveType}</td>
                      <td>${request.days} days</td>
                      <td>${request.startDate}</td>
                      <td>${request.endDate}</td>
                      <td>
                        <span class="status-badge status-${status}">
                          ${status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  `;
                      }
                    )
                    .join("")}
                </tbody>
              </table>
            </div>

            <!-- Leave Balances Section -->
            <div class="section">
              <h2>Leave Balance Summary</h2>
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Annual Leave</th>
                    <th>Sick Leave</th>
                    <th>Personal Leave</th>
                  </tr>
                </thead>
                <tbody>
                  ${leaveBalances
                    .map(
                      (member) => `
                    <tr>
                      <td><strong>${member.name}</strong></td>
                      <td>${member.annualLeave.remaining}/${member.annualLeave.total} days</td>
                      <td>${member.sickLeave.remaining}/${member.sickLeave.total} days</td>
                      <td>${member.personalLeave.remaining}/${member.personalLeave.total} days</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>

            <div class="footer">
              <p>This is an automatically generated report from the Attendance & Leave Management system.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Create blob and download
      const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute("download", `attendance_leave_report_${new Date().toISOString().split('T')[0]}.html`);
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Report Exported",
        description: "Comprehensive attendance and leave report generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Error exporting report. Please try again.",
      });
    }
  };

  const handleTeamCalendar = () => {
    setShowCalendar(!showCalendar);
    if (!showCalendar) {
      toast({
        title: "Team Calendar",
        description: "Showing team leave calendar for the month...",
      });
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateInRange = (date: Date, startStr: string, endStr: string) => {
    const start = new Date(startStr);
    const end = new Date(endStr);
    return date >= start && date <= end;
  };

  const getLeaveOnDate = (date: Date) => {
    const approvedOnDate = approvedRequests.filter(
      req => isDateInRange(date, req.startDate, req.endDate)
    );
    const pendingOnDate = pendingRequests.filter(
      req => isDateInRange(date, req.startDate, req.endDate)
    );
    return { approved: approvedOnDate, pending: pendingOnDate };
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
    { id: "attendance-reports", label: "Attendance Reports" },
    { id: "leave-balances", label: "Leave Balances" },
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
                  Attendance & Leave Oversight
                </h1>
                <p className="text-xs text-gray-600 mt-0.5">
                  Monitor attendance logs, leave requests, shift schedules, and daily time records
                </p>
              </div>
              <div className="flex gap-2">
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
              {/* Search and Filter Bar for Leave Requests */}
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search leave requests…"
                    className="pl-10 rounded-full h-8 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <button
                    onClick={() => setStatusFilterOpen(!statusFilterOpen)}
                    className="flex items-center gap-1 px-2 py-0.5 border border-gray-300 rounded-md bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 h-7"
                  >
                    {statusFilter === "all"
                      ? "All Status"
                      : statusFilter === "approved"
                        ? "Approved"
                        : "Rejected"}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {statusFilterOpen && (
                    <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                      <button
                        onClick={() => {
                          setStatusFilter("all");
                          setStatusFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-100 first:rounded-t-md ${
                          statusFilter === "all" ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"
                        }`}
                      >
                        All Status
                      </button>
                      <button
                        onClick={() => {
                          setStatusFilter("approved");
                          setStatusFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-100 ${
                          statusFilter === "approved" ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"
                        }`}
                      >
                        Approved
                      </button>
                      <button
                        onClick={() => {
                          setStatusFilter("rejected");
                          setStatusFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-100 last:rounded-b-md ${
                          statusFilter === "rejected" ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"
                        }`}
                      >
                        Rejected
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  {statusFilter === "all"
                    ? "All Leave Requests"
                    : statusFilter === "approved"
                      ? "Approved Leave Requests"
                      : "Rejected Leave Requests"}
                </h2>
                <p className="text-xs text-gray-500">
                  {statusFilter === "all"
                    ? "View all leave requests across all statuses"
                    : statusFilter === "approved"
                      ? "View approved leave requests"
                      : "View rejected leave requests"}
                </p>
              </div>

              {(statusFilter === "all"
                ? [...pendingRequests, ...approvedRequests, ...deniedRequests]
                : statusFilter === "approved"
                  ? approvedRequests
                  : deniedRequests
              ).map((request) => (
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
                      {statusFilter === "all" && !approvedRequests.some(r => r.id === request.id) && !deniedRequests.some(r => r.id === request.id) && (
                        <>
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
                            title="Reject leave"
                            onClick={() => handleDenyLeave(request)}
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
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

                  <div className="grid grid-cols-5 gap-2">
                    {/* Annual Leave Card */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                      <p className="text-xs font-semibold text-blue-900 mb-1">Annual</p>
                      <p className="text-lg font-bold text-blue-600">{member.annualLeave.remaining}</p>
                      <p className="text-xs text-blue-700">{member.annualLeave.used}/{member.annualLeave.total}</p>
                      <div className="w-full bg-blue-200 rounded-full h-1 mt-1">
                        <div
                          className="bg-blue-600 h-1 rounded-full"
                          style={{
                            width: `${(member.annualLeave.used / member.annualLeave.total) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Sick Leave Card */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
                      <p className="text-xs font-semibold text-orange-900 mb-1">Sick</p>
                      <p className="text-lg font-bold text-orange-600">{member.sickLeave.remaining}</p>
                      <p className="text-xs text-orange-700">{member.sickLeave.used}/{member.sickLeave.total}</p>
                      <div className="w-full bg-orange-200 rounded-full h-1 mt-1">
                        <div
                          className="bg-orange-600 h-1 rounded-full"
                          style={{
                            width: `${(member.sickLeave.used / member.sickLeave.total) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Personal Leave Card */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                      <p className="text-xs font-semibold text-green-900 mb-1">Personal</p>
                      <p className="text-lg font-bold text-green-600">{member.personalLeave.remaining}</p>
                      <p className="text-xs text-green-700">{member.personalLeave.used}/{member.personalLeave.total}</p>
                      <div className="w-full bg-green-200 rounded-full h-1 mt-1">
                        <div
                          className="bg-green-600 h-1 rounded-full"
                          style={{
                            width: `${(member.personalLeave.used / member.personalLeave.total) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Maternity Leave Card */}
                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-2">
                      <p className="text-xs font-semibold text-pink-900 mb-1">Maternity</p>
                      <p className="text-lg font-bold text-pink-600">{member.maternityLeave.remaining}</p>
                      <p className="text-xs text-pink-700">{member.maternityLeave.used}/{member.maternityLeave.total}</p>
                      <div className="w-full bg-pink-200 rounded-full h-1 mt-1">
                        <div
                          className="bg-pink-600 h-1 rounded-full"
                          style={{
                            width: `${(member.maternityLeave.used / member.maternityLeave.total) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Sabbatical Leave Card */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-2">
                      <p className="text-xs font-semibold text-purple-900 mb-1">Sabbatical</p>
                      <p className="text-lg font-bold text-purple-600">{member.sabbaticalLeave.remaining}</p>
                      <p className="text-xs text-purple-700">{member.sabbaticalLeave.used}/{member.sabbaticalLeave.total}</p>
                      <div className="w-full bg-purple-200 rounded-full h-1 mt-1">
                        <div
                          className="bg-purple-600 h-1 rounded-full"
                          style={{
                            width: `${(member.sabbaticalLeave.used / member.sabbaticalLeave.total) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-3">
                    <Button
                      variant="outline"
                      className="h-8 text-xs px-4"
                      onClick={() => setSelectedLeaveBalance(member)}
                    >
                      View Details
                    </Button>
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
              {/* Search and Filter Bar for Attendance Reports */}
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search employees…"
                    className="pl-10 rounded-full h-8 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <button
                    onClick={() => setStatusFilterOpen(!statusFilterOpen)}
                    className="flex items-center gap-1 px-2 py-0.5 border border-gray-300 rounded-md bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 h-7"
                  >
                    {statusFilter === "all"
                      ? "All Status"
                      : statusFilter === "approved"
                        ? "Approved"
                        : "Rejected"}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {statusFilterOpen && (
                    <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                      <button
                        onClick={() => {
                          setStatusFilter("all");
                          setStatusFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-100 first:rounded-t-md ${
                          statusFilter === "all" ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"
                        }`}
                      >
                        All Status
                      </button>
                      <button
                        onClick={() => {
                          setStatusFilter("approved");
                          setStatusFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-100 ${
                          statusFilter === "approved" ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"
                        }`}
                      >
                        Approved
                      </button>
                      <button
                        onClick={() => {
                          setStatusFilter("rejected");
                          setStatusFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-100 last:rounded-b-md ${
                          statusFilter === "rejected" ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"
                        }`}
                      >
                        Rejected
                      </button>
                    </div>
                  )}
                </div>
              </div>

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
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              title="More options"
                              onClick={() => setSelectedAttendanceReport(report)}
                            >
                              <MoreVertical className="w-4 h-4 text-gray-600" />
                            </Button>
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
                      Reject Request
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

          {/* Attendance Report Details Modal */}
          {selectedAttendanceReport && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Attendance Details
                    </h2>
                    <p className="text-xs text-gray-600 mt-1">
                      {selectedAttendanceReport.name} - {selectedAttendanceReport.department}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedAttendanceReport(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Status Section */}
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase block mb-3">
                      Current Status
                    </label>
                    <div className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium ${getStatusBadgeColor(selectedAttendanceReport.status)}`}>
                      {getStatusLabel(selectedAttendanceReport.status)}
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="text-xs font-semibold text-gray-600 uppercase block mb-2">
                        Attendance Rate
                      </label>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedAttendanceReport.attendanceRate}%
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="text-xs font-semibold text-gray-600 uppercase block mb-2">
                        Hours This Week
                      </label>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedAttendanceReport.hoursThisWeek}h
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="text-xs font-semibold text-gray-600 uppercase block mb-2">
                        Average Clock In
                      </label>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedAttendanceReport.avgClockIn}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="text-xs font-semibold text-gray-600 uppercase block mb-2">
                        Late Count (This Month)
                      </label>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedAttendanceReport.lateCount}
                      </p>
                    </div>
                  </div>

                  {/* Analysis Section */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-sm text-blue-900 mb-2">
                      Analysis
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li>• Attendance rate of {selectedAttendanceReport.attendanceRate}% is {selectedAttendanceReport.attendanceRate >= 95 ? "excellent" : selectedAttendanceReport.attendanceRate >= 90 ? "good" : "below target"}</li>
                      <li>• Working {selectedAttendanceReport.hoursThisWeek} hours per week (Target: 40 hours)</li>
                      <li>• Average clock-in time: {selectedAttendanceReport.avgClockIn}</li>
                      <li>• {selectedAttendanceReport.lateCount} late arrivals this month</li>
                    </ul>
                  </div>

                  {/* Recommendations */}
                  {selectedAttendanceReport.status === "warning" && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="font-semibold text-sm text-yellow-900 mb-2">
                        ⚠️ Recommended Actions
                      </h3>
                      <ul className="space-y-2 text-sm text-yellow-800">
                        <li>• Schedule a meeting to discuss attendance concerns</li>
                        <li>• Create an improvement plan if needed</li>
                        <li>• Monitor attendance closely over the next 2 weeks</li>
                      </ul>
                    </div>
                  )}

                  {selectedAttendanceReport.status === "critical" && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="font-semibold text-sm text-red-900 mb-2">
                        🔴 Urgent Actions Required
                      </h3>
                      <ul className="space-y-2 text-sm text-red-800">
                        <li>• Immediate discussion with employee required</li>
                        <li>• Formal attendance improvement plan needed</li>
                        <li>• Consider escalation to HR if no improvement</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
                  <Button
                    className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                    onClick={() => {
                      handleCorrectAttendance(selectedAttendanceReport.name);
                      setSelectedAttendanceReport(null);
                    }}
                  >
                    Correct Attendance
                  </Button>
                  <Button
                    variant="outline"
                    className="h-10 px-4 text-sm font-medium"
                    onClick={() => setSelectedAttendanceReport(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Full-Screen Team Calendar Modal */}
          {showCalendar && (
            <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Team Leave Calendar
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    {calendarMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="h-10 text-sm px-4"
                    onClick={() => {
                      const newDate = new Date(calendarMonth);
                      newDate.setMonth(newDate.getMonth() - 1);
                      setCalendarMonth(newDate);
                    }}
                  >
                    ← Previous Month
                  </Button>
                  <Button
                    variant="outline"
                    className="h-10 text-sm px-4"
                    onClick={() => setCalendarMonth(new Date())}
                  >
                    Today
                  </Button>
                  <Button
                    variant="outline"
                    className="h-10 text-sm px-4"
                    onClick={() => {
                      const newDate = new Date(calendarMonth);
                      newDate.setMonth(newDate.getMonth() + 1);
                      setCalendarMonth(newDate);
                    }}
                  >
                    Next Month →
                  </Button>
                  <Button
                    className="h-10 text-sm px-4 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => setShowCalendar(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>

              {/* Calendar Content */}
              <div className="p-6 max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {/* Calendar Grid */}
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                          <th
                            key={day}
                            className="border-2 border-gray-200 bg-blue-50 p-4 text-center text-sm font-bold text-gray-900"
                          >
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const daysInMonth = getDaysInMonth(calendarMonth);
                        const firstDay = getFirstDayOfMonth(calendarMonth);
                        const weeks = [];
                        let week = Array(firstDay).fill(null);

                        for (let i = 1; i <= daysInMonth; i++) {
                          const currentDate = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), i);
                          const leave = getLeaveOnDate(currentDate);

                          week.push({
                            date: i,
                            currentDate,
                            leave,
                          });

                          if (week.length === 7) {
                            weeks.push(week);
                            week = [];
                          }
                        }

                        if (week.length > 0) {
                          while (week.length < 7) {
                            week.push(null);
                          }
                          weeks.push(week);
                        }

                        return weeks.map((weekDays, weekIdx) => (
                          <tr key={weekIdx}>
                            {weekDays.map((day, dayIdx) => (
                              <td
                                key={dayIdx}
                                className="border-2 border-gray-200 p-4 min-h-40 align-top bg-gray-50 hover:bg-blue-50 transition-colors"
                              >
                                {day ? (
                                  <div className="h-full flex flex-col">
                                    <div className="text-lg font-bold text-gray-900 mb-3">
                                      {day.date}
                                    </div>
                                    <div className="flex-1 space-y-2 overflow-y-auto">
                                      {day.leave.approved.length > 0 && (
                                        <div>
                                          {day.leave.approved.map((req) => (
                                            <div
                                              key={req.id}
                                              className="bg-green-100 border-l-4 border-green-500 rounded p-2 text-xs text-green-800 font-medium mb-2"
                                              title={`${req.name} - ${req.leaveType}`}
                                            >
                                              <p className="font-bold">{req.name}</p>
                                              <p>{req.leaveType}</p>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                      {day.leave.pending.length > 0 && (
                                        <div>
                                          {day.leave.pending.map((req) => (
                                            <div
                                              key={req.id}
                                              className="bg-yellow-100 border-l-4 border-yellow-500 rounded p-2 text-xs text-yellow-800 font-medium mb-2"
                                              title={`${req.name} - ${req.leaveType} (Pending)`}
                                            >
                                              <p className="font-bold">{req.name}</p>
                                              <p>{req.leaveType} (Pending)</p>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ) : null}
                              </td>
                            ))}
                          </tr>
                        ));
                      })()}
                    </tbody>
                  </table>
                </div>

                {/* Legend */}
                <div className="mt-6 flex gap-8">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 border-l-4 border-green-500 rounded"></div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">Approved Leave</p>
                      <p className="text-xs text-gray-600">Leave request has been approved</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-yellow-100 border-l-4 border-yellow-500 rounded"></div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">Pending Leave</p>
                      <p className="text-xs text-gray-600">Leave request awaiting approval</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Leave Balance Details Modal */}
      {selectedLeaveBalance && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Leave Balance Details
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedLeaveBalance.name} - {selectedLeaveBalance.department}
                </p>
              </div>
              <button
                onClick={() => setSelectedLeaveBalance(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Annual Leave */}
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">Annual Leave</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      {selectedLeaveBalance.annualLeave.remaining} days remaining out of {selectedLeaveBalance.annualLeave.total} days
                    </p>
                  </div>
                  <span className="text-3xl font-bold text-blue-600">{selectedLeaveBalance.annualLeave.remaining}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-700">Days Used</span>
                    <span className="font-semibold text-blue-900">{selectedLeaveBalance.annualLeave.used} days</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(selectedLeaveBalance.annualLeave.used / selectedLeaveBalance.annualLeave.total) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="text-xs text-blue-600 text-right">
                    {((selectedLeaveBalance.annualLeave.used / selectedLeaveBalance.annualLeave.total) * 100).toFixed(1)}% used
                  </div>
                </div>
              </div>

              {/* Sick Leave */}
              <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-orange-900">Sick Leave</h3>
                    <p className="text-sm text-orange-700 mt-1">
                      {selectedLeaveBalance.sickLeave.remaining} days remaining out of {selectedLeaveBalance.sickLeave.total} days
                    </p>
                  </div>
                  <span className="text-3xl font-bold text-orange-600">{selectedLeaveBalance.sickLeave.remaining}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-orange-700">Days Used</span>
                    <span className="font-semibold text-orange-900">{selectedLeaveBalance.sickLeave.used} days</span>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full"
                      style={{
                        width: `${(selectedLeaveBalance.sickLeave.used / selectedLeaveBalance.sickLeave.total) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="text-xs text-orange-600 text-right">
                    {((selectedLeaveBalance.sickLeave.used / selectedLeaveBalance.sickLeave.total) * 100).toFixed(1)}% used
                  </div>
                </div>
              </div>

              {/* Personal Leave */}
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">Personal Leave</h3>
                    <p className="text-sm text-green-700 mt-1">
                      {selectedLeaveBalance.personalLeave.remaining} days remaining out of {selectedLeaveBalance.personalLeave.total} days
                    </p>
                  </div>
                  <span className="text-3xl font-bold text-green-600">{selectedLeaveBalance.personalLeave.remaining}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Days Used</span>
                    <span className="font-semibold text-green-900">{selectedLeaveBalance.personalLeave.used} days</span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${(selectedLeaveBalance.personalLeave.used / selectedLeaveBalance.personalLeave.total) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="text-xs text-green-600 text-right">
                    {((selectedLeaveBalance.personalLeave.used / selectedLeaveBalance.personalLeave.total) * 100).toFixed(1)}% used
                  </div>
                </div>
              </div>

              {/* Maternity Leave */}
              <div className="border border-pink-200 rounded-lg p-4 bg-pink-50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-pink-900">Maternity Leave</h3>
                    <p className="text-sm text-pink-700 mt-1">
                      {selectedLeaveBalance.maternityLeave.remaining} days remaining out of {selectedLeaveBalance.maternityLeave.total} days
                    </p>
                  </div>
                  <span className="text-3xl font-bold text-pink-600">{selectedLeaveBalance.maternityLeave.remaining}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-pink-700">Days Used</span>
                    <span className="font-semibold text-pink-900">{selectedLeaveBalance.maternityLeave.used} days</span>
                  </div>
                  <div className="w-full bg-pink-200 rounded-full h-2">
                    <div
                      className="bg-pink-600 h-2 rounded-full"
                      style={{
                        width: `${(selectedLeaveBalance.maternityLeave.used / selectedLeaveBalance.maternityLeave.total) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="text-xs text-pink-600 text-right">
                    {((selectedLeaveBalance.maternityLeave.used / selectedLeaveBalance.maternityLeave.total) * 100).toFixed(1)}% used
                  </div>
                </div>
              </div>

              {/* Sabbatical Leave */}
              <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-900">Sabbatical Leave</h3>
                    <p className="text-sm text-purple-700 mt-1">
                      {selectedLeaveBalance.sabbaticalLeave.remaining} days remaining out of {selectedLeaveBalance.sabbaticalLeave.total} days
                    </p>
                  </div>
                  <span className="text-3xl font-bold text-purple-600">{selectedLeaveBalance.sabbaticalLeave.remaining}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-700">Days Used</span>
                    <span className="font-semibold text-purple-900">{selectedLeaveBalance.sabbaticalLeave.used} days</span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width: `${(selectedLeaveBalance.sabbaticalLeave.used / selectedLeaveBalance.sabbaticalLeave.total) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="text-xs text-purple-600 text-right">
                    {((selectedLeaveBalance.sabbaticalLeave.used / selectedLeaveBalance.sabbaticalLeave.total) * 100).toFixed(1)}% used
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Summary</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Days Allocated</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedLeaveBalance.annualLeave.total + selectedLeaveBalance.sickLeave.total + selectedLeaveBalance.personalLeave.total + selectedLeaveBalance.maternityLeave.total + selectedLeaveBalance.sabbaticalLeave.total}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Days Used</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedLeaveBalance.annualLeave.used + selectedLeaveBalance.sickLeave.used + selectedLeaveBalance.personalLeave.used + selectedLeaveBalance.maternityLeave.used + selectedLeaveBalance.sabbaticalLeave.used}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Days Remaining</p>
                    <p className="text-2xl font-bold text-green-600">
                      {selectedLeaveBalance.annualLeave.remaining + selectedLeaveBalance.sickLeave.remaining + selectedLeaveBalance.personalLeave.remaining + selectedLeaveBalance.maternityLeave.remaining + selectedLeaveBalance.sabbaticalLeave.remaining}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Overall Usage</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {(
                        ((selectedLeaveBalance.annualLeave.used + selectedLeaveBalance.sickLeave.used + selectedLeaveBalance.personalLeave.used + selectedLeaveBalance.maternityLeave.used + selectedLeaveBalance.sabbaticalLeave.used) /
                        (selectedLeaveBalance.annualLeave.total + selectedLeaveBalance.sickLeave.total + selectedLeaveBalance.personalLeave.total + selectedLeaveBalance.maternityLeave.total + selectedLeaveBalance.sabbaticalLeave.total)) * 100
                      ).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 flex justify-end gap-2 bg-white">
              <Button
                variant="outline"
                onClick={() => setSelectedLeaveBalance(null)}
                className="px-6"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
