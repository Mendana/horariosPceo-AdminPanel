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
  const [uoFilter, setUoFilter] = useState(getUserUO());
  const [yearFilter, setYearFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editSubject, setEditSubject] = useState(null);
  const [debouncedUO, setDebouncedUO] = useState(uoFilter);

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const fetchSubjects = async () => {
    try {
      const uoFinal = yearFilter
        ? `curso${capitalize(yearFilter)}`
        : debouncedUO;
  
      const baseUrl = `https://horariospceo.ingenieriainformatica.uniovi.es/schedule/userSchedule/${encodeURIComponent(uoFinal)}`;
  
      const res = await fetch(baseUrl, {
        method: 'GET',
        credentials: 'include',
      });
  
      if (!res.ok) {
        setSubjects([]); // ❌ Limpia si error HTTP
        throw new Error("No se pudieron cargar las asignaturas");
      }
  
      const data = await res.json();
  
      if (!data || data.length === 0) {
        setSubjects([]); // ❌ Limpia si no hay asignaturas
        return;
      }
  
      const parsedSubjects = data.map(item => {
        const fecha = `${item.clase_year}-${String(item.clase_mes).padStart(2, '0')}-${String(item.clase_dia).padStart(2, '0')}`;
  
        return {
          id: item.clase_id,
          nombre: `${item.clase_subjectNombre} - ${item.clase_tipo}`,
          aula: item.clase_aula.trim(),
          fecha,
          horaInicio: item.clase_hora_inicio,
          horaFinal: item.clase_hora_final,
          approved: item.clase_aproved ?? 1,
        };
      });
  
      setSubjects(parsedSubjects);
    } catch (err) {
      //console.error("Error al cargar horarios:", err);
      setSubjects([]); // ❌ Limpia también en errores de red/parsing
    }
  };
  

  const filteredSubjects = subjects.filter(s =>
    (!nameFilter || s.nombre.toLowerCase().includes(nameFilter.toLowerCase())) &&
    (!dateFilter || s.fecha.includes(dateFilter))
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

      await fetchSubjects(); // Refresca la lista después de eliminar
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [debouncedUO, yearFilter]);

  useImperativeHandle(ref, () => ({
    reload: fetchSubjects,
  }));

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedUO(uoFilter);
    }, 500); // Espera 500ms después de la última tecla
  
    return () => clearTimeout(delay); // Limpia el timeout anterior si se vuelve a escribir
  }, [uoFilter]);

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
        setYearFilter={(v) => {
          const curso = v
            ? `curso${v.charAt(0).toUpperCase()}${v.slice(1).toLowerCase()}`
            : getUserUO();
        
          setYearFilter(v);
          setUoFilter(curso);
          setCurrentPage(1);
        
          // 🚀 Forzar fetch justo después
          setTimeout(fetchSubjects, 0);
        }}
        userEmail={getUserUO()}
      />

      <div className="border-t divide-y">
        {currentSubjects.length === 0 ? (
          <p className="text-gray-500 pt-4">No se encontraron clases para estos filtros. Pruebe con otros.</p>
        ) : (
          currentSubjects.map(subject => (
            <SubjectItem
              key={subject.id}
              subject={subject}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
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
