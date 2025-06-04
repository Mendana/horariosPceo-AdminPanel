// AppLayout.jsx
import { SideNav } from './components/SideNav';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="relative flex h-screen ">
      <SideNav />
      <main className="flex-1 bg-[var(--main-white)] overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
