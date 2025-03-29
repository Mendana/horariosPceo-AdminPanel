import { useState } from 'react';
import '../styles/subjectModal.css';
import { X } from 'lucide-react'
import { TimePicker } from './TimePicker';
import { DurationPicker } from './DurationPicker';

export function ModalEditor({ subject, onClose, onSave }) {
    const [edited, setEdited] = useState({ ...subject });

    const handleChange = (e) => {
      setEdited(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const handleSave = () => {
      onSave(edited);
      onClose();
    };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-40 pointer-events-none backdrop-blur-xs bg-black/30">
      {/* Modal container */}
      <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 w-full max-w-md z-50 pointer-events-auto">
        <div className="bg-white p-6 rounded-xl shadow-2xl border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Editar asignatura</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-black text-xl font-bold"><X size={30}/></button>
          </div>

          <div className="flex flex-col gap-3">
            <input
              name="nombre"
              value={edited.nombre}
              onChange={handleChange}
              className="input-field"
              placeholder="Nombre"
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
            <div className="flex justify-center gap-5">
              <div className='flex flex-row gap-2 items-center'>
                <label className="text-gray-700">Hora Inicio:</label>
                <TimePicker/>
              </div>
              <div className='flex flex-row gap-2 items-center'>
                <label className="text-gray-700">Duración:</label>
                <DurationPicker />
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
