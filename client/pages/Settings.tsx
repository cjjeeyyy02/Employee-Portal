import { Settings as SettingsIcon, User, Bell, Lock, Palette, Globe, Server, Database, Shield, X, Save } from "lucide-react";
import Layout from "@/components/Layout";
import { useState } from "react";

type ConfigModal = "Language & Region" | "System Settings" | "Database" | "Access Control" | null;

export default function Settings() {
  const [activeTab, setActiveTab] = useState<"settings" | "configuration">("settings");
  const [notification, setNotification] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<ConfigModal>(null);
  const [languageSettings, setLanguageSettings] = useState({
    language: "English",
    timezone: "UTC-8 (Pacific Time)",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12-hour",
  });
  const [systemSettings, setSystemSettings] = useState({
    theme: "light",
    notifications: "enabled",
    autoSave: "enabled",
    sessionTimeout: "30",
  });
  const [databaseSettings, setDatabaseSettings] = useState({
    host: "localhost",
    port: "5432",
    database: "ess_portal",
    connectionPool: "10",
  });
  const [accessSettings, setAccessSettings] = useState({
    defaultRole: "user",
    mfa: "enabled",
    passwordExpiry: "90",
    sessionDuration: "480",
  });

  const handleCardClick = (title: string) => {
    if (title === "Language & Region" || title === "System Settings" || title === "Database" || title === "Access Control") {
      setActiveModal(title as ConfigModal);
    } else {
      setNotification(`Opening ${title}...`);
      setTimeout(() => setNotification(null), 2000);
    }
  };

  const handleSaveSettings = () => {
    setNotification(`Settings saved successfully!`);
    setTimeout(() => setNotification(null), 2000);
    setActiveModal(null);
  };

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
  ];

  const configurationSections = [
    {
      title: "Language & Region",
      description: "Set your language, timezone, and regional preferences",
      icon: Globe,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "System Settings",
      description: "Configure system-level preferences and defaults",
      icon: Server,
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Database",
      description: "Manage database connections and configurations",
      icon: Database,
      iconColor: "text-cyan-600",
      bgColor: "bg-cyan-50",
    },
    {
      title: "Access Control",
      description: "Configure permissions and user access levels",
      icon: Shield,
      iconColor: "text-rose-600",
      bgColor: "bg-rose-50",
    },
  ];

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-4">
          <div className="mb-1">
            <h1 className="text-lg font-bold text-gray-900">Configuration and settings</h1>
          </div>
          <p className="text-xs text-gray-500">
            Manage your account settings and system configurations
          </p>
        </div>

        <div className="border-b border-gray-200 mb-3 bg-white">
          <div className="flex gap-0 px-3">
            <button
              onClick={() => setActiveTab("configuration")}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-all ${
                activeTab === "configuration"
                  ? "text-blue-600 border-b-blue-600"
                  : "text-gray-600 border-b-transparent hover:text-gray-900"
              }`}
            >
              Configuration
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-all ${
                activeTab === "settings"
                  ? "text-blue-600 border-b-blue-600"
                  : "text-gray-600 border-b-transparent hover:text-gray-900"
              }`}
            >
              Settings
            </button>
          </div>
        </div>

        {activeTab === "settings" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.title}
                  onClick={() => handleCardClick(section.title)}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start gap-2">
                    <div className={`w-8 h-8 rounded-lg ${section.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-4 h-4 ${section.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900 mb-0.5">
                        {section.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "configuration" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {configurationSections.map((section) => {
                const Icon = section.icon;
                return (
                  <div
                    key={section.title}
                    onClick={() => handleCardClick(section.title)}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-8 h-8 rounded-lg ${section.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-4 h-4 ${section.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-gray-900 mb-0.5">
                          {section.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 bg-white rounded-lg shadow-sm border border-gray-200 p-3">
              <h2 className="text-sm font-bold text-gray-900 mb-2">System Information</h2>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-xs text-gray-500">Version</span>
                  <span className="text-xs font-medium text-gray-900">1.0.0</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-xs text-gray-500">Last Updated</span>
                  <span className="text-xs font-medium text-gray-900">November 2024</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-xs text-gray-500">Environment</span>
                  <span className="text-xs font-medium text-gray-900">Production</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Notification Toast */}
        {notification && (
          <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg text-sm font-medium z-50">
            {notification}
          </div>
        )}
      </div>
    </Layout>
  );
}
