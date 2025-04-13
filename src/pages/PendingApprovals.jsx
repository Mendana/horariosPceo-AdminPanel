import { useState, useEffect } from "react";
import { HeaderNav } from "../components/HeaderNav.jsx";

export const PendingApprovals = () => {
  const [pendingSubjects, setPendingSubjects] = useState([]);

  const fetchPending = async () => {
    try {
      const res = await fetch("https://horariospceo.ingenieriainformatica.uniovi.es/schedule/pendingEdits", {
        method: 'GET',
        credentials: 'include',
        headers: { 'Accept': 'application/json' },
      });

      const data = await res.json();

      const parsed = data.map(item => {
        const fecha = `${item.year}-${String(item.mes).padStart(2, '0')}-${String(item.dia).padStart(2, '0')}`;
        return {
          id: item.id,
          subject: item.subject || "Asignatura",
          nombre: item.tipo,
          aula: item.aula?.trim() || '',
          fecha,
          horaInicio: item.hora_inicio,
          horaFinal: item.hora_final,
          approved: item.aproved === true,
          proposed: item.changes || {},
          action: item.changes?.action || 'modificación',
        };
      });

      setPendingSubjects(parsed.filter(s => !s.approved));
    } catch (err) {
      console.error("Error al cargar asignaturas pendientes:", err);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`https://horariospceo.ingenieriainformatica.uniovi.es/schedule/approve/${id}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) throw new Error("Error al aprobar la asignatura");
      setPendingSubjects(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(`https://horariospceo.ingenieriainformatica.uniovi.es/schedule/reject/${id}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) throw new Error("Error al rechazar la asignatura");
      setPendingSubjects(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const formatFecha = (isoDate) => {
    const [yyyy, mm, dd] = isoDate.split("-");
    return `${dd}-${mm}-${yyyy}`;
  };

  const labels = {
    aula: "Aula",
    horaInicio: "Hora de inicio",
    horaFinal: "Hora de fin",
    dia: "Día",
    mes: "Mes",
    year: "Año",
    tipo: "Tipo",
  };

  return (
    <section>
      <HeaderNav title="Asignaturas Pendientes de Aprobación" />
      <section className="w-[90%] mt-10 px-8 py-5 mx-auto border rounded-xl bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-4">Clases propuestas pendientes</h2>

        {pendingSubjects.length === 0 ? (
          <p className="text-gray-500">No hay clases pendientes de confirmación.</p>
        ) : (
          <div className="divide-y">
            {pendingSubjects.map(subject => (
              <div key={subject.id} className="flex justify-between items-start py-4 gap-6">
                <div>
                  <p className="font-medium text-yellow-700">
                    {subject.subject} - {subject.nombre}
                  </p>

                  <p className="text-sm italic text-blue-500 mb-1">
                    Acción solicitada: {subject.action === "delete" ? "Eliminación" : "Modificación"}
                  </p>

                  <p className="text-sm text-gray-600">
                    {formatFecha(subject.fecha)} a las {subject.horaInicio} – {subject.horaFinal} | Aula: {subject.aula}
                  </p>

                  {subject.action !== "delete" && subject.proposed && (
                    <div className="mt-2 text-sm text-yellow-700 space-y-1">
                      {Object.entries(subject.proposed).map(([key, newValue]) => {
                        const original = subject[key];
                        if (newValue === undefined || newValue === original) return null;

                        return (
                          <p key={key}>
                            <strong>{labels[key] || key}:</strong>{" "}
                            <span className="line-through text-red-500">{original}</span>{" "}
                            <span className="text-green-600">→ {newValue}</span>
                          </p>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(subject.id)}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={() => handleReject(subject.id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
};
