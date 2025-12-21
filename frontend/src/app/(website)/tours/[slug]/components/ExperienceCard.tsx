import { Experience } from "../../schema";

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-[4/3] overflow-hidden mb-4 relative">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {experience.category && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-widest z-20">
            {experience.category}
          </span>
        )}
      </div>
      <h4 className="text-xl font-medium mb-2 group-hover:text-gray-600 transition-colors">
        {experience.title}
      </h4>
      <p className="text-gray-600 text-sm leading-relaxed">
        {experience.description}
      </p>
    </div>
  );
}
