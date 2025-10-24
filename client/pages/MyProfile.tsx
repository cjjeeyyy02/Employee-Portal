import { useState } from "react";
import { Camera, Phone, AlertCircle, Briefcase, Mail, CheckCircle } from "lucide-react";
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
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">My Profile</h1>
        <p className="text-xs text-gray-600">View and manage your profile information</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-4 bg-white rounded-t-lg">
        <div className="flex gap-0 px-4">
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
          <div className="space-y-6">
            {/* Contact Information Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-1">Contact Information</h2>
              <p className="text-sm text-gray-600 mb-6">Keep your contact details up to date for important communications</p>

              <div className="space-y-6">
                {/* Email Address */}
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                    <div className="flex items-center gap-2">
                      <p className="text-base text-gray-900 font-medium">john.doe@company.com</p>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Primary Phone</label>
                    <p className="text-base text-gray-900 font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>

                {/* Alternate Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Alternate Phone</label>
                    <p className="text-base text-gray-900 font-medium">+1 (555) 987-6543</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 border-b border-gray-200"></div>

              {/* Address Section */}
              <h2 className="text-lg font-bold text-gray-900 mb-6">Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Street Address</label>
                  <p className="text-base text-gray-900 font-medium">123 Main Street</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
                    <p className="text-base text-gray-900 font-medium">New York</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">State</label>
                    <p className="text-base text-gray-900 font-medium">NY</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">ZIP Code</label>
                    <p className="text-base text-gray-900 font-medium">10001</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Country</label>
                    <p className="text-base text-gray-900 font-medium">United States</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Tab */}
        {activeTab === "emergency" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Emergency Contact 1
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Full Name</label>
                  <p className="text-sm text-gray-900 font-medium">Jane Doe</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Relationship</label>
                  <p className="text-sm text-gray-900 font-medium">Spouse</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Phone Number</label>
                  <p className="text-sm text-gray-900 font-medium">+1 (555) 234-5678</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Email Address</label>
                  <p className="text-sm text-gray-900 font-medium">jane.doe@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Emergency Contact 2
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Full Name</label>
                  <p className="text-sm text-gray-900 font-medium">Robert Doe</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Relationship</label>
                  <p className="text-sm text-gray-900 font-medium">Brother</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Phone Number</label>
                  <p className="text-sm text-gray-900 font-medium">+1 (555) 345-6789</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Email Address</label>
                  <p className="text-sm text-gray-900 font-medium">robert.doe@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Employment Tab */}
        {activeTab === "employment" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Current Position
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Job Title</label>
                  <p className="text-sm font-semibold text-gray-900">Senior Software Developer</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Department</label>
                  <p className="text-sm text-gray-900 font-medium">Engineering</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Reports To</label>
                  <p className="text-sm text-gray-900 font-medium">Sarah Johnson (Engineering Manager)</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Office Location</label>
                  <p className="text-sm text-gray-900 font-medium">San Francisco, CA</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Employment Details</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Start Date</label>
                  <p className="text-sm text-gray-900 font-medium">January 15, 2023</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Employment Type</label>
                  <p className="text-sm text-gray-900 font-medium">Full-Time</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Years of Service</label>
                  <p className="text-sm text-gray-900 font-medium">1 year, 9 months</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Employee ID</label>
                  <p className="text-sm text-gray-900 font-medium">EMP-2023-0451</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
