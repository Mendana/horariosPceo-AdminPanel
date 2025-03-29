import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AppLayout from './AppLayout';
import { Schedule } from './pages/Schedule.jsx';
import { Login } from './pages/Login.jsx';
import { RecoverPwd } from './pages/RecoverPwd.jsx';

function AppRoutes() {
  const location = useLocation();
  const isLogin = location.pathname === "/";

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/recover" element={<RecoverPwd />} />
      {!isLogin && (
        <Route
          path="*"
          element={
            <AppLayout>
              <Routes>
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/users" element={<div>Usuarios</div>} />
                <Route path="/settings" element={<div>Ajustes</div>} />
              </Routes>
            </AppLayout>
          }
        />
      )}
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
