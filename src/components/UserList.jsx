import { useState, useEffect } from 'react';
import { UserFilters } from './UserFilters';
import { UserItem } from './UserItem';
import { Pagination } from './Pagination';
import { UserModalEditor } from './UserModalEditor';


const ITEMS_PER_PAGE = 10;

export function UserList() {
  const [users, setUsers] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editUser, setEditUser] = useState(null);

  const filteredUsers = users.filter(u =>
    (!nameFilter || u.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
    (!emailFilter || u.email.toLowerCase().includes(emailFilter.toLowerCase())) &&
    (!roleFilter || u.role === roleFilter)
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleSave = (updatedUser) => {
    setUsers(prev =>
      prev.map(u => u.id === updatedUser.id ? updatedUser : u)
    );
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/users`); // Ajusta esta URL a tu backend real
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
      }
    };

    fetchUsers();
  }, []);


  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan@example.com',
        password: '123456',
        role: 'admin',
      },
      {
        id: 2,
        name: 'María Gómez',
        email: 'maria@example.com',
        password: 'password',
        role: 'user',
      },
      {
        id: 3,
        name: 'Luis Rodríguez',
        email: 'luis@example.com',
        password: 'abcdef',
        role: 'guest',
      },
      {
        id: 4,
        name: 'Ana Torres',
        email: 'ana@example.com',
        password: 'ana1234',
        role: 'user',
      },
      {
        id: 5,
        name: 'Carlos Díaz',
        email: 'carlos@example.com',
        password: 'carlospass',
        role: 'admin',
      },
    ];
  
    setUsers(mockUsers);
  }, []);
  
  return (
    <section className="w-[90%] mt-10 px-8 py-5 border rounded-xl bg-white shadow-md">
      <h2 className='text-xl font-semibold mb-4'>Usuarios registrados</h2>

      <UserFilters
        nameFilter={nameFilter}
        setNameFilter={(v) => { setNameFilter(v); setCurrentPage(1); }}
        emailFilter={emailFilter}
        setEmailFilter={(v) => { setEmailFilter(v); setCurrentPage(1); }}
        roleFilter={roleFilter}
        setRoleFilter={(v) => { setRoleFilter(v); setCurrentPage(1); }}
      />

      <div className="border-t divide-y">
        {currentUsers.length === 0 ? (
          <p className="text-gray-500 pt-4">No se encontraron usuarios con estos filtros. Pruebe con otros.</p>
        ) : (
          currentUsers.map(user => (
            <UserItem key={user.id} user={user} onEdit={handleEdit} />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}

      {editUser && (
        <UserModalEditor
          user={editUser}
          onClose={() => setEditUser(null)}
          onSave={handleSave}
        />
      )}
    </section>
  );
}
