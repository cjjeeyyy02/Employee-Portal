import { useState } from "react";
import { Plus, FileText, TrendingUp, CheckCircle, AlertCircle, Calendar, ArrowUp, X } from "lucide-react";
import Layout from "@/components/Layout";
import GoalCard from "@/components/GoalCard";
import ReviewCard from "@/components/ReviewCard";
import FeedbackCard from "@/components/FeedbackCard";
import DevelopmentPlanCard from "@/components/DevelopmentPlanCard";
import AchievementCard from "@/components/AchievementCard";
import SkillsAssessment from "@/components/SkillsAssessment";

type TabType = "overview" | "goals" | "reviews" | "feedback" | "development";
type ModalType = "goal" | "review" | "development" | "schedule" | "report" | null;

export default function MyPerformance() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Form states
  const [goalForm, setGoalForm] = useState({ title: '', category: '', description: '', dueDate: '' });
  const [reviewForm, setReviewForm] = useState({ type: '', rating: '', comments: '' });
  const [developmentForm, setDevelopmentForm] = useState({ title: '', category: '', startDate: '', endDate: '' });
  const [scheduleForm, setScheduleForm] = useState({ date: '', time: '', notes: '' });

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleNewGoal = () => {
    if (goalForm.title && goalForm.category && goalForm.dueDate) {
      showNotification('Goal created successfully', 'success');
      setGoalForm({ title: '', category: '', description: '', dueDate: '' });
      setActiveModal(null);
    } else {
      showNotification('Please fill in all required fields', 'info');
    }
  };

  const handleStartReview = () => {
    if (reviewForm.rating && reviewForm.comments) {
      showNotification('Self-review submitted successfully', 'success');
      setReviewForm({ type: '', rating: '', comments: '' });
      setActiveModal(null);
    } else {
      showNotification('Please provide rating and comments', 'info');
    }
  };

  const handleAddDevelopment = () => {
    if (developmentForm.title && developmentForm.category) {
      showNotification('Development activity added successfully', 'success');
      setDevelopmentForm({ title: '', category: '', startDate: '', endDate: '' });
      setActiveModal(null);
    } else {
      showNotification('Please fill in required fields', 'info');
    }
  };

  const handleSchedule = () => {
    if (scheduleForm.date && scheduleForm.time) {
      showNotification('Meeting scheduled successfully', 'success');
      setScheduleForm({ date: '', time: '', notes: '' });
      setActiveModal(null);
    } else {
      showNotification('Please select date and time', 'info');
    }
  };

  const handlePerformanceReport = () => {
    showNotification('Performance report generated', 'success');
    setActiveModal('report');
  };

  return (
    <Layout>
      {/* Header Section */}
      <div className="mb-1.5 sm:mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
        <div>
          <h1 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5">Performance Management</h1>
          <p className="text-xs text-gray-600">Track your goals, reviews, and professional development</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handlePerformanceReport} className="px-3 py-1.5 text-xs text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1.5 border border-gray-300 bg-white">
            <FileText className="w-3.5 h-3.5" />
            Performance Report
          </button>
          <button onClick={() => setActiveModal('goal')} className="px-3 py-1.5 text-xs bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            New Goal
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-2 sm:mb-3 bg-white">
        <div className="flex gap-0 px-2 sm:px-3">
          {[
            { id: "overview", label: "Overview" },
            { id: "goals", label: "Goals" },
            { id: "reviews", label: "Reviews" },
            { id: "feedback", label: "Feedback" },
            { id: "development", label: "Development" },
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
          <div className="space-y-2">
            {/* Summary Stats - Top Row (4 cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5">
              {/* Overall Rating */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2">
                <p className="text-xs text-gray-600 mb-0.5">Overall Rating</p>
                <p className="text-base font-bold text-gray-900">4.2</p>
                <p className="text-xs text-green-600 font-semibold mt-0.5">+0.2 from last review</p>
              </div>

              {/* Goals Progress */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2">
                <p className="text-xs text-gray-600 mb-0.5">Goals Progress</p>
                <p className="text-base font-bold text-gray-900">68%</p>
                <p className="text-xs text-gray-700 mt-0.5">3 of 4 goals on track</p>
              </div>

              {/* Reviews Complete */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2">
                <p className="text-xs text-gray-600 mb-0.5">Reviews Complete</p>
                <p className="text-base font-bold text-gray-900">2</p>
                <p className="text-xs text-orange-600 font-semibold mt-0.5">1 pending review</p>
              </div>

              {/* Development Hours */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2">
                <p className="text-xs text-gray-600 mb-0.5">Development Hours</p>
                <p className="text-base font-bold text-gray-900">24h</p>
                <p className="text-xs text-green-600 font-semibold mt-0.5">120% of target</p>
              </div>
            </div>

            {/* Middle Section - Two Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {/* Left: Active Goals */}
              <div className="bg-white rounded-[12px] border border-gray-200 shadow-sm p-3">
                <h3 className="text-sm font-bold text-gray-900 mb-1">Active Goals</h3>
                <p className="text-xs text-gray-600 mb-2">Your current performance objectives</p>

                <div className="space-y-2">
                  {/* Goal 1 */}
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Improve Code Quality Metrics</p>
                        <p className="text-xs text-gray-600 mt-0.5">Technical Skills</p>
                      </div>
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        On Track
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">75% complete</p>
                  </div>

                  {/* Goal 2 */}
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Complete Leadership Training</p>
                        <p className="text-xs text-gray-600 mt-0.5">Professional Development</p>
                      </div>
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        On Track
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">60% complete</p>
                  </div>

                  {/* Goal 3 */}
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Mentor Two Junior Developers</p>
                        <p className="text-xs text-gray-600 mt-0.5">Leadership</p>
                      </div>
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                        At Risk
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-red-500 h-1.5 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">40% complete</p>
                  </div>
                </div>

                <button onClick={() => setActiveTab('goals')} className="w-full mt-2 px-3 py-1 text-xs font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors">
                  View All Goals
                </button>
              </div>

              {/* Right: Performance Trends */}
              <div className="bg-white rounded-[12px] border border-gray-200 shadow-sm p-3">
                <h3 className="text-sm font-bold text-gray-900 mb-1">Performance Trends</h3>
                <p className="text-xs text-gray-600 mb-2">Your ratings over time</p>

                <div className="space-y-2">
                  {/* Metric 1 */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-900">Communication</p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "86%" }}></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <ArrowUp className="w-3.5 h-3.5 text-green-500" />
                      <p className="text-sm font-bold text-gray-900 whitespace-nowrap">4.3</p>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-900">Technical Skills</p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "90%" }}></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <ArrowUp className="w-3.5 h-3.5 text-green-500" />
                      <p className="text-sm font-bold text-gray-900 whitespace-nowrap">4.5</p>
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-900">Leadership</p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "80%" }}></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <ArrowUp className="w-3.5 h-3.5 text-green-500" />
                      <p className="text-sm font-bold text-gray-900 whitespace-nowrap">4.0</p>
                    </div>
                  </div>

                  {/* Metric 4 */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-900">Teamwork</p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "96%" }}></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <ArrowUp className="w-3.5 h-3.5 text-green-500" />
                      <p className="text-sm font-bold text-gray-900 whitespace-nowrap">4.8</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section - Action Items */}
            <div className="bg-white rounded-[12px] border border-gray-200 shadow-sm p-3">
              <h3 className="text-sm font-bold text-gray-900 mb-1">Action Items</h3>
              <p className="text-xs text-gray-600 mb-2">Things that need your attention</p>

              <div className="space-y-2">
                {/* Action Item 1 */}
                <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-gray-100 last:border-b-0 last:pb-0">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Complete Q4 Self-Review</p>
                    <p className="text-xs text-gray-600 mt-0.5">Due December 20, 2024</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-yellow-100 text-yellow-800">
                      Due Soon
                    </span>
                    <button onClick={() => setActiveModal('review')} className="px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors whitespace-nowrap">
                      Start Review
                    </button>
                  </div>
                </div>

                {/* Action Item 2 */}
                <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-gray-100 last:border-b-0 last:pb-0">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Update Goal: Mentor Two Junior Developers</p>
                    <p className="text-xs text-gray-600 mt-0.5">Behind schedule</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-800">
                      Behind
                    </span>
                    <button onClick={() => setActiveModal('goal')} className="px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors whitespace-nowrap">
                      Update Goal
                    </button>
                  </div>
                </div>

                {/* Action Item 3 */}
                <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-gray-100 last:border-b-0 last:pb-0">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Schedule Development Plan Discussion</p>
                    <p className="text-xs text-gray-600 mt-0.5">Review with manager this week</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                      Pending
                    </span>
                    <button onClick={() => setActiveModal('schedule')} className="px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors whitespace-nowrap">
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* ===== GOALS TAB ===== */}
      {activeTab === "goals" && (
        <div className="bg-white rounded-[12px] p-4 space-y-3">
          <GoalCard
            title="Improve Code Quality Metrics"
            status="on track"
            description="Increase code review approval rate and reduce bug reports"
            target="Target: 95% approval rate"
            current="Current: 87%"
            progress={75}
            category="Technical Skills"
            dueDate="2024-12-31"
            onEdit={() => console.log("Edit goal 1")}
          />
          <GoalCard
            title="Complete Leadership Training Program"
            status="on track"
            description="Finish all modules of the advanced leadership development course"
            target="Target: 8 modules"
            current="Completed: 5 modules"
            progress={60}
            category="Professional Development"
            dueDate="2025-02-28"
            onEdit={() => console.log("Edit goal 2")}
          />
          <GoalCard
            title="Mentor Two Junior Developers"
            status="at risk"
            description="Provide guidance and support to help junior team members grow"
            target="Target: 2 mentees"
            current="Current: 1 mentee"
            progress={40}
            category="Leadership"
            dueDate="2025-01-31"
            onEdit={() => console.log("Edit goal 3")}
          />
        </div>
      )}

      {/* ===== REVIEWS TAB ===== */}
      {activeTab === "reviews" && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
          <ReviewCard
            title="Q4 2024 - Quarterly Review"
            status="pending"
            dueDate="Dec 15, 2024"
            onActionClick={() => console.log("Start review")}
          />
          <ReviewCard
            title="Q3 2024 - Quarterly Review"
            status="completed"
            completedDate="Oct 15, 2024"
            overallRating={4.3}
            managerRating="4.2/5.0"
            selfRating="4.5/5.0"
            onActionClick={() => console.log("View details")}
          />
          <ReviewCard
            title="Q2 2024 - Quarterly Review"
            status="completed"
            completedDate="Jul 15, 2024"
            overallRating={4.1}
            managerRating="4.0/5.0"
            selfRating="4.3/5.0"
            onActionClick={() => console.log("View details")}
          />
        </div>
      )}

      {/* ===== FEEDBACK TAB ===== */}
      {activeTab === "feedback" && (
        <div className="bg-gray-50 p-4 min-h-screen space-y-3">
          <FeedbackCard
            name="Sarah Johnson"
            position="Engineering Manager"
            feedbackType="manager"
            rating={4.5}
            date="Dec 5, 2024"
            comment="John consistently delivers high-quality work and shows great initiative in solving complex problems. His collaboration with team members is excellent."
            categoryRatings={[
              { name: "Communication", rating: 4.5 },
              { name: "Teamwork", rating: 4.7 },
              { name: "Leadership", rating: 4.3 },
              { name: "Technical", rating: 4.8 },
            ]}
            onCardClick={() => console.log("Open feedback details")}
          />
          <FeedbackCard
            name="Michael Chen"
            position="Senior Developer"
            feedbackType="peer"
            rating={4.2}
            date="Nov 28, 2024"
            comment="John is a great team player. He could consider taking on more leadership responsibilities in the team. His technical expertise is valuable and he shares knowledge effectively."
            categoryRatings={[
              { name: "Communication", rating: 4.1 },
              { name: "Teamwork", rating: 4.6 },
              { name: "Leadership", rating: 3.9 },
              { name: "Technical", rating: 4.5 },
            ]}
            onCardClick={() => console.log("Open feedback details")}
          />
          <FeedbackCard
            name="Emma Wilson"
            position="Product Manager"
            feedbackType="manager"
            rating={4.6}
            date="Nov 15, 2024"
            comment="Your technical expertise has been invaluable to the team. You consistently bring innovative solutions to complex challenges and mentor others effectively."
            categoryRatings={[
              { name: "Communication", rating: 4.6 },
              { name: "Teamwork", rating: 4.8 },
              { name: "Leadership", rating: 4.4 },
              { name: "Technical", rating: 4.9 },
            ]}
            onCardClick={() => console.log("Open feedback details")}
          />
        </div>
      )}

      {/* ===== DEVELOPMENT TAB ===== */}
      {activeTab === "development" && (
        <div className="space-y-6">
          {/* DEVELOPMENT PLAN SECTION */}
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-1">Development Plan</h2>
            <p className="text-xs text-gray-600 mb-3">Your professional growth roadmap</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
              <DevelopmentPlanCard
                title="Advanced Leadership Course"
                subtext="8 modules, 24 hours"
                statusBadge="In Progress (5/8 modules)"
              />
              <DevelopmentPlanCard
                title="Technical Certification"
                subtext="AWS Solutions Architect"
                statusBadge="Planned (Start Q1 2025)"
              />
              <DevelopmentPlanCard
                title="Communication Workshop"
                subtext="Public speaking skills"
                statusBadge="Completed (Nov 2024)"
              />
            </div>
            <button onClick={() => setActiveModal('development')} className="px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Plus className="w-3.5 h-3.5" />
              Add Development Activity
            </button>
          </div>

          {/* ACHIEVEMENTS & RECOGNITION SECTION */}
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-1">Achievements & Recognition</h2>
            <p className="text-xs text-gray-600 mb-3">Your accomplishments and awards</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <AchievementCard
                icon="award"
                title="Employee of the Month"
                subtext="September 2024"
              />
              <AchievementCard
                icon="team"
                title="Team Leadership Excellence"
                subtext="Q3 2024"
              />
              <AchievementCard
                icon="target"
                title="Project Delivery Excellence"
                subtext="Q2 2024"
              />
            </div>
          </div>

          {/* SKILLS ASSESSMENT SECTION */}
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-1">Skills Assessment</h2>
            <p className="text-xs text-gray-600 mb-3">Your current skill levels and growth areas</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <SkillsAssessment
                groupName="Technical Skills"
                skills={[
                  { name: "React/JavaScript", level: "Expert", rating: 4.5, progress: 90 },
                  { name: "Node.js/Backend", level: "Advanced", rating: 4.0, progress: 80 },
                  { name: "Cloud/AWS", level: "Intermediate", rating: 3.0, progress: 60 },
                ]}
              />
              <SkillsAssessment
                groupName="Soft Skills"
                skills={[
                  { name: "Communication", level: "Advanced", rating: 4.3, progress: 86 },
                  { name: "Leadership", level: "Intermediate", rating: 3.8, progress: 76 },
                  { name: "Project Management", level: "Advanced", rating: 4.0, progress: 80 },
                ]}
              />
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg text-white text-sm font-medium z-50 ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
        }`}>
          {notification.message}
        </div>
      )}

      {/* New Goal Modal */}
      {activeModal === 'goal' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Create New Goal</h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Goal Title</label>
                <input
                  type="text"
                  value={goalForm.title}
                  onChange={(e) => setGoalForm({ ...goalForm, title: e.target.value })}
                  placeholder="e.g., Improve code quality"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={goalForm.category}
                  onChange={(e) => setGoalForm({ ...goalForm, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  <option value="Technical Skills">Technical Skills</option>
                  <option value="Professional Development">Professional Development</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Communication">Communication</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={goalForm.description}
                  onChange={(e) => setGoalForm({ ...goalForm, description: e.target.value })}
                  placeholder="Describe your goal..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={goalForm.dueDate}
                  onChange={(e) => setGoalForm({ ...goalForm, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setActiveModal(null)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                  Cancel
                </button>
                <button onClick={handleNewGoal} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                  Create Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Self-Review Modal */}
      {activeModal === 'review' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Self-Review</h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                <select
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select rating</option>
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Good</option>
                  <option value="3">3 - Satisfactory</option>
                  <option value="2">2 - Needs Improvement</option>
                  <option value="1">1 - Poor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
                <textarea
                  value={reviewForm.comments}
                  onChange={(e) => setReviewForm({ ...reviewForm, comments: e.target.value })}
                  placeholder="Share your self-assessment..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                ></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setActiveModal(null)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                  Cancel
                </button>
                <button onClick={handleStartReview} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Development Activity Modal */}
      {activeModal === 'development' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Add Development Activity</h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Activity Title</label>
                <input
                  type="text"
                  value={developmentForm.title}
                  onChange={(e) => setDevelopmentForm({ ...developmentForm, title: e.target.value })}
                  placeholder="e.g., AWS Certification Course"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={developmentForm.category}
                  onChange={(e) => setDevelopmentForm({ ...developmentForm, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="Training">Training</option>
                  <option value="Certification">Certification</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Self-Study">Self-Study</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={developmentForm.startDate}
                    onChange={(e) => setDevelopmentForm({ ...developmentForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={developmentForm.endDate}
                    onChange={(e) => setDevelopmentForm({ ...developmentForm, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setActiveModal(null)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                  Cancel
                </button>
                <button onClick={handleAddDevelopment} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                  Add Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Meeting Modal */}
      {activeModal === 'schedule' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Schedule Discussion</h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={scheduleForm.date}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={scheduleForm.time}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={scheduleForm.notes}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, notes: e.target.value })}
                  placeholder="Add any notes..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                ></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setActiveModal(null)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                  Cancel
                </button>
                <button onClick={handleSchedule} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Report Modal */}
      {activeModal === 'report' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Performance Report</h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Q4 2024 Performance Summary</h3>
                <p className="text-sm text-gray-600 mb-3">Generated on {new Date().toLocaleDateString()}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Overall Rating:</span>
                    <span className="font-semibold text-gray-900">4.2 / 5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Goals Progress:</span>
                    <span className="font-semibold text-gray-900">68%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Development Hours:</span>
                    <span className="font-semibold text-gray-900">24 hours (120% of target)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reviews Completed:</span>
                    <span className="font-semibold text-gray-900">2 of 3</span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm text-blue-800">
                <p>Your full performance report has been generated and is ready for download or sharing with your manager.</p>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setActiveModal(null)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                  Close
                </button>
                <button onClick={() => { showNotification('Report downloaded successfully', 'success'); setActiveModal(null); }} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                  Download Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
