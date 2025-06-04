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
    <div className="flex flex-col items-start mb-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4 w-full">
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
    </div>
      <div className="grid justify-end items-end w-full">
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
    </div>
  );
}
