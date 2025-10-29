import { useState } from "react";
import { Plus, FileText, TrendingUp, CheckCircle, AlertCircle, Calendar, ArrowUp } from "lucide-react";
import Layout from "@/components/Layout";

type TabType = "overview" | "goals" | "reviews" | "feedback" | "development";

export default function MyPerformance() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  return (
    <Layout>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start mb-3 gap-2 sm:gap-3">
        <div>
          <h1 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Performance Management</h1>
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
      <div className="flex gap-4 border-b border-gray-200 mb-4">
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
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
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

      {/* Other Tabs - Placeholder */}
      {activeTab !== "overview" && (
        <div className="bg-white rounded-[12px] border border-gray-200 shadow-sm p-6 text-center">
          <p className="text-gray-600">This tab is coming soon</p>
        </div>
      )}
    </Layout>
  );
}
