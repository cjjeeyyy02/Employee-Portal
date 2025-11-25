import { useState } from "react";
import { TrendingUp, Plus, Star, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

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
  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
    <div className="flex items-start justify-between mb-2">
      <h3 className="text-xs font-medium text-slate-600">{title}</h3>
      <Icon className="w-4 h-4 text-slate-400" />
    </div>
    <div className="mb-2">
      <p className={`text-2xl font-bold ${valueColor || "text-gray-900"}`}>
        {value}
      </p>
    </div>
    <p className="text-xs text-slate-500">{subtitle}</p>
  </div>
);

interface PerformanceReview {
  id: string;
  name: string;
  reviewType: string;
  status: "pending" | "in-progress" | "completed" | "overdue";
  reviewCycle: string;
  dueDate: string;
  completedDate?: string;
  selfRating?: number;
  managerRating?: number;
  overallRating?: number;
}

interface TeamGoal {
  id: string;
  employeeName: string;
  goalTitle: string;
  goalStatus: "on-track" | "at-risk" | "completed";
  description: string;
  category: string;
  dueDate: string;
  target: string;
  progress: number;
}

const reviews: PerformanceReview[] = [
  {
    id: "1",
    name: "Mike Chen",
    reviewType: "quarterly",
    status: "pending",
    reviewCycle: "Q4 2024",
    dueDate: "2024-12-20",
  },
  {
    id: "2",
    name: "Lisa Park",
    reviewType: "quarterly",
    status: "in-progress",
    reviewCycle: "Q4 2024",
    dueDate: "2024-12-18",
    selfRating: 4.2,
  },
  {
    id: "3",
    name: "Alex Kim",
    reviewType: "annual",
    status: "completed",
    reviewCycle: "Annual 2024",
    dueDate: "2024-11-30",
    completedDate: "2024-11-28",
    selfRating: 4.0,
    managerRating: 4.5,
    overallRating: 4.3,
  },
  {
    id: "4",
    name: "Emma Wilson",
    reviewType: "quarterly",
    status: "overdue",
    reviewCycle: "Q4 2024",
    dueDate: "2024-12-05",
  },
];

const teamGoals: TeamGoal[] = [
  {
    id: "1",
    employeeName: "Mike Chen",
    goalTitle: "Improve Code Quality",
    goalStatus: "on-track",
    description: "Increase code review approval rate to 95%",
    category: "Technical Excellence",
    dueDate: "2024-12-31",
    target: "95% approval rate",
    progress: 78,
  },
  {
    id: "2",
    employeeName: "Lisa Park",
    goalTitle: "Complete Design Certification",
    goalStatus: "at-risk",
    description: "Finish UX Design certification program",
    category: "Professional Development",
    dueDate: "2025-01-15",
    target: "Complete certification",
    progress: 45,
  },
  {
    id: "3",
    employeeName: "Alex Kim",
    goalTitle: "Mentor Junior Developers",
    goalStatus: "completed",
    description: "Successfully mentor 2 junior developers",
    category: "Leadership",
    dueDate: "2024-11-30",
    target: "2 junior developers",
    progress: 100,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "in-progress":
      return "bg-blue-100 text-blue-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "overdue":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusLabel = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const getGoalStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "on-track":
      return "bg-blue-100 text-blue-800";
    case "at-risk":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getGoalStatusLabel = (status: string) => {
  switch (status) {
    case "on-track":
      return "On Track";
    case "at-risk":
      return "At Risk";
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

export default function PerformanceReviews() {
  const [activeTab, setActiveTab] = useState("performance-reviews");

  const tabs = [
    { id: "performance-reviews", label: "Performance Reviews" },
    { id: "goal-monitoring", label: "Goal Monitoring" },
    { id: "kpis-metrics", label: "KPIs & Metrics" },
    { id: "feedback-hub", label: "Feedback Hub" },
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
                  Performance Management
                </h1>
                <p className="text-xs text-gray-600">
                  Monitor team performance, conduct reviews, and track goals
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" className="gap-2 h-8 text-sm px-3">
                  <TrendingUp className="w-4 h-4" />
                  Performance Analytics
                </Button>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700 h-8 text-sm px-3">
                  <Plus className="w-4 h-4" />
                  New Review
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-4 gap-3 mb-5">
            <MetricCard
              icon={Star}
              title="Avg Team Rating"
              value="4.2/5"
              subtitle="+0.3 from last quarter"
              valueColor="text-yellow-600"
            />
            <MetricCard
              icon={AlertCircle}
              title="Pending Reviews"
              value="2"
              subtitle="1 overdue"
              valueColor="text-orange-600"
            />
            <MetricCard
              icon={CheckCircle2}
              title="Goals Progress"
              value="74%"
              subtitle="1 goals completed"
              valueColor="text-green-600"
            />
            <MetricCard
              icon={TrendingUp}
              title="KPI Achievement"
              value="67%"
              subtitle="On or above target"
              valueColor="text-blue-600"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 pb-8">
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

          {/* Performance Reviews Tab */}
          {activeTab === "performance-reviews" && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  Team Performance Reviews
                </h2>
                <p className="text-xs text-gray-500">
                  Manage and track performance review cycles
                </p>
              </div>

              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-3">
                        <h3 className="font-semibold text-sm text-gray-900">
                          {review.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                            {getStatusLabel(review.status)}
                          </span>
                          <span className="text-xs text-gray-600">
                            {review.reviewType.charAt(0).toUpperCase() + review.reviewType.slice(1)}
                          </span>
                          <span className="text-xs text-gray-600">
                            {review.reviewCycle}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 mb-2">
                        Due: {review.dueDate}
                        {review.completedDate && ` • Completed: ${review.completedDate}`}
                      </p>

                      {review.selfRating && (
                        <div className="flex items-center gap-4 text-xs">
                          {review.selfRating && (
                            <div>
                              <span className="text-gray-600">Self Rating: </span>
                              <span className="font-semibold text-gray-900">{review.selfRating}</span>
                            </div>
                          )}
                          {review.managerRating && (
                            <div>
                              <span className="text-gray-600">Manager Rating: </span>
                              <span className="font-semibold text-gray-900">{review.managerRating}</span>
                            </div>
                          )}
                          {review.overallRating && (
                            <div>
                              <span className="text-gray-600">Overall Rating: </span>
                              <span className="font-semibold text-gray-900">{review.overallRating}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 ml-4">
                      {review.status === "pending" && (
                        <Button className="h-8 text-xs px-3 bg-blue-600 hover:bg-blue-700 text-white">
                          Start Review
                        </Button>
                      )}
                      {review.status === "in-progress" && (
                        <Button className="h-8 text-xs px-3 bg-blue-600 hover:bg-blue-700 text-white">
                          Continue Review
                        </Button>
                      )}
                      {(review.status === "completed" || review.status === "in-progress") && (
                        <Button variant="outline" className="h-8 text-xs px-3">
                          View Details
                        </Button>
                      )}
                      {review.status === "overdue" && (
                        <Button className="h-8 text-xs px-3 bg-red-600 hover:bg-red-700 text-white">
                          Complete Review
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Goal Monitoring Tab */}
          {activeTab === "goal-monitoring" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Goal Monitoring
              </h2>
              <p className="text-xs text-gray-600">
                Track team goals and their progress
              </p>
            </div>
          )}

          {/* KPIs & Metrics Tab */}
          {activeTab === "kpis-metrics" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                KPIs & Metrics
              </h2>
              <p className="text-xs text-gray-600">
                View key performance indicators and metrics
              </p>
            </div>
          )}

          {/* Feedback Hub Tab */}
          {activeTab === "feedback-hub" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Feedback Hub
              </h2>
              <p className="text-xs text-gray-600">
                Manage and share feedback
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
