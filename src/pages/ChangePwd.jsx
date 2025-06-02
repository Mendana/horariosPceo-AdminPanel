import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export const ChangePwd = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    // Estados para las contraseñas
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = searchParams.get('token');
        
        if (!token) {
            setError('Token no proporcionado');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const res = await fetch(`https://horariospceo.ingenieriainformatica.uniovi.es/users/reset-password/verify?token=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password,
                    repeatPassword: confirmPassword
                })
            });

            const data = await res.json();
            
            if (res.ok) {
                setMessage('Contraseña actualizada correctamente');
                setTimeout(() => navigate('/'), 2000);
            } else {
                setError(data.message || 'Error al cambiar la contraseña');
            }
        } catch (err) {
            setError('Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center px-4">
            <div className="bg-white shadow-md rounded-xl p-10 max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4">Cambiar Contraseña</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {message && <p className="text-green-600 mb-4">{message}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Nueva contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field w-full"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-[25%] bg-transparent border-none cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirmar contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input-field w-full"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`submit-button ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : ''
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
                    </button>
                </form>
            </div>
        </main>
    );
};