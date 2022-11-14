import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import UserClass from "../../components/UserClass";
import api from "../../services/api";
import { getLocalItem } from "../../utils/localStorage";
import "./styles.css";

function UserClasses() {
  // eslint-disable-next-line
  const [classes, setClasses] = useState();
  const [localClasses, setLocalClasses] = useState();
  const [trackDetails, setTrackDetails] = useState();

  const token = getLocalItem("token");
  const location = useLocation();
  const { track } = location.state;

  const setClassesData = (data) => {
    const classesArray = [];
    const doneClasses = data.userTrackClasses;
    const categories = data.trackDetails.categories;
    categories.forEach((category) => {
      category.classes.forEach((item) => {
        const status = setClassStatus(item.id, doneClasses)
          ? "checked"
          : "undone";
        const line = {
          id: item.id,
          title: item.title,
          type: item.contentType,
          author: item.author,
          duration: item.duration,
          link: item.link,
          category: category.name,
          status: status,
        };
        classesArray.push(line);
      });
    });
    setClasses(classesArray);
    setLocalClasses(classesArray);
  };

  const setClassStatus = (classId, doneClasses) => {
    return doneClasses.find((item) => item.classId === classId);
  };

  // função para buscar os dados da trilha do usuário com as aulas
  const getClassesUser = async (trackId) => {
    try {
      const { data } = await api.get(`/getUserTrack/${trackId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setClassesData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // função para marcar uma aula como feita
  const addDoneClass = async (classId) => {
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
  const deleteDoneClass = async (classId) => {
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

  useEffect(() => {
    getClassesUser(track);
    // eslint-disable-next-line
  }, []);

  const Aba = ({ titulo, selecionado, ...props }) => {
    return (
      <button
        className={selecionado ? "aba aba-selecionada" : "aba"}
        {...props}
      >
        {titulo}
      </button>
    );
  };

  return (
    <div className="user-classes-container">
      <Header />
      <div className="user-classes-main">
        <div className="user-classes-top">
          <h1>{trackDetails.name}</h1>
        </div>
        <div className="user-classes-content">
          <div className="user-classes-tab">
            {/* {ABAS.UX.map((titulo, i) => (
            <Aba
              key={`aba-${i}`}
              titulo={titulo}
              selecionado={i === aba}
              onClick={() => setAba(i)}
            />
        ))} */}
          </div>
          <div className="user-classes-rows">
            {localClasses &&
              localClasses.map((userClass) => {
                return (
                  <UserClass
                    key={userClass.id}
                    classInfo={userClass}
                    addDoneClass={addDoneClass}
                    deleteDoneClass={deleteDoneClass}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserClasses;
