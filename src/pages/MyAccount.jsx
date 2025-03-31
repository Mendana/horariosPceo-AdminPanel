import { HeaderNav } from "../components/HeaderNav";
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'

export const MyAccount = () => {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        fetch('https://horariospceo.ingenieriainformatica.uniovi.es/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Logout successful:', data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
        alert('Has cerrado sesión correctamente');
    };

    return (
        <section>
            <HeaderNav title="Mi cuenta" />
            <main className="flex flex-row justify-center items-center h-screen bg-gray-100">
                <section className="main-login-container w-150 h-150">
                    <div className="flex flex-col justify-center items-center gap-5 h-full w-full">
                        <h1 className="text-4xl font-bold mb-5">Mi Cuenta</h1>
                        <p className="text-gray-700">Aquí puedes gestionar tu cuenta.</p>
                        <button onClick={handleLogout} className="submit-button">
                            Cerrar Sesión
                        </button>
                    </div>
                </section>
            </main>
        </section>
    )
}