import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Tracks from './pages/Tracks';

function AppRoutes() {
  return (
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
  );
}

export default AppRoutes;
