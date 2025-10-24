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

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: User, label: "Personal Info", path: "/personal-info" },
  { icon: Calendar, label: "Leave & Attendance", path: "/leave-attendance" },
  { icon: DollarSign, label: "Payroll & Benefits", path: "/payroll-benefits" },
  { icon: CheckSquare, label: "Task Management", path: "/tasks" },
  { icon: Target, label: "Performance", path: "/performance" },
  { icon: FileText, label: "Requests & Documents", path: "/requests" },
  { icon: MessageSquare, label: "Communications", path: "/communications" },
];

const managerFunctions = [
  { icon: Users, label: "Team Management", path: "/team-management" },
];

interface SidebarProps {
  isManagerView: boolean;
  setIsManagerView: (value: boolean) => void;
}

export default function Sidebar({ isManagerView, setIsManagerView }: SidebarProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-slate-950 text-white flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-lg font-bold text-white mb-4">ESS Portal</h1>

        {/* Manager View Toggle */}
        <div className="space-y-3">
          {isManagerView && (
            <div className="flex items-center justify-between bg-slate-900 rounded-lg p-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Manager View</p>
                <p className="text-xs text-gray-400">Engineering</p>
              </div>
              <input
                type="checkbox"
                checked={isManagerView}
                readOnly
                className="w-4 h-4 cursor-pointer"
              />
            </div>
          )}

          <button
            onClick={() => setIsManagerView(!isManagerView)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 px-3 rounded-full transition-colors"
          >
            {isManagerView ? "Switch to Employee View" : "Switch to Manager View"}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                    active
                      ? "bg-slate-800 border-l-2 border-blue-500"
                      : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Manager Functions Section - Only in Manager View */}
        {isManagerView && (
          <div className="mt-8 pt-6 border-t border-slate-800">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Manager Functions
            </p>
            <ul className="space-y-2">
              {managerFunctions.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                        active
                          ? "bg-slate-800 border-l-2 border-blue-500"
                          : "text-gray-300 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium">{item.label}</span>
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
