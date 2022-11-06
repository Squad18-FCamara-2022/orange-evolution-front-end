import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/cadastrar" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;
