import { useState, useEffect } from "react";
import { HeaderNav } from "../components/HeaderNav.jsx";


const mockData = [
    {
        id: 1,
        nombre: "Matemáticas",
        aula: "A101",
        curso: "1",
        fecha: "2025-04-15",
        horaInicio: "10:00",
        horaFinal: "12:00",
        approved: false,
        proposed: {
            aula: "B202",
            horaInicio: "09:00",
            horaFinal: "11:00",
        },
    },
    {
        id: 3,
        nombre: "Química",
        aula: "C303",
        curso: "3",
        fecha: "2025-04-17",
        horaInicio: "11:30",
        horaFinal: "13:30",
        approved: false,
        proposed: {
            aula: "C304",
        },
    },
];



export const PendingApprovals = () => {
    const [pendingSubjects, setPendingSubjects] = useState([]);


    const fetchPending = async () => {
        const res = await new Promise(resolve => {
            setTimeout(() => resolve(mockData), 300); // simula retardo
        });

        const filtered = res.filter(s => !s.approved);
        setPendingSubjects(filtered);
    };


    //   const fetchPending = async () => {
    //     try {
    //       const res = await fetch("https://horariospceo.ingenieriainformatica.uniovi.es/schedule/all");
    //       const data = await res.json();

    //       const parsed = data.subjects.map(item => {
    //         const fecha = `${item.day.year}-${String(item.day.mes).padStart(2, '0')}-${String(item.day.dia).padStart(2, '0')}`;

    //         return {
    //           id: item.s_id,
    //           nombre: item.subject_name,
    //           aula: item.clase.trim(),
    //           curso: `${item.subject_year}`,
    //           fecha,
    //           horaInicio: item.hora_inicio,
    //           horaFinal: item.hora_final,
    //           approved: item.approved ?? true,
    //         };
    //       });

    //       setPendingSubjects(parsed.filter(s => !s.approved));
    //     } catch (err) {
    //       console.error("Error al cargar asignaturas pendientes:", err);
    //     }
    //   };

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
                            <div key={subject.id} className="flex justify-between items-center py-3">
                                <div>
                                    <p className="font-medium text-yellow-700">{subject.nombre}</p>
                                    <p className="text-sm text-gray-600">
                                        {formatFecha(subject.fecha)} a las {subject.horaInicio} – {subject.horaFinal} | Aula: {subject.aula}
                                    </p>

                                    {subject.proposed && (
                                        <div className="mt-2 text-sm text-yellow-700 space-y-1">
                                            {Object.entries(subject.proposed).map(([key, newValue]) => {
                                                const original = subject[key];
                                                if (!original || original === newValue) return null;

                                                const labels = {
                                                    aula: "Aula",
                                                    horaInicio: "Hora de inicio",
                                                    horaFinal: "Hora de fin",
                                                };

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
