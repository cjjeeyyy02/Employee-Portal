import { useState } from "react";
import {
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Coffee,
  LogOut,
  Clock,
  Save,
  Edit,
  Download,
  X,
} from "lucide-react";
import Layout from "@/components/Layout";

type TabType = "attendance" | "leave";
type AttendanceSubTabType = "dailyLogs" | "timesheets" | "scheduledShifts";

interface TimesheetEntry {
  date: string;
  taskId: string;
  taskDescription: string;
  regularHours: string;
  overtimeHours: string;
  status: "Draft" | "Submitted" | "Approved";
}

interface AttendanceRecord {
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  totalHours: string;
  status: string;
}

interface AttendanceData {
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  totalHours: string;
  status: string;
}

const allAttendanceData: AttendanceData[] = [
  {
    date: "2024-12-10",
    clockIn: "09:00",
    clockOut: "17:30",
    totalHours: "8.5h",
    status: "Present",
  },
  {
    date: "2024-12-09",
    clockIn: "09:15",
    clockOut: "17:30",
    totalHours: "8.25h",
    status: "Late",
  },
  {
    date: "2024-12-06",
    clockIn: "09:00",
    clockOut: "17:30",
    totalHours: "8.5h",
    status: "Present",
  },
  {
    date: "2024-12-05",
    clockIn: "09:00",
    clockOut: "13:00",
    totalHours: "4.0h",
    status: "Half-day",
  },
  {
    date: "2024-12-04",
    clockIn: null,
    clockOut: null,
    totalHours: "0h",
    status: "Absent",
  },
];

export default function MyLeaveAttendance() {
  const [activeTab, setActiveTab] = useState<TabType>("attendance");
  const [activeSubTab, setActiveSubTab] =
    useState<AttendanceSubTabType>("dailyLogs");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showOvertimeModal, setShowOvertimeModal] = useState(false);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedCorrectionDate, setSelectedCorrectionDate] =
    useState<string>("");

  // Timesheet state
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());
  const [showTimesheetSubmitModal, setShowTimesheetSubmitModal] = useState(false);
  const [timesheetView, setTimesheetView] = useState<"daily" | "weekly" | "monthly">("weekly");
  const [timesheetDateRange, setTimesheetDateRange] = useState({ start: "", end: "" });
  const [timesheetEntries, setTimesheetEntries] = useState<TimesheetEntry[]>([
    {
      date: "2024-12-09",
      taskId: "TSK-001",
      taskDescription: "Frontend UI Updates",
      regularHours: "8",
      overtimeHours: "0",
      status: "Submitted",
    },
    {
      date: "2024-12-10",
      taskId: "TSK-002",
      taskDescription: "API Integration",
      regularHours: "8",
      overtimeHours: "1",
      status: "Submitted",
    },
    {
      date: "2024-12-11",
      taskId: "TSK-003",
      taskDescription: "Bug Fixes",
      regularHours: "8",
      overtimeHours: "0",
      status: "Draft",
    },
    {
      date: "2024-12-12",
      taskId: "",
      taskDescription: "",
      regularHours: "0",
      overtimeHours: "0",
      status: "Draft",
    },
    {
      date: "2024-12-13",
      taskId: "",
      taskDescription: "",
      regularHours: "0",
      overtimeHours: "0",
      status: "Draft",
    },
  ]);

  // Attendance state
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<string | null>("09:00 AM");
  const [clockOutTime, setClockOutTime] = useState<string | null>("06:15 PM");
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [breakStartTime, setBreakStartTime] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "info";
  } | null>(null);

  // Format date from YYYY-MM-DD to MM/DD/YYYY
  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year}`;
  };

  // Overtime form state
  const [overtimeForm, setOvertimeForm] = useState({
    date: "2025-11-18",
    startTime: "18:00",
    endTime: "20:30",
    totalHours: "2.50",
    reason: "Completed urgent bug fixes for the production environment database connection that arose late in the evening.",
    requestTo: "",
  });
  const [showRequestToSuggestions, setShowRequestToSuggestions] = useState(false);
  const [requestToInput, setRequestToInput] = useState("");

  const employeeNames = [
    "Michael Rodriguez",
    "Sarah Johnson",
    "Alex Kim",
    "Lisa Brown",
    "John Doe",
  ];

  const filteredEmployees = employeeNames.filter(name =>
    name.toLowerCase().includes(requestToInput.toLowerCase())
  );

  // Request Correction form state
  const [correctionForm, setCorrectionForm] = useState({
    date: "",
    correctionType: "Time Entry Error",
    remarks: "",
    attachment: null as File | null,
  });

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const showNotification = (
    message: string,
    type: "success" | "info" = "success",
  ) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleClockIn = () => {
    if (!isClockedIn) {
      const time = getCurrentTime();
      setClockInTime(time);
      setIsClockedIn(true);
      setIsOnBreak(false);
      showNotification(`Clocked in at ${time}`, "success");
    }
  };

  const handleClockOut = () => {
    if (isClockedIn && !isOnBreak) {
      const time = getCurrentTime();
      setClockOutTime(time);
      setIsClockedIn(false);
      showNotification(`Clocked out at ${time}`, "success");
    } else if (isOnBreak) {
      showNotification("Please end your break before clocking out", "info");
    }
  };

  const handleBreak = () => {
    if (isClockedIn && !isOnBreak) {
      const time = getCurrentTime();
      setBreakStartTime(time);
      setIsOnBreak(true);
      showNotification(`Break started at ${time}`, "success");
    } else if (isOnBreak) {
      setShowBreakModal(true);
    }
  };

  const handleEndBreak = () => {
    if (isOnBreak) {
      const time = getCurrentTime();
      showNotification(`Break ended at ${time}`, "success");
      setIsOnBreak(false);
      setBreakStartTime(null);
      setShowBreakModal(false);
    }
  };

  const handleOvertimeSubmit = () => {
    if (overtimeForm.date && overtimeForm.startTime && overtimeForm.endTime && overtimeForm.reason && requestToInput) {
      showNotification("Overtime request submitted successfully", "success");
      setOvertimeForm({
        date: "2025-11-18",
        startTime: "18:00",
        endTime: "20:30",
        totalHours: "2.50",
        reason: "Completed urgent bug fixes for the production environment database connection that arose late in the evening.",
        requestTo: ""
      });
      setRequestToInput("");
      setShowOvertimeModal(false);
    } else {
      showNotification("Please fill in all required fields", "info");
    }
  };

  const calculateTotalHours = (start: string, end: string) => {
    if (!start || !end) return "0.00";
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    const diffMinutes = endMinutes - startMinutes;
    const hours = (diffMinutes / 60).toFixed(2);
    return hours;
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setShowDatePicker(false);
    showNotification(`Filtered by date: ${date}`, "info");
  };

  const clearDateFilter = () => {
    setSelectedDate(null);
    showNotification("Filter cleared", "info");
  };

  const filteredAttendanceData = selectedDate
    ? allAttendanceData.filter((record) => record.date === selectedDate)
    : allAttendanceData;

  return (
    <Layout>
      {/* Header Section */}
      <div className="mb-1.5 sm:mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
        <div>
          <h1 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5">
            My Leave & Attendance
          </h1>
          <p className="text-xs text-gray-600">
            Manage your attendance, breaks, overtime, and leave records.
          </p>
        </div>
        {activeTab === "leave" && (
          <button
            onClick={() => setShowLeaveModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" /> Apply for Leave
          </button>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-2 sm:mb-3 bg-white">
        <div className="flex gap-0 px-2 sm:px-3">
          {[
            { id: "attendance", label: "Attendance" },
            { id: "leave", label: "Leave" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-all ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-blue-600"
                  : "text-gray-600 border-b-transparent hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ===== ATTENDANCE TAB ===== */}
      {activeTab === "attendance" && (
        <div className="space-y-3">
          {/* Today's Summary */}
          <div className="bg-white rounded-lg shadow-sm p-2.5 sm:p-3">
            <h2 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">
              Today's Summary
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-2 pb-2 border-b border-gray-200">
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Date</p>
                <p className="text-sm font-semibold text-gray-900">
                  Oct 18, 2024
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Clock In</p>
                <p className="text-sm font-semibold text-gray-900">09:00 AM</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Clock Out</p>
                <p className="text-sm font-semibold text-gray-900">06:15 PM</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Total Hours</p>
                <p className="text-sm font-semibold text-gray-900">9h 15m</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Overtime</p>
                <p className="text-sm font-semibold text-blue-600">1h 15m</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Status</p>
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                  Present
                </span>
              </div>
            </div>

            {/* Clock Controls */}
            <div className="flex flex-row gap-2">
              {/* Clock In Button */}
              <button
                onClick={handleClockIn}
                disabled={isClockedIn}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-white text-xs font-medium transition-colors ${
                  isClockedIn
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Clock In</span>
              </button>

              {/* Clock Out Button */}
              <button
                onClick={handleClockOut}
                disabled={!isClockedIn || isOnBreak}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-white text-xs font-medium transition-colors ${
                  !isClockedIn || isOnBreak
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Clock Out</span>
              </button>

              {/* Break Button */}
              <button
                onClick={handleBreak}
                disabled={!isClockedIn}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  !isClockedIn
                    ? "bg-[#F2F2F2] text-[#B3B3B3] cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <Coffee className="w-3.5 h-3.5" />
                <span>{isOnBreak ? "End Break" : "Break"}</span>
              </button>

              {/* Request Overtime Button */}
              <button
                onClick={() => setShowOvertimeModal(true)}
                disabled={!isClockedIn}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  !isClockedIn
                    ? "bg-[#F2F2F2] text-[#B3B3B3] cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Request Overtime</span>
              </button>
            </div>
          </div>

          {/* Sub-Tabs Navigation */}
          <div className="bg-white py-1.5">
            <div className="inline-flex border border-gray-300 rounded-lg overflow-hidden">
              {[
                { id: "dailyLogs", label: "Daily logs" },
                { id: "timesheets", label: "Timesheets" },
                { id: "scheduledShifts", label: "Scheduled shifts" },
              ].map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveSubTab(tab.id as AttendanceSubTabType)
                  }
                  className={`px-3 py-1.5 font-medium text-xs transition-all ${
                    index > 0 ? "border-l border-gray-300" : ""
                  } ${
                    activeSubTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Daily Logs Tab - Attendance Records */}
          {activeSubTab === "dailyLogs" && (
            <div
              className="w-full bg-white rounded-lg p-2.5 sm:p-3 flex flex-col gap-1.5 sm:gap-2"
              style={{
                padding: "12px 16px",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xs sm:text-sm font-semibold text-[#1A1A1A] mb-0.5">
                    Attendance Records
                  </h2>
                  <p className="text-xs text-[#7A7A7A]">
                    Your recent attendance history
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowDatePicker(true)}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Select Date
                  </button>
                  {selectedDate && (
                    <button
                      onClick={clearDateFilter}
                      className="text-xs px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                    >
                      Clear Filter ({formatDate(selectedDate)})
                    </button>
                  )}
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th
                        className="px-2 py-1.5 text-left text-xs font-bold text-gray-900 flex items-center gap-1.5"
                        onClick={() => setShowDatePicker(true)}
                      >
                        <span>Date</span>
                        <button
                          className="text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
                          title="Filter by date"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                        </button>
                      </th>
                      <th className="px-2 py-1.5 text-left text-xs font-bold text-gray-900">
                        Clock In
                      </th>
                      <th className="px-2 py-1.5 text-left text-xs font-bold text-gray-900">
                        Clock Out
                      </th>
                      <th className="px-2 py-1.5 text-left text-xs font-bold text-gray-900">
                        Total Hours
                      </th>
                      <th className="px-2 py-1.5 text-left text-xs font-bold text-gray-900">
                        Status
                      </th>
                      <th className="px-2 py-1.5 text-left text-xs font-bold text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAttendanceData.map((record, index) => {
                      const getStatusColor = (status: string) => {
                        switch (status) {
                          case "Present":
                            return { bg: "#2F80ED", text: "white" };
                          case "Late":
                            return { bg: "#E0E0E0", text: "#555555" };
                          case "Half-day":
                            return { bg: "#F2F2F2", text: "#555555" };
                          case "Absent":
                            return { bg: "#EB5757", text: "white" };
                          default:
                            return { bg: "#E0E0E0", text: "#555555" };
                        }
                      };

                      const statusColor = getStatusColor(record.status);

                      return (
                        <tr
                          key={index}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-2 py-1.5 text-xs text-gray-900">
                            {formatDate(record.date)}
                          </td>
                          <td className="px-2 py-1.5 text-xs text-gray-900">
                            {record.clockIn || "—"}
                          </td>
                          <td className="px-2 py-1.5 text-xs text-gray-900">
                            {record.clockOut || "—"}
                          </td>
                          <td className="px-2 py-1.5 text-xs text-gray-900">
                            {record.totalHours}
                          </td>
                          <td className="px-2 py-1.5">
                            <span
                              className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: statusColor.bg,
                                color: statusColor.text,
                              }}
                            >
                              {record.status}
                            </span>
                          </td>
                          <td className="px-2 py-1.5 text-xs">
                            {record.status === "Late" ||
                            record.status === "Absent" ? (
                              <button
                                onClick={() => {
                                  setSelectedCorrectionDate(record.date);
                                  setCorrectionForm({
                                    ...correctionForm,
                                    date: record.date,
                                  });
                                  setShowCorrectionModal(true);
                                }}
                                className="px-2 py-0.5 text-xs font-medium text-gray-900 bg-white border border-[#E0E0E0] rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                Correction Request
                              </button>
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Timesheets Tab */}
          {activeSubTab === "timesheets" && (
            <div className="w-full bg-white rounded-lg p-3 sm:p-4">
              {/* Header */}
              <div className="mb-3">
                {/* Header Row */}
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h2 className="text-xs sm:text-sm font-semibold text-gray-900 mb-0.5">
                      Weekly Timesheet
                    </h2>
                    <p className="text-xs text-gray-600">
                      Track your daily work hours and projects
                    </p>
                  </div>
                </div>

                {/* Filter Controls Row */}
                <div className="flex items-center justify-end gap-2 flex-wrap">
                  {/* View Mode Dropdown */}
                  <select
                    value={timesheetView}
                    onChange={(e) => setTimesheetView(e.target.value as "daily" | "weekly" | "monthly")}
                    className="px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>

                  {/* Date Range Filter */}
                  <input
                    type="date"
                    value={timesheetDateRange.start}
                    onChange={(e) =>
                      setTimesheetDateRange({ ...timesheetDateRange, start: e.target.value })
                    }
                    className="px-2 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  />
                  <span className="text-xs text-gray-500">to</span>
                  <input
                    type="date"
                    value={timesheetDateRange.end}
                    onChange={(e) =>
                      setTimesheetDateRange({ ...timesheetDateRange, end: e.target.value })
                    }
                    className="px-2 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  />

                  {/* Download Button */}
                  <button
                    onClick={() => showNotification("Downloading timesheet...", "success")}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-3 rounded-lg transition-colors flex items-center gap-1.5 text-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              </div>

              {/* Timesheet Table */}
              <div className="overflow-x-auto mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-2 py-1.5 text-left text-xs font-bold text-gray-900">
                        Date
                      </th>
                      <th className="px-2 py-1.5 text-left text-xs font-bold text-gray-900">
                        Task ID
                      </th>
                      <th className="px-2 py-1.5 text-left text-xs font-bold text-gray-900">
                        Task Description
                      </th>
                      <th className="px-2 py-1.5 text-center text-xs font-bold text-gray-900">
                        Regular Hours
                      </th>
                      <th className="px-2 py-1.5 text-center text-xs font-bold text-gray-900">
                        Overtime
                      </th>
                      <th className="px-2 py-1.5 text-center text-xs font-bold text-gray-900">
                        Total
                      </th>
                      <th className="px-2 py-1.5 text-left text-xs font-bold text-gray-900">
                        Status
                      </th>
                      <th className="px-2 py-1.5 text-left text-xs font-bold text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {timesheetEntries.map((entry, index) => {
                      const totalHours =
                        parseFloat(entry.regularHours || "0") +
                        parseFloat(entry.overtimeHours || "0");

                      const getStatusStyle = (status: string) => {
                        switch (status) {
                          case "Approved":
                            return { bg: "#27AE60", text: "white" };
                          case "Submitted":
                            return { bg: "#2F80ED", text: "white" };
                          case "Draft":
                            return { bg: "#E0E0E0", text: "#555555" };
                          default:
                            return { bg: "#E0E0E0", text: "#555555" };
                        }
                      };

                      const statusStyle = getStatusStyle(entry.status);

                      return (
                        <tr
                          key={index}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-2 py-1.5 text-xs text-gray-900">
                            {formatDate(entry.date)}
                          </td>
                          <td className="px-2 py-1.5">
                            {entry.status === "Draft" ? (
                              <input
                                type="text"
                                value={entry.taskId}
                                onChange={(e) => {
                                  const newEntries = [...timesheetEntries];
                                  newEntries[index].taskId = e.target.value;
                                  setTimesheetEntries(newEntries);
                                }}
                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Task ID"
                              />
                            ) : (
                              <span className="text-xs text-gray-900">
                                {entry.taskId || "—"}
                              </span>
                            )}
                          </td>
                          <td className="px-2 py-1.5">
                            {entry.status === "Draft" ? (
                              <input
                                type="text"
                                value={entry.taskDescription}
                                onChange={(e) => {
                                  const newEntries = [...timesheetEntries];
                                  newEntries[index].taskDescription = e.target.value;
                                  setTimesheetEntries(newEntries);
                                }}
                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Task description"
                              />
                            ) : (
                              <span className="text-xs text-gray-900">
                                {entry.taskDescription || "—"}
                              </span>
                            )}
                          </td>
                          <td className="px-2 py-1.5 text-center">
                            {entry.status === "Draft" ? (
                              <input
                                type="number"
                                min="0"
                                max="24"
                                step="0.5"
                                value={entry.regularHours}
                                onChange={(e) => {
                                  const newEntries = [...timesheetEntries];
                                  newEntries[index].regularHours =
                                    e.target.value;
                                  setTimesheetEntries(newEntries);
                                }}
                                className="w-16 px-2 py-1 text-xs text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            ) : (
                              <span className="text-xs text-gray-900">
                                {entry.regularHours || "0"}
                              </span>
                            )}
                          </td>
                          <td className="px-2 py-1.5 text-center">
                            {entry.status === "Draft" ? (
                              <input
                                type="number"
                                min="0"
                                max="12"
                                step="0.5"
                                value={entry.overtimeHours}
                                onChange={(e) => {
                                  const newEntries = [...timesheetEntries];
                                  newEntries[index].overtimeHours =
                                    e.target.value;
                                  setTimesheetEntries(newEntries);
                                }}
                                className="w-16 px-2 py-1 text-xs text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            ) : (
                              <span className="text-xs text-gray-900">
                                {entry.overtimeHours || "0"}
                              </span>
                            )}
                          </td>
                          <td className="px-2 py-1.5 text-center text-xs font-semibold text-gray-900">
                            {totalHours.toFixed(1)}
                          </td>
                          <td className="px-2 py-1.5">
                            <span
                              className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: statusStyle.bg,
                                color: statusStyle.text,
                              }}
                            >
                              {entry.status}
                            </span>
                          </td>
                          <td className="px-2 py-1.5">
                            {entry.status !== "Draft" && (
                              <button
                                onClick={() => {
                                  const newEntries = [...timesheetEntries];
                                  newEntries[index].status = "Draft";
                                  setTimesheetEntries(newEntries);
                                  showNotification(
                                    "Entry unlocked for editing",
                                    "info",
                                  );
                                }}
                                className="text-blue-600 hover:text-blue-800 text-xs flex items-center gap-1"
                              >
                                <Edit className="w-3 h-3" />
                                Edit
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-300 bg-gray-50">
                      <td
                        colSpan={3}
                        className="px-2 py-1.5 text-xs font-bold text-gray-900 text-right"
                      >
                        Weekly Total:
                      </td>
                      <td className="px-2 py-1.5 text-xs font-bold text-center text-gray-900">
                        {timesheetEntries
                          .reduce(
                            (sum, entry) =>
                              sum + parseFloat(entry.regularHours || "0"),
                            0,
                          )
                          .toFixed(1)}{" "}
                        hrs
                      </td>
                      <td className="px-2 py-1.5 text-xs font-bold text-center text-gray-900">
                        {timesheetEntries
                          .reduce(
                            (sum, entry) =>
                              sum + parseFloat(entry.overtimeHours || "0"),
                            0,
                          )
                          .toFixed(1)}{" "}
                        hrs
                      </td>
                      <td className="px-2 py-1.5 text-xs font-bold text-center text-blue-600">
                        {timesheetEntries
                          .reduce(
                            (sum, entry) =>
                              sum +
                              parseFloat(entry.regularHours || "0") +
                              parseFloat(entry.overtimeHours || "0"),
                            0,
                          )
                          .toFixed(1)}{" "}
                        hrs
                      </td>
                      <td colSpan={2}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Previous Timesheets */}
              <div className="mt-6">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                  Previous Timesheets
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-2 py-1.5 text-left text-xs font-bold text-gray-900">
                          Week Period
                        </th>
                        <th className="px-2 py-1.5 text-center text-xs font-bold text-gray-900">
                          Total Hours
                        </th>
                        <th className="px-2 py-1.5 text-center text-xs font-bold text-gray-900">
                          Overtime
                        </th>
                        <th className="px-2 py-1.5 text-left text-xs font-bold text-gray-900">
                          Status
                        </th>
                        <th className="px-2 py-1.5 text-left text-xs font-bold text-gray-900">
                          Submitted Date
                        </th>
                        <th className="px-2 py-1.5 text-left text-xs font-bold text-gray-900">
                          Approver
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-2 py-1.5 text-xs text-gray-900">
                          12/02/2024 - 12/06/2024
                        </td>
                        <td className="px-2 py-1.5 text-xs text-center text-gray-900">
                          40.0
                        </td>
                        <td className="px-2 py-1.5 text-xs text-center text-gray-900">
                          2.0
                        </td>
                        <td className="px-2 py-1.5">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white bg-green-500">
                            Approved
                          </span>
                        </td>
                        <td className="px-2 py-1.5 text-xs text-gray-900">
                          12/06/2024
                        </td>
                        <td className="px-2 py-1.5 text-xs text-gray-900">
                          Michael Rodriguez
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-2 py-1.5 text-xs text-gray-900">
                          11/25/2024 - 11/29/2024
                        </td>
                        <td className="px-2 py-1.5 text-xs text-center text-gray-900">
                          40.0
                        </td>
                        <td className="px-2 py-1.5 text-xs text-center text-gray-900">
                          0.0
                        </td>
                        <td className="px-2 py-1.5">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white bg-green-500">
                            Approved
                          </span>
                        </td>
                        <td className="px-2 py-1.5 text-xs text-gray-900">
                          11/29/2024
                        </td>
                        <td className="px-2 py-1.5 text-xs text-gray-900">
                          Michael Rodriguez
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-2 py-1.5 text-xs text-gray-900">
                          11/18/2024 - 11/22/2024
                        </td>
                        <td className="px-2 py-1.5 text-xs text-center text-gray-900">
                          38.0
                        </td>
                        <td className="px-2 py-1.5 text-xs text-center text-gray-900">
                          1.5
                        </td>
                        <td className="px-2 py-1.5">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white bg-green-500">
                            Approved
                          </span>
                        </td>
                        <td className="px-2 py-1.5 text-xs text-gray-900">
                          11/22/2024
                        </td>
                        <td className="px-2 py-1.5 text-xs text-gray-900">
                          Michael Rodriguez
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Scheduled Shifts Tab */}
          {activeSubTab === "scheduledShifts" && (
            <div className="w-full">
              {/* Top Filters Row */}
              <div className="flex flex-wrap items-center justify-end gap-2 mb-4">
                {/* Date Range Selector 1 */}
                <input
                  type="date"
                  defaultValue="2025-10-19"
                  className="px-2 py-1 text-xs bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
                {/* Date Range Selector 2 */}
                <input
                  type="date"
                  defaultValue="2025-10-25"
                  className="px-2 py-1 text-xs bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
              </div>

              {/* My Weekly Schedule - Single Row */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4">
                  <h2 className="text-sm font-semibold text-gray-900 mb-4">
                    My Weekly Schedule
                  </h2>

                  {/* Week Grid - 7 columns */}
                  <div className="grid grid-cols-7 gap-2">
                    {/* Sunday */}
                    <div className="bg-white border border-gray-200 rounded-lg p-2">
                      <div className="mb-2">
                        <h3 className="text-xs font-bold text-gray-900 tracking-wide">
                          SUN
                        </h3>
                        <p className="text-xs text-gray-600">Oct 19</p>
                      </div>
                      <div className="bg-blue-50 px-2 py-2 rounded-md">
                        <div className="flex items-center justify-between">
                          <Clock className="w-3 h-3 text-blue-600" />
                          <span className="text-xs font-medium text-gray-900">
                            9–18
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Monday */}
                    <div className="bg-white border border-gray-200 rounded-lg p-2">
                      <div className="mb-2">
                        <h3 className="text-xs font-bold text-gray-900 tracking-wide">
                          MON
                        </h3>
                        <p className="text-xs text-gray-600">Oct 20</p>
                      </div>
                      <div className="bg-blue-50 px-2 py-2 rounded-md">
                        <div className="flex items-center justify-between">
                          <Clock className="w-3 h-3 text-blue-600" />
                          <span className="text-xs font-medium text-gray-900">
                            9–18
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tuesday */}
                    <div className="bg-white border border-gray-200 rounded-lg p-2">
                      <div className="mb-2">
                        <h3 className="text-xs font-bold text-gray-900 tracking-wide">
                          TUE
                        </h3>
                        <p className="text-xs text-gray-600">Oct 21</p>
                      </div>
                      <div className="bg-blue-50 px-2 py-2 rounded-md">
                        <div className="flex items-center justify-between">
                          <Clock className="w-3 h-3 text-blue-600" />
                          <span className="text-xs font-medium text-gray-900">
                            9–18
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Wednesday */}
                    <div className="bg-white border border-gray-200 rounded-lg p-2">
                      <div className="mb-2">
                        <h3 className="text-xs font-bold text-gray-900 tracking-wide">
                          WED
                        </h3>
                        <p className="text-xs text-gray-600">Oct 22</p>
                      </div>
                      <div className="bg-blue-50 px-2 py-2 rounded-md">
                        <div className="flex items-center justify-between">
                          <Clock className="w-3 h-3 text-blue-600" />
                          <span className="text-xs font-medium text-gray-900">
                            9��18
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Thursday */}
                    <div className="bg-white border border-gray-200 rounded-lg p-2">
                      <div className="mb-2">
                        <h3 className="text-xs font-bold text-gray-900 tracking-wide">
                          THU
                        </h3>
                        <p className="text-xs text-gray-600">Oct 23</p>
                      </div>
                      <div className="bg-blue-50 px-2 py-2 rounded-md">
                        <div className="flex items-center justify-between">
                          <Clock className="w-3 h-3 text-blue-600" />
                          <span className="text-xs font-medium text-gray-900">
                            9–18
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Friday */}
                    <div className="bg-white border border-gray-200 rounded-lg p-2">
                      <div className="mb-2">
                        <h3 className="text-xs font-bold text-gray-900 tracking-wide">
                          FRI
                        </h3>
                        <p className="text-xs text-gray-600">Oct 24</p>
                      </div>
                      <div className="bg-blue-50 px-2 py-2 rounded-md">
                        <div className="flex items-center justify-between">
                          <Clock className="w-3 h-3 text-blue-600" />
                          <span className="text-xs font-medium text-gray-900">
                            9–18
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Saturday */}
                    <div className="bg-white border border-gray-200 rounded-lg p-2">
                      <div className="mb-2">
                        <h3 className="text-xs font-bold text-gray-900 tracking-wide">
                          SAT
                        </h3>
                        <p className="text-xs text-gray-600">Oct 25</p>
                      </div>
                      <div className="bg-gray-100 px-2 py-2 rounded-md">
                        <div className="flex items-center justify-center">
                          <span className="text-xs text-gray-500">Off</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== LEAVE TAB ===== */}
      {activeTab === "leave" && (
        <div className="flex flex-col w-full gap-6">
          {/* 3-Column Layout: Available Leave, Recent Activities, Upcoming Holidays */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {/* COLUMN 1 — AVAILABLE LEAVE */}
            <div
              style={{
                borderRadius: "16px",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                padding: "16px",
              }}
            >
              {/* Section Title */}
              <div style={{ marginBottom: "12px" }}>
                <h2
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#333",
                    marginBottom: "2px",
                  }}
                >
                  Available Leave
                </h2>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "10px",
                    color: "#888",
                  }}
                >
                  Your current leave entitlements and usage
                </p>
              </div>

              {/* Leave Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {/* Annual Leave */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                    <div>
                      <h3
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#000",
                          marginBottom: "2px",
                        }}
                      >
                        Annual Leave
                      </h3>
                      <p
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "11px",
                          color: "#666",
                        }}
                      >
                        Used: 8 days
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#000",
                        }}
                      >
                        17 available
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "6px",
                      backgroundColor: "#F3D2D2",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "32%",
                        height: "100%",
                        backgroundColor: "#D9534F",
                        borderRadius: "4px",
                      }}
                    ></div>
                  </div>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "10px",
                      color: "#666",
                      textAlign: "right",
                      marginTop: "2px",
                    }}
                  >
                    Total: 25 days
                  </p>
                </div>

                {/* Sick Leave */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                    <div>
                      <h3
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#000",
                          marginBottom: "2px",
                        }}
                      >
                        Sick Leave
                      </h3>
                      <p
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "11px",
                          color: "#666",
                        }}
                      >
                        Used: 3 days
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#000",
                        }}
                      >
                        7 available
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "6px",
                      backgroundColor: "#F3D2D2",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "30%",
                        height: "100%",
                        backgroundColor: "#D9534F",
                        borderRadius: "4px",
                      }}
                    ></div>
                  </div>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "10px",
                      color: "#666",
                      textAlign: "right",
                      marginTop: "2px",
                    }}
                  >
                    Total: 10 days
                  </p>
                </div>

                {/* Personal Leave */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                    <div>
                      <h3
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#000",
                          marginBottom: "2px",
                        }}
                      >
                        Personal Leave
                      </h3>
                      <p
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "11px",
                          color: "#666",
                        }}
                      >
                        Used: 2 days
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#000",
                        }}
                      >
                        3 available
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "6px",
                      backgroundColor: "#F3D2D2",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        height: "100%",
                        backgroundColor: "#D9534F",
                        borderRadius: "4px",
                      }}
                    ></div>
                  </div>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "10px",
                      color: "#666",
                      textAlign: "right",
                      marginTop: "2px",
                    }}
                  >
                    Total: 5 days
                  </p>
                </div>

                {/* Maternity Leave */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                    <div>
                      <h3
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#000",
                          marginBottom: "2px",
                        }}
                      >
                        Maternity Leave
                      </h3>
                      <p
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "11px",
                          color: "#666",
                        }}
                      >
                        Used: 0 days
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#000",
                        }}
                      >
                        90 available
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "6px",
                      backgroundColor: "#F3D2D2",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "0%",
                        height: "100%",
                        backgroundColor: "#D9534F",
                        borderRadius: "4px",
                      }}
                    ></div>
                  </div>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "10px",
                      color: "#666",
                      textAlign: "right",
                      marginTop: "2px",
                    }}
                  >
                    Total: 90 days
                  </p>
                </div>
              </div>
            </div>

            {/* COLUMN 2 — RECENT ACTIVITIES */}
            <div
              style={{
                borderRadius: "16px",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                padding: "16px",
              }}
            >
              {/* Section Title */}
              <div style={{ marginBottom: "12px" }}>
                <h2
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#333",
                    marginBottom: "2px",
                  }}
                >
                  Recent Activities
                </h2>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "10px",
                    color: "#888",
                  }}
                >
                  Latest leave-related updates
                </p>
              </div>

              {/* Activity Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {/* Activity 1 - Pending */}
                <div>
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #EEEEEE",
                      borderRadius: "8px",
                      padding: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "8px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: "#F8A23B",
                          flexShrink: 0,
                        }}
                      ></div>
                      <div>
                        <p
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "11px",
                            fontWeight: 500,
                            color: "#000",
                            marginBottom: "1px",
                          }}
                        >
                          Leave request submitted
                        </p>
                        <p
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "10px",
                            color: "#666",
                          }}
                        >
                          Dec 20–30 • Annual Leave
                        </p>
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "9px",
                        fontWeight: 500,
                        backgroundColor: "#FFE7C2",
                        color: "#D98B2B",
                        padding: "3px 8px",
                        borderRadius: "20px",
                        flexShrink: 0,
                      }}
                    >
                      Pending
                    </span>
                  </div>
                  <div
                    style={{
                      height: "1px",
                      backgroundColor: "#E6E6E6",
                      marginTop: "8px",
                    }}
                  ></div>
                </div>

                {/* Activity 2 - Approved */}
                <div>
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #EEEEEE",
                      borderRadius: "8px",
                      padding: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "8px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: "#28A745",
                          flexShrink: 0,
                        }}
                      ></div>
                      <div>
                        <p
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "11px",
                            fontWeight: 500,
                            color: "#000",
                            marginBottom: "1px",
                          }}
                        >
                          Sick leave approved
                        </p>
                        <p
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "10px",
                            color: "#666",
                          }}
                        >
                          Nov 15 • Medical appointment
                        </p>
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "9px",
                        fontWeight: 500,
                        backgroundColor: "#C9F3D5",
                        color: "#1E9B57",
                        padding: "3px 8px",
                        borderRadius: "20px",
                        flexShrink: 0,
                      }}
                    >
                      Approved
                    </span>
                  </div>
                  <div
                    style={{
                      height: "1px",
                      backgroundColor: "#E6E6E6",
                      marginTop: "8px",
                    }}
                  ></div>
                </div>

                {/* Activity 3 - Approved */}
                <div>
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #EEEEEE",
                      borderRadius: "8px",
                      padding: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: "#28A745",
                          flexShrink: 0,
                        }}
                      ></div>
                      <div>
                        <p
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "#000",
                            marginBottom: "4px",
                          }}
                        >
                          Personal leave approved
                        </p>
                        <p
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "12px",
                            color: "#666",
                          }}
                        >
                          Oct 22 • Family emergency
                        </p>
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "11px",
                        fontWeight: 500,
                        backgroundColor: "#C9F3D5",
                        color: "#1E9B57",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        flexShrink: 0,
                      }}
                    >
                      Approved
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 3 — UPCOMING HOLIDAYS */}
            <div
              style={{
                borderRadius: "16px",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                padding: "24px",
              }}
            >
              {/* Section Title */}
              <div style={{ marginBottom: "16px" }}>
                <h2
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#333",
                  }}
                >
                  Upcoming Holidays
                </h2>
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "#E6E6E6",
                    marginTop: "12px",
                  }}
                ></div>
              </div>

              {/* Holiday Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {/* Holiday 1 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#000",
                    }}
                  >
                    Sept 02
                  </span>
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "13px",
                      color: "#666",
                    }}
                  >
                    Labor
                  </span>
                </div>

                {/* Holiday 2 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#000",
                    }}
                  >
                    Oct 11
                  </span>
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "13px",
                      color: "#666",
                    }}
                  >
                    Labor Day
                  </span>
                </div>

                {/* Holiday 3 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#000",
                    }}
                  >
                    Oct 14
                  </span>
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "13px",
                      color: "#666",
                    }}
                  >
                    Indigenous Peoples' Day
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Leave Requests Section Container */}
          <div
            className="w-full flex flex-col gap-3 sm:gap-4 bg-white rounded-lg p-3 sm:p-4 self-stretch"
            style={{ padding: "16px 20px", marginTop: "16px" }}
          >
            {/* Section Header */}
            <div>
              <h2 className="text-xs sm:text-sm font-semibold text-gray-900 mb-0.5">
                My Leave Requests
              </h2>
              <p className="text-xs text-gray-600">
                Your leave request history and status
              </p>
            </div>

            {/* Leave Request Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-900">
                      Leave Type
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-gray-900">
                      Number of Days
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-900">
                      Period from
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-900">
                      Period to
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-900">
                      Applied Date
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-900">
                      Approved Date
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-900">
                      Approver
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-900">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Request 1 */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-3 py-2 text-xs text-gray-900">
                      Annual Leave
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-900 text-center">
                      10
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-900">
                      12/20/2024
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-900">
                      12/30/2024
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-900">
                      12/10/2024
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-900">
                      12/12/2024
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-900">
                      Michael Rodriguez
                    </td>
                    <td className="px-3 py-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white bg-green-500">
                        Approved
                      </span>
                    </td>
                  </tr>

                  {/* Request 2 */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-3 py-2 text-xs text-gray-900">
                      Sick Leave
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-900 text-center">
                      1
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-900">
                      11/15/2024
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-900">
                      11/15/2024
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-900">
                      11/14/2024
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-900">
                      11/14/2024
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-900">
                      Michael Rodriguez
                    </td>
                    <td className="px-3 py-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white bg-green-500">
                        Approved
                      </span>
                    </td>
                  </tr>

                  {/* Request 3 */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-3 py-2 text-xs text-gray-900">
                      Personal Leave
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-900 text-center">
                      1
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-900">
                      10/22/2024
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-900">
                      10/22/2024
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-900">
                      10/20/2024
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-900"></td>
                    <td className="px-3 py-2 text-xs text-gray-900"></td>
                    <td className="px-3 py-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white bg-blue-500">
                        Pending
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 px-4 py-3 rounded-lg text-white text-sm font-medium z-50 ${
            notification.type === "success" ? "bg-green-500" : "bg-blue-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Leave Request Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Apply for Leave
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Leave Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Vacation Leave</option>
                  <option>Sick Leave</option>
                  <option>Emergency Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter reason for leave"
                ></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowLeaveModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overtime Request Modal */}
      {showOvertimeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Request for Overtime
              </h2>
              <button
                onClick={() => setShowOvertimeModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Date of Overtime */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Overtime
                </label>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <input
                    type="date"
                    value={overtimeForm.date}
                    onChange={(e) =>
                      setOvertimeForm({ ...overtimeForm, date: e.target.value })
                    }
                    className="flex-1 bg-transparent text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Start Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <input
                    type="time"
                    value={overtimeForm.startTime}
                    onChange={(e) => {
                      const newStartTime = e.target.value;
                      setOvertimeForm({
                        ...overtimeForm,
                        startTime: newStartTime,
                        totalHours: calculateTotalHours(newStartTime, overtimeForm.endTime)
                      });
                    }}
                    className="flex-1 bg-transparent text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* End Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <input
                    type="time"
                    value={overtimeForm.endTime}
                    onChange={(e) => {
                      const newEndTime = e.target.value;
                      setOvertimeForm({
                        ...overtimeForm,
                        endTime: newEndTime,
                        totalHours: calculateTotalHours(overtimeForm.startTime, newEndTime)
                      });
                    }}
                    className="flex-1 bg-transparent text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Total Hours (Disabled) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Person
                </label>
                <div className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3">
                  <input
                    type="text"
                    value={`Total Hours: ${overtimeForm.totalHours}`}
                    disabled
                    className="w-full bg-transparent text-sm text-gray-600 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Reason for Overtime */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Overtime
                </label>
                <div className="bg-gray-50 border border-gray-300 rounded-lg p-3">
                  <textarea
                    value={overtimeForm.reason}
                    onChange={(e) =>
                      setOvertimeForm({ ...overtimeForm, reason: e.target.value })
                    }
                    className="w-full bg-transparent text-sm focus:outline-none resize-none"
                    rows={4}
                    placeholder="Enter reason for overtime"
                  ></textarea>
                </div>
              </div>

              {/* Request To (with autocomplete) */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Request To
                </label>
                <input
                  type="text"
                  value={requestToInput}
                  onChange={(e) => {
                    setRequestToInput(e.target.value);
                    setShowRequestToSuggestions(e.target.value.length > 0);
                  }}
                  onFocus={() => setShowRequestToSuggestions(requestToInput.length > 0)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type to search employee name..."
                />
                {showRequestToSuggestions && filteredEmployees.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {filteredEmployees.map((name, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setRequestToInput(name);
                          setOvertimeForm({ ...overtimeForm, requestTo: name });
                          setShowRequestToSuggestions(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors"
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowOvertimeModal(false)}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleOvertimeSubmit}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Break End Modal */}
      {showBreakModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <Coffee className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-gray-900">End Break</h2>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Break started at {breakStartTime}. Are you ready to resume work?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBreakModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
              >
                Continue Break
              </button>
              <button
                onClick={handleEndBreak}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors text-sm"
              >
                End Break
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Correction Modal */}
      {showCorrectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Correction Request
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={correctionForm.date}
                  onChange={(e) =>
                    setCorrectionForm({
                      ...correctionForm,
                      date: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type of Correction
                </label>
                <select
                  value={correctionForm.correctionType}
                  onChange={(e) =>
                    setCorrectionForm({
                      ...correctionForm,
                      correctionType: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Time Entry Error</option>
                  <option>Attendance Status Error</option>
                  <option>Missing Clock Out</option>
                  <option>Early Departure</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Remarks
                </label>
                <textarea
                  value={correctionForm.remarks}
                  onChange={(e) =>
                    setCorrectionForm({
                      ...correctionForm,
                      remarks: e.target.value,
                    })
                  }
                  placeholder="Describe the correction needed..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attachment (Optional)
                </label>
                <input
                  type="file"
                  onChange={(e) =>
                    setCorrectionForm({
                      ...correctionForm,
                      attachment: e.target.files?.[0] || null,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCorrectionModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    showNotification(
                      "Correction request submitted successfully",
                      "success",
                    );
                    setShowCorrectionModal(false);
                    setCorrectionForm({
                      date: "",
                      correctionType: "Time Entry Error",
                      remarks: "",
                      attachment: null,
                    });
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Date Filter Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Filter by Date
              </h2>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select a date
              </label>
              <input
                type="date"
                onChange={(e) => handleDateSelect(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-6">
              <h3 className="col-span-3 text-sm font-medium text-gray-700 mb-2">
                Quick select:
              </h3>
              {allAttendanceData.map((record) => (
                <button
                  key={record.date}
                  onClick={() => handleDateSelect(record.date)}
                  className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${
                    selectedDate === record.date
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {formatDate(record.date)}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDatePicker(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setSelectedDate(null);
                  setShowDatePicker(false);
                  showNotification("Filter cleared", "info");
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors text-sm"
              >
                Clear Filter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Timesheet Submit Modal */}
      {showTimesheetSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <Save className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Submit Timesheet
              </h2>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">
                You are about to submit your timesheet for this week. Please
                review the details:
              </p>
              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Regular Hours:</span>
                  <span className="font-semibold text-gray-900">
                    {timesheetEntries
                      .reduce(
                        (sum, entry) =>
                          sum + parseFloat(entry.regularHours || "0"),
                        0,
                      )
                      .toFixed(1)}{" "}
                    hrs
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Overtime:</span>
                  <span className="font-semibold text-gray-900">
                    {timesheetEntries
                      .reduce(
                        (sum, entry) =>
                          sum + parseFloat(entry.overtimeHours || "0"),
                        0,
                      )
                      .toFixed(1)}{" "}
                    hrs
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                  <span className="text-gray-900 font-medium">
                    Grand Total:
                  </span>
                  <span className="font-bold text-blue-600">
                    {timesheetEntries
                      .reduce(
                        (sum, entry) =>
                          sum +
                          parseFloat(entry.regularHours || "0") +
                          parseFloat(entry.overtimeHours || "0"),
                        0,
                      )
                      .toFixed(1)}{" "}
                    hrs
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Once submitted, this timesheet will be sent to your manager for
                approval.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowTimesheetSubmitModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const newEntries = timesheetEntries.map((entry) => ({
                    ...entry,
                    status:
                      parseFloat(entry.regularHours || "0") > 0 ||
                      parseFloat(entry.overtimeHours || "0") > 0
                        ? ("Submitted" as const)
                        : entry.status,
                  }));
                  setTimesheetEntries(newEntries);
                  setShowTimesheetSubmitModal(false);
                  showNotification(
                    "Timesheet submitted successfully",
                    "success",
                  );
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
