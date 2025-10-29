import { Award, Users, Target } from "lucide-react";

type IconType = "award" | "team" | "target";

interface AchievementCardProps {
  icon: IconType;
  title: string;
  subtext: string;
}

const iconMap = {
  award: Award,
  team: Users,
  target: Target,
};

export default function AchievementCard({
  icon,
  title,
  subtext,
}: AchievementCardProps) {
  const IconComponent = iconMap[icon];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
      <div className="mb-2 p-2 bg-blue-50 rounded-lg">
        <IconComponent className="w-5 h-5 text-blue-600" />
      </div>
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <p className="text-xs text-gray-600 mt-0.5">{subtext}</p>
    </div>
  );
}
