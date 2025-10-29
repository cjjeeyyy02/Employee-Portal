import {
  LayoutDashboard,
  User,
  Calendar,
  DollarSign,
  CheckSquare,
  Target,
  FileText,
  MessageSquare,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useView } from "@/context/ViewContext";

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

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-white text-gray-900 flex flex-col h-screen border-r border-gray-200 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-lg font-bold text-gray-900 mb-6">ESS Portal</h1>

        {/* Switch to Manager View Button */}
        <button
          onClick={() => setIsManagerView(!isManagerView)}
          className="w-full border-2 border-blue-500 hover:bg-blue-50 text-blue-600 text-sm font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {isManagerView ? "Switch to Employee View" : "Switch to Manager View"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-5 py-6 overflow-y-auto">
        <ul className="space-y-1">
          {(isManagerView ? managerNavigationItems : employeeNavigationItems).map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-5 py-3 rounded-lg transition-all font-medium text-sm ${
                    active
                      ? "bg-gray-100 text-blue-600 border-l-4 border-blue-500"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Manager Functions Section - Only in Manager View */}
        {isManagerView && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-5">
              Manager Functions
            </p>
            <ul className="space-y-1">
              {managerFunctions.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-5 py-3 rounded-lg transition-all font-medium text-sm ${
                        active
                          ? "bg-gray-100 text-blue-600 border-l-4 border-blue-500"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}
