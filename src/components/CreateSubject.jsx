import { useState } from 'react';
import '../styles/createSubject.css';
import { FormItem } from './FormItem.jsx';
import { TimePicker } from './TimePicker.jsx';
import { DurationPicker } from './DurationPicker.jsx';
import { CoursePicker } from './CoursePicker.jsx';

export function CreateSubject({ onCreated }) {
  const [nombre, setNombre] = useState('');
  const [aula, setAula] = useState('');
  const [curso, setCurso] = useState('1');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [horaInicio, setHoraInicio] = useState('09:00');
  const [duracion, setDuracion] = useState('01:00');
  const [error, setError] = useState('');

  const calcularHoraFinal = () => {
    const [h, m] = horaInicio.split(':').map(Number);
    const [dh, dm] = duracion.split(':').map(Number);
    const total = h * 60 + m + dh * 60 + dm;
    const finalHour = String(Math.floor(total / 60)).padStart(2, '0');
    const finalMin = String(total % 60).padStart(2, '0');
    return `${finalHour}:${finalMin}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    const horaFinal = calcularHoraFinal();
    const dayParser = () => {
      const date_parts = fecha.split('-');
      const year = date_parts[0];
      const month = date_parts[1];
      const day = date_parts[2];
      return {year, mes: month, dia: day};
    }

    const day_parsed = dayParser();

    const subject = JSON.stringify({
        subject_name: nombre,
        clase: aula,
        subject_year: curso,
        day: day_parsed,
        hora_inicio: horaInicio,
        hora_final: horaFinal,
      });

    try {
      const res = await fetch('https://horariospceo.ingenieriainformatica.uniovi.es/schedule/createSubject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ← Necesario si usas JWT en cookie HttpOnly
        body: subject,
      });
      

      let data = {};
      try {
        data = await res.json();
      } catch {
      }
      
      console.log(data);

      if (!res.ok) {
        throw new Error(data.message || 'No se pudo crear la asignatura');
      }
  
      // Limpieza del formulario tras éxito
      setNombre('');
      setAula('');
      setCurso('1');
      setFecha(new Date().toISOString().split('T')[0]);
      setHoraInicio('09:00');
      setDuracion('01:00');
  
      if (onCreated) onCreated(); // Refresca la lista si se pasó como prop
  
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="main-create-subject w-[90%] flex flex-col gap-4 px-8 py-5">
      <h1 className='text-2xl font-semibold'>Añadir clases/exámenes</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit}>
        <FormItem
          label='Nombre/código de la asignatura/examen:'
          placeholder='PyE-CE1 / BD.T.1 / Examen teórico BD'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <FormItem
          label='Clase/Aula:'
          placeholder='S01 / A-2-01 / Aula B'
          value={aula}
          onChange={(e) => setAula(e.target.value)}
        />
        <section className='flex flex-row gap-10 items-center pt-4'>
          <div className='flex flex-row gap-3 items-center pt-2'>
            <label className="text-sm font-medium">Curso: </label>
            <CoursePicker value={curso} onChange={(value) => setCurso(value)} />
          </div>
          <div className='flex flex-row gap-3 items-center pt-2'>
            <label className="text-sm font-medium">Fecha: </label>
            <input
              type="date"
              className="input date-filter"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <div className='flex flex-row gap-3 items-center pt-2'>
            <label className="text-sm font-medium">Hora Inicio: </label>
            <TimePicker value={horaInicio} onChange={setHoraInicio} />
          </div>
          <div className='flex flex-row gap-3 items-center pt-2'>
            <label className="text-sm font-medium">Duración: </label>
            <DurationPicker value={duracion} onChange={setDuracion} />
          </div>
        </section>
        <section className='flex flex-row justify-end items-center pt-5'>
          <button type="submit" className='submit-button'>Añadir</button>
        </section>
      </form>
    </section>
  );
}
