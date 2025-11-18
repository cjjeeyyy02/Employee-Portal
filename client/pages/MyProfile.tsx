import { useState, useEffect } from "react";
import { Camera, Phone, Mail, Shield, Briefcase, Calendar, CheckCircle, DollarSign, TrendingUp, FileText, Download, Upload, Coffee, LogOut, Edit2, X, MoreVertical, Eye, Trash2, Plus, Paperclip } from "lucide-react";
import Layout from "@/components/Layout";

type TabType = "personal" | "contact" | "employment" | "payroll" | "performance" | "leaveAttendance" | "documents" | "training";
type EditModalType = "personal" | "contact" | "training" | null;

const tabs: { id: TabType; label: string }[] = [
  { id: "personal", label: "Personal" },
  { id: "contact", label: "Contact" },
  { id: "employment", label: "Employment" },
  { id: "training", label: "Training & Certification" },
  { id: "payroll", label: "Compensation" },
  { id: "performance", label: "Performance & Skills" },
  { id: "leaveAttendance", label: "Leave & Attendance" },
  { id: "documents", label: "Documents" },
];

interface Payslip {
  id: number;
  date: string;
  payPeriod: string;
  grossPay: string;
  deduction: string;
  netPay: string;
}

interface Skill {
  id: number;
  name: string;
  experience: number;
  level: string;
}

interface Training {
  id: number;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  status: string;
}

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState<TabType>("personal");
  const [editModalType, setEditModalType] = useState<EditModalType>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [showSalary, setShowSalary] = useState<boolean>(false);
  const [openLeaveMenu, setOpenLeaveMenu] = useState<number | null>(null);
  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);
  const [leaveForm, setLeaveForm] = useState({
    leaveType: "Annual Leave",
    startDate: "",
    endDate: "",
    reason: "",
    approver: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedDocs, setSelectedDocs] = useState<number[]>([]);
  const [showDocCheckboxes, setShowDocCheckboxes] = useState<boolean>(false);

  const documents = [
    { id: 1, title: "Employment Contract", fileType: "PDF", fileSize: "2.4 MB", uploadDate: "01/15/2023" },
    { id: 2, title: "Tax Forms (W-2)", fileType: "PDF", fileSize: "1.8 MB", uploadDate: "12/31/2023" },
    { id: 3, title: "Performance Review 2023", fileType: "DOCX", fileSize: "856 KB", uploadDate: "11/20/2023" },
    { id: 4, title: "Benefits Enrollment", fileType: "PDF", fileSize: "3.1 MB", uploadDate: "03/10/2023" },
    { id: 5, title: "Training Certificate", fileType: "PDF", fileSize: "1.2 MB", uploadDate: "08/15/2023" },
  ];

  const toggleDocSelection = (docId: number) => {
    setSelectedDocs(prev =>
      prev.includes(docId) ? prev.filter(id => id !== docId) : [...prev, docId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedDocs(prev =>
      prev.length === documents.length ? [] : documents.map(doc => doc.id)
    );
  };

  const handleDownloadSelected = () => {
    if (!showDocCheckboxes) {
      // Enable selection mode
      setShowDocCheckboxes(true);
      return;
    }

    if (selectedDocs.length === 0) {
      alert("Please select at least one document to download.");
      return;
    }
    const selectedDocuments = documents.filter(doc => selectedDocs.includes(doc.id));
    console.log("Downloading documents:", selectedDocuments);
    // Implement actual download logic here
    alert(`Downloading ${selectedDocs.length} document(s)...`);

    // Reset selection mode
    setShowDocCheckboxes(false);
    setSelectedDocs([]);
  };

  const handleCancelSelection = () => {
    setShowDocCheckboxes(false);
    setSelectedDocs([]);
  };

  // Edit form states
  const [personalForm, setPersonalForm] = useState({ firstName: "Sarah", lastName: "Mitchell", dateOfBirth: "03-15-1990", gender: "Female", maritalStatus: "Single", nationality: "United States" });
  const [contactForm, setContactForm] = useState({ phone: "+1 234 567 890", personalEmail: "sarah.mitchell@email.com", workEmail: "sarah.m@company.com", street: "123 Main Street", city: "Los Angeles", state: "California", zipCode: "90001" });
  const [trainingForm, setTrainingForm] = useState({ name: "", issuer: "", issueDate: "", expiryDate: "" });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openLeaveMenu !== null) {
        const target = event.target as HTMLElement;
        if (!target.closest('button') && !target.closest('.absolute')) {
          setOpenLeaveMenu(null);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openLeaveMenu]);

  const payslips: Payslip[] = [
    { id: 1, date: "11/30/2024", payPeriod: "Nov 1 - Nov 30, 2024", grossPay: "$4,500.00", deduction: "$750.00", netPay: "$3,750.00" },
    { id: 2, date: "11/15/2024", payPeriod: "Nov 1 - Nov 15, 2024", grossPay: "$2,250.00", deduction: "$375.00", netPay: "$1,875.00" },
    { id: 3, date: "10/31/2024", payPeriod: "Oct 1 - Oct 31, 2024", grossPay: "$4,500.00", deduction: "$750.00", netPay: "$3,750.00" },
    { id: 4, date: "10/15/2024", payPeriod: "Oct 1 - Oct 15, 2024", grossPay: "$2,250.00", deduction: "$375.00", netPay: "$1,875.00" },
  ];

  const skills: Skill[] = [
    { id: 1, name: "React", experience: 4, level: "Expert" },
    { id: 2, name: "TypeScript", experience: 3, level: "Advanced" },
    { id: 3, name: "Node.js", experience: 3, level: "Advanced" },
    { id: 4, name: "Python", experience: 2, level: "Intermediate" },
    { id: 5, name: "AWS", experience: 2, level: "Intermediate" },
    { id: 6, name: "Docker", experience: 1, level: "Beginner" },
  ];

  const trainings: Training[] = [
    { id: 1, name: "AWS Solutions Architect", issuer: "Amazon Web Services", issueDate: "06/20/2023", expiryDate: "06/20/2025", status: "Active" },
    { id: 2, name: "Project Management Professional", issuer: "PMI", issueDate: "03/15/2022", expiryDate: "03/15/2025", status: "Active" },
    { id: 3, name: "Leadership Development", issuer: "LinkedIn Learning", issueDate: "12/10/2023", expiryDate: "—", status: "Completed" },
  ];

  const certifications: Training[] = [
    { id: 1, name: "Certified ScrumMaster (CSM)", issuer: "Scrum Alliance", issueDate: "08/12/2022", expiryDate: "08/12/2024", status: "Active" },
    { id: 2, name: "Google Cloud Professional", issuer: "Google Cloud", issueDate: "05/18/2023", expiryDate: "05/18/2025", status: "Active" },
    { id: 3, name: "Certified Information Security Manager", issuer: "ISACA", issueDate: "02/25/2021", expiryDate: "02/25/2024", status: "Expired" },
  ];

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEditSubmit = (type: EditModalType) => {
    showNotification(`${type === 'personal' ? 'Personal' : type === 'contact' ? 'Contact' : 'Training'} information updated successfully`, 'success');
    setEditModalType(null);
  };

  return (
    <Layout>
      {/* Header Section */}
      <div className="mb-4 animate-fadeIn">
        <h1 className="text-lg font-bold text-gray-900 mb-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>My Profile</h1>
        <p className="text-xs text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>View and manage your profile information</p>
      </div>

      {/* Employee Profile Card */}
      <div style={{
        borderRadius: "8px",
        border: "1px solid #E5E7EB",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
        padding: "20px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "16px",
        marginBottom: "16px"
      }}>
        {/* Left Content - Employee Details */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
          {/* Profile Picture - Centered */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 shadow-sm"
              style={{ flexShrink: 0 }}
            />
          </div>

          {/* Employee Details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <p style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "18px",
              color: "#111827",
              margin: 0
            }}>
              Sarah Mitchell
            </p>
            <p style={{
              fontFamily: "Poppins, sans-serif",
              color: "#6B7280",
              fontSize: "15px",
              margin: 0
            }}>
              sarah.mitchell@company.com
            </p>
            <p style={{
              fontFamily: "Poppins, sans-serif",
              color: "#6B7280",
              fontSize: "15px",
              margin: 0
            }}>
              +1 (555) 010–1200
            </p>
            <p style={{
              fontFamily: "Poppins, sans-serif",
              color: "#9CA3AF",
              fontSize: "14px",
              margin: 0
            }}>
              Engineering • San Francisco, CA, USA
            </p>
          </div>
        </div>

        {/* Right Content - Employee ID, Joined Date, and Status Badge */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
          {/* Employee ID */}
          <div style={{ textAlign: "right" }}>
            <span style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              color: "#111827",
              fontSize: "14px",
              marginRight: "4px"
            }}>
              Employee ID:
            </span>
            <span style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              color: "#1D4ED8",
              fontSize: "14px"
            }}>
              EMP001
            </span>
          </div>

          {/* Joined Date */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-end" }}>
            <Calendar className="w-4 h-4 text-gray-500" />
            <span style={{
              fontFamily: "Poppins, sans-serif",
              color: "#6B7280",
              fontSize: "14px"
            }}>
              Joined Date: 01–15–2023
            </span>
          </div>

          {/* Active Badge */}
          <span style={{
            backgroundColor: "#D1FAE5",
            color: "#065F46",
            fontSize: "12px",
            fontWeight: 700,
            fontFamily: "Poppins, sans-serif",
            padding: "4px 8px",
            borderRadius: "9999px",
            display: "inline-block"
          }}>
            Active
          </span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-4" style={{ borderBottom: "1px solid #E5E7EB" }}>
        <div className="flex gap-8 overflow-x-auto px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="pb-3 font-semibold text-xs whitespace-nowrap transition-all px-1"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: activeTab === tab.id ? "#2563EB" : "#374151",
                borderBottom: activeTab === tab.id ? "2px solid #2563EB" : "2px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  (e.target as HTMLButtonElement).style.color = "#1D4ED8";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  (e.target as HTMLButtonElement).style.color = "#374151";
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-fadeIn">
        {/* Personal Tab */}
        {activeTab === "personal" && (
          <div style={{ paddingTop: "12px", paddingBottom: "12px", paddingLeft: "16px", paddingRight: "16px", backgroundColor: "#FFFFFF" }}>
            {/* Personal Information Card */}
            <div style={{
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
              padding: "10px 12px"
            }}>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h2 className="text-xs font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 600 }}>Personal Information</h2>
                <button
                  onClick={() => setEditModalType("personal")}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors text-xs font-medium"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </button>
              </div>
              <div className="space-y-3">
                {/* First Name & Middle Name Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>First Name</label>
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>Sarah</p>
                  </div>
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Middle Name</label>
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>—</p>
                  </div>
                </div>

                {/* Last Name */}
                <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                  <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Last Name</label>
                  <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>Mitchell</p>
                </div>

                {/* Date of Birth */}
                <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                  <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Date of Birth</label>
                  <p className="text-base font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>03-15-1990</p>
                </div>

                {/* Gender & Marital Status Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Gender</label>
                    <p className="text-base font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>Female</p>
                  </div>
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Marital Status</label>
                    <p className="text-base font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>Single</p>
                  </div>
                </div>

                {/* Nationality */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Nationality</label>
                  <p className="text-base font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>United States</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div style={{ paddingTop: "12px", paddingBottom: "12px", paddingLeft: "16px", paddingRight: "16px", backgroundColor: "#FFFFFF" }}>
            <div className="space-y-3">
              {/* Contact Details Card */}
              <div style={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                padding: "10px 12px"
              }}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h2 className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 600 }}>Contact Details</h2>
                  <button
                    onClick={() => setEditModalType("contact")}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors text-xs font-medium"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Phone Number */}
                  <div className="flex items-start gap-3 pb-3" style={{ borderBottom: "1px solid #E5E7EB" }}>
                    <Phone className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Phone Number</label>
                      <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>+1 234 567 890</p>
                    </div>
                  </div>

                  {/* Alternate Number */}
                  <div className="flex items-start gap-3 pb-3" style={{ borderBottom: "1px solid #E5E7EB" }}>
                    <Phone className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Alternate Number</label>
                      <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>+1 987 654 321</p>
                    </div>
                  </div>

                  {/* Personal Email Address */}
                  <div className="flex items-start gap-3 pb-3" style={{ borderBottom: "1px solid #E5E7EB" }}>
                    <Mail className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Personal Email Address</label>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>sarah.mitchell@email.com</p>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>
                          <CheckCircle className="w-3 h-3" /> Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Work Email Address */}
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Work Email Address</label>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>sarah.m@company.com</p>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>
                          <CheckCircle className="w-3 h-3" /> Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information Card */}
              <div style={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                padding: "10px 12px"
              }}>
                <h2 className="text-sm font-bold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 600 }}>Address Information</h2>
                <div className="space-y-3">
                  {/* Street Address */}
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Street Address</label>
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>123 Main Street</p>
                  </div>

                  {/* City & State Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                      <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>City</label>
                      <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>Los Angeles</p>
                    </div>
                    <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                      <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>State</label>
                      <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>California</p>
                    </div>
                  </div>

                  {/* ZIP Code */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Zip Code</label>
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>90001</p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact Card */}
              <div style={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                padding: "10px 12px"
              }}>
                <div className="flex items-start gap-2 mb-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 600 }}>Emergency Contact</h2>
                    <p className="text-xs text-gray-600 mt-0.5" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Provide emergency contact information for urgent situations.</p>
                  </div>
                </div>

                <div className="space-y-2" style={{ marginTop: "12px" }}>
                  {/* Contact Name & Relationship Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                      <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Contact Name</label>
                      <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>John Mitchell</p>
                    </div>

                    <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                      <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Relationship</label>
                      <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>Brother</p>
                    </div>
                  </div>

                  {/* Contact Number */}
                  <div className="flex items-start gap-3 pb-3" style={{ borderBottom: "1px solid #E5E7EB" }}>
                    <Phone className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Contact Number</label>
                      <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>+1 456 789 123</p>
                    </div>
                  </div>

                  {/* Alternate Number */}
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Alternate Number</label>
                      <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>+1 321 654 987</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Employment Tab */}
        {activeTab === "employment" && (
          <div style={{ paddingTop: "12px", paddingBottom: "12px", paddingLeft: "16px", paddingRight: "16px", backgroundColor: "#FFFFFF" }}>
            <div className="space-y-3">
              {/* Work Details Card */}
              <div style={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                padding: "10px 12px"
              }}>
                {/* Header */}
                <div className="flex items-start gap-2 mb-3">
                  <Briefcase className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 600 }}>Work Details</h2>
                    <p className="text-xs text-gray-600 mt-0.5" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Your current position and work information.</p>
                  </div>
                </div>

                {/* Information Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-2">
                  {/* Position */}
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Position</label>
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>Senior Software Engineer</p>
                  </div>

                  {/* Department */}
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Department</label>
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>Engineering</p>
                  </div>

                  {/* Reporting Manager */}
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Reporting Manager</label>
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>Michael Rodriguez</p>
                  </div>

                  {/* Employment Status */}
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Employment Status</label>
                    <span className="inline-block rounded-lg px-3 py-1 bg-green-600 text-white font-semibold text-xs" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Active
                    </span>
                  </div>

                  {/* Employment Type */}
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Employment Type</label>
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>Full-Time</p>
                  </div>

                  {/* Date Hired */}
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Date Hired</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>01/15/2023</p>
                    </div>
                  </div>

                  {/* Probation End Date */}
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Probation End Date</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>07-15-2023</p>
                    </div>
                  </div>

                  {/* Work Location / Site */}
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Work Location / Site</label>
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>Head Office</p>
                  </div>

                  {/* Shift Schedule */}
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Shift Schedule</label>
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>Day</p>
                  </div>

                  {/* Work Phone / Extension */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Work Phone / Extension</label>
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>+1 (555) 123-4567 ext. 1234</p>
                  </div>
                </div>
              </div>

              {/* Position History Card */}
              <div style={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                padding: "10px 12px"
              }}>
                <h2 className="text-sm font-bold text-gray-900 mb-3" style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 600 }}>Position History</h2>
                <div className="space-y-2">
                  {/* Senior Analyst */}
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>Senior Analyst</p>
                        <p className="text-xs text-gray-600 mt-1" style={{ fontFamily: "Poppins, sans-serif" }}>Jan 2022 – Aug 2023</p>
                      </div>
                      <span className="inline-block rounded-lg px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>
                        Promoted
                      </span>
                    </div>
                  </div>

                  {/* HR Assistant */}
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>HR Assistant</p>
                        <p className="text-xs text-gray-600 mt-1" style={{ fontFamily: "Poppins, sans-serif" }}>Jun 2020 – Dec 2021</p>
                      </div>
                      <span className="inline-block rounded-lg px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>
                        Transfer
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Previous Work History Card */}
              <div style={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                padding: "10px 12px",
                overflowX: "auto"
              }}>
                <h2 className="text-sm font-bold text-gray-900 mb-3" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px", fontWeight: 600 }}>Previous Work History</h2>
                <table className="w-full" style={{ fontFamily: "Poppins, sans-serif" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#F3F4F6", borderBottom: "1px solid #E5E7EB" }}>
                      <th className="px-3 py-2 text-left" style={{ fontSize: "11px", fontWeight: 600, color: "#111827" }}>Company Name</th>
                      <th className="px-3 py-2 text-left" style={{ fontSize: "11px", fontWeight: 600, color: "#111827" }}>Position</th>
                      <th className="px-3 py-2 text-left" style={{ fontSize: "11px", fontWeight: 600, color: "#111827" }}>Duration</th>
                      <th className="px-3 py-2 text-left" style={{ fontSize: "11px", fontWeight: 600, color: "#111827" }}>Location</th>
                      <th className="px-3 py-2 text-left" style={{ fontSize: "11px", fontWeight: 600, color: "#111827" }}>Employment Type</th>
                      <th className="px-3 py-2 text-left" style={{ fontSize: "11px", fontWeight: 600, color: "#111827" }}>Reason for Leaving</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Nimbus Labs */}
                    <tr style={{ borderBottom: "1px solid #E5E7EB" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}>
                      <td className="px-3 py-2" style={{ fontSize: "11px", fontWeight: 500, color: "#111827" }}>Nimbus Labs</td>
                      <td className="px-3 py-2" style={{ fontSize: "11px", color: "#4B5563" }}>Software Engineer</td>
                      <td className="px-3 py-2" style={{ fontSize: "11px", color: "#4B5563" }}>2 years</td>
                      <td className="px-3 py-2" style={{ fontSize: "11px", color: "#4B5563" }}>Vancouver, Canada</td>
                      <td className="px-3 py-2" style={{ fontSize: "11px", color: "#4B5563" }}>Full-time</td>
                      <td className="px-3 py-2" style={{ fontSize: "11px", color: "#4B5563" }}>Career growth</td>
                    </tr>

                    {/* Aster Corp */}
                    <tr onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}>
                      <td className="px-3 py-2" style={{ fontSize: "11px", fontWeight: 500, color: "#111827" }}>Aster Corp</td>
                      <td className="px-3 py-2" style={{ fontSize: "11px", color: "#4B5563" }}>Junior Developer</td>
                      <td className="px-3 py-2" style={{ fontSize: "11px", color: "#4B5563" }}>1.5 years</td>
                      <td className="px-3 py-2" style={{ fontSize: "11px", color: "#4B5563" }}>Seattle, USA</td>
                      <td className="px-3 py-2" style={{ fontSize: "11px", color: "#4B5563" }}>Full-time</td>
                      <td className="px-3 py-2" style={{ fontSize: "11px", color: "#4B5563" }}>Relocation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Training & Certification Tab */}
        {activeTab === "training" && (
          <div style={{ paddingTop: "12px", paddingBottom: "12px", paddingLeft: "16px", paddingRight: "16px", backgroundColor: "#FFFFFF" }}>
            <div className="space-y-3">
              {/* Training Header with Add Button */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <h2 className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 600 }}>Training & Certification</h2>
                <button
                  onClick={() => setEditModalType("training")}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-xs font-medium"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  +Add Training/Certification
                </button>
              </div>

              {/* Training Table */}
              <div style={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                padding: "10px 12px",
                overflowX: "auto"
              }}>
                <h3 className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>Training</h3>
                <table className="w-full" style={{ fontFamily: "Poppins, sans-serif" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#F3F4F6", borderBottom: "1px solid #E5E7EB" }}>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Training Name</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Issuing Organization</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Issue Date</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Expiry Date</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Status</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainings.map((training) => (
                      <tr key={training.id} style={{ borderBottom: "1px solid #E5E7EB" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}>
                        <td className="px-4 py-3 text-sm text-gray-900 font-medium">{training.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{training.issuer}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{training.issueDate}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{training.expiryDate}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${training.status === "Active" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                            {training.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          <button className="text-blue-600 hover:text-blue-800 transition-colors text-xs">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Certification Table */}
              <div style={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                padding: "10px 12px",
                overflowX: "auto"
              }}>
                <h3 className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>Certification</h3>
                <table className="w-full" style={{ fontFamily: "Poppins, sans-serif" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#F3F4F6", borderBottom: "1px solid #E5E7EB" }}>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Certification Name</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Issuing Organization</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Issue Date</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Expiry Date</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Status</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certifications.map((cert) => (
                      <tr key={cert.id} style={{ borderBottom: "1px solid #E5E7EB" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}>
                        <td className="px-4 py-3 text-sm text-gray-900 font-medium">{cert.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{cert.issuer}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{cert.issueDate}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{cert.expiryDate}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            cert.status === "Active" ? "bg-green-100 text-green-700" :
                            cert.status === "Expired" ? "bg-red-100 text-red-700" :
                            "bg-blue-100 text-blue-700"
                          }`}>
                            {cert.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          <button className="text-blue-600 hover:text-blue-800 transition-colors text-xs">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Payroll Tab */}
        {activeTab === "payroll" && (
          <div style={{ paddingTop: "12px", paddingBottom: "12px", paddingLeft: "16px", paddingRight: "16px", backgroundColor: "#FFFFFF" }}>
            <div className="space-y-3">
              {/* Salary Information Card */}
              <div style={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                padding: "10px 12px"
              }}>
                <div className="flex items-start gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 600 }}>Salary Information</h2>
                    <p className="text-xs text-gray-600 mt-0.5" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>View your current salary details and compensation.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-2">
                  {/* Annual Salary */}
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Annual Salary</label>
                    <p
                      className="text-sm font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                      style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}
                      onClick={() => setShowSalary(!showSalary)}
                      title="Click to toggle visibility"
                    >
                      {showSalary ? "$95,000.00" : "**********"}
                    </p>
                  </div>

                  {/* Pay Frequency */}
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Pay Frequency</label>
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>Bi-weekly</p>
                  </div>

                  {/* Currency */}
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Currency</label>
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>USD</p>
                  </div>

                  {/* Last Salary Review */}
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Last Salary Review</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>March 15, 2024</p>
                    </div>
                  </div>

                  {/* SIN */}
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>SIN</label>
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>12-3456789</p>
                  </div>

                  {/* Bank Account */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Bank Account</label>
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>****5678</p>
                  </div>
                </div>
              </div>

              {/* Payslip History Card */}
              <div style={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                padding: "10px 12px",
                overflowX: "auto"
              }}>
                <h2 className="text-sm font-bold text-gray-900 mb-3" style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 600 }}>Payslip History</h2>
                <table className="w-full" style={{ fontFamily: "Poppins, sans-serif" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#F3F4F6", borderBottom: "1px solid #E5E7EB" }}>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Payroll Date</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Pay Period</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Gross Pay</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Deduction</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Net Pay</th>
                      <th className="px-4 py-3 text-center font-semibold text-xs text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payslips.map((payslip) => (
                      <tr key={payslip.id} style={{ borderBottom: "1px solid #E5E7EB" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}>
                        <td className="px-4 py-3 text-sm text-gray-900 font-medium">{payslip.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{payslip.payPeriod}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-semibold">{payslip.grossPay}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{payslip.deduction}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-semibold">{payslip.netPay}</td>
                        <td className="px-4 py-3 text-center">
                          <button className="text-blue-600 hover:text-blue-800 transition-colors text-xs flex items-center gap-1 justify-center mx-auto" title="Download">
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === "performance" && (
          <div style={{ paddingTop: "12px", paddingBottom: "12px", paddingLeft: "16px", paddingRight: "16px", backgroundColor: "#FFFFFF" }}>
            <div className="space-y-3">
              {/* Performance Summary Card */}
              <div style={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                padding: "10px 12px"
              }}>
                <div className="flex items-start gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 600 }}>Performance Summary</h2>
                    <p className="text-xs text-gray-600 mt-0.5" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Your current performance metrics and ratings.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-2">
                  {/* Overall Rating */}
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Overall Rating</label>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold text-blue-600" style={{ fontFamily: "Poppins, sans-serif" }}>4.5</p>
                      <p className="text-sm text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>/5.0</p>
                    </div>
                  </div>

                  {/* Review Frequency */}
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Last Review Date</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>September 30, 2024</p>
                    </div>
                  </div>

                  {/* Goals Completion */}
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Goals Completed</label>
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>8/10</p>
                  </div>

                  {/* Next Review */}
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Next Review</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>March 31, 2025</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Summary Card */}
              <div style={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                padding: "10px 12px",
                overflowX: "auto"
              }}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h2 className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 600 }}>Skills Summary</h2>
                  <button
                    onClick={() => setEditModalType("skills")}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-xs font-medium"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Add Skill
                  </button>
                </div>
                <table className="w-full" style={{ fontFamily: "Poppins, sans-serif" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#F3F4F6", borderBottom: "1px solid #E5E7EB" }}>
                      <th className="px-3 py-2 text-left" style={{ fontSize: "11px", fontWeight: 600, color: "#111827" }}>Skill Name</th>
                      <th className="px-3 py-2 text-left" style={{ fontSize: "11px", fontWeight: 600, color: "#111827" }}>Experience (Years)</th>
                      <th className="px-3 py-2 text-left" style={{ fontSize: "11px", fontWeight: 600, color: "#111827" }}>Skill Level</th>
                      <th className="px-3 py-2 text-center" style={{ fontSize: "11px", fontWeight: 600, color: "#111827" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skills.map((skill) => (
                      <tr key={skill.id} style={{ borderBottom: "1px solid #E5E7EB" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}>
                        <td className="px-3 py-2" style={{ fontSize: "11px", fontWeight: 500, color: "#111827" }}>{skill.name}</td>
                        <td className="px-3 py-2" style={{ fontSize: "11px", color: "#4B5563" }}>{skill.experience}</td>
                        <td className="px-3 py-2" style={{ fontSize: "11px", color: "#4B5563" }}>
                          <span className={
                            skill.level === "Expert" ? "px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800" :
                            skill.level === "Advanced" ? "px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800" :
                            skill.level === "Intermediate" ? "px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800" :
                            "px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          }>
                            {skill.level}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <button className="text-blue-600 hover:text-blue-800 transition-colors" title="Edit">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Leave & Attendance Tab */}
        {activeTab === "leaveAttendance" && (
          <div style={{ paddingTop: "12px", paddingBottom: "12px", paddingLeft: "16px", paddingRight: "16px", backgroundColor: "#FFFFFF" }}>
            <div className="space-y-3">
              {/* Apply for Leave Button */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "12px" }}>
                <button
                  onClick={() => setShowLeaveModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
                  style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}
                >
                  <Plus className="w-3.5 h-3.5" />
                  Apply for Leave
                </button>
              </div>
              {/* Top 4 Metrics Cards Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px" }}>
                {/* Total Present Today */}
                <div style={{
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                  padding: "12px"
                }}>
                  <p className="text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Total Present Today</p>
                  <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>86</p>
                </div>

                {/* On Leave */}
                <div style={{
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                  padding: "12px"
                }}>
                  <p className="text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>On Leave</p>
                  <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>12</p>
                </div>

                {/* Pending Leave Request */}
                <div style={{
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                  padding: "12px"
                }}>
                  <p className="text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Pending Leave Request</p>
                  <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>5</p>
                </div>

                {/* Today's Late Arrival */}
                <div style={{
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                  padding: "12px"
                }}>
                  <p className="text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Today's Late Arrival</p>
                  <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>7</p>
                </div>
              </div>

              {/* Attendance Rate and Punctuality Rate - Single Row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {/* Attendance Rate */}
                <div style={{
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                  padding: "12px"
                }}>
                  <p className="text-xs font-medium text-gray-600 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>Attendance Rate</p>
                  <p className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>90.9%</p>
                  <div style={{ width: "100%", height: "6px", backgroundColor: "#E5E7EB", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{ width: "90.9%", height: "100%", backgroundColor: "#3B82F6", borderRadius: "3px" }}></div>
                  </div>
                </div>

                {/* Punctuality Rate */}
                <div style={{
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                  padding: "12px"
                }}>
                  <p className="text-xs font-medium text-gray-600 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>Punctuality Rate</p>
                  <p className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>95.5%</p>
                  <div style={{ width: "100%", height: "6px", backgroundColor: "#E5E7EB", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{ width: "95.5%", height: "100%", backgroundColor: "#14B8A6", borderRadius: "3px" }}></div>
                  </div>
                </div>
              </div>

              {/* Leave Balance */}
              <div style={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                padding: "10px 12px",
                overflowX: "auto"
              }}>
                <h2 className="text-sm font-bold text-gray-900 mb-3" style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 600 }}>Leave Balance</h2>
                <table className="w-full" style={{ fontFamily: "Poppins, sans-serif" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#F3F4F6", borderBottom: "1px solid #E5E7EB" }}>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Leave Type</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Leave Taken</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Leave Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #E5E7EB" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}>
                      <td className="px-4 py-3 text-sm text-gray-700">Annual Leave</td>
                      <td className="px-4 py-3 text-sm text-gray-700">7</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">13</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #E5E7EB" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}>
                      <td className="px-4 py-3 text-sm text-gray-700">Sick Leave</td>
                      <td className="px-4 py-3 text-sm text-gray-700">3</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">7</td>
                    </tr>
                    <tr onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}>
                      <td className="px-4 py-3 text-sm text-gray-700">Personal Leave</td>
                      <td className="px-4 py-3 text-sm text-gray-700">2</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">4</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Leave History */}
              <div style={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                padding: "10px 12px",
                overflowX: "auto"
              }}>
                <h2 className="text-sm font-bold text-gray-900 mb-3" style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 600 }}>Leave History</h2>
                <table className="w-full" style={{ fontFamily: "Poppins, sans-serif" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#F3F4F6", borderBottom: "1px solid #E5E7EB" }}>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Leave Type</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Duration</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Total Days</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Approved By</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Status</th>
                      <th className="px-4 py-3 text-left font-semibold text-xs text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Sick Leave */}
                    <tr style={{ borderBottom: "1px solid #E5E7EB" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}>
                      <td className="px-4 py-3 text-sm text-gray-700">Sick Leave</td>
                      <td className="px-4 py-3 text-sm text-gray-700">03-15-2024 – 03-17-2024</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">3</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Michael Rodriguez</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-block rounded-lg px-3 py-1 font-semibold text-xs" style={{ backgroundColor: "#d4edda", color: "#155724" }}>Approved</span>
                      </td>
                      <td className="px-4 py-3 text-sm relative">
                        <button
                          onClick={() => setOpenLeaveMenu(openLeaveMenu === 1 ? null : 1)}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                          title="Actions"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {openLeaveMenu === 1 && (
                          <div
                            className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                              <Eye className="w-4 h-4" />
                              View Details
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>

                    {/* Annual Leave */}
                    <tr style={{ borderBottom: "1px solid #E5E7EB" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}>
                      <td className="px-4 py-3 text-sm text-gray-700">Annual Leave</td>
                      <td className="px-4 py-3 text-sm text-gray-700">01-08-2024 – 01-12-2024</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">5</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Michael Rodriguez</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-block rounded-lg px-3 py-1 font-semibold text-xs" style={{ backgroundColor: "#d4edda", color: "#155724" }}>Approved</span>
                      </td>
                      <td className="px-4 py-3 text-sm relative">
                        <button
                          onClick={() => setOpenLeaveMenu(openLeaveMenu === 2 ? null : 2)}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                          title="Actions"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {openLeaveMenu === 2 && (
                          <div
                            className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                              <Eye className="w-4 h-4" />
                              View Details
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>

                    {/* Personal Leave */}
                    <tr style={{ borderBottom: "1px solid #E5E7EB" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}>
                      <td className="px-4 py-3 text-sm text-gray-700">Personal Leave</td>
                      <td className="px-4 py-3 text-sm text-gray-700">04-22-2024 – 04-22-2024</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">1</td>
                      <td className="px-4 py-3 text-sm text-gray-700"></td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-block rounded-lg px-3 py-1 font-semibold text-xs" style={{ backgroundColor: "#fff3cd", color: "#856404" }}>Under Review</span>
                      </td>
                      <td className="px-4 py-3 text-sm relative">
                        <button
                          onClick={() => setOpenLeaveMenu(openLeaveMenu === 3 ? null : 3)}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                          title="Actions"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {openLeaveMenu === 3 && (
                          <div
                            className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                              <Eye className="w-4 h-4" />
                              View Details
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>

                    {/* Annual Leave Rejected */}
                    <tr onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}>
                      <td className="px-4 py-3 text-sm text-gray-700">Annual Leave</td>
                      <td className="px-4 py-3 text-sm text-gray-700">05-10-2024 – 05-14-2024</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">5</td>
                      <td className="px-4 py-3 text-sm text-gray-700"></td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-block rounded-lg px-3 py-1 font-semibold text-xs" style={{ backgroundColor: "#f8d7da", color: "#721c24" }}>Rejected</span>
                      </td>
                      <td className="px-4 py-3 text-sm relative">
                        <button
                          onClick={() => setOpenLeaveMenu(openLeaveMenu === 4 ? null : 4)}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                          title="Actions"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {openLeaveMenu === 4 && (
                          <div
                            className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                              <Eye className="w-4 h-4" />
                              View Details
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Apply for Leave Modal */}
        {showLeaveModal && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: "16px"
          }}>
            <div style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.15)"
            }}>
              {/* Modal Header */}
              <div style={{
                padding: "20px 24px",
                borderBottom: "1px solid #E5E7EB",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "18px", fontWeight: 600, color: "#111827" }}>
                  Apply for Leave
                </h2>
                <button
                  onClick={() => setShowLeaveModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div style={{ padding: "24px" }}>
                <div className="space-y-4">
                  {/* Leave Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Leave Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={leaveForm.leaveType}
                      onChange={(e) => setLeaveForm({ ...leaveForm, leaveType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                    >
                      <option value="Annual Leave">Annual Leave</option>
                      <option value="Sick Leave">Sick Leave</option>
                      <option value="Personal Leave">Personal Leave</option>
                      <option value="Emergency Leave">Emergency Leave</option>
                      <option value="Maternity/Paternity Leave">Maternity/Paternity Leave</option>
                    </select>
                  </div>

                  {/* Date Range */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={leaveForm.startDate}
                        onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                        End Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={leaveForm.endDate}
                        onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                      />
                    </div>
                  </div>

                  {/* Approver Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Select Approver <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={leaveForm.approver}
                      onChange={(e) => setLeaveForm({ ...leaveForm, approver: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                    >
                      <option value="">Select an approver...</option>
                      <option value="Michael Rodriguez">Michael Rodriguez - Manager</option>
                      <option value="Jennifer Smith">Jennifer Smith - HR Director</option>
                      <option value="David Chen">David Chen - Department Head</option>
                      <option value="Emily Brown">Emily Brown - VP Operations</option>
                    </select>
                  </div>

                  {/* Reason for Leave */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Reason for Leave <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={leaveForm.reason}
                      onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                      rows={4}
                      placeholder="Please provide a brief reason for your leave request..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                    />
                  </div>

                  {/* Document Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Attach Documents (Optional)
                    </label>
                    <div style={{
                      border: "2px dashed #D1D5DB",
                      borderRadius: "8px",
                      padding: "20px",
                      textAlign: "center",
                      backgroundColor: "#F9FAFB"
                    }}>
                      <input
                        type="file"
                        multiple
                        onChange={(e) => {
                          if (e.target.files) {
                            setUploadedFiles(Array.from(e.target.files));
                          }
                        }}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer"
                      >
                        <Paperclip className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px", color: "#6B7280" }}>
                          Click to upload or drag and drop
                        </p>
                        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px", color: "#9CA3AF", marginTop: "4px" }}>
                          PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                        </p>
                      </label>
                    </div>
                    {uploadedFiles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-700">{file.name}</span>
                              <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                            </div>
                            <button
                              onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div style={{
                padding: "16px 24px",
                borderTop: "1px solid #E5E7EB",
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px"
              }}>
                <button
                  onClick={() => {
                    setShowLeaveModal(false);
                    setLeaveForm({ leaveType: "Annual Leave", startDate: "", endDate: "", reason: "", approver: "" });
                    setUploadedFiles([]);
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px", fontWeight: 500 }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle form submission here
                    console.log("Leave application submitted:", leaveForm, uploadedFiles);
                    setShowLeaveModal(false);
                    setLeaveForm({ leaveType: "Annual Leave", startDate: "", endDate: "", reason: "", approver: "" });
                    setUploadedFiles([]);
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px", fontWeight: 500 }}
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div style={{ paddingTop: "12px", paddingBottom: "12px", paddingLeft: "16px", paddingRight: "16px", backgroundColor: "#FFFFFF" }}>
            <div className="space-y-3">
              {/* Header and Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                <h2 className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 600 }}>Employee Documents</h2>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  {showDocCheckboxes && (
                    <button
                      onClick={handleCancelSelection}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                      style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}
                    >
                      <X className="w-3.5 h-3.5" />
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={handleDownloadSelected}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                    style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}
                    disabled={showDocCheckboxes && selectedDocs.length === 0}
                  >
                    <Download className="w-3.5 h-3.5" />
                    {showDocCheckboxes ? `Download ${selectedDocs.length > 0 ? `(${selectedDocs.length})` : ''}` : 'Download'}
                  </button>
                </div>
              </div>

              {/* Documents Table */}
              <div style={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                padding: "10px 12px",
                overflowX: "auto"
              }}>
                <table className="w-full" style={{ fontFamily: "Poppins, sans-serif" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#FAFBFC", borderBottom: "1px solid #E5E7EB" }}>
                      {showDocCheckboxes && (
                        <th className="px-3 py-2 text-center font-semibold text-xs text-gray-700" style={{ width: "40px" }}>
                          <input
                            type="checkbox"
                            checked={selectedDocs.length === documents.length && documents.length > 0}
                            onChange={toggleSelectAll}
                            className="cursor-pointer"
                            style={{ width: "16px", height: "16px" }}
                          />
                        </th>
                      )}
                      <th className="px-3 py-2 text-left font-semibold text-xs text-gray-700">Document Title</th>
                      <th className="px-3 py-2 text-left font-semibold text-xs text-gray-700">File Type</th>
                      <th className="px-3 py-2 text-left font-semibold text-xs text-gray-700">File Size</th>
                      <th className="px-3 py-2 text-left font-semibold text-xs text-gray-700">Upload Date</th>
                      <th className="px-3 py-2 text-center font-semibold text-xs text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => (
                      <tr
                        key={doc.id}
                        style={{ borderBottom: "1px solid #E5E7EB" }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        {showDocCheckboxes && (
                          <td className="px-3 py-2.5 text-center">
                            <input
                              type="checkbox"
                              checked={selectedDocs.includes(doc.id)}
                              onChange={() => toggleDocSelection(doc.id)}
                              className="cursor-pointer"
                              style={{ width: "16px", height: "16px" }}
                            />
                          </td>
                        )}
                        <td className="px-3 py-2.5 text-sm text-gray-900">{doc.title}</td>
                        <td className="px-3 py-2.5 text-sm text-gray-600">{doc.fileType}</td>
                        <td className="px-3 py-2.5 text-sm text-gray-600">{doc.fileSize}</td>
                        <td className="px-3 py-2.5 text-sm text-gray-600">{doc.uploadDate}</td>
                        <td className="px-3 py-2.5 text-center">
                          <button
                            className="text-blue-600 hover:text-blue-800 transition-colors hover:bg-blue-50 rounded p-1"
                            title="Download"
                            onClick={() => {
                              console.log(`Downloading: ${doc.title}`);
                              alert(`Downloading ${doc.title}...`);
                            }}
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg text-white text-sm font-medium z-50 ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Edit Personal Modal */}
      {editModalType === "personal" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between gap-2 mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Edit Personal Information</h2>
              <button onClick={() => setEditModalType(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  value={personalForm.firstName}
                  onChange={(e) => setPersonalForm({...personalForm, firstName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value={personalForm.lastName}
                  onChange={(e) => setPersonalForm({...personalForm, lastName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="text"
                  value={personalForm.dateOfBirth}
                  onChange={(e) => setPersonalForm({...personalForm, dateOfBirth: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={personalForm.gender}
                  onChange={(e) => setPersonalForm({...personalForm, gender: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setEditModalType(null)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                  Cancel
                </button>
                <button onClick={() => handleEditSubmit("personal")} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Contact Modal */}
      {editModalType === "contact" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between gap-2 mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Edit Contact Information</h2>
              <button onClick={() => setEditModalType(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Personal Email</label>
                <input
                  type="email"
                  value={contactForm.personalEmail}
                  onChange={(e) => setContactForm({...contactForm, personalEmail: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
                <input
                  type="email"
                  value={contactForm.workEmail}
                  onChange={(e) => setContactForm({...contactForm, workEmail: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input
                  type="text"
                  value={contactForm.street}
                  onChange={(e) => setContactForm({...contactForm, street: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={contactForm.city}
                    onChange={(e) => setContactForm({...contactForm, city: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={contactForm.state}
                    onChange={(e) => setContactForm({...contactForm, state: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                <input
                  type="text"
                  value={contactForm.zipCode}
                  onChange={(e) => setContactForm({...contactForm, zipCode: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button onClick={() => setEditModalType(null)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                Cancel
              </button>
              <button onClick={() => handleEditSubmit("contact")} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Training Modal */}
      {editModalType === "training" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between gap-2 mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Add Training & Certification</h2>
              <button onClick={() => setEditModalType(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name</label>
                <input
                  type="text"
                  value={trainingForm.name}
                  onChange={(e) => setTrainingForm({...trainingForm, name: e.target.value})}
                  placeholder="e.g., AWS Solutions Architect"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
                <input
                  type="text"
                  value={trainingForm.issuer}
                  onChange={(e) => setTrainingForm({...trainingForm, issuer: e.target.value})}
                  placeholder="e.g., Amazon Web Services"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={trainingForm.issueDate}
                    onChange={(e) => setTrainingForm({...trainingForm, issueDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={trainingForm.expiryDate}
                    onChange={(e) => setTrainingForm({...trainingForm, expiryDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setEditModalType(null)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                  Cancel
                </button>
                <button onClick={() => handleEditSubmit("training")} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                  Add Training
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </Layout>
  );
}
