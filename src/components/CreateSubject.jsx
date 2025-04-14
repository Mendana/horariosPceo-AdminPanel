import { useEffect, useState } from 'react';
import '../styles/createSubject.css';
import { TimePicker } from './TimePicker.jsx';
import { DurationPicker } from './DurationPicker.jsx';
import toast from 'react-hot-toast';

const asignaturasMatematicas = [
  "AF", "AI", "AII", "ALG", "AMatI", "AMatII", "AMatIII", "ANM",
  "CDI", "EDI", "EDII", "EstyProb", "GCS", "IAMat", "IE", "MDFEDP",
  "MNumer", "MOR", "ProgM", "PyE", "RNEDO", "TopI", "TopII", "VC"
];


export function CreateSubject({ onCreated }) {
  const [subjectsData, setSubjectsData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('');
  const [aula, setAula] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [horaInicio, setHoraInicio] = useState('09:00');
  const [duracion, setDuracion] = useState('01:00');
  const [error, setError] = useState('');


  const getSubjectLabel = (subject) =>
    asignaturasMatematicas.includes(subject)
      ? `${subject} - Matemáticas`
      : `${subject} - Informática`;
  

  const calcularHoraFinal = () => {
    const [h, m] = horaInicio.split(':').map(Number);
    const [dh, dm] = duracion.split(':').map(Number);
    const total = h * 60 + m + dh * 60 + dm;
    const finalHour = String(Math.floor(total / 60)).padStart(2, '0');
    const finalMin = String(total % 60).padStart(2, '0');
    return `${finalHour}:${finalMin}`;
  };

  const dayParser = () => {
    const [year, month, day] = fecha.split('-');
    return { year, mes: month, dia: day };
  };

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const res = await fetch('https://horariospceo.ingenieriainformatica.uniovi.es/schedule/tipos', {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          credentials: 'include',
        });
        const data = await res.json();
        setSubjectsData(data.tipos || []);
      } catch (err) {
        toast.error("Error al cargar los tipos de asignaturas");
      }
    };

    fetchTipos();
  }, []);

  // Extraer valores únicos para los selects
  const uniqueSubjects = [...new Set(subjectsData.map(s => s.subject))].sort();
  const tiposForSubject = subjectsData
    .filter(s => s.subject === selectedSubject)
    .map(s => s.tipo)
    .sort();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedSubject || !selectedTipo) {
      setError('Debes seleccionar asignatura y tipo.');
      return;
    }

    const horaFinal = calcularHoraFinal();
    const { year, mes, dia } = dayParser();

    const subjectData = {
      subjectNombre: selectedSubject,
      tipo: selectedTipo,
      aula: aula,
      year: year,
      mes: mes,
      dia: dia,
      hora_inicio: horaInicio,
      hora_final: horaFinal,
      aproved: false,
    };
    try {
      const res = await fetch('https://horariospceo.ingenieriainformatica.uniovi.es/schedule/createSubject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(subjectData),
      });

      let data = {};
      try {
        data = await res.json();
      } catch { }

      if (!res.ok) {
        throw new Error(data.message || 'No se pudo crear la asignatura');
      }

      // Limpiar
      setSelectedSubject('');
      setSelectedTipo('');
      setAula('');
      setFecha(new Date().toISOString().split('T')[0]);
      setHoraInicio('09:00');
      setDuracion('01:00');

      if (onCreated) onCreated();
      toast.success("Asignatura creada correctamente");
    } catch (err) {
      toast.error("Error al crear la asignatura");
      setError(err.message);
    }
  };

  return (
    <section className="main-create-subject w-[90%] flex flex-col gap-4 px-8 py-5">
      <h1 className='text-2xl font-semibold'>Añadir clases/exámenes</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit}>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex flex-col flex-1'>
            <label className="text-sm font-medium mb-3">Asignatura:</label>
            <select
              className="input name-filter w-[75%]"
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedTipo(''); // reset tipo al cambiar subject
              }}
            >
              <option value="">Selecciona asignatura</option>
              {uniqueSubjects.map((s) => (
                <option key={s} value={s}>{getSubjectLabel(s)}</option>
              ))}
            </select>
          </div>

          <div className='flex flex-col flex-1'>
            <label className="text-sm font-medium mb-3">Tipo:</label>
            <select
              className="input name-filter w-[75%]"
              value={selectedTipo}
              onChange={(e) => setSelectedTipo(e.target.value)}
              disabled={!selectedSubject}
            >
              <option value="">Selecciona tipo</option>
              {["Examen", "Otros", ...tiposForSubject].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className='flex flex-col flex-1'>
            <label className="text-sm font-medium mb-3">Aula:</label>
            <input
              type="text"
              className="input name-filter w-[75%]"
              placeholder="Ej: A-2-01"
              value={aula}
              onChange={(e) => setAula(e.target.value)}
            />
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-4 pt-4'>
          <div className='flex flex-col flex-1'>
            <label className="text-sm font-medium mb-3">Fecha:</label>
            <input
              type="date"
              className="input name-filter w-[75%]"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>

          <div className='flex flex-col flex-1'>
            <label className="text-sm font-medium mb-3">Hora de inicio:</label>
            <TimePicker value={horaInicio} onChange={setHoraInicio} />
          </div>

          <div className='flex flex-col flex-1'>
            <label className="text-sm font-medium mb-3">Duración:</label>
            <DurationPicker value={duracion} onChange={setDuracion} />
          </div>
        </div>

        <section className='flex flex-row justify-end items-center pt-5'>
          <button type="submit" className='submit-button'>Añadir</button>
        </section>
      </form>
    </section>
  );
}
