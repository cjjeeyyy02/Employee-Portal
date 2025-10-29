import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ViewProvider } from "./context/ViewContext";
import PersonalInfo from "./pages/PersonalInfo";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import MyProfile from "./pages/MyProfile";
import MyLeaveAttendance from "./pages/MyLeaveAttendance";
import MyPerformance from "./pages/MyPerformance";
import MyTasks from "./pages/MyTasks";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
  <ViewProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Manager View Routes */}
            <Route path="/" element={<PersonalInfo />} />
            <Route path="/dashboard" element={<PersonalInfo />} />
            <Route path="/personal-info" element={<PersonalInfo />} />
            <Route path="/leave-attendance" element={<Placeholder title="Leave & Attendance" />} />
            <Route path="/payroll-benefits" element={<Placeholder title="Payroll & Benefits" />} />
            <Route path="/tasks" element={<Placeholder title="Task Management" />} />
            <Route path="/performance" element={<Placeholder title="Performance" />} />
            <Route path="/requests" element={<Placeholder title="Requests & Documents" />} />
            <Route path="/communications" element={<Placeholder title="Communications" />} />
            <Route path="/team-management" element={<Placeholder title="Team Management" />} />

            {/* Employee View Routes */}
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/my-leave-attendance" element={<MyLeaveAttendance />} />
            <Route path="/my-performance" element={<MyPerformance />} />
            <Route path="/my-tasks" element={<MyTasks />} />
            <Route path="/my-payslips" element={<Placeholder title="My Payslips" />} />
            <Route path="/documents" element={<Placeholder title="Documents" />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ViewProvider>
  );
}
