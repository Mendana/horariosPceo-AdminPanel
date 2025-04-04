export function UserItem({ user, onEdit, onDelete }) {
  return (
    <div className="flex justify-between items-center py-3">
      <div>
        <p className="font-medium">{user.email}</p>
        <p className="text-sm text-gray-600">
          {user.email}  |  Rol: {user.role === 'professor' ? 'editor' : user.role}
        </p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <button
          onClick={() => onDelete(user.email)}
          className="text-red-500 hover:underline text-sm cursor-pointer"
        >
          Eliminar
        </button>
        <p>|</p>
        <button
          onClick={() => onEdit(user)}
          className="text-blue-600 hover:underline text-sm cursor-pointer"
        >
          Editar
        </button>
      </div>
    </div>
  );
}
