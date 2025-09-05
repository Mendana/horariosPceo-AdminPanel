import { useAuth } from '../AuthContext';
import { toast } from 'react-hot-toast';
import { Copy, Pencil, Trash2 } from 'lucide-react';

export function UserItem({ user, onEdit, onDelete, isAdmin }) {
  const { user: currentUser } = useAuth();
  const isCurrentUserAdmin = currentUser?.role === 'admin';

  const handleCopySchedule = async () => {
    try {
      const res = await fetch(`https://horariospceo.ingenieriainformatica.uniovi.es/schedule/copiar?email1=${user.email}&email2=${currentUser.email.split('@')[0]}`, {
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
        <p className="text-gray-800 font-semibold md:text-xl">{user.email}</p>
        <p className="text-sm text-gray-500">{user.role}</p>
      </div>

      <div className="flex gap-2">
        {/* Botón de copiar siempre visible */}
        <button
          onClick={handleCopySchedule}
          className="p-1 md:p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors cursor-pointer"
          title="Copiar horario"
        >
          <Copy size={20} />
        </button>

        {/* Botones de admin solo si isAdmin es true */}
        {isAdmin && (
          <>
            <button
              onClick={() => onEdit(user)}
              className="p-1 md:p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors cursor-pointer"
              title="Editar usuario"
            >
              <Pencil size={20} />
            </button>

            <button
              onClick={() => onDelete(user.email)}
              className="p-1 md:p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
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
