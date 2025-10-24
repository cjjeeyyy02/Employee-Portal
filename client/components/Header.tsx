import { Bell, Search, ChevronDown } from "lucide-react";
import { useView } from "@/context/ViewContext";

export default function Header() {
  const { isManagerView } = useView();
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left side - Search bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search team, tasks, requests…"
              className="w-full pl-11 pr-4 py-2 rounded-full bg-gray-100 border-0 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center gap-5 ml-8">
          {/* Notification Bell */}
          <div className="relative cursor-pointer hover:opacity-70 transition-opacity">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
              3
            </span>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
              alt="Sarah Johnson"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex items-center gap-1">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                <p className="text-xs text-gray-500">Manager</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
