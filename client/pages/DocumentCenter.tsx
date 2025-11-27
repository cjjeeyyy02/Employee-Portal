import { useState } from "react";
import {
  Search,
  Download,
  Trash2,
  Eye,
  Upload,
  FileText,
  Files,
  Clock,
  Folder,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  name: string;
  category: string;
  size: string;
  uploadedBy: string;
  uploadedDate: string;
  type: "template" | "policy" | "guide" | "form" | "report";
  department?: string;
}

interface MetricCard {
  icon: React.ElementType;
  title: string;
  value: string | number;
  subtitle: string;
  valueColor?: string;
}

const MetricCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  valueColor,
}: MetricCard & { icon: React.ElementType }) => (
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

const documents: Document[] = [
  {
    id: "1",
    name: "Employee Handbook 2024",
    category: "Policy",
    size: "2.4 MB",
    uploadedBy: "HR Department",
    uploadedDate: "2024-11-01",
    type: "policy",
    department: "HR",
  },
  {
    id: "2",
    name: "Performance Review Template",
    category: "Template",
    size: "385 KB",
    uploadedBy: "HR Manager",
    uploadedDate: "2024-10-25",
    type: "template",
    department: "HR",
  },
  {
    id: "3",
    name: "Leave Request Form",
    category: "Form",
    size: "156 KB",
    uploadedBy: "HR Team",
    uploadedDate: "2024-10-20",
    type: "form",
    department: "HR",
  },
  {
    id: "4",
    name: "Team Communication Guide",
    category: "Guide",
    size: "845 KB",
    uploadedBy: "Management",
    uploadedDate: "2024-10-15",
    type: "guide",
    department: "Management",
  },
  {
    id: "5",
    name: "Q4 Sales Report",
    category: "Report",
    size: "1.2 MB",
    uploadedBy: "Sales Manager",
    uploadedDate: "2024-10-10",
    type: "report",
    department: "Sales",
  },
  {
    id: "6",
    name: "Code of Conduct",
    category: "Policy",
    size: "512 KB",
    uploadedBy: "Legal Department",
    uploadedDate: "2024-09-30",
    type: "policy",
    department: "Legal",
  },
];

const getCategoryColor = (type: string) => {
  switch (type) {
    case "policy":
      return "bg-red-100 text-red-800";
    case "template":
      return "bg-blue-100 text-blue-800";
    case "guide":
      return "bg-green-100 text-green-800";
    case "form":
      return "bg-yellow-100 text-yellow-800";
    case "report":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function DocumentCenter() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all-documents");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  const handleUploadDocument = () => {
    toast({
      title: "Upload Document",
      description: "Opening document upload dialog...",
    });
  };

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    setShowDocumentModal(true);
  };

  const handleDownloadDocument = (filename: string) => {
    const element = window.document.createElement("a");
    element.setAttribute(
      "href",
      `data:text/plain;charset=utf-8,${encodeURIComponent(
        `Document: ${filename}\n\nThis is a sample document.`
      )}`
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    window.document.body.appendChild(element);
    element.click();
    window.document.body.removeChild(element);

    toast({
      title: "Download Started",
      description: `${filename} is being downloaded...`,
    });
  };

  const handleDeleteDocument = (filename: string) => {
    toast({
      title: "Document Deleted",
      description: `${filename} has been removed from the library.`,
    });
  };

  const handleShareDocument = (filename: string) => {
    toast({
      title: "Document Shared",
      description: `${filename} has been shared with the team.`,
    });
  };

  const tabs = [
    { id: "all-documents", label: "All Documents" },
    { id: "templates", label: "Templates" },
    { id: "policies", label: "Policies" },
    { id: "recent", label: "Recently Added" },
  ];

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabFilteredDocuments =
    activeTab === "all-documents"
      ? filteredDocuments
      : activeTab === "templates"
        ? filteredDocuments.filter((d) => d.type === "template")
        : activeTab === "policies"
          ? filteredDocuments.filter((d) => d.type === "policy")
          : filteredDocuments;

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto px-3 py-1.5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-lg font-semibold text-gray-900 mb-0">
                  Document Center
                </h1>
                <p className="text-xs text-gray-600 mt-0.5">
                  Manage and securely store employee and compliance documents.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  className="gap-2 bg-blue-600 hover:bg-blue-700 h-7 text-xs px-2"
                  onClick={handleUploadDocument}
                >
                  <Upload className="w-3 h-3" />
                  Upload Document
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="mx-auto px-3 py-1">
          <div className="grid grid-cols-4 gap-2 mb-2">
            <MetricCard
              icon={Files}
              title="Total Documents"
              value={documents.length}
              subtitle="Across all categories"
              valueColor="text-blue-600"
            />
            <MetricCard
              icon={FileText}
              title="Templates"
              value={documents.filter((d) => d.type === "template").length}
              subtitle="Available templates"
              valueColor="text-green-600"
            />
            <MetricCard
              icon={Folder}
              title="Policies"
              value={documents.filter((d) => d.type === "policy").length}
              subtitle="Active policies"
              valueColor="text-orange-600"
            />
            <MetricCard
              icon={Clock}
              title="Recent"
              value="3"
              subtitle="Added this month"
              valueColor="text-purple-600"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="mx-auto px-3 pb-3">
          {/* Search Bar */}
          <div className="flex items-center gap-2 mb-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search documents..."
                className="pl-10 rounded-full h-8 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

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

          {/* Documents List */}
          <div className="space-y-3">
            {tabFilteredDocuments.length > 0 ? (
              tabFilteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2">
                        <h3 className="font-semibold text-sm text-gray-900 mb-1">
                          {doc.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(doc.type)}`}
                          >
                            {doc.category}
                          </span>
                          <span className="text-xs text-gray-600">
                            {doc.size}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-600 space-y-0.5">
                        <p>
                          Uploaded by {doc.uploadedBy} on {doc.uploadedDate}
                        </p>
                        {doc.department && (
                          <p className="text-xs text-gray-500">
                            Department: {doc.department}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        className="h-8 text-xs px-3"
                        title="View document"
                        onClick={() => handleViewDocument(doc)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        className="h-8 text-xs px-3"
                        title="Download document"
                        onClick={() => handleDownloadDocument(doc.name)}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        className="h-8 text-xs px-3 hover:text-red-600 hover:border-red-200"
                        title="Delete document"
                        onClick={() => handleDeleteDocument(doc.name)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-600">
                  No documents found matching your search.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Document View Modal */}
        {showDocumentModal && selectedDocument && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    View Document
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    {selectedDocument.name}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowDocumentModal(false);
                    setSelectedDocument(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Document Info */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-3">
                  <div>
                    <p className="text-xs text-gray-600 font-medium mb-1">
                      Document Name
                    </p>
                    <p className="text-sm text-gray-900">
                      {selectedDocument.name}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 font-medium mb-1">
                        File Size
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedDocument.size}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-medium mb-1">
                        Category
                      </p>
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(selectedDocument.type)}`}
                      >
                        {selectedDocument.category}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 font-medium mb-1">
                      Uploaded By
                    </p>
                    <p className="text-sm text-gray-900">
                      {selectedDocument.uploadedBy} on{" "}
                      {selectedDocument.uploadedDate}
                    </p>
                  </div>

                  {selectedDocument.department && (
                    <div>
                      <p className="text-xs text-gray-600 font-medium mb-1">
                        Department
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedDocument.department}
                      </p>
                    </div>
                  )}
                </div>

                {/* Document Preview */}
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 text-center">
                  <p className="text-sm text-blue-900 font-medium mb-2">
                    Document Preview
                  </p>
                  <p className="text-xs text-blue-800">
                    This document is ready for download. Full preview feature would display the document content here.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  className="flex-1 h-10 text-sm font-medium"
                  onClick={() => {
                    setShowDocumentModal(false);
                    setSelectedDocument(null);
                  }}
                >
                  Close
                </Button>
                <Button
                  className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                  onClick={() => {
                    handleDownloadDocument(selectedDocument.name);
                    setShowDocumentModal(false);
                    setSelectedDocument(null);
                  }}
                >
                  Download
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
