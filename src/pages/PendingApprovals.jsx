import { useState, useEffect } from "react";
import { HeaderNav } from "../components/HeaderNav.jsx";
import { toast } from "react-hot-toast";

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
        const isCreate = item.action === "create";
        const isDelete = item.action === "delete";

        // Función auxiliar para formatear fecha
        const formatearFecha = (year, mes, dia) => {
          if (!year || !mes || !dia) return null;
          return `${year}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        };

        return {
          id_jaja: item.jaja,
          action: item.action,
          subject: isCreate 
            ? item.new_subject?.nombre 
            : item.old_subject?.nombre ?? "Asignatura",
          nombre: isCreate
            ? item.new_tipo
            : item.old_tipo ?? "Tipo",
          // Valores iniciales (old)
          aula_i: item.old_aula?.trim() ?? null,
          fecha_i: formatearFecha(item.old_year, item.old_mes, item.old_dia),
          horaInicio_i: item.old_hora_inicio ?? null,
          horaFinal_i: item.old_hora_final ?? null,
          // Valores finales (new)
          aula_f: item.new_aula?.trim() ?? null,
          fecha_f: formatearFecha(item.new_year, item.new_mes, item.new_dia),
          horaInicio_f: item.new_hora_inicio ?? null,
          horaFinal_f: item.new_hora_final ?? null,
          // Otros datos
          approved: item.aproved === true,
          modifier: item.usuario_que_modifica,
        };
      });
      setPendingSubjects(parsed.filter(s => !s.approved));
    } catch (err) {
      toast.error("Error al cargar las asignaturas pendientes");
    }
  };

  const handleApprove = async (id_jaja) => {
    try {
      const res = await fetch(`https://horariospceo.ingenieriainformatica.uniovi.es/schedule/approve/${id_jaja}`, {
        method: 'PATCH',
        credentials: 'include',
      });

      if (!res.ok) throw new Error("Error al aprobar la asignatura");
      toast.success("Asignatura aprobada correctamente");
      await fetchPending();
    } catch (err) {
      toast.error("Error al aprobar la modificación de la asignatura");
      await fetchPending();
    }
  };

  const handleReject = async (id_jaja) => {
    try {
      const res = await fetch(`https://horariospceo.ingenieriainformatica.uniovi.es/schedule/reject/${id_jaja}`, {
        method: 'PATCH',
        credentials: 'include',
      });

      if (!res.ok) throw new Error("Error al rechazar la asignatura");
      toast.success("Asignatura rechazada correctamente");
      await fetchPending();
    } catch (err) {
      toast.error("Error al rechazar la modificación de la asignatura");
      await fetchPending();
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
              <div key={subject.id_jaja} className="flex justify-between items-start py-4 gap-6">
                <div>
                  <p className="text-xl font-medium text-yellow-700">
                    {subject.subject} - {subject.nombre} | Propuesto por: {subject.modifier}
                  </p>

                  <p className="text-sm italic text-blue-500 mb-1">
                    Acción solicitada: { (subject.action === "create")? "Crear" : subject.action === "delete" ? "Eliminar" : "Modificar"}
                  </p>

                  {subject.action === "create" ? (
                    <p className="text-sm text-gray-600">
                      Nueva clase: {formatFecha(subject.fecha_f)} a las {subject.horaInicio_f} – {subject.horaFinal_f} | Aula: {subject.aula_f}
                    </p>
                  ) : subject.action === "delete" ? (
                    <p className="text-sm text-gray-600">
                      Eliminar clase: {formatFecha(subject.fecha_i)} a las {subject.horaInicio_i} – {subject.horaFinal_i} | Aula: {subject.aula_i}
                    </p>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600">
                        Original: {formatFecha(subject.fecha_i)} a las {subject.horaInicio_i} – {subject.horaFinal_i} | Aula: {subject.aula_i}
                      </p>
                      <p className="text-sm text-green-600">
                        Nuevo: {formatFecha(subject.fecha_f)} a las {subject.horaInicio_f} – {subject.horaFinal_f} | Aula: {subject.aula_f}
                      </p>
                    </>
                  )}
                  {/* Cambios propuestos (solo si difieren) */}
                  {subject.proposed && subject.action === "update" && (
                    <div className="mt-2 text-sm text-yellow-700 space-y-1">
                      {['aula', 'horaInicio', 'horaFinal', 'fecha'].map((key) => {
                        const original = subject[`${key}_i`];
                        const nuevo = subject[`${key}_f`];

                        if (!original || original === nuevo) return null;

                        return (
                          <p key={key}>
                            <strong>{labels[key] || key}:</strong>{" "}
                            <span className="line-through text-red-500">{original}</span>{" "}
                            <span className="text-green-600">→ {nuevo}</span>
                          </p>
                        );
                      })}

                    </div>
                  )}

                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(subject.id_jaja)}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 hover:cursor-pointer"
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={() => handleReject(subject.id_jaja)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 hover:cursor-pointer"
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
