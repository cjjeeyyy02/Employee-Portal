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

interface PerformanceRanking {
  rank: number;
  name: string;
  tasks: number;
  efficiency: number;
  score: number;
}

const performanceRanking: PerformanceRanking[] = [
  {
    rank: 1,
    name: "Emma Wilson",
    tasks: 23,
    efficiency: 95,
    score: 4.6,
  },
  {
    rank: 2,
    name: "Alex Kim",
    tasks: 19,
    efficiency: 92,
    score: 4.5,
  },
  {
    rank: 3,
    name: "Mike Chen",
    tasks: 27,
    efficiency: 88,
    score: 4.3,
  },
  {
    rank: 4,
    name: "Lisa Park",
    tasks: 15,
    efficiency: 85,
    score: 4.2,
  },
];

interface PerformanceDistribution {
  range: string;
  minScore: number;
  maxScore: number;
  percentage: number;
  count: number;
  color: string;
}

const performanceDistribution: PerformanceDistribution[] = [
  {
    range: "Excellent",
    minScore: 4.5,
    maxScore: 5.0,
    percentage: 25,
    count: 2,
    color: "bg-green-100 text-green-800",
  },
  {
    range: "Good",
    minScore: 4.0,
    maxScore: 4.4,
    percentage: 50,
    count: 4,
    color: "bg-blue-100 text-blue-800",
  },
  {
    range: "Satisfactory",
    minScore: 3.5,
    maxScore: 3.9,
    percentage: 25,
    count: 2,
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    range: "Needs Improvement",
    minScore: 0,
    maxScore: 3.4,
    percentage: 0,
    count: 0,
    color: "bg-red-100 text-red-800",
  },
];

interface Prediction {
  id: string;
  title: string;
  probability: "high" | "medium" | "low";
  impact: "high" | "medium" | "low";
  description: string;
  expected: string;
}

interface CapacityForecast {
  week: string;
  dateRange: string;
  availability: number;
}

interface PerformanceForecast {
  type: "positive" | "watch" | "opportunity";
  title: string;
  description: string;
}

const predictions: Prediction[] = [
  {
    id: "1",
    title: "Leave Conflict",
    probability: "high",
    impact: "high",
    description: "3 team members likely to request leave during holiday season",
    expected: "Expected: Dec 20-30, 2024",
  },
  {
    id: "2",
    title: "Task Overload",
    probability: "medium",
    impact: "medium",
    description: "Mike Chen approaching capacity limit",
    expected: "Expected: Next 2 weeks",
  },
  {
    id: "3",
    title: "Performance Dip",
    probability: "low",
    impact: "medium",
    description: "Team performance may decrease due to year-end pressure",
    expected: "Expected: End of Q4",
  },
];

const capacityForecast: CapacityForecast[] = [
  { week: "Week 1", dateRange: "Dec 16-22", availability: 75 },
  { week: "Week 2", dateRange: "Dec 23-29", availability: 45 },
  { week: "Week 3", dateRange: "Dec 30-Jan 5", availability: 30 },
  { week: "Week 4", dateRange: "Jan 6-12", availability: 95 },
];

const performanceForecast: PerformanceForecast[] = [
  {
    type: "positive",
    title: "Positive Trend",
    description: "Team performance likely to improve by 5% next quarter based on current trajectory",
  },
  {
    type: "watch",
    title: "Watch Item",
    description: "Holiday season may temporarily impact task completion rates",
  },
  {
    type: "opportunity",
    title: "Opportunity",
    description: "Q1 2025 ideal time for skill development initiatives",
  },
];

const getProbabilityColor = (probability: string) => {
  switch (probability) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getImpactColor = (impact: string) => {
  switch (impact) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-orange-100 text-orange-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getForecastColor = (type: string) => {
  switch (type) {
    case "positive":
      return "bg-green-100 text-green-800 border-green-200";
    case "watch":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "opportunity":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

interface AIInsight {
  id: string;
  category: string;
  recommendation: string;
  details: string;
  actionLabel: string;
  actionType: "primary" | "secondary";
}

const aiInsights: AIInsight[] = [
  {
    id: "1",
    category: "Performance Optimization",
    recommendation: "Emma Wilson shows potential for leadership roles based on recent performance metrics and peer feedback.",
    details: "Emma Wilson (rank #1) with consistent 4.6 performance score",
    actionLabel: "View Details",
    actionType: "primary",
  },
  {
    id: "2",
    category: "Workload Balance",
    recommendation: "Consider redistributing tasks from Mike Chen (95% capacity) to Lisa Park (60% capacity).",
    details: "Optimize team productivity and prevent burnout",
    actionLabel: "Auto-Assign",
    actionType: "primary",
  },
  {
    id: "3",
    category: "Goal Achievement",
    recommendation: "Team is on track to exceed Q4 targets by 12%. Consider setting stretch goals for Q1 2025.",
    details: "Current trajectory shows strong positive momentum",
    actionLabel: "Set Goals",
    actionType: "primary",
  },
  {
    id: "4",
    category: "Team Development",
    recommendation: "Cross-training opportunities identified between Alex Kim and Lisa Park for skill diversification.",
    details: "Enhance team capabilities and reduce knowledge silos",
    actionLabel: "Plan Training",
    actionType: "primary",
  },
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
      <div className="bg-white min-h-screen">
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
            <div className="space-y-6 pb-8">
              {/* Individual Performance Ranking */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  Individual Performance Ranking
                </h2>
                <p className="text-xs text-gray-500 mb-4">
                  Team members ranked by overall performance
                </p>

                <div className="space-y-3">
                  {performanceRanking.map((member) => (
                    <div
                      key={member.rank}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">
                          {member.rank}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {member.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {member.tasks} tasks • {member.efficiency}% efficiency
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          {member.score}
                        </p>
                        <p className="text-xs text-gray-600">
                          Performance Score
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Distribution */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  Performance Distribution
                </h2>
                <p className="text-xs text-gray-500 mb-4">
                  Team performance score breakdown
                </p>

                <div className="space-y-3">
                  {performanceDistribution.map((dist, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">
                            {dist.range}
                          </span>
                          <span className="text-xs text-gray-600">
                            ({dist.minScore}-{dist.maxScore})
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">
                            {dist.percentage}%
                          </p>
                          <p className="text-xs text-gray-600">
                            ({dist.count} members)
                          </p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${dist.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Forecasting Tab */}
          {activeTab === "forecasting" && (
            <div className="space-y-6 pb-8">
              {/* Predictive Analytics */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  Predictive Analytics
                </h2>
                <p className="text-xs text-gray-500 mb-4">
                  AI-powered predictions for team management
                </p>

                <div className="space-y-3">
                  {predictions.map((pred) => (
                    <div
                      key={pred.id}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-sm text-gray-900">
                            {pred.title}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1">
                            {pred.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getProbabilityColor(pred.probability)}`}
                        >
                          {pred.probability.charAt(0).toUpperCase() + pred.probability.slice(1)} Probability
                        </span>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getImpactColor(pred.impact)}`}
                        >
                          {pred.impact.charAt(0).toUpperCase() + pred.impact.slice(1)} Impact
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-600">
                          {pred.expected}
                        </p>
                        <button className="px-3 py-1.5 h-8 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded">
                          Take Action
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capacity Forecast */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  Capacity Forecast
                </h2>
                <p className="text-xs text-gray-500 mb-4">
                  Projected team availability next 30 days
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {capacityForecast.map((forecast, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-gray-50 rounded-lg border border-gray-100"
                    >
                      <p className="text-xs font-semibold text-gray-900 mb-1">
                        {forecast.week}
                      </p>
                      <p className="text-xs text-gray-600 mb-2">
                        {forecast.dateRange}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${forecast.availability}%` }}
                        />
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        {forecast.availability}% available
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Forecast */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  Performance Forecast
                </h2>
                <p className="text-xs text-gray-500 mb-4">
                  Predicted team performance trends
                </p>

                <div className="space-y-3">
                  {performanceForecast.map((forecast, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border-2 ${getForecastColor(forecast.type)}`}
                    >
                      <p className="text-xs font-semibold text-gray-900 mb-1">
                        {forecast.title}
                      </p>
                      <p className="text-xs text-gray-600">
                        {forecast.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AI Insights Tab */}
          {activeTab === "ai-insights" && (
            <div className="space-y-4 pb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  AI-Powered Insights
                </h2>
                <p className="text-xs text-gray-500">
                  Smart recommendations for team management
                </p>
              </div>

              <div className="space-y-3">
                {aiInsights.map((insight) => (
                  <div
                    key={insight.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-gray-900 mb-2">
                          {insight.category}
                        </h3>
                        <p className="text-xs text-gray-600 mb-2">
                          {insight.recommendation}
                        </p>
                        <p className="text-xs text-gray-500">
                          {insight.details}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      {insight.actionType === "primary" ? (
                        <button className="px-3 py-1.5 h-8 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded">
                          {insight.actionLabel}
                        </button>
                      ) : (
                        <Button variant="outline" className="h-8 text-xs px-3">
                          {insight.actionLabel}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
