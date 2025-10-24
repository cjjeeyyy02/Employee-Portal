import { useState } from "react";
import {
  Clock,
  Calendar,
  Target,
  FileText,
  Bell,
  MessageCircle,
  TrendingUp,
  Users,
  AlertCircle,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import Layout from "@/components/Layout";

export default function EmployeeDashboard() {
  const [expandedAnnouncement, setExpandedAnnouncement] = useState<number | null>(null);

  const quickActions = [
    { icon: Clock, label: "Clock In", color: "blue" },
    { icon: Calendar, label: "Request Leave", color: "green" },
    { icon: Target, label: "View Goals", color: "purple" },
    { icon: FileText, label: "View Payslip", color: "orange" },
  ];

  const metrics = [
    { label: "Leave Balance", value: "12 days", icon: Calendar, color: "bg-blue-100" },
    { label: "Pending Tasks", value: "5", icon: CheckCircle, color: "bg-green-100" },
    { label: "Performance Score", value: "4.5/5", icon: TrendingUp, color: "bg-purple-100" },
    { label: "Team Size", value: "8", icon: Users, color: "bg-orange-100" },
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
    {
      id: 4,
      title: "1:1 Meeting with Manager",
      dueDate: "Oct 20, 2024",
      status: "completed",
      priority: "medium",
    },
  ];

  const announcements = [
    {
      id: 1,
      title: "Annual Company Outing",
      category: "HR",
      date: "Oct 18, 2024",
      content:
        "We are excited to announce our annual company outing on November 10th. This will be a great opportunity to bond with your colleagues and enjoy a fun day together. More details will follow soon.",
    },
    {
      id: 2,
      title: "New Learning Management System",
      category: "IT",
      date: "Oct 16, 2024",
      content:
        "We have deployed a new Learning Management System to enhance employee training and development. All employees will have access starting October 20th.",
    },
    {
      id: 3,
      title: "Benefits Enrollment Open",
      category: "HR",
      date: "Oct 15, 2024",
      content:
        "Open enrollment for health and wellness benefits is now live. Please log in to our benefits portal to update your selections.",
    },
  ];

  const getActionColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: "bg-blue-600 hover:bg-blue-700",
      green: "bg-green-600 hover:bg-green-700",
      purple: "bg-purple-600 hover:bg-purple-700",
      orange: "bg-orange-600 hover:bg-orange-700",
    };
    return colors[color] || "bg-blue-600";
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      HR: "bg-blue-100 text-blue-800",
      IT: "bg-purple-100 text-purple-800",
      Finance: "bg-green-100 text-green-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "text-red-600",
      "in-progress": "text-yellow-600",
      completed: "text-green-600",
    };
    return colors[status] || "text-gray-600";
  };

  return (
    <Layout>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
        <p className="text-gray-600">Here's your dashboard overview for today</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className={`${getActionColor(action.color)} text-white font-medium py-4 px-6 rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2`}
            >
              <Icon className="w-5 h-5" />
              {action.label}
            </button>
          );
        })}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className={`${metric.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending Tasks */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Pending Tasks</h2>
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <p className="text-sm text-gray-600 mt-1">Due: {task.dueDate}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-sm font-medium capitalize ${getStatusColor(task.status)}`}
                    >
                      {task.status.replace("-", " ")}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full text-blue-600 hover:text-blue-700 font-medium text-sm py-2 flex items-center justify-center gap-1">
              View all tasks <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Calendar & Quick Stats */}
        <div className="space-y-6">
          {/* Mini Calendar */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">This Week</h3>
            <div className="space-y-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
                <div key={day} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{day}</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {8 + Math.random() * 2}h
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* My Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">My Profile</h3>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
                alt="Profile"
                className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
              />
              <p className="font-medium text-gray-900">John Doe</p>
              <p className="text-sm text-gray-600">Senior Software Developer</p>
              <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Announcements */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Latest Announcements</h2>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(
                        announcement.category
                      )}`}
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
      <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-blue-600" />
            AI Assistant
          </h2>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            Online
          </span>
        </div>
        <p className="text-gray-600 mb-4">
          Need help? Our AI assistant is available to answer questions about your benefits,
          leave, payroll, and more.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
          Start Chat
        </button>
      </div>
    </Layout>
  );
}
