import { Star } from "lucide-react";

interface CategoryRating {
  name: string;
  rating: number;
}

interface FeedbackCardProps {
  name: string;
  position: string;
  feedbackType: string;
  rating: number;
  date: string;
  comment: string;
  categoryRatings: CategoryRating[];
  onCardClick?: () => void;
}

const StarRating = ({ rating }: { rating: number }) => {
  const filled = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-0.5">
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
    </div>
  );
};

export default function FeedbackCard({
  name,
  position,
  feedbackType,
  rating,
  date,
  comment,
  categoryRatings,
  onCardClick,
}: FeedbackCardProps) {
  return (
    <div
      onClick={onCardClick}
      className="bg-white border border-gray-200 rounded-[10px] p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Header Row */}
      <div className="flex justify-between items-start mb-2">
        {/* Left Side: Name and Tags */}
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-gray-900 mb-1.5">{name}</h3>
          <div className="flex gap-1.5 flex-wrap">
            <span className="bg-gray-200 text-gray-700 text-xs font-medium rounded-[12px] px-2 py-0.5">
              {position}
            </span>
            <span className="bg-gray-200 text-gray-700 text-xs font-medium rounded-[12px] px-2 py-0.5">
              {feedbackType}
            </span>
          </div>
        </div>

        {/* Right Side: Rating and Date */}
        <div className="flex items-center gap-2 ml-4">
          <div className="flex items-center gap-1">
            <StarRating rating={rating} />
            <span className="font-semibold text-gray-900 text-sm ml-1">{rating.toFixed(1)}</span>
          </div>
          <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{date}</span>
        </div>
      </div>

      {/* Comment Section */}
      <p className="text-xs text-gray-700 leading-relaxed mb-3 mt-2">{comment}</p>

      {/* Category Ratings Section */}
      <div className="bg-blue-50 rounded-[12px] px-3 py-2 flex justify-between items-center gap-3">
        {categoryRatings.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <p className="text-xs text-gray-700 mb-1">{category.name}</p>
            <p className="font-semibold text-gray-900 text-sm">{category.rating.toFixed(1)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
