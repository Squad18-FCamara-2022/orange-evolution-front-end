import './styles.css';
import { clearLocalStorage } from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthenticationContext';

function Header() {
  const navigate = useNavigate();
  const { setToken } = useAuthContext();
  const logout = () => {
    clearLocalStorage();
    setToken(null);
    navigate('/login');
  };

  return (
    <div className="container-header">
      <h1>Logo</h1>
      <nav>
        <ul>
          <li>
            <a href="/home">
              <i class="bi bi-house"></i>
            </a>
          </li>
          <li>
            <a
              href="https://discord.gg/B8KYUqVWM4"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-discord"></i>
            </a>
          </li>
          <li>
            <i class="bi bi-box-arrow-right" onClick={logout}></i>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
