export function SubjectItem({ subject }) {


  return (
    <div className="flex justify-between items-center py-3">
      <div>
        <p className="font-medium">{subject.nombre}</p>
        <p className="text-sm text-gray-600">
          {subject.fecha} a las {subject.horaInicio} – {subject.horaFinal}  |  Aula: {subject.aula} 
        </p>
      </div>
      <button className="text-blue-600 hover:underline text-sm">Editar</button>
    </div>
  );
}
