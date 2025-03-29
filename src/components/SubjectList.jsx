import { useState, useEffect } from 'react';
import { SubjectFilters } from './SubjectFilters';
import { SubjectItem } from './SubjectItem';
import { Pagination } from './Pagination';


function calcularDuracion(horaInicio, horaFinal) {
  const [h1, m1] = horaInicio.split(':').map(Number);
  const [h2, m2] = horaFinal.split(':').map(Number);
  const totalMin = (h2 * 60 + m2) - (h1 * 60 + m1);
  const horas = Math.floor(totalMin / 60);
  const minutos = totalMin % 60;
  return `${horas > 0 ? horas + 'h ' : ''}${minutos > 0 ? minutos + 'min' : ''}`.trim();
}


const ITEMS_PER_PAGE = 10;

export function SubjectList() {
  const [subjects, setSubjects] = useState([]);
  const [courseFilter, setCourseFilter] = useState('1');
  const [nameFilter, setNameFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSubjects = subjects.filter(s => 
    (!courseFilter || s.curso.includes(courseFilter)) &&
    (!nameFilter || s.nombre.toLowerCase().includes(nameFilter.toLowerCase())) &&
    (!dateFilter || s.fecha.includes(dateFilter))
  );

  const totalPages = Math.ceil(filteredSubjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSubjects = filteredSubjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch(`https://horariospceo.ingenieriainformatica.uniovi.es/schedule/year/${courseFilter}`);
        const data = await res.json();
  
        const parsedSubjects = data.subjects.map((item, index) => {
          const fecha = `${item.year}-${String(item.mes).padStart(2, '0')}-${String(item.dia).padStart(2, '0')}`;
  
          return {
            id: index + 1,
            nombre: item.subject_name,
            aula: item.clase.trim(),
            curso: `${item.subject_year}`,
            fecha,
            horaInicio: item.hora_inicio,
            horaFinal: item.hora_final,
          };
        });
  
        setSubjects(parsedSubjects);
      } catch (err) {
        console.error("Error al cargar horarios:", err);
      }
    };
  
    fetchSubjects();
  }, [courseFilter]);

  return (
    <section className="w-[90%] mt-10 px-8 py-5 border rounded-xl bg-white shadow-md">
      <h2 className='text-xl font-semibold mb-4'>Clases programadas</h2>

      <SubjectFilters
        nameFilter={nameFilter}
        setNameFilter={(v) => { setNameFilter(v); setCurrentPage(1); }}
        dateFilter={dateFilter}
        setDateFilter={(v) => { setDateFilter(v); setCurrentPage(1); }}
        courseFilter={courseFilter}
        setCourseFilter={(v) => { setCourseFilter(v); setCurrentPage(1); }}
      />

      <div className="border-t divide-y">
        {currentSubjects.length === 0 ? (
          <p className="text-gray-500 pt-4">No se encontraron clases.</p>
        ) : (
          currentSubjects.map(subject => (
            <SubjectItem key={subject.id} subject={subject} />
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
    </section>
  );
}