import App from './pages/Home/App';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/cadastrar" element={<Register />} />
      <Route path="/home" element={<App />} />
    </Routes>
  );
}

export default AppRoutes;
