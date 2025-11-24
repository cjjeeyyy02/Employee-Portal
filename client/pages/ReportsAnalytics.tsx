import { useState } from "react";
import { BarChart3, Download, Settings, RotateCcw, TrendingUp, Users, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const MetricCard = ({
  icon: Icon,
  title,
  value,
  change,
  changeType,
}: {
  icon: React.ElementType;
  title: string;
  value: string | number;
  change: string;
  changeType: "increase" | "decrease" | "stable";
}) => {
  const changeColor =
    changeType === "increase"
      ? "text-green-600"
      : changeType === "decrease"
      ? "text-red-600"
      : "text-gray-600";

  return (
    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xs font-medium text-slate-600">{title}</h3>
        <Icon className="w-4 h-4 text-slate-400" />
      </div>
      <div className="mb-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <p className={`text-xs font-medium ${changeColor}`}>{change}</p>
    </div>
  );
};

const performanceData = [
  { month: "Jul", performance: 3.8, tasks: 45, attendance: 94 },
  { month: "Aug", performance: 4.0, tasks: 52, attendance: 95 },
  { month: "Sep", performance: 4.1, tasks: 58, attendance: 96 },
  { month: "Oct", performance: 4.2, tasks: 63, attendance: 97 },
  { month: "Nov", performance: 4.3, tasks: 67, attendance: 96 },
  { month: "Dec", performance: 4.2, tasks: 71, attendance: 96 },
];

const leaveData = [
  { type: "Annual Leave", used: 45, total: 200, percentage: 22.5 },
  { type: "Sick Leave", used: 12, total: 80, percentage: 15 },
  { type: "Personal Leave", used: 8, total: 40, percentage: 20 },
  { type: "Maternity Leave", used: 90, total: 180, percentage: 50 },
];

const topPerformers = [
  { rank: 1, name: "Emma Wilson", rating: 4.6 },
  { rank: 2, name: "Alex Kim", rating: 4.5 },
  { rank: 3, name: "Mike Chen", rating: 4.3 },
];

export default function ReportsAnalytics() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "performance-analytics", label: "Performance Analytics" },
    { id: "forecasting", label: "Forecasting" },
    { id: "ai-insights", label: "AI Insights" },
  ];

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  Reports & Insights
                </h1>
                <p className="text-xs text-gray-600">
                  Analytics and forecasting for your team
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2 h-8 text-xs px-2">
                  Last Month
                </Button>
                <Button variant="outline" className="gap-2 h-8 text-xs px-2">
                  <Settings className="w-3 h-3" />
                  Filters
                </Button>
                <Button variant="outline" className="gap-2 h-8 text-xs px-2">
                  <RotateCcw className="w-3 h-3" />
                  Refresh
                </Button>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700 h-8 text-xs px-2">
                  <Download className="w-3 h-3" />
                  Export Report
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 py-4">
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

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6 pb-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-6 gap-3">
                <MetricCard
                  icon={Users}
                  title="Team Size"
                  value="8"
                  change="+1 this month"
                  changeType="increase"
                />
                <MetricCard
                  icon={TrendingUp}
                  title="Avg Performance"
                  value="4.2/5"
                  change="+0.2 vs last month"
                  changeType="increase"
                />
                <MetricCard
                  icon={CheckCircle2}
                  title="Task Completion"
                  value="87%"
                  change="+5% vs last month"
                  changeType="increase"
                />
                <MetricCard
                  icon={Clock}
                  title="Attendance"
                  value="96.2%"
                  change="+1.2% vs last month"
                  changeType="increase"
                />
                <MetricCard
                  icon={AlertCircle}
                  title="Leave Utilization"
                  value="65%"
                  change="Stable"
                  changeType="stable"
                />
                <MetricCard
                  icon={BarChart3}
                  title="Productivity"
                  value="92%"
                  change="+3% vs last month"
                  changeType="increase"
                />
              </div>

              {/* Performance Trends */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Performance Trends
                </h2>
                <p className="text-xs text-gray-600 mb-4">
                  6-month team performance overview
                </p>
                <div className="overflow-x-auto">
                  <div className="flex gap-4">
                    {performanceData.map((data) => (
                      <div
                        key={data.month}
                        className="flex-shrink-0 w-32 p-3 bg-gray-50 rounded-lg border border-gray-100"
                      >
                        <h3 className="text-xs font-semibold text-gray-900 mb-2">
                          {data.month}
                        </h3>
                        <div className="space-y-1 text-xs">
                          <div>
                            <span className="text-gray-600">Perf: </span>
                            <span className="font-semibold text-gray-900">
                              {data.performance}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Tasks: </span>
                            <span className="font-semibold text-gray-900">
                              {data.tasks}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Attend: </span>
                            <span className="font-semibold text-gray-900">
                              {data.attendance}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Leave Utilization */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Leave Utilization
                </h2>
                <p className="text-xs text-gray-600 mb-4">
                  Team leave usage by type
                </p>
                <div className="space-y-3">
                  {leaveData.map((leave) => (
                    <div key={leave.type} className="space-y-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-900">
                          {leave.type}
                        </span>
                        <span className="text-xs text-gray-600">
                          {leave.used}/{leave.total} days ({leave.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${leave.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Task Analytics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Task Analytics
                  </h2>
                  <p className="text-xs text-gray-600 mb-4">
                    Team task performance metrics
                  </p>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h3 className="text-xs font-semibold text-gray-900 mb-2">
                        Task Distribution
                      </h3>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Completed</span>
                          <span className="font-semibold text-green-600">
                            136
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">In Progress</span>
                          <span className="font-semibold text-blue-600">
                            15
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Overdue</span>
                          <span className="font-semibold text-red-600">5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Efficiency Metrics
                  </h2>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Avg Completion Time
                          </span>
                          <span className="font-semibold text-gray-900">
                            2.3 days
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">On-Time Delivery</span>
                          <span className="font-semibold text-gray-900">
                            89%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h3 className="text-xs font-semibold text-gray-900 mb-2">
                        Top Performers
                      </h3>
                      <div className="space-y-1">
                        {topPerformers.map((performer) => (
                          <div
                            key={performer.rank}
                            className="flex justify-between text-xs"
                          >
                            <span className="text-gray-600">
                              {performer.rank}. {performer.name}
                            </span>
                            <span className="font-semibold text-gray-900">
                              {performer.rating}/5
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Performance Analytics Tab */}
          {activeTab === "performance-analytics" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 pb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Performance Analytics
              </h2>
              <p className="text-xs text-gray-600">
                Detailed performance analytics and trends
              </p>
            </div>
          )}

          {/* Forecasting Tab */}
          {activeTab === "forecasting" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 pb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Forecasting
              </h2>
              <p className="text-xs text-gray-600">
                AI-powered forecasting and predictions
              </p>
            </div>
          )}

          {/* AI Insights Tab */}
          {activeTab === "ai-insights" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 pb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                AI Insights
              </h2>
              <p className="text-xs text-gray-600">
                AI-generated insights and recommendations
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
