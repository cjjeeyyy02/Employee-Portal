import { useState } from "react";
import { Camera, Phone, Mail, Shield, Briefcase, Calendar, CheckCircle, DollarSign, TrendingUp, FileText } from "lucide-react";
import Layout from "@/components/Layout";

type TabType = "personal" | "contact" | "emergency" | "employment" | "payroll" | "performance" | "documents";

const tabs: { id: TabType; label: string }[] = [
  { id: "personal", label: "Personal" },
  { id: "contact", label: "Contact" },
  { id: "emergency", label: "Emergency" },
  { id: "employment", label: "Employment" },
  { id: "payroll", label: "Payroll" },
  { id: "performance", label: "Performance" },
  { id: "documents", label: "Documents" },
];

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState<TabType>("personal");

  return (
    <Layout>
      {/* Header Section */}
      <div className="mb-6 animate-fadeIn">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">My Profile</h1>
        <p className="text-sm text-gray-600">View and manage your profile information</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 font-semibold text-sm border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-blue-600"
                  : "text-gray-600 border-b-transparent hover:text-gray-900 hover:bg-blue-50 px-2 py-1 rounded"
              }`}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Photo Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-8 text-center">Profile Photo</h2>
              <div className="flex flex-col items-center">
                <div className="relative mb-6 group">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
                    alt="Profile"
                    className="w-36 h-36 rounded-full object-cover border-2 border-gray-200 shadow-md transition-transform duration-300 group-hover:scale-105"
                  />
                  <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 text-center">Click the camera icon to upload a new photo</p>
              </div>
            </div>

            {/* Personal Information Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h2>
              <div className="space-y-5">
                {/* First Name & Middle Name Row */}
                <div className="grid grid-cols-2 gap-8">
                  <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 hover:border-transparent p-2 rounded transition-colors">
                    <label className="block text-xs font-medium text-gray-600 mb-2">First Name</label>
                    <p className="text-base font-bold text-gray-900">Sarah</p>
                  </div>
                  <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 hover:border-transparent p-2 rounded transition-colors">
                    <label className="block text-xs font-medium text-gray-600 mb-2">Middle Name</label>
                    <p className="text-base font-bold text-gray-900">—</p>
                  </div>
                </div>

                {/* Last Name */}
                <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 hover:border-transparent p-2 rounded transition-colors">
                  <label className="block text-xs font-medium text-gray-600 mb-2">Last Name</label>
                  <p className="text-base font-bold text-gray-900">Mitchell</p>
                </div>

                {/* Date of Birth */}
                <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 hover:border-transparent p-2 rounded transition-colors">
                  <label className="block text-xs font-medium text-gray-600 mb-2">Date of Birth</label>
                  <p className="text-base font-bold text-gray-900">03-15-1990</p>
                </div>

                {/* Gender & Marital Status Row */}
                <div className="grid grid-cols-2 gap-8">
                  <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 hover:border-transparent p-2 rounded transition-colors">
                    <label className="block text-xs font-medium text-gray-600 mb-2">Gender</label>
                    <p className="text-base font-bold text-gray-900">Female</p>
                  </div>
                  <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 hover:border-transparent p-2 rounded transition-colors">
                    <label className="block text-xs font-medium text-gray-600 mb-2">Marital Status</label>
                    <p className="text-base font-bold text-gray-900">Single</p>
                  </div>
                </div>

                {/* Nationality */}
                <div className="hover:bg-blue-50 hover:border-transparent p-2 rounded transition-colors">
                  <label className="block text-xs font-medium text-gray-600 mb-2">Nationality</label>
                  <p className="text-base font-bold text-gray-900">United States</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div className="space-y-6">
            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-base font-bold text-gray-900 mb-1">Contact Information</h2>
              <p className="text-xs text-gray-600 mb-4">Keep your contact details up to date for important communications</p>

              <div className="space-y-3">
                {/* Email Address */}
                <div className="flex items-start gap-3 pb-3 border-b border-gray-100 hover:bg-blue-50 p-1.5 rounded transition-colors">
                  <Mail className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-gray-900">john.doe@company.com</p>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium whitespace-nowrap">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Phone */}
                <div className="flex items-start gap-3 pb-3 border-b border-gray-100 hover:bg-blue-50 p-1.5 rounded transition-colors">
                  <Phone className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Primary Phone</label>
                    <p className="text-sm font-bold text-gray-900">+1 (555) 123-4567</p>
                  </div>
                </div>

                {/* Alternate Phone */}
                <div className="flex items-start gap-3 hover:bg-blue-50 p-1.5 rounded transition-colors">
                  <Phone className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Alternate Phone</label>
                    <p className="text-sm font-bold text-gray-900">+1 (555) 987-6543</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-base font-bold text-gray-900 mb-4">Address</h2>
              <div className="space-y-3">
                {/* Street Address */}
                <div className="pb-3 border-b border-gray-100 hover:bg-blue-50 p-1.5 rounded transition-colors">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Street Address</label>
                  <p className="text-sm font-bold text-gray-900">123 Main Street</p>
                </div>

                {/* City & State Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="pb-3 border-b border-gray-100 hover:bg-blue-50 p-1.5 rounded transition-colors">
                    <label className="block text-xs font-medium text-gray-600 mb-1">City</label>
                    <p className="text-sm font-bold text-gray-900">New York</p>
                  </div>
                  <div className="pb-3 border-b border-gray-100 hover:bg-blue-50 p-1.5 rounded transition-colors">
                    <label className="block text-xs font-medium text-gray-600 mb-1">State</label>
                    <p className="text-sm font-bold text-gray-900">NY</p>
                  </div>
                </div>

                {/* ZIP Code & Country Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="pb-3 border-b border-gray-100 hover:bg-blue-50 p-1.5 rounded transition-colors">
                    <label className="block text-xs font-medium text-gray-600 mb-1">ZIP Code</label>
                    <p className="text-sm font-bold text-gray-900">10001</p>
                  </div>
                  <div className="hover:bg-blue-50 p-1.5 rounded transition-colors">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Country</label>
                    <p className="text-sm font-bold text-gray-900">United States</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Tab */}
        {activeTab === "emergency" && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-base font-bold text-gray-900">Emergency Contact</h2>
                <p className="text-xs text-gray-600 mt-0.5">Provide emergency contact information for urgent situations.</p>
              </div>
            </div>

            {/* Information Section */}
            <div className="space-y-3">
              {/* Contact Name & Relationship Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="pb-3 border-b border-gray-100 hover:bg-blue-50 p-1.5 rounded transition-colors">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Contact Name</label>
                  <p className="text-sm font-bold text-gray-900">Jane Doe</p>
                </div>

                <div className="pb-3 border-b border-gray-100 hover:bg-blue-50 p-1.5 rounded transition-colors">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Relationship</label>
                  <p className="text-sm font-bold text-gray-900">Spouse</p>
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex items-start gap-3 hover:bg-blue-50 p-1.5 rounded transition-colors">
                <Phone className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
                  <p className="text-sm font-bold text-gray-900">+1 (555) 456-7890</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Employment Tab */}
        {activeTab === "employment" && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            {/* Header */}
            <div className="flex items-start gap-3 mb-8">
              <Briefcase className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-bold text-gray-900">Employment Information</h2>
                <p className="text-sm text-gray-600 mt-1">View your employment details and work information.</p>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
              {/* Employee ID */}
              <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 p-2 rounded transition-colors">
                <label className="block text-xs font-medium text-gray-600 mb-2">Employee ID</label>
                <p className="text-base font-bold text-gray-900">EMP-2023-1156</p>
              </div>

              {/* Start Date */}
              <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 p-2 rounded transition-colors">
                <label className="block text-xs font-medium text-gray-600 mb-2">Start Date</label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <p className="text-base font-bold text-gray-900">March 15, 2020</p>
                </div>
              </div>

              {/* Job Title */}
              <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 p-2 rounded transition-colors">
                <label className="block text-xs font-medium text-gray-600 mb-2">Job Title</label>
                <p className="text-base font-bold text-gray-900">Senior Software Developer</p>
              </div>

              {/* Employment Type */}
              <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 p-2 rounded transition-colors">
                <label className="block text-xs font-medium text-gray-600 mb-2">Employment Type</label>
                <span className="inline-block rounded-full px-3 py-1 bg-blue-100 text-blue-700 font-semibold text-xs">
                  Full-time
                </span>
              </div>

              {/* Department */}
              <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 p-2 rounded transition-colors">
                <label className="block text-xs font-medium text-gray-600 mb-2">Department</label>
                <p className="text-base font-bold text-gray-900">Engineering</p>
              </div>

              {/* Work Location */}
              <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 p-2 rounded transition-colors">
                <label className="block text-xs font-medium text-gray-600 mb-2">Work Location</label>
                <p className="text-base font-bold text-gray-900">New York Office</p>
              </div>

              {/* Manager */}
              <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 p-2 rounded transition-colors">
                <label className="block text-xs font-medium text-gray-600 mb-2">Manager</label>
                <p className="text-base font-bold text-gray-900">Sarah Johnson</p>
              </div>

              {/* Status */}
              <div className="hover:bg-blue-50 p-2 rounded transition-colors">
                <label className="block text-xs font-medium text-gray-600 mb-2">Status</label>
                <span className="inline-block rounded-full px-3 py-1 bg-green-600 text-white font-semibold text-xs">
                  Active
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Payroll Tab */}
        {activeTab === "payroll" && (
          <div className="space-y-6">
            {/* Salary Information Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3 mb-8">
                <DollarSign className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Salary Information</h2>
                  <p className="text-sm text-gray-600 mt-1">View your current salary details and compensation.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                {/* Annual Salary */}
                <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 p-2 rounded transition-colors">
                  <label className="block text-xs font-medium text-gray-600 mb-2">Annual Salary</label>
                  <p className="text-base font-bold text-gray-900">$95,000.00</p>
                </div>

                {/* Pay Frequency */}
                <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 p-2 rounded transition-colors">
                  <label className="block text-xs font-medium text-gray-600 mb-2">Pay Frequency</label>
                  <p className="text-base font-bold text-gray-900">Bi-weekly</p>
                </div>

                {/* Currency */}
                <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 p-2 rounded transition-colors">
                  <label className="block text-xs font-medium text-gray-600 mb-2">Currency</label>
                  <p className="text-base font-bold text-gray-900">USD</p>
                </div>

                {/* Last Salary Review */}
                <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 p-2 rounded transition-colors">
                  <label className="block text-xs font-medium text-gray-600 mb-2">Last Salary Review</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <p className="text-base font-bold text-gray-900">March 15, 2024</p>
                  </div>
                </div>

                {/* Tax ID */}
                <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 p-2 rounded transition-colors">
                  <label className="block text-xs font-medium text-gray-600 mb-2">Tax ID</label>
                  <p className="text-base font-bold text-gray-900">12-3456789</p>
                </div>

                {/* Bank Account */}
                <div className="hover:bg-blue-50 p-2 rounded transition-colors">
                  <label className="block text-xs font-medium text-gray-600 mb-2">Bank Account</label>
                  <p className="text-base font-bold text-gray-900">****5678</p>
                </div>
              </div>
            </div>

            {/* Deductions Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Deductions & Benefits</h2>
              <div className="space-y-3">
                {/* Health Insurance */}
                <div className="flex justify-between items-start pb-3 border-b border-gray-100 hover:bg-blue-50 p-1.5 rounded transition-colors">
                  <span className="text-sm font-medium text-gray-700">Health Insurance</span>
                  <span className="text-sm font-bold text-gray-900">$450/month</span>
                </div>

                {/* 401k Contribution */}
                <div className="flex justify-between items-start pb-3 border-b border-gray-100 hover:bg-blue-50 p-1.5 rounded transition-colors">
                  <span className="text-sm font-medium text-gray-700">401k Contribution</span>
                  <span className="text-sm font-bold text-gray-900">6%</span>
                </div>

                {/* Life Insurance */}
                <div className="flex justify-between items-start pb-3 border-b border-gray-100 hover:bg-blue-50 p-1.5 rounded transition-colors">
                  <span className="text-sm font-medium text-gray-700">Life Insurance</span>
                  <span className="text-sm font-bold text-gray-900">Included</span>
                </div>

                {/* Dental & Vision */}
                <div className="flex justify-between items-start hover:bg-blue-50 p-1.5 rounded transition-colors">
                  <span className="text-sm font-medium text-gray-700">Dental & Vision</span>
                  <span className="text-sm font-bold text-gray-900">Included</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === "performance" && (
          <div className="space-y-6">
            {/* Performance Summary Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3 mb-8">
                <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Performance Summary</h2>
                  <p className="text-sm text-gray-600 mt-1">Your current performance metrics and ratings.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                {/* Overall Rating */}
                <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 p-2 rounded transition-colors">
                  <label className="block text-xs font-medium text-gray-600 mb-2">Overall Rating</label>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-blue-600">4.5</p>
                    <p className="text-sm text-gray-600">/5.0</p>
                  </div>
                </div>

                {/* Review Frequency */}
                <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 p-2 rounded transition-colors">
                  <label className="block text-xs font-medium text-gray-600 mb-2">Last Review Date</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <p className="text-base font-bold text-gray-900">September 30, 2024</p>
                  </div>
                </div>

                {/* Goals Completion */}
                <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 p-2 rounded transition-colors">
                  <label className="block text-xs font-medium text-gray-600 mb-2">Goals Completed</label>
                  <p className="text-base font-bold text-gray-900">8/10</p>
                </div>

                {/* Next Review */}
                <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 p-2 rounded transition-colors">
                  <label className="block text-xs font-medium text-gray-600 mb-2">Next Review</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <p className="text-base font-bold text-gray-900">March 31, 2025</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Competencies Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Key Competencies</h2>
              <div className="space-y-4">
                {/* Technical Skills */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">Technical Skills</span>
                    <span className="text-sm font-bold text-gray-900">Excellent</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>

                {/* Communication */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">Communication</span>
                    <span className="text-sm font-bold text-gray-900">Good</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>

                {/* Leadership */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">Leadership</span>
                    <span className="text-sm font-bold text-gray-900">Good</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>

                {/* Problem Solving */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">Problem Solving</span>
                    <span className="text-sm font-bold text-gray-900">Excellent</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "88%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div className="space-y-6">
            {/* Important Documents Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3 mb-8">
                <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Important Documents</h2>
                  <p className="text-sm text-gray-600 mt-1">Access and manage your work-related documents.</p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Offer Letter */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Offer Letter</p>
                      <p className="text-xs text-gray-600">March 15, 2020</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-100 rounded transition-colors">
                    Download
                  </button>
                </div>

                {/* Employment Contract */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Employment Contract</p>
                      <p className="text-xs text-gray-600">March 15, 2020</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-100 rounded transition-colors">
                    Download
                  </button>
                </div>

                {/* Company Handbook */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Company Handbook</p>
                      <p className="text-xs text-gray-600">January 10, 2024</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-100 rounded transition-colors">
                    Download
                  </button>
                </div>

                {/* Privacy Policy */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Privacy Policy</p>
                      <p className="text-xs text-gray-600">June 1, 2023</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-100 rounded transition-colors">
                    Download
                  </button>
                </div>
              </div>
            </div>

            {/* Certification & Licenses Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Certifications & Licenses</h2>
              <div className="space-y-3">
                {/* AWS Certification */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
                  <div>
                    <p className="text-sm font-bold text-gray-900">AWS Solutions Architect</p>
                    <p className="text-xs text-gray-600">Expires: December 15, 2025</p>
                  </div>
                  <span className="inline-block rounded-full px-3 py-1 bg-green-100 text-green-700 font-semibold text-xs">
                    Valid
                  </span>
                </div>

                {/* Project Management */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
                  <div>
                    <p className="text-sm font-bold text-gray-900">PMP Certification</p>
                    <p className="text-xs text-gray-600">Expires: August 20, 2025</p>
                  </div>
                  <span className="inline-block rounded-full px-3 py-1 bg-green-100 text-green-700 font-semibold text-xs">
                    Valid
                  </span>
                </div>
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
