import { useState, useEffect } from "react";
import {
  Clock,
  Calendar,
  CheckCircle,
  ChevronRight,
  Coffee,
  AlertCircle,
  Plus,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import Layout from "@/components/Layout";

interface PendingRequest {
  id: number;
  title: string;
  status: string;
  daysAgo: number;
}

interface UpcomingEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
}

interface PendingTask {
  id: number;
  title: string;
  dueDate: string;
  status: string;
  priority: string;
}

export default function EmployeeDashboard() {
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

  const quickActions = [
    { icon: Coffee, label: "Request Leave", action: "leave" },
    { icon: Clock, label: "Request Overtime", action: "overtime" },
    { icon: AlertCircle, label: "Submit Request", action: "request" },
    { icon: Plus, label: "New Task / Assign Task", action: "task" },
  ];

  const pendingRequests: PendingRequest[] = [
    { id: 1, title: "Annual Leave Application", status: "Pending Approval", daysAgo: 3 },
    { id: 2, title: "Expense Reimbursement", status: "Under Review", daysAgo: 2 },
    { id: 3, title: "Equipment Request", status: "Awaiting Manager Review", daysAgo: 5 },
  ];

  const upcomingEvents: UpcomingEvent[] = [
    { id: 1, title: "Company-Wide Town Hall", date: "Thursday, Nov 14, 2025", time: "10:00 AM", description: "Mandatory attendance for all staff. Topic: Q4 Performance." },
    { id: 2, title: "New Employee Security Training", date: "Friday, Nov 28, 2025", time: "11:00 AM", description: "Must be completed by new hires joining Sales to maintain compliance." },
  ];

  const announcements = [
    { id: 1, title: "Company-Wide Holiday Schedule Update", description: "Please review the updated holiday schedule for Oct 26, 2023." },
    { id: 2, title: "New Benefits Enrollment Period Open", description: "Annual benefits enrollment is now open until Oct 25, 2023." },
  ];

  const summaryMetrics = [
    { label: "Pending Tasks", value: "6", icon: Briefcase, bgColor: "bg-blue-50", iconColor: "text-blue-600", borderColor: "border-blue-100" },
    { label: "Pending Requests", value: "3", icon: AlertCircle, bgColor: "bg-green-50", iconColor: "text-green-600", borderColor: "border-green-100" },
    { label: "KPI Score", value: "85%", subtext: "+3% from last month", icon: TrendingUp, bgColor: "bg-purple-50", iconColor: "text-purple-600", borderColor: "border-purple-100" },
    { label: "# of Meetings Today", value: "2", icon: Calendar, bgColor: "bg-orange-50", iconColor: "text-orange-600", borderColor: "border-orange-100" },
  ];

  const pendingTasks: PendingTask[] = [
    { id: 1, title: "Q4 Performance Review", dueDate: "Oct 25, 2024", status: "pending", priority: "high" },
    { id: 2, title: "Complete Training Module", dueDate: "Oct 30, 2024", status: "in-progress", priority: "medium" },
    { id: 3, title: "Submit Project Deliverables", dueDate: "Nov 5, 2024", status: "pending", priority: "high" },
  ];

  return (
    <Layout>
      {/* Header Section */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, John!</h1>
          <p className="text-sm text-gray-600">Here's your dashboard overview for today</p>
        </div>

        {/* Time & Action Section */}
        <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
          {/* Time Display */}
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{currentTime}</p>
            <p className="text-xs text-gray-500">{currentDate}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-all">
              <CheckCircle className="w-4 h-4" />
              Clock In
            </button>
            <button disabled className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 text-gray-400 text-xs font-semibold cursor-not-allowed">
              <Coffee className="w-4 h-4" />
              Break
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards - 4 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {summaryMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className={`bg-white rounded-lg border ${metric.borderColor} p-3 shadow-sm hover:shadow-md transition-all`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  {metric.subtext && (
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-0.5">
                      <ArrowUpRight className="w-2.5 h-2.5 text-green-600" />
                      {metric.subtext}
                    </p>
                  )}
                </div>
                <div className={`${metric.bgColor} p-2 rounded-lg`}>
                  <Icon className={`w-5 h-5 ${metric.iconColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid - 2 Columns (70/30) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 70% */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Tasks Card */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Pending Tasks</h2>
              <span className="bg-gray-600 text-white text-xs font-semibold px-3 py-1 rounded-full">{pendingTasks.length} tasks</span>
            </div>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                  <div className="flex-1">
                    <p className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer">{task.title}</p>
                    <p className="text-xs text-gray-500 mt-1">Due: {task.dueDate}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                        task.status === "pending"
                          ? "bg-red-100 text-red-700"
                          : task.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.status === "pending" ? "Pending" : task.status === "in-progress" ? "In Progress" : "Complete"}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 group">
              View all tasks <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Pending Requests Card */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                Pending Requests
              </h2>
              <span className="bg-gray-600 text-white text-xs font-semibold px-3 py-1 rounded-full">{pendingRequests.length} requests</span>
            </div>
            <div className="space-y-3">
              {pendingRequests.map((request) => (
                <div key={request.id} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                  <div className="w-2 h-2 rounded-full bg-yellow-600 mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{request.title}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{request.daysAgo} days ago</span>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">{request.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 group">
              View all requests <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Upcoming Events Card */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Upcoming Events
              </h2>
              <span className="text-xs text-gray-500">4 Events This Month</span>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{event.date} · {event.time}</p>
                    <p className="text-xs text-gray-600 mt-1">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 group">
              View Full Events Calendar <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column - 30% */}
        <div className="space-y-6">
          {/* Announcements Card */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Announcements</h2>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">{announcement.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{announcement.description}</p>
                </div>
              ))}
            </div>
            <button className="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 group">
              View All Announcements <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2.5">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                const isNewTask = index === 3;
                return (
                  <button
                    key={index}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                      isNewTask
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
