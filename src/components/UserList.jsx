import { useState, useEffect } from 'react';
import { UserFilters } from './UserFilters';
import { UserItem } from './UserItem';
import { Pagination } from './Pagination';
import { UserModalEditor } from './UserModalEditor';


const ITEMS_PER_PAGE = 10;

export function UserList() {
  const [users, setUsers] = useState([]);
  const [emailFilter, setEmailFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editUser, setEditUser] = useState(null);

  const filteredUsers = users.filter(u =>
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
      prev.map(u => u.email === updatedUser.email ? updatedUser : u)
    );
  };  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://horariospceo.ingenieriainformatica.uniovi.es/users', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          credentials: 'include',
        });
  
        if (!res.ok) {
          throw new Error('No se pudo obtener la lista de usuarios');
        }
        
        const data = await res.json();
        
        const parsedUsers = data.map(user => ({
          email: user.email,
          role: user.rol,
        }));

        setUsers(parsedUsers);
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
      }
    };
  
    fetchUsers();
  }, []);


  return (
    <section className="w-[90%] mt-10 px-8 py-5 border rounded-xl bg-white shadow-md">
      <h2 className='text-xl font-semibold mb-4'>Usuarios registrados</h2>

      <UserFilters
        emailFilter={emailFilter}
        setEmailFilter={(v) => { setEmailFilter(v); setCurrentPage(1); }}
        roleFilter={roleFilter}
        setRoleFilter={(v) => { setRoleFilter(v); setCurrentPage(1); }}
      />

      <div className="border-t divide-y">
        {currentUsers.length === 0 ? (
          <p className="text-gray-500 pt-4">No se encontraron usuarios con estos filtros o quizá no tiene permisos suficientes.</p>
        ) : (
          currentUsers.map(user => (
            <UserItem key={user.email} user={user} onEdit={handleEdit} />
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
