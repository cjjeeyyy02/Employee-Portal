import { Star } from "lucide-react";

interface ReviewCardProps {
  title: string;
  status: "pending" | "completed";
  dueDate?: string;
  completedDate?: string;
  overallRating?: number;
  managerRating?: number;
  selfRating?: number;
  onActionClick?: () => void;
}

const StarRating = ({ rating }: { rating: number }) => {
  const filled = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < filled
              ? "fill-yellow-400 text-yellow-400"
              : i === filled && hasHalf
                ? "fill-yellow-200 text-yellow-400"
                : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-sm font-semibold text-gray-900 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
};

export default function ReviewCard({
  title,
  status,
  dueDate,
  completedDate,
  overallRating,
  managerRating,
  selfRating,
  onActionClick,
}: ReviewCardProps) {
  const statusColors = {
    pending: "bg-yellow-400 text-white",
    completed: "bg-green-500 text-white",
  };

  const buttonStyles = {
    pending:
      "bg-blue-600 text-white hover:bg-blue-700",
    completed:
      "bg-white border border-gray-300 text-gray-900 hover:bg-gray-50",
  };

  const buttonText = status === "pending" ? "Start Review" : "View Details";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center gap-3">
      {/* Left Section: Review Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusColors[status]}`}
          >
            {status === "pending" ? "Pending" : "Completed"}
          </span>
        </div>

        <div className="space-y-1 mt-2">
          {status === "pending" ? (
            <p className="text-sm text-gray-600">Due: {dueDate}</p>
          ) : (
            <>
              <p className="text-sm text-gray-600">Completed: {completedDate}</p>
              {overallRating !== undefined && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Overall Rating:</span>
                  <StarRating rating={overallRating} />
                </div>
              )}
              {managerRating !== undefined && (
                <p className="text-sm text-gray-600">Manager Rating: <span className="font-semibold">{managerRating}</span></p>
              )}
              {selfRating !== undefined && (
                <p className="text-sm text-gray-600">Self Rating: <span className="font-semibold">{selfRating}</span></p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Right Section: Action Button */}
      <button
        onClick={onActionClick}
        className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${buttonStyles[status]}`}
      >
        {buttonText}
      </button>
    </div>
  );
}
