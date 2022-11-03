import App from './pages/Home/App';
import { Route, Routes } from 'react-router-dom';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  );
}

export default AppRoutes;
