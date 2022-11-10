import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import './styles.css';

const releases = [
  {
    id: 1,
    date: '24/10/2022',
    message:
      'Olá estudantes, a trilha de UX/UI Designer foi atualizada com novos conteúdos.',
  },
  {
    id: 2,
    date: '30/10/2022',
    message:
      'Olá estudantes, a trilha de Desenvolvimento Full Stack foi atualizada com novos conteúdos.',
  },
  {
    id: 3,
    date: '04/11/2022',
    message:
      'Olá estudantes, a trilha de Quality Assurance (QA) foi atualizada com novos conteúdos.',
  },
];

function Home() {
  return (
    <div className="home-container">
      <Header />
      <div className="home-main">
        <div className="main-tracks">
          <Link to="/trilhas" state={{ track: 'devfs' }}>
            Desenvolvimento Full Stack
          </Link>
          <Link to="/trilhas" state={{ track: 'qa' }}>
            Quality Assurance (QA)
          </Link>
          <Link to="/trilhas" state={{ track: 'uxui' }}>
            UX/UI Designer
          </Link>
        </div>
        <div className="main-discord">
          <p>
            Conheça nossa comunidade Orange Juice <br></br> Dúvidas, trocas de
            experiências e projetos <br></br> Tudo no mesmo lugar!
          </p>
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
  );
}

export default Home;
