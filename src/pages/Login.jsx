import "../styles/login.css";
import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <main className="flex flex-row justify-center items-center h-screen bg-gray-100">
            <section className="main-login-container w-150 h-150">
                <div className="flex flex-col justify-center items-center gap-5 h-full w-full">
                    <h1 className="text-4xl font-bold mb-5">Iniciar Sesión</h1>
                    <form className="flex flex-col gap-5 w-80">
                        <input type="text" placeholder="Usuario" className="input-field" />
                        <div className="relative input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Contraseña"
                                className="input-field w-80"
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
                </div>
            </section>
        </main>
    );
};
