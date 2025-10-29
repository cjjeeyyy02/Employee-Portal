import { useState } from "react";
import { Camera, Phone, AlertCircle, Briefcase, Mail, CheckCircle, Shield, Calendar } from "lucide-react";
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
      <div className="mb-2 sm:mb-3">
        <h1 className="text-base sm:text-lg font-semibold text-gray-900 mb-0.5">My Profile</h1>
        <p className="text-xs text-gray-600">View and manage your profile information</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-2 sm:mb-3 bg-white rounded-t-lg">
        <div className="flex gap-0 px-2 sm:px-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 font-medium text-xs border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-blue-600"
                  : "text-gray-600 border-b-transparent hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        {/* Personal Tab */}
        {activeTab === "personal" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Profile Photo Card */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Profile Photo</h2>
              <div className="flex items-center justify-center py-8">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Basic Information Card */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">First Name</label>
                    <p className="text-sm text-gray-900 font-medium">John</p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Last Name</label>
                    <p className="text-sm text-gray-900 font-medium">Doe</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Date of Birth</label>
                  <p className="text-xs text-gray-900 font-medium">May 15, 1990</p>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Gender</label>
                  <p className="text-xs text-gray-900 font-medium">Male</p>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Nationality</label>
                  <p className="text-xs text-gray-900 font-medium">United States</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div className="space-y-3">
            {/* Contact Information Card */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-base font-bold text-gray-900 mb-1">Contact Information</h2>
              <p className="text-xs text-gray-600 mb-4">Keep your contact details up to date for important communications</p>

              <div className="space-y-3">
                {/* Email Address */}
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-0.5">Email Address</label>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-900 font-medium">john.doe@company.com</p>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                        <CheckCircle className="w-2.5 h-2.5" /> Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Phone */}
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-0.5">Primary Phone</label>
                    <p className="text-xs text-gray-900 font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>

                {/* Alternate Phone */}
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-0.5">Alternate Phone</label>
                    <p className="text-xs text-gray-900 font-medium">+1 (555) 987-6543</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-3 border-b border-gray-200"></div>

              {/* Address Section */}
              <h2 className="text-base font-bold text-gray-900 mb-3">Address</h2>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-0.5">Street Address</label>
                  <p className="text-xs text-gray-900 font-medium">123 Main Street</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-0.5">City</label>
                    <p className="text-xs text-gray-900 font-medium">New York</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-0.5">State</label>
                    <p className="text-xs text-gray-900 font-medium">NY</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-0.5">ZIP Code</label>
                    <p className="text-xs text-gray-900 font-medium">10001</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-0.5">Country</label>
                    <p className="text-xs text-gray-900 font-medium">United States</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Tab */}
        {activeTab === "emergency" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-blue-600" />
              <div>
                <h2 className="text-base font-semibold text-gray-900">Emergency Contact</h2>
                <p className="text-xs text-gray-500">Provide emergency contact information for urgent situations.</p>
              </div>
            </div>

            {/* Information Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {/* Contact Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-0.5">Contact Name</label>
                <p className="text-xs text-gray-800 font-medium">Jane Doe</p>
              </div>

              {/* Relationship */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-0.5">Relationship</label>
                <p className="text-xs text-gray-800 font-medium">Spouse</p>
              </div>
            </div>

            {/* Phone Number */}
            <div className="mt-3">
              <label className="block text-xs font-semibold text-gray-700 mb-0.5">Phone Number</label>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                <p className="text-xs text-gray-800 font-medium">+1 (555) 456-7890</p>
              </div>
            </div>
          </div>
        )}

        {/* Employment Tab */}
        {activeTab === "employment" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <div>
                <h2 className="text-base font-semibold text-gray-900">Employment Information</h2>
                <p className="text-xs text-gray-500">View your employment details and work information.</p>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
              {/* LEFT COLUMN */}
              {/* Employee ID */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-0.5">Employee ID</label>
                <p className="text-sm text-gray-800">EMP-2023-1156</p>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-0.5">Start Date</label>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  <p className="text-sm text-gray-800">March 15, 2020</p>
                </div>
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-0.5">Job Title</label>
                <p className="text-sm text-gray-800">Senior Software Developer</p>
              </div>

              {/* Employment Type */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-0.5">Employment Type</label>
                <span className="inline-block rounded-full px-2.5 py-0.5 bg-gray-100 text-gray-800 font-medium text-xs">
                  Full-time
                </span>
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-0.5">Department</label>
                <p className="text-sm text-gray-800">Engineering</p>
              </div>

              {/* Work Location */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-0.5">Work Location</label>
                <p className="text-sm text-gray-800">New York Office</p>
              </div>

              {/* Manager */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-0.5">Manager</label>
                <p className="text-sm text-gray-800">Sarah Johnson</p>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-0.5">Status</label>
                <span className="inline-block rounded-full px-2.5 py-0.5 bg-green-500 text-white font-medium text-xs">
                  Active
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
