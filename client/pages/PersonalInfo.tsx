import { useState } from "react";
import { Camera, Edit2 } from "lucide-react";
import Layout from "@/components/Layout";

type TabType = "personal" | "contact" | "emergency" | "employment";

const tabs: { id: TabType; label: string }[] = [
  { id: "personal", label: "Personal" },
  { id: "contact", label: "Contact" },
  { id: "emergency", label: "Emergency" },
  { id: "employment", label: "Employment" },
];

export default function PersonalInfo() {
  const [activeTab, setActiveTab] = useState<TabType>("personal");

  return (
    <Layout>
      {/* Header Section */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Personal Information
            </h1>
            <p className="text-gray-600">
              Manage your personal details and contact information
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
            <Edit2 className="w-4 h-4" />
            Edit Information
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-all ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-blue-600"
                  : "text-gray-600 border-b-transparent hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "personal" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Photo Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Profile Photo
            </h2>
            <div className="flex items-center justify-center py-8">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
                />
                <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Basic Information Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Basic Information
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    First Name
                  </label>
                  <p className="text-gray-900 font-medium">John</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Last Name
                  </label>
                  <p className="text-gray-900 font-medium">Doe</p>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Bio</label>
                <p className="text-gray-900 font-medium">
                  Senior Software Developer with 8+ years of experience in
                  full-stack development.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Placeholder for other tabs */}
      {activeTab !== "personal" && (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <p className="text-gray-500 text-lg">
            {tabs.find((t) => t.id === activeTab)?.label} content coming soon
          </p>
        </div>
      )}
    </Layout>
  );
}
