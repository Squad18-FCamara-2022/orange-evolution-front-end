// import { useState } from 'react';
// import api from '../../services/api';
import './styles.css';
// import { getLocalItem } from '../../utils/localStorage';

function HomeAdmin() {
  // get da api para listar todas as aulas de todas as trilhas
  // post para api para adicionar uma nova aula
  // patch para api para editar uma aula
  // // delete para excluir uma aula
  // const token = getLocalItem('token');
  // const [classes, setClasses] = useState();
  // const [localClasses, setLocalClasses] = useState();

  // const getClassesAdmin = async ({ token }) => {
  //   try {
  //     const { data } = await api.get(`/class`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setClasses(data);
  //     setLocalClasses(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const addClass = async ({ token }) => {
  //   try {
  //     await api.post(`/class`,
  //     {
  //       //adicionar dados da classe aqui + nos parâmetros da função
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     setLocalClasses(...localClasses, /*adicionar dados da classe*/);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const editClass = async ({ token }) => {
  //   try {
  //     const { data } = await api.get(`/class`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setClasses(data);
  //     setLocalClasses(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const deleteClass = async ({ token }) => {
  //   try {
  //     const { data } = await api.get(`/class`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setClasses(data);
  //     setLocalClasses(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="container-exemplo">
      <h1>Example</h1>
    </div>
  );
}

export default HomeAdmin;
