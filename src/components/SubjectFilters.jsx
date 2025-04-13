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
  userEmail,
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
        onChange={(e) => {
          if (yearFilter) {
            setYearFilter(''); // ⬅️ Desactiva el filtro por curso automáticamente
          }
          setUoFilter(e.target.value);
        }}
      />
      {!isEstudiante && (
        <select
          className="input date-filter"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        >
          <option value="">Todos los cursos</option>
          <option value="Primero">Primero</option>
          <option value="Segundo">Segundo</option>
          <option value="Tercero">Tercero</option>
          <option value="Cuarto">Cuarto</option>
        </select>
      )}
      <button
        className="btn clear-filters"
        onClick={() => {
          setNameFilter('');
          setDateFilter('');
          setUoFilter(userEmail); // reinicia UO
          setYearFilter('');
        }}
      >
        Limpiar filtros
      </button>
    </div>
  );
}
