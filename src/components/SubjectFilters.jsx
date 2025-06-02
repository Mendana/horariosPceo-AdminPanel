import '../styles/subjectList.css';
import { cursesPerGrade, usersPerGrade } from '../utils/curses';

export function SubjectFilters({
  nameFilter,
  setNameFilter,
  dateFilter,
  setDateFilter,
  uoFilter,
  setUoFilter,
  degreeFilter,
  setDegreeFilter,
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
        placeholder="Buscar por UO"
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
          value={degreeFilter}
          onChange={(e) => {
            setDegreeFilter(e.target.value);
            setYearFilter(''); // Reset del año cuando cambia el grado
          }}
        >
          <option value="">Elige grado</option>
          {Object.keys(cursesPerGrade).map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      )}

      {!isEstudiante && degreeFilter && (
        <select
          className="input date-filter"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        >
          <option value="">Elige curso</option>
          {cursesPerGrade[degreeFilter]?.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
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
