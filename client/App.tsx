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
import DocumentRequests from "./pages/DocumentRequests";
import Calendar from "./pages/Calendar";
import AIChat from "./pages/AIChat";
import Settings from "./pages/Settings";
import TeamManagement from "./pages/TeamManagement";
import TeamAttendance from "./pages/TeamAttendance";
import TeamTaskManagement from "./pages/TeamTaskManagement";
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
            {/* Employee View Routes */}
            <Route path="/" element={<EmployeeDashboard />} />

            {/* Manager View Routes */}
            <Route path="/dashboard" element={<PersonalInfo />} />
            <Route path="/personal-info" element={<PersonalInfo />} />
            <Route path="/leave-attendance" element={<Placeholder title="Leave & Attendance" />} />
            <Route path="/payroll-benefits" element={<Placeholder title="Payroll & Benefits" />} />
            <Route path="/tasks" element={<Placeholder title="Task Management" />} />
            <Route path="/performance" element={<Placeholder title="Performance" />} />
            <Route path="/requests" element={<Placeholder title="Requests & Documents" />} />
            <Route path="/communications" element={<Placeholder title="Communications" />} />
            <Route path="/team-management" element={<TeamManagement />} />
            <Route path="/team-attendance" element={<TeamAttendance />} />
            <Route path="/team-task-management" element={<TeamTaskManagement />} />
            <Route path="/performance-reviews" element={<Placeholder title="Performance Reviews" />} />
            <Route path="/request-approvals" element={<Placeholder title="Request Approvals" />} />
            <Route path="/reports-analytics" element={<Placeholder title="Reports & Analytics" />} />

            {/* Employee View Routes */}
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/my-leave-attendance" element={<MyLeaveAttendance />} />
            <Route path="/my-performance" element={<MyPerformance />} />
            <Route path="/my-tasks" element={<MyTasks />} />
            <Route path="/my-payslips" element={<Placeholder title="My Payslips" />} />
            <Route path="/documents" element={<DocumentRequests />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/settings" element={<Settings />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ViewProvider>
  );
}
