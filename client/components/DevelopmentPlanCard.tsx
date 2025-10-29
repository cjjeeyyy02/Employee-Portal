interface DevelopmentPlanCardProps {
  title: string;
  subtext: string;
  statusBadge: string;
}

export default function DevelopmentPlanCard({
  title,
  subtext,
  statusBadge,
}: DevelopmentPlanCardProps) {
  const getStatusColor = (status: string) => {
    if (status.includes("In Progress")) {
      return "bg-blue-100 text-blue-800";
    } else if (status.includes("Planned")) {
      return "bg-gray-100 text-gray-800";
    } else if (status.includes("Completed")) {
      return "bg-green-100 text-green-800";
    }
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{subtext}</p>
        </div>
      </div>
      <div className="flex justify-end mt-3">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(statusBadge)}`}>
          {statusBadge}
        </span>
      </div>
    </div>
  );
}
