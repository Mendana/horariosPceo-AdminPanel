import { HeaderNav } from "../components/HeaderNav.jsx";
import '../styles/aboutUs.css';
import { AiOutlineGithub } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";


export function AboutUs() {
  return (
    <div>
      <HeaderNav title="Sobre nosotros" />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-20 p-10 max-w-5xl mx-auto">
        <div className="flex flex-col gap-4 items-center text-center md:items-start md:text-left about-div">
          <h2 className="text-xl font-bold">¿Quiénes somos?</h2>
          <p className="text-lg">
            Somos dos estudiantes del Doble Grado en Ingeniería Informática y Matemáticas que queremos facilitar la organización académica.
          </p>
        </div>
        <div className="flex flex-col gap-4 items-center text-center md:items-start md:text-left about-div">
          <h2 className="text-xl font-bold">Más sobre nosotros</h2>
          <div className='flex flex-row gap-4 items-center'>
            <h3>Pablo García Pernas: </h3>
            <a href="https://github.com/PabloGarPe" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition duration-300">
              <AiOutlineGithub size={30} />
            </a>
            <a href="https://www.linkedin.com/in/pablo-garc%C3%ADa-pernas-873630352/"><AiFillLinkedin size={30} /></a>
        </div>
        </div>
        <div className="flex flex-col gap-4 items-center text-center md:items-start md:text-left col-span-1 md:col-span-2">
          <h2 className="text-xl font-bold">¿Cómo lo hacemos?</h2>
          <p className="text-lg max-w-3xl mx-auto">
            Esta aplicación ha sido desarrollada con React, TailwindCSS y el consumo de datos desde APIs académicas oficiales. Es un proyecto abierto y en constante mejora.
          </p>
        </div>
      </section>
    </div>
  );
}
