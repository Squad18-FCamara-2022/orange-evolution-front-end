import './styles.css';
import { useState } from 'react';
import api from '../services/api';

function Exemplo() {
  // get da api para listar todas as aulas de todas as trilhas
  // post para api para adicionar uma nova aula
  // patch para api para editar uma aula
  // delete para excluir uma aula

  const [classes, setClasses] = useState();
  const [localClasses, setLocalClasses] = useState();
  const getClassesAdmin = async ({ token }) => {
    try {
      const { data } = await api.get(`/class`, {
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
    <div className="container-exemplo">
      <h1>Example</h1>
    </div>
  );
}

export default Exemplo;
