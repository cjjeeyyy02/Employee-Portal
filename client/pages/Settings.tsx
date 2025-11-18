import { Settings as SettingsIcon, User, Bell, Lock, Palette, Globe } from "lucide-react";
import Layout from "@/components/Layout";

export default function Settings() {
  const settingsSections = [
    {
      title: "Profile Settings",
      description: "Manage your personal information and preferences",
      icon: User,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Notifications",
      description: "Configure your notification preferences",
      icon: Bell,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Security & Privacy",
      description: "Manage your password and security settings",
      icon: Lock,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Appearance",
      description: "Customize the look and feel of your workspace",
      icon: Palette,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Language & Region",
      description: "Set your language, timezone, and regional preferences",
      icon: Globe,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Settings and Configuration</h1>
          </div>
          <p className="text-sm text-gray-500">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg ${section.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${section.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {section.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {section.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">System Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Version</span>
              <span className="text-sm font-medium text-gray-900">1.0.0</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Last Updated</span>
              <span className="text-sm font-medium text-gray-900">November 2024</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500">Environment</span>
              <span className="text-sm font-medium text-gray-900">Production</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
