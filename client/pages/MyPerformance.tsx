import { useState } from "react";
import { Plus, FileText, TrendingUp, CheckCircle, AlertCircle, Calendar, ArrowUp } from "lucide-react";
import Layout from "@/components/Layout";
import GoalCard from "@/components/GoalCard";
import ReviewCard from "@/components/ReviewCard";
import FeedbackCard from "@/components/FeedbackCard";

type TabType = "overview" | "goals" | "reviews" | "feedback" | "development";

export default function MyPerformance() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  return (
    <Layout>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start mb-1.5 sm:mb-2 gap-2 sm:gap-3">
        <div>
          <h1 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5">Performance Management</h1>
            <p className="text-xs text-gray-600">Track your goals, reviews, and professional development</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1.5 border border-gray-300 bg-white">
              <FileText className="w-3.5 h-3.5" />
              Performance Report
            </button>
            <button className="px-3 py-1.5 text-xs bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              New Goal
            </button>
          </div>
        </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-1.5 sm:mb-2 overflow-x-auto">
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
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-gray-100 text-blue-600 border-b-2 border-blue-600 font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===== OVERVIEW TAB ===== */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            {/* Summary Stats - Top Row (4 cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Overall Rating */}
              <div className="bg-white rounded-[12px] border border-gray-200 shadow-sm p-4">
                <p className="text-xs text-gray-600 mb-1">Overall Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.2</p>
                <p className="text-xs text-green-600 font-semibold mt-1">+0.2 from last review</p>
              </div>

              {/* Goals Progress */}
              <div className="bg-white rounded-[12px] border border-gray-200 shadow-sm p-4">
                <p className="text-xs text-gray-600 mb-1">Goals Progress</p>
                <p className="text-2xl font-bold text-gray-900">68%</p>
                <p className="text-xs text-gray-700 mt-1">3 of 4 goals on track</p>
              </div>

              {/* Reviews Complete */}
              <div className="bg-white rounded-[12px] border border-gray-200 shadow-sm p-4">
                <p className="text-xs text-gray-600 mb-1">Reviews Complete</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
                <p className="text-xs text-orange-600 font-semibold mt-1">1 pending review</p>
              </div>

              {/* Development Hours */}
              <div className="bg-white rounded-[12px] border border-gray-200 shadow-sm p-4">
                <p className="text-xs text-gray-600 mb-1">Development Hours</p>
                <p className="text-2xl font-bold text-gray-900">24h</p>
                <p className="text-xs text-green-600 font-semibold mt-1">120% of target</p>
              </div>
            </div>

            {/* Middle Section - Two Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left: Active Goals */}
              <div className="bg-white rounded-[12px] border border-gray-200 shadow-sm p-4">
                <h3 className="text-base font-bold text-gray-900 mb-1">Active Goals</h3>
                <p className="text-xs text-gray-600 mb-3">Your current performance objectives</p>

                <div className="space-y-3">
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

                <button className="w-full mt-3 px-3 py-1.5 text-xs font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors">
                  View All Goals
                </button>
              </div>

              {/* Right: Performance Trends */}
              <div className="bg-white rounded-[12px] border border-gray-200 shadow-sm p-4">
                <h3 className="text-base font-bold text-gray-900 mb-1">Performance Trends</h3>
                <p className="text-xs text-gray-600 mb-3">Your ratings over time</p>

                <div className="space-y-2.5">
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
            <div className="bg-white rounded-[12px] border border-gray-200 shadow-sm p-4">
              <h3 className="text-base font-bold text-gray-900 mb-1">Action Items</h3>
              <p className="text-xs text-gray-600 mb-3">Things that need your attention</p>

              <div className="space-y-2.5">
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
                    <button className="px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors whitespace-nowrap">
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
                    <button className="px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors whitespace-nowrap">
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
                    <button className="px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors whitespace-nowrap">
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
        <div className="bg-white rounded-[12px] p-5 space-y-4">
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
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
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
        <div className="bg-gray-50 p-6 min-h-screen space-y-5">
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
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 sm:p-4">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3">Development Activities</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2 pb-2 border-b border-gray-200">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-gray-900">Advanced React Patterns Course</p>
                  <p className="text-xs text-gray-600 mt-0.5">Completed • 16 hours • Dec 5, 2024</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pb-2 border-b border-gray-200">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-gray-900">Technical Leadership Workshop</p>
                  <p className="text-xs text-gray-600 mt-0.5">In Progress • 20 hours • Due: Dec 20, 2024</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-gray-900">Agile Scrum Certification</p>
                  <p className="text-xs text-gray-600 mt-0.5">Planned • 40 hours • Starting: Jan 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
