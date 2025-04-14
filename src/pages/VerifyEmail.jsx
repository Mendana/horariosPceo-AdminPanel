import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('Verificando...');
    const [error, setError] = useState('');
    const [canRedirect, setCanRedirect] = useState(false);

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) {
            setError('Token no proporcionado');
            return;
        }

        const verify = async () => {
            try {
                const res = await fetch(`https://horariospceo.ingenieriainformatica.uniovi.es/users/verify?token=${token}`);
                const data = await res.json();
                if (res.ok) {
                    setMessage(data.message || 'Cuenta verificada correctamente');
                    setCanRedirect(true);
                    // Puedes eliminar la redirección automática si lo prefieres
                    // setTimeout(() => navigate('/login'), 3000);
                } else {
                    setError(data.message || 'Error al verificar');
                }
            } catch (err) {
                setError('Error al conectar con el servidor');
            }
        };

        verify();
    }, [searchParams]);

    return (
        <main className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center px-4">
            <div className="bg-white shadow-md rounded-xl p-10 max-w-md">
                <h1 className="text-2xl font-bold mb-4">Verificación de Cuenta</h1>
                {error ? (
                    <p className="text-red-500 mb-4">{error}</p>
                ) : (
                    <p className="text-green-600 mb-4">{message}</p>
                )}
                {canRedirect && (
                    <button
                        onClick={() => navigate('/')}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                    >
                        Iniciar sesión
                    </button>
                )}
            </div>
        </main>
    );
};