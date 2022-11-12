import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { AuthenticationProvider } from './contexts/AuthenticationContext';
import HomeAdmin from './pages/HomeAdmin';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UserClasses from './pages/UserClasses';
import Home from './pages/UserHome';
import { getLocalItem } from './utils/localStorage';

function ProtectedRoutes({ redirectTo }) {
  const token = getLocalItem('token');
  const loggedInUser = token;
  return loggedInUser ? <Outlet /> : <Navigate to={redirectTo} />;
}

function AdminRoute({ redirectTo }) {
  const role = getLocalItem('role');
  const admin = role === 'admin';
  return admin ? <Outlet /> : <Navigate to={redirectTo} />;
}

function UserRoute({ redirectTo }) {
  const role = getLocalItem('role');
  const user = role === 'user';
  return user ? <Outlet /> : <Navigate to={redirectTo} />;
}

function AppRoutes() {
  return (
    <AuthenticationProvider>
      <Routes>
        <Route path="/">
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/cadastrar" element={<SignUp />} />

        <Route element={<ProtectedRoutes redirectTo="/" />}>
          <Route element={<UserRoute redirectTo="/admin" />}>
            <Route path="/home" element={<Home />} />
            <Route path="/trilhas" element={<UserClasses />} />
          </Route>

          <Route element={<AdminRoute redirectTo="/home" />}>
            <Route path="/admin" element={<HomeAdmin />} />
          </Route>
        </Route>
      </Routes>
    </AuthenticationProvider>
  );
}

export default AppRoutes;
