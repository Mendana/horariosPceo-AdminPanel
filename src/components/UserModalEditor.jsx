import { useState } from 'react';
import '../styles/subjectModal.css';
import { X } from 'lucide-react';
import { toast } from 'react-hot-toast';

export function UserModalEditor({ user, onClose, onSave }) {
  const [editedRole, setEditedRole] = useState(user.role);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setError('');

    if (editedRole === user.role) {
      onClose();
      return;
    }

    const roleEndpoints = {
      admin: 'make-admin',
      professor: 'make-professor',
      user: 'make-normal',
    };

    const endpoint = roleEndpoints[editedRole];

    if (!endpoint) {
      setError('Rol no válido');
      return;
    }

    try {
      const res = await fetch(`https://horariospceo.ingenieriainformatica.uniovi.es/users/${endpoint}/${user.email}`, {
        method: 'PATCH',
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error al cambiar el rol');
      }

      onSave({ ...user, role: editedRole });
      onClose();
      toast.success('Rol actualizado correctamente.');
    } catch (err) {
      toast.error('Error al actualizar el rol.');
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
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          <div className="flex flex-col gap-3">
            <input
              name="email"
              type="email"
              value={user.email}
              disabled
              className="input-field bg-gray-100 cursor-not-allowed"
              placeholder="Correo electrónico"
            />
            <select
              name="role"
              value={editedRole}
              onChange={(e) => setEditedRole(e.target.value)}
              className="input-field"
            >
              <option value="">Seleccionar rol</option>
              <option value="admin">Administrador</option>
              <option value="professor">Editor</option>
              <option value="user">Usuario</option>
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
