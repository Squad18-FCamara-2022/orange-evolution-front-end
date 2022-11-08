import { Route, Routes } from 'react-router-dom';
import { AuthenticationProvider } from './contexts/AuthenticationContext';
import Home from './pages/UserHome';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UserClasses from './pages/UserClasses';

function AppRoutes() {
  return (
    <AuthenticationProvider>
      <Routes>
        <Route path="/">
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/cadastrar" element={<SignUp />} />
        {/* rotas protegidas (a fazer) */}
        <Route path="/home" element={<Home />} />
        <Route path="/trilhas" element={<UserClasses />} />
      </Routes>
    </AuthenticationProvider>
  );
}

export default AppRoutes;
