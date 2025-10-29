import { useState } from "react";
import { Plus, Calendar, Folder, Filter, Search, Grid3x3, List, Trash2 } from "lucide-react";
import Layout from "@/components/Layout";

type TabType = "myTasks" | "projects" | "teamTasks" | "analytics";
type ViewType = "list" | "kanban" | "calendar";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  status: "Todo" | "In Progress" | "Review" | "Done";
  assignedTo: string;
  avatar: string;
}

interface Project {
  id: number;
  title: string;
  subtitle: string;
  progress: number;
  completedTasks: number;
  totalTasks: number;
  team: string[];
}

export default function MyTasks() {
  const [activeTab, setActiveTab] = useState<TabType>("myTasks");
  const [activeView, setActiveView] = useState<ViewType>("calendar");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [filterPriority, setFilterPriority] = useState("All Priorities");
  const [selectedTeamMember, setSelectedTeamMember] = useState<string>("John Doe");

  const tasks: Task[] = [
    {
      id: 1,
      title: "Complete Q4 Performance Review",
      description: "Finalize self-evaluation and submit for manager review",
      dueDate: "Dec 16, 2024",
      category: "Performance Reviews",
      priority: "High",
      status: "In Progress",
      assignedTo: "John Doe",
      avatar: "JD",
    },
    {
      id: 2,
      title: "Update employee documentation",
      description: "Review and update project documentation for new team members",
      dueDate: "Dec 20, 2024",
      category: "Documentation",
      priority: "Medium",
      status: "Todo",
      assignedTo: "Alex Kim",
      avatar: "AK",
    },
    {
      id: 3,
      title: "Prepare team presentation",
      description: "Create slides for monthly team meeting presentation",
      dueDate: "Dec 18, 2024",
      category: "Team Meetings",
      priority: "Medium",
      status: "Review",
      assignedTo: "Sarah Johnson",
      avatar: "SJ",
    },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "Q4 Performance Reviews",
      subtitle: "Annual performance review cycle",
      progress: 75,
      completedTasks: 6,
      totalTasks: 8,
      team: ["John Doe", "Sarah Johnson", "Mike Chen"],
    },
    {
      id: 2,
      title: "Documentation Update",
      subtitle: "Updating all project documentation",
      progress: 45,
      completedTasks: 5,
      totalTasks: 12,
      team: ["John Doe", "Alex Kim", "Lisa Brown"],
    },
    {
      id: 3,
      title: "Team Development",
      subtitle: "Team building and skill development initiatives",
      progress: 30,
      completedTasks: 2,
      totalTasks: 6,
      team: ["John Doe", "Sarah Johnson"],
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-orange-100 text-orange-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Todo":
        return "bg-gray-100 text-gray-800";
      case "Review":
        return "bg-orange-100 text-orange-800";
      case "Done":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All Status" || task.status === filterStatus;
    const matchesPriority = filterPriority === "All Priorities" || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen p-4">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">Task Management</h1>
            <p className="text-xs text-gray-600">Manage your tasks, projects, and deadlines</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors">
              AI Assistant
            </button>
            <button className="px-3 py-1.5 text-xs text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              Filters
            </button>
            <button className="px-3 py-1.5 text-xs bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              New Task
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-4">
          {[
            { id: "myTasks", label: "My Tasks" },
            { id: "projects", label: "Projects" },
            { id: "teamTasks", label: "Team Tasks" },
            { id: "analytics", label: "Analytics" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===== MY TASKS TAB ===== */}
        {activeTab === "myTasks" && (
          <>
            {/* View Options */}
            <div className="flex gap-2 mb-4">
              {[
                { id: "list", label: "List", icon: List },
                { id: "kanban", label: "Kanban", icon: Grid3x3 },
                { id: "calendar", label: "Calendar", icon: Calendar },
              ].map((view) => {
                const Icon = view.icon;
                return (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(view.id as ViewType)}
                    className={`px-3 py-1.5 text-xs rounded-lg flex items-center gap-1.5 transition-colors ${
                      activeView === view.id
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {view.label}
                  </button>
                );
              })}
            </div>

            {/* Search and Filters Row */}
            <div className="flex gap-3 mb-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              >
                <option>All Status</option>
                <option>Todo</option>
                <option>In Progress</option>
                <option>Review</option>
                <option>Done</option>
              </select>

              {/* Priority Filter */}
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              >
                <option>All Priorities</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            {/* Task Cards */}
            <div className="space-y-2.5">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-[12px] border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow"
                >
                  {/* Top Row: Title and Delete Button */}
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-bold text-gray-900 flex-1">{task.title}</h3>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 mb-2.5">{task.description}</p>

                  {/* Middle Row: Icons and Details */}
                  <div className="flex gap-4 mb-2.5 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>{task.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Folder className="w-3.5 h-3.5 text-gray-400" />
                      <span>{task.category}</span>
                    </div>
                  </div>

                  {/* Bottom Row: Badges, Action Button, and Avatar */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1.5">
                      {/* Priority Badge */}
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>

                      {/* Status Badge */}
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Mark Complete Button */}
                      <button className="text-blue-600 text-xs font-medium hover:text-blue-700 transition-colors whitespace-nowrap">
                        Mark Complete
                      </button>

                      {/* Avatar and Name */}
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
                          {task.avatar}
                        </div>
                        <span className="text-xs text-gray-700">{task.assignedTo}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ===== PROJECTS TAB ===== */}
        {activeTab === "projects" && (
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-4">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-[12px] border border-gray-200 shadow-sm p-5 hover:border-blue-300 hover:shadow-md transition-all flex flex-col"
                >
                  {/* Project Title */}
                  <h3 className="text-base font-bold text-gray-900 mb-1">{project.title}</h3>

                  {/* Project Subtitle */}
                  <p className="text-sm text-gray-600 mb-3">{project.subtitle}</p>

                  {/* Progress Percentage */}
                  <p className="text-lg font-bold text-gray-900 mb-1">{project.progress}%</p>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                  </div>

                  {/* Task Count */}
                  <p className="text-xs text-gray-600 mb-4">
                    {project.completedTasks}/{project.totalTasks} tasks
                  </p>

                  {/* Team Members and View Button */}
                  <div className="flex justify-between items-end mt-auto">
                    {/* Team Members */}
                    <div className="flex-1">
                      <p className="text-xs text-gray-700">{project.team.join(", ")}</p>
                    </div>

                    {/* View Project Button */}
                    <button className="px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap ml-2">
                      View Project
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== OTHER TABS PLACEHOLDER ===== */}
        {(activeTab === "teamTasks" || activeTab === "analytics") && (
          <div className="bg-white rounded-[12px] border border-gray-200 shadow-sm p-8 text-center">
            <p className="text-gray-600">This tab is coming soon</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
