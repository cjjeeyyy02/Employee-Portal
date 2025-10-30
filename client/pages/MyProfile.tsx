import { useState } from "react";
import { Camera, Phone, Mail, Shield, Briefcase, Calendar, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";

type TabType = "personal" | "contact" | "emergency" | "employment";

const tabs: { id: TabType; label: string }[] = [
  { id: "personal", label: "Personal" },
  { id: "contact", label: "Contact" },
  { id: "emergency", label: "Emergency" },
  { id: "employment", label: "Employment" },
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

            {/* Basic Information Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Basic Information</h2>
              <div className="space-y-5">
                {/* First Name & Last Name Row */}
                <div className="grid grid-cols-2 gap-8">
                  <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 hover:border-transparent p-2 rounded transition-colors">
                    <label className="block text-xs font-medium text-gray-600 mb-2">First Name</label>
                    <p className="text-base font-bold text-gray-900">John</p>
                  </div>
                  <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 hover:border-transparent p-2 rounded transition-colors">
                    <label className="block text-xs font-medium text-gray-600 mb-2">Last Name</label>
                    <p className="text-base font-bold text-gray-900">Doe</p>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 hover:border-transparent p-2 rounded transition-colors">
                  <label className="block text-xs font-medium text-gray-600 mb-2">Date of Birth</label>
                  <p className="text-base font-bold text-gray-900">May 15, 1990</p>
                </div>

                {/* Gender & Nationality Row */}
                <div className="grid grid-cols-2 gap-8">
                  <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 hover:border-transparent p-2 rounded transition-colors">
                    <label className="block text-xs font-medium text-gray-600 mb-2">Gender</label>
                    <p className="text-base font-bold text-gray-900">Male</p>
                  </div>
                  <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 hover:border-transparent p-2 rounded transition-colors">
                    <label className="block text-xs font-medium text-gray-600 mb-2">Nationality</label>
                    <p className="text-base font-bold text-gray-900">United States</p>
                  </div>
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
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            {/* Header */}
            <div className="flex items-start gap-3 mb-8">
              <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-bold text-gray-900">Emergency Contact</h2>
                <p className="text-sm text-gray-600 mt-1">Provide emergency contact information for urgent situations.</p>
              </div>
            </div>

            {/* Information Section */}
            <div className="space-y-6">
              {/* Contact Name & Relationship Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 p-2 rounded transition-colors">
                  <label className="block text-xs font-medium text-gray-600 mb-2">Contact Name</label>
                  <p className="text-base font-bold text-gray-900">Jane Doe</p>
                </div>

                <div className="pb-4 border-b border-gray-100 hover:bg-blue-50 p-2 rounded transition-colors">
                  <label className="block text-xs font-medium text-gray-600 mb-2">Relationship</label>
                  <p className="text-base font-bold text-gray-900">Spouse</p>
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex items-start gap-3 hover:bg-blue-50 p-2 rounded transition-colors">
                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-2">Phone Number</label>
                  <p className="text-base font-bold text-gray-900">+1 (555) 456-7890</p>
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
