import { useState } from "react";
import {
  TrendingUp,
  Plus,
  Star,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

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
  <div className="bg-white rounded-md p-2 border border-gray-200">
    <div className="flex items-start justify-between mb-1.5">
      <h3 className="text-xs font-medium text-gray-700">{title}</h3>
      <Icon className="w-4 h-4 text-gray-400" />
    </div>
    <div className="mb-1.5">
      <p className={`text-2xl font-bold ${valueColor || "text-gray-900"}`}>
        {value}
      </p>
    </div>
    <p className="text-xs text-gray-600">{subtitle}</p>
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

interface KPI {
  id: string;
  name: string;
  status: "above" | "below";
  description: string;
  target: string;
  actual: string;
  assignee: string;
  period: string;
}

const kpis: KPI[] = [
  {
    id: "1",
    name: "Sprint Velocity",
    status: "above",
    description: "Story points completed per sprint",
    target: "40 points",
    actual: "45 points",
    assignee: "Mike Chen",
    period: "December 2024",
  },
  {
    id: "2",
    name: "Design Quality Score",
    status: "below",
    description: "Average design approval rating",
    target: "4.5/5",
    actual: "4.3/5",
    assignee: "Lisa Park",
    period: "December 2024",
  },
  {
    id: "3",
    name: "Bug Resolution Time",
    status: "above",
    description: "Average time to resolve bugs",
    target: "24 hours",
    actual: "18 hours",
    assignee: "Alex Kim",
    period: "December 2024",
  },
];

const getKPIStatusColor = (status: string) => {
  switch (status) {
    case "above":
      return "bg-green-100 text-green-800";
    case "below":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function PerformanceReviews() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("performance-reviews");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReviewDetailsModal, setShowReviewDetailsModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showAdjustGoalModal, setShowAdjustGoalModal] = useState(false);
  const [showAddKPIModal, setShowAddKPIModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<PerformanceReview | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<TeamGoal | null>(null);
  const [reviewModalMode, setReviewModalMode] = useState<"start" | "continue">("start");
  const [allReviews, setAllReviews] = useState<PerformanceReview[]>(reviews);
  const [allGoals, setAllGoals] = useState<TeamGoal[]>(teamGoals);
  const [allKPIs, setAllKPIs] = useState<KPI[]>(kpis);
  const [reviewForm, setReviewForm] = useState({
    selfRating: 0,
    strengths: "",
    improvements: "",
    feedback: "",
  });
  const [feedbackForm, setFeedbackForm] = useState({
    feedbackText: "",
    ratingGiven: 0,
    suggestions: "",
  });
  const [adjustGoalForm, setAdjustGoalForm] = useState({
    newTarget: "",
    newDueDate: "",
    reason: "",
    statusUpdate: "on-track" as const,
  });
  const [kpiForm, setKpiForm] = useState({
    name: "",
    description: "",
    target: "",
    actual: "",
    assignee: "",
    period: "",
    status: "above" as const,
  });

  const handlePerformanceAnalytics = () => {
    toast({
      title: "Performance Analytics",
      description: "Opening performance analytics dashboard...",
    });
  };

  const handleNewReview = () => {
    toast({
      title: "New Review",
      description: "Opening new performance review form...",
    });
  };

  const handleStartReview = (name: string) => {
    const review = allReviews.find((r) => r.name === name);
    if (review) {
      setSelectedReview(review);
      setReviewModalMode("start");
      setReviewForm({
        selfRating: 0,
        strengths: "",
        improvements: "",
        feedback: "",
      });
      setShowReviewModal(true);
    }
  };

  const handleContinueReview = (name: string) => {
    const review = allReviews.find((r) => r.name === name);
    if (review) {
      setSelectedReview(review);
      setReviewModalMode("continue");
      setReviewForm({
        selfRating: review.selfRating || 0,
        strengths: "",
        improvements: "",
        feedback: "",
      });
      setShowReviewModal(true);
    }
  };

  const handleViewReviewDetails = (name: string) => {
    const review = allReviews.find((r) => r.name === name);
    if (review) {
      setSelectedReview(review);
      setShowReviewDetailsModal(true);
    }
  };

  const handleSubmitReview = () => {
    if (!selectedReview || reviewForm.selfRating === 0) {
      toast({
        title: "Error",
        description: "Please provide a self rating.",
      });
      return;
    }

    const updatedReviews = allReviews.map((review) =>
      review.id === selectedReview.id
        ? {
            ...review,
            status: "completed" as const,
            selfRating: reviewForm.selfRating,
            managerRating: 4.2,
            overallRating: (reviewForm.selfRating + 4.2) / 2,
            completedDate: new Date().toISOString().split("T")[0],
          }
        : review
    );

    setAllReviews(updatedReviews);
    setShowReviewModal(false);
    setSelectedReview(null);

    toast({
      title: "Review Submitted",
      description: `Performance review for ${selectedReview.name} has been submitted.`,
    });
  };

  const handleSaveProgress = () => {
    if (!selectedReview) return;

    const updatedReviews = allReviews.map((review) =>
      review.id === selectedReview.id
        ? {
            ...review,
            status: "in-progress" as const,
            selfRating: reviewForm.selfRating || review.selfRating,
          }
        : review
    );

    setAllReviews(updatedReviews);
    setShowReviewModal(false);
    setSelectedReview(null);

    toast({
      title: "Progress Saved",
      description: `Review for ${selectedReview.name} has been saved.`,
    });
  };

  const handleCompleteReview = (name: string) => {
    const review = allReviews.find((r) => r.name === name);
    if (review) {
      const updatedReviews = allReviews.map((r) =>
        r.id === review.id
          ? {
              ...r,
              status: "completed" as const,
              completedDate: new Date().toISOString().split("T")[0],
              selfRating: r.selfRating || 3.5,
              managerRating: 4.0,
              overallRating: 3.75,
            }
          : r
      );

      setAllReviews(updatedReviews);

      toast({
        title: "Review Completed",
        description: `Overdue review for ${name} has been marked as completed.`,
      });
    }
  };

  const handleFeedback = (goalTitle: string) => {
    const goal = allGoals.find((g) => g.goalTitle === goalTitle);
    if (goal) {
      setSelectedGoal(goal);
      setFeedbackForm({
        feedbackText: "",
        ratingGiven: 0,
        suggestions: "",
      });
      setShowFeedbackModal(true);
    }
  };

  const handleAdjustGoal = (goalTitle: string) => {
    const goal = allGoals.find((g) => g.goalTitle === goalTitle);
    if (goal) {
      setSelectedGoal(goal);
      setAdjustGoalForm({
        newTarget: goal.target,
        newDueDate: goal.dueDate,
        reason: "",
        statusUpdate: goal.goalStatus,
      });
      setShowAdjustGoalModal(true);
    }
  };

  const handleSubmitFeedback = () => {
    if (!selectedGoal || feedbackForm.ratingGiven === 0) {
      toast({
        title: "Error",
        description: "Please provide a rating for the feedback.",
      });
      return;
    }

    toast({
      title: "Feedback Submitted",
      description: `Feedback for "${selectedGoal.goalTitle}" has been recorded.`,
    });

    setShowFeedbackModal(false);
    setSelectedGoal(null);
  };

  const handleSubmitAdjustment = () => {
    if (!selectedGoal || !adjustGoalForm.newTarget || !adjustGoalForm.newDueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    const updatedGoals = allGoals.map((goal) =>
      goal.id === selectedGoal.id
        ? {
            ...goal,
            target: adjustGoalForm.newTarget,
            dueDate: adjustGoalForm.newDueDate,
            goalStatus: adjustGoalForm.statusUpdate,
          }
        : goal
    );

    setAllGoals(updatedGoals);

    toast({
      title: "Goal Adjusted",
      description: `"${selectedGoal.goalTitle}" has been updated successfully.`,
    });

    setShowAdjustGoalModal(false);
    setSelectedGoal(null);
  };

  const handleAddKPI = () => {
    toast({
      title: "Add KPI",
      description: "Opening new KPI creation form...",
    });
  };

  const tabs = [
    { id: "performance-reviews", label: "Performance Reviews" },
    { id: "goal-monitoring", label: "Goal Monitoring" },
    { id: "kpis-metrics", label: "KPIs & Metrics" },
    { id: "feedback-hub", label: "Feedback Hub" },
  ];

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto px-3 py-1.5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-lg font-semibold text-gray-900 mb-0">
                  Performance Management
                </h1>
                <p className="text-xs text-gray-600 mt-0.5">
                  Monitor team performance, conduct reviews, and track goals
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  className="gap-2 h-7 text-xs px-2"
                  onClick={handlePerformanceAnalytics}
                >
                  <TrendingUp className="w-3 h-3" />
                  Performance Analytics
                </Button>
                <Button
                  className="gap-2 bg-blue-600 hover:bg-blue-700 h-7 text-xs px-2"
                  onClick={handleNewReview}
                >
                  <Plus className="w-3 h-3" />
                  New Review
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="mx-auto px-3 py-1">
          <div className="grid grid-cols-4 gap-2 mb-2">
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
        <div className="mx-auto px-3 pb-3">
          {/* Tabs */}
          <div className="flex gap-1 mb-2 border-b border-gray-200">
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

              {allReviews.map((review) => (
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
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}
                          >
                            {getStatusLabel(review.status)}
                          </span>
                          <span className="text-xs text-gray-600">
                            {review.reviewType.charAt(0).toUpperCase() +
                              review.reviewType.slice(1)}
                          </span>
                          <span className="text-xs text-gray-600">
                            {review.reviewCycle}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 mb-2">
                        Due: {review.dueDate}
                        {review.completedDate &&
                          ` • Completed: ${review.completedDate}`}
                      </p>

                      {review.selfRating && (
                        <div className="flex items-center gap-4 text-xs">
                          {review.selfRating && (
                            <div>
                              <span className="text-gray-600">
                                Self Rating:{" "}
                              </span>
                              <span className="font-semibold text-gray-900">
                                {review.selfRating}
                              </span>
                            </div>
                          )}
                          {review.managerRating && (
                            <div>
                              <span className="text-gray-600">
                                Manager Rating:{" "}
                              </span>
                              <span className="font-semibold text-gray-900">
                                {review.managerRating}
                              </span>
                            </div>
                          )}
                          {review.overallRating && (
                            <div>
                              <span className="text-gray-600">
                                Overall Rating:{" "}
                              </span>
                              <span className="font-semibold text-gray-900">
                                {review.overallRating}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 ml-4">
                      {review.status === "pending" && (
                        <Button
                          className="h-8 text-xs px-3 bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => handleStartReview(review.name)}
                        >
                          Start Review
                        </Button>
                      )}
                      {review.status === "in-progress" && (
                        <Button
                          className="h-8 text-xs px-3 bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => handleContinueReview(review.name)}
                        >
                          Continue Review
                        </Button>
                      )}
                      {(review.status === "completed" ||
                        review.status === "in-progress") && (
                        <Button
                          variant="outline"
                          className="h-8 text-xs px-3"
                          onClick={() => handleViewReviewDetails(review.name)}
                        >
                          View Details
                        </Button>
                      )}
                      {review.status === "overdue" && (
                        <Button
                          className="h-8 text-xs px-3 bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => handleCompleteReview(review.name)}
                        >
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
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  Team Goal Progress
                </h2>
                <p className="text-xs text-gray-500">
                  Monitor and approve team member goals
                </p>
              </div>

              {allGoals.map((goal) => (
                <div
                  key={goal.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="mb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900">
                          {goal.employeeName}
                        </h3>
                        <p className="text-xs text-gray-600 mt-0.5">
                          {goal.goalTitle}
                        </p>
                      </div>
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getGoalStatusColor(goal.goalStatus)}`}
                      >
                        {getGoalStatusLabel(goal.goalStatus)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{goal.description}</p>
                  </div>

                  <div className="mb-3 p-3 bg-gray-50 rounded-lg text-xs text-gray-600 space-y-1">
                    <div>
                      <span className="font-medium text-gray-900">
                        {goal.employeeName}
                      </span>
                      <span>
                        {" "}
                        • {goal.category} • Due: {goal.dueDate}
                      </span>
                    </div>
                    <div>Target: {goal.target}</div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-900">
                        Progress
                      </span>
                      <span className="text-xs font-semibold text-gray-900">
                        {goal.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 h-8 text-xs px-2"
                      onClick={() => handleFeedback(goal.goalTitle)}
                    >
                      Feedback
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 h-8 text-xs px-2"
                      onClick={() => handleAdjustGoal(goal.goalTitle)}
                    >
                      Adjust
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* KPIs & Metrics Tab */}
          {activeTab === "kpis-metrics" && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    Team KPIs & Metrics
                  </h2>
                  <p className="text-xs text-gray-500">
                    Track key performance indicators
                  </p>
                </div>
                <Button
                  className="gap-2 bg-blue-600 hover:bg-blue-700 h-8 text-sm px-3"
                  onClick={handleAddKPI}
                >
                  <Plus className="w-4 h-4" />
                  Add KPI
                </Button>
              </div>

              <div className="space-y-4">
                {kpis.map((kpi) => (
                  <div
                    key={kpi.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm text-gray-900">
                            {kpi.name}
                          </h3>
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getKPIStatusColor(kpi.status)}`}
                          >
                            {kpi.status.charAt(0).toUpperCase() +
                              kpi.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">
                          {kpi.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3 p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Target</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {kpi.target}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Actual</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {kpi.actual}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{kpi.assignee}</span>
                      <span>{kpi.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Feedback Hub Tab */}
          {activeTab === "feedback-hub" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Feedback Hub
              </h2>
              <p className="text-xs text-gray-600">Manage and share feedback</p>
            </div>
          )}
        </div>

        {/* Review Modal */}
        {showReviewModal && selectedReview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {reviewModalMode === "start" ? "Start" : "Continue"} Performance Review
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    {selectedReview.name} • {selectedReview.reviewCycle}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowReviewModal(false);
                    setSelectedReview(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Review Info */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 space-y-2">
                  <p className="text-xs text-blue-900">
                    <span className="font-semibold">Review Type:</span>{" "}
                    {selectedReview.reviewType.charAt(0).toUpperCase() +
                      selectedReview.reviewType.slice(1)}
                  </p>
                  <p className="text-xs text-blue-900">
                    <span className="font-semibold">Status:</span> {getStatusLabel(selectedReview.status)}
                  </p>
                  <p className="text-xs text-blue-900">
                    <span className="font-semibold">Due Date:</span> {selectedReview.dueDate}
                  </p>
                </div>

                {/* Self Rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Self Rating *
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setReviewForm({ ...reviewForm, selfRating: rating })}
                        className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
                          reviewForm.selfRating === rating
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300 bg-white hover:border-gray-400"
                        }`}
                      >
                        <span className="text-lg font-bold text-gray-900">
                          {rating}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Strengths */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Key Strengths
                  </label>
                  <textarea
                    value={reviewForm.strengths}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, strengths: e.target.value })
                    }
                    placeholder="Describe the employee's key strengths..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Areas for Improvement */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Areas for Improvement
                  </label>
                  <textarea
                    value={reviewForm.improvements}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, improvements: e.target.value })
                    }
                    placeholder="Describe areas where improvement is needed..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Additional Feedback */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Additional Feedback
                  </label>
                  <textarea
                    value={reviewForm.feedback}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, feedback: e.target.value })
                    }
                    placeholder="Any additional comments or observations..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  className="flex-1 h-10 text-sm font-medium"
                  onClick={() => {
                    setShowReviewModal(false);
                    setSelectedReview(null);
                  }}
                >
                  Cancel
                </Button>
                {reviewModalMode === "continue" && (
                  <Button
                    variant="outline"
                    className="flex-1 h-10 text-sm font-medium"
                    onClick={handleSaveProgress}
                  >
                    Save Progress
                  </Button>
                )}
                <Button
                  className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                  onClick={handleSubmitReview}
                >
                  {reviewModalMode === "start" ? "Submit Review" : "Update Review"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Review Details Modal */}
        {showReviewDetailsModal && selectedReview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Review Details
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    {selectedReview.name} • {selectedReview.reviewCycle}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowReviewDetailsModal(false);
                    setSelectedReview(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Review Status */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Review Status
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Status</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedReview.status)}`}
                      >
                        {getStatusLabel(selectedReview.status)}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Type</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {selectedReview.reviewType.charAt(0).toUpperCase() +
                          selectedReview.reviewType.slice(1)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Due Date</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {selectedReview.dueDate}
                      </p>
                    </div>
                    {selectedReview.completedDate && (
                      <div>
                        <p className="text-xs text-gray-600 mb-1">
                          Completed Date
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {selectedReview.completedDate}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Ratings */}
                {selectedReview.selfRating && (
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Performance Ratings
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                        <p className="text-xs text-blue-600 font-medium mb-2">
                          Self Rating
                        </p>
                        <div className="flex justify-center gap-1 mb-2">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <span
                              key={idx}
                              className={`text-lg ${
                                idx < Math.floor(selectedReview.selfRating || 0)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <p className="text-sm font-bold text-blue-900">
                          {selectedReview.selfRating}
                        </p>
                      </div>

                      {selectedReview.managerRating && (
                        <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                          <p className="text-xs text-green-600 font-medium mb-2">
                            Manager Rating
                          </p>
                          <div className="flex justify-center gap-1 mb-2">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <span
                                key={idx}
                                className={`text-lg ${
                                  idx < Math.floor(selectedReview.managerRating || 0)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <p className="text-sm font-bold text-green-900">
                            {selectedReview.managerRating}
                          </p>
                        </div>
                      )}

                      {selectedReview.overallRating && (
                        <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-200">
                          <p className="text-xs text-orange-600 font-medium mb-2">
                            Overall Rating
                          </p>
                          <div className="flex justify-center gap-1 mb-2">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <span
                                key={idx}
                                className={`text-lg ${
                                  idx < Math.floor(selectedReview.overallRating || 0)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <p className="text-sm font-bold text-orange-900">
                            {selectedReview.overallRating}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="text-sm font-semibold text-blue-900 mb-2">
                    💡 Recommendations
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>
                      • Continue focusing on technical excellence and code
                      quality improvements
                    </li>
                    <li>
                      • Consider taking advanced training in leadership skills
                    </li>
                    <li>
                      • Maintain current pace of goal achievement and milestones
                    </li>
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
                <Button
                  className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                  onClick={() => {
                    setShowReviewDetailsModal(false);
                    setSelectedReview(null);
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Modal */}
        {showFeedbackModal && selectedGoal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Provide Feedback
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    {selectedGoal.goalTitle}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowFeedbackModal(false);
                    setSelectedGoal(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Goal Info */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 space-y-2">
                  <p className="text-xs text-blue-900">
                    <span className="font-semibold">Employee:</span> {selectedGoal.employeeName}
                  </p>
                  <p className="text-xs text-blue-900">
                    <span className="font-semibold">Category:</span> {selectedGoal.category}
                  </p>
                  <p className="text-xs text-blue-900">
                    <span className="font-semibold">Current Progress:</span> {selectedGoal.progress}%
                  </p>
                  <p className="text-xs text-blue-900">
                    <span className="font-semibold">Status:</span> {getGoalStatusLabel(selectedGoal.goalStatus)}
                  </p>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Performance Rating *
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() =>
                          setFeedbackForm({ ...feedbackForm, ratingGiven: rating })
                        }
                        className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
                          feedbackForm.ratingGiven === rating
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300 bg-white hover:border-gray-400"
                        }`}
                      >
                        <span className="text-xl">
                          {feedbackForm.ratingGiven >= rating ? "★" : "☆"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback Text */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Feedback Comments *
                  </label>
                  <textarea
                    value={feedbackForm.feedbackText}
                    onChange={(e) =>
                      setFeedbackForm({ ...feedbackForm, feedbackText: e.target.value })
                    }
                    placeholder="Provide specific feedback on the goal progress and achievement..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Suggestions */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Suggestions for Improvement
                  </label>
                  <textarea
                    value={feedbackForm.suggestions}
                    onChange={(e) =>
                      setFeedbackForm({ ...feedbackForm, suggestions: e.target.value })
                    }
                    placeholder="Share suggestions to help achieve this goal..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  className="flex-1 h-10 text-sm font-medium"
                  onClick={() => {
                    setShowFeedbackModal(false);
                    setSelectedGoal(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                  onClick={handleSubmitFeedback}
                >
                  Submit Feedback
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Adjust Goal Modal */}
        {showAdjustGoalModal && selectedGoal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Adjust Goal
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    {selectedGoal.goalTitle}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowAdjustGoalModal(false);
                    setSelectedGoal(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Goal Info */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-2">
                  <p className="text-xs text-gray-900">
                    <span className="font-semibold">Employee:</span> {selectedGoal.employeeName}
                  </p>
                  <p className="text-xs text-gray-900">
                    <span className="font-semibold">Category:</span> {selectedGoal.category}
                  </p>
                  <p className="text-xs text-gray-900">
                    <span className="font-semibold">Description:</span> {selectedGoal.description}
                  </p>
                  <p className="text-xs text-gray-900">
                    <span className="font-semibold">Current Progress:</span> {selectedGoal.progress}%
                  </p>
                </div>

                {/* Current Target */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-xs text-blue-900">
                    <span className="font-semibold">Original Target:</span> {selectedGoal.target}
                  </p>
                  <p className="text-xs text-blue-900">
                    <span className="font-semibold">Original Due Date:</span> {selectedGoal.dueDate}
                  </p>
                </div>

                {/* New Target */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    New Target *
                  </label>
                  <input
                    type="text"
                    value={adjustGoalForm.newTarget}
                    onChange={(e) =>
                      setAdjustGoalForm({ ...adjustGoalForm, newTarget: e.target.value })
                    }
                    placeholder="Enter new target"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* New Due Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    New Due Date *
                  </label>
                  <input
                    type="date"
                    value={adjustGoalForm.newDueDate}
                    onChange={(e) =>
                      setAdjustGoalForm({
                        ...adjustGoalForm,
                        newDueDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Goal Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Goal Status
                  </label>
                  <select
                    value={adjustGoalForm.statusUpdate}
                    onChange={(e) =>
                      setAdjustGoalForm({
                        ...adjustGoalForm,
                        statusUpdate: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="on-track">On Track</option>
                    <option value="at-risk">At Risk</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Reason for Adjustment */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Reason for Adjustment *
                  </label>
                  <textarea
                    value={adjustGoalForm.reason}
                    onChange={(e) =>
                      setAdjustGoalForm({ ...adjustGoalForm, reason: e.target.value })
                    }
                    placeholder="Explain why this goal is being adjusted..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  className="flex-1 h-10 text-sm font-medium"
                  onClick={() => {
                    setShowAdjustGoalModal(false);
                    setSelectedGoal(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                  onClick={handleSubmitAdjustment}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
