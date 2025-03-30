export function TechCard({ name, description, Icon }) {
    return (
      <div className="tech-container">
        <div className="flex flex-row gap-1 items-center">
          <h4>{name}</h4>
          <Icon size={25} className="text-[var(--main-blue)]" />
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    );
  }