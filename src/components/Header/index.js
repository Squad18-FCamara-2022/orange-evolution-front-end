import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo-orange.png';
import { useAuthContext } from '../../contexts/AuthenticationContext';
import { clearLocalStorage } from '../../utils/localStorage';
import './styles.css';

function Header({ page }) {
  const navigate = useNavigate();
  const { setToken } = useAuthContext();
  const [headerNav, setHeaderNav] = useState(false);

  const showNav = () => {
    if (page === 'login' || page === 'signup') {
      setHeaderNav(false);
    } else {
      setHeaderNav(true);
    }
  };

  const logout = () => {
    clearLocalStorage();
    setToken(null);
    navigate('/login');
  };

  useEffect(() => {
    showNav();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="header-container">
      <img className="header-logo" src={Logo} alt="logo" />
      {headerNav && (
        <nav>
          <ul className="header-nav">
            <li>
              <a href="/home">
                <i className="bi bi-house"></i>
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
              <i className="bi bi-person-circle"></i>
            </li>
            <li>
              <button onClick={logout}>
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default Header;
