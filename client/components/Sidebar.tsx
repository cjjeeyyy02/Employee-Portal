import {
  LayoutDashboard,
  User,
  Calendar,
  CheckSquare,
  Target,
  FileText,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const employeeNavigationItems = [
  { icon: LayoutDashboard, label: "My Dashboard", path: "/employee-dashboard" },
  { icon: User, label: "My Profile", path: "/my-profile" },
  { icon: Calendar, label: "My Leave & Attendance", path: "/my-leave-attendance" },
  { icon: Target, label: "My Performance", path: "/my-performance" },
  { icon: CheckSquare, label: "My Tasks", path: "/my-tasks" },
  { icon: FileText, label: "Documents", path: "/documents" },
];

export default function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden max-lg:flex fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {isCollapsed ? <Menu className="w-6 h-6" /> : <X className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-screen transition-all duration-300 ease-in-out z-40 ${
          isCollapsed ? "-translate-x-full lg:translate-x-0" : "translate-x-0"
        } w-72 bg-white flex flex-col border-r border-gray-200 shadow-sm`}
      >
        {/* Header Section */}
        <div className="px-8 py-8 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900">
            ESS Portal
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Employee Self Service
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-5 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {employeeNavigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-4 px-5 py-3.5 rounded-lg transition-all duration-300 font-medium text-sm ${
                      active
                        ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <Icon
                      className={`w-6 h-6 flex-shrink-0 transition-colors ${
                        active ? "text-blue-600" : "text-gray-400"
                      }`}
                    />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Info */}
        <div className="px-8 py-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500" style={{ fontFamily: "Poppins, sans-serif" }}>
            © 2024 ESS Portal
          </p>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isCollapsed === false && (
        <div
          onClick={() => setIsCollapsed(true)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        />
      )}
    </>
  );
}
