import { useState } from "react";
import {
  TrendingUp,
  Target,
  MessageCircle,
  Calendar,
  CheckCircle,
  AlertCircle,
  Star,
  ThumbsUp,
  ThumbsDown,
  Plus,
  Clock,
  User,
  Users,
} from "lucide-react";
import Layout from "@/components/Layout";

type TabType = "overview" | "goals" | "review" | "feedback";

export default function MyPerformance() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [formData, setFormData] = useState({
    goalTitle: "",
    goalDescription: "",
    kpiMetric: "",
    target: "",
    department: "",
    feedbackRecipient: "",
    feedbackType: "positive",
    feedbackMessage: "",
  });

  const goalsData = [
    {
      id: 1,
      title: "Improve Customer Satisfaction Score",
      description: "Increase NPS by 10 points",
      target: "Q4 2025",
      kpiMetric: "NPS Score",
      progress: 75,
      status: "On Track",
      owner: "Sarah Johnson",
    },
    {
      id: 2,
      title: "Complete Leadership Training",
      description: "Finish the advanced leadership program",
      target: "Q4 2025",
      kpiMetric: "Training Hours",
      progress: 60,
      status: "On Track",
      owner: "Sarah Johnson",
    },
    {
      id: 3,
      title: "Reduce Bug Reports",
      description: "Decrease bug count in new features by 20%",
      target: "Q3 2025",
      kpiMetric: "Bug Count",
      progress: 100,
      status: "Completed",
      owner: "Sarah Johnson",
    },
    {
      id: 4,
      title: "Mentorship Program",
      description: "Mentor 2 junior team members",
      target: "Q4 2025",
      kpiMetric: "Mentees",
      progress: 50,
      status: "At Risk",
      owner: "Sarah Johnson",
    },
  ];

  const reviewHistoryData = [
    {
      id: 1,
      cycle: "Q4 2025",
      period: "Oct–Dec 2025",
      reviewer: "Manager Name",
      rating: 4.3,
      status: "In Progress",
    },
    {
      id: 2,
      cycle: "Q3 2025",
      period: "Jul–Sep 2025",
      reviewer: "Manager Name",
      rating: 4.5,
      status: "Completed",
    },
    {
      id: 3,
      cycle: "Q2 2025",
      period: "Apr–Jun 2025",
      reviewer: "Manager Name",
      rating: 4.2,
      status: "Completed",
    },
    {
      id: 4,
      cycle: "Q1 2025",
      period: "Jan–Mar 2025",
      reviewer: "Manager Name",
      rating: 4.0,
      status: "Completed",
    },
  ];

  const feedbackData = [
    {
      id: 1,
      sender: "Alex Chen",
      date: "Oct 18, 2024 • 2:30 PM",
      type: "Positive",
      message: "Great work on the new feature rollout. Your communication and planning were excellent!",
    },
    {
      id: 2,
      sender: "Maya Patel",
      date: "Oct 16, 2024 • 10:15 AM",
      type: "Constructive",
      message: "Consider breaking down large tasks into smaller milestones. This would help with progress tracking.",
    },
    {
      id: 3,
      sender: "James Wilson",
      date: "Oct 14, 2024 • 4:45 PM",
      type: "Positive",
      message: "Excellent presentation at the team meeting. Very clear and engaging delivery!",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "bg-green-100 text-green-700";
      case "At Risk":
        return "bg-orange-100 text-orange-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getFeedbackTypeColor = (type: string) => {
    return type === "Positive" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700";
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < fullStars
                ? "fill-yellow-400 text-yellow-400"
                : i === fullStars && hasHalfStar
                  ? "fill-yellow-400 text-yellow-400 opacity-50"
                  : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-xs font-semibold text-gray-700 ml-1">{rating}/5</span>
      </div>
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddGoal = () => {
    setShowAddGoalModal(false);
    setFormData({
      goalTitle: "",
      goalDescription: "",
      kpiMetric: "",
      target: "",
      department: "",
      feedbackRecipient: "",
      feedbackType: "positive",
      feedbackMessage: "",
    });
  };

  const handleGiveFeedback = () => {
    setShowFeedbackModal(false);
    setFormData({
      goalTitle: "",
      goalDescription: "",
      kpiMetric: "",
      target: "",
      department: "",
      feedbackRecipient: "",
      feedbackType: "positive",
      feedbackMessage: "",
    });
  };

  return (
    <Layout>
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">My Performance</h1>
        <p className="text-sm text-gray-600">Track your goals, reviews, and continuous feedback.</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6 bg-white">
        <div className="flex gap-0 px-6">
          {[
            { id: "overview", label: "Overview" },
            { id: "goals", label: "Goals & KPIs" },
            { id: "review", label: "Performance Review" },
            { id: "feedback", label: "Continuous Feedback" },
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

      {/* ===== OVERVIEW TAB ===== */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Overview Summary Cards */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-3">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">4.5</p>
                <p className="text-xs text-gray-600">/5</p>
                <p className="text-sm font-medium text-gray-700 mt-2">Performance Score</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-3">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">8</p>
                <p className="text-xs text-gray-600">/10</p>
                <p className="text-sm font-medium text-gray-700 mt-2">Goals Achieved</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-3">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">12</p>
                <p className="text-sm font-medium text-gray-700 mt-2">Feedback Received</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-3">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">Q4 2025</p>
                <p className="text-sm font-medium text-gray-700 mt-2">Current Review Cycle</p>
              </div>
            </div>
          </div>

          {/* Recent Performance Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Performance Activity</h2>
            <div className="space-y-0">
              <div className="pb-4 border-b border-gray-100">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Target className="w-5 h-5 text-blue-600 mt-1" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Goal updated: Improve NPS +10%</p>
                    <p className="text-xs text-gray-500 mt-1">Oct 18, 2024 • 3:30 PM</p>
                  </div>
                </div>
              </div>

              <div className="py-4 border-b border-gray-100">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-green-600 mt-1" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Received feedback from Manager</p>
                    <p className="text-xs text-gray-500 mt-1">Oct 16, 2024 • 10:15 AM</p>
                  </div>
                </div>
              </div>

              <div className="py-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Calendar className="w-5 h-5 text-orange-600 mt-1" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Performance review scheduled for Oct 25</p>
                    <p className="text-xs text-gray-500 mt-1">Oct 10, 2024 • 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== GOALS & KPIs TAB ===== */}
      {activeTab === "goals" && (
        <div className="space-y-6">
          {/* Header with Add Button */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Goals & KPIs</h2>
            <button
              onClick={() => setShowAddGoalModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" /> Add New Goal
            </button>
          </div>

          {/* Goals Table */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Goal Title</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Description</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Target</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">KPI Metric</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Progress</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Owner</th>
                  </tr>
                </thead>
                <tbody>
                  {goalsData.map((goal, index) => (
                    <tr key={goal.id} className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{goal.title}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{goal.description}</td>
                      <td className="px-4 py-3 text-xs text-gray-700">{goal.target}</td>
                      <td className="px-4 py-3 text-xs text-gray-700">{goal.kpiMetric}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                          </div>
                          <span className="text-xs font-semibold text-gray-900 whitespace-nowrap">{goal.progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                          {goal.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-700">{goal.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ===== PERFORMANCE REVIEW TAB ===== */}
      {activeTab === "review" && (
        <div className="space-y-6">
          {/* Current Review Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Review — Q4 2025</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-gray-600 mb-1">Review Period</p>
                <p className="text-sm font-semibold text-gray-900">Oct–Dec 2025</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Reviewer</p>
                <p className="text-sm font-semibold text-gray-900">Manager Name</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Status</p>
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  In Progress
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Average Score</p>
                <p className="text-sm font-semibold text-gray-900">4.3/5</p>
              </div>
            </div>
          </div>

          {/* Review History Table */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Review History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Cycle</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Review Period</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Reviewer</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Rating</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewHistoryData.map((review, index) => (
                    <tr key={review.id} className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{review.cycle}</td>
                      <td className="px-4 py-3 text-xs text-gray-700">{review.period}</td>
                      <td className="px-4 py-3 text-xs text-gray-700">{review.reviewer}</td>
                      <td className="px-4 py-3 text-center">{renderStars(review.rating)}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                          {review.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ===== CONTINUOUS FEEDBACK TAB ===== */}
      {activeTab === "feedback" && (
        <div className="space-y-6">
          {/* Feedback Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <ThumbsUp className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">8</p>
              <p className="text-sm font-medium text-gray-700 mt-2">Feedback Given</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">12</p>
              <p className="text-sm font-medium text-gray-700 mt-2">Feedback Received</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-lg font-bold text-gray-900">Oct 18</p>
              <p className="text-sm font-medium text-gray-700 mt-2">Most Recent Feedback</p>
            </div>
          </div>

          {/* Feedback Feed */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Feedback Feed</h2>
              <button
                onClick={() => setShowFeedbackModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" /> Give Feedback
              </button>
            </div>

            <div className="space-y-4">
              {feedbackData.map((feedback) => (
                <div key={feedback.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">{feedback.sender}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getFeedbackTypeColor(feedback.type)}`}>
                          {feedback.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{feedback.date}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{feedback.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add New Goal Modal */}
      {showAddGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Goal</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Goal Title</label>
                <input
                  type="text"
                  value={formData.goalTitle}
                  onChange={(e) => handleInputChange("goalTitle", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter goal title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.goalDescription}
                  onChange={(e) => handleInputChange("goalDescription", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter goal description"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">KPI Metric</label>
                <input
                  type="text"
                  value={formData.kpiMetric}
                  onChange={(e) => handleInputChange("kpiMetric", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Customer Satisfaction"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target</label>
                <select
                  value={formData.target}
                  onChange={(e) => handleInputChange("target", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select target quarter</option>
                  <option value="Q4 2025">Q4 2025</option>
                  <option value="Q3 2025">Q3 2025</option>
                  <option value="Q2 2025">Q2 2025</option>
                  <option value="Q1 2025">Q1 2025</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => handleInputChange("department", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddGoalModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddGoal}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Give Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Give Feedback</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
                <select
                  value={formData.feedbackRecipient}
                  onChange={(e) => handleInputChange("feedbackRecipient", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select recipient</option>
                  <option value="Manager">Manager Name</option>
                  <option value="Colleague">Colleague 1</option>
                  <option value="Colleague">Colleague 2</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Type</label>
                <select
                  value={formData.feedbackType}
                  onChange={(e) => handleInputChange("feedbackType", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="positive">Positive</option>
                  <option value="constructive">Constructive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={formData.feedbackMessage}
                  onChange={(e) => handleInputChange("feedbackMessage", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Enter your feedback"
                ></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGiveFeedback}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                >
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
