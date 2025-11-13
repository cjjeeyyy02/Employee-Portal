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
        <div className="mb-4">
          <h1 className="text-2xl font-normal text-black" style={{ fontFamily: 'Poppins, -apple-system, Roboto, Helvetica, sans-serif' }}>
            Welcome back, John!
          </h1>
          <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Poppins, -apple-system, Roboto, Helvetica, sans-serif' }}>Here's your dashboard overview for today</p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* Left Section - 70% */}
          <div className="lg:col-span-8 space-y-4">
            {/* Top Row - 4 Small Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="bg-white border border-gray-300 rounded-lg p-2 flex flex-col justify-between h-20">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-gray-600 font-medium leading-tight truncate text-[11px]">{metric.label}</p>
                        <p className="text-sm font-bold text-gray-900 mt-0 leading-tight">{metric.value}</p>
                        {metric.subtext && (
                          <p className="text-xs text-gray-600 mt-0 flex items-center gap-0.5 leading-tight text-[10px]">
                            <ArrowUpRight className="w-2 h-2 text-green-600 flex-shrink-0" />
                            <span className="truncate">{metric.subtext}</span>
                          </p>
                        )}
                      </div>
                      <div className={`${metric.bgColor} p-1 rounded flex-shrink-0`}>
                        <Icon className={`w-3 h-3 ${metric.iconColor}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Middle Row - 2 Medium Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Pending Tasks Card */}
              <div className="bg-white border border-gray-300 rounded-lg p-3 flex flex-col h-[260px]">
                <div className="mb-2">
                  <h2 className="text-base font-bold text-gray-900">Pending Tasks</h2>
                  <p className="text-xs text-gray-600 mt-0.5">Tasks that require your attention</p>
                </div>

                <div className="flex-1 space-y-2 overflow-y-auto">
                  {/* Task 1 */}
                  <div className="pb-2 border-b border-gray-200">
                    <p className="text-xs font-semibold text-gray-900">Complete Q4 Performance Review</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-600">Due: Tomorrow</span>
                      <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-700 rounded font-semibold">High</span>
                    </div>
                  </div>

                  {/* Task 2 */}
                  <div className="pb-2 border-b border-gray-200">
                    <p className="text-xs font-semibold text-gray-900">Submit Travel Expense Report</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-600">Due: Friday</span>
                      <span className="text-xs px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded font-semibold">Med</span>
                    </div>
                  </div>

                  {/* Task 3 */}
                  <div className="pb-2">
                    <p className="text-xs font-semibold text-gray-900">Team Meeting Preparation</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-600">Due: Next Week</span>
                      <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded font-semibold">Low</span>
                    </div>
                  </div>
                </div>

                {/* View All Tasks Link */}
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <button className="text-blue-600 hover:text-blue-700 text-xs font-semibold">View All Tasks →</button>
                </div>
              </div>

              {/* Pending Tasks List Card */}
              <div className="bg-white border border-gray-300 rounded-lg p-3 flex flex-col h-[260px]">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-base font-bold text-gray-900">Pending Tasks</h2>
                  <span className="text-xs px-2 py-0.5 bg-gray-600 text-white rounded-full font-semibold text-[10px]">3</span>
                </div>

                <div className="flex-1 space-y-2 overflow-y-auto">
                  {/* Task 1 */}
                  <div className="pb-2 border-b border-gray-200">
                    <p className="text-xs font-semibold text-gray-900">Q4 Performance Review</p>
                    <p className="text-xs text-gray-600 mt-0.5">Oct 25, 2024</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs px-1.5 py-0 bg-red-100 text-red-700 rounded font-semibold text-[10px]">Pending</span>
                      <span className="text-xs px-1.5 py-0 bg-red-100 text-red-700 rounded font-semibold text-[10px]">High</span>
                    </div>
                  </div>

                  {/* Task 2 */}
                  <div className="pb-2 border-b border-gray-200">
                    <p className="text-xs font-semibold text-gray-900">Complete Training Module</p>
                    <p className="text-xs text-gray-600 mt-0.5">Oct 30, 2024</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs px-1.5 py-0 bg-yellow-100 text-yellow-700 rounded font-semibold text-[10px]">Progress</span>
                      <span className="text-xs px-1.5 py-0 bg-yellow-100 text-yellow-700 rounded font-semibold text-[10px]">Med</span>
                    </div>
                  </div>

                  {/* Task 3 */}
                  <div className="pb-2">
                    <p className="text-xs font-semibold text-gray-900">Submit Project Deliverables</p>
                    <p className="text-xs text-gray-600 mt-0.5">Nov 5, 2024</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs px-1.5 py-0 bg-red-100 text-red-700 rounded font-semibold text-[10px]">Pending</span>
                      <span className="text-xs px-1.5 py-0 bg-red-100 text-red-700 rounded font-semibold text-[10px]">High</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - 1 Large Card - Upcoming Events */}
            <div className="bg-white border border-gray-300 rounded-lg p-3 flex flex-col h-[240px]">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-bold text-gray-900">📅 Upcoming Events</h2>
                <span className="text-xs px-2 py-0.5 bg-gray-600 text-white rounded-full font-semibold text-[10px]">4 Events</span>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-2 overflow-y-auto">
                {/* Event 1 */}
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <h3 className="text-xs font-semibold text-gray-900">Company-Wide Town Hall</h3>
                  <p className="text-xs text-gray-600 mt-1 flex items-start gap-1">
                    🗓️ <span className="text-[11px]">Nov 14 10:00 AM</span>
                  </p>
                  <p className="text-xs text-gray-600 mt-1 flex items-start gap-1 leading-tight">
                    📌 <span className="text-[11px]">Mandatory for all staff…</span>
                  </p>
                </div>

                {/* Event 2 */}
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <h3 className="text-xs font-semibold text-gray-900">Data Security Training</h3>
                  <p className="text-xs text-gray-600 mt-1 flex items-start gap-1">
                    🗓️ <span className="text-[11px]">Nov 30 (5 days)</span>
                  </p>
                  <p className="text-xs text-gray-600 mt-1 flex items-start gap-1 leading-tight">
                    💬 <span className="text-[11px]">Complete for new hires…</span>
                  </p>
                </div>
              </div>

              {/* View Calendar Link */}
              <div className="mt-2 pt-2 border-t border-gray-200">
                <button className="text-blue-600 hover:text-blue-700 text-xs font-semibold">
                  🔗 View Calendar
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - 30% */}
          <div className="lg:col-span-4 space-y-4">
            {/* Top Tall Card - Announcements */}
            <div className="bg-white border border-gray-300 rounded-lg p-3 flex flex-col h-[380px]">
              <h2 className="text-base font-bold text-gray-900 mb-2">Announcements</h2>

              <div className="flex-1 space-y-3 overflow-y-auto">
                {/* Announcement 1 */}
                <div className="pb-3 border-b border-gray-200">
                  <h3 className="text-xs font-semibold text-gray-900">Holiday Schedule Update</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-tight">Please review the updated holiday schedule for Oct 26, 2023.</p>
                </div>

                {/* Announcement 2 */}
                <div className="pb-3">
                  <h3 className="text-xs font-semibold text-gray-900">Benefits Enrollment Open</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-tight">Annual benefits enrollment is now open until Oct 25, 2023.</p>
                </div>
              </div>

              {/* View All Link */}
              <div className="mt-2 pt-2 border-t border-gray-200">
                <button className="text-blue-600 hover:text-blue-700 text-xs font-semibold flex items-center gap-1">
                  🔗 View All →
                </button>
              </div>
            </div>

            {/* Bottom Medium Card - Quick Actions */}
            <div className="bg-white border border-gray-300 rounded-lg p-3 flex flex-col h-[180px]">
              <h2 className="text-base font-bold text-gray-900 mb-2">Quick Actions</h2>

              <div className="flex-1 space-y-1.5">
                <button className="w-full px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
                  📋 Request Leave
                </button>
                <button className="w-full px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
                  ⏱️ Overtime
                </button>
                <button className="w-full px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
                  📝 Submit Request
                </button>
                <button className="w-full px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
                  ✨ New Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
