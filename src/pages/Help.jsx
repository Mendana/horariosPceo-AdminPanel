export const Help = () => {
    return (
        <section className="w-full py-16 bg-gray-50 px-6 flex flex-col items-center text-center">
            <div className="max-w-4xl">
                <h2 className="text-3xl font-bold mb-4">Ayuda</h2>
                <p className="text-gray-600 text-lg mb-8">
                    Aquí encontrarás respuestas a las preguntas más frecuentes y recursos útiles para ayudarte a navegar por nuestra plataforma.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-2">Preguntas Frecuentes</h3>
                        <p className="text-sm text-gray-600">
                            Encuentra respuestas a las preguntas más comunes sobre el uso de la plataforma.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-2">Tutoriales</h3>
                        <p className="text-sm text-gray-600">
                            Accede a tutoriales paso a paso para aprender a utilizar todas las funcionalidades de la plataforma.
                        </p>
                    </div>
                </div>

                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-xl transition">
                    Contacta con Soporte
                </button>
            </div>
        </section>
    )
}