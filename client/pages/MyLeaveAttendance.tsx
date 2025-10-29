import { useState } from "react";
import { Calendar, AlertCircle, CheckCircle, XCircle, Plus } from "lucide-react";
import Layout from "@/components/Layout";

type TabType = "attendance" | "leave";

export default function MyLeaveAttendance() {
  const [activeTab, setActiveTab] = useState<TabType>("attendance");
  const [showLeaveModal, setShowLeaveModal] = useState(false);


  return (
    <Layout>
      {/* Header Section */}
      <div className="mb-1.5 sm:mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
        <div>
          <h1 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5">My Leave & Attendance</h1>
          <p className="text-xs text-gray-600">Manage your attendance, breaks, overtime, and leave records.</p>
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
        <div className="space-y-6">

          {/* Today's Summary */}
          <div className="bg-white rounded-lg shadow-sm p-2.5 sm:p-3">
            <h2 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">Today's Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Date</p>
                <p className="text-sm font-semibold text-gray-900">Oct 18, 2024</p>
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
          </div>

          {/* Attendance Records */}
          <div
            className="w-full bg-white rounded-lg p-2.5 sm:p-3 flex flex-col gap-1.5 sm:gap-2"
            style={{
              padding: "12px 16px",
            }}
          >
            {/* Header */}
            <div>
              <h2 className="text-xs sm:text-sm font-semibold text-[#1A1A1A] mb-0.5">Attendance Records</h2>
              <p className="text-xs text-[#7A7A7A]">Your recent attendance history</p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-2 py-1.5 text-left text-xs font-bold text-gray-900">Date</th>
                    <th className="px-2 py-1.5 text-left text-xs font-bold text-gray-900">Clock In</th>
                    <th className="px-2 py-1.5 text-left text-xs font-bold text-gray-900">Clock Out</th>
                    <th className="px-2 py-1.5 text-left text-xs font-bold text-gray-900">Total Hours</th>
                    <th className="px-2 py-1.5 text-left text-xs font-bold text-gray-900">Status</th>
                    <th className="px-2 py-1.5 text-left text-xs font-bold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 01 */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-2 py-1.5 text-xs text-gray-900">2024-12-10</td>
                    <td className="px-2 py-1.5 text-xs text-gray-900">09:00</td>
                    <td className="px-2 py-1.5 text-xs text-gray-900">17:30</td>
                    <td className="px-2 py-1.5 text-xs text-gray-900">8.5h</td>
                    <td className="px-2 py-1.5">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: "#2F80ED" }}>
                        Present
                      </span>
                    </td>
                    <td className="px-2 py-1.5 text-xs">—</td>
                  </tr>

                  {/* Row 02 */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-2 py-1.5 text-xs text-gray-900">2024-12-09</td>
                    <td className="px-2 py-1.5 text-xs text-gray-900">09:15</td>
                    <td className="px-2 py-1.5 text-xs text-gray-900">17:30</td>
                    <td className="px-2 py-1.5 text-xs text-gray-900">8.25h</td>
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
        <div className="flex flex-col w-full gap-6">
          {/* Available Leave & Recent Activities Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* LEFT PANEL — Available Leave */}
          <div className="bg-white rounded-[16px] p-4 flex flex-col gap-3" style={{ padding: "16px 20px" }}>
            {/* Section Title */}
            <div>
              <h2 className="text-lg font-semibold text-[#1A1A1A] mb-1">Available Leave</h2>
              <p className="text-xs text-[#7A7A7A]">Your current leave entitlements and usage</p>
            </div>

            {/* Leave Cards */}
            <div className="flex flex-col gap-4">
              {/* Annual Leave */}
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-0.5">Annual Leave</h3>
                    <p className="text-xs text-gray-600">Used: 8 days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-gray-900">17 available</p>
                    <p className="text-xs text-gray-600">Total: 25 days</p>
                  </div>
                </div>
                <div className="w-full bg-[#E8EBF0] rounded-full h-1">
                  <div className="bg-[#2F80ED] h-1 rounded-full" style={{ width: "32%" }}></div>
                </div>
              </div>

              {/* Sick Leave */}
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-0.5">Sick Leave</h3>
                    <p className="text-xs text-gray-600">Used: 3 days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-gray-900">7 available</p>
                    <p className="text-xs text-gray-600">Total: 10 days</p>
                  </div>
                </div>
                <div className="w-full bg-[#E8EBF0] rounded-full h-1">
                  <div className="bg-[#2F80ED] h-1 rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>

              {/* Personal Leave */}
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-0.5">Personal Leave</h3>
                    <p className="text-xs text-gray-600">Used: 2 days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-gray-900">3 available</p>
                    <p className="text-xs text-gray-600">Total: 5 days</p>
                  </div>
                </div>
                <div className="w-full bg-[#E8EBF0] rounded-full h-1">
                  <div className="bg-[#2F80ED] h-1 rounded-full" style={{ width: "40%" }}></div>
                </div>
              </div>

              {/* Maternity Leave */}
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-0.5">Maternity Leave</h3>
                    <p className="text-xs text-gray-600">Used: 0 days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-gray-900">90 available</p>
                    <p className="text-xs text-gray-600">Total: 90 days</p>
                  </div>
                </div>
                <div className="w-full bg-[#E8EBF0] rounded-full h-1">
                  <div className="bg-[#2F80ED] h-1 rounded-full" style={{ width: "0%" }}></div>
                </div>
              </div>
            </div>

            {/* Request Leave Button */}
            <button
              onClick={() => setShowLeaveModal(true)}
              className="w-full mt-2 h-10 bg-[#2F80ED] text-white font-semibold rounded-[10px] flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Request Leave</span>
            </button>
          </div>

          {/* RIGHT PANEL — Recent Activities */}
          <div className="bg-white rounded-[16px] p-4 flex flex-col gap-2" style={{ padding: "16px 20px" }}>
            {/* Section Title */}
            <div>
              <h2 className="text-lg font-semibold text-[#1A1A1A] mb-1">Recent Activities</h2>
              <p className="text-xs text-[#7A7A7A]">Latest leave-related updates</p>
            </div>

            {/* Activity Cards */}
            <div className="flex flex-col gap-3">
              {/* Activity 1 */}
              <div className="bg-white border border-[#E8EBF0] rounded-[14px] p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#FF9800" }}></div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Leave request submitted</p>
                    <p className="text-xs text-gray-600 mt-0.5">Dec 20-30 Annual Leave</p>
                  </div>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white flex-shrink-0" style={{ backgroundColor: "#FFA726" }}>
                  Pending
                </span>
              </div>

              {/* Activity 2 */}
              <div className="bg-white border border-[#E8EBF0] rounded-[14px] p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#27AE60" }}></div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Sick leave approved</p>
                    <p className="text-xs text-gray-600 mt-0.5">Nov 15 • Medical appointment</p>
                  </div>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white flex-shrink-0" style={{ backgroundColor: "#27AE60" }}>
                  Approved
                </span>
              </div>

              {/* Activity 3 */}
              <div className="bg-white border border-[#E8EBF0] rounded-[14px] p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#27AE60" }}></div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Personal leave approved</p>
                    <p className="text-xs text-gray-600 mt-0.5">Oct 22 • Family emergency</p>
                  </div>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white flex-shrink-0" style={{ backgroundColor: "#27AE60" }}>
                  Approved
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Leave Requests Section Container */}
        <div className="w-full flex flex-col gap-6 bg-white rounded-[16px] p-8 self-stretch" style={{ padding: "28px 32px", marginTop: "24px" }}>
          {/* Section Header */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">My Leave Requests</h2>
            <p className="text-xs text-gray-600">Your leave request history and status</p>
          </div>

          {/* Leave Request Cards */}
          <div className="flex flex-col gap-3 w-full">
            {/* Request Card 1 */}
            <div className="w-full bg-white border border-gray-200 rounded-[12px] p-4 flex flex-col gap-3">
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Annual Leave</p>
                  <p className="text-xs text-gray-600 mt-1">Dec 20 - Dec 30, 2024</p>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white bg-green-500">Approved</span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-600">
                <span>10 days requested</span>
                <span>Requested on Dec 10, 2024</span>
              </div>
            </div>

            {/* Request Card 2 */}
            <div className="w-full bg-white border border-gray-200 rounded-[12px] p-4 flex flex-col gap-3">
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Sick Leave</p>
                  <p className="text-xs text-gray-600 mt-1">Nov 15, 2024</p>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white bg-green-500">Approved</span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-600">
                <span>1 day requested</span>
                <span>Requested on Nov 14, 2024</span>
              </div>
            </div>

            {/* Request Card 3 */}
            <div className="w-full bg-white border border-gray-200 rounded-[12px] p-4 flex flex-col gap-3">
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Personal Leave</p>
                  <p className="text-xs text-gray-600 mt-1">Oct 22, 2024</p>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white bg-blue-500">Pending</span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-600">
                <span>1 day requested</span>
                <span>Requested on Oct 20, 2024</span>
              </div>
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
