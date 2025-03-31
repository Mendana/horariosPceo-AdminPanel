import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

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
                    email: username,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                const userData = { email: username }; // o data.user si lo tienes
                localStorage.setItem('user', JSON.stringify(userData));
                login(userData);
                navigate('/schedule');
            } else {
                setError(data.message || 'Error al iniciar sesión.');
            }
        } catch (error) {
            setError('Error de conexión');
        }
    }

    return (
        <main className="flex flex-row justify-center items-center h-screen bg-gray-100">
            <section className="main-login-container w-150 h-150">
                <div className="flex flex-col justify-center items-center gap-5 h-full w-full">
                    <h1 className="text-4xl font-bold mb-5">Iniciar Sesión</h1>
                    {error && <p className="text-red-500">{error}</p>}
                    <form className="flex flex-col gap-5 w-80" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Correo administrativo"
                            className="input-field"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className="relative input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Contraseña"
                                className="input-field w-80"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-[25%] bg-transparent border-none cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <button type="submit" className="submit-button">
                            Iniciar Sesión
                        </button>
                    </form>
                    <Link to="/recover" className="lost-pwd">
                        <p className="text-gray-600">¿Olvidaste tu contraseña?</p>
                    </Link>
                    <Link to="/signin" className="lost-pwd">
                        <p className="text-gray-600">Crear cuenta</p>
                    </Link>
                </div>
            </section>
        </main>
    );
};
