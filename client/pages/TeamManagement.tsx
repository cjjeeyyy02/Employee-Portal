import { useState } from "react";
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
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

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
}

const teamMembers: TeamMember[] = [
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
  },
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
];

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

export default function TeamManagement() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

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
    try {
      // Create HTML report content
      const reportDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const totalMembers = teamMembers.length;
      const activeMembers = teamMembers.filter(m => m.status === "Active").length;
      const avgPerformance = (
        teamMembers.reduce((sum, m) => sum + m.performance, 0) / teamMembers.length
      ).toFixed(2);
      const totalTasksCompleted = teamMembers.reduce((sum, m) => sum + m.completed, 0);

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Team Report</title>
          <style>
            body {
              font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              margin: 0;
              padding: 20px;
              color: #1F2937;
              background-color: #F9FAFB;
            }
            .container {
              max-width: 900px;
              margin: 0 auto;
              background-color: white;
              padding: 40px;
              border-radius: 8px;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #111827;
              margin: 0 0 10px 0;
              font-size: 28px;
            }
            .report-date {
              color: #6B7280;
              font-size: 14px;
              margin-bottom: 30px;
              border-bottom: 1px solid #E5E7EB;
              padding-bottom: 20px;
            }
            .summary-section {
              margin-bottom: 30px;
            }
            .summary-section h2 {
              color: #374151;
              font-size: 16px;
              font-weight: 600;
              margin-bottom: 15px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .metrics-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 15px;
              margin-bottom: 20px;
            }
            .metric-card {
              background-color: #F3F4F6;
              padding: 15px;
              border-radius: 6px;
              border: 1px solid #E5E7EB;
            }
            .metric-label {
              color: #6B7280;
              font-size: 12px;
              font-weight: 600;
              margin-bottom: 5px;
              text-transform: uppercase;
            }
            .metric-value {
              color: #1F2937;
              font-size: 24px;
              font-weight: 700;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            thead {
              background-color: #F3F4F6;
              border-bottom: 2px solid #E5E7EB;
            }
            th {
              padding: 12px;
              text-align: left;
              font-weight: 600;
              color: #374151;
              font-size: 13px;
            }
            td {
              padding: 12px;
              border-bottom: 1px solid #E5E7EB;
              font-size: 13px;
            }
            tr:hover {
              background-color: #F9FAFB;
            }
            .status-badge {
              display: inline-block;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: 600;
            }
            .status-active {
              background-color: #D1FAE5;
              color: #065F46;
            }
            .status-inactive {
              background-color: #FEE2E2;
              color: #991B1B;
            }
            .status-leave {
              background-color: #FEF3C7;
              color: #92400E;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #E5E7EB;
              color: #6B7280;
              font-size: 12px;
              text-align: center;
            }
            @media print {
              body {
                background-color: white;
              }
              .container {
                box-shadow: none;
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Team Report</h1>
            <div class="report-date">Generated on ${reportDate}</div>

            <div class="summary-section">
              <h2>Team Summary</h2>
              <div class="metrics-grid">
                <div class="metric-card">
                  <div class="metric-label">Total Members</div>
                  <div class="metric-value">${totalMembers}</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">Active Members</div>
                  <div class="metric-value">${activeMembers}</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">Avg Performance</div>
                  <div class="metric-value">${avgPerformance}/5</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">Tasks Completed</div>
                  <div class="metric-value">${totalTasksCompleted}</div>
                </div>
              </div>
            </div>

            <div class="summary-section">
              <h2>Team Members Details</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Department</th>
                    <th>Skills</th>
                    <th>Status</th>
                    <th>Joined Date</th>
                  </tr>
                </thead>
                <tbody>
                  ${teamMembers
                    .map(
                      (member) => `
                    <tr>
                      <td><strong>${member.name}</strong></td>
                      <td>${member.position}</td>
                      <td>${member.department}</td>
                      <td>${member.skills.join(", ")}</td>
                      <td>
                        <span class="status-badge status-${member.status.toLowerCase().replace(" ", "-")}">
                          ${member.status}
                        </span>
                      </td>
                      <td>${member.joinedDate}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>

            <div class="footer">
              <p>This is an automatically generated report. For more details, please visit the Team Management dashboard.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Create blob and download
      const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute("download", `team_report_${new Date().toISOString().split('T')[0]}.html`);
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Report Generated",
        description: "Team report downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Report Failed",
        description: "Error generating team report. Please try again.",
      });
    }
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
                  variant="ghost"
                  className="gap-2 h-7 text-xs px-2"
                  onClick={handleExportTeamData}
                >
                  <Download className="w-3 h-3" />
                  Export Team Data
                </Button>
                <Button
                  className="gap-2 bg-blue-600 hover:bg-blue-700 h-7 text-xs px-2"
                  onClick={handleTeamReport}
                >
                  <Users className="w-3 h-3" />
                  Team Report
                </Button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search team members…"
                  className="pl-10 rounded-full h-8 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="relative">
                <button className="flex items-center gap-1 px-2 py-0.5 border border-gray-300 rounded-md bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 h-7">
                  {selectedDepartment === "all"
                    ? "All Departments"
                    : selectedDepartment.charAt(0).toUpperCase() +
                      selectedDepartment.slice(1)}
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              <div className="relative">
                <button className="flex items-center gap-1 px-2 py-0.5 border border-gray-300 rounded-md bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 h-7">
                  {selectedStatus === "all"
                    ? "All Status"
                    : selectedStatus.charAt(0).toUpperCase() +
                      selectedStatus.slice(1)}
                  <ChevronDown className="w-3 h-3" />
                </button>
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
              icon={CheckCircle}
              title="Present Today"
              value="3"
              subtitle="75% attendance rate"
              valueColor="text-green-600"
            />
            <MetricCard
              icon={TrendingUp}
              title="Avg Performance"
              value="4.3/5"
              subtitle="of last 30 days"
            />
            <MetricCard
              icon={Clock}
              title="Tasks Completed"
              value="289"
              subtitle="This Month"
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
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="gap-2 h-8 text-xs px-2"
                >
                  <List className="w-3 h-3" />
                  List View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="gap-2 h-8 text-xs px-2"
                >
                  <Grid3x3 className="w-3 h-3" />
                  Grid View
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
                          <div className="flex flex-wrap gap-1">
                            {member.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
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
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              title="Send Email"
                              onClick={() => handleSendEmail(member.id)}
                            >
                              <Mail className="w-3 h-3 text-gray-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              title="Send Message"
                              onClick={() => handleSendMessage(member.id)}
                            >
                              <MessageCircle className="w-3 h-3 text-gray-600" />
                            </Button>
                            <Button
                              className="h-6 px-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium"
                              onClick={() => handleViewProfile(member.id)}
                            >
                              View
                            </Button>
                          </div>
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
                        <div className="flex flex-wrap gap-1 justify-center">
                          {member.skills.slice(0, 2).map((skill, idx) => (
                            <span
                              key={idx}
                              className="inline-block px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                          {member.skills.length > 2 && (
                            <span className="text-xs text-gray-600">
                              +{member.skills.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">
                        Joined: {member.joinedDate}
                      </p>
                    </div>

                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 gap-1 h-7 text-xs"
                        title="Send Email"
                        onClick={() => handleSendEmail(member.id)}
                      >
                        <Mail className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 gap-1 h-7 text-xs"
                        title="Send Message"
                        onClick={() => handleSendMessage(member.id)}
                      >
                        <MessageCircle className="w-3 h-3" />
                      </Button>
                      <Button
                        className="flex-1 gap-1 h-7 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium"
                        onClick={() => handleViewProfile(member.id)}
                      >
                        Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
