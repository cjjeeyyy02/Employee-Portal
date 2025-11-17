import { useState } from "react";
import { Plus, Calendar, Folder, Filter, Search, List, Trash2, TrendingUp, Target, Clock, X, Zap, MoreVertical, Edit, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";

type TabType = "myTasks" | "teamTasks";
type ViewType = "list" | "calendar";
type ModalType = "newTask" | "filters" | "aiAssistant" | "viewProject" | "deleteConfirm" | null;

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
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [actionDropdown, setActionDropdown] = useState<number | null>(null);

  // Form states
  const [newTaskForm, setNewTaskForm] = useState({ title: '', description: '', dueDate: '', category: '', priority: 'Medium' });
  const [filterPanel, setFilterPanel] = useState({ status: 'All Status', priority: 'All Priorities' });
  const [aiInput, setAiInput] = useState('');

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleNewTask = () => {
    if (newTaskForm.title && newTaskForm.dueDate && newTaskForm.category) {
      showNotification('Task created successfully', 'success');
      setNewTaskForm({ title: '', description: '', dueDate: '', category: '', priority: 'Medium' });
      setActiveModal(null);
    } else {
      showNotification('Please fill in all required fields', 'info');
    }
  };

  const handleDeleteTask = (taskId: number) => {
    setTaskToDelete(taskId);
    setActiveModal('deleteConfirm');
  };

  const confirmDeleteTask = () => {
    if (taskToDelete !== null) {
      showNotification('Task deleted successfully', 'success');
      setTaskToDelete(null);
      setActiveModal(null);
    }
  };

  const handleMarkComplete = (taskId: number) => {
    showNotification('Task marked as complete', 'success');
  };

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setActiveModal('viewProject');
    showNotification(`Opening project: ${project.title}`, 'info');
  };

  const handleApplyFilters = () => {
    setFilterStatus(filterPanel.status);
    setFilterPriority(filterPanel.priority);
    showNotification('Filters applied', 'success');
    setActiveModal(null);
  };

  const handleAiAssistant = () => {
    if (aiInput.trim()) {
      showNotification(`AI processing: "${aiInput}"`, 'info');
      setAiInput('');
    } else {
      showNotification('Please enter a task or question', 'info');
    }
  };

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

  const teamMembers = [
    { name: "John Doe", taskCount: 2 },
    { name: "Alex Kim", taskCount: 1 },
    { name: "Sarah Johnson", taskCount: 1 },
    { name: "Mike Chen", taskCount: 1 },
  ];

  const teamTasksData: Record<string, Task[]> = {
    "John Doe": [
      {
        id: 1,
        title: "Complete Q4 Performance Review",
        description: "",
        dueDate: "2024-12-16",
        category: "Performance Reviews",
        priority: "High",
        status: "In Progress",
        assignedTo: "John Doe",
        avatar: "JD",
      },
      {
        id: 2,
        title: "Submit expense report",
        description: "",
        dueDate: "2024-12-10",
        category: "Administrative",
        priority: "Low",
        status: "Done",
        assignedTo: "John Doe",
        avatar: "JD",
      },
    ],
    "Alex Kim": [
      {
        id: 3,
        title: "Review code submissions",
        description: "",
        dueDate: "2024-12-15",
        category: "Code Review",
        priority: "Medium",
        status: "In Progress",
        assignedTo: "Alex Kim",
        avatar: "AK",
      },
    ],
    "Sarah Johnson": [
      {
        id: 4,
        title: "Update project documentation",
        description: "",
        dueDate: "2024-12-20",
        category: "Documentation",
        priority: "Medium",
        status: "Todo",
        assignedTo: "Sarah Johnson",
        avatar: "SJ",
      },
    ],
    "Mike Chen": [
      {
        id: 5,
        title: "Schedule team meeting",
        description: "",
        dueDate: "2024-12-12",
        category: "Meetings",
        priority: "High",
        status: "In Progress",
        assignedTo: "Mike Chen",
        avatar: "MC",
      },
    ],
  };

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
      {/* Header Section */}
      <div className="mb-1.5 sm:mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
        <div>
          <h1 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5">Task Management</h1>
          <p className="text-xs text-gray-600">Manage your tasks, projects, and deadlines</p>
        </div>
        <div className="flex gap-1 sm:gap-2 flex-wrap">
          <button onClick={() => setActiveModal('aiAssistant')} className="px-3 py-1.5 text-xs text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            AI Assistant
          </button>
          <button onClick={() => setActiveModal('newTask')} className="px-3 py-1.5 text-xs bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            New Task
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-2 sm:mb-3 bg-white">
        <div className="flex gap-0 px-2 sm:px-3">
          {[
            { id: "myTasks", label: "My Tasks" },
            { id: "teamTasks", label: "Team Tasks" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-all ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-blue-600"
                  : "text-gray-600 border-b-transparent hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ===== MY TASKS TAB ===== */}
      {activeTab === "myTasks" && (
          <>
            {/* Top Controls Row - Search on Right */}
            <div className="flex items-center justify-between mb-4 gap-3">
              {/* View Options - Left Side */}
              <div className="flex gap-2">
                {[
                  { id: "list", label: "List", icon: List },
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

              {/* Search and Filters - Right Side */}
              <div className="flex gap-3">
                {/* Search Bar */}
                <div className="max-w-sm relative">
                  <Search className="absolute left-2.5 top-2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tasks…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            </div>

            {/* LIST VIEW */}
            {activeView === "list" && (
              <div className="space-y-2.5">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white rounded-[12px] border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow"
                    >
                      {/* Top Row: Title and Actions Dropdown */}
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-base font-bold text-gray-900 flex-1">{task.title}</h3>
                        <div className="relative">
                          <button
                            onClick={() => setActionDropdown(actionDropdown === task.id ? null : task.id)}
                            className="text-gray-400 hover:text-gray-700 transition-colors flex-shrink-0 p-1"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          {actionDropdown === task.id && (
                            <div className="absolute right-0 mt-1 bg-white rounded-lg border border-gray-200 shadow-lg z-10">
                              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 text-xs font-medium border-b border-gray-100">
                                <Edit className="w-3.5 h-3.5" />
                                Edit
                              </button>
                              <button onClick={() => handleMarkComplete(task.id)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 text-xs font-medium border-b border-gray-100">
                                <CheckCircle className="w-3.5 h-3.5" />
                                Mark as Complete
                              </button>
                              <button onClick={() => { handleDeleteTask(task.id); setActionDropdown(null); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 text-xs font-medium">
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
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

                      {/* Bottom Row: Badges and Avatar */}
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

                        {/* Avatar and Name */}
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
                            {task.avatar}
                          </div>
                          <span className="text-xs text-gray-700">{task.assignedTo}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No tasks found. Try adjusting your filters.</p>
                  </div>
                )}
              </div>
            )}

            {/* CALENDAR VIEW */}
            {activeView === "calendar" && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Calendar - December 2024</h3>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="text-center font-semibold text-gray-700 text-sm py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 35 }).map((_, i) => {
                      const date = i - 6 + 1;
                      const isCurrentMonth = date > 0 && date <= 31;
                      const dateStr = isCurrentMonth ? `Dec ${date}, 2024` : "";
                      const dayTasks = filteredTasks.filter((task) => task.dueDate === dateStr);

                      return (
                        <div
                          key={i}
                          className={`min-h-[100px] p-2 rounded-lg border ${
                            isCurrentMonth
                              ? "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                              : "bg-gray-50 border-gray-100"
                          }`}
                        >
                          {isCurrentMonth && (
                            <>
                              <div className="font-semibold text-sm text-gray-900 mb-1">{date}</div>
                              <div className="space-y-1">
                                {dayTasks.slice(0, 2).map((task) => (
                                  <div
                                    key={task.id}
                                    className="text-xs bg-blue-50 text-blue-700 p-1 rounded truncate hover:bg-blue-100 cursor-pointer"
                                    title={task.title}
                                  >
                                    {task.title}
                                  </div>
                                ))}
                                {dayTasks.length > 2 && (
                                  <div className="text-xs text-gray-600 px-1">
                                    +{dayTasks.length - 2} more
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Upcoming Tasks</h4>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {filteredTasks.slice(0, 5).map((task) => (
                      <div key={task.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{task.title}</p>
                          <p className="text-xs text-gray-600">{task.dueDate}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ===== TEAM TASKS TAB ===== */}
        {activeTab === "teamTasks" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Team Members */}
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3">Team Members</h2>
              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <button
                    key={member.name}
                    onClick={() => setSelectedTeamMember(member.name)}
                    className={`w-full bg-white rounded-[12px] border shadow-sm p-3 flex justify-between items-center transition-all ${
                      selectedTeamMember === member.name
                        ? "border-blue-300 shadow-md"
                        : "border-gray-200 hover:shadow-md"
                    }`}
                  >
                    <p className="text-sm font-bold text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-600">{member.taskCount} task{member.taskCount !== 1 ? "s" : ""}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Tasks for Selected Member */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-base font-bold text-gray-900">Tasks for {selectedTeamMember}</h2>
                <button
                  onClick={() => setSelectedTeamMember("John Doe")}
                  className="px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear
                </button>
              </div>

              <div className="space-y-3">
                {(teamTasksData[selectedTeamMember] || []).map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-[12px] border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow"
                  >
                    {/* Task Title */}
                    <h3 className="text-base font-bold text-gray-900 mb-2">{task.title}</h3>

                    {/* Category and Due Date */}
                    <p className="text-xs text-gray-600 mb-3">
                      {task.category} • {task.dueDate}
                    </p>

                    {/* Badges */}
                    <div className="flex gap-2">
                      {/* Priority Badge */}
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>

                      {/* Status Badge */}
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg text-white text-sm font-medium z-50 ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
        }`}>
          {notification.message}
        </div>
      )}

      {/* New Task Modal */}
      {activeModal === 'newTask' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Create New Task</h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                <input
                  type="text"
                  value={newTaskForm.title}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, title: e.target.value })}
                  placeholder="Enter task title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTaskForm.description}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, description: e.target.value })}
                  placeholder="Enter task description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newTaskForm.category}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Performance Reviews">Performance Reviews</option>
                  <option value="Team Meetings">Team Meetings</option>
                  <option value="Administrative">Administrative</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newTaskForm.dueDate}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newTaskForm.priority}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setActiveModal(null)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                  Cancel
                </button>
                <button onClick={handleNewTask} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters Modal */}
      {activeModal === 'filters' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Filter Tasks</h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <div className="space-y-2">
                  {['All Status', 'Todo', 'In Progress', 'Review', 'Done'].map((status) => (
                    <label key={status} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={filterPanel.status === status}
                        onChange={(e) => setFilterPanel({ ...filterPanel, status: e.target.value })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <div className="space-y-2">
                  {['All Priorities', 'High', 'Medium', 'Low'].map((priority) => (
                    <label key={priority} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="priority"
                        value={priority}
                        checked={filterPanel.priority === priority}
                        onChange={(e) => setFilterPanel({ ...filterPanel, priority: e.target.value })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{priority}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setActiveModal(null)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                  Cancel
                </button>
                <button onClick={handleApplyFilters} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Modal */}
      {activeModal === 'aiAssistant' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Ask AI to help with your tasks. You can request task suggestions, summaries, or automation.</p>
              <textarea
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="e.g., Create a task for Q4 review or summarize my tasks"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              ></textarea>
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm text-blue-800">
                <p>AI can help you: Create tasks, Summarize progress, Set reminders, Assign tasks</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setActiveModal(null)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                  Cancel
                </button>
                <button onClick={handleAiAssistant} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-2">
                  <Zap className="w-3.5 h-3.5" />
                  Ask AI
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Project Modal */}
      {activeModal === 'viewProject' && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">{selectedProject.title}</h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-3">{selectedProject.subtitle}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-lg font-bold text-gray-900">{selectedProject.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${selectedProject.progress}%` }}></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {selectedProject.completedTasks} of {selectedProject.totalTasks} tasks completed
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Team Members</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.team.map((member) => (
                    <span key={member} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                      {member}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm text-blue-800">
                <p>Project is in progress. Continue tracking tasks in the My Tasks tab.</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => setActiveModal(null)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                  Close
                </button>
                <button onClick={() => { showNotification('Project details updated', 'success'); setActiveModal(null); }} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {activeModal === 'deleteConfirm' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full mx-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 text-center mb-2">Delete Task?</h2>
            <p className="text-sm text-gray-600 text-center mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => { setActiveModal(null); setTaskToDelete(null); }} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                Cancel
              </button>
              <button onClick={confirmDeleteTask} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
