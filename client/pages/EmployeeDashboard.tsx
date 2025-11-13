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
        <h1 className="text-3xl font-normal text-black mb-8" style={{ fontFamily: 'Poppins, -apple-system, Roboto, Helvetica, sans-serif' }}>
          Welcome Back, John Doe
        </h1>

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

              <div className="bg-white border border-gray-300 rounded h-[340px]"></div>
            </div>

            {/* Bottom Row - 1 Large Card */}
            <div className="bg-white border border-gray-300 rounded h-[297px]"></div>
          </div>

          {/* Right Section - 30% */}
          <div className="lg:col-span-4 space-y-4">
            {/* Top Tall Card */}
            <div className="bg-white border border-gray-300 rounded h-[542px]"></div>

            {/* Bottom Medium Card */}
            <div className="bg-white border border-gray-300 rounded h-[242px]"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
