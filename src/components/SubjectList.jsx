import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { SubjectFilters } from './SubjectFilters';
import { SubjectItem } from './SubjectItem';
import { Pagination } from './Pagination';
import { ModalEditor } from './ModalEditor';
import { usersPerGrade } from '../utils/curses'; // Añade esta importación

const ITEMS_PER_PAGE = 10;

export const SubjectList = forwardRef((props, ref) => {

  const getUserUO = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return '';
    return user.email.split('@')[0].toLowerCase(); // UO o nombre de perfil
  };

  const [subjects, setSubjects] = useState([]);
  // Filtro para uos
  const [uoFilter, setUoFilter] = useState(getUserUO());

  // Filtro para grados y luego para los cursos de cada grado
  const [degreeFilter, setDegreeFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  //Filtros de búsqueda
  const [nameFilter, setNameFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editSubject, setEditSubject] = useState(null);
  const [debouncedUO, setDebouncedUO] = useState(uoFilter);

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const fetchSubjects = async () => {
    try {
      // Si hay grado y curso seleccionados, usa el valor del diccionario
      const uoFinal = yearFilter && degreeFilter
        ? usersPerGrade[degreeFilter][yearFilter]
        : debouncedUO;
  
      const baseUrl = `https://horariospceo.ingenieriainformatica.uniovi.es/schedule/userSchedule/${encodeURIComponent(uoFinal)}`;

      console.log("Fetching subjects for:", baseUrl);
      
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

  const handleSave = async () => {
    await fetchSubjects(); // 🔄 vuelve a cargar toda la lista actualizada
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
      toast.success('Pendiente de confirmación');
    } catch (err) {
      toast.error('Error al eliminar la asignatura');
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
    <section className="w-[90%] mt-10 px-8 py-5 rounded-xl bg-white shadow-md main-create-subject">
      <h2 className='text-xl sm:text-2xl font-semibold mb-4'>Clases programadas</h2>

      <SubjectFilters
        nameFilter={nameFilter}
        setNameFilter={(v) => { setNameFilter(v); setCurrentPage(1); }}
        dateFilter={dateFilter}
        setDateFilter={(v) => { setDateFilter(v); setCurrentPage(1); }}
        uoFilter={uoFilter}
        setUoFilter={(v) => { setUoFilter(v); setCurrentPage(1); }}
        degreeFilter={degreeFilter}
        setDegreeFilter={(v) => { setDegreeFilter(v); setCurrentPage(1); }}
        yearFilter={yearFilter}
        setYearFilter={(v) => {
            const curso = v && degreeFilter 
                ? usersPerGrade[degreeFilter][v]  // Usa el valor del diccionario
                : getUserUO();
            
            setYearFilter(v);
            setUoFilter(curso);  // Establece el UO correspondiente al grado y curso
            setCurrentPage(1);
            
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
