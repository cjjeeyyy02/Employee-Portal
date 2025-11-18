import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users } from "lucide-react";
import Layout from "@/components/Layout";
import { useState } from "react";

type ViewMode = "day" | "week" | "month";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("month");

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

  const goToToday = () => {
    setCurrentDate(new Date());
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
    { day: 15, title: "Team Standup", time: "9:00 AM", color: "bg-blue-500" },
    { day: 15, title: "Project Review", time: "2:00 PM", color: "bg-purple-500" },
    { day: 18, title: "Client Meeting", time: "10:30 AM", color: "bg-green-500" },
    { day: 22, title: "All Hands", time: "3:00 PM", color: "bg-orange-500" },
  ];

  const getEventsForDay = (day: number) => {
    return sampleEvents.filter(event => event.day === day);
  };

  const renderCalendarDays = () => {
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="bg-gray-50 border-r border-b border-gray-200 min-h-[100px]">
        </div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const todayCell = isToday(day);
      
      days.push(
        <div
          key={day}
          className={`border-r border-b border-gray-200 min-h-[100px] p-2 hover:bg-gray-50 transition-colors cursor-pointer ${
            todayCell ? "bg-blue-50" : "bg-white"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-1">
              <span
                className={`text-sm font-semibold ${
                  todayCell ? "bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs" : "text-gray-700"
                }`}
              >
                {day}
              </span>
            </div>
            <div className="flex-1 space-y-1 overflow-hidden">
              {dayEvents.map((event, idx) => (
                <div
                  key={idx}
                  className={`${event.color} text-white text-xs px-2 py-1 rounded truncate`}
                  title={`${event.title} - ${event.time}`}
                >
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <Layout>
      <div className="max-w-[1600px] mx-auto h-full flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
              <button
                onClick={goToToday}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                Today
              </button>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New event
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900 min-w-[200px]">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex items-center gap-1 bg-gray-100 rounded-md p-1">
              <button
                onClick={() => setViewMode("day")}
                className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${
                  viewMode === "day"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setViewMode("week")}
                className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${
                  viewMode === "week"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setViewMode("month")}
                className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${
                  viewMode === "month"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Month
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-white">
          <div className="grid grid-cols-7 border-l border-t border-gray-200">
            {dayNames.map((day, idx) => (
              <div
                key={idx}
                className="border-r border-b border-gray-200 bg-gray-50 p-3 text-center font-semibold text-sm text-gray-700"
              >
                {day}
              </div>
            ))}
            {renderCalendarDays()}
          </div>
        </div>

        <div className="bg-white border-t border-gray-200 p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Upcoming Today</h3>
                  <p className="text-xs text-gray-600">2 meetings scheduled</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Team Events</h3>
                  <p className="text-xs text-gray-600">4 this week</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">In-Person</h3>
                  <p className="text-xs text-gray-600">1 meeting this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
