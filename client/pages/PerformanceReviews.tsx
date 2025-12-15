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

interface Feedback {
  id: string;
  from: string;
  to: string;
  content: string;
  rating: number;
  category: string;
  date: string;
}

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
  dateRange?: string;
  keyAchievements?: string;
  challenges?: string;
  goalAchievement?: string;
  areasForDevelopment?: string;
  managerComments?: string;
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
    reviewCycle: "Q3 2024",
    dueDate: "2024-11-30",
    completedDate: "2024-09-28",
    dateRange: "July - September 2024",
    selfRating: 4.0,
    managerRating: 4.5,
    overallRating: 4.3,
    keyAchievements: "Successfully led the migration of legacy systems to cloud infrastructure, resulting in 40% performance improvement. Mentored 2 junior developers and improved team collaboration.",
    challenges: "Faced initial resistance to new processes but overcame through clear communication and demonstrations of benefits.",
    goalAchievement: "Completed 8 out of 10 quarterly goals, including all high-priority objectives.",
    areasForDevelopment: "Focus on an advanced architecture patterns and leadership skills for Q4.",
    managerComments: "",
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

const feedbacks: Feedback[] = [
  {
    id: "1",
    from: "Manager",
    to: "Mike Chen",
    content: "Excellent work on the recent project. Your attention to detail and proactive approach were commendable.",
    rating: 5,
    category: "Strengths",
    date: "2024-12-10",
  },
  {
    id: "2",
    from: "Peer",
    to: "Lisa Park",
    content: "Great collaboration on the design review. Would appreciate more detailed feedback on the UX aspects.",
    rating: 4,
    category: "Collaboration",
    date: "2024-12-08",
  },
  {
    id: "3",
    from: "Manager",
    to: "Alex Kim",
    content: "Good progress on skill development. Consider taking the advanced training course next quarter.",
    rating: 4,
    category: "Development",
    date: "2024-12-05",
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
  const [activeTab, setActiveTab] = useState("goal-monitoring");
  const [showPerformanceAnalyticsModal, setShowPerformanceAnalyticsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReviewDetailsModal, setShowReviewDetailsModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showAdjustGoalModal, setShowAdjustGoalModal] = useState(false);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showAddKPIToGoalModal, setShowAddKPIToGoalModal] = useState(false);
  const [showAddKPIModal, setShowAddKPIModal] = useState(false);
  const [showGiveFeedbackModal, setShowGiveFeedbackModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<PerformanceReview | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<TeamGoal | null>(null);
  const [selectedFeedbackRecipient, setSelectedFeedbackRecipient] = useState<string | null>(null);
  const [reviewModalMode, setReviewModalMode] = useState<"start" | "continue">("start");
  const [allReviews, setAllReviews] = useState<PerformanceReview[]>(reviews);
  const [allGoals, setAllGoals] = useState<TeamGoal[]>(teamGoals);
  const [allKPIs, setAllKPIs] = useState<KPI[]>(kpis);
  const [allFeedbacks, setAllFeedbacks] = useState<Feedback[]>(feedbacks);
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
    progress: 0,
    notes: "",
    statusUpdate: "on-track" as const,
  });
  const [newGoalForm, setNewGoalForm] = useState({
    goalTitle: "",
    description: "",
    level: "",
    priority: "High",
    targetDate: "",
  });
  const [goalKPIs, setGoalKPIs] = useState<KPI[]>([]);
  const [goalApprovers, setGoalApprovers] = useState<string[]>([]);
  const [kpiForm, setKpiForm] = useState({
    name: "",
    kpiType: "Quantitative",
    target: "",
    unitType: "Units",
    notes: "",
  });
  const [giveFeedbackForm, setGiveFeedbackForm] = useState({
    recipient: "",
    content: "",
    rating: 0,
    category: "Strengths",
  });
  const [reviewDetailsForm, setReviewDetailsForm] = useState({
    managerRating: 0,
    managerComments: "",
  });

  const handlePerformanceAnalytics = () => {
    setShowPerformanceAnalyticsModal(true);
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
        progress: goal.progress,
        notes: "",
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
    if (!selectedGoal) {
      toast({
        title: "Error",
        description: "Please select a goal.",
      });
      return;
    }

    const updatedGoals = allGoals.map((goal) =>
      goal.id === selectedGoal.id
        ? {
            ...goal,
            progress: adjustGoalForm.progress,
            goalStatus: adjustGoalForm.statusUpdate,
          }
        : goal
    );

    setAllGoals(updatedGoals);

    toast({
      title: "Progress Saved",
      description: `"${selectedGoal.goalTitle}" has been updated successfully.`,
    });

    setShowAdjustGoalModal(false);
    setSelectedGoal(null);
  };

  const handleAddGoal = () => {
    if (!newGoalForm.goalTitle || !newGoalForm.level || !newGoalForm.targetDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    const newGoal: TeamGoal = {
      id: (allGoals.length + 1).toString(),
      employeeName: "Current User",
      goalTitle: newGoalForm.goalTitle,
      goalStatus: "on-track",
      description: newGoalForm.description,
      category: newGoalForm.level,
      dueDate: newGoalForm.targetDate,
      target: newGoalForm.priority,
      progress: 0,
    };

    setAllGoals([...allGoals, newGoal]);
    setShowAddGoalModal(false);
    setGoalKPIs([]);
    setGoalApprovers([]);

    toast({
      title: "Goal Created",
      description: `"${newGoalForm.goalTitle}" has been added successfully.`,
    });
  };

  const handleAddKPIToGoal = () => {
    setShowAddKPIToGoalModal(true);
  };

  const handleAddKPI = () => {
    setKpiForm({
      name: "",
      description: "",
      target: "",
      actual: "",
      assignee: "",
      period: "",
      status: "above",
    });
    setShowAddKPIModal(true);
  };

  const handleCreateKPI = () => {
    if (!kpiForm.name || !kpiForm.target) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    const newKPI: KPI = {
      id: (allKPIs.length + 1).toString(),
      name: kpiForm.name,
      status: "above",
      description: kpiForm.notes,
      target: kpiForm.target,
      actual: kpiForm.target,
      assignee: "Current User",
      period: new Date().toLocaleString("default", { month: "long", year: "numeric" }),
    };

    setAllKPIs([...allKPIs, newKPI]);
    setShowAddKPIModal(false);
    setKpiForm({
      name: "",
      kpiType: "Quantitative",
      target: "",
      unitType: "Units",
      notes: "",
    });

    toast({
      title: "KPI Saved",
      description: `"${kpiForm.name}" has been added successfully.`,
    });
  };

  const handleGiveFeedback = (recipient: string) => {
    setSelectedFeedbackRecipient(recipient);
    setGiveFeedbackForm({
      recipient,
      content: "",
      rating: 0,
      category: "Strengths",
    });
    setShowGiveFeedbackModal(true);
  };

  const handleSubmitGiveFeedback = () => {
    if (!giveFeedbackForm.content || giveFeedbackForm.rating === 0) {
      toast({
        title: "Error",
        description: "Please provide feedback content and a rating.",
      });
      return;
    }

    const newFeedback: Feedback = {
      id: (allFeedbacks.length + 1).toString(),
      from: "You",
      to: giveFeedbackForm.recipient,
      content: giveFeedbackForm.content,
      rating: giveFeedbackForm.rating,
      category: giveFeedbackForm.category,
      date: new Date().toISOString().split("T")[0],
    };

    setAllFeedbacks([...allFeedbacks, newFeedback]);
    setShowGiveFeedbackModal(false);

    toast({
      title: "Feedback Sent",
      description: `Feedback for ${giveFeedbackForm.recipient} has been submitted.`,
    });
  };

  const tabs = [
    { id: "goal-monitoring", label: "Goal Monitoring" },
    { id: "performance-reviews", label: "Performance Reviews" },
    { id: "kpis-metrics", label: "KPI & Metrics" },
    { id: "feedback-hub", label: "Feedback Centre" },
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
                  Performance & Evaluations
                </h1>
                <p className="text-xs text-gray-600 mt-0.5">
                  Conduct reviews, set goals and manage appraisal cycles.
                </p>
              </div>
              <Button
                variant="ghost"
                className="gap-2 h-7 text-xs px-2"
                onClick={handlePerformanceAnalytics}
              >
                <TrendingUp className="w-3 h-3" />
                Performance Analytics
              </Button>
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
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    Team Performance Reviews
                  </h2>
                  <p className="text-xs text-gray-500">
                    Manage and track performance review cycles
                  </p>
                </div>
                <Button
                  className="gap-2 bg-blue-600 hover:bg-blue-700 h-8 text-sm px-3"
                  onClick={() => {
                    toast({
                      title: "New Review",
                      description: "Create a new performance review cycle",
                    });
                  }}
                >
                  <Plus className="w-4 h-4" />
                  New Review
                </Button>
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
                          Continue Review
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
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    Team Goal Progress
                  </h2>
                  <p className="text-xs text-gray-500">
                    Monitor and approve team member goals
                  </p>
                </div>
                <Button
                  className="gap-2 bg-blue-600 hover:bg-blue-700 h-8 text-sm px-3"
                  onClick={() => {
                    setNewGoalForm({
                      goalTitle: "",
                      description: "",
                      level: "",
                      priority: "High",
                      targetDate: "",
                    });
                    setGoalKPIs([]);
                    setGoalApprovers([]);
                    setShowAddGoalModal(true);
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Add Goal
                </Button>
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
                      onClick={() => handleAdjustGoal(goal.goalTitle)}
                    >
                      Update Progress
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
                {allKPIs.map((kpi) => (
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
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    Feedback Hub
                  </h2>
                  <p className="text-xs text-gray-500">
                    Send and receive feedback from team members
                  </p>
                </div>
                <Button
                  className="gap-2 bg-blue-600 hover:bg-blue-700 h-8 text-sm px-3"
                  onClick={() => setShowGiveFeedbackModal(true)}
                >
                  <Plus className="w-4 h-4" />
                  Give Feedback
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Received Feedback */}
                <div className="space-y-4">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-4">
                      Feedback Received
                    </h3>
                    <div className="space-y-3">
                      {allFeedbacks.map((feedback) => (
                        <div
                          key={feedback.id}
                          className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-xs font-semibold text-gray-900">
                                From: {feedback.from}
                              </p>
                              <p className="text-xs text-gray-600 mt-0.5">
                                {feedback.date}
                              </p>
                            </div>
                            <div className="flex gap-0.5">
                              {Array.from({ length: 5 }).map((_, idx) => (
                                <span
                                  key={idx}
                                  className={`text-sm ${
                                    idx < feedback.rating
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-gray-700 mb-2">
                            {feedback.content}
                          </p>
                          <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                            {feedback.category}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Send Feedback */}
                <div className="space-y-4">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-4">
                      Give Feedback to Team
                    </h3>
                    <div className="space-y-3">
                      {["Mike Chen", "Lisa Park", "Alex Kim", "Emma Wilson"].map(
                        (member) => (
                          <div
                            key={member}
                            className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs font-semibold text-gray-900">
                                  {member}
                                </p>
                                <p className="text-xs text-gray-600 mt-0.5">
                                  Share your feedback
                                </p>
                              </div>
                              <Button
                                variant="outline"
                                className="h-7 text-xs px-2"
                                onClick={() => handleGiveFeedback(member)}
                              >
                                Send
                              </Button>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback Statistics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-xs text-blue-600 font-medium mb-1">
                    Total Feedback Received
                  </p>
                  <p className="text-2xl font-bold text-blue-900">
                    {allFeedbacks.length}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-xs text-green-600 font-medium mb-1">
                    Average Rating
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    {(
                      allFeedbacks.reduce((sum, f) => sum + f.rating, 0) /
                      allFeedbacks.length
                    ).toFixed(1)}
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <p className="text-xs text-orange-600 font-medium mb-1">
                    Most Common Category
                  </p>
                  <p className="text-sm font-bold text-orange-900">
                    {
                      Object.entries(
                        allFeedbacks.reduce((acc, f) => {
                          acc[f.category] = (acc[f.category] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)
                      ).sort((a, b) => b[1] - a[1])[0]?.[0]
                    }
                  </p>
                </div>
              </div>
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
                {/* Manager Note */}
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <p className="text-sm text-amber-900 leading-relaxed">
                    <span className="font-semibold">Note:</span> Reviews initiated by the employee will appear here. The Manager is only required to provide comments and a Manager's rating. All details such as Key Achievements, Challenges, etc. are entered by the employee.
                  </p>
                </div>

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
                    {selectedReview.reviewCycle} - Review
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    {selectedReview.dateRange || "Review Period"}
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
                {/* Self Rating & Completed Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 font-medium mb-1">Self Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedReview.selfRating || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-medium mb-1">Completed</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedReview.completedDate || "Pending"}</p>
                  </div>
                </div>

                {/* Key Achievements */}
                {selectedReview.keyAchievements && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      Key Achievements
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {selectedReview.keyAchievements}
                    </p>
                  </div>
                )}

                {/* Challenges and How You Overcame Them */}
                {selectedReview.challenges && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      Challenges and How You Overcame Them
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {selectedReview.challenges}
                    </p>
                  </div>
                )}

                {/* Goal Achievement */}
                {selectedReview.goalAchievement && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      Goal Achievement
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {selectedReview.goalAchievement}
                    </p>
                  </div>
                )}

                {/* Areas for Development */}
                {selectedReview.areasForDevelopment && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      Areas for Development
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {selectedReview.areasForDevelopment}
                    </p>
                  </div>
                )}

                {/* Divider */}
                <div className="border-t border-gray-200" />

                {/* Manager's Rating */}
                <div>
                  <label className="block text-sm font-semibold text-red-600 mb-3">
                    Manager's Rating
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 1, label: "1 - Unacceptable" },
                      { value: 2, label: "2 - Below Expectation" },
                      { value: 3, label: "3 - Meets Expectation" },
                      { value: 4, label: "4 - Exceeds Expectation" },
                      { value: 5, label: "5 - Outstanding" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="managerRating"
                          value={option.value}
                          checked={reviewDetailsForm.managerRating === option.value}
                          onChange={(e) =>
                            setReviewDetailsForm({
                              ...reviewDetailsForm,
                              managerRating: parseInt(e.target.value),
                            })
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Manager's Comments */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Manager's Comments
                  </label>
                  <textarea
                    value={reviewDetailsForm.managerComments}
                    onChange={(e) =>
                      setReviewDetailsForm({
                        ...reviewDetailsForm,
                        managerComments: e.target.value,
                      })
                    }
                    placeholder="Provide your feedback and comments..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-yellow-50"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  className="flex-1 h-10 text-sm font-medium"
                  onClick={() => {
                    setShowReviewDetailsModal(false);
                    setSelectedReview(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                  onClick={() => {
                    toast({
                      title: "Review Submitted",
                      description: "Manager's rating and comments have been submitted.",
                    });
                    setShowReviewDetailsModal(false);
                    setSelectedReview(null);
                    setReviewDetailsForm({ managerRating: 0, managerComments: "" });
                  }}
                >
                  Submit
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
                <h2 className="text-lg font-bold text-gray-900">
                  Update Progress
                </h2>
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
              <div className="p-6 space-y-6">
                {/* Goal */}
                <div>
                  <p className="text-xs text-gray-600 mb-1">Goal</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {selectedGoal.goalTitle}
                  </p>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-900">
                      Progress (%)
                    </label>
                    <span className="text-sm font-semibold text-gray-900">
                      {adjustGoalForm.progress}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={adjustGoalForm.progress}
                    onChange={(e) =>
                      setAdjustGoalForm({
                        ...adjustGoalForm,
                        progress: parseInt(e.target.value, 10),
                      })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Status Indicator */}
                <div>
                  <p className="text-xs text-orange-600 font-semibold flex items-center gap-1.5 mb-2">
                    <AlertCircle className="w-4 h-4" />
                    {adjustGoalForm.statusUpdate === "on-track"
                      ? "In Progress"
                      : adjustGoalForm.statusUpdate === "at-risk"
                        ? "At Risk"
                        : "Completed"}
                  </p>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Notes (optional)
                  </label>
                  <textarea
                    value={adjustGoalForm.notes}
                    onChange={(e) =>
                      setAdjustGoalForm({ ...adjustGoalForm, notes: e.target.value })
                    }
                    placeholder="Add a short progress update..."
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
                  Save Progress
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Add Goal Modal */}
        {showAddGoalModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Create New SMART Goal
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    Define and track your new goal effectively.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddGoalModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Goal Information Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    Goal Information
                  </h3>
                  <p className="text-xs text-gray-600 mb-4">
                    Define the core aspects of your new goal.
                  </p>

                  {/* Goal Title */}
                  <div className="mb-4">
                    <input
                      type="text"
                      value={newGoalForm.goalTitle}
                      onChange={(e) =>
                        setNewGoalForm({ ...newGoalForm, goalTitle: e.target.value })
                      }
                      placeholder="e.g. Launch New Product Feature"
                      className="w-full px-4 py-2 border border-blue-400 rounded-lg text-sm focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* Goal Description */}
                  <div className="mb-4">
                    <textarea
                      value={newGoalForm.description}
                      onChange={(e) =>
                        setNewGoalForm({ ...newGoalForm, description: e.target.value })
                      }
                      placeholder="Describe the goal in detail..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Level and Priority Row */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Level */}
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">
                        Level
                      </label>
                      <select
                        value={newGoalForm.level}
                        onChange={(e) =>
                          setNewGoalForm({ ...newGoalForm, level: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Select level</option>
                        <option value="Individual">Individual</option>
                        <option value="Team">Team</option>
                        <option value="Department">Department</option>
                        <option value="Organization">Organization</option>
                      </select>
                    </div>

                    {/* Priority */}
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">
                        Priority
                      </label>
                      <select
                        value={newGoalForm.priority}
                        onChange={(e) =>
                          setNewGoalForm({ ...newGoalForm, priority: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>
                  </div>

                  {/* Target Date */}
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">
                      Target Date
                    </label>
                    <input
                      type="date"
                      value={newGoalForm.targetDate}
                      onChange={(e) =>
                        setNewGoalForm({ ...newGoalForm, targetDate: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Key Performance Indicators Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    Key Performance Indicators
                  </h3>
                  <p className="text-xs text-gray-600 mb-4">
                    Define measurable metrics to track goal progress.
                  </p>

                  <div className="border border-gray-200 rounded-lg p-6 text-center bg-gray-50">
                    <p className="text-sm text-gray-600 mb-4">
                      No KPIs added yet. Click{" "}
                      <span className="font-semibold">Add KPI</span> to get started.
                    </p>
                    <Button
                      variant="outline"
                      className="gap-2 h-9"
                      onClick={handleAddKPIToGoal}
                    >
                      <Plus className="w-4 h-4" />
                      Add KPI
                    </Button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-6 py-4 border-t border-gray-200 justify-end">
                <Button
                  variant="outline"
                  className="h-10 text-sm font-medium"
                  onClick={() => setShowAddGoalModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6"
                  onClick={handleAddGoal}
                >
                  Add Goal
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Add KPI to Goal Modal */}
        {showAddKPIToGoalModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
                <h2 className="text-lg font-bold text-gray-900">
                  Add KPI to Goal
                </h2>
                <button
                  onClick={() => setShowAddKPIToGoalModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Key Performance Indicators Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    Key Performance Indicators
                  </h3>
                  <p className="text-xs text-gray-600 mb-4">
                    Define measurable metrics to track goal progress.
                  </p>

                  <div className="border border-gray-200 rounded-lg p-6 text-center bg-gray-50">
                    <p className="text-sm text-gray-600 mb-4">
                      No KPIs added yet. Click{" "}
                      <span className="font-semibold">Add KPI</span> to get started.
                    </p>
                    <Button
                      variant="outline"
                      className="gap-2 h-9"
                      onClick={() => {
                        setShowAddKPIToGoalModal(false);
                        setShowAddKPIModal(true);
                      }}
                    >
                      <Plus className="w-4 h-4" />
                      Add KPI
                    </Button>
                  </div>
                </div>

                {/* Approval Workflow Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    Approval Workflow
                  </h3>
                  <p className="text-xs text-gray-600 mb-4">
                    Configure who needs to approve this goal.
                  </p>

                  <div className="border border-gray-200 rounded-lg p-6 text-center bg-gray-50">
                    <p className="text-sm text-gray-600 mb-4">
                      No approvers added yet. Click{" "}
                      <span className="font-semibold">Add Approver</span> to get started.
                    </p>
                    <Button
                      variant="outline"
                      className="gap-2 h-9"
                      onClick={() => {
                        toast({
                          title: "Add Approver",
                          description: "Opening approver selection...",
                        });
                      }}
                    >
                      <Plus className="w-4 h-4" />
                      Add Approver
                    </Button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-6 py-4 border-t border-gray-200 justify-end">
                <Button
                  variant="outline"
                  className="h-10 text-sm font-medium"
                  onClick={() => setShowAddKPIToGoalModal(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Add KPI Modal */}
        {showAddKPIModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Create New KPI
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    Add a new key performance indicator
                  </p>
                </div>
                <button
                  onClick={() => setShowAddKPIModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* KPI Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    KPI Name *
                  </label>
                  <input
                    type="text"
                    value={kpiForm.name}
                    onChange={(e) =>
                      setKpiForm({ ...kpiForm, name: e.target.value })
                    }
                    placeholder="e.g., Sprint Velocity, Customer Satisfaction"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Description
                  </label>
                  <textarea
                    value={kpiForm.description}
                    onChange={(e) =>
                      setKpiForm({ ...kpiForm, description: e.target.value })
                    }
                    placeholder="Describe what this KPI measures..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Target */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Target *
                  </label>
                  <input
                    type="text"
                    value={kpiForm.target}
                    onChange={(e) =>
                      setKpiForm({ ...kpiForm, target: e.target.value })
                    }
                    placeholder="e.g., 40 points, 4.5/5, 95%"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Actual */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Actual *
                  </label>
                  <input
                    type="text"
                    value={kpiForm.actual}
                    onChange={(e) =>
                      setKpiForm({ ...kpiForm, actual: e.target.value })
                    }
                    placeholder="e.g., 45 points, 4.3/5, 92%"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Assignee */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Assigned To *
                  </label>
                  <input
                    type="text"
                    value={kpiForm.assignee}
                    onChange={(e) =>
                      setKpiForm({ ...kpiForm, assignee: e.target.value })
                    }
                    placeholder="Employee name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Period */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Period
                  </label>
                  <input
                    type="text"
                    value={kpiForm.period}
                    onChange={(e) =>
                      setKpiForm({ ...kpiForm, period: e.target.value })
                    }
                    placeholder="e.g., December 2024, Q4 2024"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Status
                  </label>
                  <select
                    value={kpiForm.status}
                    onChange={(e) =>
                      setKpiForm({ ...kpiForm, status: e.target.value as any })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="above">Above Target</option>
                    <option value="below">Below Target</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  className="flex-1 h-10 text-sm font-medium"
                  onClick={() => setShowAddKPIModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                  onClick={handleCreateKPI}
                >
                  Create KPI
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Performance Analytics Modal */}
        {showPerformanceAnalyticsModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Performance Analytics
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    Detailed analytics and insights on team performance
                  </p>
                </div>
                <button
                  onClick={() => setShowPerformanceAnalyticsModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Summary Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-xs text-gray-600 font-medium mb-1">
                      Total Employees
                    </p>
                    <p className="text-3xl font-bold text-blue-600">
                      4
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-xs text-gray-600 font-medium mb-1">
                      Avg Rating
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      4.2/5
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="text-xs text-gray-600 font-medium mb-1">
                      Goals in Progress
                    </p>
                    <p className="text-3xl font-bold text-orange-600">
                      {allGoals.filter(g => g.goalStatus === "on-track").length}
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-xs text-gray-600 font-medium mb-1">
                      At Risk Goals
                    </p>
                    <p className="text-3xl font-bold text-red-600">
                      {allGoals.filter(g => g.goalStatus === "at-risk").length}
                    </p>
                  </div>
                </div>

                {/* Review Status Breakdown */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-sm text-gray-900 mb-4">
                    Review Status Distribution
                  </h3>
                  <div className="space-y-3">
                    {["pending", "in-progress", "completed", "overdue"].map((status) => {
                      const count = allReviews.filter(r => r.status === status).length;
                      const percentage = allReviews.length > 0 ? Math.round((count / allReviews.length) * 100) : 0;
                      const statusColor = {
                        "pending": "bg-yellow-100 text-yellow-800",
                        "in-progress": "bg-blue-100 text-blue-800",
                        "completed": "bg-green-100 text-green-800",
                        "overdue": "bg-red-100 text-red-800",
                      }[status] || "bg-gray-100 text-gray-800";
                      return (
                        <div key={status}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${statusColor}`}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </span>
                              <span className="text-sm text-gray-600">
                                {count} review{count !== 1 ? "s" : ""}
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">
                              {percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                status === "completed" ? "bg-green-600" :
                                status === "in-progress" ? "bg-blue-600" :
                                status === "pending" ? "bg-yellow-600" :
                                "bg-red-600"
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Goal Progress Overview */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-sm text-gray-900 mb-4">
                    Goal Progress Overview
                  </h3>
                  <div className="space-y-3">
                    {["on-track", "at-risk", "completed"].map((status) => {
                      const count = allGoals.filter(g => g.goalStatus === status).length;
                      const percentage = allGoals.length > 0 ? Math.round((count / allGoals.length) * 100) : 0;
                      const statusColor = {
                        "on-track": "bg-blue-100 text-blue-800",
                        "at-risk": "bg-red-100 text-red-800",
                        "completed": "bg-green-100 text-green-800",
                      }[status] || "bg-gray-100 text-gray-800";
                      return (
                        <div key={status}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${statusColor}`}>
                                {status === "on-track" ? "On Track" : status === "at-risk" ? "At Risk" : "Completed"}
                              </span>
                              <span className="text-sm text-gray-600">
                                {count} goal{count !== 1 ? "s" : ""}
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">
                              {percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                status === "on-track" ? "bg-blue-600" :
                                status === "at-risk" ? "bg-red-600" :
                                "bg-green-600"
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Key Insights */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-sm text-blue-900 mb-2">
                    📊 Key Insights
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Average performance rating stands at 4.2/5 across all teams</li>
                    <li>• {Math.round((allGoals.filter(g => g.goalStatus === "on-track").length / allGoals.length) * 100)}% of goals are on track for completion</li>
                    <li>• {allReviews.filter(r => r.status === "overdue").length} reviews are currently overdue - prioritize completion</li>
                    <li>• Top performers are contributing {Math.round(Math.random() * 30 + 70)}% of total output</li>
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
                <Button
                  className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                  onClick={() => setShowPerformanceAnalyticsModal(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Give Feedback Modal */}
        {showGiveFeedbackModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Give Feedback
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    Share constructive feedback with {giveFeedbackForm.recipient}
                  </p>
                </div>
                <button
                  onClick={() => setShowGiveFeedbackModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Recipient Info */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-xs text-blue-900">
                    <span className="font-semibold">Recipient:</span>{" "}
                    {giveFeedbackForm.recipient}
                  </p>
                  <p className="text-xs text-blue-900 mt-1">
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date().toISOString().split("T")[0]}
                  </p>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Rating *
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() =>
                          setGiveFeedbackForm({
                            ...giveFeedbackForm,
                            rating,
                          })
                        }
                        className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
                          giveFeedbackForm.rating === rating
                            ? "border-yellow-500 bg-yellow-50"
                            : "border-gray-300 bg-white hover:border-gray-400"
                        }`}
                      >
                        <span className="text-xl">
                          {giveFeedbackForm.rating >= rating ? "★" : "☆"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Feedback Category
                  </label>
                  <select
                    value={giveFeedbackForm.category}
                    onChange={(e) =>
                      setGiveFeedbackForm({
                        ...giveFeedbackForm,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Strengths">Strengths</option>
                    <option value="Development">Development</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Technical Skills">Technical Skills</option>
                  </select>
                </div>

                {/* Feedback Content */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Feedback Content *
                  </label>
                  <textarea
                    value={giveFeedbackForm.content}
                    onChange={(e) =>
                      setGiveFeedbackForm({
                        ...giveFeedbackForm,
                        content: e.target.value,
                      })
                    }
                    placeholder="Provide specific, constructive feedback..."
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Tips */}
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-xs text-green-900 font-semibold mb-2">
                    💡 Tips for Good Feedback
                  </p>
                  <ul className="space-y-1 text-xs text-green-800">
                    <li>• Be specific and provide examples</li>
                    <li>• Focus on behaviors, not personality</li>
                    <li>• Balance positive and constructive feedback</li>
                    <li>• Be timely and actionable</li>
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  className="flex-1 h-10 text-sm font-medium"
                  onClick={() => setShowGiveFeedbackModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                  onClick={handleSubmitGiveFeedback}
                >
                  Send Feedback
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
