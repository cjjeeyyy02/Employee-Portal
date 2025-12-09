import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Download,
  Users,
  TrendingUp,
  CheckCircle,
  Grid3x3,
  List,
  Mail,
  MessageCircle,
  MoreVertical,
  Clock,
  ChevronDown,
  HelpCircle,
  GitBranch,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useView } from "@/context/ViewContext";

interface TeamMember {
  id: number;
  name: string;
  email: string;
  avatar: string;
  department: string;
  position: string;
  status: "Active" | "Inactive" | "On Leave";
  joinedDate: string;
  skills: string[];
  lastSeen: string;
  performance: number;
  completed: number;
  active: number;
  managerId?: number;
}

const teamMembers: TeamMember[] = [
  {
    id: 4,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    department: "Product + Engineering",
    position: "Product Manager",
    status: "Active",
    joinedDate: "Sep 05, 2020",
    skills: ["Product Strategy", "Analytics", "Leadership"],
    lastSeen: "30 min ago",
    performance: 4.7,
    completed: 92,
    active: 6,
  },
  {
    id: 1,
    name: "Mike Chen",
    email: "mike.chen@company.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    department: "Product + Engineering",
    position: "Senior Designer",
    status: "Active",
    joinedDate: "Jan 15, 2022",
    skills: ["UI Design", "Prototyping", "Figma"],
    lastSeen: "2 hours ago",
    performance: 4.5,
    completed: 87,
    active: 5,
    managerId: 4,
  },
  {
    id: 2,
    name: "Lisa Park",
    email: "lisa.park@company.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    department: "UX Design + Design",
    position: "UX Designer",
    status: "Active",
    joinedDate: "Mar 22, 2021",
    skills: ["UX Research", "Wireframing", "Accessibility"],
    lastSeen: "1 hour ago",
    performance: 4.2,
    completed: 64,
    active: 3,
    managerId: 4,
  },
  {
    id: 3,
    name: "Alex Kim",
    email: "alex.kim@company.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    department: "Junior Developer + Engineering",
    position: "Junior Developer",
    status: "Active",
    joinedDate: "Jul 10, 2023",
    skills: ["React", "TypeScript", "CSS"],
    lastSeen: "1 day ago",
    performance: 4,
    completed: 43,
    active: 2,
    managerId: 4,
  },
];

const MetricCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  indicator,
  indicatorColor,
  valueColor,
  onClick,
  clickable,
}: {
  icon: React.ElementType;
  title: string;
  value: string | number;
  subtitle: string;
  indicator?: string;
  indicatorColor?: string;
  valueColor?: string;
  onClick?: () => void;
  clickable?: boolean;
}) => (
  <div
    className={`bg-white rounded-md p-2 border border-gray-200 ${
      clickable ? "cursor-pointer hover:shadow-md hover:border-blue-300" : ""
    }`}
    onClick={onClick}
  >
    <div className="flex items-start justify-between mb-1.5">
      <h3 className="text-xs font-medium text-gray-700">{title}</h3>
      <Icon className="w-4 h-4 text-gray-400" />
    </div>
    <div className="mb-1.5">
      <p className={`text-2xl font-bold ${valueColor || "text-gray-900"}`}>
        {value}
      </p>
      {indicator && (
        <p className={`text-xs font-medium mt-0.5 ${indicatorColor || "text-gray-600"}`}>
          {indicator}
        </p>
      )}
    </div>
    <p className="text-xs text-gray-600">{subtitle}</p>
  </div>
);

const OrgChartNode = ({
  member,
  allMembers,
}: {
  member: TeamMember;
  allMembers: TeamMember[];
}) => {
  const subordinates = allMembers.filter((m) => m.managerId === member.id);

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white border-2 border-blue-400 rounded-lg p-3 w-52 text-center shadow-md hover:shadow-lg transition-shadow">
        <img
          src={member.avatar}
          alt={member.name}
          className="w-12 h-12 rounded-full object-cover mx-auto mb-2"
        />
        <h3 className="font-semibold text-sm text-gray-900">{member.name}</h3>
        <p className="text-xs text-blue-600 font-medium">{member.position}</p>
        <p className="text-xs text-gray-600">{member.department}</p>
        <span
          className={`inline-block mt-1.5 px-2 py-0.5 rounded text-xs font-medium ${
            member.status === "Active"
              ? "bg-green-100 text-green-800"
              : member.status === "On Leave"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {member.status}
        </span>
      </div>

      {subordinates.length > 0 && (
        <div className="mt-6 flex flex-col items-center">
          <div className="h-6 border-l-2 border-gray-400"></div>
          <div className="flex gap-8">
            {subordinates.map((sub) => (
              <div key={sub.id} className="flex flex-col items-center">
                <div className="h-4 border-b-2 border-gray-400 w-24"></div>
                <div className="h-4 border-l-2 border-gray-400"></div>
                <OrgChartNode member={sub} allMembers={allMembers} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SkillsTooltip = ({
  skills,
  sidebarCollapsed,
}: {
  skills: string[];
  sidebarCollapsed: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!skills || skills.length === 0) {
    return <span className="text-gray-700">-</span>;
  }

  // When sidebar is collapsed, show all skills
  if (sidebarCollapsed) {
    return (
      <div className="flex flex-wrap gap-1">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
          >
            {skill}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="relative inline-block" ref={tooltipRef}>
      <div
        className="flex items-center gap-1 cursor-pointer"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
          {skills[0]}
        </span>
        {skills.length > 1 && (
          <span className="text-blue-600 text-xs font-bold cursor-help">…</span>
        )}
      </div>
      {skills.length > 1 && isOpen && (
        <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-2">
          <p className="text-xs font-semibold text-gray-700 mb-2 px-1">
            All Skills ({skills.length})
          </p>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ActionMenu = ({
  memberId,
  onSendEmail,
  onSendMessage,
  onViewProfile,
}: {
  memberId: number;
  onSendEmail: (id: number) => void;
  onSendMessage: (id: number) => void;
  onViewProfile: (id: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreVertical className="w-4 h-4 text-gray-600" />
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <button
            onClick={() => handleAction(() => onSendEmail(memberId))}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-md"
          >
            <Mail className="w-3.5 h-3.5" />
            Send Email
          </button>
          <button
            onClick={() => handleAction(() => onSendMessage(memberId))}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Send Message
          </button>
          <button
            onClick={() => handleAction(() => onViewProfile(memberId))}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 last:rounded-b-md"
          >
            View Profile
          </button>
        </div>
      )}
    </div>
  );
};

const WDBModalData = [
  {
    name: "Alice Smith",
    completedTasks: 50,
    balance: "90.90%",
    remarks: "Met WDB",
  },
  {
    name: "Bob Marley",
    completedTasks: 45,
    balance: "81.80%",
    remarks: "Below WDB",
  },
  {
    name: "Carol Reyes",
    completedTasks: 55,
    balance: "100%",
    remarks: "Above WDB",
  },
  {
    name: "Dave Cruz",
    completedTasks: 50,
    balance: "90.90%",
    remarks: "Met WDB",
  },
];

export default function TeamManagement() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { sidebarCollapsed } = useView();
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showWDBModal, setShowWDBModal] = useState(false);
  const [showOrgChart, setShowOrgChart] = useState(false);

  const handleExportTeamData = () => {
    try {
      // Prepare CSV headers
      const headers = ["Employee ID", "Employee Name", "Position", "Department", "Skills", "Status", "Joined Date"];

      // Prepare CSV rows
      const rows = teamMembers.map(member => [
        member.id,
        member.name,
        member.position,
        member.department,
        member.skills.join("; "),
        member.status,
        member.joinedDate,
      ]);

      // Create CSV content
      const csvContent = [
        headers.join(","),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(",")),
      ].join("\n");

      // Create blob and download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute("download", `team_data_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Export Successful",
        description: "Team data exported as CSV file.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Error exporting team data. Please try again.",
      });
    }
  };

  const handleTeamReport = () => {
    setShowOrgChart(true);
  };


  const handleViewProfile = (memberId: number) => {
    navigate(`/team-member/${memberId}`);
  };

  const handleSendEmail = (memberId: number) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (member) {
      window.location.href = `mailto:${member.email}`;
      toast({
        title: "Email",
        description: `Opening email for ${member.name}...`,
      });
    }
  };

  const handleSendMessage = (memberId: number) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (member) {
      toast({
        title: "Message",
        description: `Starting conversation with ${member.name}...`,
      });
    }
  };

  const handleMoreOptions = (memberId: number) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (member) {
      toast({
        title: "More Options",
        description: `More options for ${member.name} coming soon.`,
      });
    }
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto px-3 py-1.5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-lg font-semibold text-gray-900 mb-0">
                  Workforce Management
                </h1>
                <p className="text-xs text-gray-600 mt-0.5">
                  Manage employee profiles, roles, departments, and team structures
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  className="gap-2 bg-blue-600 hover:bg-blue-700 h-7 text-xs px-2"
                  onClick={handleTeamReport}
                >
                  <GitBranch className="w-3 h-3" />
                  Organizational Chart
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="mx-auto px-3 py-1">
          <div className="grid grid-cols-4 gap-2 mb-2">
            <MetricCard
              icon={Users}
              title="Total Team Members"
              value="4"
              subtitle="Across 2 departments"
            />
            <MetricCard
              icon={TrendingUp}
              title="Team Utilization Rate"
              value="85%"
              subtitle="Active projects"
              indicator="+5.4% vs last month"
              indicatorColor="text-green-600"
            />
            <MetricCard
              icon={CheckCircle}
              title="Workload Distribution Balance (WDB %)"
              value="91%"
              subtitle="Team balance"
              indicator="-4.6% vs last month"
              indicatorColor="text-red-600"
              clickable={true}
              onClick={() => setShowWDBModal(true)}
            />
            <MetricCard
              icon={Clock}
              title="Employee Availability Rate"
              value="92%"
              subtitle="Available team"
              indicator="-3.7% vs last month"
              indicatorColor="text-red-600"
            />
          </div>

          {/* Team Members Section */}
          <div className="bg-white rounded-md border border-gray-200 p-2">
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <h2 className="text-sm font-medium text-gray-900 mb-1">
                  Team Members
                </h2>
                <p className="text-xs text-gray-600">
                  Detailed list view of your team
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8"
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8"
                  title="Grid View"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportTeamData}
                  className="gap-2 h-8 text-xs px-2"
                >
                  <Download className="w-3 h-3" />
                  Export
                </Button>
              </div>
            </div>

            {viewMode === "list" && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-3 py-2 text-left font-medium text-gray-700 text-xs">
                        Employee ID
                      </th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 text-xs">
                        Employee Name
                      </th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 text-xs">
                        Position
                      </th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 text-xs">
                        Department
                      </th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 text-xs">
                        Skills
                      </th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 text-xs">
                        Status
                      </th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 text-xs">
                        Joined Date
                      </th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 text-xs">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr
                        key={member.id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-3 py-2 text-xs text-gray-900 font-medium">
                          #{member.id}
                        </td>
                        <td className="px-3 py-2 text-xs">
                          <div className="flex items-center gap-2">
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-gray-900 font-medium">
                              {member.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-700">
                          {member.position}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-700">
                          {member.department}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-700">
                          <SkillsTooltip
                            skills={member.skills}
                            sidebarCollapsed={sidebarCollapsed}
                          />
                        </td>
                        <td className="px-3 py-2 text-xs">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              member.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : member.status === "On Leave"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {member.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-700">
                          {member.joinedDate}
                        </td>
                        <td className="px-3 py-2 text-xs">
                          <ActionMenu
                            memberId={member.id}
                            onSendEmail={handleSendEmail}
                            onSendMessage={handleSendMessage}
                            onViewProfile={handleViewProfile}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {viewMode === "grid" && (
              <div className="grid grid-cols-3 gap-2">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="border border-gray-200 rounded-md p-2 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col items-center text-center mb-2">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover mb-1.5"
                      />
                      <h3 className="font-semibold text-xs text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-xs text-gray-600">{member.position}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{member.department}</p>
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                          member.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : member.status === "On Leave"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {member.status}
                      </span>
                    </div>

                    <div className="mb-2 py-1.5 border-t border-b border-gray-200">
                      <div className="mb-2">
                        <p className="text-xs text-gray-600 mb-1">Skills</p>
                        <div className="flex justify-center">
                          <SkillsTooltip
                            skills={member.skills}
                            sidebarCollapsed={sidebarCollapsed}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">
                        Joined: {member.joinedDate}
                      </p>
                    </div>

                    <div className="flex gap-1 justify-center">
                      <ActionMenu
                        memberId={member.id}
                        onSendEmail={handleSendEmail}
                        onSendMessage={handleSendMessage}
                        onViewProfile={handleViewProfile}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* WDB Modal */}
      {showWDBModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Workload Distribution Balance (WDB %) Details
              </h2>
              <button
                onClick={() => setShowWDBModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-4">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-sm text-gray-600">Current WDB:</span>
                <span className="text-2xl font-bold text-gray-900">91%</span>
                <span className="text-sm text-red-600 font-medium">-4.6% vs last month</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-4 py-3 text-left font-medium text-gray-700 text-xs">
                        Team Member
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700 text-xs">
                        Completed Tasks
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700 text-xs">
                        Work Distribution Balance %
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700 text-xs">
                        Remarks
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {WDBModalData.map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                          {row.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {row.completedTasks}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                          {row.balance}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                              row.remarks === "Above WDB"
                                ? "bg-green-100 text-green-800"
                                : row.remarks === "Below WDB"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {row.remarks}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowWDBModal(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Organizational Chart Modal */}
      {showOrgChart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Organizational Chart
              </h2>
              <button
                onClick={() => setShowOrgChart(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-8 bg-gray-50 flex justify-center">
              <div className="bg-white rounded-lg p-8 overflow-x-auto">
                <OrgChartNode
                  member={teamMembers.find((m) => !m.managerId)!}
                  allMembers={teamMembers}
                />
              </div>
            </div>

            <div className="border-t border-gray-200 p-6 flex justify-end gap-2 bg-white">
              <Button
                variant="outline"
                onClick={() => setShowOrgChart(false)}
                className="px-6"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
