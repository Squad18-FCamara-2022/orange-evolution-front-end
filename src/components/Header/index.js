import './styles.css';

function Header() {
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
            <a href="/login">
              <i class="bi bi-box-arrow-right"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
