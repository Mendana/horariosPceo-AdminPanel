import '../styles/subjectList.css'
import { CoursePicker } from './CoursePicker.jsx';

export function SubjectFilters({ nameFilter, setNameFilter, dateFilter, setDateFilter, courseFilter, setCourseFilter }) {
  return (
    <div className="flex flex-row justify-between mb-4">
      <input
        type="text"
        placeholder="Buscar por nombre"
        className="input name-filter"
        value={nameFilter}
        onChange={(e) => {
          setNameFilter(e.target.value);
        }}
      />
      <input
        type="date"
        className="input date-filter"
        value={dateFilter}
        onChange={(e) => {
          setDateFilter(e.target.value);
        }}
      />
      <CoursePicker
        value={courseFilter}
        onChange={(newValue) => {
          setCourseFilter(newValue); // 👈 correcto
        }}
      />
      <button
        className="btn clear-filters"
        onClick={() => {
          setNameFilter('');
          setDateFilter('');
          setCourseFilter('');
        }}
      >
        Limpiar filtros
      </button>
    </div>
  );
}
