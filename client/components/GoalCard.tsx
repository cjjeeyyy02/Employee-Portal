import { TrendingUp, Edit2 } from "lucide-react";

interface GoalCardProps {
  title: string;
  status: "on track" | "at risk";
  description: string;
  target: string;
  current: string;
  progress: number;
  category: string;
  dueDate: string;
  onEdit?: () => void;
}

export default function GoalCard({
  title,
  status,
  description,
  target,
  current,
  progress,
  category,
  dueDate,
  onEdit,
}: GoalCardProps) {
  const statusStyles = {
    "on track": "bg-green-600 text-white",
    "at risk": "bg-red-600 text-white",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-[12px] p-3 shadow-sm hover:shadow-md transition-shadow mb-3">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-1.5">
        {/* Left Side: Goal Info */}
        <div className="flex-1 flex items-center gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-gray-900">{title}</h3>
            <TrendingUp className="w-4 h-4 text-blue-600 flex-shrink-0" />
          </div>
          <span
            className={`px-2 py-0.75 rounded-[10px] text-xs font-semibold lowercase whitespace-nowrap ${statusStyles[status]}`}
          >
            {status}
          </span>
        </div>

        {/* Right Side: Edit Button */}
        <button
          onClick={onEdit}
          className="flex items-center gap-1 px-2 py-1 bg-gray-50 border border-gray-200 text-gray-900 text-xs font-medium rounded-lg hover:bg-gray-100 transition-colors ml-2 flex-shrink-0 whitespace-nowrap"
        >
          <Edit2 className="w-3 h-3" />
          Edit
        </button>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-700 mb-1.5">{description}</p>

      {/* Target and Current Info */}
      <p className="text-xs text-gray-500 mb-2">{target}, {current}</p>

      {/* Progress Section */}
      <div className="mb-2">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <label className="text-xs font-bold text-gray-900">Progress</label>
          <span className="text-xs text-gray-700">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-[10px] h-1.5 overflow-hidden">
          <div
            className="bg-blue-500 h-1.5 rounded-[10px] transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Category and Due Date */}
      <div className="flex items-center justify-between text-xs">
        <p className="text-gray-500">{category}</p>
        <p className="text-gray-500">Due: {dueDate}</p>
      </div>
    </div>
  );
}
