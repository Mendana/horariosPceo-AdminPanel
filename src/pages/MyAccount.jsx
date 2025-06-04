import { HeaderNav } from "../components/HeaderNav";
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

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

    const getUserName = () => {
        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            return userData.email.split('@')[0].toUpperCase();
        }
        return "USUARIO";
    };

    const handlePasswordRecovery = async () => {
        try {
            const user = localStorage.getItem('user');
            if (!user) {
                toast.error('No se encontró información del usuario');
                return;
            }

            const userData = JSON.parse(user);
            const email = userData.email.split('@')[0];

            const response = await fetch('https://horariospceo.ingenieriainformatica.uniovi.es/users/recover', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                toast.success('Se ha enviado un correo con las instrucciones para cambiar tu contraseña');
            } else {
                const data = await response.json();
                toast.error(data.message || 'Error al enviar el correo');
            }
        } catch (error) {
            toast.error('Error de conexión');
        }
    };

    return (
        <section>
            <HeaderNav title={`Mi cuenta - ${getUserName()}`} />
            <main className="flex flex-row justify-center items-center h-screen bg-gray-100">
                <section className="main-login-container w-150 h-150">
                    <div className="flex flex-col justify-center items-center gap-5 h-full w-full">
                        <h1 className="text-4xl font-bold mb-5">Mi Cuenta</h1>
                        
                        <button 
                            onClick={handlePasswordRecovery}
                            className="submit-button w-80"
                        >
                            Solicitar cambio de contraseña
                        </button>

                        <div className="border-t w-80 my-4"></div>

                        <button onClick={handleLogout} className="submit-button w-80">
                            Cerrar Sesión
                        </button>
                    </div>
                </section>
            </main>
        </section>
    );
};