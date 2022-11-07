import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import './styles.css';

const releases = [
  {
    date: '24/10/2022',
    message:
      'Olá estudantes, a trilha de UX/UI Designer foi atualizada com novos conteúdos.',
  },
  {
    date: '30/10/2022',
    message:
      'Olá estudantes, a trilha de Desenvolvimento Full Stack foi atualizada com novos conteúdos.',
  },
  {
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
        <div className="main-releases">
          {releases.map((item) => {
            return (
              <div className="release-item">
                <p>{item.date}</p>
                <p>{item.message}</p>
              </div>
            );
          })}
        </div>
        <div className="main-tracks">
          <h2>Acesse aqui as trilhas:</h2>
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
      </div>
    </div>
  );
}

export default Home;
