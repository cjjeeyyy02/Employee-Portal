import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users } from "lucide-react";
import Layout from "@/components/Layout";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type ViewMode = "day" | "week" | "month";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [isNewEventOpen, setIsNewEventOpen] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
    location: "",
  });

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
  const fullDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 || 12;
    const period = i < 12 ? "AM" : "PM";
    return `${hour}:00 ${period}`;
  });

  const previousPeriod = () => {
    if (viewMode === "day") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1));
    } else if (viewMode === "week") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    }
  };

  const nextPeriod = () => {
    if (viewMode === "day") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1));
    } else if (viewMode === "week") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    }
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
    { day: 15, title: "Team Standup", time: "9:00 AM", hour: 9, color: "bg-blue-500" },
    { day: 15, title: "Project Review", time: "2:00 PM", hour: 14, color: "bg-purple-500" },
    { day: 18, title: "Client Meeting", time: "10:30 AM", hour: 10, color: "bg-green-500" },
    { day: 22, title: "All Hands", time: "3:00 PM", hour: 15, color: "bg-orange-500" },
  ];

  const getEventsForDay = (day: number) => {
    return sampleEvents.filter(event => event.day === day);
  };

  const getEventsForHour = (day: number, hour: number) => {
    return sampleEvents.filter(event => event.day === day && event.hour === hour);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();

    if (!eventForm.title || !eventForm.date) {
      toast.error("Please fill in the required fields (Title and Date)");
      return;
    }

    toast.success(`${eventForm.title} has been added to your calendar`);

    setEventForm({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      description: "",
      location: "",
    });
    setIsNewEventOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEventForm({
      ...eventForm,
      [e.target.name]: e.target.value,
    });
  };

  const getWeekDays = () => {
    const curr = new Date(currentDate);
    const first = curr.getDate() - curr.getDay();
    const weekDays = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(curr.setDate(first + i));
      weekDays.push(date);
    }
    
    return weekDays;
  };

  const getPeriodTitle = () => {
    if (viewMode === "day") {
      return `${fullDayNames[currentDate.getDay()]}, ${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    } else if (viewMode === "week") {
      const weekDays = getWeekDays();
      const firstDay = weekDays[0];
      const lastDay = weekDays[6];
      return `${monthNames[firstDay.getMonth()]} ${firstDay.getDate()} - ${monthNames[lastDay.getMonth()]} ${lastDay.getDate()}, ${currentDate.getFullYear()}`;
    } else {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
  };

  const renderDayView = () => {
    return (
      <div className="border-l border-t border-gray-200">
        {timeSlots.map((time, idx) => {
          const events = getEventsForHour(currentDate.getDate(), idx);
          return (
            <div key={idx} className="flex border-b border-gray-200 min-h-[50px]">
              <div className="w-20 border-r border-gray-200 bg-gray-50 p-2 text-xs text-gray-600 font-medium">
                {time}
              </div>
              <div className="flex-1 p-1 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                {events.map((event, eventIdx) => (
                  <div
                    key={eventIdx}
                    className={`${event.color} text-white text-xs px-2 py-1 rounded mb-1`}
                  >
                    <div className="font-semibold">{event.title}</div>
                    <div className="text-[10px]">{event.time}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays();
    
    return (
      <div className="border-l border-t border-gray-200">
        <div className="grid grid-cols-8 sticky top-0 bg-white z-10">
          <div className="border-r border-b border-gray-200 bg-gray-50 p-2"></div>
          {weekDays.map((day, idx) => {
            const isCurrentDay = day.toDateString() === today.toDateString();
            return (
              <div
                key={idx}
                className={`border-r border-b border-gray-200 bg-gray-50 p-2 text-center ${
                  isCurrentDay ? "bg-blue-50" : ""
                }`}
              >
                <div className="text-xs font-semibold text-gray-700">{fullDayNames[day.getDay()].slice(0, 3)}</div>
                <div className={`text-xs mt-1 ${
                  isCurrentDay ? "bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center mx-auto" : "text-gray-600"
                }`}>
                  {day.getDate()}
                </div>
              </div>
            );
          })}
        </div>
        
        {timeSlots.map((time, timeIdx) => (
          <div key={timeIdx} className="grid grid-cols-8 min-h-[50px]">
            <div className="border-r border-b border-gray-200 bg-gray-50 p-2 text-xs text-gray-600 font-medium">
              {time}
            </div>
            {weekDays.map((day, dayIdx) => {
              const events = getEventsForHour(day.getDate(), timeIdx);
              return (
                <div
                  key={dayIdx}
                  className="border-r border-b border-gray-200 p-1 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  {events.map((event, eventIdx) => (
                    <div
                      key={eventIdx}
                      className={`${event.color} text-white text-[10px] px-1 py-0.5 rounded truncate mb-0.5`}
                      title={`${event.title} - ${event.time}`}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const renderMonthView = () => {
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="bg-gray-50 border-r border-b border-gray-200 min-h-[70px]">
        </div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const todayCell = isToday(day);

      days.push(
        <div
          key={day}
          className={`border-r border-b border-gray-200 min-h-[70px] p-1.5 hover:bg-gray-50 transition-colors cursor-pointer ${
            todayCell ? "bg-blue-50" : "bg-white"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-0.5">
              <span
                className={`text-xs font-semibold ${
                  todayCell ? "bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]" : "text-gray-700"
                }`}
              >
                {day}
              </span>
            </div>
            <div className="flex-1 space-y-0.5 overflow-hidden">
              {dayEvents.map((event, idx) => (
                <div
                  key={idx}
                  className={`${event.color} text-white text-[10px] px-1.5 py-0.5 rounded truncate`}
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

    return (
      <div className="grid grid-cols-7 border-l border-t border-gray-200">
        {dayNames.map((day, idx) => (
          <div
            key={idx}
            className="border-r border-b border-gray-200 bg-gray-50 p-1.5 text-center font-semibold text-xs text-gray-700"
          >
            {day}
          </div>
        ))}
        {days}
      </div>
    );
  };

  return (
    <Layout>
      <div className="max-w-[1600px] mx-auto h-full flex flex-col">
        <div className="bg-white border-b border-gray-200 px-4 py-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold text-gray-900">Calendar</h1>
              <button
                onClick={goToToday}
                className="px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                Today
              </button>
            </div>
            <button
              onClick={() => setIsNewEventOpen(true)}
              className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              New event
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={previousPeriod}
                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <h2 className="text-base font-semibold text-gray-900 min-w-[200px]">
                {getPeriodTitle()}
              </h2>
              <button
                onClick={nextPeriod}
                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="flex items-center gap-0.5 bg-gray-100 rounded-md p-0.5">
              <button
                onClick={() => setViewMode("day")}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  viewMode === "day"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setViewMode("week")}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  viewMode === "week"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setViewMode("month")}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
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
          {viewMode === "day" && renderDayView()}
          {viewMode === "week" && renderWeekView()}
          {viewMode === "month" && renderMonthView()}
        </div>

        <div className="bg-white border-t border-gray-200 p-2">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <div className="bg-blue-50 rounded-lg p-2 border border-blue-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-900">Upcoming Today</h3>
                  <p className="text-[10px] text-gray-600">2 meetings scheduled</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-2 border border-purple-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center">
                  <Users className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-900">Team Events</h3>
                  <p className="text-[10px] text-gray-600">4 this week</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-2 border border-green-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-green-600 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-900">In-Person</h3>
                  <p className="text-[10px] text-gray-600">1 meeting this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isNewEventOpen} onOpenChange={setIsNewEventOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateEvent}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-gray-900">
                  Event Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={eventForm.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Team meeting, Project review..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium text-gray-900">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={eventForm.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="startTime" className="text-sm font-medium text-gray-900">
                    Start Time
                  </label>
                  <input
                    id="startTime"
                    name="startTime"
                    type="time"
                    value={eventForm.startTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="endTime" className="text-sm font-medium text-gray-900">
                  End Time
                </label>
                <input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={eventForm.endTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium text-gray-900">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={eventForm.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Conference room, Online..."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-gray-900">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={eventForm.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Add event details..."
                />
              </div>
            </div>

            <DialogFooter>
              <button
                type="button"
                onClick={() => setIsNewEventOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Event
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
