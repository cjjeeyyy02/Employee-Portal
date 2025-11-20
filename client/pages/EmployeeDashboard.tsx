import {
  Briefcase,
  AlertCircle,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  CheckCircle,
  XCircle,
  Coffee,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Layout from "@/components/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();
  const [announcementTab, setAnnouncementTab] = useState<
    "All" | "News" | "Activities"
  >("All");
  const [showKPIDetailedView, setShowKPIDetailedView] = useState(false);
  const [showAnnouncementsSidesheet, setShowAnnouncementsSidesheet] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showActivitiesSidesheet, setShowActivitiesSidesheet] = useState(false);
  const [showForumSidesheet, setShowForumSidesheet] = useState(false);
  const [selectedForumTopic, setSelectedForumTopic] = useState<number | null>(null);
  const [showForumDetailSidesheet, setShowForumDetailSidesheet] = useState(false);

  const forumTopics = [
    {
      id: 1,
      title: "How to prepare for annual reviews?",
      author: "John Doe",
      replies: 5,
      timestamp: "2 hours ago",
      description: "Looking for tips and best practices to prepare for my upcoming annual review. Any advice would be appreciated!",
      messages: [
        { author: "John Doe", content: "Looking for tips and best practices to prepare for my upcoming annual review. Any advice would be appreciated!", time: "2 hours ago", avatar: "JD" },
        { author: "Sarah Smith", content: "Great question! I usually start by documenting my key achievements and contributions from the past year.", time: "1 hour ago", avatar: "SS" },
        { author: "Mike Johnson", content: "Don't forget to mention challenges you overcame and how you've grown professionally.", time: "45 minutes ago", avatar: "MJ" },
        { author: "Emily Brown", content: "I also prepare some questions about my career development and advancement opportunities.", time: "30 minutes ago", avatar: "EB" },
        { author: "Alex Chen", content: "It's important to be specific with examples and metrics. Quantify your impact when possible.", time: "15 minutes ago", avatar: "AC" },
      ]
    },
    {
      id: 2,
      title: "Best practices for remote collaboration",
      author: "Sarah Smith",
      replies: 8,
      timestamp: "1 day ago",
      description: "Share your experiences and tips for effective remote team collaboration.",
      messages: [
        { author: "Sarah Smith", content: "Share your experiences and tips for effective remote team collaboration.", time: "1 day ago", avatar: "SS" },
        { author: "Mike Johnson", content: "Regular video calls and clear communication channels are essential.", time: "23 hours ago", avatar: "MJ" },
        { author: "Emily Brown", content: "I recommend using collaborative tools like Slack and shared documents.", time: "22 hours ago", avatar: "EB" },
        { author: "Alex Chen", content: "Time zone awareness is crucial. Try to have core collaboration hours.", time: "20 hours ago", avatar: "AC" },
        { author: "John Doe", content: "Asynchronous updates are key - document decisions and share progress regularly.", time: "18 hours ago", avatar: "JD" },
      ]
    },
    {
      id: 3,
      title: "Tips for skill development in 2025",
      author: "Mike Johnson",
      replies: 12,
      timestamp: "3 days ago",
      description: "What skills are you planning to develop this year? Share your learning goals.",
      messages: [
        { author: "Mike Johnson", content: "What skills are you planning to develop this year? Share your learning goals.", time: "3 days ago", avatar: "MJ" },
        { author: "Emily Brown", content: "I'm focusing on advanced data analysis and machine learning.", time: "2 days ago", avatar: "EB" },
        { author: "Alex Chen", content: "Cloud architecture and DevOps are on my list.", time: "2 days ago", avatar: "AC" },
      ]
    },
    {
      id: 4,
      title: "Work-life balance during busy seasons",
      author: "Emily Brown",
      replies: 15,
      timestamp: "1 week ago",
      description: "Tips for maintaining work-life balance when projects get intense.",
      messages: [
        { author: "Emily Brown", content: "Tips for maintaining work-life balance when projects get intense.", time: "1 week ago", avatar: "EB" },
        { author: "Alex Chen", content: "Setting boundaries and communicating them clearly is essential.", time: "6 days ago", avatar: "AC" },
      ]
    },
    {
      id: 5,
      title: "New tools and technologies worth learning",
      author: "Alex Chen",
      replies: 22,
      timestamp: "2 weeks ago",
      description: "Discuss emerging technologies that could be valuable for our team.",
      messages: [
        { author: "Alex Chen", content: "Discuss emerging technologies that could be valuable for our team.", time: "2 weeks ago", avatar: "AC" },
        { author: "John Doe", content: "AI and automation tools are definitely game-changers.", time: "13 days ago", avatar: "JD" },
      ]
    },
    {
      id: 6,
      title: "Feedback on the new office space design",
      author: "Lisa Davis",
      replies: 18,
      timestamp: "3 weeks ago",
      description: "Share your thoughts on the recent office renovation.",
      messages: [
        { author: "Lisa Davis", content: "Share your thoughts on the recent office renovation.", time: "3 weeks ago", avatar: "LD" },
        { author: "Sarah Smith", content: "Love the new collaborative spaces and natural lighting!", time: "20 days ago", avatar: "SS" },
      ]
    }
  ];

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
  };

  const today = new Date();
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const sampleEvents = [
    { day: 15, title: "Team Standup", color: "bg-blue-500" },
    { day: 18, title: "Client Meeting", color: "bg-green-500" },
    { day: 22, title: "All Hands", color: "bg-orange-500" },
  ];

  const getEventsForDay = (day: number) => {
    return sampleEvents.filter((event) => event.day === day);
  };
  const metrics = [
    {
      label: "Pending Tasks",
      value: "6",
      icon: Briefcase,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      route: "/my-tasks",
    },
    {
      label: "Pending Requests",
      value: "3",
      icon: AlertCircle,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
      route: "/documents",
    },
    {
      label: "KPI Score",
      value: "85%",
      subtext: "+3% from last month",
      icon: TrendingUp,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
      action: "kpi-detail",
    },
    {
      label: "# of Meetings Today",
      value: "2",
      icon: Calendar,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
      route: "/calendar",
    },
  ];

  const pendingTasks = [
    {
      title: "Complete Q4 Performance Review",
      category: "Performance",
      priority: "High",
      dueDate: "01/22/2025",
      status: "In Progress",
    },
    {
      title: "Submit Travel Expense Report",
      category: "Finance",
      priority: "Medium",
      dueDate: "01/24/2025",
      status: "Pending",
    },
    {
      title: "Team Meeting Preparation",
      category: "Meeting",
      priority: "Low",
      dueDate: "01/28/2025",
      status: "Not Started",
    },
  ];

  const pendingRequests = [
    {
      id: "REQ-2025-001",
      title: "Leave Request - Annual Leave",
      submittedDate: "01/15/2025",
      priority: "High",
      status: "Pending",
    },
    {
      id: "REQ-2025-002",
      title: "Document Request - Certificate",
      submittedDate: "01/12/2025",
      priority: "Medium",
      status: "In Review",
    },
    {
      id: "REQ-2025-003",
      title: "Schedule Change Request",
      submittedDate: "01/10/2025",
      priority: "High",
      status: "Pending",
    },
  ];

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto">
        {/* Welcome Header with Clock Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          {/* Left side - Welcome Text */}
          <div>
            <h1
              className="text-2xl font-normal text-black"
              style={{
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Welcome back, John!
            </h1>
            <p
              className="text-sm text-gray-600 mt-1"
              style={{
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Here's your dashboard overview for today
            </p>
          </div>

          {/* Right side - Time & Clock Actions */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "8px",
            }}
          >
            {/* Time Display */}
            <div
              style={{
                textAlign: "right",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111827",
                  letterSpacing: "-0.5px",
                }}
              >
                {new Date().toLocaleTimeString("en-US", { hour12: false })}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#6b7280",
                  marginTop: "2px",
                }}
              >
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>

            {/* Clock Action Buttons */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#3b82f6",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#ffffff",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 1px 3px rgba(59, 130, 246, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2563eb";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px rgba(59, 130, 246, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#3b82f6";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 1px 3px rgba(59, 130, 246, 0.3)";
                }}
              >
                <CheckCircle size={18} />
                Clock In
              </button>

              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#3b82f6",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#ffffff",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 1px 3px rgba(59, 130, 246, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2563eb";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px rgba(59, 130, 246, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#3b82f6";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 1px 3px rgba(59, 130, 246, 0.3)";
                }}
              >
                <XCircle size={18} />
                Clock Out
              </button>

              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#3b82f6",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#ffffff",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 1px 3px rgba(59, 130, 246, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2563eb";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px rgba(59, 130, 246, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#3b82f6";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 1px 3px rgba(59, 130, 246, 0.3)";
                }}
              >
                <Coffee size={18} />
                Break
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* Left Section - 70% */}
          <div className="lg:col-span-8 space-y-4">
            {/* Top Row - 4 Metric Cards Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "12px",
                width: "100%",
                backgroundColor: "transparent",
              }}
            >
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                const iconBgColors = [
                  "#eff6ff",
                  "#ecfdf5",
                  "#f5f3ff",
                  "#fff7ed",
                ];
                const iconColors = ["#2563eb", "#16a34a", "#7c3aed", "#f97316"];
                const isPositive =
                  metric.subtext && metric.subtext.includes("+");

                return (
                  <div
                    key={index}
                    onClick={
                      metric.route
                        ? () => navigate(metric.route)
                        : metric.action === "kpi-detail"
                        ? () => setShowKPIDetailedView(true)
                        : undefined
                    }
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "16px",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                      padding: "12px",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "8px",
                      transition: "all 0.25s ease-in-out",
                      cursor: metric.route || metric.action ? "pointer" : "default",
                      minHeight: "auto",
                    }}
                    onMouseEnter={metric.route || metric.action ? (e) => {
                      e.currentTarget.style.transform = "scale(1.02)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0, 0, 0, 0.1)";
                      e.currentTarget.style.borderColor = "#d1d5db";
                    } : undefined}
                    onMouseLeave={metric.route || metric.action ? (e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 1px 3px rgba(0, 0, 0, 0.05)";
                      e.currentTarget.style.borderColor = "#e5e7eb";
                    } : undefined}
                  >
                    {/* Left Content */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: 0,
                      }}
                    >
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "500",
                          color: "#6b7280",
                          letterSpacing: "0.2px",
                          margin: "0",
                          marginBottom: "3px",
                        }}
                      >
                        {metric.label}
                      </p>
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "700",
                          color: "#111827",
                          margin: "0",
                        }}
                      >
                        {metric.value}
                      </p>
                      {metric.subtext && (
                        <p
                          style={{
                            fontSize: "10px",
                            color: isPositive ? "#059669" : "#dc2626",
                            margin: "2px 0 0 0",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "2px",
                          }}
                        >
                          {isPositive ? "↑" : "↓"} {metric.subtext}
                        </p>
                      )}
                    </div>

                    {/* Right Icon */}
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        backgroundColor: iconBgColors[index],
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon
                        style={{
                          width: "14px",
                          height: "14px",
                          color: iconColors[index],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* KPI Detailed View - Sidesheet */}
            {showKPIDetailedView && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  right: 0,
                  width: "450px",
                  height: "100vh",
                  backgroundColor: "#ffffff",
                  boxShadow: "-4px 0 12px rgba(0, 0, 0, 0.15)",
                  zIndex: 50,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    padding: "20px",
                    borderBottom: "1px solid #e5e7eb",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#111827",
                      margin: 0,
                    }}
                  >
                    KPI Detailed View
                  </h2>
                  <button
                    onClick={() => setShowKPIDetailedView(false)}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "24px",
                      cursor: "pointer",
                      color: "#6B7280",
                      padding: 0,
                    }}
                  >
                    ×
                  </button>
                </div>

                {/* Scrollable Content */}
                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "20px",
                  }}
                >
                {/* Two Row Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "24px",
                  }}
                >
                  {/* Row 1 - Circular Progress */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    {/* Circular Progress Chart */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div style={{ position: "relative", width: "140px", height: "140px" }}>
                        <svg
                          width="140"
                          height="140"
                          viewBox="0 0 140 140"
                          style={{ transform: "rotate(-90deg)" }}
                        >
                          <circle
                            cx="70"
                            cy="70"
                            r="60"
                            fill="none"
                            stroke="#E8F3EF"
                            strokeWidth="12"
                          />
                          <circle
                            cx="70"
                            cy="70"
                            r="60"
                            fill="none"
                            stroke="#2CB585"
                            strokeWidth="12"
                            strokeDasharray={`${2 * Math.PI * 60}`}
                            strokeDashoffset={`${2 * Math.PI * 60 * (1 - 0.9)}`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "32px",
                              fontWeight: "700",
                              color: "#2CB585",
                            }}
                          >
                            90%
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#6b7280",
                            margin: "0 0 4px 0",
                          }}
                        >
                          Total Assigned Tasks
                        </p>
                        <p
                          style={{
                            fontSize: "20px",
                            fontWeight: "600",
                            color: "#1f2937",
                            margin: "0",
                          }}
                        >
                          20
                        </p>
                      </div>

                      <div
                        style={{
                          width: "100%",
                          marginTop: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "8px",
                            backgroundColor: "#D9E7E2",
                            borderRadius: "9999px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: "90%",
                              height: "100%",
                              backgroundColor: "#2CB585",
                              borderRadius: "9999px",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 2 - KPI Table */}
                  <div>
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#1f2937",
                        marginBottom: "16px",
                      }}
                    >
                      My KPI Score
                    </h3>

                    <div
                      style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    >
                      <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                          <tr style={{ backgroundColor: "#f9fafb" }}>
                            <th
                              style={{
                                padding: "12px 16px",
                                textAlign: "left",
                                fontSize: "12px",
                                fontWeight: "600",
                                color: "#6b7280",
                                borderBottom: "1px solid #e5e7eb",
                              }}
                            >
                              Label
                            </th>
                            <th
                              style={{
                                padding: "12px 16px",
                                textAlign: "center",
                                fontSize: "12px",
                                fontWeight: "600",
                                color: "#6b7280",
                                borderBottom: "1px solid #e5e7eb",
                              }}
                            >
                              # of Tasks
                            </th>
                            <th
                              style={{
                                padding: "12px 16px",
                                textAlign: "center",
                                fontSize: "12px",
                                fontWeight: "600",
                                color: "#6b7280",
                                borderBottom: "1px solid #e5e7eb",
                              }}
                            >
                              Weight
                            </th>
                            <th
                              style={{
                                padding: "12px 16px",
                                textAlign: "right",
                                fontSize: "12px",
                                fontWeight: "600",
                                color: "#6b7280",
                                borderBottom: "1px solid #e5e7eb",
                              }}
                            >
                              Weighted Score
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              style={{
                                padding: "12px 16px",
                                fontSize: "13px",
                                color: "#374151",
                                borderBottom: "1px solid #e5e7eb",
                              }}
                            >
                              Completion Rate
                            </td>
                            <td
                              style={{
                                padding: "12px 16px",
                                fontSize: "13px",
                                color: "#374151",
                                textAlign: "center",
                                borderBottom: "1px solid #e5e7eb",
                              }}
                            >
                              18
                            </td>
                            <td
                              style={{
                                padding: "12px 16px",
                                fontSize: "13px",
                                color: "#374151",
                                textAlign: "center",
                                borderBottom: "1px solid #e5e7eb",
                              }}
                            >
                              40%
                            </td>
                            <td
                              style={{
                                padding: "12px 16px",
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#1f2937",
                                textAlign: "right",
                                borderBottom: "1px solid #e5e7eb",
                              }}
                            >
                              36.00
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                padding: "12px 16px",
                                fontSize: "13px",
                                color: "#374151",
                                borderBottom: "1px solid #e5e7eb",
                              }}
                            >
                              On-Time Completion Rate
                            </td>
                            <td
                              style={{
                                padding: "12px 16px",
                                fontSize: "13px",
                                color: "#374151",
                                textAlign: "center",
                                borderBottom: "1px solid #e5e7eb",
                              }}
                            >
                              15
                            </td>
                            <td
                              style={{
                                padding: "12px 16px",
                                fontSize: "13px",
                                color: "#374151",
                                textAlign: "center",
                                borderBottom: "1px solid #e5e7eb",
                              }}
                            >
                              40%
                            </td>
                            <td
                              style={{
                                padding: "12px 16px",
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#1f2937",
                                textAlign: "right",
                                borderBottom: "1px solid #e5e7eb",
                              }}
                            >
                              37.00
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                padding: "12px 16px",
                                fontSize: "13px",
                                color: "#374151",
                              }}
                            >
                              Overdue Task Penalty
                            </td>
                            <td
                              style={{
                                padding: "12px 16px",
                                fontSize: "13px",
                                color: "#374151",
                                textAlign: "center",
                              }}
                            >
                              3
                            </td>
                            <td
                              style={{
                                padding: "12px 16px",
                                fontSize: "13px",
                                color: "#374151",
                                textAlign: "center",
                              }}
                            >
                              20%
                            </td>
                            <td
                              style={{
                                padding: "12px 16px",
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#1f2937",
                                textAlign: "right",
                              }}
                            >
                              17.00
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div
                      style={{
                        marginTop: "20px",
                        padding: "16px",
                        backgroundColor: "#f9fafb",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "700",
                          color: "#1f2937",
                          margin: "0",
                        }}
                      >
                        My KPI Score for the month: 90.00
                      </p>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            )}

            {/* Backdrop */}
            {showKPIDetailedView && (
              <div
                onClick={() => setShowKPIDetailedView(false)}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  zIndex: 40,
                }}
              />
            )}

            {/* Middle Row - Stacked Layout: Pending Tasks then Pending Request */}
            {!showKPIDetailedView && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "16px",
                width: "100%",
              }}
            >
              {/* Row 1 - Pending Tasks */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  padding: "16px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#1f2937",
                    marginBottom: "2px",
                  }}
                >
                  Pending Tasks
                </h3>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#6b7280",
                    marginBottom: "8px",
                  }}
                >
                  Tasks that require your attention
                </p>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                        <th
                          style={{
                            padding: "8px 6px",
                            textAlign: "left",
                            fontSize: "10px",
                            fontWeight: "600",
                            color: "#6b7280",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Task Title
                        </th>
                        <th
                          style={{
                            padding: "8px 6px",
                            textAlign: "left",
                            fontSize: "10px",
                            fontWeight: "600",
                            color: "#6b7280",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Category
                        </th>
                        <th
                          style={{
                            padding: "8px 6px",
                            textAlign: "left",
                            fontSize: "10px",
                            fontWeight: "600",
                            color: "#6b7280",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Priority
                        </th>
                        <th
                          style={{
                            padding: "8px 6px",
                            textAlign: "left",
                            fontSize: "10px",
                            fontWeight: "600",
                            color: "#6b7280",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Due Date
                        </th>
                        <th
                          style={{
                            padding: "8px 6px",
                            textAlign: "left",
                            fontSize: "10px",
                            fontWeight: "600",
                            color: "#6b7280",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingTasks.map((task, index) => {
                        const getPriorityStyle = (priority: string) => {
                          switch (priority) {
                            case "High":
                              return { bg: "#fee2e2", color: "#dc2626" };
                            case "Medium":
                              return { bg: "#fef3c7", color: "#b45309" };
                            case "Low":
                              return { bg: "#d1fae5", color: "#047857" };
                            default:
                              return { bg: "#f3f4f6", color: "#6b7280" };
                          }
                        };

                        const getStatusStyle = (status: string) => {
                          switch (status) {
                            case "In Progress":
                              return { bg: "#dbeafe", color: "#1d4ed8" };
                            case "Pending":
                              return { bg: "#fef3c7", color: "#b45309" };
                            case "Not Started":
                              return { bg: "#f3f4f6", color: "#6b7280" };
                            default:
                              return { bg: "#f3f4f6", color: "#6b7280" };
                          }
                        };

                        const priorityStyle = getPriorityStyle(task.priority);
                        const statusStyle = getStatusStyle(task.status);

                        return (
                          <tr
                            key={index}
                            style={{
                              borderBottom:
                                index !== pendingTasks.length - 1
                                  ? "1px solid #e5e7eb"
                                  : "none",
                            }}
                          >
                            <td
                              style={{
                                padding: "8px 6px",
                                fontSize: "12px",
                                color: "#1f2937",
                              }}
                            >
                              {task.title}
                            </td>
                            <td
                              style={{
                                padding: "8px 6px",
                                fontSize: "11px",
                                color: "#6b7280",
                              }}
                            >
                              {task.category}
                            </td>
                            <td style={{ padding: "8px 6px" }}>
                              <span
                                style={{
                                  fontSize: "10px",
                                  backgroundColor: priorityStyle.bg,
                                  color: priorityStyle.color,
                                  padding: "3px 8px",
                                  borderRadius: "9999px",
                                  fontWeight: "600",
                                  display: "inline-block",
                                }}
                              >
                                {task.priority}
                              </span>
                            </td>
                            <td
                              style={{
                                padding: "8px 6px",
                                fontSize: "11px",
                                color: "#6b7280",
                              }}
                            >
                              {task.dueDate}
                            </td>
                            <td style={{ padding: "8px 6px" }}>
                              <span
                                style={{
                                  fontSize: "10px",
                                  backgroundColor: statusStyle.bg,
                                  color: statusStyle.color,
                                  padding: "3px 8px",
                                  borderRadius: "9999px",
                                  fontWeight: "600",
                                  display: "inline-block",
                                }}
                              >
                                {task.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <a
                  href="/my-tasks"
                  style={{
                    fontSize: "11px",
                    color: "#2563eb",
                    fontWeight: "500",
                    marginTop: "12px",
                    display: "inline-block",
                    textDecoration: "none",
                    borderBottom: "2px solid transparent",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderBottomColor = "#2563eb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderBottomColor = "transparent")
                  }
                >
                  View All Tasks →
                </a>
              </div>

              {/* Row 2 - Pending Request List */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  padding: "16px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#1f2937",
                    marginBottom: "2px",
                  }}
                >
                  Pending Request
                </h3>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#6b7280",
                    marginBottom: "8px",
                  }}
                >
                  Requests awaiting approval
                </p>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                        <th
                          style={{
                            padding: "8px 6px",
                            textAlign: "left",
                            fontSize: "10px",
                            fontWeight: "600",
                            color: "#6b7280",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Request ID
                        </th>
                        <th
                          style={{
                            padding: "8px 6px",
                            textAlign: "left",
                            fontSize: "10px",
                            fontWeight: "600",
                            color: "#6b7280",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Request Title
                        </th>
                        <th
                          style={{
                            padding: "8px 6px",
                            textAlign: "left",
                            fontSize: "10px",
                            fontWeight: "600",
                            color: "#6b7280",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Submitted Date
                        </th>
                        <th
                          style={{
                            padding: "8px 6px",
                            textAlign: "left",
                            fontSize: "10px",
                            fontWeight: "600",
                            color: "#6b7280",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Priority
                        </th>
                        <th
                          style={{
                            padding: "8px 6px",
                            textAlign: "left",
                            fontSize: "10px",
                            fontWeight: "600",
                            color: "#6b7280",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingRequests.map((request, index) => {
                        const getPriorityStyle = (priority: string) => {
                          switch (priority) {
                            case "High":
                              return { bg: "#fee2e2", color: "#dc2626" };
                            case "Medium":
                              return { bg: "#fef3c7", color: "#b45309" };
                            case "Low":
                              return { bg: "#d1fae5", color: "#047857" };
                            default:
                              return { bg: "#f3f4f6", color: "#6b7280" };
                          }
                        };

                        const getStatusStyle = (status: string) => {
                          switch (status) {
                            case "Pending":
                              return { bg: "#fee2e2", color: "#dc2626" };
                            case "In Review":
                              return { bg: "#fef3c7", color: "#b45309" };
                            case "Approved":
                              return { bg: "#d1fae5", color: "#047857" };
                            default:
                              return { bg: "#f3f4f6", color: "#6b7280" };
                          }
                        };

                        const priorityStyle = getPriorityStyle(
                          request.priority,
                        );
                        const statusStyle = getStatusStyle(request.status);

                        return (
                          <tr
                            key={index}
                            style={{
                              borderBottom:
                                index !== pendingRequests.length - 1
                                  ? "1px solid #e5e7eb"
                                  : "none",
                            }}
                          >
                            <td
                              style={{
                                padding: "8px 6px",
                                fontSize: "11px",
                                color: "#6b7280",
                              }}
                            >
                              {request.id}
                            </td>
                            <td
                              style={{
                                padding: "8px 6px",
                                fontSize: "12px",
                                color: "#1f2937",
                              }}
                            >
                              {request.title}
                            </td>
                            <td
                              style={{
                                padding: "8px 6px",
                                fontSize: "11px",
                                color: "#6b7280",
                              }}
                            >
                              {request.submittedDate}
                            </td>
                            <td style={{ padding: "8px 6px" }}>
                              <span
                                style={{
                                  fontSize: "10px",
                                  backgroundColor: priorityStyle.bg,
                                  color: priorityStyle.color,
                                  padding: "3px 8px",
                                  borderRadius: "9999px",
                                  fontWeight: "600",
                                  display: "inline-block",
                                }}
                              >
                                {request.priority}
                              </span>
                            </td>
                            <td style={{ padding: "8px 6px" }}>
                              <span
                                style={{
                                  fontSize: "10px",
                                  backgroundColor: statusStyle.bg,
                                  color: statusStyle.color,
                                  padding: "3px 8px",
                                  borderRadius: "9999px",
                                  fontWeight: "600",
                                  display: "inline-block",
                                }}
                              >
                                {request.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <a
                  href="/documents"
                  style={{
                    fontSize: "11px",
                    color: "#2563eb",
                    fontWeight: "500",
                    marginTop: "12px",
                    display: "inline-block",
                    textDecoration: "none",
                    borderBottom: "2px solid transparent",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderBottomColor = "#2563eb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderBottomColor = "transparent")
                  }
                >
                  View All Requests →
              </a>
            </div>
            </div>
            )}

            {/* Bottom Row - Recent Activities Container */}
            {!showKPIDetailedView && (
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#1f2937",
                    margin: "0",
                  }}
                >
                  Recent Activities
                </h3>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                    color: "#6b7280",
                  }}
                >
                  Last 24 hours
                </span>
              </div>

              {/* Timeline Activities List */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                {/* Activity 1 - Leave Approved */}
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "#dcfce7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#16a34a"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#1f2937",
                        margin: "0 0 4px 0",
                      }}
                    >
                      Leave Request Approved
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        margin: "0 0 4px 0",
                      }}
                    >
                      Your leave request for Dec 15-16 has been approved by
                      Sarah Johnson
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "#9ca3af",
                        margin: "0",
                      }}
                    >
                      2 hours ago
                    </p>
                  </div>
                </div>

                {/* Activity 2 - Task Completed */}
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "#dbeafe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2"
                    >
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#1f2937",
                        margin: "0 0 4px 0",
                      }}
                    >
                      Task Completed
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        margin: "0 0 4px 0",
                      }}
                    >
                      Monthly sales report submitted and marked as complete
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "#9ca3af",
                        margin: "0",
                      }}
                    >
                      5 hours ago
                    </p>
                  </div>
                </div>

                {/* Activity 3 - Document Uploaded */}
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "#fef3c7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#1f2937",
                        margin: "0 0 4px 0",
                      }}
                    >
                      Document Uploaded
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        margin: "0 0 4px 0",
                      }}
                    >
                      Performance review document uploaded successfully
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "#9ca3af",
                        margin: "0",
                      }}
                    >
                      Yesterday, 4:30 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  borderTop: "1px solid #e5e7eb",
                  marginTop: "16px",
                  marginBottom: "12px",
                }}
              ></div>

              {/* View All Activities Link */}
              <button
                onClick={() => setShowActivitiesSidesheet(true)}
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#2563eb",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  borderBottom: "2px solid transparent",
                  transition: "border-color 0.2s",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderBottomColor = "#2563eb")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderBottomColor = "transparent")
                }
              >
                View All Activities →
            </button>
          </div>
            )}

            {/* Forum Container */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#1f2937",
                    margin: "0",
                  }}
                >
                  Forum
                </h3>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                    color: "#6b7280",
                  }}
                >
                  Latest discussions
                </span>
              </div>

              {/* Forum Posts List */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {/* Post 1 */}
                <div
                  onClick={() => {
                    setSelectedForumTopic(1);
                    setShowForumDetailSidesheet(true);
                  }}
                  style={{
                    backgroundColor: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                    e.currentTarget.style.borderColor = "#d1d5db";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f9fafb";
                    e.currentTarget.style.borderColor = "#e5e7eb";
                  }}
                >
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#1f2937",
                      margin: "0 0 6px 0",
                    }}
                  >
                    How to prepare for annual reviews?
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "0 0 6px 0",
                    }}
                  >
                    Started by John Doe
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      fontSize: "11px",
                      color: "#9ca3af",
                    }}
                  >
                    <span>👥 5 replies</span>
                    <span>🕐 2 hours ago</span>
                  </div>
                </div>

                {/* Post 2 */}
                <div
                  onClick={() => {
                    setSelectedForumTopic(2);
                    setShowForumDetailSidesheet(true);
                  }}
                  style={{
                    backgroundColor: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                    e.currentTarget.style.borderColor = "#d1d5db";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f9fafb";
                    e.currentTarget.style.borderColor = "#e5e7eb";
                  }}
                >
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#1f2937",
                      margin: "0 0 6px 0",
                    }}
                  >
                    Best practices for remote collaboration
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "0 0 6px 0",
                    }}
                  >
                    Started by Sarah Smith
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      fontSize: "11px",
                      color: "#9ca3af",
                    }}
                  >
                    <span>👥 8 replies</span>
                    <span>🕐 1 day ago</span>
                  </div>
                </div>

                {/* Post 3 */}
                <div
                  onClick={() => {
                    setSelectedForumTopic(3);
                    setShowForumDetailSidesheet(true);
                  }}
                  style={{
                    backgroundColor: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                    e.currentTarget.style.borderColor = "#d1d5db";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f9fafb";
                    e.currentTarget.style.borderColor = "#e5e7eb";
                  }}
                >
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#1f2937",
                      margin: "0 0 6px 0",
                    }}
                  >
                    Tips for skill development in 2025
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "0 0 6px 0",
                    }}
                  >
                    Started by Mike Johnson
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      fontSize: "11px",
                      color: "#9ca3af",
                    }}
                  >
                    <span>👥 12 replies</span>
                    <span>🕐 3 days ago</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  borderTop: "1px solid #e5e7eb",
                  marginTop: "16px",
                  marginBottom: "12px",
                }}
              ></div>

              {/* View All Forum Link */}
              <button
                onClick={() => setShowForumSidesheet(true)}
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#2563eb",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  borderBottom: "2px solid transparent",
                  transition: "border-color 0.2s",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderBottomColor = "#2563eb")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderBottomColor = "transparent")
                }
              >
                View All Forum Topics →
              </button>
            </div>
        </div>

          {/* Right Section - 30% */}
          <div className="lg:col-span-4 space-y-4">
            {/* Calendar Container */}
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "16px",
                width: "100%",
                borderRadius: "12px",
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 2px 6px",
                border: "1px solid #e5e7eb",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              {/* Header Section with Navigation */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#222",
                      margin: "0",
                    }}
                  >
                    {monthNames[currentDate.getMonth()]}{" "}
                    {currentDate.getFullYear()}
                  </h2>
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    onClick={previousMonth}
                    style={{
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      backgroundColor: "#ffffff",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f9fafb";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffffff";
                    }}
                  >
                    <ChevronLeft size={14} color="#6b7280" />
                  </button>
                  <button
                    onClick={nextMonth}
                    style={{
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      backgroundColor: "#ffffff",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f9fafb";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffffff";
                    }}
                  >
                    <ChevronRight size={14} color="#6b7280" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div>
                {/* Day Names */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: "4px",
                    marginBottom: "4px",
                  }}
                >
                  {dayNames.map((day, idx) => (
                    <div
                      key={idx}
                      style={{
                        textAlign: "center",
                        fontSize: "10px",
                        fontWeight: "600",
                        color: "#9ca3af",
                        padding: "4px 0",
                      }}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: "2px",
                  }}
                >
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} style={{ height: "32px" }}></div>
                  ))}

                  {/* Actual days of the month */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dayEvents = getEventsForDay(day);
                    const todayCell = isToday(day);

                    return (
                      <div
                        key={day}
                        style={{
                          height: "32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                          borderRadius: "6px",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          backgroundColor: todayCell
                            ? "#3b82f6"
                            : "transparent",
                        }}
                        onMouseEnter={(e) => {
                          if (!todayCell) {
                            e.currentTarget.style.backgroundColor = "#f3f4f6";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!todayCell) {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }
                        }}
                      >
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: todayCell ? "600" : "500",
                            color: todayCell ? "#ffffff" : "#374151",
                          }}
                        >
                          {day}
                        </span>
                        {dayEvents.length > 0 && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: "2px",
                              left: "50%",
                              transform: "translateX(-50%)",
                              display: "flex",
                              gap: "2px",
                            }}
                          >
                            {dayEvents.slice(0, 3).map((event, idx) => (
                              <div
                                key={idx}
                                style={{
                                  width: "3px",
                                  height: "3px",
                                  borderRadius: "50%",
                                  backgroundColor: todayCell
                                    ? "#ffffff"
                                    : "#3b82f6",
                                }}
                              ></div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* View Full Calendar Link */}
              <a
                href="/calendar"
                style={{
                  fontSize: "12px",
                  color: "#3b82f6",
                  fontWeight: "500",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  borderBottom: "2px solid transparent",
                  transition: "border-color 0.2s",
                  marginTop: "4px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderBottomColor = "#3b82f6")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderBottomColor = "transparent")
                }
              >
                View Full Calendar →
              </a>
            </div>

            {/* Announcements Container */}
            <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-sm">
              <div className="mb-2">
                <h2 className="text-sm font-semibold text-gray-900 mb-0.5">
                  Announcements
                </h2>
                <p className="text-xs text-gray-600 mb-2">
                  List of company-wide announcements
                </p>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-gray-200">
                  <button
                    onClick={() => setAnnouncementTab("All")}
                    className={`pb-1.5 text-xs font-medium transition-colors relative ${
                      announcementTab === "All"
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    All
                    {announcementTab === "All" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setAnnouncementTab("News")}
                    className={`pb-1.5 text-xs font-medium transition-colors relative ${
                      announcementTab === "News"
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    News
                    {announcementTab === "News" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setAnnouncementTab("Activities")}
                    className={`pb-1.5 text-xs font-medium transition-colors relative ${
                      announcementTab === "Activities"
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Activities
                    {announcementTab === "Activities" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                    )}
                  </button>
                </div>
              </div>

              {/* Scrollable Announcement List */}
              <div className="max-h-[300px] overflow-y-auto">
                {/* Announcement 1 */}
                <div className="flex gap-3 py-2 border-b border-gray-200">
                  <div className="flex-shrink-0 w-12 text-center">
                    <div className="text-xs font-medium text-gray-900">
                      Today
                    </div>
                    <div className="text-xs text-gray-500">09:00</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-semibold text-gray-900 mb-0.5">
                      Welcome to the Era of Zero!
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      Dear Phemex Traders, The day has finally come! Today, we
                      have officially launched our Membership Spot Trading
                      services...
                    </p>
                  </div>
                </div>

                {/* Announcement 2 */}
                <div className="flex gap-3 py-2 border-b border-gray-200">
                  <div className="flex-shrink-0 w-12 text-center">
                    <div className="text-xs font-medium text-gray-900">
                      Jan 20
                    </div>
                    <div className="text-xs text-gray-500">2025</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-semibold text-gray-900 mb-0.5">
                      Company Holiday Schedule 2025
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      The updated holiday schedule for 2025 has been posted.
                      Please review and plan accordingly.
                    </p>
                  </div>
                </div>

                {/* Announcement 3 */}
                <div className="flex gap-3 py-2">
                  <div className="flex-shrink-0 w-12 text-center">
                    <div className="text-xs font-medium text-gray-900">
                      Jan 18
                    </div>
                    <div className="text-xs text-gray-500">2025</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-semibold text-gray-900 mb-0.5">
                      New Health & Wellness Program
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      Join our new wellness program with fitness classes and
                      mental health resources. Registration opens next week.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowAnnouncementsSidesheet(true)}
                className="mt-2 text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors"
              >
                View All Announcements →
              </button>
            </div>

            {/* Bottom Medium Card - Quick Actions */}
            <div className="bg-white border border-gray-300 rounded-lg p-3 flex flex-col h-[180px]">
              <h2 className="text-base font-semibold text-gray-900 mb-2">
                Quick Actions
              </h2>

              <div className="flex-1 space-y-1.5">
                <button
                  onClick={() => setShowLeaveModal(true)}
                  className="w-full px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors border-none"
                >
                  📋 Apply for Leave
                </button>
                <button
                  onClick={() => navigate("/my-leave-attendance")}
                  className="w-full px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors border-none"
                >
                  ⏱️ Overtime
                </button>
                <button
                  onClick={() => navigate("/requests-documents")}
                  className="w-full px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors border-none"
                >
                  📝 Submit Request
                </button>
                <button
                  onClick={() => navigate("/tasks")}
                  className="w-full px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
                >
                  ✨ New Task
                </button>
              </div>
            </div>

            {/* Upcoming Events Container */}
            <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-gray-900">
                  Upcoming Events
                </h2>
                <span className="text-xs text-gray-500">This Week</span>
              </div>

              <div className="space-y-2">
                {/* Event 1 */}
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    padding: "8px",
                    backgroundColor: "#f9fafb",
                    borderRadius: "6px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      width: "3px",
                      backgroundColor: "#3b82f6",
                      borderRadius: "2px",
                    }}
                  ></div>
                  <div style={{ flex: 1 }}>
                    <div className="flex items-start justify-between mb-1">
                      <h3
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#1f2937",
                          margin: 0,
                        }}
                      >
                        Team Meeting
                      </h3>
                      <span
                        style={{
                          fontSize: "9px",
                          padding: "2px 6px",
                          backgroundColor: "#dbeafe",
                          color: "#1e40af",
                          borderRadius: "10px",
                          fontWeight: "500",
                        }}
                      >
                        Meeting
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "#6b7280",
                        margin: 0,
                      }}
                    >
                      📅 Tomorrow, 10:00 AM
                    </p>
                    <p
                      style={{
                        fontSize: "10px",
                        color: "#9ca3af",
                        margin: "2px 0 0 0",
                      }}
                    >
                      Weekly team sync and project updates
                    </p>
                  </div>
                </div>

                {/* Event 2 */}
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    padding: "8px",
                    backgroundColor: "#f9fafb",
                    borderRadius: "6px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      width: "3px",
                      backgroundColor: "#10b981",
                      borderRadius: "2px",
                    }}
                  ></div>
                  <div style={{ flex: 1 }}>
                    <div className="flex items-start justify-between mb-1">
                      <h3
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#1f2937",
                          margin: 0,
                        }}
                      >
                        Project Deadline
                      </h3>
                      <span
                        style={{
                          fontSize: "9px",
                          padding: "2px 6px",
                          backgroundColor: "#d1fae5",
                          color: "#065f46",
                          borderRadius: "10px",
                          fontWeight: "500",
                        }}
                      >
                        Deadline
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "#6b7280",
                        margin: 0,
                      }}
                    >
                      📅 Dec 20, 5:00 PM
                    </p>
                    <p
                      style={{
                        fontSize: "10px",
                        color: "#9ca3af",
                        margin: "2px 0 0 0",
                      }}
                    >
                      Q4 project final submission
                    </p>
                  </div>
                </div>

                {/* Event 3 */}
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    padding: "8px",
                    backgroundColor: "#f9fafb",
                    borderRadius: "6px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      width: "3px",
                      backgroundColor: "#f59e0b",
                      borderRadius: "2px",
                    }}
                  ></div>
                  <div style={{ flex: 1 }}>
                    <div className="flex items-start justify-between mb-1">
                      <h3
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#1f2937",
                          margin: 0,
                        }}
                      >
                        Annual Review
                      </h3>
                      <span
                        style={{
                          fontSize: "9px",
                          padding: "2px 6px",
                          backgroundColor: "#fef3c7",
                          color: "#92400e",
                          borderRadius: "10px",
                          fontWeight: "500",
                        }}
                      >
                        Review
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "#6b7280",
                        margin: 0,
                      }}
                    >
                      📅 Dec 28, 2:00 PM
                    </p>
                    <p
                      style={{
                        fontSize: "10px",
                        color: "#9ca3af",
                        margin: "2px 0 0 0",
                      }}
                    >
                      Annual performance review with manager
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="/calendar"
                className="mt-2 text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors inline-flex items-center gap-2"
              >
                View All Events →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements Sidesheet */}
      {showAnnouncementsSidesheet && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "400px",
            height: "100vh",
            backgroundColor: "#FFFFFF",
            boxShadow: "-4px 0 12px rgba(0, 0, 0, 0.15)",
            zIndex: 50,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Sidesheet Header */}
          <div
            style={{
              padding: "20px",
              borderBottom: "1px solid #E5E7EB",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#111827",
                margin: 0,
              }}
            >
              All Announcements
            </h2>
            <button
              onClick={() => setShowAnnouncementsSidesheet(false)}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#6B7280",
                padding: 0,
              }}
            >
              ×
            </button>
          </div>

          {/* Tabs */}
          <div
            style={{
              padding: "12px 20px 0 20px",
              borderBottom: "1px solid #E5E7EB",
              display: "flex",
              gap: "20px",
            }}
          >
            <button
              onClick={() => setAnnouncementTab("All")}
              style={{
                paddingBottom: "12px",
                fontSize: "13px",
                fontWeight: 500,
                color: announcementTab === "All" ? "#2563EB" : "#6B7280",
                background: "none",
                border: "none",
                cursor: "pointer",
                borderBottom: announcementTab === "All" ? "2px solid #2563EB" : "none",
              }}
            >
              All
            </button>
            <button
              onClick={() => setAnnouncementTab("News")}
              style={{
                paddingBottom: "12px",
                fontSize: "13px",
                fontWeight: 500,
                color: announcementTab === "News" ? "#2563EB" : "#6B7280",
                background: "none",
                border: "none",
                cursor: "pointer",
                borderBottom: announcementTab === "News" ? "2px solid #2563EB" : "none",
              }}
            >
              News
            </button>
            <button
              onClick={() => setAnnouncementTab("Activities")}
              style={{
                paddingBottom: "12px",
                fontSize: "13px",
                fontWeight: 500,
                color: announcementTab === "Activities" ? "#2563EB" : "#6B7280",
                background: "none",
                border: "none",
                cursor: "pointer",
                borderBottom: announcementTab === "Activities" ? "2px solid #2563EB" : "none",
              }}
            >
              Activities
            </button>
          </div>

          {/* Announcement List */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 20px",
            }}
          >
            {/* Announcement 1 */}
            <div style={{ marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #E5E7EB" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#111827",
                    minWidth: "50px",
                  }}
                >
                  <div>Today</div>
                  <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: 400 }}>
                    09:00
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#111827",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Welcome to the Era of Zero!
                  </h3>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6B7280",
                      margin: 0,
                      lineHeight: "1.4",
                    }}
                  >
                    Dear Phemex Traders, The day has finally come! Today, we have officially launched our Membership Spot Trading services...
                  </p>
                </div>
              </div>
            </div>

            {/* Announcement 2 */}
            <div style={{ marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #E5E7EB" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#111827",
                    minWidth: "50px",
                  }}
                >
                  <div>Jan 20</div>
                  <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: 400 }}>
                    2025
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#111827",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Company Holiday Schedule 2025
                  </h3>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6B7280",
                      margin: 0,
                      lineHeight: "1.4",
                    }}
                  >
                    The updated holiday schedule for 2025 has been posted. Please review and plan accordingly.
                  </p>
                </div>
              </div>
            </div>

            {/* Announcement 3 */}
            <div style={{ marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #E5E7EB" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#111827",
                    minWidth: "50px",
                  }}
                >
                  <div>Jan 18</div>
                  <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: 400 }}>
                    2025
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#111827",
                      margin: "0 0 4px 0",
                    }}
                  >
                    New Health & Wellness Program
                  </h3>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6B7280",
                      margin: 0,
                      lineHeight: "1.4",
                    }}
                  >
                    Join our new wellness program with fitness classes and mental health resources. Registration opens next week.
                  </p>
                </div>
              </div>
            </div>

            {/* Announcement 4 */}
            <div style={{ marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #E5E7EB" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#111827",
                    minWidth: "50px",
                  }}
                >
                  <div>Jan 15</div>
                  <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: 400 }}>
                    2025
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#111827",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Office Renovations Complete
                  </h3>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6B7280",
                      margin: 0,
                      lineHeight: "1.4",
                    }}
                  >
                    Our office has been successfully renovated with new workspaces and collaborative areas. Come visit!
                  </p>
                </div>
              </div>
            </div>

            {/* Announcement 5 */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#111827",
                    minWidth: "50px",
                  }}
                >
                  <div>Jan 10</div>
                  <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: 400 }}>
                    2025
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#111827",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Q1 All-Hands Meeting
                  </h3>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6B7280",
                      margin: 0,
                      lineHeight: "1.4",
                    }}
                  >
                    Join us for our quarterly company-wide meeting on January 22 at 2:00 PM in the main conference room.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {showAnnouncementsSidesheet && (
        <div
          onClick={() => setShowAnnouncementsSidesheet(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 40,
          }}
        />
      )}

      {/* Activities Sidesheet */}
      {showActivitiesSidesheet && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "450px",
            height: "100vh",
            backgroundColor: "#ffffff",
            boxShadow: "-4px 0 12px rgba(0, 0, 0, 0.15)",
            zIndex: 50,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "20px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#111827",
                margin: 0,
              }}
            >
              All Activities
            </h2>
            <button
              onClick={() => setShowActivitiesSidesheet(false)}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#6B7280",
                padding: 0,
              }}
            >
              ×
            </button>
          </div>

          {/* Scrollable Content */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Activity 1 - Leave Approved */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#dcfce7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#1f2937",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Leave Request Approved
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Your leave request for Dec 15-16 has been approved by Sarah Johnson
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#9ca3af",
                      margin: "0",
                    }}
                  >
                    2 hours ago
                  </p>
                </div>
              </div>

              {/* Activity 2 - Task Completed */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#dbeafe",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#1f2937",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Task Completed
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Monthly sales report submitted and marked as complete
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#9ca3af",
                      margin: "0",
                    }}
                  >
                    5 hours ago
                  </p>
                </div>
              </div>

              {/* Activity 3 - Document Uploaded */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#fef3c7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#1f2937",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Document Uploaded
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Performance review document uploaded successfully
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#9ca3af",
                      margin: "0",
                    }}
                  >
                    Yesterday, 4:30 PM
                  </p>
                </div>
              </div>

              {/* Activity 4 - Announcement Posted */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#e0e7ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="2"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#1f2937",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Announcement Posted
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "0 0 4px 0",
                    }}
                  >
                    New company policy on flexible working hours has been announced
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#9ca3af",
                      margin: "0",
                    }}
                  >
                    Dec 10, 10:00 AM
                  </p>
                </div>
              </div>

              {/* Activity 5 - Request Submitted */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#fce7f3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="2"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#1f2937",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Request Submitted
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Training course request submitted for approval
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#9ca3af",
                      margin: "0",
                    }}
                  >
                    Dec 8, 2:15 PM
                  </p>
                </div>
              </div>

              {/* Activity 6 - Certification Earned */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#fef08a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ca8a04"
                    strokeWidth="2"
                  >
                    <path d="M12 15l-8.5 4.5 1.6-9.3L.5 6.5h9.3L12 0l2.2 6.5h9.3l-7.6 5.7 1.6 9.3z"></path>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#1f2937",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Certification Earned
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Successfully completed AWS Cloud Practitioner certification
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#9ca3af",
                      margin: "0",
                    }}
                  >
                    Dec 5, 9:00 AM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activities Backdrop */}
      {showActivitiesSidesheet && (
        <div
          onClick={() => setShowActivitiesSidesheet(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 40,
          }}
        />
      )}

      {/* Forum Topics Sidesheet */}
      {showForumSidesheet && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "450px",
            height: "100vh",
            backgroundColor: "#ffffff",
            boxShadow: "-4px 0 12px rgba(0, 0, 0, 0.15)",
            zIndex: 50,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "20px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#111827",
                margin: 0,
              }}
            >
              Forum Topics
            </h2>
            <button
              onClick={() => setShowForumSidesheet(false)}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#6B7280",
                padding: 0,
              }}
            >
              ×
            </button>
          </div>

          {/* Scrollable Content */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Topic 1 */}
              <div
                onClick={() => {
                  setSelectedForumTopic(1);
                  setShowForumDetailSidesheet(true);
                }}
                style={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                  e.currentTarget.style.borderColor = "#d1d5db";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#1f2937",
                    margin: "0 0 6px 0",
                  }}
                >
                  How to prepare for annual reviews?
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    margin: "0 0 6px 0",
                  }}
                >
                  Started by John Doe
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    fontSize: "11px",
                    color: "#9ca3af",
                  }}
                >
                  <span>👥 5 replies</span>
                  <span>🕐 2 hours ago</span>
                </div>
              </div>

              {/* Topic 2 */}
              <div
                onClick={() => {
                  setSelectedForumTopic(2);
                  setShowForumDetailSidesheet(true);
                }}
                style={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                  e.currentTarget.style.borderColor = "#d1d5db";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#1f2937",
                    margin: "0 0 6px 0",
                  }}
                >
                  Best practices for remote collaboration
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    margin: "0 0 6px 0",
                  }}
                >
                  Started by Sarah Smith
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    fontSize: "11px",
                    color: "#9ca3af",
                  }}
                >
                  <span>👥 8 replies</span>
                  <span>🕐 1 day ago</span>
                </div>
              </div>

              {/* Topic 3 */}
              <div
                onClick={() => {
                  setSelectedForumTopic(3);
                  setShowForumDetailSidesheet(true);
                }}
                style={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                  e.currentTarget.style.borderColor = "#d1d5db";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#1f2937",
                    margin: "0 0 6px 0",
                  }}
                >
                  Tips for skill development in 2025
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    margin: "0 0 6px 0",
                  }}
                >
                  Started by Mike Johnson
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    fontSize: "11px",
                    color: "#9ca3af",
                  }}
                >
                  <span>👥 12 replies</span>
                  <span>🕐 3 days ago</span>
                </div>
              </div>

              {/* Topic 4 */}
              <div
                onClick={() => {
                  setSelectedForumTopic(4);
                  setShowForumDetailSidesheet(true);
                }}
                style={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                  e.currentTarget.style.borderColor = "#d1d5db";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#1f2937",
                    margin: "0 0 6px 0",
                  }}
                >
                  Work-life balance during busy seasons
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    margin: "0 0 6px 0",
                  }}
                >
                  Started by Emily Brown
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    fontSize: "11px",
                    color: "#9ca3af",
                  }}
                >
                  <span>👥 15 replies</span>
                  <span>🕐 1 week ago</span>
                </div>
              </div>

              {/* Topic 5 */}
              <div
                style={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                  e.currentTarget.style.borderColor = "#d1d5db";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#1f2937",
                    margin: "0 0 6px 0",
                  }}
                >
                  New tools and technologies worth learning
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    margin: "0 0 6px 0",
                  }}
                >
                  Started by Alex Chen
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    fontSize: "11px",
                    color: "#9ca3af",
                  }}
                >
                  <span>👥 22 replies</span>
                  <span>🕐 2 weeks ago</span>
                </div>
              </div>

              {/* Topic 6 */}
              <div
                style={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                  e.currentTarget.style.borderColor = "#d1d5db";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#1f2937",
                    margin: "0 0 6px 0",
                  }}
                >
                  Feedback on the new office space design
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    margin: "0 0 6px 0",
                  }}
                >
                  Started by Lisa Davis
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    fontSize: "11px",
                    color: "#9ca3af",
                  }}
                >
                  <span>👥 18 replies</span>
                  <span>🕐 3 weeks ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Forum Sidesheet Backdrop */}
      {showForumSidesheet && (
        <div
          onClick={() => setShowForumSidesheet(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 40,
          }}
        />
      )}

      {/* Leave Request Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Apply for Leave
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Leave Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Vacation Leave</option>
                  <option>Sick Leave</option>
                  <option>Emergency Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter reason for leave"
                ></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowLeaveModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
