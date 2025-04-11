import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { SubjectGroupRow } from './groupSelection/SubjectGroupRow.jsx';

export const SubjectGroupSelectorList = forwardRef(({ fetchData }, ref) => {
  const [rawSubjects, setRawSubjects] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [expandedTipos, setExpandedTipos] = useState([]);

  const toggleTipo = (tipo) => {
    setExpandedTipos((prev) =>
      prev.includes(tipo) ? prev.filter(t => t !== tipo) : [...prev, tipo]
    );
  };

  const toggleSelected = (key) => {
    setSelectedSubjects((prev) =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const fetchSubjects = async () => {
    try {
      const { data, selected } = await fetchData(); // 🔄 ahora recibes { data, selected }
      setRawSubjects(data);
      setSelectedSubjects(selected); // usa directamente el array de claves
    } catch (err) {
      console.error("Error cargando asignaturas:", err);
    }
  };

  useImperativeHandle(ref, () => ({
    reload: fetchSubjects,
    getSelected: () => selectedSubjects,
  }));

  useEffect(() => {
    fetchSubjects();
  }, []);

  const groupedSubjects = rawSubjects.reduce((acc, curr) => {
    if (!acc[curr.tipo]) acc[curr.tipo] = [];
    acc[curr.tipo].push(curr.subject);
    return acc;
  }, {});

  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold mb-4">Selecciona tus grupos</h2>

      <div className="mb-4 flex flex-row items-center justify-start gap-4">
        <div>
          <input
            type="text"
            placeholder="Buscar asignatura..."
            className="input w-full name-filter"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>
        <button
          className="btn clear-filters"
          onClick={() => {
            const selected = selectedSubjects;
            console.log("Seleccionados:", selected);
            alert(`Grupos seleccionados:\n${selected.join('\n')}`);
          }}
        >
          Guardar seleccionadas
        </button>
      </div>

      <div className="divide-y">
        {Object.entries(groupedSubjects)
          .filter(([tipo, subjects]) =>
            tipo.toLowerCase().includes(searchFilter.toLowerCase()) ||
            subjects.some(subject =>
              subject.toLowerCase().includes(searchFilter.toLowerCase())
            )
          )
          .map(([tipo, subjects]) => (
            <SubjectGroupRow
              key={tipo}
              tipo={tipo}
              subjects={subjects}
              isExpanded={expandedTipos.includes(tipo)}
              onToggleExpand={() => toggleTipo(tipo)}
              selectedSubjects={selectedSubjects}
              onToggleSubject={toggleSelected}
              searchFilter={searchFilter}
            />
          ))}
      </div>
    </section>
  );
});
