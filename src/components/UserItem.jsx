export function UserItem({ user, onEdit }) {
    return (
      <div className="flex justify-between items-center py-3">
        <div>
          <p className="font-medium">{user.email}</p>
          <p className="text-sm text-gray-600">
            {user.email}  |  Rol: {user.role}
          </p>
        </div>
        <button
          onClick={() => onEdit(user)}
          className="text-blue-600 hover:underline text-sm cursor-pointer"
        >
          Editar
        </button>
      </div>
    );
  }
  