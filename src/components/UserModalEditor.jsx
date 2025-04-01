import { useState } from 'react';
import '../styles/subjectModal.css';
import { X } from 'lucide-react';

export function UserModalEditor({ user, onClose, onSave }) {
  const [edited, setEdited] = useState({ ...user });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEdited(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setError('');

    try {
      const res = await fetch(`https://horariospceo.ingenieriainformatica.uniovi.es/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Para que se envíen cookies HttpOnly
        body: JSON.stringify(edited),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error al guardar cambios');
      }

      onSave(data); // Actualiza el estado global
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-40 pointer-events-none backdrop-blur-xs bg-black/30">
      <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 w-full max-w-md z-50 pointer-events-auto">
        <div className="bg-white p-6 rounded-xl shadow-2xl border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Editar usuario</h2>
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
              name="name"
              value={edited.name}
              onChange={handleChange}
              className="input-field"
              placeholder="Nombre"
            />
            <input
              name="email"
              type="email"
              value={edited.email}
              onChange={handleChange}
              className="input-field"
              placeholder="Correo electrónico"
            />
            <input
              name="password"
              type="password"
              value={edited.password || ''}
              onChange={handleChange}
              className="input-field"
              placeholder="Contraseña"
            />
            <select
              name="role"
              value={edited.role}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Seleccionar rol</option>
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
              <option value="guest">Invitado</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button onClick={onClose} className="cancel-button bg-gray-200">
              Cancelar
            </button>
            <button onClick={handleSave} className="submit-button bg-blue-500 text-white">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
