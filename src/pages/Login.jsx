import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { toast } from 'react-hot-toast';

import "../styles/login.css";

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Por favor, rellena todos los campos');
            return;
        }

        try {
            const response = await fetch('https://horariospceo.ingenieriainformatica.uniovi.es/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: username.split('@')[0],
                    password: password
                }),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                const userData = { email: username }; // o data.user si lo tienes
                localStorage.setItem('user', JSON.stringify(userData));
                login(userData);
                toast.success('Inicio de sesión exitoso');
                navigate('/schedule')
            } else {
                setError(data.message || 'Error al iniciar sesión.');
                toast.error(data.message || 'Error al iniciar sesión.');
            }
        } catch (error) {
            setError('Error de conexión');
            toast.error('Error de conexión');
        }
    }

    const handlePasswordRecovery = async () => {
        if (!username) {
            toast.error('Por favor, introduce tu correo primero');
            return;
        }

        try {
            const response = await fetch('https://horariospceo.ingenieriainformatica.uniovi.es/users/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: username.split('@')[0]
                })
            });

            if (response.ok) {
                toast.success('Se ha enviado un correo con las instrucciones para recuperar tu contraseña');
            } else {
                const data = await response.json();
                toast.error(data.message || 'Error al enviar el correo de recuperación');
            }
        } catch (error) {
            toast.error('Error de conexión');
        }
    };

    return (
        <main className="flex flex-row justify-center items-center min-h-screen px-5 bg-gray-100">
            <section className="main-login-container px-14 py-10 sm:px-18 sm:py-14 md:px-22 md:py-18 lg:px-26 lg:py-22 rounded-lg shadow-md bg-gray-100">
                <div className="flex flex-col justify-center items-center gap-5">
                    <h1 className="text-3xl md:text-4xl font-bold mb-5 text-center">Iniciar Sesión</h1>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Correo administrativo"
                            className="input-field w-full"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                                className="absolute right-2 top-2/5 -translate-y-1/2 bg-white border-none cursor-pointer p-1"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <button type="submit" className="submit-button w-full">
                            Iniciar Sesión
                        </button>
                    </form>
                    <a
                        href="mailto:dashboardpceo@gmail.com?subject=Solicitud%20de%20rol%20administrador&body=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20el%20rol%20de%20administrador%20en%20la%20plataforma%20de%20horarios.%20Mi%20correo%20institucional%20es%3A%20[pon%20tu%20correo%20aqui]"
                        className='lost-pwd w-full text-center'>
                        <p className="text-gray-600">¿Solicitar rol administrador?</p>
                    </a>
                    <Link to="/signin" className="lost-pwd w-full text-center">
                        <p className="text-gray-600">Crear cuenta</p>
                    </Link>
                    {/* Lost pwd */}
                    <button 
                        className="lost-pwd w-full text-center" 
                        onClick={handlePasswordRecovery}
                        type="button"
                    >
                        <p className="text-gray-600">Recuperar contraseña</p>
                    </button>
                </div>
            </section>
        </main>
    );
};
