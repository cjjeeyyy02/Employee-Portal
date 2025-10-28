import { useState, useEffect } from "react";
import {
  Clock,
  Calendar,
  MessageCircle,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  Coffee,
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
    { label: "Available Leave", value: "18.5 days", subtext: "+2.5 from last month", icon: Calendar, bgColor: "bg-sky-100", iconColor: "text-sky-600" },
    { label: "Attendance Rate", value: "96.8%", subtext: "+1.2% from last month", icon: Clock, bgColor: "bg-green-100", iconColor: "text-green-600" },
    { label: "Active Tasks", value: "7", subtext: "3 due this week", icon: CheckCircle, bgColor: "bg-purple-100", iconColor: "text-purple-600" },
    { label: "Performance Score", value: "4.2/5", subtext: "Above average", icon: TrendingUp, bgColor: "bg-violet-100", iconColor: "text-violet-600" },
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
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome back, John!</h1>
        <p className="text-sm text-gray-600">Here's your dashboard overview for today</p>
      </div>


      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-start gap-3">
                <div className={`${metric.bgColor} p-2 rounded-lg`}>
                  <Icon className={`w-5 h-5 ${metric.iconColor}`} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600 mb-1">{metric.label}</p>
                  <p className="text-xl font-bold text-gray-900">{metric.value}</p>
                  {metric.subtext && <p className="text-xs text-gray-500 mt-1">{metric.subtext}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Pending Tasks */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Pending Tasks</h2>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{task.title}</p>
                    <p className="text-xs text-gray-600 mt-1">Due: {task.dueDate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
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
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-5 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
              View all tasks <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* This Week */}
        <div className="bg-white rounded-lg shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4 text-base">This Week</h3>
          <div className="space-y-3">
            {weeklyHours.map((item) => (
              <div key={item.day} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.day}</span>
                <span className="text-xs bg-sky-100 text-sky-700 px-3 py-1 rounded-full font-medium">
                  {item.hours}h
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Announcements */}
      <div className="bg-white rounded-lg shadow-sm p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">Latest Announcements</h2>
        <div className="space-y-3">
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
            <div key={announcement.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{announcement.title}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        announcement.category === "HR"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {announcement.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{announcement.date}</p>
                </div>
                <button
                  onClick={() =>
                    setExpandedAnnouncement(
                      expandedAnnouncement === announcement.id ? null : announcement.id
                    )
                  }
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      expandedAnnouncement === announcement.id ? "rotate-90" : ""
                    }`}
                  />
                </button>
              </div>

              {expandedAnnouncement === announcement.id && (
                <p className="text-sm text-gray-700 mt-3 pt-3 border-t border-gray-200">
                  {announcement.content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI Chat Section */}
      <div className="bg-white rounded-lg shadow-sm p-5 mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            AI Assistant
          </h2>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
            Online
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Need help? Our AI assistant is available to answer questions about your benefits, leave, payroll, and more.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg transition-colors text-sm">
          Start Chat
        </button>
      </div>
    </Layout>
  );
}
