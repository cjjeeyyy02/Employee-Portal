import { useState } from "react";
import { Search, Plus, TrendingUp, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";

const MetricCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  valueColor,
}: {
  icon: React.ElementType;
  title: string;
  value: string | number;
  subtitle: string;
  valueColor?: string;
}) => (
  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
    <div className="flex items-start justify-between mb-2">
      <h3 className="text-xs font-medium text-slate-600">{title}</h3>
      <Icon className="w-4 h-4 text-slate-400" />
    </div>
    <div className="mb-2">
      <p className={`text-2xl font-bold ${valueColor || "text-gray-900"}`}>
        {value}
      </p>
    </div>
    <p className="text-xs text-slate-500">{subtitle}</p>
  </div>
);

interface Task {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "in-progress" | "review" | "completed";
  project: string;
  estimated: string;
  actual: string;
  tags: string[];
  assignees: string[];
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Implement User Authentication System",
    description: "Build secure login/logout functionality with JWT tokens and password encryption",
    progress: 65,
    dueDate: "2024-12-20",
    priority: "high",
    status: "in-progress",
    project: "Project Alpha",
    estimated: "40h",
    actual: "25h",
    tags: ["backend", "security", "authentication"],
    assignees: ["Mike Chen"],
  },
  {
    id: "2",
    title: "Design Mobile App Interface",
    description: "Create responsive mobile UI/UX designs for the new employee portal",
    progress: 90,
    dueDate: "2024-12-18",
    priority: "medium",
    status: "review",
    project: "Mobile App",
    estimated: "32h",
    actual: "30h",
    tags: ["design", "mobile", "ui/ux"],
    assignees: ["Lisa Park", "Mike Chen"],
  },
  {
    id: "3",
    title: "Database Performance Optimization",
    description: "Optimize database queries and implement caching strategies",
    progress: 0,
    dueDate: "2024-12-15",
    priority: "urgent",
    status: "todo",
    project: "Performance",
    estimated: "24h",
    actual: "",
    tags: ["database", "performance", "optimization"],
    assignees: ["Alex Kim"],
  },
  {
    id: "4",
    title: "Write API Documentation",
    description: "Complete comprehensive API documentation for all endpoints",
    progress: 100,
    dueDate: "2024-12-10",
    priority: "low",
    status: "completed",
    project: "Documentation",
    estimated: "16h",
    actual: "18h",
    tags: ["documentation", "api"],
    assignees: ["Alex Kim"],
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-800";
    case "high":
      return "bg-orange-100 text-orange-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "text-green-600";
    case "review":
      return "text-blue-600";
    case "in-progress":
      return "text-orange-600";
    case "todo":
      return "text-gray-600";
    default:
      return "text-gray-600";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "in-progress":
      return "In Progress";
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

export default function TeamTaskManagement() {
  const [activeTab, setActiveTab] = useState("all-tasks");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "all-tasks", label: "All Tasks" },
    { id: "team-workload", label: "Team Workload" },
    { id: "project-view", label: "Project View" },
  ];

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  Task Management
                </h1>
                <p className="text-xs text-gray-600">
                  Assign, monitor, and track team tasks and projects
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" className="gap-2 h-8 text-sm px-3">
                  <TrendingUp className="w-4 h-4" />
                  Task Analytics
                </Button>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700 h-8 text-sm px-3">
                  <Plus className="w-4 h-4" />
                  New Task
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-4 gap-3 mb-5">
            <MetricCard
              icon={CheckCircle2}
              title="Total Tasks"
              value="4"
              subtitle="1 completed"
              valueColor="text-blue-600"
            />
            <MetricCard
              icon={Clock}
              title="In Progress"
              value="1"
              subtitle="Active tasks"
              valueColor="text-orange-600"
            />
            <MetricCard
              icon={AlertCircle}
              title="Overdue"
              value="2"
              subtitle="Need attention"
              valueColor="text-red-600"
            />
            <MetricCard
              icon={TrendingUp}
              title="Completion Rate"
              value="78%"
              subtitle="+5% from last month"
              valueColor="text-green-600"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 pb-8">
          {/* Filter Bar */}
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search tasks..."
                className="pl-10 rounded-full h-8 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="relative">
              <button className="flex items-center gap-2 px-2 py-1 border border-gray-300 rounded-md bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 h-8">
                All Status
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>

            <div className="relative">
              <button className="flex items-center gap-2 px-2 py-1 border border-gray-300 rounded-md bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 h-8">
                All Assignees
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>

            <Button variant="outline" size="sm" className="h-8 text-xs px-2">
              More Filters
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-4 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tasks List */}
          {activeTab === "all-tasks" && (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-gray-900 mb-1">
                        {task.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        {task.description}
                      </p>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex-1 max-w-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">Progress</span>
                            <span className="text-xs font-medium text-gray-900">{task.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-blue-600 h-1.5 rounded-full"
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 mb-2">
                        Due {task.dueDate}
                      </p>
                      <p className="text-xs text-gray-600">
                        {task.estimated} estimated {task.actual && `/ ${task.actual} actual`}
                      </p>
                    </div>

                    <div className="ml-4 flex-shrink-0">
                      <div className="text-right">
                        <div className="mb-2">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                        </div>
                        <p className={`text-xs font-medium ${getStatusColor(task.status)}`}>
                          {getStatusLabel(task.status)}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {task.project}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        {task.assignees.slice(0, 2).map((assignee, idx) => (
                          <div
                            key={idx}
                            className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold border border-white"
                            title={assignee}
                          >
                            {assignee.charAt(0)}
                          </div>
                        ))}
                        {task.assignees.length > 2 && (
                          <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-xs font-bold border border-white">
                            +{task.assignees.length - 2}
                          </div>
                        )}
                      </div>
                      <Button variant="outline" className="h-7 text-xs px-2" title="Reassign task">
                        Reassign
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Team Workload Tab */}
          {activeTab === "team-workload" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Team Workload
              </h2>
              <p className="text-xs text-gray-600">
                View team member workload and capacity
              </p>
            </div>
          )}

          {/* Project View Tab */}
          {activeTab === "project-view" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Project View
              </h2>
              <p className="text-xs text-gray-600">
                View tasks organized by projects
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
