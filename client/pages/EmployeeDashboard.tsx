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
        <h1 className="text-3xl font-normal text-black mb-8" style={{ fontFamily: 'Poppins, -apple-system, Roboto, Helvetica, sans-serif' }}>
          Welcome Back, John Doe
        </h1>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Section - 70% */}
          <div className="lg:col-span-8 space-y-4">
            {/* Top Row - 4 Small Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="bg-white border border-gray-300 rounded-lg p-4 flex flex-col justify-between h-24">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-gray-600 font-medium">{metric.label}</p>
                        <p className="text-xl font-bold text-gray-900 mt-1">{metric.value}</p>
                        {metric.subtext && (
                          <p className="text-xs text-gray-600 mt-1 flex items-center gap-0.5">
                            <ArrowUpRight className="w-3 h-3 text-green-600" />
                            {metric.subtext}
                          </p>
                        )}
                      </div>
                      <div className={`${metric.bgColor} p-2 rounded`}>
                        <Icon className={`w-4 h-4 ${metric.iconColor}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Middle Row - 2 Medium Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-300 rounded h-[340px]"></div>
              <div className="bg-white border border-gray-300 rounded h-[340px]"></div>
            </div>

            {/* Bottom Row - 1 Large Card */}
            <div className="bg-white border border-gray-300 rounded h-[297px]"></div>
          </div>

          {/* Right Section - 30% */}
          <div className="lg:col-span-4 space-y-4">
            {/* Top Tall Card */}
            <div className="bg-white border border-gray-300 rounded h-[542px]"></div>

            {/* Bottom Medium Card */}
            <div className="bg-white border border-gray-300 rounded h-[242px]"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
