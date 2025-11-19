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

        {/* Language & Region Modal */}
        {activeModal === "Language & Region" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Language & Region</h2>
                <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={languageSettings.language}
                    onChange={(e) => setLanguageSettings({ ...languageSettings, language: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Chinese</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={languageSettings.timezone}
                    onChange={(e) => setLanguageSettings({ ...languageSettings, timezone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>UTC-8 (Pacific Time)</option>
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC+0 (GMT)</option>
                    <option>UTC+1 (Central European Time)</option>
                    <option>UTC+8 (China Standard Time)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                  <select
                    value={languageSettings.dateFormat}
                    onChange={(e) => setLanguageSettings({ ...languageSettings, dateFormat: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Format</label>
                  <select
                    value={languageSettings.timeFormat}
                    onChange={(e) => setLanguageSettings({ ...languageSettings, timeFormat: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>12-hour</option>
                    <option>24-hour</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveSettings}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* System Settings Modal */}
        {activeModal === "System Settings" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">System Settings</h2>
                <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                  <select
                    value={systemSettings.theme}
                    onChange={(e) => setSystemSettings({ ...systemSettings, theme: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notifications</label>
                  <select
                    value={systemSettings.notifications}
                    onChange={(e) => setSystemSettings({ ...systemSettings, notifications: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Auto-Save</label>
                  <select
                    value={systemSettings.autoSave}
                    onChange={(e) => setSystemSettings({ ...systemSettings, autoSave: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) => setSystemSettings({ ...systemSettings, sessionTimeout: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveSettings}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Database Modal */}
        {activeModal === "Database" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Database Configuration</h2>
                <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Host</label>
                  <input
                    type="text"
                    value={databaseSettings.host}
                    onChange={(e) => setDatabaseSettings({ ...databaseSettings, host: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="localhost"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
                  <input
                    type="text"
                    value={databaseSettings.port}
                    onChange={(e) => setDatabaseSettings({ ...databaseSettings, port: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="5432"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Database Name</label>
                  <input
                    type="text"
                    value={databaseSettings.database}
                    onChange={(e) => setDatabaseSettings({ ...databaseSettings, database: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ess_portal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Connection Pool Size</label>
                  <input
                    type="number"
                    value={databaseSettings.connectionPool}
                    onChange={(e) => setDatabaseSettings({ ...databaseSettings, connectionPool: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-sm text-yellow-800">
                  <p className="font-medium">Warning</p>
                  <p className="text-xs mt-1">Changing database settings requires system restart</p>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveSettings}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Access Control Modal */}
        {activeModal === "Access Control" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Access Control</h2>
                <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default User Role</label>
                  <select
                    value={accessSettings.defaultRole}
                    onChange={(e) => setAccessSettings({ ...accessSettings, defaultRole: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Multi-Factor Authentication</label>
                  <select
                    value={accessSettings.mfa}
                    onChange={(e) => setAccessSettings({ ...accessSettings, mfa: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                    <option value="optional">Optional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
                  <input
                    type="number"
                    value={accessSettings.passwordExpiry}
                    onChange={(e) => setAccessSettings({ ...accessSettings, passwordExpiry: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Duration (minutes)</label>
                  <input
                    type="number"
                    value={accessSettings.sessionDuration}
                    onChange={(e) => setAccessSettings({ ...accessSettings, sessionDuration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm text-blue-800">
                  <p className="font-medium">Security Notice</p>
                  <p className="text-xs mt-1">Changes to access control affect all users immediately</p>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveSettings}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
