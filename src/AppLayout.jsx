// AppLayout.jsx
import { SideNav } from './components/SideNav';

const AppLayout = ({ children }) => {
  return (
    <div className="flex h-screen ">
      <SideNav />
      <main className="flex-1 bg-[var(--main-white)] overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
