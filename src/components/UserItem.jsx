import { useAuth } from '../AuthContext';
import { toast } from 'react-hot-toast';
import { Copy, Pencil, Trash2 } from 'lucide-react';

export function UserItem({ user, onEdit, onDelete }) {
  const { user: currentUser } = useAuth();
  const isAdmin = currentUser?.role === 'admin';

  const handleCopySchedule = async () => {
    try {
      const res = await fetch(`https://horariospceo.ingenieriainformatica.uniovi.es/schedule/copy/${user.email}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Error al copiar el horario');
      }

      toast.success('Horario copiado correctamente');
    } catch (err) {
      toast.error('Error al copiar el horario');
    }
  };

  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <p className="text-gray-800">{user.email}</p>
        <p className="text-sm text-gray-500">{user.role}</p>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={handleCopySchedule}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          title="Copiar horario"
        >
          <Copy size={20} />
        </button>

        {isAdmin && (
          <>
            <button
              onClick={() => onEdit(user)}
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
              title="Editar usuario"
            >
              <Pencil size={20} />
            </button>
            
            <button
              onClick={() => onDelete(user.email)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Eliminar usuario"
            >
              <Trash2 size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
