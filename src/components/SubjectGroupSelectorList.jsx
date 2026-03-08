import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { SubjectGroupRow } from "./groupSelection/SubjectGroupRow.jsx";
import toast from "react-hot-toast";

export const SubjectGroupSelectorList = forwardRef(({ fetchData }, ref) => {
  const [rawSubjects, setRawSubjects] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [expandedTipos, setExpandedTipos] = useState([]);
  const [isAutoSelecting, setIsAutoSelecting] = useState(() => {
    // Restaurar estado de localStorage al montar
    const saved = localStorage.getItem("isAutoSelecting");
    const timestamp = localStorage.getItem("autoSelectingTimestamp");
    
    if (saved === "true" && timestamp) {
      const elapsed = Date.now() - parseInt(timestamp);
      const TEN_MINUTES = 10 * 60 * 1000;
      
      // Si han pasado más de 10 minutos, asumir que falló y limpiar
      if (elapsed > TEN_MINUTES) {
        localStorage.removeItem("isAutoSelecting");
        localStorage.removeItem("autoSelectingTimestamp");
        return false;
      }
      return true;
    }
    return false;
  });

  const toggleTipo = (tipo) => {
    setExpandedTipos((prev) =>
      prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo],
    );
  };

  const toggleSelected = (key) => {
    setSelectedSubjects((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const fetchSubjects = async () => {
    try {
      const { data, selected } = await fetchData();
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

  // Verificar periódicamente si el timeout ha expirado
  useEffect(() => {
    if (!isAutoSelecting) return;

    const interval = setInterval(() => {
      const timestamp = localStorage.getItem("autoSelectingTimestamp");
      if (timestamp) {
        const elapsed = Date.now() - parseInt(timestamp);
        const TEN_MINUTES = 10 * 60 * 1000;
        
        if (elapsed > TEN_MINUTES) {
          setIsAutoSelecting(false);
          localStorage.removeItem("isAutoSelecting");
          localStorage.removeItem("autoSelectingTimestamp");
          toast.error("La operación de autoselección ha expirado. Por favor, inténtalo de nuevo.");
        }
      }
    }, 30000); // Verificar cada 30 segundos

    return () => clearInterval(interval);
  }, [isAutoSelecting]);

  const groupedSubjects = rawSubjects.reduce((acc, curr) => {
    if (!acc[curr.subject]) acc[curr.subject] = [];
    acc[curr.subject].push(curr.tipo);
    return acc;
  }, {});

  return (
    <section className="w-full">
      <h2 className="text-lg md:text-xl font-semibold mb-4">
        Selecciona tus grupos
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-start mb-4 gap-4">
        <div>
          <input
            type="text"
            placeholder="Buscar asignatura..."
            className="input w-full name-filter"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            disabled={isAutoSelecting}
          />
        </div>
        <button
          className="btn clear-filters"
          disabled={isAutoSelecting}
          onClick={async () => {
            const selected = selectedSubjects;

            const body = selected.map((key) => {
              const [subject, tipo] = key.split("-");
              return { subject, tipo };
            });

            console.log("Guardando seleccionados:", body);

            try {
              const res = await fetch(
                "https://horariospceo.ingenieriainformatica.uniovi.es/schedule/horario",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                  credentials: "include",
                  body: JSON.stringify({ cogido: body }),
                },
              );

              if (!res.ok) throw new Error("Error al guardar");
              toast.success("Grupos guardados con éxito");
            } catch (err) {
              toast.error("Error al guardar grupos");
            }
          }}
        >
          Guardar seleccionadas
        </button>
        <button
          className="btn clear-filters"
          disabled={isAutoSelecting}
          onClick={async () => {
            // hace una llamada a /subjects que le asigna al usuario todas las asignaturas que tiene asignadas en su horario
            try {
              setIsAutoSelecting(true);
              localStorage.setItem("isAutoSelecting", "true");
              localStorage.setItem("autoSelectingTimestamp", Date.now().toString());
              toast.success(
                "Seleccionado asignaturas según tú horario actual, esto puede tardar unos minutos...",
              );
              const user = JSON.parse(localStorage.getItem("user") || "{}");
              const email = user.email;
              const res = await fetch(
                `https://horariospceo.ingenieriainformatica.uniovi.es/schedule/subjects?email=${email}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                  credentials: "include",
                },
              );

              if (!res.ok) throw new Error("Error al autoseleccionar");

              const data = await res.json();
              if (!data) throw new Error("Error al autoseleccionar");

              toast.success("Asignaturas autoseleccionadas con éxito");
              await fetchSubjects();
            } catch (err) {
              toast.error("Error al autoseleccionar asignaturas");
            } finally {
              setIsAutoSelecting(false);
              localStorage.removeItem("isAutoSelecting");
              localStorage.removeItem("autoSelectingTimestamp");
            }
          }}
        >
          {isAutoSelecting
            ? "Autoseleccionando..."
            : "Autoseleccionar asignaturas"}
        </button>
      </div>

      <div className="divide-y">
        {Object.entries(groupedSubjects)
          .filter(
            ([subject, tipos]) =>
              subject.toLowerCase().includes(searchFilter.toLowerCase()) ||
              tipos.some((tipo) =>
                tipo.toLowerCase().includes(searchFilter.toLowerCase()),
              ),
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
              disabled={isAutoSelecting}
            />
          ))}
      </div>
    </section>
  );
});
