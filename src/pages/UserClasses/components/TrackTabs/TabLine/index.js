import './styles.css';
import api from '../../../../../services/api';
import { getLocalItem } from '../../../../../utils/localStorage';
import { useState } from 'react';

export default function TabLine({ dados }) {
  const [checkboxStatus, setCheckboxStatus] = useState(
    dados.status === 'checked' ? true : false
  );
  const token = getLocalItem('token');
  const classId = dados.id;

  // função para marcar uma aula como feita
  const addDoneClass = async () => {
    try {
      const response = await api.post(
        `/createUserClass/${classId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // função para desmarcar uma aula como feita
  const deleteDoneClass = async () => {
    try {
      const response = await api.delete(`/deleteUserClass/${classId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // função para criar ou apagar a aula do usuário no banco
  function handleChangeClassStatus() {
    // se tiver true, deletar a aula do user do banco, senão criar aula do user.
    if (checkboxStatus === true) {
      deleteDoneClass();
      setCheckboxStatus(false);
    } else {
      addDoneClass();
      setCheckboxStatus(true);
    }
  }

  return (
    <>
      {' '}
      <div className="linha linha-desk">
        <p className="linha-titulo">{dados.title || '-'}</p>
        <p className="linha-responsavel">{dados.author || '-'}</p>
        <p className="linha-tipo">{dados.type || '-'}</p>
        <p className="linha-duracao">{dados.duration || '-'}</p>
        <p className="linha-conteudo">
          {dados.link ? (
            <a href={dados.link} target="_blank" rel="noreferrer">
              <i className="bi bi-box-arrow-up-right"></i>
            </a>
          ) : (
            '-'
          )}
        </p>
        <p className="linha-status">
          <input
            type="checkbox"
            defaultChecked={checkboxStatus}
            onChange={handleChangeClassStatus}
          />
        </p>
      </div>
      <div className="linha linha-mobile">
        <p className="linha-titulo">
          {dados.title || '-'}
          <br />
          {dados.author || '-'} | {dados.type || '-'} | {dados.duration || '-'}
        </p>
        <div>
          <p className="linha-conteudo">
            {dados.link ? (
              <a href={dados.link} target="_blank" rel="noreferrer">
                <i className="bi bi-box-arrow-up-right"></i>
              </a>
            ) : (
              '-'
            )}
          </p>
          <p className="linha-status">
            <input
              type="checkbox"
              defaultChecked={checkboxStatus}
              onChange={handleChangeClassStatus}
            />
          </p>
        </div>
      </div>
    </>
  );
}
