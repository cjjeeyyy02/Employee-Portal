import { Bell, Search, ChevronDown, Menu } from "lucide-react";
import { useView } from "@/context/ViewContext";

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

export default function Header({ onToggleSidebar, sidebarCollapsed }: HeaderProps) {
  const { isManagerView } = useView();
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 flex items-center justify-between gap-2 sm:gap-3">
        {/* Left side - Toggle and Search bar */}
        <div className="hidden sm:flex items-center gap-3 flex-1 max-w-xs md:max-w-sm lg:max-w-md">
          {/* Sidebar Toggle Icon */}
          <button
            onClick={onToggleSidebar}
            className="hidden lg:flex p-1.5 text-gray-700 hover:text-blue-600 transition-colors duration-300 hover:bg-blue-50 rounded-lg flex-shrink-0"
            title="Toggle Sidebar"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search bar */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search team, tasks, requests…"
              className="w-full pl-9 pr-3 py-1.5 rounded-full bg-gray-100 border-0 text-xs sm:text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 ml-auto">
          {/* Notification Bell */}
          <div className="relative cursor-pointer hover:opacity-70 transition-opacity flex-shrink-0">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-semibold text-xs">
              3
            </span>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:opacity-70 transition-opacity flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
              alt="Sarah Johnson"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
            />
            <div className="hidden sm:flex items-center gap-0.5 md:gap-1">
              <div className="text-right">
                <p className="text-xs sm:text-sm font-medium text-gray-900">Sarah Johnson</p>
                <p className="text-xs text-gray-500">Manager</p>
              </div>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
