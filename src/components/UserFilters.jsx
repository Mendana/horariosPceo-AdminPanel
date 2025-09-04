import '../styles/subjectList.css';

export function UserFilters({ emailFilter, setEmailFilter, roleFilter, setRoleFilter }) {
  return (
    <div className="flex flex-col md:flex-row justify-between mb-4 gap-4 md:max-h-10 lg:max-h-15">
      <input
        type="text"
        placeholder="Buscar por correo"
        className="input name-filter"
        value={emailFilter}
        onChange={(e) => setEmailFilter(e.target.value)}
      />
      <select
        className="input name-filter"
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
      >
        <option value="">Todos los roles</option>
        <option value="admin">Administrador</option>
        <option value="user">Usuario</option>
        <option value="professor">Profesor</option>
      </select>
      <button
        className="btn clear-filters"
        onClick={() => {
          setNameFilter('');
          setEmailFilter('');
          setRoleFilter('');
        }}
      >
        Limpiar filtros
      </button>
    </div>
  );
}
