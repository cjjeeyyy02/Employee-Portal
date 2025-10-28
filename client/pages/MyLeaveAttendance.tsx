import { useState } from "react";
import { Calendar, AlertCircle, CheckCircle, XCircle, Plus } from "lucide-react";
import Layout from "@/components/Layout";

type TabType = "attendance" | "leave";

export default function MyLeaveAttendance() {
  const [activeTab, setActiveTab] = useState<TabType>("attendance");
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  const leaveRequests = [
    { id: 1, date: "Oct 10, 2024", type: "Vacation", duration: "Oct 20 - Oct 25", days: 6, status: "Approved" },
    { id: 2, date: "Oct 05, 2024", type: "Sick Leave", duration: "Oct 18 - Oct 18", days: 1, status: "Pending" },
    { id: 3, date: "Sep 28, 2024", type: "Emergency", duration: "Oct 05 - Oct 05", days: 1, status: "Approved" },
  ];

  const leaveBalance = [
    { type: "Vacation Leave", days: 5, icon: "☀️" },
    { type: "Sick Leave", days: 3, icon: "🏥" },
    { type: "Emergency Leave", days: 2, icon: "⚠️" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-700";
      case "Late":
        return "bg-orange-100 text-orange-700";
      case "Absent":
        return "bg-red-100 text-red-700";
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Declined":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Layout>
      {/* Header Section */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">My Leave & Attendance</h1>
          <p className="text-sm text-gray-600">Manage your attendance, breaks, overtime, and leave records.</p>
        </div>
        {activeTab === "attendance" && (
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
            Request Overtime
          </button>
        )}
        {activeTab === "leave" && (
          <button onClick={() => setShowLeaveModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" /> New Leave Request
          </button>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6 bg-white">
        <div className="flex gap-0 px-6">
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
        <div className="space-y-6">

          {/* Today's Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Today's Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">Date</p>
                <p className="text-sm font-semibold text-gray-900">Oct 18, 2024</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Clock In</p>
                <p className="text-sm font-semibold text-gray-900">09:00 AM</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Clock Out</p>
                <p className="text-sm font-semibold text-gray-900">06:15 PM</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Hours</p>
                <p className="text-sm font-semibold text-gray-900">9h 15m</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Overtime</p>
                <p className="text-sm font-semibold text-blue-600">1h 15m</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Status</p>
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                  Present
                </span>
              </div>
            </div>
          </div>

          {/* Attendance Records */}
          <div
            className="w-full bg-white rounded-[12px] p-3 flex flex-col gap-2"
            style={{
              padding: "16px 20px",
            }}
          >
            {/* Header */}
            <div>
              <h2 className="text-base font-semibold text-[#1A1A1A] mb-1">Attendance Records</h2>
              <p className="text-xs text-[#7A7A7A] mb-2">Your recent attendance history</p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-3 py-2 text-left text-xs font-bold text-gray-900">Date</th>
                    <th className="px-3 py-2 text-left text-xs font-bold text-gray-900">Clock In</th>
                    <th className="px-3 py-2 text-left text-xs font-bold text-gray-900">Clock Out</th>
                    <th className="px-3 py-2 text-left text-xs font-bold text-gray-900">Total Hours</th>
                    <th className="px-3 py-2 text-left text-xs font-bold text-gray-900">Status</th>
                    <th className="px-3 py-2 text-left text-xs font-bold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 01 */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-3 py-2 text-xs text-gray-900">2024-12-10</td>
                    <td className="px-3 py-2 text-xs text-gray-900">09:00</td>
                    <td className="px-3 py-2 text-xs text-gray-900">17:30</td>
                    <td className="px-3 py-2 text-xs text-gray-900">8.5h</td>
                    <td className="px-3 py-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: "#2F80ED" }}>
                        Present
                      </span>
                    </td>
                    <td className="px-3 py-2 text-xs">—</td>
                  </tr>

                  {/* Row 02 */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-3 py-2 text-xs text-gray-900">2024-12-09</td>
                    <td className="px-3 py-2 text-xs text-gray-900">09:15</td>
                    <td className="px-3 py-2 text-xs text-gray-900">17:30</td>
                    <td className="px-3 py-2 text-xs text-gray-900">8.25h</td>
                    <td className="px-3 py-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-[#555555]" style={{ backgroundColor: "#E0E0E0" }}>
                        Late
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <button
                        className="px-3 py-1 text-xs font-medium text-gray-900 bg-white border border-[#E0E0E0] rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Request Correction
                      </button>
                    </td>
                  </tr>

                  {/* Row 03 */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-3 py-2 text-xs text-gray-900">2024-12-06</td>
                    <td className="px-3 py-2 text-xs text-gray-900">09:00</td>
                    <td className="px-3 py-2 text-xs text-gray-900">17:30</td>
                    <td className="px-3 py-2 text-xs text-gray-900">8.5h</td>
                    <td className="px-3 py-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: "#2F80ED" }}>
                        Present
                      </span>
                    </td>
                    <td className="px-3 py-2 text-xs">—</td>
                  </tr>

                  {/* Row 04 */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-3 py-2 text-xs text-gray-900">2024-12-05</td>
                    <td className="px-3 py-2 text-xs text-gray-900">09:00</td>
                    <td className="px-3 py-2 text-xs text-gray-900">13:00</td>
                    <td className="px-3 py-2 text-xs text-gray-900">4.0h</td>
                    <td className="px-3 py-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-[#555555]" style={{ backgroundColor: "#F2F2F2" }}>
                        Half-day
                      </span>
                    </td>
                    <td className="px-3 py-2 text-xs">—</td>
                  </tr>

                  {/* Row 05 */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-3 py-2 text-xs text-gray-900">2024-12-04</td>
                    <td className="px-3 py-2 text-xs text-gray-900">—</td>
                    <td className="px-3 py-2 text-xs text-gray-900">—</td>
                    <td className="px-3 py-2 text-xs text-gray-900">0h</td>
                    <td className="px-3 py-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: "#EB5757" }}>
                        Absent
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <button
                        className="px-3 py-1 text-xs font-medium text-gray-900 bg-white border border-[#E0E0E0] rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Request Correction
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ===== LEAVE TAB ===== */}
      {activeTab === "leave" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT PANEL — Available Leave */}
          <div className="bg-white rounded-[16px] p-8 flex flex-col gap-5" style={{ padding: "28px 32px" }}>
            {/* Section Title */}
            <div>
              <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-3">Available Leave</h2>
              <p className="text-sm text-[#7A7A7A]">Your current leave entitlements and usage</p>
            </div>

            {/* Leave Cards */}
            <div className="flex flex-col gap-6">
              {/* Annual Leave */}
              <div>
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Annual Leave</h3>
                    <p className="text-sm text-gray-600">Used: 8 days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">17 available</p>
                    <p className="text-sm text-gray-600">Total: 25 days</p>
                  </div>
                </div>
                <div className="w-full bg-[#E8EBF0] rounded-full h-1.5">
                  <div className="bg-[#2F80ED] h-1.5 rounded-full" style={{ width: "32%" }}></div>
                </div>
              </div>

              {/* Sick Leave */}
              <div>
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Sick Leave</h3>
                    <p className="text-sm text-gray-600">Used: 3 days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">7 available</p>
                    <p className="text-sm text-gray-600">Total: 10 days</p>
                  </div>
                </div>
                <div className="w-full bg-[#E8EBF0] rounded-full h-1.5">
                  <div className="bg-[#2F80ED] h-1.5 rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>

              {/* Personal Leave */}
              <div>
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Personal Leave</h3>
                    <p className="text-sm text-gray-600">Used: 2 days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">3 available</p>
                    <p className="text-sm text-gray-600">Total: 5 days</p>
                  </div>
                </div>
                <div className="w-full bg-[#E8EBF0] rounded-full h-1.5">
                  <div className="bg-[#2F80ED] h-1.5 rounded-full" style={{ width: "40%" }}></div>
                </div>
              </div>

              {/* Maternity Leave */}
              <div>
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Maternity Leave</h3>
                    <p className="text-sm text-gray-600">Used: 0 days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">90 available</p>
                    <p className="text-sm text-gray-600">Total: 90 days</p>
                  </div>
                </div>
                <div className="w-full bg-[#E8EBF0] rounded-full h-1.5">
                  <div className="bg-[#2F80ED] h-1.5 rounded-full" style={{ width: "0%" }}></div>
                </div>
              </div>
            </div>

            {/* Request Leave Button */}
            <button
              onClick={() => setShowLeaveModal(true)}
              className="w-full mt-4 h-12 bg-[#2F80ED] text-white font-semibold rounded-[10px] flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Request Leave</span>
            </button>
          </div>

          {/* RIGHT PANEL — Recent Activities */}
          <div className="bg-white rounded-[16px] p-8 flex flex-col gap-4" style={{ padding: "28px 32px" }}>
            {/* Section Title */}
            <div>
              <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-3">Recent Activities</h2>
              <p className="text-sm text-[#7A7A7A]">Latest leave-related updates</p>
            </div>

            {/* Activity Cards */}
            <div className="flex flex-col gap-4">
              {/* Activity 1 */}
              <div className="bg-white border border-[#E8EBF0] rounded-[14px] p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF9800" }}></div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Leave request submitted</p>
                    <p className="text-xs text-gray-600 mt-1">Dec 20-30 Annual Leave</p>
                  </div>
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: "#FFA726" }}>
                  Pending
                </span>
              </div>

              {/* Activity 2 */}
              <div className="bg-white border border-[#E8EBF0] rounded-[14px] p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#27AE60" }}></div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Sick leave approved</p>
                    <p className="text-xs text-gray-600 mt-1">Nov 15 • Medical appointment</p>
                  </div>
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: "#27AE60" }}>
                  Approved
                </span>
              </div>

              {/* Activity 3 */}
              <div className="bg-white border border-[#E8EBF0] rounded-[14px] p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#27AE60" }}></div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Personal leave approved</p>
                    <p className="text-xs text-gray-600 mt-1">Oct 22 • Family emergency</p>
                  </div>
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: "#27AE60" }}>
                  Approved
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leave Request Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">New Leave Request</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Vacation Leave</option>
                  <option>Sick Leave</option>
                  <option>Emergency Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Enter reason for leave"></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowLeaveModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
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
    </Layout>
  );
}
