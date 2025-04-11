import { ChevronDown, ChevronRight } from 'lucide-react';
import { SubjectCheckbox } from './SubjectCheckbox';

export function SubjectGroupRow({
  tipo,
  subjects,
  isExpanded,
  onToggleExpand,
  selectedSubjects,
  onToggleSubject,
  searchFilter
}) {
  const filteredSubjects = subjects.filter(subject =>
    tipo.toLowerCase().includes(searchFilter.toLowerCase()) ||
    subject.toLowerCase().includes(searchFilter.toLowerCase())
  );

  if (filteredSubjects.length === 0) return null;

  const hasAnySelected = selectedSubjects.some(key => key.startsWith(`${tipo}-`));

  return (
    <div>
      <button
        onClick={onToggleExpand}
        className="w-full text-left py-3 flex items-center justify-between font-semibold text-gray-800 hover:bg-gray-100 cursor-pointer rounded-md"
      >
        <span className={hasAnySelected ? "text-[var(--main-blue)]" : ""}>
          {tipo}
        </span>
        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>

      {isExpanded && (
        <div className="pl-4 pb-4">
          <div className="flex flex-wrap gap-4">
            {filteredSubjects.map(subject => {
              const key = `${tipo}-${subject}`;
              return (
                <SubjectCheckbox
                  key={key}
                  subject={subject}
                  subjectKey={key}
                  isSelected={selectedSubjects.includes(key)}
                  onToggle={() => onToggleSubject(key)}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
