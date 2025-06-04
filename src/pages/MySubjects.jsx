import { useRef } from "react";
import { HeaderNav } from "../components/HeaderNav.jsx";
import "../styles/aboutUs.css";
import { SubjectGroupSelectorList } from "../components/SubjectGroupSelectorList.jsx";
import { toast } from "react-hot-toast";

export function MySubjects() {
  const selectorRef = useRef();
  

  const getUserName = () => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      return userData.email.split('@')[0].toUpperCase();
    }
    return "USUARIO";
  };

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
            Para ello, aunque sea un poco rudimentario, podrás comprobar en tus calendarios (de informática y de ciencias) en qué grupo estás en cada asignatura (en ciencias lo más probable es que seas el grupo 1). Así, una vez hayas seleccionado las asignaturas y hayas guardado los cambios, estas serán tus asignaturas por defecto y podrás verlas en tu horario.
          </p>
        </article>

        <article className="about-div">
          <h2>Copiar distribuciones</h2>
          <p className="main-text">
            Si todo esto te parece un poco complicado (o más bien un rollo), puedes ir a la sección de <a href="/users" className="text-[var(--main-blue)]">usuarios</a> y copiar las distribuciones de asignaturas de otros usuarios. Esto te copiará su distribución de asignaturas y podrás verlas o modificarlas como quieras.
          </p>
          <p className="main-text">
            Revisa si quieres las asignaturas de otro usuario a través del <a href="https://horariospceo.web.app" target="_blank" rel="noopener noreferrer" className="text-[var(--main-blue)]">visualizador de horarios</a> antes de copiarlas para comprobar que son las que quieres. También, puedes usarlo como base para crear tu propia distribución de asignaturas ya que podrás seguir modificándolas después de copiarlas.
          </p>
        </article>

        <article className="about-div w-full mb-10">
          <SubjectGroupSelectorList
            ref={selectorRef}
            fetchData={async () => {
              try {
                const res = await fetch('https://horariospceo.ingenieriainformatica.uniovi.es/schedule/tipos', {
                  method: 'GET',
                  headers: { 'Accept': 'application/json' },
                  credentials: 'include',
                });
                const data = await res.json();
                return {
                  data: data.tipos,
                  selected: (data.cogido ?? []).map(item => `${item.subject}-${item.tipo}`),
                };
              } catch (err) {
                toast.error("Error al cargar los tipos de asignaturas");
                return { data: [], selected: [] };
              }
            }}
          />
        </article>
      </div>
    </div>
  );
}
