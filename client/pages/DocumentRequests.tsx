import { useState } from "react";
import {
  Upload,
  Plus,
  Search,
  Filter,
  FileText,
  Clock,
  CheckCircle,
  Download,
  Shield,
  Folder,
  Eye,
  Trash2,
  File,
  X,
  MoreVertical,
} from "lucide-react";
import Layout from "@/components/Layout";

type TabType = "requests" | "documents";
type StatusType = "completed" | "in-progress" | "pending" | "rejected";
type PriorityType = "high" | "medium" | "low";
type ModalType = "upload" | "newRequest" | "moreFilters" | null;

interface Request {
  id: string;
  requestType: string;
  requestTitle: string;
  submittedDate: string;
  status: string;
  approver: string;
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
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [actionDropdown, setActionDropdown] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null,
  );
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "info";
  } | null>(null);

  // Form states
  const [uploadForm, setUploadForm] = useState({
    fileName: "",
    category: "",
    file: null as File | null,
  });
  const [newRequestForm, setNewRequestForm] = useState({
    requestType: "",
    requestTo: "",
    title: "",
    description: "",
    priority: "medium",
    deliveryMethod: "Email",
  });
  const [filterPanel, setFilterPanel] = useState({
    status: "All",
    priority: "All Priorities",
  });

  const showNotification = (
    message: string,
    type: "success" | "info" = "success",
  ) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUploadDocument = () => {
    if (uploadForm.fileName && uploadForm.category) {
      showNotification("Document uploaded successfully", "success");
      setUploadForm({ fileName: "", category: "", file: null });
      setActiveModal(null);
    } else {
      showNotification("Please fill in all required fields", "info");
    }
  };

  const handleNewRequest = () => {
    if (newRequestForm.title && newRequestForm.description) {
      showNotification("Request submitted successfully", "success");
      setNewRequestForm({
        requestType: "",
        requestTo: "",
        title: "",
        description: "",
        priority: "medium",
        deliveryMethod: "Email",
      });
      setActiveModal(null);
    } else {
      showNotification("Please fill in all required fields", "info");
    }
  };

  const handleViewRequest = (request: Request) => {
    showNotification(`Viewing request: ${request.id}`, "info");
  };

  const handleCancelRequest = (request: Request) => {
    showNotification(`Request ${request.id} cancelled`, "success");
  };

  const handleViewDocument = (doc: Document) => {
    setSelectedDocument(doc);
    showNotification(`Opening: ${doc.fileName}`, "info");
  };

  const handleDownloadDocument = (doc: Document) => {
    showNotification(`Downloading: ${doc.fileName}`, "success");
  };

  const handleDeleteDocument = (docId: number) => {
    showNotification("Document deleted successfully", "success");
  };

  const handlePreviewForm = (formTitle: string) => {
    showNotification(`Previewing: ${formTitle}`, "info");
  };

  const handleDownloadForm = (formTitle: string) => {
    showNotification(`Downloading: ${formTitle}`, "success");
  };

  const handleApplyFilters = () => {
    setStatusFilter(filterPanel.status);
    showNotification("Filters applied", "success");
    setActiveModal(null);
  };

  const requests: Request[] = [
    {
      id: "REQ-2025-1234",
      requestType: "Leave",
      requestTitle: "Annual Leave Request",
      submittedDate: "01/15/2025",
      status: "Pending",
      approver: "A. Smith",
    },
    {
      id: "REQ-2025-1235",
      requestType: "Schedule Change",
      requestTitle: "Shift Swap Request",
      submittedDate: "01/12/2025",
      status: "Approved",
      approver: "A. Johnson",
    },
    {
      id: "REQ-2025-1236",
      requestType: "HR Inquiry",
      requestTitle: "Benefits Information",
      submittedDate: "01/10/2025",
      status: "In Review",
      approver: "A. Brown",
    },
    {
      id: "REQ-2025-1237",
      requestType: "Overtime",
      requestTitle: "Weekend Overtime Approval",
      submittedDate: "01/08/2025",
      status: "Rejected",
      approver: "A. Smith",
    },
    {
      id: "REQ-2025-1238",
      requestType: "Leave",
      requestTitle: "Sick Leave Request",
      submittedDate: "01/05/2025",
      status: "Approved",
      approver: "A. Johnson",
    },
    {
      id: "REQ-2025-1239",
      requestType: "HR Inquiry",
      requestTitle: "Payroll Question",
      submittedDate: "01/03/2025",
      status: "Pending",
      approver: "A. Brown",
    },
    {
      id: "REQ-2025-1240",
      requestType: "Schedule Change",
      requestTitle: "Work From Home Request",
      submittedDate: "12/28/2024",
      status: "Approved",
      approver: "A. Smith",
    },
    {
      id: "REQ-2025-1241",
      requestType: "Overtime",
      requestTitle: "Project Overtime Authorization",
      submittedDate: "12/22/2024",
      status: "In Review",
      approver: "A. Johnson",
    },
    {
      id: "REQ-2025-1242",
      requestType: "Leave",
      requestTitle: "Vacation Leave",
      submittedDate: "12/18/2024",
      status: "Approved",
      approver: "A. Brown",
    },
    {
      id: "REQ-2025-1243",
      requestType: "HR Inquiry",
      requestTitle: "Policy Clarification",
      submittedDate: "12/15/2024",
      status: "Rejected",
      approver: "A. Smith",
    },
    {
      id: "REQ-2025-1244",
      requestType: "Schedule Change",
      requestTitle: "Early Departure Request",
      submittedDate: "12/10/2024",
      status: "In Review",
      approver: "A. Johnson",
    },
    {
      id: "REQ-2025-1245",
      requestType: "Overtime",
      requestTitle: "Emergency Coverage",
      submittedDate: "12/05/2024",
      status: "Approved",
      approver: "A. Brown",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "In Review":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-orange-100 text-orange-800";
      case "Rejected":
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
    const matchesStatus =
      statusFilter === "All" || request.status === statusFilter;
    return matchesStatus;
  });

  const documents: Document[] = [
    {
      id: 1,
      fileName: "Passport_Copy.pdf",
      fileType: "pdf",
      category: "Identity Documents",
      size: "2.4 MB",
      uploadedDate: "Nov 15, 2024",
      isVerified: true,
    },
    {
      id: 2,
      fileName: "Aadhar_ID.jpg",
      fileType: "jpg",
      category: "Identity Documents",
      size: "1.8 MB",
      uploadedDate: "Nov 10, 2024",
      isVerified: true,
    },
    {
      id: 3,
      fileName: "Medical_Report.pdf",
      fileType: "pdf",
      category: "Medical Records",
      size: "3.2 MB",
      uploadedDate: "Oct 20, 2024",
      isVerified: true,
      expiryDate: "Jan 15, 2025",
    },
    {
      id: 4,
      fileName: "Certification.pdf",
      fileType: "pdf",
      category: "Certifications",
      size: "1.5 MB",
      uploadedDate: "Sep 30, 2024",
      isVerified: true,
    },
    {
      id: 5,
      fileName: "Insurance_Policy.doc",
      fileType: "doc",
      category: "Insurance",
      size: "2.1 MB",
      uploadedDate: "Aug 25, 2024",
      isVerified: false,
    },
  ];

  const categories = [
    { name: "Identity Documents", count: 2 },
    { name: "Medical Records", count: 1 },
    { name: "Certifications", count: 1 },
    { name: "Insurance", count: 1 },
  ];

  const forms = [
    {
      id: 1,
      title: "Leave Application Form",
      description: "Standard form for requesting time off",
      category: "HR Forms",
      downloads: 156,
      updatedDate: "2024-11-01",
    },
    {
      id: 2,
      title: "Expense Reimbursement Form",
      description: "Form for submitting business expense claims",
      category: "Finance Forms",
      downloads: 89,
      updatedDate: "2024-10-15",
    },
    {
      id: 3,
      title: "IT Support Request Form",
      description: "Form for requesting technical support",
      category: "IT Forms",
      downloads: 234,
      updatedDate: "2024-12-01",
    },
    {
      id: 4,
      title: "Training Request Form",
      description: "Request form for professional development training",
      category: "HR Forms",
      downloads: 67,
      updatedDate: "2024-09-20",
    },
    {
      id: 5,
      title: "Overtime Authorization Form",
      description: "Form to request overtime work approval",
      category: "HR Forms",
      downloads: 112,
      updatedDate: "2024-11-10",
    },
  ];

  const formCategories = [
    {
      name: "HR Forms",
      subtitle: "Employee-related forms",
      bgColor: "#DCFCE7",
      iconBg: "#DCFCE7",
    },
    {
      name: "Finance Forms",
      subtitle: "Expense and payment forms",
      bgColor: "#E0ECFF",
      iconBg: "#E0ECFF",
    },
    {
      name: "IT Forms",
      subtitle: "Technology support forms",
      bgColor: "#F3E8FF",
      iconBg: "#F3E8FF",
    },
  ];

  const summaryStats = [
    {
      label: "Total Requests",
      value: requests.length,
      subtitle: "This year",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      label: "Pending",
      value: requests.filter((r) => r.status === "Pending").length,
      subtitle: "Awaiting processing",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      label: "In Review",
      value: requests.filter((r) => r.status === "In Review").length,
      subtitle: "Being reviewed",
      icon: Clock,
      color: "text-blue-600",
    },
    {
      label: "Approved",
      value: requests.filter((r) => r.status === "Approved").length,
      subtitle: "Approved requests",
      icon: CheckCircle,
      color: "text-green-600",
    },
  ];

  const docSummaryStats = [
    {
      label: "Total Documents",
      value: documents.length,
      subtitle: "Across all categories",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      label: "Verified",
      value: documents.filter((d) => d.isVerified).length,
      subtitle: "HR verified documents",
      icon: Shield,
      color: "text-green-600",
      subtitleColor: "text-green-600",
    },
    {
      label: "Expiring Soon",
      value: documents.filter((d) => d.expiryDate).length,
      subtitle: "Within 90 days",
      icon: Clock,
      color: "text-orange-600",
      subtitleColor: "text-orange-600",
    },
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
      {/* Header Section */}
      <div className="mb-1.5 sm:mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
        <div>
          <h1 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5">
            My Requests & Documents
          </h1>
          <p className="text-xs text-gray-600">
            View, track, and manage your personal requests and documents.
          </p>
        </div>
        {activeTab === "requests" && (
          <div className="flex gap-1 sm:gap-2 flex-wrap">
            <button
              onClick={() => setActiveModal("newRequest")}
              className="px-3 py-1.5 text-xs bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              New Request
            </button>
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mb-2 sm:mb-3 bg-white">
        <div className="flex gap-0 px-2 sm:px-3">
          {[
            { id: "requests", label: "My Requests" },
            { id: "documents", label: "My Documents" },
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

      {/* Filter & Search Bar */}
      {activeTab !== "documents" && (
        <div className="flex gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
          {/* Request Type Filter */}
          <select className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700">
            <option>All</option>
            <option>Leave</option>
            <option>Schedule Change</option>
            <option>HR Inquiry</option>
            <option>Overtime</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            <option>All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="In Review">In Review</option>
            <option value="Rejected">Rejected</option>
          </select>

          {/* Date Range Filter */}
          <input
            type="date"
            className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            placeholder="mm/dd/yyyy"
          />
        </div>
      )}

      {/* ===== MY REQUESTS TAB ===== */}
      {activeTab === "requests" && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
          {filteredRequests.length > 0 ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap">
                    Request ID
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap">
                    Request Type
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap">
                    Request Title
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap">
                    Submitted Date
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap">
                    Approver
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-xs text-gray-900">
                      {request.id}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700">
                      {request.requestType}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-900">
                      {request.requestTitle}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">
                      {request.submittedDate}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(request.status)}`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700">
                      {request.approver}
                    </td>
                    <td className="px-4 py-3 text-xs text-center">
                      <div className="relative inline-block">
                        <button
                          onClick={() =>
                            setActionDropdown(
                              actionDropdown === request.id ? null : request.id,
                            )
                          }
                          className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors p-1.5 rounded"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {actionDropdown === request.id && (
                          <div className="absolute right-0 mt-1 bg-white rounded-lg border border-gray-200 shadow-lg z-10 min-w-[120px]">
                            <button
                              onClick={() => {
                                handleViewRequest(request);
                                setActionDropdown(null);
                              }}
                              className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-medium border-b border-gray-100"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              View
                            </button>
                            <button
                              onClick={() => {
                                handleCancelRequest(request);
                                setActionDropdown(null);
                              }}
                              className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                            >
                              <X className="w-3.5 h-3.5" />
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No requests found.</p>
            </div>
          )}
        </div>
      )}

      {/* ===== MY DOCUMENTS TAB ===== */}
      {activeTab === "documents" && (
        <div className="space-y-4">
          {/* Filter & Action Bar */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              {/* Left Side: Search and Filter */}
              <div className="flex gap-3 flex-wrap flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  />
                </div>
                <select className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500">
                  <option>Category</option>
                  <option>Payslips</option>
                  <option>Contracts</option>
                  <option>Identification</option>
                  <option>Certificates</option>
                </select>
              </div>

              {/* Right Side: Upload and Download */}
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => setActiveModal("upload")}
                  className="px-4 py-2 text-sm bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Upload Document
                </button>
                <button className="px-4 py-2 text-sm bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          </div>

          {/* Documents Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                    File Name
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                    Category
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                    Upload Date
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                    Uploaded By
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Payslip_Jan2025.pdf
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">Payslips</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    mm-dd-yyyy
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">—</td>
                  <td className="px-4 py-3 text-sm text-center">
                    <div className="relative inline-block">
                      <button
                        onClick={() =>
                          setActionDropdown(
                            actionDropdown === "doc-1" ? null : "doc-1",
                          )
                        }
                        className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors p-1.5 rounded"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {actionDropdown === "doc-1" && (
                        <div className="absolute right-0 mt-1 bg-white rounded-lg border border-gray-200 shadow-lg z-10 min-w-[120px]">
                          <button
                            onClick={() => {
                              showNotification(
                                "Viewing: Payslip_Jan2025.pdf",
                                "info",
                              );
                              setActionDropdown(null);
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-medium border-b border-gray-100"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </button>
                          <button
                            onClick={() => {
                              showNotification("Document deleted", "success");
                              setActionDropdown(null);
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Employment_Contract.pdf
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">Contracts</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    mm-dd-yyyy
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">—</td>
                  <td className="px-4 py-3 text-sm text-center">
                    <div className="relative inline-block">
                      <button
                        onClick={() =>
                          setActionDropdown(
                            actionDropdown === "doc-2" ? null : "doc-2",
                          )
                        }
                        className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors p-1.5 rounded"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {actionDropdown === "doc-2" && (
                        <div className="absolute right-0 mt-1 bg-white rounded-lg border border-gray-200 shadow-lg z-10 min-w-[120px]">
                          <button
                            onClick={() => {
                              showNotification(
                                "Viewing: Employment_Contract.pdf",
                                "info",
                              );
                              setActionDropdown(null);
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-medium border-b border-gray-100"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </button>
                          <button
                            onClick={() => {
                              showNotification("Document deleted", "success");
                              setActionDropdown(null);
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Passport.pdf
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Identification
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    mm-dd-yyyy
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">—</td>
                  <td className="px-4 py-3 text-sm text-center">
                    <div className="relative inline-block">
                      <button
                        onClick={() =>
                          setActionDropdown(
                            actionDropdown === "doc-3" ? null : "doc-3",
                          )
                        }
                        className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors p-1.5 rounded"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {actionDropdown === "doc-3" && (
                        <div className="absolute right-0 mt-1 bg-white rounded-lg border border-gray-200 shadow-lg z-10 min-w-[120px]">
                          <button
                            onClick={() => {
                              showNotification("Viewing: Passport.pdf", "info");
                              setActionDropdown(null);
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-medium border-b border-gray-100"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </button>
                          <button
                            onClick={() => {
                              showNotification("Document deleted", "success");
                              setActionDropdown(null);
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Training_Certificate.pdf
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Certificates
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    mm-dd-yyyy
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">��</td>
                  <td className="px-4 py-3 text-sm text-center">
                    <div className="relative inline-block">
                      <button
                        onClick={() =>
                          setActionDropdown(
                            actionDropdown === "doc-4" ? null : "doc-4",
                          )
                        }
                        className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors p-1.5 rounded"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {actionDropdown === "doc-4" && (
                        <div className="absolute right-0 mt-1 bg-white rounded-lg border border-gray-200 shadow-lg z-10 min-w-[120px]">
                          <button
                            onClick={() => {
                              showNotification(
                                "Viewing: Training_Certificate.pdf",
                                "info",
                              );
                              setActionDropdown(null);
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-medium border-b border-gray-100"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </button>
                          <button
                            onClick={() => {
                              showNotification("Document deleted", "success");
                              setActionDropdown(null);
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>

                {/* Row 5 */}
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Work_Permit.pdf
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Identification
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    mm-dd-yyyy
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">—</td>
                  <td className="px-4 py-3 text-sm text-center">
                    <div className="relative inline-block">
                      <button
                        onClick={() =>
                          setActionDropdown(
                            actionDropdown === "doc-5" ? null : "doc-5",
                          )
                        }
                        className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors p-1.5 rounded"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {actionDropdown === "doc-5" && (
                        <div className="absolute right-0 mt-1 bg-white rounded-lg border border-gray-200 shadow-lg z-10 min-w-[120px]">
                          <button
                            onClick={() => {
                              showNotification(
                                "Viewing: Work_Permit.pdf",
                                "info",
                              );
                              setActionDropdown(null);
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-medium border-b border-gray-100"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </button>
                          <button
                            onClick={() => {
                              showNotification("Document deleted", "success");
                              setActionDropdown(null);
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 px-4 py-3 rounded-lg text-white text-sm font-medium z-50 ${
            notification.type === "success" ? "bg-green-500" : "bg-blue-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Upload Document Modal */}
      {activeModal === "upload" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Upload Document
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  File Name
                </label>
                <input
                  type="text"
                  value={uploadForm.fileName}
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, fileName: e.target.value })
                  }
                  placeholder="e.g., My_Document.pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={uploadForm.category}
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  <option value="Identity Documents">Identity Documents</option>
                  <option value="Medical Records">Medical Records</option>
                  <option value="Certifications">Certifications</option>
                  <option value="Insurance">Insurance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <input type="file" className="hidden" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setActiveModal(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadDocument}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Request Modal */}
      {activeModal === "newRequest" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                New Request
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Request Type
                </label>
                <select
                  value={newRequestForm.requestType}
                  onChange={(e) =>
                    setNewRequestForm({
                      ...newRequestForm,
                      requestType: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select request type</option>
                  <option value="Leave">Leave</option>
                  <option value="Schedule Change">Schedule Change</option>
                  <option value="HR Inquiry">HR Inquiry</option>
                  <option value="Overtime">Overtime</option>
                  <option value="Document Request">Document Request</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Request To
                </label>
                <select
                  value={newRequestForm.requestTo}
                  onChange={(e) =>
                    setNewRequestForm({
                      ...newRequestForm,
                      requestTo: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select recipient</option>
                  <option value="A. Smith">A. Smith</option>
                  <option value="A. Johnson">A. Johnson</option>
                  <option value="A. Brown">A. Brown</option>
                  <option value="HR Department">HR Department</option>
                  <option value="Finance Department">Finance Department</option>
                  <option value="IT Department">IT Department</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Request Title
                </label>
                <input
                  type="text"
                  value={newRequestForm.title}
                  onChange={(e) =>
                    setNewRequestForm({
                      ...newRequestForm,
                      title: e.target.value,
                    })
                  }
                  placeholder="e.g., Work Certificate"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newRequestForm.description}
                  onChange={(e) =>
                    setNewRequestForm({
                      ...newRequestForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe what you need..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={newRequestForm.priority}
                    onChange={(e) =>
                      setNewRequestForm({
                        ...newRequestForm,
                        priority: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery
                  </label>
                  <select
                    value={newRequestForm.deliveryMethod}
                    onChange={(e) =>
                      setNewRequestForm({
                        ...newRequestForm,
                        deliveryMethod: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Email">Email</option>
                    <option value="In-person">In-person</option>
                    <option value="Portal">Portal</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setActiveModal(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNewRequest}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* More Filters Modal */}
      {activeModal === "moreFilters" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Advanced Filters
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="space-y-2">
                  {["All", "Pending", "Approved", "In Review", "Rejected"].map(
                    (status) => (
                      <label key={status} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="status"
                          value={status}
                          checked={filterPanel.status === status}
                          onChange={(e) =>
                            setFilterPanel({
                              ...filterPanel,
                              status: e.target.value,
                            })
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">{status}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <div className="space-y-2">
                  {["All Priorities", "high", "medium", "low"].map(
                    (priority) => (
                      <label key={priority} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="priority"
                          value={priority}
                          checked={filterPanel.priority === priority}
                          onChange={(e) =>
                            setFilterPanel({
                              ...filterPanel,
                              priority: e.target.value,
                            })
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-700 capitalize">
                          {priority}
                        </span>
                      </label>
                    ),
                  )}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setActiveModal(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
