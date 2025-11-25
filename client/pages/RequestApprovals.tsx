import { useState } from "react";
import { Upload, Download, AlertCircle, CheckCircle2, Clock, TrendingUp } from "lucide-react";
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

interface Request {
  id: string;
  requesterName: string;
  type: string;
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in-progress" | "escalated" | "completed" | "rejected" | "approved";
  description: string;
  requestedDate: string;
  dueDate?: string;
}

const requests: Request[] = [
  {
    id: "1",
    requesterName: "Mike Chen",
    type: "Certificate of Employment",
    category: "hr",
    priority: "high",
    status: "pending",
    description: "Certificate of employment needed for visa application",
    requestedDate: "2024-12-10",
    dueDate: "2024-12-15",
  },
  {
    id: "2",
    requesterName: "Lisa Park",
    type: "Laptop Replacement",
    category: "it",
    priority: "medium",
    status: "in-progress",
    description: "Current laptop having performance issues, need replacement",
    requestedDate: "2024-12-08",
    dueDate: "2024-12-12",
  },
  {
    id: "3",
    requesterName: "Alex Kim",
    type: "Expense Reimbursement",
    category: "finance",
    priority: "low",
    status: "approved",
    description: "Conference travel expenses reimbursement",
    requestedDate: "2024-12-05",
  },
  {
    id: "4",
    requesterName: "Emma Wilson",
    type: "Office Space Change",
    category: "facilities",
    priority: "medium",
    status: "escalated",
    description: "Request for desk relocation due to noise issues",
    requestedDate: "2024-12-01",
  },
  {
    id: "5",
    requesterName: "Mike Chen",
    type: "Training Budget Approval",
    category: "hr",
    priority: "low",
    status: "rejected",
    description: "AWS certification training course approval",
    requestedDate: "2024-11-28",
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-800";
    case "high":
      return "bg-orange-100 text-orange-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
    case "approved":
      return "bg-green-100 text-green-800";
    case "in-progress":
      return "bg-blue-100 text-blue-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "escalated":
      return "bg-red-100 text-red-800";
    case "rejected":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "hr":
      return "bg-blue-100 text-blue-800";
    case "it":
      return "bg-purple-100 text-purple-800";
    case "finance":
      return "bg-green-100 text-green-800";
    case "facilities":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "in-progress":
      return "In Progress";
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

export default function RequestApprovals() {
  const [activeTab, setActiveTab] = useState("pending-approval");

  const tabs = [
    { id: "pending-approval", label: "Pending Approval" },
    { id: "all-requests", label: "All Requests" },
    { id: "document-library", label: "Document Library" },
    { id: "escalation-management", label: "Escalation Management" },
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
                  Request Management
                </h1>
                <p className="text-xs text-gray-600">
                  Review, approve, and manage team requests
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" className="gap-2 h-8 text-sm px-3">
                  <Upload className="w-4 h-4" />
                  Upload Document
                </Button>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700 h-8 text-sm px-3">
                  <Download className="w-4 h-4" />
                  Export Reports
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-4 gap-3 mb-5">
            <MetricCard
              icon={AlertCircle}
              title="Pending Requests"
              value="1"
              subtitle="Awaiting your action"
              valueColor="text-orange-600"
            />
            <MetricCard
              icon={Clock}
              title="In Progress"
              value="1"
              subtitle="Being processed"
              valueColor="text-blue-600"
            />
            <MetricCard
              icon={AlertCircle}
              title="Escalated"
              value="1"
              subtitle="Need higher approval"
              valueColor="text-red-600"
            />
            <MetricCard
              icon={CheckCircle2}
              title="Completed This Month"
              value="2"
              subtitle="85% approval rate"
              valueColor="text-green-600"
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

          {/* Pending Approval Tab */}
          {activeTab === "pending-approval" && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  Requests Awaiting Your Approval
                </h2>
                <p className="text-xs text-gray-500">
                  Review and take action on pending requests
                </p>
              </div>

              {requests
                .filter((req) => req.status === "pending" || req.status === "escalated")
                .map((request) => (
                  <div
                    key={request.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-3">
                          <h3 className="font-semibold text-sm text-gray-900 mb-1">
                            {request.requesterName}
                          </h3>
                          <p className="text-xs text-gray-600 mb-2">
                            {request.type}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                              {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                            </span>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                              {getStatusLabel(request.status)}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 mb-2">
                          From: {request.requesterName}
                        </p>
                        <p className="text-xs text-gray-600 mb-3">
                          {request.description}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <span>Requested: {request.requestedDate}</span>
                          <span>Due: {request.dueDate}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <Button className="h-8 text-xs px-3 bg-green-600 hover:bg-green-700 text-white">
                          Approve
                        </Button>
                        <Button variant="outline" className="h-8 text-xs px-3">
                          Reject
                        </Button>
                        <Button variant="outline" className="h-8 text-xs px-3">
                          Escalate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* All Requests Tab */}
          {activeTab === "all-requests" && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  All Requests
                </h2>
                <p className="text-xs text-gray-500">
                  View all submitted requests
                </p>
              </div>

              {requests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2">
                        <h3 className="font-semibold text-sm text-gray-900">
                          {request.requesterName}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {request.type}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                          {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                        </span>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {getStatusLabel(request.status)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        {request.description}
                      </p>
                    </div>
                    <div className="text-right text-xs text-gray-600 ml-4">
                      <p>Requested: {request.requestedDate}</p>
                      <p>Due: {request.dueDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Document Library Tab */}
          {activeTab === "document-library" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Document Library
              </h2>
              <p className="text-xs text-gray-600">
                Manage and store all request documents
              </p>
            </div>
          )}

          {/* Escalation Management Tab */}
          {activeTab === "escalation-management" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Escalation Management
              </h2>
              <p className="text-xs text-gray-600">
                Track and manage escalated requests
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
