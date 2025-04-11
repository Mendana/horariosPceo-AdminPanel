import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { SubjectFilters } from './SubjectFilters';
import { SubjectItem } from './SubjectItem';
import { Pagination } from './Pagination';
import { ModalEditor } from './ModalEditor';


const ITEMS_PER_PAGE = 10;

export const SubjectList = forwardRef((props, ref) => {

  const getUserUO = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return '';
    return user.email.split('@')[0].toLowerCase(); // UO o nombre de perfil
  };

  const [subjects, setSubjects] = useState([]);
  const [uoFilter, setUoFilter] = useState(getUserUO()); // por defecto, el del usuario
  const [yearFilter, setYearFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editSubject, setEditSubject] = useState(null);

  const filteredSubjects = subjects.filter(s =>
    (!nameFilter || s.nombre.toLowerCase().includes(nameFilter.toLowerCase())) &&
    (!dateFilter || s.fecha.includes(dateFilter)) &&
    (!uoFilter || s.owner.toLowerCase().includes(uoFilter.toLowerCase())) &&
    (!/^uo\d{4,6}$/.test(uoFilter) || true) && // si es UO, ignora el año
    (!/^curso/i.test(uoFilter) && (!yearFilter || s.curso === yearFilter)) // si es cursoXX, filtra por año
  );


  const totalPages = Math.ceil(filteredSubjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSubjects = filteredSubjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (subject) => {
    setEditSubject(subject);
  };

  const handleSave = (updatedSubject) => {
    setSubjects(prev =>
      prev.map(s => s.id === updatedSubject.id ? updatedSubject : s)
    );
  };

  const fetchSubjects = async () => {
    try {
      const res = await fetch(`https://horariospceo.ingenieriainformatica.uniovi.es/schedule/year/${yearFilter}`);
      const data = await res.json();

      const parsedSubjects = data.subjects.map(item => {
        const fecha = `${item.day.year}-${String(item.day.mes).padStart(2, '0')}-${String(item.day.dia).padStart(2, '0')}`;

        return {
          id: item.s_id,
          nombre: item.subject_name,
          aula: item.clase.trim(),
          curso: `${item.subject_year}`,
          fecha,
          horaInicio: item.hora_inicio,
          horaFinal: item.hora_final,
          approved: item.approved ?? true, // ✅ por defecto aprobado si no viene
        };
      });

      setSubjects(parsedSubjects);
    } catch (err) {
      console.error("Error al cargar horarios:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://horariospceo.ingenieriainformatica.uniovi.es/schedule/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'No se pudo eliminar la asignatura');
      }

      // Elimina del estado local
      setSubjects(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [yearFilter]);

  useImperativeHandle(ref, () => ({
    reload: fetchSubjects,
  }));

  return (
    <section className="w-[90%] mt-10 px-8 py-5 border rounded-xl bg-white shadow-md">
      <h2 className='text-xl font-semibold mb-4'>Clases programadas</h2>

      <SubjectFilters
        nameFilter={nameFilter}
        setNameFilter={(v) => { setNameFilter(v); setCurrentPage(1); }}
        dateFilter={dateFilter}
        setDateFilter={(v) => { setDateFilter(v); setCurrentPage(1); }}
        uoFilter={uoFilter}
        setUoFilter={(v) => { setUoFilter(v); setCurrentPage(1); }}
        yearFilter={yearFilter}
        setYearFilter={(v) => { setYearFilter(v); setCurrentPage(1); }}
        userEmail={getUserUO()}
      />

      <div className="border-t divide-y">
        {currentSubjects.length === 0 ? (
          <p className="text-gray-500 pt-4">No se encontraron clases para estos filtros. Pruebe con otros.</p>
        ) : (
          currentSubjects.map(subject => (
            <SubjectItem key={subject.id}
              subject={subject}
              onEdit={handleEdit}
              onDelete={handleDelete} />
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

      {editSubject && (
        <ModalEditor
          subject={editSubject}
          onClose={() => setEditSubject(null)}
          onSave={handleSave}
        />
      )}
    </section>
  );
});