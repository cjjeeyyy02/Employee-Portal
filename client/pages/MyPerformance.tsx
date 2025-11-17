import { useState } from "react";
import Layout from "@/components/Layout";

export default function MyPerformance() {
  return (
    <Layout>
      {/* Header Section */}
      <div className="mb-4">
        <h1 className="text-base font-semibold text-gray-900 mb-0.5">Performance Management</h1>
        <p className="text-xs text-gray-600">Track your goals, reviews, and professional development</p>
      </div>

      {/* Main Container */}
      <div className="flex flex-col gap-6" style={{ padding: "24px", backgroundColor: "#FFFFFF", borderRadius: "12px", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)" }}>
        
        {/* Goal Block 1 */}
        <div className="flex flex-col gap-5">
          {/* Section Title */}
          <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#1A73E8", marginBottom: "12px" }}>
            Goal Details
          </h2>

          {/* Goal Card */}
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "8px", padding: "20px", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)", display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Goal Header Row */}
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Goal Title</p>
                <p className="text-sm font-semibold text-gray-900">Increase Quarterly Active Users (QAU) by 25%</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span style={{ backgroundColor: "#FDE7E9", color: "#C62828", padding: "4px 10px", borderRadius: "9999px", fontSize: "12px", fontWeight: "600" }}>
                  High
                </span>
                <div className="text-right">
                  <p className="text-xs text-gray-600">Due Date</p>
                  <p className="text-sm font-semibold text-gray-900">12-31-2025</p>
                </div>
              </div>
            </div>

            {/* Goal Description */}
            <div>
              <p className="text-xs text-gray-600 mb-1">Description</p>
              <p className="text-sm text-gray-700" style={{ lineHeight: "1.5" }}>
                This strategic goal aims to significantly boost the user base's engagement and retention rates by focusing on improving the onboarding flow and launching three new premium features. Success will be measured by the QAU metric at the end of the quarter.
              </p>
            </div>

            {/* Goal Progress Bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-medium text-gray-700">Goal Progress</p>
                <p className="text-xs font-semibold text-gray-900">60% Complete</p>
              </div>
              <div style={{ width: "100%", height: "8px", backgroundColor: "#E0E0E0", borderRadius: "9999px", overflow: "hidden" }}>
                <div style={{ width: "60%", height: "8px", backgroundColor: "#3D5AFE", borderRadius: "9999px" }}></div>
              </div>
            </div>
          </div>

          {/* KPI Card Section */}
          <div style={{ backgroundColor: "#FFFBEA", borderRadius: "8px", padding: "18px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* KPI Title Row */}
            <h3 className="text-sm font-semibold text-gray-900">Key Performance Indicator (KPI)</h3>

            {/* KPI Title */}
            <div>
              <p className="text-xs text-gray-600 mb-1">KPI Title</p>
              <p className="text-sm font-medium text-gray-900">Monthly Active User (MAU) Growth</p>
            </div>

            {/* KPI Target */}
            <div>
              <p className="text-xs text-gray-600 mb-1">KPI Target</p>
              <p className="text-sm font-bold" style={{ color: "#1DB954" }}>25% (Growth)</p>
            </div>

            {/* KPI Unit Type */}
            <div>
              <p className="text-xs text-gray-600 mb-1">KPI Unit Type</p>
              <p className="text-sm font-medium text-gray-900">Percentage (%)</p>
            </div>

            {/* KPI Tags */}
            <div>
              <p className="text-xs text-gray-600 mb-2">KPI Tags</p>
              <div className="flex gap-2 flex-wrap">
                <span style={{ backgroundColor: "#E3F2FD", color: "#1E88E5", padding: "4px 12px", borderRadius: "9999px", fontSize: "12px", fontWeight: "500" }}>
                  Lagging & Quantitative
                </span>
                <span style={{ backgroundColor: "#E8F5E9", color: "#43A047", padding: "4px 12px", borderRadius: "9999px", fontSize: "12px", fontWeight: "500" }}>
                  Outcome
                </span>
              </div>
            </div>

            {/* KPI Notes */}
            <div>
              <p className="text-xs text-gray-600 mb-1">KPI Notes</p>
              <p className="text-sm text-gray-700" style={{ lineHeight: "1.5" }}>
                KPIs provide targets for teams to shoot for, milestones to gauge progress, and insights that help people across the organization make better decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Goal Block 2 (Duplicate) */}
        <div className="flex flex-col gap-5">
          {/* Section Title */}
          <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#1A73E8", marginBottom: "12px" }}>
            Goal Details
          </h2>

          {/* Goal Card */}
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "8px", padding: "20px", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)", display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Goal Header Row */}
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Goal Title</p>
                <p className="text-sm font-semibold text-gray-900">Increase Quarterly Active Users (QAU) by 25%</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span style={{ backgroundColor: "#FDE7E9", color: "#C62828", padding: "4px 10px", borderRadius: "9999px", fontSize: "12px", fontWeight: "600" }}>
                  High
                </span>
                <div className="text-right">
                  <p className="text-xs text-gray-600">Due Date</p>
                  <p className="text-sm font-semibold text-gray-900">12-31-2025</p>
                </div>
              </div>
            </div>

            {/* Goal Description */}
            <div>
              <p className="text-xs text-gray-600 mb-1">Description</p>
              <p className="text-sm text-gray-700" style={{ lineHeight: "1.5" }}>
                This strategic goal aims to significantly boost the user base's engagement and retention rates by focusing on improving the onboarding flow and launching three new premium features. Success will be measured by the QAU metric at the end of the quarter.
              </p>
            </div>

            {/* Goal Progress Bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-medium text-gray-700">Goal Progress</p>
                <p className="text-xs font-semibold text-gray-900">60% Complete</p>
              </div>
              <div style={{ width: "100%", height: "8px", backgroundColor: "#E0E0E0", borderRadius: "9999px", overflow: "hidden" }}>
                <div style={{ width: "60%", height: "8px", backgroundColor: "#3D5AFE", borderRadius: "9999px" }}></div>
              </div>
            </div>
          </div>

          {/* KPI Card Section */}
          <div style={{ backgroundColor: "#FFFBEA", borderRadius: "8px", padding: "18px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* KPI Title Row */}
            <h3 className="text-sm font-semibold text-gray-900">Key Performance Indicator (KPI)</h3>

            {/* KPI Title */}
            <div>
              <p className="text-xs text-gray-600 mb-1">KPI Title</p>
              <p className="text-sm font-medium text-gray-900">Monthly Active User (MAU) Growth</p>
            </div>

            {/* KPI Target */}
            <div>
              <p className="text-xs text-gray-600 mb-1">KPI Target</p>
              <p className="text-sm font-bold" style={{ color: "#1DB954" }}>25% (Growth)</p>
            </div>

            {/* KPI Unit Type */}
            <div>
              <p className="text-xs text-gray-600 mb-1">KPI Unit Type</p>
              <p className="text-sm font-medium text-gray-900">Percentage (%)</p>
            </div>

            {/* KPI Tags */}
            <div>
              <p className="text-xs text-gray-600 mb-2">KPI Tags</p>
              <div className="flex gap-2 flex-wrap">
                <span style={{ backgroundColor: "#E3F2FD", color: "#1E88E5", padding: "4px 12px", borderRadius: "9999px", fontSize: "12px", fontWeight: "500" }}>
                  Lagging & Quantitative
                </span>
                <span style={{ backgroundColor: "#E8F5E9", color: "#43A047", padding: "4px 12px", borderRadius: "9999px", fontSize: "12px", fontWeight: "500" }}>
                  Outcome
                </span>
              </div>
            </div>

            {/* KPI Notes */}
            <div>
              <p className="text-xs text-gray-600 mb-1">KPI Notes</p>
              <p className="text-sm text-gray-700" style={{ lineHeight: "1.5" }}>
                KPIs provide targets for teams to shoot for, milestones to gauge progress, and insights that help people across the organization make better decisions.
              </p>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
