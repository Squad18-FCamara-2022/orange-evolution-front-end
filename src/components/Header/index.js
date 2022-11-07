import './styles.css';

function Header() {
  return (
    <div className="container-header">
      <h1>Header</h1>
      <nav>
        <ul>
          <li>Dev FullStack</li>
          <li>QA</li>
          <li>UX/UI</li>
        </ul>
        <a
          href="https://discord.gg/B8KYUqVWM4"
          target="_blank"
          rel="noreferrer"
        >
          Discord
        </a>
      </nav>
    </div>
  );
}

export default Header;
