// eslint-disable-next-line
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../services/api';
import './styles.css';
import { getLocalItem } from '../../utils/localStorage';
import { useLocation } from 'react-router-dom';
// eslint-disable-next-line
import Class from '../../components/userClass/index';
import UserClass from '../../components/userClass/index';

function UserClasses() {
  // get da api para listar todas as aulas de uma trilha e as feitas pelo usuário
  // post para api para registrar aulas feitas por aquele usuário (fazer local e mandar pra api) - ver sobre a tabela que virá
  // delete para api para excluir aulas feitas por aquele usuário (fazer local e mandar pra api) - ver sobre a tabela que virá

  // eslint-disable-next-line
  const [classes, setClasses] = useState();
  // eslint-disable-next-line
  const [localClasses, setLocalClasses] = useState();
  // eslint-disable-next-line
  const { token, userId } = getLocalItem('token', 'userId');
  const location = useLocation();
  // eslint-disable-next-line
  const { trackId } = location.state;
  // eslint-disable-next-line
  const getClassesUser = async ({ token, userId, trackId }) => {
    try {
      const response = await api.get(`/getUserTrack/${userId}/${trackId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      // como pegar e ir montando uma lista de aulas se vem dentro de categorias diferentes???
    } catch (error) {
      console.log(error);
    }
  };
  // eslint-disable-next-line
  const addDoneClass = async ({ userId, classId }) => {
    try {
      // eslint-disable-next-line
      const response = await api.post(`/class/${userId}/?class=${classId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //fazer a atualização das aulas locais (decidir com lucas sobre trazer do back ou no front)
    } catch (error) {
      console.log(error);
    }
  };
  // eslint-disable-next-line
  const deleteDoneClass = async ({ userId, classId }) => {
    try {
      // eslint-disable-next-line
      const response = await api.delete(`/class/${userId}/?class=${classId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //fazer a atualização das aulas locais (decidir com lucas sobre trazer do back ou no front)
    } catch (error) {
      console.log(error);
    }
  };

  // passar add e delete como prop para os componentes linhas da tabela de aulas

  // useEffect(() => {
  //   getClassesUser(token, userId, trackId);
  // });

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
        <div className="user-classes-content">
          <div className="user-classes-header"></div>
          <div className="user-classes-rows">
            {localClasses.length !== 0 &&
              localClasses.map((userClass) => {
                return (
                  <div className="user-class-row" key={userClass.classId}>
                    <UserClass classInfo={userClass} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserClasses;
