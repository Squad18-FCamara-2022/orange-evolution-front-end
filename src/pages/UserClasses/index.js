import './styles.css';
import Header from '../../components/Header';
import { useState } from 'react';
import api from '../../services/api';

function UserClasses() {
  // get da api para listar todas as aulas de uma trilha e as feitas pelo usuário
  // post para api para registrar aulas feitas por aquele usuário (fazer local e mandar pra api) - ver sobre a tabela que virá
  // delete para api para excluir aulas feitas por aquele usuário (fazer local e mandar pra api) - ver sobre a tabela que virá

  const [classes, setClasses] = useState();
  const [localClasses, setLocalClasses] = useState();
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

  return (
    <div className="user-classes-container">
      <Header />
    </div>
  );
}

export default UserClasses;
