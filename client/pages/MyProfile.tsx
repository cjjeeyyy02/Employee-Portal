import { useState } from "react";
import { Camera, Phone, Mail, Shield, Briefcase, Calendar, CheckCircle, DollarSign, TrendingUp, FileText, Download, Upload, Coffee, LogOut, Edit2, X } from "lucide-react";
import Layout from "@/components/Layout";

type TabType = "personal" | "contact" | "employment" | "payroll" | "performance" | "leaveAttendance" | "documents" | "training";
type EditModalType = "personal" | "contact" | "training" | null;

const tabs: { id: TabType; label: string }[] = [
  { id: "personal", label: "Personal" },
  { id: "contact", label: "Contact" },
  { id: "employment", label: "Employment" },
  { id: "training", label: "Training & Certification" },
  { id: "payroll", label: "Payroll" },
  { id: "performance", label: "Performance" },
  { id: "leaveAttendance", label: "Leave & Attendance" },
  { id: "documents", label: "Documents" },
];

interface Payslip {
  id: number;
  date: string;
  payPeriod: string;
  netPay: string;
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

  // Edit form states
  const [personalForm, setPersonalForm] = useState({ firstName: "Sarah", lastName: "Mitchell", dateOfBirth: "03-15-1990", gender: "Female", maritalStatus: "Single", nationality: "United States" });
  const [contactForm, setContactForm] = useState({ phone: "+1 234 567 890", personalEmail: "sarah.mitchell@email.com", workEmail: "sarah.m@company.com", street: "123 Main Street", city: "Los Angeles", state: "California", zipCode: "90001" });
  const [trainingForm, setTrainingForm] = useState({ name: "", issuer: "", issueDate: "", expiryDate: "" });

  const payslips: Payslip[] = [
    { id: 1, date: "Nov 30, 2024", payPeriod: "Nov 1 - Nov 30, 2024", netPay: "$3,750.00" },
    { id: 2, date: "Nov 15, 2024", payPeriod: "Nov 1 - Nov 15, 2024", netPay: "$1,875.00" },
    { id: 3, date: "Oct 31, 2024", payPeriod: "Oct 1 - Oct 31, 2024", netPay: "$3,750.00" },
    { id: 4, date: "Oct 15, 2024", payPeriod: "Oct 1 - Oct 15, 2024", netPay: "$1,875.00" },
  ];

  const trainings: Training[] = [
    { id: 1, name: "AWS Solutions Architect", issuer: "Amazon Web Services", issueDate: "06/20/2023", expiryDate: "06/20/2025", status: "Active" },
    { id: 2, name: "Project Management Professional", issuer: "PMI", issueDate: "03/15/2022", expiryDate: "03/15/2025", status: "Active" },
    { id: 3, name: "Leadership Development", issuer: "LinkedIn Learning", issueDate: "12/10/2023", expiryDate: "—", status: "Completed" },
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
        {/* Left Content - Avatar and Employee Details */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
          {/* Circular Avatar with Initials */}
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#DBEAFE",
            color: "#2563EB",
            fontWeight: 700,
            fontSize: "16px",
            fontFamily: "Poppins, sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}>
            SM
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
                <div className="flex items-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                  />
                  <h2 className="text-xs font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 600 }}>Personal Information</h2>
                </div>
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
                <h2 className="text-sm font-bold text-gray-900 mb-3" style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 600 }}>Previous Work History</h2>
                <table className="w-full" style={{ fontFamily: "Poppins, sans-serif" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#F3F4F6", borderBottom: "1px solid #E5E7EB" }}>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Company Name</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Position</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Duration</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Location</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Employment Type</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Reason for Leaving</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Nimbus Labs */}
                    <tr style={{ borderBottom: "1px solid #E5E7EB" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">Nimbus Labs</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Software Engineer</td>
                      <td className="px-4 py-3 text-sm text-gray-700">2 years</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Vancouver, Canada</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Full-time</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Career growth</td>
                    </tr>

                    {/* Aster Corp */}
                    <tr onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">Aster Corp</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Junior Developer</td>
                      <td className="px-4 py-3 text-sm text-gray-700">1.5 years</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Seattle, USA</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Full-time</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Relocation</td>
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
                  <Upload className="w-3.5 h-3.5" />
                  Add Training
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
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>$95,000.00</p>
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

                  {/* Tax ID */}
                  <div style={{ paddingBottom: "8px", borderBottom: "1px solid #E5E7EB" }}>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Tax ID</label>
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>12-3456789</p>
                  </div>

                  {/* Bank Account */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: "Poppins, sans-serif", fontSize: "11px" }}>Bank Account</label>
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>****5678</p>
                  </div>
                </div>
              </div>

              {/* Deductions Card */}
              <div style={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                padding: "10px 12px"
              }}>
                <h2 className="text-sm font-bold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 600 }}>Deductions & Benefits</h2>
                <div className="space-y-3">
                  {/* Health Insurance */}
                  <div className="flex justify-between items-start pb-3" style={{ borderBottom: "1px solid #E5E7EB" }}>
                    <span className="text-sm font-medium text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>Health Insurance</span>
                    <span className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>$450/month</span>
                  </div>

                  {/* 401k Contribution */}
                  <div className="flex justify-between items-start pb-3" style={{ borderBottom: "1px solid #E5E7EB" }}>
                    <span className="text-sm font-medium text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>401k Contribution</span>
                    <span className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>6%</span>
                  </div>

                  {/* Life Insurance */}
                  <div className="flex justify-between items-start pb-3" style={{ borderBottom: "1px solid #E5E7EB" }}>
                    <span className="text-sm font-medium text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>Life Insurance</span>
                    <span className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>Included</span>
                  </div>

                  {/* Dental & Vision */}
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>Dental & Vision</span>
                    <span className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>Included</span>
                  </div>
                </div>
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

              {/* Competencies Card */}
              <div style={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                padding: "10px 12px"
              }}>
                <h2 className="text-sm font-bold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 600 }}>Key Competencies</h2>
                <div className="space-y-2">
                  {/* Technical Skills */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>Technical Skills</span>
                      <span className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>Excellent</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>

                  {/* Communication */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>Communication</span>
                      <span className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>Good</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                  </div>

                  {/* Leadership */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>Leadership</span>
                      <span className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>Good</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>

                  {/* Problem Solving */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>Problem Solving</span>
                      <span className="text-sm font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>Excellent</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "88%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leave & Attendance Tab */}
        {activeTab === "leaveAttendance" && (
          <div style={{ paddingTop: "12px", paddingBottom: "12px", paddingLeft: "16px", paddingRight: "16px", backgroundColor: "#FFFFFF" }}>
            <div className="space-y-3">
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
                      <th className="px-4 py-3 text-center font-semibold text-sm text-gray-900">Leave Type</th>
                      <th className="px-4 py-3 text-center font-semibold text-sm text-gray-900">Leave Taken</th>
                      <th className="px-4 py-3 text-center font-semibold text-sm text-gray-900">Leave Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #E5E7EB" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">Annual Leave</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">7</td>
                      <td className="px-4 py-3 text-center text-sm font-bold text-gray-900">13</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #E5E7EB" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">Sick Leave</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">3</td>
                      <td className="px-4 py-3 text-center text-sm font-bold text-gray-900">7</td>
                    </tr>
                    <tr onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">Personal Leave</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">2</td>
                      <td className="px-4 py-3 text-center text-sm font-bold text-gray-900">4</td>
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
                      <th className="px-4 py-3 text-center font-semibold text-sm text-gray-900">Leave Type</th>
                      <th className="px-4 py-3 text-center font-semibold text-sm text-gray-900">Duration</th>
                      <th className="px-4 py-3 text-center font-semibold text-sm text-gray-900">Total Days</th>
                      <th className="px-4 py-3 text-center font-semibold text-sm text-gray-900">Approved By</th>
                      <th className="px-4 py-3 text-center font-semibold text-sm text-gray-900">Status</th>
                      <th className="px-4 py-3 text-center font-semibold text-sm text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Sick Leave */}
                    <tr style={{ borderBottom: "1px solid #E5E7EB" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">Sick Leave</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">03-15-2024 – 03-17-2024</td>
                      <td className="px-4 py-3 text-center text-sm font-bold text-gray-900">3</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">Michael Rodriguez</td>
                      <td className="px-4 py-3 text-center text-sm">
                        <span className="inline-block rounded-lg px-3 py-1 font-semibold text-xs" style={{ backgroundColor: "#d4edda", color: "#155724" }}>Approved</span>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">—</td>
                    </tr>

                    {/* Annual Leave */}
                    <tr style={{ borderBottom: "1px solid #E5E7EB" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">Annual Leave</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">01-08-2024 – 01-12-2024</td>
                      <td className="px-4 py-3 text-center text-sm font-bold text-gray-900">5</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">Michael Rodriguez</td>
                      <td className="px-4 py-3 text-center text-sm">
                        <span className="inline-block rounded-lg px-3 py-1 font-semibold text-xs" style={{ backgroundColor: "#d4edda", color: "#155724" }}>Approved</span>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">—</td>
                    </tr>

                    {/* Personal Leave */}
                    <tr style={{ borderBottom: "1px solid #E5E7EB" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">Personal Leave</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">04-22-2024 – 04-22-2024</td>
                      <td className="px-4 py-3 text-center text-sm font-bold text-gray-900">1</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">—</td>
                      <td className="px-4 py-3 text-center text-sm">
                        <span className="inline-block rounded-lg px-3 py-1 font-semibold text-xs" style={{ backgroundColor: "#fff3cd", color: "#856404" }}>Under Review</span>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">—</td>
                    </tr>

                    {/* Annual Leave Rejected */}
                    <tr onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">Annual Leave</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">05-10-2024 – 05-14-2024</td>
                      <td className="px-4 py-3 text-center text-sm font-bold text-gray-900">5</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">—</td>
                      <td className="px-4 py-3 text-center text-sm">
                        <span className="inline-block rounded-lg px-3 py-1 font-semibold text-xs" style={{ backgroundColor: "#f8d7da", color: "#721c24" }}>Rejected</span>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">—</td>
                    </tr>
                  </tbody>
                </table>
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
                  <button
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors"
                    style={{ 
                      borderColor: "#2563EB", 
                      color: "#2563EB",
                      fontFamily: "Poppins, sans-serif"
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLButtonElement).style.backgroundColor = "#EFF6FF";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLButtonElement).style.backgroundColor = "transparent";
                    }}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="text-xs">Download</span>
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
                      <th className="px-3 py-2 text-left font-semibold text-xs text-gray-700">Document Title</th>
                      <th className="px-3 py-2 text-left font-semibold text-xs text-gray-700">File Type</th>
                      <th className="px-3 py-2 text-left font-semibold text-xs text-gray-700">File Size</th>
                      <th className="px-3 py-2 text-left font-semibold text-xs text-gray-700">Upload Date</th>
                      <th className="px-3 py-2 text-center font-semibold text-xs text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Employment Contract */}
                    <tr style={{ borderBottom: "1px solid #E5E7EB" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                      <td className="px-3 py-2.5 text-sm text-gray-900">Employment Contract</td>
                      <td className="px-3 py-2.5 text-sm text-gray-600">PDF</td>
                      <td className="px-3 py-2.5 text-sm text-gray-600">2.4 MB</td>
                      <td className="px-3 py-2.5 text-sm text-gray-600">01/15/2023</td>
                      <td className="px-3 py-2.5 text-center">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors hover:bg-blue-50 rounded p-1" title="Download">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>

                    {/* Tax Forms */}
                    <tr style={{ borderBottom: "1px solid #E5E7EB" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                      <td className="px-3 py-2.5 text-sm text-gray-900">Tax Forms (W-2)</td>
                      <td className="px-3 py-2.5 text-sm text-gray-600">PDF</td>
                      <td className="px-3 py-2.5 text-sm text-gray-600">1.8 MB</td>
                      <td className="px-3 py-2.5 text-sm text-gray-600">12/31/2023</td>
                      <td className="px-3 py-2.5 text-center">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors hover:bg-blue-50 rounded p-1" title="Download">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>

                    {/* Performance Review */}
                    <tr style={{ borderBottom: "1px solid #E5E7EB" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                      <td className="px-3 py-2.5 text-sm text-gray-900">Performance Review 2023</td>
                      <td className="px-3 py-2.5 text-sm text-gray-600">DOCX</td>
                      <td className="px-3 py-2.5 text-sm text-gray-600">856 KB</td>
                      <td className="px-3 py-2.5 text-sm text-gray-600">11/20/2023</td>
                      <td className="px-3 py-2.5 text-center">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors hover:bg-blue-50 rounded p-1" title="Download">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>

                    {/* Benefits Enrollment */}
                    <tr style={{ borderBottom: "1px solid #E5E7EB" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                      <td className="px-3 py-2.5 text-sm text-gray-900">Benefits Enrollment</td>
                      <td className="px-3 py-2.5 text-sm text-gray-600">PDF</td>
                      <td className="px-3 py-2.5 text-sm text-gray-600">3.1 MB</td>
                      <td className="px-3 py-2.5 text-sm text-gray-600">03/10/2023</td>
                      <td className="px-3 py-2.5 text-center">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors hover:bg-blue-50 rounded p-1" title="Download">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>

                    {/* Training Certificate */}
                    <tr onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                      <td className="px-3 py-2.5 text-sm text-gray-900">Training Certificate</td>
                      <td className="px-3 py-2.5 text-sm text-gray-600">PDF</td>
                      <td className="px-3 py-2.5 text-sm text-gray-600">1.2 MB</td>
                      <td className="px-3 py-2.5 text-sm text-gray-600">08/15/2023</td>
                      <td className="px-3 py-2.5 text-center">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors hover:bg-blue-50 rounded p-1" title="Download">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

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
