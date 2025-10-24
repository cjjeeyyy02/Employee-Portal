import { useState } from "react";
import { Camera, Download, Award, BookOpen, FileText, Briefcase } from "lucide-react";
import Layout from "@/components/Layout";

type TabType = "personal" | "work" | "skills" | "training" | "payslips" | "documents";

const tabs: { id: TabType; label: string }[] = [
  { id: "personal", label: "Personal Info" },
  { id: "work", label: "Work Details" },
  { id: "skills", label: "Skills" },
  { id: "training", label: "Training" },
  { id: "payslips", label: "Payslips" },
  { id: "documents", label: "Documents" },
];

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState<TabType>("personal");

  const skillsData = [
    { name: "React", proficiency: "Expert", level: 95 },
    { name: "TypeScript", proficiency: "Advanced", level: 85 },
    { name: "Node.js", proficiency: "Advanced", level: 80 },
    { name: "System Design", proficiency: "Intermediate", level: 70 },
    { name: "Project Management", proficiency: "Intermediate", level: 65 },
  ];

  const trainingData = [
    {
      id: 1,
      title: "Advanced React Patterns",
      provider: "Udemy",
      status: "Completed",
      completedDate: "Sep 15, 2024",
      hours: 24,
    },
    {
      id: 2,
      title: "Leadership Fundamentals",
      provider: "LinkedIn Learning",
      status: "In Progress",
      progress: 60,
      hours: 8,
    },
    {
      id: 3,
      title: "Cloud Architecture with AWS",
      provider: "Coursera",
      status: "Not Started",
      hours: 32,
    },
  ];

  const payslipsData = [
    { month: "October 2024", date: "Oct 31, 2024", amount: "$5,200" },
    { month: "September 2024", date: "Sep 30, 2024", amount: "$5,200" },
    { month: "August 2024", date: "Aug 31, 2024", amount: "$5,200" },
    { month: "July 2024", date: "Jul 31, 2024", amount: "$5,000" },
    { month: "June 2024", date: "Jun 30, 2024", amount: "$5,000" },
  ];

  const documentsData = [
    { id: 1, name: "Employment Offer Letter", type: "PDF", date: "Jan 15, 2023" },
    { id: 2, name: "Employment Contract", type: "PDF", date: "Jan 15, 2023" },
    { id: 3, name: "Background Check Report", type: "PDF", date: "Jan 20, 2023" },
    { id: 4, name: "Certification - AWS Solutions Architect", type: "PDF", date: "Jun 10, 2024" },
    { id: 5, name: "Performance Review FY2024", type: "PDF", date: "Oct 15, 2024" },
  ];

  return (
    <Layout>
      {/* Header Section */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">My Profile</h1>
        <p className="text-xs text-gray-600">View and manage your profile information</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-4 bg-white rounded-t-lg">
        <div className="flex gap-0 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 font-medium text-xs border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-blue-600"
                  : "text-gray-600 border-b-transparent hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        {/* Personal Info Tab */}
        {activeTab === "personal" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Profile Photo Card */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Profile Photo</h2>
              <div className="flex items-center justify-center py-8">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Basic Information Card */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">First Name</label>
                    <p className="text-sm text-gray-900 font-medium">John</p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Last Name</label>
                    <p className="text-sm text-gray-900 font-medium">Doe</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Bio</label>
                  <p className="text-xs text-gray-900 font-medium">
                    Senior Software Developer with 8+ years of experience in full-stack development.
                  </p>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Email</label>
                  <p className="text-xs text-gray-900 font-medium">john.doe@company.com</p>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Phone</label>
                  <p className="text-xs text-gray-900 font-medium">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Work Details Tab */}
        {activeTab === "work" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Current Position
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Job Title</label>
                  <p className="text-sm font-semibold text-gray-900">Senior Software Developer</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Department</label>
                  <p className="text-sm text-gray-900 font-medium">Engineering</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Reports To</label>
                  <p className="text-sm text-gray-900 font-medium">Sarah Johnson (Engineering Manager)</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Office Location</label>
                  <p className="text-sm text-gray-900 font-medium">San Francisco, CA</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Employment Details</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Start Date</label>
                  <p className="text-sm text-gray-900 font-medium">January 15, 2023</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Employment Type</label>
                  <p className="text-sm text-gray-900 font-medium">Full-Time</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Years of Service</label>
                  <p className="text-sm text-gray-900 font-medium">1 year, 9 months</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Employee ID</label>
                  <p className="text-sm text-gray-900 font-medium">EMP-2023-0451</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div>
            <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-4 h-4" /> Skills & Proficiencies
            </h2>
            <div className="space-y-2">
              {skillsData.map((skill, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{skill.name}</p>
                      <p className="text-xs text-gray-600">{skill.proficiency}</p>
                    </div>
                    <span className="text-sm font-semibold text-blue-600">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Training Tab */}
        {activeTab === "training" && (
          <div>
            <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Training & Development
            </h2>
            <div className="space-y-2">
              {trainingData.map((training) => (
                <div key={training.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{training.title}</p>
                      <p className="text-xs text-gray-600">{training.provider}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        training.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : training.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {training.status}
                    </span>
                  </div>

                  {training.status === "Completed" && (
                    <p className="text-sm text-gray-600 mb-2">
                      Completed: {(training as any).completedDate}
                    </p>
                  )}

                  {training.status === "In Progress" && (
                    <>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(training as any).progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600">{(training as any).progress}% Complete</p>
                    </>
                  )}

                  <p className="text-xs text-gray-500 mt-2">{training.hours} hours</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payslips Tab */}
        {activeTab === "payslips" && (
          <div>
            <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Payslips
            </h2>
            <div className="space-y-2">
              {payslipsData.map((payslip, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{payslip.month}</p>
                    <p className="text-xs text-gray-600">{payslip.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-semibold text-gray-900">{payslip.amount}</p>
                    <button className="text-blue-600 hover:text-blue-700 p-1 hover:bg-blue-50 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div>
            <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Documents
            </h2>
            <div className="space-y-2">
              {documentsData.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{doc.name}</p>
                    <p className="text-xs text-gray-600">{doc.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-600 bg-gray-200 px-2 py-0.5 rounded">
                      {doc.type}
                    </span>
                    <button className="text-blue-600 hover:text-blue-700 p-1 hover:bg-blue-50 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
