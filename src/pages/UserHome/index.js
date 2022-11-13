import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './styles.css';

const releases = [
  {
    id: 1,
    date: '21/10/2022',
    message:
      'UX/UI Designer - Olá estudantes, a trilha foi atualizada com novos conteúdos.',
  },
  {
    id: 2,
    date: '25/05/2022',
    message:
      'Desenvolvimento Full Stack - Olá estudantes, a trilha foi atualizada com novos conteúdos.',
  },
  {
    id: 3,
    date: '04/05/2022',
    message:
      'Quality Assurance (QA) - Olá estudantes, a trilha foi atualizada com novos conteúdos.',
  },
];

function Home() {
  return (
    <div className="home-container">
      <Header page="user-home" />
      <div className="home-main">
        <h1 className="home-title">
          Bem vindo ao <span>Orange Evolution</span>!<br />
          Escolha uma trilha abaixo e começe sua jornada na tecnologia!
        </h1>
        <div className="main-tracks">
          <Link to="/trilhas" state={{ track: 'cla93f9p70004vw8nbp1vev5m' }}>
            UX/UI Designer
          </Link>
          <Link to="/trilhas" state={{ track: 'cla93d3yi0000vw8nti3frpr0' }}>
            Desenvolvimento <br />
            Full Stack
          </Link>
          <Link to="/trilhas" state={{ track: 'cla93egpn0002vw8np291twvw' }}>
            Quality Assurance (QA)
          </Link>
        </div>
        <div className="main-bottom">
          <div className="main-discord">
            <a
              href="https://discord.gg/B8KYUqVWM4"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-discord"></i>
            </a>
            <h2>
              Conheça a comunidade Orange Juice no Discord! Dúvidas, trocas de
              experiências, projetos e muito mais. Tudo no mesmo lugar!
            </h2>
          </div>
          <div className="main-releases">
            <h2>Comunicados</h2>
            {releases.map((item) => {
              return (
                <div className="release-item" key={item.id}>
                  <p>{item.date}</p>
                  <p>{item.message}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer page="user-home" />
    </div>
  );
}

export default Home;
