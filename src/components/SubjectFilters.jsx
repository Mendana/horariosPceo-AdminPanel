import '../styles/subjectList.css';

export function SubjectFilters({
  nameFilter,
  setNameFilter,
  dateFilter,
  setDateFilter,
  uoFilter,
  setUoFilter,
  yearFilter,
  setYearFilter,
  userEmail, // pasa esto desde el componente padre
}) {
  const isEstudiante = /^uo\d{4,6}@uniovi\.es$/.test(userEmail);

  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
      <input
        type="text"
        placeholder="Buscar por nombre"
        className="input name-filter"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <input
        type="date"
        className="input date-filter"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
      />
      <input
        type="text"
        placeholder="UO o nombre de perfil"
        className="input name-filter"
        value={uoFilter}
        onChange={(e) => setUoFilter(e.target.value)}
      />
      {!isEstudiante && (
        <select
          className="input date-filter"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        >
          <option value="">Todos los cursos</option>
          <option value="1">Primero</option>
          <option value="2">Segundo</option>
          <option value="3">Tercero</option>
          <option value="4">Cuarto</option>
        </select>
      )}
      <button
        className="btn clear-filters"
        onClick={() => {
          setNameFilter('');
          setDateFilter('');
          setUoFilter(userEmail); // reinicia al actual
          setYearFilter('');
        }}
      >
        Limpiar filtros
      </button>
    </div>
  );
}
