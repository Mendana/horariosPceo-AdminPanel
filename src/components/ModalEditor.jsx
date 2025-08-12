import { useState } from 'react';
import '../styles/subjectModal.css';
import { X } from 'lucide-react';
import { TimePicker } from './TimePicker';
import { DurationPicker } from './DurationPicker';
import { toast } from 'react-hot-toast';

export function ModalEditor({ subject, onClose, onSave }) {
  const [error, setError] = useState('');
  const calcularDuracion = (horaInicio, horaFinal) => {
    const [h1, m1] = horaInicio.split(':').map(Number);
    const [h2, m2] = horaFinal.split(':').map(Number);
  
    let minutosTotales = (h2 * 60 + m2) - (h1 * 60 + m1);
    if (minutosTotales < 0) minutosTotales += 24 * 60;
  
    const horas = String(Math.floor(minutosTotales / 60)).padStart(2, '0');
    const minutos = String(minutosTotales % 60).padStart(2, '0');
    return `${horas}:${minutos}`;
  };
  
  const [duracion, setDuracion] = useState(
    calcularDuracion(subject.horaInicio, subject.horaFinal)
  );
  
  const normalizeFecha = (fechaStr) => {
    if (!fechaStr) return '';
    
    // Ya en formato yyyy-mm-dd
    if (/^\d{4}-\d{2}-\d{2}$/.test(fechaStr)) return fechaStr;
  
    // En formato dd-mm-yyyy o d-m-yyyy
    const [dd, mm, yyyy] = fechaStr.split('-');
    return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
  };
    
  const [edited, setEdited] = useState({
    ...subject,
    fecha: normalizeFecha(subject.fecha),
  });

  
  const handleChange = (e) => {
    setEdited(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setError('');
  
    const dayParser = () => {
      const [year, month, day] = edited.fecha.split('-');
      return { year, mes: month, dia: day };
    };
  
    const day_parsed = dayParser();
  
    const editedSubject = JSON.stringify({
      aula: edited.aula,
      year: day_parsed.year,
      mes: day_parsed.mes,
      dia: day_parsed.dia,
      hora_inicio: edited.horaInicio,
      hora_final: edited.horaFinal,
    });
    try {
      const res = await fetch(`https://horariospceo.ingenieriainformatica.uniovi.es/schedule/patchSubject/${subject.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: editedSubject,
      });

      const data = await res.json().catch(() => ({}));
  
      if (!res.ok) {
        throw new Error(data.message || 'No se pudo actualizar la asignatura');
      }
  
      toast.success('Asignatura actualizada correctamente');
      onSave(); // solo necesitamos que SubjectList haga un fetch
      onClose();
  
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };
 

  const handleTimeChange = (value) => {
    const [h, m] = value.split(':').map(Number);
    const [dh, dm] = duracion.split(':').map(Number);
  
    const totalMinutes = h * 60 + m + dh * 60 + dm;
    const finalHour = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
    const finalMinutes = String(totalMinutes % 60).padStart(2, '0');
  
    setEdited(prev => ({
      ...prev,
      horaInicio: value,
      horaFinal: `${finalHour}:${finalMinutes}`
    }));
  };

  const handleDurationChange = (duration) => {
    setDuracion(duration);
  
    const [h, m] = edited.horaInicio.split(':').map(Number);
    const [dh, dm] = duration.split(':').map(Number);
  
    const totalMinutes = h * 60 + m + dh * 60 + dm;
    const finalHour = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
    const finalMinutes = String(totalMinutes % 60).padStart(2, '0');
  
    setEdited(prev => ({ ...prev, horaFinal: `${finalHour}:${finalMinutes}` }));
  };


  return (
    <div className="fixed top-0 left-0 w-full h-full z-40 pointer-events-none backdrop-blur-xs bg-black/30">
      <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 w-[80%] max-w-md sm:max-w-[80%] z-50 pointer-events-auto">
        <div className="bg-white p-6 rounded-xl shadow-2xl border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold">Editar asignatura</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-black text-xl font-bold">
              <X size={30} />
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-3">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-3">
            <input
              name="nombre"
              value={edited.nombre}
              onChange={handleChange}
              className="input-field"
              placeholder="Nombre"
              disabled
            />
            <input
              name="aula"
              value={edited.aula}
              onChange={handleChange}
              className="input-field"
              placeholder="Aula"
            />
            <input
              name="fecha"
              type="date"
              value={edited.fecha}
              onChange={handleChange}
              className="input-field"
            />
            <div className="flex flex-col items-center sm:flex-row justify-center gap-5">
              <div className='flex flex-row gap-2 items-center'>
                <label className="text-gray-700">Hora Inicio:</label>
                <TimePicker value={edited.horaInicio} onChange={handleTimeChange} />
              </div>
              <div className='flex flex-row gap-2 items-center'>
                <label className="text-gray-700">Duración:</label>
                <DurationPicker value={duracion} onChange={handleDurationChange} />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button onClick={onClose} className="cancel-button bg-gray-200">Cancelar</button>
            <button onClick={handleSave} className="submit-button bg-blue-500 text-white">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
