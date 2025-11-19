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
} from "lucide-react";
import Layout from "@/components/Layout";

type TabType = "attendance" | "leave";
type AttendanceSubTabType = "dailyLogs" | "timesheets" | "scheduledShifts";

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
    date: "",
    hours: "",
    reason: "",
  });

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
    if (overtimeForm.date && overtimeForm.hours && overtimeForm.reason) {
      showNotification("Overtime request submitted successfully", "success");
      setOvertimeForm({ date: "", hours: "", reason: "" });
      setShowOvertimeModal(false);
    } else {
      showNotification("Please fill in all fields", "info");
    }
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
                {selectedDate && (
                  <button
                    onClick={clearDateFilter}
                    className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    Clear Filter ({selectedDate})
                  </button>
                )}
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
            <div className="w-full bg-white rounded-lg p-6 flex items-center justify-center">
              <p className="text-sm text-gray-500">
                Timesheets content coming soon
              </p>
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
                        <div className="flex items-center justify-between mb-1">
                          <Clock className="w-3 h-3 text-blue-600" />
                          <span className="text-xs font-medium text-gray-900">
                            9–18
                          </span>
                        </div>
                        <span className="inline-block px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800">
                          Shift
                        </span>
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
                        <div className="flex items-center justify-between mb-1">
                          <Clock className="w-3 h-3 text-blue-600" />
                          <span className="text-xs font-medium text-gray-900">
                            9–18
                          </span>
                        </div>
                        <span className="inline-block px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800">
                          Shift
                        </span>
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
                        <div className="flex items-center justify-between mb-1">
                          <Clock className="w-3 h-3 text-blue-600" />
                          <span className="text-xs font-medium text-gray-900">
                            9–18
                          </span>
                        </div>
                        <span className="inline-block px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800">
                          Shift
                        </span>
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
                        <div className="flex items-center justify-between mb-1">
                          <Clock className="w-3 h-3 text-blue-600" />
                          <span className="text-xs font-medium text-gray-900">
                            9–18
                          </span>
                        </div>
                        <span className="inline-block px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800">
                          Shift
                        </span>
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
                        <div className="flex items-center justify-between mb-1">
                          <Clock className="w-3 h-3 text-blue-600" />
                          <span className="text-xs font-medium text-gray-900">
                            9–18
                          </span>
                        </div>
                        <span className="inline-block px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800">
                          Shift
                        </span>
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
                        <div className="flex items-center justify-between mb-1">
                          <Clock className="w-3 h-3 text-blue-600" />
                          <span className="text-xs font-medium text-gray-900">
                            9–18
                          </span>
                        </div>
                        <span className="inline-block px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800">
                          Shift
                        </span>
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
          {/* Available Leave & Recent Activities Container */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4">
            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {/* LEFT PANEL — Available Leave */}
              <div
                className="flex flex-col gap-2"
                style={{ padding: "12px 16px" }}
              >
                {/* Section Title */}
                <div>
                  <h2 className="text-xs sm:text-sm font-semibold text-[#1A1A1A] mb-0.5">
                    Available Leave
                  </h2>
                  <p className="text-xs text-[#7A7A7A]">
                    Your current leave entitlements and usage
                  </p>
                </div>

                {/* Leave Cards */}
                <div className="flex flex-col gap-2 sm:gap-2.5">
                  {/* Annual Leave */}
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <div>
                        <h3 className="text-xs text-gray-900 mb-0.5">
                          Annual Leave
                        </h3>
                        <p className="text-xs text-gray-600">Used: 8 days</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">
                          17 available
                        </p>
                        <p className="text-xs text-gray-600">Total: 25 days</p>
                      </div>
                    </div>
                    <div className="w-full bg-[#E8EBF0] rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: "32%" }}
                      ></div>
                    </div>
                  </div>

                  {/* Sick Leave */}
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <div>
                        <h3 className="text-xs text-gray-900 mb-0.5">
                          Sick Leave
                        </h3>
                        <p className="text-xs text-gray-600">Used: 3 days</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">
                          7 available
                        </p>
                        <p className="text-xs text-gray-600">Total: 10 days</p>
                      </div>
                    </div>
                    <div className="w-full bg-[#E8EBF0] rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: "30%" }}
                      ></div>
                    </div>
                  </div>

                  {/* Personal Leave */}
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <div>
                        <h3 className="text-xs text-gray-900 mb-0.5">
                          Personal Leave
                        </h3>
                        <p className="text-xs text-gray-600">Used: 2 days</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">
                          3 available
                        </p>
                        <p className="text-xs text-gray-600">Total: 5 days</p>
                      </div>
                    </div>
                    <div className="w-full bg-[#E8EBF0] rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                  </div>

                  {/* Maternity Leave */}
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <div>
                        <h3 className="text-xs text-gray-900 mb-0.5">
                          Maternity Leave
                        </h3>
                        <p className="text-xs text-gray-600">Used: 0 days</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">
                          90 available
                        </p>
                        <p className="text-xs text-gray-600">Total: 90 days</p>
                      </div>
                    </div>
                    <div className="w-full bg-[#E8EBF0] rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL — Recent Activities */}
              <div
                className="flex flex-col gap-2"
                style={{ padding: "12px 16px" }}
              >
                {/* Section Title */}
                <div>
                  <h2 className="text-xs sm:text-sm font-semibold text-[#1A1A1A] mb-0.5">
                    Recent Activities
                  </h2>
                  <p className="text-xs text-[#7A7A7A]">
                    Latest leave-related updates
                  </p>
                </div>

                {/* Activity Cards */}
                <div className="flex flex-col gap-2">
                  {/* Activity 1 */}
                  <div className="bg-white border border-[#E8EBF0] rounded-lg p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "#FF9800" }}
                      ></div>
                      <div>
                        <p className="text-xs text-gray-900">
                          Leave request submitted
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">
                          Dec 20-30 Annual Leave
                        </p>
                      </div>
                    </div>
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white flex-shrink-0"
                      style={{ backgroundColor: "#FFA726" }}
                    >
                      Pending
                    </span>
                  </div>

                  {/* Activity 2 */}
                  <div className="bg-white border border-[#E8EBF0] rounded-lg p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "#27AE60" }}
                      ></div>
                      <div>
                        <p className="text-xs text-gray-900">
                          Sick leave approved
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">
                          Nov 15 • Medical appointment
                        </p>
                      </div>
                    </div>
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white flex-shrink-0"
                      style={{ backgroundColor: "#27AE60" }}
                    >
                      Approved
                    </span>
                  </div>

                  {/* Activity 3 */}
                  <div className="bg-white border border-[#E8EBF0] rounded-lg p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "#27AE60" }}
                      ></div>
                      <div>
                        <p className="text-xs text-gray-900">
                          Personal leave approved
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">
                          Oct 22 • Family emergency
                        </p>
                      </div>
                    </div>
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white flex-shrink-0"
                      style={{ backgroundColor: "#27AE60" }}
                    >
                      Approved
                    </span>
                  </div>
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
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Request Overtime
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={overtimeForm.date}
                  onChange={(e) =>
                    setOvertimeForm({ ...overtimeForm, date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hours
                </label>
                <input
                  type="number"
                  value={overtimeForm.hours}
                  onChange={(e) =>
                    setOvertimeForm({ ...overtimeForm, hours: e.target.value })
                  }
                  placeholder="e.g., 2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason
                </label>
                <textarea
                  value={overtimeForm.reason}
                  onChange={(e) =>
                    setOvertimeForm({ ...overtimeForm, reason: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={3}
                  placeholder="Enter reason for overtime"
                ></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowOvertimeModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleOvertimeSubmit}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors text-sm"
                >
                  Submit
                </button>
              </div>
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
    </Layout>
  );
}
