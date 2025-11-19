import { Settings as SettingsIcon, User, Bell, Lock, Palette, Globe, Server, Database, Shield, X, Save } from "lucide-react";
import Layout from "@/components/Layout";
import { useState } from "react";

type ModalType = "Language & Region" | "System Settings" | "Database" | "Access Control" | "Profile Settings" | "Notifications" | "Security & Privacy" | "Appearance" | null;

export default function Settings() {
  const [activeTab, setActiveTab] = useState<"settings" | "configuration">("settings");
  const [notification, setNotification] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
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
  const [profileSettings, setProfileSettings] = useState({
    firstName: "Sarah",
    lastName: "Mitchell",
    email: "sarah.mitchell@company.com",
    phone: "+1 (555) 123-4567",
    department: "Human Resources",
    jobTitle: "HR Manager",
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: "enabled",
    pushNotifications: "enabled",
    smsNotifications: "disabled",
    taskReminders: "enabled",
    weeklyDigest: "enabled",
  });
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: "enabled",
    loginAlerts: "enabled",
  });
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    colorScheme: "blue",
    fontSize: "medium",
    sidebarCollapsed: "no",
  });

  const handleCardClick = (title: string) => {
    const validModals = ["Language & Region", "System Settings", "Database", "Access Control", "Profile Settings", "Notifications", "Security & Privacy", "Appearance"];
    if (validModals.includes(title)) {
      setActiveModal(title as ModalType);
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

        {/* Profile Settings Modal */}
        {activeModal === "Profile Settings" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
                <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={profileSettings.firstName}
                      onChange={(e) => setProfileSettings({ ...profileSettings, firstName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={profileSettings.lastName}
                      onChange={(e) => setProfileSettings({ ...profileSettings, lastName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={profileSettings.email}
                    onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={profileSettings.phone}
                    onChange={(e) => setProfileSettings({ ...profileSettings, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={profileSettings.department}
                    onChange={(e) => setProfileSettings({ ...profileSettings, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                  <input
                    type="text"
                    value={profileSettings.jobTitle}
                    onChange={(e) => setProfileSettings({ ...profileSettings, jobTitle: e.target.value })}
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

        {/* Notifications Modal */}
        {activeModal === "Notifications" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
                <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Notifications</label>
                  <select
                    value={notificationSettings.emailNotifications}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Push Notifications</label>
                  <select
                    value={notificationSettings.pushNotifications}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, pushNotifications: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SMS Notifications</label>
                  <select
                    value={notificationSettings.smsNotifications}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, smsNotifications: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Task Reminders</label>
                  <select
                    value={notificationSettings.taskReminders}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, taskReminders: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Digest</label>
                  <select
                    value={notificationSettings.weeklyDigest}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, weeklyDigest: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-blue-500"
                  >
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
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

        {/* Security & Privacy Modal */}
        {activeModal === "Security & Privacy" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Security & Privacy</h2>
                <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={securitySettings.currentPassword}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, currentPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={securitySettings.newPassword}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, newPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={securitySettings.confirmPassword}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm new password"
                  />
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Security Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Two-Factor Authentication</label>
                      <select
                        value={securitySettings.twoFactorAuth}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="enabled">Enabled</option>
                        <option value="disabled">Disabled</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Login Alerts</label>
                      <select
                        value={securitySettings.loginAlerts}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, loginAlerts: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="enabled">Enabled</option>
                        <option value="disabled">Disabled</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-sm text-yellow-800">
                  <p className="font-medium">Password Requirements</p>
                  <p className="text-xs mt-1">Must be at least 8 characters with uppercase, lowercase, number, and special character</p>
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

        {/* Appearance Modal */}
        {activeModal === "Appearance" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
                <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                  <select
                    value={appearanceSettings.theme}
                    onChange={(e) => setAppearanceSettings({ ...appearanceSettings, theme: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color Scheme</label>
                  <select
                    value={appearanceSettings.colorScheme}
                    onChange={(e) => setAppearanceSettings({ ...appearanceSettings, colorScheme: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="purple">Purple</option>
                    <option value="orange">Orange</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                  <select
                    value={appearanceSettings.fontSize}
                    onChange={(e) => setAppearanceSettings({ ...appearanceSettings, fontSize: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sidebar</label>
                  <select
                    value={appearanceSettings.sidebarCollapsed}
                    onChange={(e) => setAppearanceSettings({ ...appearanceSettings, sidebarCollapsed: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="no">Expanded</option>
                    <option value="yes">Collapsed</option>
                  </select>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm text-blue-800">
                  <p className="font-medium">Preview Changes</p>
                  <p className="text-xs mt-1">Changes will be applied immediately after saving</p>
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
