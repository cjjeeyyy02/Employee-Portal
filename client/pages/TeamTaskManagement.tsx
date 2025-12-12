import { useState } from "react";
import {
  Search,
  Plus,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

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
  <div className="bg-white rounded-md p-2 border border-gray-200">
    <div className="flex items-start justify-between mb-1.5">
      <h3 className="text-xs font-medium text-gray-700">{title}</h3>
      <Icon className="w-4 h-4 text-gray-400" />
    </div>
    <div className="mb-1.5">
      <p className={`text-2xl font-bold ${valueColor || "text-gray-900"}`}>
        {value}
      </p>
    </div>
    <p className="text-xs text-gray-600">{subtitle}</p>
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
    description:
      "Build secure login/logout functionality with JWT tokens and password encryption",
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
    description:
      "Create responsive mobile UI/UX designs for the new employee portal",
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

interface TeamMember {
  id: string;
  name: string;
  activeTasks: number;
  completedTasks: number;
  capacity: number;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Mike Chen",
    activeTasks: 3,
    completedTasks: 12,
    capacity: 85,
  },
  {
    id: "2",
    name: "Lisa Park",
    activeTasks: 2,
    completedTasks: 8,
    capacity: 60,
  },
  {
    id: "3",
    name: "Alex Kim",
    activeTasks: 4,
    completedTasks: 6,
    capacity: 95,
  },
  {
    id: "4",
    name: "Emma Wilson",
    activeTasks: 2,
    completedTasks: 15,
    capacity: 70,
  },
];

interface Project {
  id: string;
  name: string;
  totalTasks: number;
  completedTasks: number;
  progress: number;
  mainTask: string;
  mainTaskStatus: "todo" | "in-progress" | "review" | "completed";
}

const projects: Project[] = [
  {
    id: "1",
    name: "Project Alpha",
    totalTasks: 1,
    completedTasks: 0,
    progress: 0,
    mainTask: "Implement User Authentication System",
    mainTaskStatus: "in-progress",
  },
  {
    id: "2",
    name: "Mobile App",
    totalTasks: 1,
    completedTasks: 0,
    progress: 0,
    mainTask: "Design Mobile App Interface",
    mainTaskStatus: "review",
  },
  {
    id: "3",
    name: "Performance",
    totalTasks: 1,
    completedTasks: 0,
    progress: 0,
    mainTask: "Database Performance Optimization",
    mainTaskStatus: "todo",
  },
  {
    id: "4",
    name: "Documentation",
    totalTasks: 1,
    completedTasks: 1,
    progress: 100,
    mainTask: "Write API Documentation",
    mainTaskStatus: "completed",
  },
];

const getProjectStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "review":
      return "bg-blue-100 text-blue-800";
    case "in-progress":
      return "bg-orange-100 text-orange-800";
    case "todo":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

export default function TeamTaskManagement() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all-tasks");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [showTaskAnalytics, setShowTaskAnalytics] = useState(false);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showProjectDetailsModal, setShowProjectDetailsModal] = useState(false);
  const [allTasks, setAllTasks] = useState<Task[]>(tasks);
  const [reassignTask, setReassignTask] = useState<Task | null>(null);
  const [reassignees, setReassignees] = useState<string[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [messagingMember, setMessagingMember] = useState<TeamMember | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    assignees: [] as string[],
    dueDate: "",
    project: "",
  });

  const handleTaskAnalytics = () => {
    setShowTaskAnalytics(!showTaskAnalytics);
  };

  const handleNewTask = () => {
    setShowNewTaskModal(true);
  };

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.assignees.length) {
      toast({
        title: "Error",
        description: "Please fill in title and assign to at least one employee.",
      });
      return;
    }

    const task: Task = {
      id: (allTasks.length + 1).toString(),
      title: newTask.title,
      description: newTask.description,
      progress: 0,
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
      priority: newTask.priority,
      status: "todo",
      project: newTask.project || "Unassigned",
      estimated: "8h",
      actual: "",
      tags: [],
      assignees: newTask.assignees,
    };

    setAllTasks([...allTasks, task]);
    setShowNewTaskModal(false);
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      assignees: [],
      dueDate: "",
      project: "",
    });

    toast({
      title: "Task Created",
      description: `Task "${newTask.title}" has been assigned to ${newTask.assignees.join(", ")}.`,
    });
  };

  const handleMoreFilters = () => {
    toast({
      title: "More Filters",
      description: "Advanced filter options coming soon...",
    });
  };

  const handleReassignTask = (task: Task) => {
    setReassignTask(task);
    setReassignees(task.assignees);
    setShowReassignModal(true);
  };

  const handleConfirmReassign = () => {
    if (!reassignTask || reassignees.length === 0) {
      toast({
        title: "Error",
        description: "Please assign the task to at least one employee.",
      });
      return;
    }

    const updatedTasks = allTasks.map((task) =>
      task.id === reassignTask.id
        ? { ...task, assignees: reassignees }
        : task
    );

    setAllTasks(updatedTasks);
    setShowReassignModal(false);
    setReassignTask(null);
    setReassignees([]);

    toast({
      title: "Task Reassigned",
      description: `"${reassignTask.title}" has been reassigned to ${reassignees.join(", ")}.`,
    });
  };

  const handleAssignTask = (memberName: string) => {
    const member = teamMembers.find((m) => m.name === memberName);
    if (member) {
      setSelectedMember(member);
      setNewTask({
        title: "",
        description: "",
        priority: "medium",
        assignees: [member.name],
        dueDate: "",
        project: "",
      });
      setShowAssignTaskModal(true);
    }
  };

  const handleMessageMember = (memberName: string) => {
    const member = teamMembers.find((m) => m.name === memberName);
    if (member) {
      setMessagingMember(member);
      setMessages([]);
      setMessageInput("");
      setShowMessageModal(true);
    }
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !messagingMember) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "You",
      content: messageInput,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");

    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: messagingMember.name,
        content: `Thanks for your message! I'll get back to you soon.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, replyMessage]);
    }, 500);
  };

  const handleCreateAssignedTask = () => {
    if (!newTask.title || !selectedMember) {
      toast({
        title: "Error",
        description: "Please fill in the task title.",
      });
      return;
    }

    const task: Task = {
      id: (allTasks.length + 1).toString(),
      title: newTask.title,
      description: newTask.description,
      progress: 0,
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
      priority: newTask.priority,
      status: "todo",
      project: newTask.project || "Unassigned",
      estimated: "8h",
      actual: "",
      tags: [],
      assignees: newTask.assignees,
    };

    setAllTasks([...allTasks, task]);
    setShowAssignTaskModal(false);
    setSelectedMember(null);
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      assignees: [],
      dueDate: "",
      project: "",
    });

    toast({
      title: "Task Created",
      description: `Task "${newTask.title}" has been assigned to ${newTask.assignees.join(", ")}.`,
    });
  };

  const handleViewProjectDetails = (projectName: string) => {
    const project = projects.find((p) => p.name === projectName);
    if (project) {
      setSelectedProject(project);
      setShowProjectDetailsModal(true);
    }
  };

  const handleUpdateTask = (task: Task) => {
    toast({
      title: "Update Task",
      description: `Opening update form for "${task.title}"...`,
    });
    setOpenActionMenu(null);
  };

  const handleViewTask = (task: Task) => {
    toast({
      title: "View Task",
      description: `Viewing details for "${task.title}"...`,
    });
    setOpenActionMenu(null);
  };

  const handleCancelTask = (task: Task) => {
    toast({
      title: "Cancel Task",
      description: `Task "${task.title}" has been cancelled.`,
    });
    setOpenActionMenu(null);
  };

  const tabs = [
    { id: "all-tasks", label: "All Tasks" },
    { id: "team-workload", label: "Team Workload" },
  ];

  const filteredTasks = allTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto px-3 py-1.5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-lg font-semibold text-gray-900 mb-0">
                  Task & Workflow Management
                </h1>
                <p className="text-xs text-gray-600 mt-0.5">
                  Assign tasks, track progress, and oversee team deliverables and workload.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  className="gap-2 h-7 text-xs px-2"
                  onClick={handleTaskAnalytics}
                >
                  <TrendingUp className="w-3 h-3" />
                  Task Analytics
                </Button>
                <Button
                  className="gap-2 bg-blue-600 hover:bg-blue-700 h-7 text-xs px-2"
                  onClick={handleNewTask}
                >
                  <Plus className="w-3 h-3" />
                  New Task
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="mx-auto px-3 py-1">
          <div className="grid grid-cols-4 gap-2 mb-2">
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
        <div className="mx-auto px-3 pb-3">
          {/* Filter Bar */}
          <div className="flex items-center gap-2 mb-2">
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
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
            </div>

            <div className="relative">
              <button className="flex items-center gap-2 px-2 py-1 border border-gray-300 rounded-md bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 h-8">
                All Assignees
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs px-2"
              onClick={handleMoreFilters}
            >
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
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">
                        Title
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">
                        Assignee
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">
                        Due Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">
                        Progress
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredTasks.map((task) => (
                      <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <p className="text-xs font-semibold text-gray-900">
                            {task.title}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-900">
                          {task.project}
                        </td>
                        <td className="px-4 py-3">
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
                              <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-xs font-bold border border-white" title={`+${task.assignees.length - 2} more`}>
                                +{task.assignees.length - 2}
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {task.assignees.join(", ")}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-900">
                          {task.dueDate}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 max-w-xs">
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="bg-blue-600 h-1.5 rounded-full"
                                  style={{ width: `${task.progress}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-xs font-medium text-gray-900 w-8 text-right">
                              {task.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className={`text-xs font-medium ${getStatusColor(task.status)}`}>
                            {getStatusLabel(task.status)}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="relative">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              title="Task actions"
                              onClick={() => setOpenActionMenu(openActionMenu === task.id ? null : task.id)}
                            >
                              <MoreVertical className="w-4 h-4 text-gray-600" />
                            </Button>
                            {openActionMenu === task.id && (
                              <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-20">
                                <button
                                  onClick={() => handleUpdateTask(task)}
                                  className="w-full text-left px-4 py-2 text-xs hover:bg-gray-100 first:rounded-t-md text-gray-700"
                                >
                                  Update
                                </button>
                                <button
                                  onClick={() => handleViewTask(task)}
                                  className="w-full text-left px-4 py-2 text-xs hover:bg-gray-100 text-gray-700"
                                >
                                  View
                                </button>
                                <button
                                  onClick={() => handleCancelTask(task)}
                                  className="w-full text-left px-4 py-2 text-xs hover:bg-gray-100 text-gray-700"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => {
                                    handleReassignTask(task);
                                    setOpenActionMenu(null);
                                  }}
                                  className="w-full text-left px-4 py-2 text-xs hover:bg-gray-100 last:rounded-b-md text-gray-700"
                                >
                                  Reassign
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Team Workload Tab */}
          {activeTab === "team-workload" && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  Team Workload Overview
                </h2>
                <p className="text-xs text-gray-500">
                  Monitor team capacity and task distribution
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">
                          Team Member
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">
                          Current Workload
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">
                          Capacity (%)
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {teamMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <p className="text-xs font-semibold text-gray-900">
                              {member.name}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              {member.activeTasks} active • {member.completedTasks} completed
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 max-w-xs">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      member.capacity >= 90
                                        ? "bg-red-600"
                                        : member.capacity >= 75
                                          ? "bg-orange-600"
                                          : "bg-green-600"
                                    }`}
                                    style={{ width: `${member.capacity}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-900">
                            <span className={`inline-block px-2 py-1 rounded-full font-medium ${
                              member.capacity >= 90
                                ? "bg-red-100 text-red-800"
                                : member.capacity >= 75
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-green-100 text-green-800"
                            }`}>
                              {member.capacity}%
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="relative">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                title="Member actions"
                                onClick={() => setOpenActionMenu(openActionMenu === `member-${member.id}` ? null : `member-${member.id}`)}
                              >
                                <MoreVertical className="w-4 h-4 text-gray-600" />
                              </Button>
                              {openActionMenu === `member-${member.id}` && (
                                <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-20">
                                  <button
                                    onClick={() => {
                                      handleAssignTask(member.name);
                                      setOpenActionMenu(null);
                                    }}
                                    className="w-full text-left px-4 py-2 text-xs hover:bg-gray-100 first:rounded-t-md text-gray-700"
                                  >
                                    Assign Task
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleMessageMember(member.name);
                                      setOpenActionMenu(null);
                                    }}
                                    className="w-full text-left px-4 py-2 text-xs hover:bg-gray-100 last:rounded-b-md text-gray-700"
                                  >
                                    Message
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Task Analytics Modal */}
        {showTaskAnalytics && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Task Analytics
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    Detailed analytics and insights on task performance
                  </p>
                </div>
                <button
                  onClick={() => setShowTaskAnalytics(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Summary Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-xs text-gray-600 font-medium mb-1">
                      Total Tasks
                    </p>
                    <p className="text-3xl font-bold text-blue-600">
                      {allTasks.length}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-xs text-gray-600 font-medium mb-1">
                      Completed
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {allTasks.filter(t => t.status === "completed").length}
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="text-xs text-gray-600 font-medium mb-1">
                      In Progress
                    </p>
                    <p className="text-3xl font-bold text-orange-600">
                      {allTasks.filter(t => t.status === "in-progress").length}
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-xs text-gray-600 font-medium mb-1">
                      Overdue
                    </p>
                    <p className="text-3xl font-bold text-red-600">
                      {allTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== "completed").length}
                    </p>
                  </div>
                </div>

                {/* Task Status Breakdown */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-sm text-gray-900 mb-4">
                    Task Status Distribution
                  </h3>
                  <div className="space-y-3">
                    {["completed", "in-progress", "review", "todo"].map((status) => {
                      const count = allTasks.filter(t => t.status === status).length;
                      const percentage = allTasks.length > 0 ? Math.round((count / allTasks.length) * 100) : 0;
                      return (
                        <div key={status}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-700">
                              {getStatusLabel(status)}
                            </span>
                            <span className="text-sm font-semibold text-gray-900">
                              {count} ({percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                status === "completed" ? "bg-green-600" :
                                status === "in-progress" ? "bg-orange-600" :
                                status === "review" ? "bg-blue-600" :
                                "bg-gray-600"
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Priority Breakdown */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-sm text-gray-900 mb-4">
                    Tasks by Priority
                  </h3>
                  <div className="space-y-3">
                    {["urgent", "high", "medium", "low"].map((priority) => {
                      const count = allTasks.filter(t => t.priority === priority).length;
                      return (
                        <div key={priority} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(priority)}`}>
                              {priority.charAt(0).toUpperCase() + priority.slice(1)}
                            </span>
                            <span className="text-sm text-gray-600">{count} task{count !== 1 ? "s" : ""}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Team Insights */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-sm text-blue-900 mb-2">
                    📊 Team Insights
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Average task completion rate: {Math.round((allTasks.filter(t => t.status === "completed").length / allTasks.length) * 100)}%</li>
                    <li>• Most common priority: {["urgent", "high", "medium", "low"].reduce((acc, p) => {
                      const count = allTasks.filter(t => t.priority === p).length;
                      const accCount = allTasks.filter(t => t.priority === acc).length;
                      return count > accCount ? p : acc;
                    })}</li>
                    <li>• Tasks assigned to {new Set(allTasks.flatMap(t => t.assignees)).size} team members</li>
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
                <Button
                  className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                  onClick={() => setShowTaskAnalytics(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* New Task Modal */}
        {showNewTaskModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Create New Task
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    Assign a new task to team members
                  </p>
                </div>
                <button
                  onClick={() => setShowNewTaskModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Task Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Enter task title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Enter task description (optional)"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Project */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Project
                  </label>
                  <select
                    value={newTask.project}
                    onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select a project</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Priority *
                  </label>
                  <div className="flex gap-2">
                    {["low", "medium", "high", "urgent"].map((p) => (
                      <button
                        key={p}
                        onClick={() => setNewTask({ ...newTask, priority: p as any })}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          newTask.priority === p
                            ? `${getPriorityColor(p)}`
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Assign To Employee */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Assign To *
                  </label>
                  <div className="space-y-2">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`assignee-${member.id}`}
                          checked={newTask.assignees.includes(member.name)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewTask({
                                ...newTask,
                                assignees: [...newTask.assignees, member.name],
                              });
                            } else {
                              setNewTask({
                                ...newTask,
                                assignees: newTask.assignees.filter(a => a !== member.name),
                              });
                            }
                          }}
                          className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                        />
                        <label htmlFor={`assignee-${member.id}`} className="ml-3 text-sm text-gray-700 cursor-pointer">
                          {member.name}
                          <span className="text-xs text-gray-600 ml-2">
                            ({member.activeTasks} active, {member.capacity}% capacity)
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                  {newTask.assignees.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {newTask.assignees.map((assignee) => (
                        <div
                          key={assignee}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2"
                        >
                          {assignee}
                          <button
                            onClick={() =>
                              setNewTask({
                                ...newTask,
                                assignees: newTask.assignees.filter(a => a !== assignee),
                              })
                            }
                            className="hover:text-blue-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  className="flex-1 h-10 text-sm font-medium"
                  onClick={() => setShowNewTaskModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                  onClick={handleCreateTask}
                >
                  Create Task
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Reassign Task Modal */}
        {showReassignModal && reassignTask && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Reassign Task
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    {reassignTask.title}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowReassignModal(false);
                    setReassignTask(null);
                    setReassignees([]);
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Current Task Info */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Current Assignment
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {reassignTask.assignees.map((assignee) => (
                      <div
                        key={assignee}
                        className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {assignee}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Task Details */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 space-y-2">
                  <p className="text-xs text-blue-900">
                    <span className="font-semibold">Project:</span> {reassignTask.project}
                  </p>
                  <p className="text-xs text-blue-900">
                    <span className="font-semibold">Status:</span> {getStatusLabel(reassignTask.status)}
                  </p>
                  <p className="text-xs text-blue-900">
                    <span className="font-semibold">Priority:</span> {reassignTask.priority.charAt(0).toUpperCase() + reassignTask.priority.slice(1)}
                  </p>
                  <p className="text-xs text-blue-900">
                    <span className="font-semibold">Due Date:</span> {reassignTask.dueDate}
                  </p>
                </div>

                {/* Reassign To Employees */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Reassign To *
                  </label>
                  <div className="space-y-2">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`reassign-${member.id}`}
                          checked={reassignees.includes(member.name)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setReassignees([...reassignees, member.name]);
                            } else {
                              setReassignees(reassignees.filter(a => a !== member.name));
                            }
                          }}
                          className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                        />
                        <label htmlFor={`reassign-${member.id}`} className="ml-3 text-sm text-gray-700 cursor-pointer">
                          {member.name}
                          <span className="text-xs text-gray-600 ml-2">
                            ({member.activeTasks} active, {member.capacity}% capacity)
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                  {reassignees.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {reassignees.map((assignee) => (
                        <div
                          key={assignee}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2"
                        >
                          {assignee}
                          <button
                            onClick={() =>
                              setReassignees(reassignees.filter(a => a !== assignee))
                            }
                            className="hover:text-blue-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  className="flex-1 h-10 text-sm font-medium"
                  onClick={() => {
                    setShowReassignModal(false);
                    setReassignTask(null);
                    setReassignees([]);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                  onClick={handleConfirmReassign}
                >
                  Confirm Reassignment
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Assign Task Modal */}
        {showAssignTaskModal && selectedMember && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Assign Task to {selectedMember.name}
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    Create and assign a new task to this team member
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowAssignTaskModal(false);
                    setSelectedMember(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Member Info */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 space-y-2">
                  <p className="text-xs text-blue-900">
                    <span className="font-semibold">Team Member:</span> {selectedMember.name}
                  </p>
                  <p className="text-xs text-blue-900">
                    <span className="font-semibold">Active Tasks:</span> {selectedMember.activeTasks}
                  </p>
                  <p className="text-xs text-blue-900">
                    <span className="font-semibold">Current Capacity:</span> {selectedMember.capacity}%
                  </p>
                </div>

                {/* Task Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Enter task title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Enter task description (optional)"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Project */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Project
                  </label>
                  <select
                    value={newTask.project}
                    onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select a project</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Priority *
                  </label>
                  <div className="flex gap-2">
                    {["low", "medium", "high", "urgent"].map((p) => (
                      <button
                        key={p}
                        onClick={() => setNewTask({ ...newTask, priority: p as any })}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          newTask.priority === p
                            ? `${getPriorityColor(p)}`
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  className="flex-1 h-10 text-sm font-medium"
                  onClick={() => {
                    setShowAssignTaskModal(false);
                    setSelectedMember(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                  onClick={handleCreateAssignedTask}
                >
                  Create & Assign
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Message Modal */}
        {showMessageModal && messagingMember && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="bg-white border-b border-gray-200 p-6 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Chat with {messagingMember.name}
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    Online • Last seen just now
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowMessageModal(false);
                    setMessagingMember(null);
                    setMessages([]);
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 min-h-[400px]">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-center">
                    <p className="text-sm text-gray-600">
                      No messages yet. Start a conversation!
                    </p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.sender === "You"
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-900 border border-gray-200"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p className={`text-xs mt-1 ${msg.sender === "You" ? "text-blue-100" : "text-gray-600"}`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Input Area */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-4"
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Project Details Modal */}
        {showProjectDetailsModal && selectedProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {selectedProject.name}
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    Project details and task breakdown
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowProjectDetailsModal(false);
                    setSelectedProject(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Overview Section */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-xs text-blue-600 font-medium mb-1">
                      Total Tasks
                    </p>
                    <p className="text-3xl font-bold text-blue-900">
                      {selectedProject.totalTasks}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <p className="text-xs text-green-600 font-medium mb-1">
                      Completed
                    </p>
                    <p className="text-3xl font-bold text-green-900">
                      {selectedProject.completedTasks}
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <p className="text-xs text-orange-600 font-medium mb-1">
                      In Progress
                    </p>
                    <p className="text-3xl font-bold text-orange-900">
                      {selectedProject.totalTasks - selectedProject.completedTasks}
                    </p>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">
                    Overall Progress
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Completion Rate
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {selectedProject.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          selectedProject.progress >= 80
                            ? "bg-green-600"
                            : selectedProject.progress >= 50
                              ? "bg-orange-600"
                              : "bg-blue-600"
                        }`}
                        style={{ width: `${selectedProject.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Main Task Section */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">
                    Main Task
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        {selectedProject.mainTask}
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getProjectStatusColor(selectedProject.mainTaskStatus)}`}
                        >
                          {getStatusLabel(selectedProject.mainTaskStatus)}
                        </span>
                        <span className="text-xs text-gray-600">
                          Current Status
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related Tasks Section */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">
                    Related Tasks in Project
                  </h3>
                  <div className="space-y-3">
                    {allTasks
                      .filter((t) => t.project === selectedProject.name)
                      .map((task) => (
                        <div
                          key={task.id}
                          className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-sm font-medium text-gray-900">
                              {task.title}
                            </h4>
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}
                            >
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex-1 mr-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-gray-600">
                                  Progress
                                </span>
                                <span className="text-xs font-medium text-gray-900">
                                  {task.progress}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-300 rounded-full h-1.5">
                                <div
                                  className="bg-blue-600 h-1.5 rounded-full"
                                  style={{ width: `${task.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>{getStatusLabel(task.status)}</span>
                            <span>Due {task.dueDate}</span>
                          </div>
                        </div>
                      ))}
                    {allTasks.filter((t) => t.project === selectedProject.name).length === 0 && (
                      <p className="text-xs text-gray-600 text-center py-4">
                        No tasks found for this project
                      </p>
                    )}
                  </div>
                </div>

                {/* Team Section */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">
                    Team Members Involved
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Array.from(
                      new Set(
                        allTasks
                          .filter((t) => t.project === selectedProject.name)
                          .flatMap((t) => t.assignees)
                      )
                    ).map((memberName) => {
                      const member = teamMembers.find((m) => m.name === memberName);
                      return member ? (
                        <div
                          key={member.id}
                          className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <p className="text-sm font-medium text-gray-900">
                            {member.name}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {member.activeTasks} active tasks
                          </p>
                        </div>
                      ) : null;
                    })}
                    {Array.from(
                      new Set(
                        allTasks
                          .filter((t) => t.project === selectedProject.name)
                          .flatMap((t) => t.assignees)
                      )
                    ).length === 0 && (
                      <p className="text-xs text-gray-600 col-span-2 text-center py-4">
                        No team members assigned
                      </p>
                    )}
                  </div>
                </div>

                {/* Project Statistics */}
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="text-sm font-semibold text-blue-900 mb-3">
                    📊 Project Statistics
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>
                      • Completion rate: <span className="font-semibold">{selectedProject.progress}%</span>
                    </li>
                    <li>
                      • Tasks completed: <span className="font-semibold">{selectedProject.completedTasks}/{selectedProject.totalTasks}</span>
                    </li>
                    <li>
                      • Team members: <span className="font-semibold">
                        {Array.from(
                          new Set(
                            allTasks
                              .filter((t) => t.project === selectedProject.name)
                              .flatMap((t) => t.assignees)
                          )
                        ).length}
                      </span>
                    </li>
                    <li>
                      • Main task status: <span className="font-semibold">{getStatusLabel(selectedProject.mainTaskStatus)}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
                <Button
                  className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                  onClick={() => {
                    setShowProjectDetailsModal(false);
                    setSelectedProject(null);
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
