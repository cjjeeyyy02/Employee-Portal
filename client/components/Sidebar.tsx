import {
  LayoutDashboard,
  User,
  Calendar,
  CheckSquare,
  Target,
  FileText,
  Menu,
  X,
  MessageCircle,
  Settings,
  Users,
  UserCheck,
  ClipboardList,
  BarChart3,
  CheckCircle,
  PieChart,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const employeeNavigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/employee-dashboard" },
  { icon: User, label: "Profile", path: "/my-profile" },
  { icon: Calendar, label: "Leave & Attendance", path: "/my-leave-attendance" },
  { icon: Target, label: "Performance", path: "/my-performance" },
  { icon: CheckSquare, label: "Tasks", path: "/my-tasks" },
  { icon: FileText, label: "Request & Documents", path: "/documents" },
  { icon: Calendar, label: "Calendar", path: "/calendar" },
  { icon: Settings, label: "Configurations & Settings", path: "/settings" },
  { icon: MessageCircle, label: "AI Assistant", path: "/ai-chat" },
];

const managerNavigationItems = [
  { icon: Users, label: "Team Management", path: "/team-management" },
  { icon: UserCheck, label: "Team Attendance", path: "/team-attendance" },
  { icon: ClipboardList, label: "Team Task Management", path: "/team-task-management" },
  { icon: BarChart3, label: "Performance Reviews", path: "/performance-reviews" },
  { icon: CheckCircle, label: "Request Approvals", path: "/request-approvals" },
  { icon: PieChart, label: "Reports & Analytics", path: "/reports-analytics" },
];

interface SidebarProps {
  collapsed?: boolean;
}

export default function Sidebar({ collapsed = false }: SidebarProps) {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isManagerExpanded, setIsManagerExpanded] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="hidden max-lg:flex fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {isMobileOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-screen transition-all duration-300 ease-in-out z-40 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${collapsed ? "lg:w-16" : "lg:w-40"} w-40 bg-white flex flex-col border-r border-gray-200 shadow-sm`}
      >
        {/* Header Section */}
        <div
          className={`px-2 py-2 border-b border-gray-100 transition-all duration-300 ${collapsed ? "lg:flex lg:items-center lg:justify-center lg:px-1" : ""}`}
        >
          <h1
            className={`text-sm font-bold text-gray-900 transition-opacity duration-300 ${collapsed ? "lg:hidden" : ""}`}
          >
            ESS Portal
          </h1>
          <div
            className={`hidden text-blue-600 transition-opacity duration-300 ${collapsed ? "lg:flex" : "lg:hidden"}`}
          >
            <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center">
              <span className="text-xs font-bold">E</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-1.5 py-2 overflow-y-auto">
          <ul className="space-y-0.5">
            {employeeNavigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <li key={item.path} title={collapsed ? item.label : ""}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded transition-all duration-300 font-medium text-xs ${
                      active
                        ? "bg-blue-50 text-blue-600 border-l-3 border-blue-600"
                        : "text-slate-700 hover:bg-gray-50"
                    } ${collapsed ? "lg:justify-center lg:px-1" : ""}`}
                  >
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 transition-colors ${
                        active ? "text-blue-600" : "text-slate-500"
                      }`}
                    />
                    <span
                      className={`hidden lg:inline transition-opacity duration-300 ${collapsed ? "lg:hidden" : ""}`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}

            {/* Manager Section */}
            {!collapsed && (
              <>
                <li className="border-t border-gray-100 my-1.5" />
                <li>
                  <button
                    onClick={() => setIsManagerExpanded(!isManagerExpanded)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded transition-all duration-300 font-medium text-xs text-slate-700 hover:bg-gray-50"
                  >
                    <span className="font-semibold">Manager Function</span>
                    <ChevronDown
                      className={`w-3 h-3 ml-auto flex-shrink-0 transition-transform duration-300 ${
                        isManagerExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </li>

                {isManagerExpanded && (
                  <>
                    {managerNavigationItems.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.path);

                      return (
                        <li key={item.path} title={item.label} className="pl-2">
                          <Link
                            to={item.path}
                            className={`flex items-center gap-2 px-2 py-1.5 rounded transition-all duration-300 font-medium text-xs ${
                              active
                                ? "bg-blue-50 text-blue-600 border-l-3 border-blue-600"
                                : "text-slate-700 hover:bg-gray-50"
                            }`}
                          >
                            <Icon
                              className={`w-4 h-4 flex-shrink-0 transition-colors ${
                                active ? "text-blue-600" : "text-slate-500"
                              }`}
                            />
                            <span className="lg:inline">
                              {item.label}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </ul>
        </nav>

        {/* Footer Info */}
        <div
          className={`px-2 py-2 border-t border-gray-100 text-center transition-all duration-300 ${collapsed ? "lg:px-1" : ""}`}
        >
          <p
            className={`text-xs text-slate-400 transition-opacity duration-300 ${collapsed ? "lg:hidden" : ""}`}
          >
            © 2024 ESS
          </p>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        />
      )}
    </>
  );
}
