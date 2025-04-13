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
    if (!acc[curr.subject]) acc[curr.subject] = [];
    acc[curr.subject].push(curr.tipo);
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
          onClick={async () => {
            const selected = selectedSubjects;

            const body = selected.map(key => {
              const [subject, tipo] = key.split("-");
              return { subject, tipo };
            });

            console.log("Guardando seleccionados:", body);

            try {
              const res = await fetch('https://horariospceo.ingenieriainformatica.uniovi.es/schedule/horario', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ cogido: body }),
              });

              if (!res.ok) throw new Error("Error al guardar");
              alert("Grupos guardados con éxito ✅");
            } catch (err) {
              console.error("Error guardando asignaturas:", err);
              alert("❌ Error al guardar tus grupos.");
            }
          }}
        >
          Guardar seleccionadas
        </button>
      </div>

      <div className="divide-y">
        {Object.entries(groupedSubjects)
          .filter(([subject, tipos]) =>
            subject.toLowerCase().includes(searchFilter.toLowerCase()) ||
            tipos.some(tipo => tipo.toLowerCase().includes(searchFilter.toLowerCase()))
          )
          .map(([subject, tipos]) => (
            <SubjectGroupRow
              key={subject}
              subject={subject}
              tipos={tipos}
              isExpanded={expandedTipos.includes(subject)}
              onToggleExpand={() => toggleTipo(subject)}
              selectedSubjects={selectedSubjects}
              onToggleSubject={toggleSelected}
              searchFilter={searchFilter}
            />
          ))}
      </div>
    </section>
  );
});
