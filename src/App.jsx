// src/App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './AppLayout';
import { Schedule } from './pages/Schedule.jsx';
import { Login } from './pages/Login.jsx';
import { RecoverPwd } from './pages/RecoverPwd.jsx';
import { Users } from './pages/Users.jsx';
import { SignIn } from './pages/SignIn.jsx';
import { AboutUs } from './pages/AboutUs.jsx';
import { Help } from './pages/Help.jsx';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import { MyAccount } from './pages/MyAccount.jsx';
import { MySubjects } from './pages/MySubjects.jsx';
import { PendingApprovals } from './pages/PendingApprovals.jsx';
import { Toaster } from 'react-hot-toast';
import { VerifyEmail } from './pages/VerifyEmail.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Configuración de la notificación de react-hot-toast */}
        <Toaster position='top-center' reverseOrder={false} />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Login />} />
          <Route path="/recover" element={<RecoverPwd />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path='/verify' element={<VerifyEmail />} />

          {/* Rutas protegidas */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }
          >
            <Route path="schedule" element={<Schedule />} />
            <Route path="users" element={<Users />} />
            <Route path="mySubjects" element={<MySubjects />} />
            <Route path="pendingApprovals" element={<PendingApprovals />} />
            <Route path="help" element={<Help />} />
            <Route path="aboutUs" element={<AboutUs />} />
            <Route path="myAccount" element={<MyAccount />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
