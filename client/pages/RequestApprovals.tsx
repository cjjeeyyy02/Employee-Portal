import { useState } from "react";
import {
  Upload,
  Download,
  AlertCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  <div className="bg-white rounded-md p-2 border border-gray-200">
    <div className="flex items-start justify-between mb-1.5">
      <h3 className="text-xs font-medium text-gray-700">{title}</h3>
      <Icon className="w-4 h-4 text-gray-400" />
    </div>
    <div className="mb-1.5">
      <p className={`text-2xl font-bold ${valueColor || "text-gray-900"}`}>
        {value}
      </p>
    </div>
    <p className="text-xs text-gray-600">{subtitle}</p>
  </div>
);

interface Request {
  id: string;
  requesterName: string;
  type: string;
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
  status:
    | "pending"
    | "in-progress"
    | "escalated"
    | "completed"
    | "rejected"
    | "approved";
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

interface Document {
  id: string;
  filename: string;
  category: string;
  fileSize: string;
  uploadedBy: string;
  uploadedDate: string;
  relatedRequest?: string;
}

const documents: Document[] = [
  {
    id: "1",
    filename: "employment_certificate_template.docx",
    category: "HR Templates",
    fileSize: "45 KB",
    uploadedBy: "HR Department",
    uploadedDate: "2024-11-01",
  },
  {
    id: "2",
    filename: "expense_receipt_mike_chen.pdf",
    category: "Finance",
    fileSize: "230 KB",
    uploadedBy: "Mike Chen",
    uploadedDate: "2024-12-05",
    relatedRequest: "Request #3",
  },
  {
    id: "3",
    filename: "it_equipment_policy.pdf",
    category: "IT Policies",
    fileSize: "1.2 MB",
    uploadedBy: "IT Department",
    uploadedDate: "2024-10-15",
  },
];

interface EscalatedRequest {
  id: string;
  requesterName: string;
  type: string;
  status: "escalated";
  description: string;
  escalationReason: string;
  requestedDate: string;
}

const escalatedRequests: EscalatedRequest[] = [
  {
    id: "1",
    requesterName: "Emma Wilson",
    type: "Office Space Change",
    status: "escalated",
    description: "Request for desk relocation due to noise issues",
    escalationReason:
      "Requires facilities team approval and space availability check",
    requestedDate: "2024-12-01",
  },
];

const getStatusLabel = (status: string) => {
  switch (status) {
    case "in-progress":
      return "In Progress";
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

export default function RequestApprovals() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("pending-approval");
  const [confirmAction, setConfirmAction] = useState<{
    action: "approve" | "reject" | "escalate";
    request: Request | null;
  } | null>(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  const handleUploadDocument = () => {
    toast({
      title: "Upload Document",
      description: "Opening document upload dialog...",
    });
  };

  const handleExportReports = () => {
    toast({
      title: "Export Reports",
      description: "Downloading request reports as CSV...",
    });
  };

  const handleApproveRequest = (request: Request) => {
    setConfirmAction({ action: "approve", request });
  };

  const handleConfirmApprove = () => {
    if (confirmAction?.request) {
      toast({
        title: "Request Approved",
        description: `${confirmAction.request.requesterName}'s "${confirmAction.request.type}" has been approved.`,
      });
      setConfirmAction(null);
    }
  };

  const handleRejectRequest = (request: Request) => {
    setConfirmAction({ action: "reject", request });
  };

  const handleConfirmReject = () => {
    if (confirmAction?.request) {
      toast({
        title: "Request Rejected",
        description: `${confirmAction.request.requesterName}'s "${confirmAction.request.type}" has been rejected.`,
      });
      setConfirmAction(null);
    }
  };

  const handleEscalateRequest = (request: Request) => {
    setConfirmAction({ action: "escalate", request });
  };

  const handleConfirmEscalate = () => {
    if (confirmAction?.request) {
      toast({
        title: "Request Escalated",
        description: `${confirmAction.request.requesterName}'s "${confirmAction.request.type}" has been escalated.`,
      });
      setConfirmAction(null);
    }
  };

  const handleViewRequest = (requestType: string) => {
    toast({
      title: "View Request",
      description: `Opening details for "${requestType}"...`,
    });
  };

  const handleViewDocument = (filename: string) => {
    toast({
      title: "View Document",
      description: `Opening ${filename}...`,
    });
  };

  const handleDownloadDocument = (filename: string) => {
    toast({
      title: "Download",
      description: `Downloading ${filename}...`,
    });
  };

  const handleContactSeniorManager = (
    requesterName: string,
    requestType: string,
  ) => {
    toast({
      title: "Contact Senior Manager",
      description: `Contacting senior manager regarding ${requesterName}'s escalated "${requestType}"...`,
    });
  };

  const handleViewEscalationDetails = (requesterName: string) => {
    toast({
      title: "View Details",
      description: `Opening escalation details for ${requesterName}...`,
    });
  };

  const tabs = [
    { id: "pending-approval", label: "Pending Approval" },
    { id: "all-requests", label: "All Requests" },
    { id: "document-library", label: "Document Library" },
    { id: "escalation-management", label: "Escalation Management" },
  ];

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto px-3 py-1.5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-lg font-semibold text-gray-900 mb-0">
                  Requests & Approvals
                </h1>
                <p className="text-xs text-gray-600 mt-0.5">
                  Review, approve, and manage team requests.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  className="gap-2 h-7 text-xs px-2"
                  onClick={handleUploadDocument}
                >
                  <Upload className="w-3 h-3" />
                  Upload Document
                </Button>
                <Button
                  className="gap-2 bg-blue-600 hover:bg-blue-700 h-7 text-xs px-2"
                  onClick={handleExportReports}
                >
                  <Download className="w-3 h-3" />
                  Export Reports
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="mx-auto px-3 py-1">
          <div className="grid grid-cols-4 gap-2 mb-2">
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
        <div className="mx-auto px-3 pb-3">
          {/* Tabs */}
          <div className="flex gap-1 mb-2 border-b border-gray-200">
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
                .filter(
                  (req) =>
                    req.status === "pending" || req.status === "escalated",
                )
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
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}
                            >
                              {request.priority.charAt(0).toUpperCase() +
                                request.priority.slice(1)}
                            </span>
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}
                            >
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
                        <Button
                          className="h-8 text-xs px-3 bg-green-600 hover:bg-green-700 text-white"
                          onClick={() =>
                            handleApproveRequest(request)
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          className="h-8 text-xs px-3"
                          onClick={() =>
                            handleRejectRequest(request)
                          }
                        >
                          Reject
                        </Button>
                        <Button
                          variant="outline"
                          className="h-8 text-xs px-3"
                          onClick={() =>
                            handleEscalateRequest(request)
                          }
                        >
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
                  All Team Requests
                </h2>
                <p className="text-xs text-gray-500">
                  Complete history of team requests and their status
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">
                          Request
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">
                          Employee
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">
                          Category
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">
                          Priority
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">
                          Status
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">
                          Date
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {requests.map((request) => (
                        <tr
                          key={request.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-3">
                            <div>
                              <p className="text-xs font-semibold text-gray-900">
                                {request.type}
                              </p>
                              <p className="text-xs text-gray-600 mt-0.5">
                                {request.description}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-xs text-gray-900">
                              {request.requesterName}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(request.category)}`}
                            >
                              {request.category.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}
                            >
                              {request.priority.charAt(0).toUpperCase() +
                                request.priority.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}
                            >
                              {getStatusLabel(request.status)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-600">
                            {request.requestedDate}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <Button
                                variant="outline"
                                className="h-7 text-xs px-2"
                                title="View details"
                                onClick={() => handleViewRequest(request.type)}
                              >
                                View
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Document Library Tab */}
          {activeTab === "document-library" && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  Document Library
                </h2>
                <p className="text-xs text-gray-500">
                  Manage templates, policies, and uploaded documents
                </p>
              </div>

              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2">
                          <p className="text-sm font-semibold text-gray-900">
                            {doc.filename}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              {doc.category}
                            </span>
                            <span className="text-xs text-gray-600">
                              {doc.fileSize}
                            </span>
                          </div>
                        </div>

                        <div className="text-xs text-gray-600 space-y-1">
                          <p>
                            Uploaded by {doc.uploadedBy} on {doc.uploadedDate}
                          </p>
                          {doc.relatedRequest && (
                            <p className="text-xs text-gray-500">
                              Related to {doc.relatedRequest}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          className="h-8 text-xs px-3"
                          title="View document"
                          onClick={() => handleViewDocument(doc.filename)}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          className="h-8 text-xs px-3"
                          title="Download document"
                          onClick={() => handleDownloadDocument(doc.filename)}
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Escalation Management Tab */}
          {activeTab === "escalation-management" && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  Escalation Management
                </h2>
                <p className="text-xs text-gray-500">
                  Handle requests that require higher-level approval
                </p>
              </div>

              {escalatedRequests.map((escalation) => (
                <div
                  key={escalation.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="mb-2">
                        <h3 className="font-semibold text-sm text-gray-900">
                          {escalation.requesterName}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {escalation.type}
                        </p>
                      </div>

                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(escalation.status)}`}
                      >
                        {getStatusLabel(escalation.status)}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3 p-3 bg-gray-50 rounded-lg space-y-2">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">
                        From: {escalation.requesterName}
                      </p>
                      <p className="text-xs text-gray-600">
                        {escalation.description}
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-2">
                      <p className="text-xs text-gray-600 font-medium mb-1">
                        Escalation Reason:
                      </p>
                      <p className="text-xs text-gray-600">
                        {escalation.escalationReason}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mb-4">
                    Requested: {escalation.requestedDate}
                  </p>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 h-8 text-xs px-3 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() =>
                        handleContactSeniorManager(
                          escalation.requesterName,
                          escalation.type,
                        )
                      }
                    >
                      Contact Senior Manager
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 h-8 text-xs px-3"
                      onClick={() =>
                        handleViewEscalationDetails(escalation.requesterName)
                      }
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Approve Confirmation Dialog */}
      {confirmAction?.action === "approve" && (
        <AlertDialog open={true} onOpenChange={() => setConfirmAction(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Approve Request?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to approve{" "}
                <span className="font-semibold text-gray-900">
                  {confirmAction?.request?.requesterName}
                </span>
                's request for{" "}
                <span className="font-semibold text-gray-900">
                  {confirmAction?.request?.type}
                </span>
                ? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setConfirmAction(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmApprove}
                className="bg-green-600 hover:bg-green-700"
              >
                Approve
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Reject Confirmation Dialog */}
      {confirmAction?.action === "reject" && (
        <AlertDialog open={true} onOpenChange={() => setConfirmAction(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reject Request?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to reject{" "}
                <span className="font-semibold text-gray-900">
                  {confirmAction?.request?.requesterName}
                </span>
                's request for{" "}
                <span className="font-semibold text-gray-900">
                  {confirmAction?.request?.type}
                </span>
                ? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setConfirmAction(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmReject}
                className="bg-red-600 hover:bg-red-700"
              >
                Reject
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Escalate Confirmation Dialog */}
      {confirmAction?.action === "escalate" && (
        <AlertDialog open={true} onOpenChange={() => setConfirmAction(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Escalate Request?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to escalate{" "}
                <span className="font-semibold text-gray-900">
                  {confirmAction?.request?.requesterName}
                </span>
                's request for{" "}
                <span className="font-semibold text-gray-900">
                  {confirmAction?.request?.type}
                </span>
                ? This will send it for higher-level approval.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setConfirmAction(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmEscalate}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Escalate
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </Layout>
  );
}
