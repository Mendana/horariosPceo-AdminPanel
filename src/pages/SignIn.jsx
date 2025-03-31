import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/login.css";

export const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Por favor, rellena todos los campos');
            return;
        }

        try {
            const response = await fetch('https://horariospceo.ingenieriainformatica.uniovi.es/users/create/', {
                method: 'POST',
                credentials: 'include', // Importante para manejar cookies
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email: username, password: password })
            });
            if (response.ok) {
                // No necesitas guardar el token manualmente ya que viene como cookie
                navigate('/schedule');
            } else {
                const data = await response.json();
                setError(data.message || 'Error al registrarse');
            }
        } catch (error) {
            setError('Error de conexión');
        }
    }

    return (
        <main className="flex flex-row justify-center items-center h-screen bg-gray-100">
            <section className="main-login-container w-150 h-150">
                <div className="flex flex-col justify-center items-center gap-5 h-full w-full">
                    <h1 className="text-4xl font-bold mb-5">Registrarse</h1>
                    {error && <p className="text-red-500">{error}</p>}
                    <form className="flex flex-col gap-5 w-80" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Correo Universitario"
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
                            Crear cuenta
                        </button>
                    </form>
                    <Link to="/" className="lost-pwd">
                        <p className="text-gray-600">¿Solicitar rol administrador?</p>
                    </Link>
                    <Link to="/" className="lost-pwd">
                        <p className="text-gray-600">Iniciar sesión</p>
                    </Link>
                </div>
            </section>
        </main>
    );
};
