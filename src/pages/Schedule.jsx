import { useRef } from "react";
import { HeaderNav } from "../components/HeaderNav.jsx";
import { CreateSubject } from "../components/CreateSubject.jsx";
import { SubjectList } from "../components/SubjectList.jsx";

export const Schedule = () => {
  const listRef = useRef(null);

  const handleCreated = () => {
    listRef.current?.reload(); // recarga la lista de asignaturas
  };

  return (
    <section>
      <HeaderNav title='Administración de Horarios' />
      <section className="flex flex-col items-center pt-10 pb-15">
        <CreateSubject onCreated={handleCreated} />
        <SubjectList ref={listRef} />
      </section>
    </section>
  );
};