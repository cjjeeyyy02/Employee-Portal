import { useState } from "react";
import Layout from "@/components/Layout";

type TabType = "goals" | "reviews" | "feedback";

export default function MyPerformance() {
  const [activeTab, setActiveTab] = useState<TabType>("goals");

  return (
    <Layout>
      {/* Header Section */}
      <div className="mb-4">
        <h1 className="text-base font-semibold text-gray-900 mb-0.5">Performance Management</h1>
        <p className="text-xs text-gray-600">Track your goals, reviews, and professional development</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-3">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("goals")}
            className={`pb-2 text-sm font-medium transition-all border-b-2 ${
              activeTab === "goals"
                ? "text-blue-600 border-blue-600"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            Goals and KPIs
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-2 text-sm font-medium transition-all border-b-2 ${
              activeTab === "reviews"
                ? "text-blue-600 border-blue-600"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => setActiveTab("feedback")}
            className={`pb-2 text-sm font-medium transition-all border-b-2 ${
              activeTab === "feedback"
                ? "text-blue-600 border-blue-600"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            Feedback
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "goals" && (
        <div className="flex flex-col gap-3" style={{ padding: "12px", backgroundColor: "#FFFFFF", borderRadius: "8px", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)" }}>
          {/* Goal Block 1 */}
          <div className="flex flex-col gap-2">
            {/* Section Title */}
            <h2 style={{ fontSize: "14px", fontWeight: "700", color: "#1A73E8", marginBottom: "4px" }}>
              Goal Details
            </h2>

            {/* Goal Card */}
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: "6px", padding: "10px", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", display: "flex", flexDirection: "column", gap: "8px" }}>
              {/* Goal Header Row */}
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                  <p style={{ fontSize: "10px", color: "#6B7280", marginBottom: "2px" }}>Goal Title</p>
                  <p style={{ fontSize: "11px", fontWeight: "600", color: "#111827" }}>Increase Quarterly Active Users (QAU) by 25%</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span style={{ backgroundColor: "#FDE7E9", color: "#C62828", padding: "2px 6px", borderRadius: "9999px", fontSize: "10px", fontWeight: "600" }}>
                    High
                  </span>
                  <div className="text-right">
                    <p style={{ fontSize: "10px", color: "#6B7280" }}>Due Date</p>
                    <p style={{ fontSize: "11px", fontWeight: "600", color: "#111827" }}>12-31-2025</p>
                  </div>
                </div>
              </div>

              {/* Goal Description */}
              <div>
                <p style={{ fontSize: "10px", color: "#6B7280", marginBottom: "2px" }}>Description</p>
                <p style={{ fontSize: "11px", color: "#374151", lineHeight: "1.4" }}>
                  This strategic goal aims to significantly boost the user base's engagement and retention rates by focusing on improving the onboarding flow and launching three new premium features. Success will be measured by the QAU metric at the end of the quarter.
                </p>
              </div>

              {/* Goal Progress Bar */}
              <div>
                <div className="flex justify-between items-center" style={{ marginBottom: "4px" }}>
                  <p style={{ fontSize: "10px", fontWeight: "500", color: "#374151" }}>Goal Progress</p>
                  <p style={{ fontSize: "10px", fontWeight: "600", color: "#111827" }}>60% Complete</p>
                </div>
                <div style={{ width: "100%", height: "5px", backgroundColor: "#E0E0E0", borderRadius: "9999px", overflow: "hidden" }}>
                  <div style={{ width: "60%", height: "5px", backgroundColor: "#3D5AFE", borderRadius: "9999px" }}></div>
                </div>
              </div>
            </div>

            {/* KPI Card Section */}
            <div style={{ backgroundColor: "#FFFBEA", borderRadius: "6px", padding: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {/* KPI Title Row */}
              <h3 style={{ fontSize: "11px", fontWeight: "600", color: "#111827" }}>Key Performance Indicator (KPI)</h3>

              {/* Two Column Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* KPI Title */}
                <div>
                  <p style={{ fontSize: "10px", color: "#6B7280", marginBottom: "2px" }}>KPI Title</p>
                  <p style={{ fontSize: "11px", fontWeight: "500", color: "#111827" }}>Monthly Active User (MAU) Growth</p>
                </div>

                {/* KPI Target */}
                <div>
                  <p style={{ fontSize: "10px", color: "#6B7280", marginBottom: "2px" }}>KPI Target</p>
                  <p style={{ fontSize: "11px", fontWeight: "700", color: "#1DB954" }}>25% (Growth)</p>
                </div>

                {/* KPI Unit Type */}
                <div>
                  <p style={{ fontSize: "10px", color: "#6B7280", marginBottom: "2px" }}>KPI Unit Type</p>
                  <p style={{ fontSize: "11px", fontWeight: "500", color: "#111827" }}>Percentage (%)</p>
                </div>

                {/* KPI Tags */}
                <div>
                  <p style={{ fontSize: "10px", color: "#6B7280", marginBottom: "4px" }}>KPI Tags</p>
                  <div className="flex gap-1 flex-wrap">
                    <span style={{ backgroundColor: "#E3F2FD", color: "#1E88E5", padding: "2px 8px", borderRadius: "9999px", fontSize: "10px", fontWeight: "500" }}>
                      Lagging & Quantitative
                    </span>
                    <span style={{ backgroundColor: "#E8F5E9", color: "#43A047", padding: "2px 8px", borderRadius: "9999px", fontSize: "10px", fontWeight: "500" }}>
                      Outcome
                    </span>
                  </div>
                </div>
              </div>

              {/* KPI Notes (Full Width) */}
              <div>
                <p style={{ fontSize: "10px", color: "#6B7280", marginBottom: "2px" }}>KPI Notes</p>
                <p style={{ fontSize: "11px", color: "#374151", lineHeight: "1.4" }}>
                  KPIs provide targets for teams to shoot for, milestones to gauge progress, and insights that help people across the organization make better decisions.
                </p>
              </div>
            </div>
          </div>

          {/* Goal Block 2 (Duplicate) */}
          <div className="flex flex-col gap-2">
            {/* Section Title */}
            <h2 style={{ fontSize: "14px", fontWeight: "700", color: "#1A73E8", marginBottom: "4px" }}>
              Goal Details
            </h2>

            {/* Goal Card */}
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: "6px", padding: "10px", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", display: "flex", flexDirection: "column", gap: "8px" }}>
              {/* Goal Header Row */}
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                  <p style={{ fontSize: "10px", color: "#6B7280", marginBottom: "2px" }}>Goal Title</p>
                  <p style={{ fontSize: "11px", fontWeight: "600", color: "#111827" }}>Increase Quarterly Active Users (QAU) by 25%</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span style={{ backgroundColor: "#FDE7E9", color: "#C62828", padding: "2px 6px", borderRadius: "9999px", fontSize: "10px", fontWeight: "600" }}>
                    High
                  </span>
                  <div className="text-right">
                    <p style={{ fontSize: "10px", color: "#6B7280" }}>Due Date</p>
                    <p style={{ fontSize: "11px", fontWeight: "600", color: "#111827" }}>12-31-2025</p>
                  </div>
                </div>
              </div>

              {/* Goal Description */}
              <div>
                <p style={{ fontSize: "10px", color: "#6B7280", marginBottom: "2px" }}>Description</p>
                <p style={{ fontSize: "11px", color: "#374151", lineHeight: "1.4" }}>
                  This strategic goal aims to significantly boost the user base's engagement and retention rates by focusing on improving the onboarding flow and launching three new premium features. Success will be measured by the QAU metric at the end of the quarter.
                </p>
              </div>

              {/* Goal Progress Bar */}
              <div>
                <div className="flex justify-between items-center" style={{ marginBottom: "4px" }}>
                  <p style={{ fontSize: "10px", fontWeight: "500", color: "#374151" }}>Goal Progress</p>
                  <p style={{ fontSize: "10px", fontWeight: "600", color: "#111827" }}>60% Complete</p>
                </div>
                <div style={{ width: "100%", height: "5px", backgroundColor: "#E0E0E0", borderRadius: "9999px", overflow: "hidden" }}>
                  <div style={{ width: "60%", height: "5px", backgroundColor: "#3D5AFE", borderRadius: "9999px" }}></div>
                </div>
              </div>
            </div>

            {/* KPI Card Section */}
            <div style={{ backgroundColor: "#FFFBEA", borderRadius: "6px", padding: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {/* KPI Title Row */}
              <h3 style={{ fontSize: "11px", fontWeight: "600", color: "#111827" }}>Key Performance Indicator (KPI)</h3>

              {/* Two Column Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* KPI Title */}
                <div>
                  <p style={{ fontSize: "10px", color: "#6B7280", marginBottom: "2px" }}>KPI Title</p>
                  <p style={{ fontSize: "11px", fontWeight: "500", color: "#111827" }}>Monthly Active User (MAU) Growth</p>
                </div>

                {/* KPI Target */}
                <div>
                  <p style={{ fontSize: "10px", color: "#6B7280", marginBottom: "2px" }}>KPI Target</p>
                  <p style={{ fontSize: "11px", fontWeight: "700", color: "#1DB954" }}>25% (Growth)</p>
                </div>

                {/* KPI Unit Type */}
                <div>
                  <p style={{ fontSize: "10px", color: "#6B7280", marginBottom: "2px" }}>KPI Unit Type</p>
                  <p style={{ fontSize: "11px", fontWeight: "500", color: "#111827" }}>Percentage (%)</p>
                </div>

                {/* KPI Tags */}
                <div>
                  <p style={{ fontSize: "10px", color: "#6B7280", marginBottom: "4px" }}>KPI Tags</p>
                  <div className="flex gap-1 flex-wrap">
                    <span style={{ backgroundColor: "#E3F2FD", color: "#1E88E5", padding: "2px 8px", borderRadius: "9999px", fontSize: "10px", fontWeight: "500" }}>
                      Lagging & Quantitative
                    </span>
                    <span style={{ backgroundColor: "#E8F5E9", color: "#43A047", padding: "2px 8px", borderRadius: "9999px", fontSize: "10px", fontWeight: "500" }}>
                      Outcome
                    </span>
                  </div>
                </div>
              </div>

              {/* KPI Notes (Full Width) */}
              <div>
                <p style={{ fontSize: "10px", color: "#6B7280", marginBottom: "2px" }}>KPI Notes</p>
                <p style={{ fontSize: "11px", color: "#374151", lineHeight: "1.4" }}>
                  KPIs provide targets for teams to shoot for, milestones to gauge progress, and insights that help people across the organization make better decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "reviews" && (
        <div style={{
          backgroundColor: "#FFFFFF",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}>
          {/* Review Item #1 - Q4 2024 */}
          <div style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "12px",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#222", margin: "0 0 6px 0" }}>
                Q4 2024 - Quarterly Review
              </h3>
              <p style={{ fontSize: "14px", color: "#888", margin: "0" }}>
                Due: 2024-12-20
              </p>
            </div>
            <button style={{
              backgroundColor: "#1A73E8",
              color: "#FFFFFF",
              padding: "8px 14px",
              borderRadius: "6px",
              fontSize: "14px",
              border: "none",
              cursor: "pointer",
              fontWeight: "500"
            }}>
              Start Review
            </button>
          </div>

          {/* Review Item #2 - Q3 2024 */}
          <div style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "12px",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#222", margin: "0" }}>
                  Q3 2024 - Quarterly Review
                </h3>
                <span style={{
                  backgroundColor: "#D1F7D9",
                  color: "#2E7D32",
                  padding: "4px 10px",
                  borderRadius: "50px",
                  fontSize: "13px",
                  fontWeight: "500"
                }}>
                  completed
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
                <span style={{ color: "#666", fontWeight: "500" }}>Overall Rating:</span>
                <span style={{ color: "#F4B400", fontSize: "16px" }}>⭐⭐⭐⭐☆</span>
                <span style={{ color: "#222", fontWeight: "600" }}>4.2</span>
              </div>

              <div style={{ fontSize: "14px", color: "#666" }}>
                <p style={{ margin: "0 0 4px 0" }}>Manager Rating: 4.5</p>
                <p style={{ margin: "0 0 4px 0" }}>Self Rating: 4</p>
              </div>

              <p style={{ fontSize: "14px", color: "#666", margin: "0" }}>
                Completed: 2024-09-28
              </p>
            </div>

            <button style={{
              backgroundColor: "#FFFFFF",
              color: "#222",
              border: "1px solid #D0D0D0",
              padding: "8px 14px",
              borderRadius: "6px",
              fontSize: "14px",
              cursor: "pointer",
              fontWeight: "500"
            }}>
              View Details
            </button>
          </div>

          {/* Review Item #3 - Mid-Year 2024 */}
          <div style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "12px",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#222", margin: "0" }}>
                  Mid-Year 2024 - Mid-Year Review
                </h3>
                <span style={{
                  backgroundColor: "#D1F7D9",
                  color: "#2E7D32",
                  padding: "4px 10px",
                  borderRadius: "50px",
                  fontSize: "13px",
                  fontWeight: "500"
                }}>
                  completed
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
                <span style={{ color: "#666", fontWeight: "500" }}>Overall Rating:</span>
                <span style={{ color: "#F4B400", fontSize: "16px" }}>⭐⭐⭐⭐☆</span>
                <span style={{ color: "#222", fontWeight: "600" }}>4.0</span>
              </div>

              <div style={{ fontSize: "14px", color: "#666" }}>
                <p style={{ margin: "0 0 4px 0" }}>Manager Rating: 4.2</p>
                <p style={{ margin: "0 0 4px 0" }}>Self Rating: 3.8</p>
              </div>

              <p style={{ fontSize: "14px", color: "#666", margin: "0" }}>
                Completed: 2024-06-25
              </p>
            </div>

            <button style={{
              backgroundColor: "#FFFFFF",
              color: "#222",
              border: "1px solid #D0D0D0",
              padding: "8px 14px",
              borderRadius: "6px",
              fontSize: "14px",
              cursor: "pointer",
              fontWeight: "500"
            }}>
              View Details
            </button>
          </div>
        </div>
      )}

      {activeTab === "feedback" && (
        <div style={{ padding: "24px", backgroundColor: "#FFFFFF", borderRadius: "8px", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)" }}>
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Feedback</h3>
            <p className="text-sm text-gray-600">Feedback from colleagues and managers will appear here.</p>
          </div>
        </div>
      )}
    </Layout>
  );
}
