import { Briefcase, AlertCircle, TrendingUp, Calendar, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";

export default function EmployeeDashboard() {
  const metrics = [
    {
      label: "Pending Tasks",
      value: "6",
      icon: Briefcase,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Pending Requests",
      value: "3",
      icon: AlertCircle,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "KPI Score",
      value: "85%",
      subtext: "+3% from last month",
      icon: TrendingUp,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "# of Meetings Today",
      value: "2",
      icon: Calendar,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto">
        {/* Welcome Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-normal text-black" style={{ fontFamily: 'Poppins, -apple-system, Roboto, Helvetica, sans-serif' }}>
            Welcome back, John!
          </h1>
          <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Poppins, -apple-system, Roboto, Helvetica, sans-serif' }}>Here's your dashboard overview for today</p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* Left Section - 70% */}
          <div className="lg:col-span-8 space-y-4">
            {/* Top Row - 4 Small Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="bg-white border border-gray-300 rounded-lg p-2 flex flex-col justify-between h-20">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-gray-600 font-medium leading-tight truncate text-[11px]">{metric.label}</p>
                        <p className="text-sm font-bold text-gray-900 mt-0 leading-tight">{metric.value}</p>
                        {metric.subtext && (
                          <p className="text-xs text-gray-600 mt-0 flex items-center gap-0.5 leading-tight text-[10px]">
                            <ArrowUpRight className="w-2 h-2 text-green-600 flex-shrink-0" />
                            <span className="truncate">{metric.subtext}</span>
                          </p>
                        )}
                      </div>
                      <div className={`${metric.bgColor} p-1 rounded flex-shrink-0`}>
                        <Icon className={`w-3 h-3 ${metric.iconColor}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Middle Row - 2 Column Grid with Equal Width */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
              {/* Left Column - Pending Tasks */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                border: '1px solid #e5e7eb',
                padding: '16px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '4px'
                }}>Pending Tasks</h3>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  marginBottom: '12px'
                }}>Tasks that require your attention</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Task 1 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                    <div>
                      <p style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#1f2937',
                        margin: '0'
                      }}>Complete Q4 Performance Review</p>
                      <p style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        margin: '4px 0 0 0'
                      }}>Due: Tomorrow</p>
                    </div>
                    <span style={{
                      fontSize: '11px',
                      backgroundColor: '#fee2e2',
                      color: '#dc2626',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      whiteSpace: 'nowrap',
                      fontWeight: '600'
                    }}>High</span>
                  </div>

                  {/* Task 2 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                    <div>
                      <p style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#1f2937',
                        margin: '0'
                      }}>Submit Travel Expense Report</p>
                      <p style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        margin: '4px 0 0 0'
                      }}>Due: Friday</p>
                    </div>
                    <span style={{
                      fontSize: '11px',
                      backgroundColor: '#fef3c7',
                      color: '#b45309',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      whiteSpace: 'nowrap',
                      fontWeight: '600'
                    }}>Med</span>
                  </div>

                  {/* Task 3 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                    <div>
                      <p style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#1f2937',
                        margin: '0'
                      }}>Team Meeting Preparation</p>
                      <p style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        margin: '4px 0 0 0'
                      }}>Due: Next Week</p>
                    </div>
                    <span style={{
                      fontSize: '11px',
                      backgroundColor: '#d1fae5',
                      color: '#047857',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      whiteSpace: 'nowrap',
                      fontWeight: '600'
                    }}>Low</span>
                  </div>
                </div>

                <a href="#" style={{
                  fontSize: '13px',
                  color: '#2563eb',
                  fontWeight: '500',
                  marginTop: '16px',
                  display: 'inline-block',
                  textDecoration: 'none',
                  borderBottom: '2px solid transparent',
                  transition: 'border-color 0.2s'
                }} onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = '#2563eb'}
                   onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}>
                  View All Tasks →
                </a>
              </div>

              {/* Right Column - Pending Tasks List */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                border: '1px solid #e5e7eb',
                padding: '16px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0'
                  }}>Pending Tasks</h3>
                  <span style={{
                    fontSize: '11px',
                    backgroundColor: '#e5e7eb',
                    color: '#4b5563',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    fontWeight: '600'
                  }}>3</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Card 1 */}
                  <div>
                    <p style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#1f2937',
                      margin: '0'
                    }}>Q4 Performance Review</p>
                    <p style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      margin: '4px 0 0 0'
                    }}>Oct 25, 2024</p>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                      <span style={{
                        fontSize: '11px',
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        fontWeight: '600'
                      }}>Pending</span>
                      <span style={{
                        fontSize: '11px',
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        fontWeight: '600'
                      }}>High</span>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div>
                    <p style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#1f2937',
                      margin: '0'
                    }}>Complete Training Module</p>
                    <p style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      margin: '4px 0 0 0'
                    }}>Oct 30, 2024</p>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                      <span style={{
                        fontSize: '11px',
                        backgroundColor: '#fef3c7',
                        color: '#b45309',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        fontWeight: '600'
                      }}>Progress</span>
                      <span style={{
                        fontSize: '11px',
                        backgroundColor: '#fef3c7',
                        color: '#b45309',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        fontWeight: '600'
                      }}>Med</span>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div>
                    <p style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#1f2937',
                      margin: '0'
                    }}>Submit Project Deliverables</p>
                    <p style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      margin: '4px 0 0 0'
                    }}>Nov 5, 2024</p>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                      <span style={{
                        fontSize: '11px',
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        fontWeight: '600'
                      }}>Pending</span>
                      <span style={{
                        fontSize: '11px',
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        fontWeight: '600'
                      }}>High</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - 1 Large Card - Upcoming Events */}
            <div className="bg-white border border-gray-300 rounded-lg p-3 flex flex-col h-[240px]">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-bold text-gray-900">📅 Upcoming Events</h2>
                <span className="text-xs px-2 py-0.5 bg-gray-600 text-white rounded-full font-semibold text-[10px]">4 Events</span>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-2 overflow-y-auto">
                {/* Event 1 */}
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <h3 className="text-xs font-semibold text-gray-900">Company-Wide Town Hall</h3>
                  <p className="text-xs text-gray-600 mt-1 flex items-start gap-1">
                    🗓️ <span className="text-[11px]">Nov 14 10:00 AM</span>
                  </p>
                  <p className="text-xs text-gray-600 mt-1 flex items-start gap-1 leading-tight">
                    📌 <span className="text-[11px]">Mandatory for all staff…</span>
                  </p>
                </div>

                {/* Event 2 */}
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <h3 className="text-xs font-semibold text-gray-900">Data Security Training</h3>
                  <p className="text-xs text-gray-600 mt-1 flex items-start gap-1">
                    🗓️ <span className="text-[11px]">Nov 30 (5 days)</span>
                  </p>
                  <p className="text-xs text-gray-600 mt-1 flex items-start gap-1 leading-tight">
                    💬 <span className="text-[11px]">Complete for new hires…</span>
                  </p>
                </div>
              </div>

              {/* View Calendar Link */}
              <div className="mt-2 pt-2 border-t border-gray-200">
                <button className="text-blue-600 hover:text-blue-700 text-xs font-semibold">
                  🔗 View Calendar
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - 30% */}
          <div className="lg:col-span-4 space-y-4">
            {/* Top Tall Card - Announcements */}
            <div className="bg-white border border-gray-300 rounded-lg p-3 flex flex-col h-[380px]">
              <h2 className="text-base font-bold text-gray-900 mb-2">Announcements</h2>

              <div className="flex-1 space-y-3 overflow-y-auto">
                {/* Announcement 1 */}
                <div className="pb-3 border-b border-gray-200">
                  <h3 className="text-xs font-semibold text-gray-900">Holiday Schedule Update</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-tight">Please review the updated holiday schedule for Oct 26, 2023.</p>
                </div>

                {/* Announcement 2 */}
                <div className="pb-3">
                  <h3 className="text-xs font-semibold text-gray-900">Benefits Enrollment Open</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-tight">Annual benefits enrollment is now open until Oct 25, 2023.</p>
                </div>
              </div>

              {/* View All Link */}
              <div className="mt-2 pt-2 border-t border-gray-200">
                <button className="text-blue-600 hover:text-blue-700 text-xs font-semibold flex items-center gap-1">
                  🔗 View All →
                </button>
              </div>
            </div>

            {/* Bottom Medium Card - Quick Actions */}
            <div className="bg-white border border-gray-300 rounded-lg p-3 flex flex-col h-[180px]">
              <h2 className="text-base font-bold text-gray-900 mb-2">Quick Actions</h2>

              <div className="flex-1 space-y-1.5">
                <button className="w-full px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
                  📋 Request Leave
                </button>
                <button className="w-full px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
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
          </div>
        </div>
      </div>
    </Layout>
  );
}
