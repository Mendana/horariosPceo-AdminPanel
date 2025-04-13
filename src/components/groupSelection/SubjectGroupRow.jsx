import { ChevronDown, ChevronRight } from 'lucide-react';
import { SubjectCheckbox } from './SubjectCheckbox';

const asignaturasMatematicas = [
  "AF", "AI", "AII", "ALG", "AMatI", "AMatII", "AMatIII", "ANM",
  "CDI", "EDI", "EDII", "EstyProb", "GCS", "IAMat", "IE", "MDFEDP",
  "MNumer", "MOR", "ProgM", "PyE", "RNEDO", "TopI", "TopII", "VC"
];

export function SubjectGroupRow({
  subject,
  tipos,
  isExpanded,
  onToggleExpand,
  selectedSubjects,
  onToggleSubject,
  searchFilter
}) {
  const filteredTipos = tipos.filter(tipo =>
    subject.toLowerCase().includes(searchFilter.toLowerCase()) ||
    tipo.toLowerCase().includes(searchFilter.toLowerCase())
  );

  if (filteredTipos.length === 0) return null;

  const hasAnySelected = selectedSubjects.some(key => key.startsWith(`${subject}-`));

  const subjectLabel = asignaturasMatematicas.includes(subject)
  ? `${subject} - Matemáticas`
  : `${subject} - Informática`;

  return (
    <div>
      <button onClick={onToggleExpand} className="w-full text-left py-3 flex items-center justify-between font-semibold text-gray-800 hover:bg-gray-100 cursor-pointer rounded-md">
        <span className={hasAnySelected ? "text-[var(--main-blue)]" : ""}>
          {subjectLabel}
        </span>
        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>

      {isExpanded && (
        <div className="pl-4 pb-4">
          <div className="flex flex-wrap gap-4">
            {[...filteredTipos].sort().map(tipo => {
              const key = `${subject}-${tipo}`;
              return (
                <SubjectCheckbox
                  key={key}
                  subject={tipo}
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
