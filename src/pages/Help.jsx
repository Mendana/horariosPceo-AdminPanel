import '../styles/help.css';
import { AiOutlineGithub } from 'react-icons/ai';
import { HeaderNav } from '../components/HeaderNav.jsx';

export const Help = () => {
    return (
        <section>
            <HeaderNav title='Ayuda'></HeaderNav>
            <section className='flex flex-col items-center justify-center'>
                <article className="info-div mb-10 mt-10">
                    <h2 className='text-lg md:text-xl'>¿Necesitas ayuda?</h2>

                    <p className="main-text text-base md:text-lg mb-4">
                        Si tienes dudas sobre cómo funciona esta herramienta o te has encontrado con algún problema, aquí tienes algunas respuestas rápidas que podrían ayudarte.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="help-card">
                            <h4 className="text-lg font-semibold text-[var(--main-blue)]">¿Cómo añado una asignatura o examen?</h4>
                            <p className="text-sm text-gray-700">
                                En la sección principal, completa el formulario con los datos de la clase o examen (nombre, aula, fecha, hora, duración...) y haz clic en “Añadir”.
                            </p>
                        </div>

                        <div className="help-card">
                            <h4 className="text-lg font-semibold text-[var(--main-blue)]">¿Cómo edito una asignatura existente?</h4>
                            <p className="text-sm text-gray-700">
                                En la lista de asignaturas, haz clic en el botón “Editar” de la clase que quieras modificar. Se abrirá una ventana con sus datos para que los actualices.
                            </p>
                        </div>

                        <div className="help-card">
                            <h4 className="text-lg font-semibold text-[var(--main-blue)]">¿Cómo puedo filtrar los horarios?</h4>
                            <p className="text-sm text-gray-700">
                                Usa los campos de búsqueda por nombre, curso o fecha en la parte superior de la lista para encontrar rápidamente lo que necesitas.
                            </p>
                        </div>

                        <div className="help-card">
                            <h4 className="text-lg font-semibold text-[var(--main-blue)]">¿Qué hago si no se cargan los horarios?</h4>
                            <p className="text-sm text-gray-700">
                                Asegúrate de haber seleccionado el curso correctamente. Si el problema persiste, prueba a recargar la página o revisa tu conexión a internet.
                            </p>
                        </div>

                        <div className="help-card md:col-span-2">
                            <h4 className="text-lg font-semibold text-[var(--main-blue)]">¿Dónde puedo reportar un problema o sugerencia?</h4>
                            <p className="text-sm text-gray-700">
                                Puedes abrir una issue directamente en nuestro repositorio de GitHub o contactar con nosotros si quieres hacernos llegar alguna sugerencia o mejora.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => window.open("https://github.com/Mendana/horariosPceo-AdminPanel/issues", "_blank")}
                            className="github-button justify-center"
                        >
                            <div className="flex flex-row items-center gap-2">
                                <AiOutlineGithub size={24} className="icon-img" />
                                <span>Reportar un problema</span>
                            </div>
                        </button>
                    </div>
                </article>
            </section>
        </section>
    )
}