export function SubjectItem({ subject, onEdit, onDelete }) {

  const formatFecha = (isoDate) => {
    const [yyyy, mm, dd] = isoDate.split('-');
    return `${dd}-${mm}-${yyyy}`;
  };

  return (
    <div className="flex justify-between items-center py-3">
      <div>
        <p className={`font-medium ${subject.approved===1 ? '' : 'text-yellow-600'}`}>
          {subject.nombre}
          {!subject.approved && <span className="ml-2 text-xs italic">(Pendiente de aprobación)</span>}
        </p>
        <p className="text-sm text-gray-600">
          {formatFecha(subject.fecha)} a las {subject.horaInicio} – {subject.horaFinal} | Aula: {subject.aula}
        </p>
      </div>
      <div className="flex flex-row gap-2 items-center">

        <button
          onClick={() => onDelete(subject.id)}
          className="text-red-500 hover:underline text-sm cursor-pointer"
        >
          Eliminar
        </button>
        <p>|</p>
        <button
          onClick={() => onEdit(subject)}
          className="text-blue-600 hover:underline text-sm cursor-pointer"
        >
          Editar
        </button>
      </div>
    </div>
  );
}
