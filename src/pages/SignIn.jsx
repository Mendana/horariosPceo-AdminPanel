import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/login.css";
import { toast } from 'react-hot-toast';

export const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Por favor, rellena todos los campos');
            return;
        }

        // Validación opcional del dominio universitario
        if (!email.endsWith('@uniovi.es')) {
            setError('Debes usar un correo universitario (@uniovi.es)');
            return;
        }

        const trimmedEmail = email.split('@')[0];
        try {
            const response = await fetch('https://horariospceo.ingenieriainformatica.uniovi.es/users/create/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email: trimmedEmail, password })
            });

            const data = await response.json();

            if (response.ok) {
                if (data.requiresVerification) {
                    toast.success('Revisa tu correo universitario para verificar tu cuenta antes de iniciar sesión.');
                    navigate('/login');
                } else {
                    navigate('/schedule');
                }
            } else {
                setError(data.message || 'Error al registrarse');
            }
        } catch (error) {
            setError('Error de conexión con el servidor');
        }
    };

    return (
    <main className="flex flex-row justify-center items-center min-h-screen px-5 bg-gray-100">
        <section className="main-login-container px-14 py-10 sm:px-18 sm:py-14 md:px-22 md:py-18 lg:px-26 lg:py-24 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl w-full rounded-lg shadow-md bg-gray-100">
            <div className="flex flex-col justify-center items-center gap-5">
                <h1 className="text-3xl md:text-4xl font-bold mb-5 text-center">Registrarse</h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Correo Universitario"
                        className="input-field w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="relative input-wrapper w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            className="input-field w-full overflow-hidden"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-3/7 -translate-y-1/2 bg-white border-none cursor-pointer p-1"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <button type="submit" className="submit-button w-full">
                        Crear cuenta y verificar
                    </button>
                </form>
                <a
                    href="mailto:dashboardpceo@gmail.com?subject=Solicitud%20de%20rol%20administrador&body=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20el%20rol%20de%20administrador%20en%20la%20plataforma%20de%20horarios.%20Mi%20correo%20institucional%20es%3A%20[pon%20tu%20correo%20aqui]"
                    className='lost-pwd w-full text-center'>
                    <p className="text-gray-600">¿Solicitar rol administrador?</p>
                </a>
                <Link to="/" className="lost-pwd w-full text-center">
                    <p className="text-gray-600">Iniciar sesión</p>
                </Link>
            </div>
        </section>
    </main>
);
};
