import { useState } from "react";
import { Upload, Plus, Search, Filter, FileText, Clock, CheckCircle, Download, Shield, Folder, Eye, Trash2, File, X } from "lucide-react";
import Layout from "@/components/Layout";

type TabType = "requests" | "documents";
type StatusType = "completed" | "in-progress" | "pending" | "rejected";
type PriorityType = "high" | "medium" | "low";
type ModalType = "upload" | "newRequest" | "moreFilters" | "details" | "preview" | null;

interface Request {
  id: string;
  requestType: string;
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
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Form states
  const [uploadForm, setUploadForm] = useState({ fileName: '', category: '', file: null as File | null });
  const [newRequestForm, setNewRequestForm] = useState({ title: '', description: '', priority: 'medium', deliveryMethod: 'Email' });
  const [filterPanel, setFilterPanel] = useState({ status: 'All Status', priority: 'All Priorities' });

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUploadDocument = () => {
    if (uploadForm.fileName && uploadForm.category) {
      showNotification('Document uploaded successfully', 'success');
      setUploadForm({ fileName: '', category: '', file: null });
      setActiveModal(null);
    } else {
      showNotification('Please fill in all required fields', 'info');
    }
  };

  const handleNewRequest = () => {
    if (newRequestForm.title && newRequestForm.description) {
      showNotification('Request submitted successfully', 'success');
      setNewRequestForm({ title: '', description: '', priority: 'medium', deliveryMethod: 'Email' });
      setActiveModal(null);
    } else {
      showNotification('Please fill in all required fields', 'info');
    }
  };

  const handleDownloadRequest = (request: Request) => {
    showNotification(`Downloading: ${request.title}`, 'success');
  };

  const handleEditRequest = (request: Request) => {
    setSelectedRequest(request);
    setActiveModal('details');
  };

  const handleViewDetails = (request: Request) => {
    setSelectedRequest(request);
    setActiveModal('details');
  };

  const handleViewDocument = (doc: Document) => {
    setSelectedDocument(doc);
    showNotification(`Opening: ${doc.fileName}`, 'info');
  };

  const handleDownloadDocument = (doc: Document) => {
    showNotification(`Downloading: ${doc.fileName}`, 'success');
  };

  const handleDeleteDocument = (docId: number) => {
    showNotification('Document deleted successfully', 'success');
  };

  const handlePreviewForm = (formTitle: string) => {
    showNotification(`Previewing: ${formTitle}`, 'info');
  };

  const handleDownloadForm = (formTitle: string) => {
    showNotification(`Downloading: ${formTitle}`, 'success');
  };

  const handleApplyFilters = () => {
    setStatusFilter(filterPanel.status);
    showNotification('Filters applied', 'success');
    setActiveModal(null);
  };

  const requests: Request[] = [
    {
      id: "REQ-2025-1234",
      requestType: "Leave",
      submittedDate: "Jan 15, 2025",
      status: "Pending",
      approver: "A. Smith",
    },
    {
      id: "REQ-2025-1235",
      requestType: "Schedule Change",
      submittedDate: "Jan 12, 2025",
      status: "Approved",
      approver: "A. Johnson",
    },
    {
      id: "REQ-2025-1236",
      requestType: "HR Inquiry",
      submittedDate: "Jan 10, 2025",
      status: "In Review",
      approver: "A. Brown",
    },
    {
      id: "REQ-2025-1237",
      requestType: "Overtime",
      submittedDate: "Jan 08, 2025",
      status: "Rejected",
      approver: "A. Smith",
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
    const matchesStatus = statusFilter === "All" || request.status === statusFilter;
    return matchesStatus;
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
    { name: "HR Forms", subtitle: "Employee-related forms", bgColor: "#DCFCE7", iconBg: "#DCFCE7" },
    { name: "Finance Forms", subtitle: "Expense and payment forms", bgColor: "#E0ECFF", iconBg: "#E0ECFF" },
    { name: "IT Forms", subtitle: "Technology support forms", bgColor: "#F3E8FF", iconBg: "#F3E8FF" },
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
      {/* Header Section */}
      <div className="mb-1.5 sm:mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
        <div>
          <h1 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5">My Requests & Documents</h1>
          <p className="text-xs text-gray-600">View, track, and manage your personal requests and documents.</p>
        </div>
        <div className="flex gap-1 sm:gap-2 flex-wrap">
          <button onClick={() => setActiveModal('upload')} className="px-3 py-1.5 text-xs text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1.5 border border-gray-300 bg-white">
            <Upload className="w-3.5 h-3.5" />
            Upload Document
          </button>
          <button onClick={() => setActiveModal('newRequest')} className="px-3 py-1.5 text-xs bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            New Request
          </button>
        </div>
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

        {/* Summary Cards */}
        {activeTab !== "documents" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mb-1.5">
            {summaryStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm p-1.5">
                  <div className="flex justify-between items-start gap-1">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 mb-0.5">{stat.label}</p>
                      <p className="text-sm font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">{stat.subtitle}</p>
                    </div>
                    <Icon className={`w-3 h-3 ${stat.color} flex-shrink-0 mt-0.5`} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Filter & Search Bar */}
        {activeTab !== "documents" && (
          <div className="flex gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
            {/* Request Type Filter */}
            <select
              className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            >
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
              placeholder="Date Range"
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
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap">Request ID</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap">Request Type</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap">Submitted Date</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap">Approver</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3 text-xs font-semibold text-gray-900">{request.id}</td>
                      <td className="px-4 py-3 text-xs text-gray-700">{request.requestType}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{request.submittedDate}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-700">{request.approver}</td>
                      <td className="px-4 py-3 text-xs">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800 font-medium">View</button>
                          <span className="text-gray-300">|</span>
                          <button className="text-red-600 hover:text-red-800 font-medium">Cancel</button>
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
            {/* Summary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {docSummaryStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-xl font-bold text-gray-900 mb-1">{stat.value}</p>
                        <p className={`text-xs ${stat.subtitleColor ? stat.subtitleColor : "text-gray-600"}`}>{stat.subtitle}</p>
                      </div>
                      <Icon className={`w-4 h-4 ${stat.color} flex-shrink-0`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Document Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <Folder className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900">{category.name}</p>
                      <p className="text-xs text-gray-600">{category.count} document{category.count !== 1 ? "s" : ""}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* All Documents Section */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">All Documents</h3>
              <p className="text-xs text-gray-600 mb-3">Your uploaded and verified documents</p>

              <div className="space-y-2">
                {documents.map((doc) => (
                  <div key={doc.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      {/* Left: Document Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <File className={`w-4 h-4 ${getFileTypeColor(doc.fileType)}`} />
                          <p className="text-sm font-bold text-gray-900">{doc.fileName}</p>
                        </div>

                        {/* Badges */}
                        <div className="flex gap-1.5 mb-1.5">
                          {doc.isVerified && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">Verified</span>
                          )}
                          {doc.expiryDate && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-300">Expires: {doc.expiryDate}</span>
                          )}
                        </div>

                        {/* Details */}
                        <p className="text-xs text-gray-600 mb-1">{doc.category}</p>
                        <p className="text-xs text-gray-600">{doc.size} • Uploaded {doc.uploadedDate}</p>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex gap-1 ml-3">
                        <button onClick={() => handleViewDocument(doc)} className="px-2 py-1 text-xs text-gray-700 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1 whitespace-nowrap">
                          <Eye className="w-3 h-3" />
                          View
                        </button>
                        <button onClick={() => handleDownloadDocument(doc)} className="px-2 py-1 text-xs text-blue-600 border border-blue-300 bg-white rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1 whitespace-nowrap">
                          <Download className="w-3 h-3" />
                          Download
                        </button>
                        <button onClick={() => handleDeleteDocument(doc.id)} className="px-2 py-1 text-xs text-red-600 border border-red-300 bg-white rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1 whitespace-nowrap">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== FORMS & TEMPLATES TAB ===== */}
        {activeTab === "forms" && (
          <div>
            {/* Page Title Section */}
            <div className="mb-2 sm:mb-3">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-0.5 sm:mb-1">Company Forms & Templates</h2>
              <p className="text-xs text-gray-600">Download official forms and document templates</p>
            </div>

            {/* Form List Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-3 mb-2 sm:mb-3">
              <div className="space-y-1.5 sm:space-y-2">
                {forms.map((form) => (
                  <div key={form.id} className="bg-white border border-gray-200 rounded-lg p-2 sm:p-2.5 md:p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 hover:shadow-sm transition-shadow">
                    {/* Left Side: Icon and Info */}
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      {/* Icon Container */}
                      <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-100 flex-shrink-0">
                        <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                      </div>

                      {/* Form Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-xs sm:text-sm text-gray-900 mb-0.5 line-clamp-1">{form.title}</h3>
                        <p className="text-xs text-gray-600 mb-1 line-clamp-1">{form.description}</p>

                        {/* Metadata Row */}
                        <div className="flex flex-wrap gap-1 sm:gap-2.5 text-xs text-gray-600">
                          <span className="hidden sm:inline">Category: {form.category}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="hidden sm:inline">Downloads: {form.downloads}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="hidden sm:inline">Updated: {form.updatedDate}</span>
                          <span className="sm:hidden">{form.category}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Action Buttons */}
                    <div className="flex gap-1.5 sm:gap-2.5 sm:ml-4 flex-shrink-0 w-full sm:w-auto">
                      <button onClick={() => handlePreviewForm(form.title)} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-1 sm:gap-2 text-xs font-medium flex-1 sm:flex-none justify-center">
                        <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span className="hidden sm:inline">Preview</span>
                      </button>
                      <button onClick={() => handleDownloadForm(form.title)} className="px-2 sm:px-3.5 py-1 sm:py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 sm:gap-2 text-xs font-medium flex-1 sm:flex-none justify-center">
                        <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Section */}
            <div className="mt-2 sm:mt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                {formCategories.map((category, index) => (
                  <div
                    key={index}
                    className="rounded-lg p-2 sm:p-3 flex items-center gap-2 sm:gap-3"
                    style={{ backgroundColor: category.bgColor, padding: "8px" }}
                  >
                    {/* Icon */}
                    <div
                      className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: category.iconBg }}
                    >
                      <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
                    </div>

                    {/* Text */}
                    <div className="min-w-0">
                      <h3 className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-1">{category.name}</h3>
                      <p className="text-xs text-gray-600 line-clamp-1">{category.subtitle}</p>
                    </div>
                  </div>
                ))}
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

      {/* Upload Document Modal */}
      {activeModal === 'upload' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Upload Document</h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
                <input
                  type="text"
                  value={uploadForm.fileName}
                  onChange={(e) => setUploadForm({ ...uploadForm, fileName: e.target.value })}
                  placeholder="e.g., My_Document.pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Select File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <input type="file" className="hidden" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setActiveModal(null)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                  Cancel
                </button>
                <button onClick={handleUploadDocument} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Request Modal */}
      {activeModal === 'newRequest' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">New Request</h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Request Title</label>
                <input
                  type="text"
                  value={newRequestForm.title}
                  onChange={(e) => setNewRequestForm({ ...newRequestForm, title: e.target.value })}
                  placeholder="e.g., Work Certificate"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newRequestForm.description}
                  onChange={(e) => setNewRequestForm({ ...newRequestForm, description: e.target.value })}
                  placeholder="Describe what you need..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newRequestForm.priority}
                    onChange={(e) => setNewRequestForm({ ...newRequestForm, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery</label>
                  <select
                    value={newRequestForm.deliveryMethod}
                    onChange={(e) => setNewRequestForm({ ...newRequestForm, deliveryMethod: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Email">Email</option>
                    <option value="In-person">In-person</option>
                    <option value="Portal">Portal</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setActiveModal(null)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                  Cancel
                </button>
                <button onClick={handleNewRequest} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* More Filters Modal */}
      {activeModal === 'moreFilters' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Advanced Filters</h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <div className="space-y-2">
                  {['All Status', 'completed', 'in-progress', 'pending', 'rejected'].map((status) => (
                    <label key={status} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={filterPanel.status === status}
                        onChange={(e) => setFilterPanel({ ...filterPanel, status: e.target.value })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700 capitalize">{status.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <div className="space-y-2">
                  {['All Priorities', 'high', 'medium', 'low'].map((priority) => (
                    <label key={priority} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="priority"
                        value={priority}
                        checked={filterPanel.priority === priority}
                        onChange={(e) => setFilterPanel({ ...filterPanel, priority: e.target.value })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700 capitalize">{priority}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setActiveModal(null)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                  Cancel
                </button>
                <button onClick={handleApplyFilters} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Details Modal */}
      {activeModal === 'details' && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Request Details</h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Title</p>
                <p className="text-lg font-semibold text-gray-900">{selectedRequest.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(selectedRequest.status)}`}>
                    {selectedRequest.status.replace('-', ' ')}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Priority</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getPriorityColor(selectedRequest.priority)}`}>
                    {selectedRequest.priority}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Description</p>
                <p className="text-sm text-gray-900">{selectedRequest.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Delivery Method</p>
                <p className="text-sm text-gray-900">{selectedRequest.deliveryMethod}</p>
              </div>
              {selectedRequest.note && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-600 font-medium mb-1">Note</p>
                  <p className="text-sm text-blue-900">{selectedRequest.note}</p>
                </div>
              )}
              <button onClick={() => setActiveModal(null)} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
