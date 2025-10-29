interface Skill {
  name: string;
  level: string;
  rating: number;
  progress: number;
}

interface SkillGroupProps {
  groupName: string;
  skills: Skill[];
}

const SkillItem = ({ name, level, rating, progress }: Skill) => {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <div>
          <p className="text-xs font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-600">{level}</p>
        </div>
        <span className="text-xs font-semibold text-gray-900">{rating}/5</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default function SkillsAssessment({ groupName, skills }: SkillGroupProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">{groupName}</h3>
      <div className="space-y-0">
        {skills.map((skill, index) => (
          <SkillItem
            key={index}
            name={skill.name}
            level={skill.level}
            rating={skill.rating}
            progress={skill.progress}
          />
        ))}
      </div>
    </div>
  );
}
