import { useState, useEffect } from "react";
import {
  Clock,
  Calendar,
  MessageCircle,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  Coffee,
  Bell,
  ArrowUpRight,
} from "lucide-react";
import Layout from "@/components/Layout";

export default function EmployeeDashboard() {
  const [expandedAnnouncement, setExpandedAnnouncement] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const dateString = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
      setCurrentTime(timeString);
      setCurrentDate(dateString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const quickActions = [];

  const metrics = [
    { label: "Available Leave", value: "18.5 days", subtext: "+2.5 from last month", icon: Calendar, bgColor: "bg-sky-50", iconColor: "text-sky-600", borderColor: "border-sky-200" },
    { label: "Attendance Rate", value: "96.8%", subtext: "+1.2% from last month", icon: Clock, bgColor: "bg-green-50", iconColor: "text-green-600", borderColor: "border-green-200" },
    { label: "Active Tasks", value: "7", subtext: "3 due this week", icon: CheckCircle, bgColor: "bg-purple-50", iconColor: "text-purple-600", borderColor: "border-purple-200" },
    { label: "Performance Score", value: "4.2/5", subtext: "Above average", icon: TrendingUp, bgColor: "bg-violet-50", iconColor: "text-violet-600", borderColor: "border-violet-200" },
  ];

  const pendingTasks = [
    {
      id: 1,
      title: "Q4 Performance Review",
      dueDate: "Oct 25, 2024",
      status: "pending",
      priority: "high",
    },
    {
      id: 2,
      title: "Complete Training Module",
      dueDate: "Oct 30, 2024",
      status: "in-progress",
      priority: "medium",
    },
    {
      id: 3,
      title: "Submit Project Deliverables",
      dueDate: "Nov 5, 2024",
      status: "pending",
      priority: "high",
    },
  ];

  const weeklyHours = [
    { day: "Mon", hours: "8.4" },
    { day: "Tue", hours: "9.2" },
    { day: "Wed", hours: "8.8" },
    { day: "Thu", hours: "9.5" },
  ];

  return (
    <Layout>
      {/* Welcome Section - Minimized */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          {/* Left Group */}
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-0.5">Welcome back, John!</h1>
            <p className="text-xs text-gray-600">Here's your dashboard overview for today</p>
          </div>

          {/* Right Group - Time Card */}
          <div
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex-shrink-0 hover:shadow-md transition-shadow"
            style={{
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div className="flex flex-col items-center gap-1.5">
              {/* Time Label */}
              <p className="text-2xl font-bold text-gray-900">{currentTime}</p>

              {/* Date Label */}
              <p className="text-xs font-medium text-gray-500">{currentDate}</p>

              {/* Button Group */}
              <div className="flex flex-row gap-1.5 mt-2">
                {/* Clock In Button */}
                <button
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold transition-all hover:bg-blue-700 active:scale-95"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Clock In</span>
                </button>

                {/* Break Button */}
                <button
                  disabled
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-400 text-xs font-semibold cursor-not-allowed"
                >
                  <Coffee className="w-3.5 h-3.5" />
                  <span>Break</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards Grid - Minimized */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className={`bg-white rounded-lg border ${metric.borderColor} p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all group`}
            >
              <div className="flex items-start gap-3">
                <div className={`${metric.bgColor} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${metric.iconColor}`} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 mb-0.5 uppercase tracking-wide">{metric.label}</p>
                  <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                  {metric.subtext && <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><ArrowUpRight className="w-3 h-3 text-green-600" />{metric.subtext}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Pending Tasks - Minimized */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900">Pending Tasks</h2>
              <span className="bg-red-50 text-red-700 text-xs font-semibold px-2.5 py-1 rounded-full">{pendingTasks.length} tasks</span>
            </div>
            <div className="space-y-2">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all group cursor-pointer"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-xs group-hover:text-blue-600 transition-colors">{task.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Due: {task.dueDate}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        task.status === "pending"
                          ? "bg-red-100 text-red-700"
                          : task.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.status.replace("-", " ")}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        task.priority === "high"
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-xs flex items-center gap-1 group">
              View all tasks <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* This Week - Minimized */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
          <h3 className="font-bold text-gray-900 mb-4 text-base">This Week</h3>
          <div className="space-y-2.5">
            {weeklyHours.map((item) => (
              <div key={item.day} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                <span className="text-xs font-semibold text-gray-700">{item.day}</span>
                <span className="text-xs bg-blue-600 text-white px-2.5 py-1 rounded-full font-bold">
                  {item.hours}h
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Announcements - Minimized */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" />
            Latest Announcements
          </h2>
        </div>
        <div className="space-y-2">
          {[
            {
              id: 1,
              title: "Annual Company Outing",
              category: "HR",
              date: "Oct 18, 2024",
              content: "We are excited to announce our annual company outing on November 10th.",
            },
            {
              id: 2,
              title: "New Learning Management System",
              category: "IT",
              date: "Oct 16, 2024",
              content: "We have deployed a new Learning Management System to enhance employee training.",
            },
            {
              id: 3,
              title: "Benefits Enrollment Open",
              category: "HR",
              date: "Oct 15, 2024",
              content: "Open enrollment for health and wellness benefits is now live.",
            },
          ].map((announcement) => (
            <div key={announcement.id} className="border border-gray-200 rounded-lg p-3 hover:border-blue-200 hover:bg-blue-50 transition-all">
              <div className="flex items-start justify-between mb-1.5">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-semibold text-gray-900 text-xs">{announcement.title}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        announcement.category === "HR"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {announcement.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">{announcement.date}</p>
                </div>
                <button
                  onClick={() =>
                    setExpandedAnnouncement(
                      expandedAnnouncement === announcement.id ? null : announcement.id
                    )
                  }
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      expandedAnnouncement === announcement.id ? "rotate-90" : ""
                    }`}
                  />
                </button>
              </div>

              {expandedAnnouncement === announcement.id && (
                <p className="text-xs text-gray-700 mt-2.5 pt-2.5 border-t border-gray-200">
                  {announcement.content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI Chat Section - Minimized */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-blue-600" />
            AI Assistant
          </h2>
          <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
            Online
          </span>
        </div>
        <p className="text-xs text-gray-700 mb-4 leading-relaxed">
          Need help? Our AI assistant is available to answer questions about your benefits, leave, payroll, and more.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-2 px-4 rounded-lg transition-all text-xs shadow-sm hover:shadow-md">
          Start Chat
        </button>
      </div>
    </Layout>
  );
}
