import { useState } from "react";
import { Upload, Plus, Search, Filter, FileText, Clock, CheckCircle, Download, Shield, Folder, Eye, Trash2, File } from "lucide-react";
import Layout from "@/components/Layout";

type TabType = "requests" | "documents" | "forms" | "archived";
type StatusType = "completed" | "in-progress" | "pending" | "rejected";
type PriorityType = "high" | "medium" | "low";

interface Request {
  id: number;
  title: string;
  status: StatusType;
  priority: PriorityType;
  description: string;
  requestedDate: string;
  completedDate?: string;
  deliveryMethod: string;
  note?: string;
}

interface Document {
  id: number;
  fileName: string;
  fileType: "pdf" | "jpg" | "doc";
  category: string;
  size: string;
  uploadedDate: string;
  isVerified: boolean;
  expiryDate?: string;
}

export default function DocumentRequests() {
  const [activeTab, setActiveTab] = useState<TabType>("requests");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const requests: Request[] = [
    {
      id: 1,
      title: "Leave Application Form",
      status: "completed",
      priority: "high",
      description: "Annual leave request for Q4",
      requestedDate: "Dec 1, 2024",
      completedDate: "Dec 3, 2024",
      deliveryMethod: "Email",
      note: "Document ready for pickup",
    },
    {
      id: 2,
      title: "Updated Work Certificate",
      status: "in-progress",
      priority: "medium",
      description: "Verification certificate with updated employment details",
      requestedDate: "Dec 5, 2024",
      deliveryMethod: "In-person",
    },
    {
      id: 3,
      title: "Salary Review Request",
      status: "pending",
      priority: "high",
      description: "Annual salary review documentation",
      requestedDate: "Dec 10, 2024",
      deliveryMethod: "Email",
    },
    {
      id: 4,
      title: "Training Certificate",
      status: "completed",
      priority: "low",
      description: "Professional development training completion",
      requestedDate: "Nov 20, 2024",
      completedDate: "Nov 28, 2024",
      deliveryMethod: "Email",
    },
  ];

  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: PriorityType) => {
    switch (priority) {
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRequests = requests.filter((request) => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All Status" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const documents: Document[] = [
    { id: 1, fileName: "Passport_Copy.pdf", fileType: "pdf", category: "Identity Documents", size: "2.4 MB", uploadedDate: "Nov 15, 2024", isVerified: true },
    { id: 2, fileName: "Aadhar_ID.jpg", fileType: "jpg", category: "Identity Documents", size: "1.8 MB", uploadedDate: "Nov 10, 2024", isVerified: true },
    { id: 3, fileName: "Medical_Report.pdf", fileType: "pdf", category: "Medical Records", size: "3.2 MB", uploadedDate: "Oct 20, 2024", isVerified: true, expiryDate: "Jan 15, 2025" },
    { id: 4, fileName: "Certification.pdf", fileType: "pdf", category: "Certifications", size: "1.5 MB", uploadedDate: "Sep 30, 2024", isVerified: true },
    { id: 5, fileName: "Insurance_Policy.doc", fileType: "doc", category: "Insurance", size: "2.1 MB", uploadedDate: "Aug 25, 2024", isVerified: false },
  ];

  const categories = [
    { name: "Identity Documents", count: 2 },
    { name: "Medical Records", count: 1 },
    { name: "Certifications", count: 1 },
    { name: "Insurance", count: 1 },
  ];

  const summaryStats = [
    { label: "Total Requests", value: requests.length, subtitle: "This year", icon: FileText, color: "text-blue-600" },
    { label: "Pending", value: requests.filter((r) => r.status === "pending").length, subtitle: "Awaiting processing", icon: Clock, color: "text-orange-600" },
    { label: "In Progress", value: requests.filter((r) => r.status === "in-progress").length, subtitle: "Being processed", icon: Clock, color: "text-blue-600" },
    { label: "Completed", value: requests.filter((r) => r.status === "completed").length, subtitle: "Ready for download", icon: CheckCircle, color: "text-green-600" },
  ];

  const docSummaryStats = [
    { label: "Total Documents", value: documents.length, subtitle: "Across all categories", icon: FileText, color: "text-blue-600" },
    { label: "Verified", value: documents.filter((d) => d.isVerified).length, subtitle: "HR verified documents", icon: Shield, color: "text-green-600", subtitleColor: "text-green-600" },
    { label: "Expiring Soon", value: documents.filter((d) => d.expiryDate).length, subtitle: "Within 90 days", icon: Clock, color: "text-orange-600", subtitleColor: "text-orange-600" },
  ];

  const getFileTypeColor = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return "text-red-500";
      case "jpg":
        return "text-blue-500";
      case "doc":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen p-4">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">Requests & Document Management</h1>
            <p className="text-xs text-gray-600">Submit requests and manage your work-related documents</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1.5 border border-gray-300 bg-white">
              <Upload className="w-3.5 h-3.5" />
              Upload Document
            </button>
            <button className="px-3 py-1.5 text-xs bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              New Request
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-2 mb-4">
          {[
            { id: "requests", label: "My Requests" },
            { id: "documents", label: "My Documents" },
            { id: "forms", label: "Forms & Templates" },
            { id: "archived", label: "Archived" },
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {summaryStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-600 mt-1">{stat.subtitle}</p>
                  </div>
                  <Icon className={`w-4 h-4 ${stat.color} flex-shrink-0`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter & Search Bar */}
        <div className="flex gap-3 mb-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            <option>All Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* More Filters Button */}
          <button className="px-3 py-1.5 text-xs text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1.5 border border-gray-300 bg-white">
            <Filter className="w-3.5 h-3.5" />
            More Filters
          </button>
        </div>

        {/* Requests List */}
        <div className="space-y-2">
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 hover:shadow-md transition-shadow">
              {/* Top Row: Title and Actions */}
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-blue-700 mb-1.5">{request.title}</h3>

                  {/* Status and Priority Badges */}
                  <div className="flex gap-1.5 mb-1.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${getStatusColor(request.status)}`}>
                      {request.status.replace("-", " ")}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${getPriorityColor(request.priority)}`}>
                      {request.priority}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 mb-1.5">{request.description}</p>

                  {/* Details Row */}
                  <p className="text-xs text-gray-600 mb-1.5">
                    Requested: {request.requestedDate}
                    {request.completedDate && ` • Completed: ${request.completedDate}`}
                    <br />
                    Delivery: {request.deliveryMethod}
                  </p>

                  {/* Note Bar */}
                  {request.note && (
                    <div className="bg-blue-50 rounded-lg p-1.5 mb-1.5">
                      <p className="text-xs text-blue-800">{request.note}</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-1.5 ml-3">
                  {request.status === "completed" ? (
                    <button className="px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 whitespace-nowrap">
                      <Download className="w-3 h-3" />
                      Download
                    </button>
                  ) : (
                    <button className="px-2.5 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap">
                      Edit
                    </button>
                  )}
                  <button className="px-2.5 py-1 text-xs text-gray-700 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
