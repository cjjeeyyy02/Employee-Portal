import { Briefcase, AlertCircle, TrendingUp, Calendar, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";

export default function EmployeeDashboard() {
  const metrics = [
    {
      label: "Pending Tasks",
      value: "6",
      icon: Briefcase,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Pending Requests",
      value: "3",
      icon: AlertCircle,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "KPI Score",
      value: "85%",
      subtext: "+3% from last month",
      icon: TrendingUp,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "# of Meetings Today",
      value: "2",
      icon: Calendar,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-normal text-black" style={{ fontFamily: 'Poppins, -apple-system, Roboto, Helvetica, sans-serif' }}>
            Welcome back, John!
          </h1>
          <p className="text-base text-gray-600 mt-2">Here's your dashboard overview for today</p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Section - 70% */}
          <div className="lg:col-span-8 space-y-4">
            {/* Top Row - 4 Small Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="bg-white border border-gray-300 rounded-lg p-3 flex flex-col justify-between h-24">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-gray-600 font-medium leading-tight truncate">{metric.label}</p>
                        <p className="text-lg font-bold text-gray-900 mt-0.5 leading-tight">{metric.value}</p>
                        {metric.subtext && (
                          <p className="text-xs text-gray-600 mt-0.5 flex items-center gap-0.5 leading-tight">
                            <ArrowUpRight className="w-2.5 h-2.5 text-green-600 flex-shrink-0" />
                            <span className="truncate">{metric.subtext}</span>
                          </p>
                        )}
                      </div>
                      <div className={`${metric.bgColor} p-1.5 rounded flex-shrink-0`}>
                        <Icon className={`w-4 h-4 ${metric.iconColor}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Middle Row - 2 Medium Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pending Tasks Card */}
              <div className="bg-white border border-gray-300 rounded-lg p-5 flex flex-col h-[340px]">
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Pending Tasks</h2>
                  <p className="text-sm text-gray-600 mt-1">Tasks that require your attention</p>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto">
                  {/* Task 1 */}
                  <div className="pb-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">Complete Q4 Performance Review</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-600">Due: Tomorrow</span>
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded font-semibold">High Priority</span>
                    </div>
                  </div>

                  {/* Task 2 */}
                  <div className="pb-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">Submit Travel Expense Report</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-600">Due: Friday</span>
                      <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded font-semibold">Medium</span>
                    </div>
                  </div>

                  {/* Task 3 */}
                  <div className="pb-3">
                    <p className="text-sm font-semibold text-gray-900">Team Meeting Preparation</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-600">Due: Next Week</span>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded font-semibold">Low</span>
                    </div>
                  </div>
                </div>

                {/* View All Tasks Link */}
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">View All Tasks →</button>
                </div>
              </div>

              {/* Pending Tasks List Card */}
              <div className="bg-white border border-gray-300 rounded-lg p-5 flex flex-col h-[340px]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Pending Tasks</h2>
                  <span className="text-xs px-2.5 py-1 bg-gray-600 text-white rounded-full font-semibold">3 tasks</span>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto">
                  {/* Task 1 */}
                  <div className="pb-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">Q4 Performance Review</p>
                    <p className="text-xs text-gray-600 mt-1">Due: Oct 25, 2024</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded font-semibold">Pending</span>
                      <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded font-semibold">High</span>
                    </div>
                  </div>

                  {/* Task 2 */}
                  <div className="pb-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">Complete Training Module</p>
                    <p className="text-xs text-gray-600 mt-1">Due: Oct 30, 2024</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded font-semibold">In Progress</span>
                      <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded font-semibold">Medium</span>
                    </div>
                  </div>

                  {/* Task 3 */}
                  <div className="pb-3">
                    <p className="text-sm font-semibold text-gray-900">Submit Project Deliverables</p>
                    <p className="text-xs text-gray-600 mt-1">Due: Nov 5, 2024</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded font-semibold">Pending</span>
                      <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded font-semibold">High</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - 1 Large Card - Upcoming Events */}
            <div className="bg-white border border-gray-300 rounded-lg p-5 flex flex-col h-[297px]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">📅 Upcoming Events</h2>
                <span className="text-xs px-2.5 py-1 bg-gray-600 text-white rounded-full font-semibold">4 Events This Month</span>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-4 overflow-y-auto">
                {/* Event 1 */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900">Company-Wide Town Hall</h3>
                  <p className="text-xs text-gray-600 mt-2 flex items-start gap-1">
                    🗓️ <span>Thursday, Nov 14 at 10:00 AM PST</span>
                  </p>
                  <p className="text-xs text-gray-600 mt-2 flex items-start gap-1 leading-relaxed">
                    📌 <span>Mandatory attendance for all staff. Topic: Q4 Performance…</span>
                  </p>
                </div>

                {/* Event 2 */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900">New Employee Data Security Training</h3>
                  <p className="text-xs text-gray-600 mt-2 flex items-start gap-1">
                    🗓️ <span>Due: Nov 30, 2024 (5 days)</span>
                  </p>
                  <p className="text-xs text-gray-600 mt-2 flex items-start gap-1 leading-relaxed">
                    💬 <span>Must complete training for new hires joining the Sales team to maintain compliance.</span>
                  </p>
                </div>
              </div>

              {/* View Calendar Link */}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                  🔗 View Full Events Calendar
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - 30% */}
          <div className="lg:col-span-4 space-y-4">
            {/* Top Tall Card - Announcements */}
            <div className="bg-white border border-gray-300 rounded-lg p-5 flex flex-col h-[542px]">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Announcements</h2>

              <div className="flex-1 space-y-4 overflow-y-auto">
                {/* Announcement 1 */}
                <div className="pb-4 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900">Company-Wide Holiday Schedule Update</h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">Please review the updated holiday schedule for Oct 26, 2023.</p>
                </div>

                {/* Announcement 2 */}
                <div className="pb-4">
                  <h3 className="text-sm font-semibold text-gray-900">New Benefits Enrollment Period Open</h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">Annual benefits enrollment is now open until Oct 25, 2023.</p>
                </div>
              </div>

              {/* View All Link */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1">
                  🔗 View All Announcements →
                </button>
              </div>
            </div>

            {/* Bottom Medium Card - Quick Actions */}
            <div className="bg-white border border-gray-300 rounded-lg p-5 flex flex-col h-[242px]">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Quick Actions</h2>

              <div className="flex-1 space-y-2">
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  📋 Request Leave
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  ⏱️ Request Overtime
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  📝 Submit Request
                </button>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  ✨ New Task / Assign Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
