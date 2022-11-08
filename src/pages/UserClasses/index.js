import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../services/api';
import './styles.css';
import { getLocalItem } from '../../utils/localStorage';
import { useLocation } from 'react-router-dom';

function UserClasses() {
  // get da api para listar todas as aulas de uma trilha e as feitas pelo usuário
  // post para api para registrar aulas feitas por aquele usuário (fazer local e mandar pra api) - ver sobre a tabela que virá
  // delete para api para excluir aulas feitas por aquele usuário (fazer local e mandar pra api) - ver sobre a tabela que virá

  const [classes, setClasses] = useState();
  const [localClasses, setLocalClasses] = useState();
  const { token, userId } = getLocalItem('token', 'userId');
  const location = useLocation();
  const { track } = location.state;

  const getClassesUser = async ({ token, userId, trackName }) => {
    try {
      const { data } = await api.get(`/class/${userId}/?track=${trackName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClasses(data);
      setLocalClasses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addDoneClass = async ({ userId, classId }) => {
    try {
      const { data } = await api.post(`/class/${userId}/?class=${classId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //fazer a atualização das aulas locais (decidir com lucas sobre trazer do back ou no front)
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDoneClass = async ({ userId, classId }) => {
    try {
      const { data } = await api.delete(`/class/${userId}/?class=${classId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //fazer a atualização das aulas locais (decidir com lucas sobre trazer do back ou no front)
    } catch (error) {
      console.log(error);
    }
  };

  //passar add e delete como prop para os componentes linhas da tabela de aulas

  useEffect(() => {
    getClassesUser(token, userId, track);
  });

  return (
    <div className="user-classes-container">
      <Header />
      <div className="user-classes-main">
        <div className="user-classes-top">
          <h1>Nome da trilha</h1>
          <a
            href="https://discord.gg/B8KYUqVWM4"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bi bi-discord"></i>
          </a>
        </div>
        <div className="user-classes-content">{/* {localClasses.map} */}</div>
      </div>
    </div>
  );
}

export default UserClasses;
