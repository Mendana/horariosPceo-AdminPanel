import { HeaderNav } from "../components/HeaderNav.jsx";
import '../styles/aboutUs.css';
import { AiOutlineGithub, AiFillLinkedin } from "react-icons/ai";
import { DiReact, DiNodejsSmall, DiPython } from "react-icons/di";
import { CodeXml, BookOpen, Book } from "lucide-react";
import { RiTailwindCssFill, RiJavascriptFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { SiNestjs, SiMariadb, SiRedis, SiApache, SiUbuntu } from "react-icons/si";
import { TechCard } from "../components/TechCard.jsx";

export function AboutUs() {
  return (
    <div>
      <HeaderNav title="Sobre nosotros" />
      <section className="flex flex-col items-center pt-10 gap-10">
        <article className="about-div">
          <h2>Quiénes somos</h2>
          <p className="main-text">
            Somos Pablo García Pernas y Diego Díaz Mendaña, dos estudiantes del PCEO de Informática y Matemáticas de la Universidad de Oviedo a quienes nos gusta programar. Nuestro sistema de administración de horarios para el PCEO nació debido a algunos problemas que se presentaron tanto para nosotros como estudiantes a la hora de mirar los horarios, como para los profesores para fechar exámenes o cambiar horas.
          </p>
          <p className="main-text">
            Así, el objetivo de esta página es ayudar en la medida de lo posible a gestionar esta situación facilitando las modificaciones de horarios para su posterior visualización en <a href="https://horariospceo.web.app" target="_blank" rel="noopener noreferrer" className="text-[var(--main-blue)]">horariospceo.web.app</a>
          </p>
        </article>
        <article className="about-div">
          <h2>Nuestro equipo</h2>
          <div className="flex flex-row gap-10 justify-center items-center">
            <div className="person-info">
              <h3>Pablo García Pernas</h3>
              <p className="text-base">Estudiante del PCEO Informática y Matemáticas</p>
              <div className="flex flex-row gap-5 mt-2">
                <a
                  href="https://www.linkedin.com/in/pablo-garc%C3%ADa-pernas-873630352/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-group"
                >
                  <div className="logo-icon flex flex-row gap-2 items-center">
                    <AiFillLinkedin size={30} className="icon-img" />
                    <p className="text-base">LinkedIn</p>
                  </div>
                </a>
                <a
                  href="https://github.com/PabloGarPe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-group"
                >
                  <div className="logo-icon flex flex-row gap-2 items-center">
                    <AiOutlineGithub size={30} className="icon-img" />
                    <p className="text-base">GitHub</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="person-info">
              <h3>Diego Díaz Mendaña</h3>
              <p className="text-base">Estudiante del PCEO Informática y Matemáticas</p>
              <div className="flex flex-row gap-5 mt-2">
                <a
                  href="https://www.linkedin.com/in/diego-díaz-mendaña"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-group"
                >
                  <div className="logo-icon flex flex-row gap-2 items-center">
                    <AiFillLinkedin size={30} className="icon-img" />
                    <p className="text-base">LinkedIn</p>
                  </div>
                </a>
                <a
                  href="https://www.github.com/Mendana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-group"
                >
                  <div className="logo-icon flex flex-row gap-2 items-center">
                    <AiOutlineGithub size={30} className="icon-img" />
                    <p className="text-base">GitHub</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </article>
        <article className="about-div">
          <h2>Nuestro código</h2>
          <div className="flex flex-row gap-10 justify-center items-center">
            <div className="person-info">
              <div className="flex flex-row gap-2 items-center">
                <CodeXml size={25} className="text-[var(--main-blue)]" />
                <h3>Repositorio Frontend</h3>
              </div>
              <p className="text-base">Nuestro código frontend está disponible en GitHub. Siéntete libre de explorar, contribuir o reportar problemas</p>
              <button
                onClick={() => window.open("https://github.com/Mendana/horariosPceo-AdminPanel", "_blank")}
                className="github-button"
              >
                <div className="flex flex-row items-center gap-2">
                  <AiOutlineGithub size={24} className="icon-img" />
                  <span className="pl-1">Ver repositorio</span>
                </div>
              </button>
            </div>
            <div className="person-info">
              <div className="flex flex-row gap-2 items-center">
                <BookOpen size={25} className="text-[var(--main-blue)]" />
                <h3>Documentación</h3>
              </div>
              <p className="text-base">Hemos documentado el proyecto para facilitar su comprensión y posibles contribuciones.</p>
              <button
                className="github-button-disabled"
              >
                <div className="flex flex-row items-center gap-2">
                  <Book size={24} className="icon-img" />
                  <span className="pl-2">Ver documentación</span>
                </div>
              </button>
            </div>
          </div>
        </article>
        <article className="about-div mb-10">
          <h2>Tecnologías Utilizadas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TechCard name="React" description="Frontend" Icon={DiReact} />
            <TechCard name="Ubuntu" description="Máquina" Icon={SiUbuntu} />
            <TechCard name="Tailwind CSS" description="Estilos" Icon={RiTailwindCssFill} />
            <TechCard name="Node.js" description="Backend" Icon={DiNodejsSmall} />
            <TechCard name="TypeScript" description="Lenguaje" Icon={BiLogoTypescript} />
            <TechCard name="Nest.js" description="Backend" Icon={SiNestjs} />
            <TechCard name="MariaDB" description="Base de datos" Icon={SiMariadb} />
            <TechCard name="Python" description="Lenguaje" Icon={DiPython} />
            <TechCard name="Apache" description="Servidor HTTP" Icon={SiApache} />
            <TechCard name="GitHub" description="Repositorio" Icon={AiOutlineGithub} />
            <TechCard name="Redis" description="Caché" Icon={SiRedis} />
            <TechCard name="JavaScript" description="Lenguaje" Icon={RiJavascriptFill} />
          </div>
        </article>

      </section>
    </div>
  );
}
