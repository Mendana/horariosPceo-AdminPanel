import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        const token = searchParams.get('token');
        if (!token) {
            setError('Token no proporcionado');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const res = await fetch(`https://horariospceo.ingenieriainformatica.uniovi.es/users/verify?token=${token}`);
            const data = await res.json();
            if (res.ok) {
                setMessage(data.message || 'Cuenta verificada correctamente');
                // Redirigir al login después de un corto delay
                setTimeout(() => navigate('/'), 2000);
            } else {
                setError(data.message || 'Error al verificar');
            }
        } catch (err) {
            setError('Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center px-4">
            <div className="bg-white shadow-md rounded-xl p-10 max-w-md">
                <h1 className="text-2xl font-bold mb-4">Verificación de Cuenta</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {message && <p className="text-green-600 mb-4">{message}</p>}

                <button
                    onClick={handleVerify}
                    className={`submit-button ${
                        loading ? 'bg-gray-400 cursor-not-allowed' : ''
                    }`}
                    disabled={loading}
                >
                    {loading ? 'Verificando...' : 'Verificar Cuenta'}
                </button>
            </div>
        </main>
    );
};
