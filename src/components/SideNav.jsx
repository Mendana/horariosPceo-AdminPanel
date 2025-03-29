import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Calendar, Users, Info, User, HandHelping  } from 'lucide-react';
import { useState } from 'react';
import '../styles/sideNav.css';

export const SideNav = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(true);

    const navItems = [
        { name: 'Horarios', path: '/schedule', icon: <Calendar size={20} /> },
        { name: 'Usuarios', path: '/users', icon: <Users size={20} /> },
        { name: 'Ayuda', path: '/help', icon: <HandHelping size={20} /> },
        { name: 'Sobre nosotros', path: '/aboutUs', icon: <Info size={20} /> },
    ];

    return (
        <aside
            className={`${collapsed ? 'w-17 items-center' : 'w-64 expanded'
                } nav-aside text-white h-screen p-4 flex flex-col`}
        >
            <div className="flex justify-between items-center mb-6">
                {!collapsed && <h2 className="text-2xl font-bold">Opciones</h2>}
                <button onClick={() => setCollapsed(!collapsed)} className={`text-white toggle-icon ${collapsed ? 'rotate-0' : 'rotate-180'}`}>
                    {<ChevronRight size={20} />}
                </button>
            </div>

            <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`nav-aside-item p-2 rounded transition flex items-center gap-2 ${location.pathname === item.path ? 'nav-aside-selected-item' : ''
                            }`}
                    >
                        {item.icon}
                        {!collapsed && <span>{item.name}</span>}
                    </Link>
                ))}
            </nav>
            <footer className='mt-auto pt-6 border-t border-gray-700'>
                <Link
                    to="/perfil"
                    className={`p-2 nav-aside-item flex items-center gap-2 ${location.pathname === '/perfil' ? 'nav-aside-selected-item' : ''
                        }`}
                >
                    <User size={20}></User>
                    {!collapsed && <span>Mi Perfil</span>}
                </Link>
            </footer>
        </aside>
    );
};
