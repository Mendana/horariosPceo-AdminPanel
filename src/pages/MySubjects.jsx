import { useRef } from "react";
import { HeaderNav } from "../components/HeaderNav.jsx";
import '../styles/aboutUs.css';
import { SubjectGroupSelectorList } from "../components/SubjectGroupSelectorList.jsx";

const mockData = [
  { tipo: "Física", subject: "T.1" },
  { tipo: "Física", subject: "T.2" },
  { tipo: "Física", subject: "L.1" },
  { tipo: "Matemáticas", subject: "T.1" },
  { tipo: "Matemáticas", subject: "T.2" },
  { tipo: "Inglés", subject: "T.1" },
];

const selectedArray = ["Física-T.2", "Matemáticas-T.1"];

export function MySubjects() {

  const selectorRef = useRef();

  const handleGetSelected = () => {
    const selected = selectorRef.current.getSelected();
    alert(`Grupos seleccionados:\n${selected.join('\n')}`);
  };

  const getUserName = () => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      return userData.email.split('@')[0].toUpperCase();
    }
  }

  return (
    <div>
      <HeaderNav title={`Mis Asignaturas - ${getUserName()}`} />
      <div className="flex flex-col items-center pt-10 gap-10">
        <article className="about-div">
          <h2>¿Qué es esto?</h2>
          <p className="main-text">
            Aquí puedes seleccionar las asignaturas que quieres ver en tu horario, tanto si eres administrador y quieres poder gestionarlas aquí como si quieres poder verlas con tu UO en <a href="https://horariospceo.web.app" target="_blank" rel="noopener noreferrer" className="text-[var(--main-blue)]">horariospceo.web.app</a>. Podrás seleccionar cualquier clase que curses y cambiarlo en cualquier momento.
          </p>
          <p className="main-text">
            Para ello, aunque sea un poco rudimentario, podrás comprobar en tus calendarios (de informática y de ciencias) en que grupo estás en cada asignatura (en ciencias lo más probable es que seas el grupo 1). Así, una vez hayas seleccionado las asignaturas y hayas guardado los cambios, estas serán tus asignaturas por defecto y podrás verlas en tu horario.
          </p>
        </article>
        <article className="about-div">
          <SubjectGroupSelectorList
            ref={selectorRef}
            fetchData={async () => ({
              data: mockData,
              selected: selectedArray,
            })}
          />
        </article>
      </div>
    </div>
  );
}
