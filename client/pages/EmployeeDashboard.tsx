import Layout from "@/components/Layout";

export default function EmployeeDashboard() {
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
              <div className="bg-white border border-gray-300 rounded h-20"></div>
              <div className="bg-white border border-gray-300 rounded h-20"></div>
              <div className="bg-white border border-gray-300 rounded h-20"></div>
              <div className="bg-white border border-gray-300 rounded h-20"></div>
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
