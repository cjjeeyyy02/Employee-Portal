import {
  Briefcase,
  AlertCircle,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  CheckCircle,
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

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
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
    return sampleEvents.filter(event => event.day === day);
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
      route: "/my-performance",
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
                    onClick={() => navigate(metric.route)}
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
                      cursor: "pointer",
                      minHeight: "auto",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.02)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0, 0, 0, 0.1)";
                      e.currentTarget.style.borderColor = "#d1d5db";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 1px 3px rgba(0, 0, 0, 0.05)";
                      e.currentTarget.style.borderColor = "#e5e7eb";
                    }}
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

            {/* Middle Row - Stacked Layout: Pending Tasks then Pending Request */}
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
                              borderBottom: index !== pendingTasks.length - 1 ? "1px solid #e5e7eb" : "none",
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

                        const priorityStyle = getPriorityStyle(request.priority);
                        const statusStyle = getStatusStyle(request.status);

                        return (
                          <tr
                            key={index}
                            style={{
                              borderBottom: index !== pendingRequests.length - 1 ? "1px solid #e5e7eb" : "none",
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

            {/* Bottom Row - Upcoming Events Container */}
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
                  marginBottom: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: "18px", marginRight: "6px" }}>
                    ���
                  </span>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "#1f2937",
                      margin: "0",
                    }}
                  >
                    Upcoming Events
                  </h3>
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                    backgroundColor: "#374151",
                    color: "#ffffff",
                    padding: "4px 10px",
                    borderRadius: "9999px",
                  }}
                >
                  4 Events
                </span>
              </div>

              {/* Events Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                {/* Event 1 */}
                <div
                  style={{
                    backgroundColor: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "12px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#1f2937",
                      margin: "0",
                    }}
                  >
                    Company-Wide Town Hall
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "4px 0 0 0",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    📅 <span>Nov 14 10:00 AM</span>
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "4px 0 0 0",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "6px",
                    }}
                  >
                    📌 <span>Mandatory for all staff…</span>
                  </p>
                </div>

                {/* Event 2 */}
                <div
                  style={{
                    backgroundColor: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "12px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#1f2937",
                      margin: "0",
                    }}
                  >
                    Data Security Training
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "4px 0 0 0",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    📅 <span>Nov 30 (5 days)</span>
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "4px 0 0 0",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "6px",
                    }}
                  >
                    💬 <span>Complete for new hires…</span>
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  borderTop: "1px solid #e5e7eb",
                  marginTop: "12px",
                  marginBottom: "8px",
                }}
              ></div>

              {/* View Calendar Link */}
              <a
                href="#"
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
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderBottomColor = "#2563eb")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderBottomColor = "transparent")
                }
              >
                🔗 <span>View Calendar ���</span>
              </a>
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h2
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#222",
                      margin: "0",
                    }}
                  >
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
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
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "4px" }}>
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
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
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
                          backgroundColor: todayCell ? "#3b82f6" : "transparent",
                        }}
                        onMouseEnter={(e) => {
                          if (!todayCell) {
                            e.currentTarget.style.backgroundColor = "#f3f4f6";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!todayCell) {
                            e.currentTarget.style.backgroundColor = "transparent";
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
                                  backgroundColor: todayCell ? "#ffffff" : "#3b82f6",
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

              {/* Upcoming Events */}
              <div style={{ marginTop: "8px", paddingTop: "12px", borderTop: "1px solid #e5e7eb" }}>
                <h3 style={{ fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "8px" }}>
                  Upcoming Events
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {sampleEvents.map((event, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "6px 8px",
                        backgroundColor: "#f9fafb",
                        borderRadius: "6px",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      <div
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: event.color.includes("blue") ? "#3b82f6" :
                                          event.color.includes("green") ? "#10b981" : "#f97316",
                          flexShrink: 0,
                        }}
                      ></div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "11px", fontWeight: "500", color: "#374151", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {event.title}
                        </p>
                        <p style={{ fontSize: "10px", color: "#9ca3af", margin: 0 }}>
                          {monthNames[currentDate.getMonth()]} {event.day}
                        </p>
                      </div>
                    </div>
                  ))}
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

            {/* Bottom Medium Card - Quick Actions */}
            <div className="bg-white border border-gray-300 rounded-lg p-3 flex flex-col h-[180px]">
              <h2 className="text-base font-semibold text-gray-900 mb-2">
                Quick Actions
              </h2>

              <div className="flex-1 space-y-1.5">
                <button className="w-full px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors border-none">
                  📋 Request Leave
                </button>
                <button className="w-full px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors border-none">
                  ⏱️ Overtime
                </button>
                <button className="w-full px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
                  📝 Submit Request
                </button>
                <button className="w-full px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
                  ✨ New Task
                </button>
              </div>
            </div>

            {/* Announcements Container */}
            <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  Announcements
                </h2>
                <span className="text-xs text-gray-500">���</span>
              </div>

              <div className="space-y-3">
                {/* Announcement 1 */}
                <div className="pb-3 border-b border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">
                        Company Holiday Schedule 2025
                      </h3>
                      <p className="text-xs text-gray-600 mb-1">
                        The updated holiday schedule for 2025 has been posted.
                        Please review and plan accordingly.
                      </p>
                      <span className="text-xs text-gray-500">
                        Jan 20, 2025
                      </span>
                    </div>
                  </div>
                </div>

                {/* Announcement 2 */}
                <div className="pb-3 border-b border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">
                        New Health & Wellness Program
                      </h3>
                      <p className="text-xs text-gray-600 mb-1">
                        Join our new wellness program with fitness classes and
                        mental health resources.
                      </p>
                      <span className="text-xs text-gray-500">
                        Jan 18, 2025
                      </span>
                    </div>
                  </div>
                </div>

                {/* Announcement 3 */}
                <div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-orange-500"></div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">
                        IT System Maintenance
                      </h3>
                      <p className="text-xs text-gray-600 mb-1">
                        Scheduled maintenance on Jan 25th from 2 AM to 4 AM.
                        Services may be temporarily unavailable.
                      </p>
                      <span className="text-xs text-gray-500">
                        Jan 15, 2025
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="mt-4 text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
                View All Announcements →
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
