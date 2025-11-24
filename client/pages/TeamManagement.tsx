import { useState } from "react";
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

interface TeamMember {
  id: number;
  name: string;
  avatar: string;
  department: string;
  role: string;
  status: "Active" | "Inactive" | "On Leave";
  lastSeen: string;
  performance: number;
  completed: number;
  active: number;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    department: "Product + Engineering",
    role: "Senior Designer",
    status: "Active",
    lastSeen: "2 hours ago",
    performance: 4.5,
    completed: 87,
    active: 5,
  },
  {
    id: 2,
    name: "Lisa Park",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    department: "UX Design + Design",
    role: "UX Designer",
    status: "Active",
    lastSeen: "1 hour ago",
    performance: 4.2,
    completed: 64,
    active: 3,
  },
  {
    id: 3,
    name: "Alex Kim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    department: "Junior Developer + Engineering",
    role: "Junior Developer",
    status: "Active",
    lastSeen: "1 day ago",
    performance: 4,
    completed: 43,
    active: 2,
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

export default function TeamManagement() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  Team Member Management
                </h1>
                <p className="text-xs text-gray-600">
                  View and manage your team members
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" className="gap-2 h-8 text-sm px-3">
                  <Download className="w-4 h-4" />
                  Export Team Data
                </Button>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700 h-8 text-sm px-3">
                  <Users className="w-4 h-4" />
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
                <button className="flex items-center gap-2 px-2 py-1 border border-gray-300 rounded-md bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 h-8">
                  {selectedDepartment === "all"
                    ? "All Departments"
                    : selectedDepartment.charAt(0).toUpperCase() +
                      selectedDepartment.slice(1)}
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              <div className="relative">
                <button className="flex items-center gap-2 px-2 py-1 border border-gray-300 rounded-md bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 h-8">
                  {selectedStatus === "all"
                    ? "All Status"
                    : selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              <Button variant="outline" size="sm" className="h-8 text-xs px-2">
                More Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-4 gap-3 mb-5">
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

          {/* View Toggle */}
          <div className="flex gap-2 mb-4">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="gap-2 h-8 text-xs px-2"
            >
              <Grid3x3 className="w-3 h-3" />
              Grid View
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="gap-2 h-8 text-xs px-2"
            >
              <List className="w-3 h-3" />
              List View
            </Button>
          </div>

          {/* Team Members Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Team Members
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Detailed list view of your team
            </p>

            {viewMode === "list" && (
              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md border border-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900">
                          {member.name}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {member.role} · {member.department}
                        </p>
                        <div className="flex gap-2 mt-1">
                          <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            {member.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            {member.lastSeen}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mr-4">
                      <div className="text-center">
                        <p className="text-xs font-semibold text-gray-900">
                          {member.performance}
                        </p>
                        <p className="text-xs text-gray-600">Performance</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-semibold text-gray-900">
                          {member.completed}
                        </p>
                        <p className="text-xs text-gray-600">Completed</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-semibold text-gray-900">
                          {member.active}
                        </p>
                        <p className="text-xs text-gray-600">Active</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        title="Send Email"
                      >
                        <Mail className="w-4 h-4 text-gray-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        title="Send Message"
                      >
                        <MessageCircle className="w-4 h-4 text-gray-600" />
                      </Button>
                      <Button className="px-3 h-8 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium">
                        View Profile
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {viewMode === "grid" && (
              <div className="grid grid-cols-3 gap-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="border border-gray-200 rounded-md p-3 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col items-center text-center mb-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover mb-2"
                      />
                      <h3 className="font-semibold text-sm text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-xs text-gray-600">{member.role}</p>
                      <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium mt-1">
                        {member.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-3 py-2 border-t border-b border-gray-200">
                      <div className="text-center">
                        <p className="text-xs font-semibold text-gray-900">
                          {member.performance}
                        </p>
                        <p className="text-xs text-gray-600">Performance</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-semibold text-gray-900">
                          {member.completed}
                        </p>
                        <p className="text-xs text-gray-600">Completed</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-semibold text-gray-900">
                          {member.active}
                        </p>
                        <p className="text-xs text-gray-600">Active</p>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 gap-1 h-7 text-xs"
                      >
                        <Mail className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 gap-1 h-7 text-xs"
                      >
                        <MessageCircle className="w-3 h-3" />
                      </Button>
                      <Button className="flex-1 gap-1 h-7 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium">
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
