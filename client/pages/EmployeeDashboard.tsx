import Layout from "@/components/Layout";

export default function EmployeeDashboard() {
  return (
    <Layout>
      {/* Top Summary Cards - 4 Small + 1 Tall on Right */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {/* Small Cards - Left 4 */}
        <div className="col-span-1 h-24 bg-gray-300 rounded-lg animate-pulse"></div>
        <div className="col-span-1 h-24 bg-gray-300 rounded-lg animate-pulse"></div>
        <div className="col-span-1 h-24 bg-gray-300 rounded-lg animate-pulse"></div>
        <div className="col-span-1 h-24 bg-gray-300 rounded-lg animate-pulse"></div>

        {/* Tall Card - Right */}
        <div className="col-span-1 h-96 bg-gray-300 rounded-lg animate-pulse"></div>
      </div>

      {/* Main Content Grid - 70/30 Layout */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Left Column - 70% (2 cards) */}
        <div className="col-span-2 space-y-6">
          {/* Card 1 */}
          <div className="h-48 bg-gray-300 rounded-lg animate-pulse"></div>

          {/* Card 2 */}
          <div className="h-48 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>

        {/* Right Column - 30% (1 tall card) */}
        <div className="col-span-1">
          <div className="h-96 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Bottom Section - 70/30 Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left - Large Card */}
        <div className="col-span-2 h-48 bg-gray-300 rounded-lg animate-pulse"></div>

        {/* Right - Smaller Card */}
        <div className="col-span-1 h-48 bg-gray-300 rounded-lg animate-pulse"></div>
      </div>
    </Layout>
  );
}
