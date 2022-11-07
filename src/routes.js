import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Tracks from './pages/Tracks';
import { AuthenticationProvider } from './contexts/AuthenticationContext';

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
        <Route path="/trilhas" element={<Tracks />} />
      </Routes>
    </AuthenticationProvider>
  );
}

export default AppRoutes;
