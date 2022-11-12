import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthenticationContext';
import { clearLocalStorage } from '../../utils/localStorage';
import './styles.css';

function Footer({ page }) {
  const navigate = useNavigate();
  const { setToken } = useAuthContext();
  const [footerNav, setFooterNav] = useState(false);

  const showNav = () => {
    if (page === 'login' || page === 'signup') {
      setFooterNav(false);
      console.log(false);
    } else {
      setFooterNav(true);
      console.log(true);
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
    <div className="footer-container">
      {footerNav && (
        <nav>
          <ul className="footer-nav">
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
              <i class="bi bi-person-circle"></i>
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

export default Footer;
