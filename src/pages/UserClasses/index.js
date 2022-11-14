import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import UserClass from '../../components/UserClass';
import api from '../../services/api';
import { getLocalItem } from '../../utils/localStorage';
import './styles.css';

function UserClasses() {
  // eslint-disable-next-line
  const [classes, setClasses] = useState();
  const [localClasses, setLocalClasses] = useState();
  const token = getLocalItem('token');

  // passando props por meio de páginas.
  // O state foi passado no componente Link da página Home
  const location = useLocation();
  const { track } = location.state;

  const setClassesData = (data) => {
    const classesArray = [];
    const doneClasses = data.userTrackClasses;
    const categories = data.trackDetails.categories;
    categories.forEach((category) => {
      category.classes.forEach((item) => {
        const status = setClassStatus(item.id, doneClasses)
          ? 'checked'
          : 'undone';
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

  const getClassesUser = async (trackId) => {
    try {
      const response = await api.get(`/getUserTrack/${trackId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setClassesData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addDoneClass = async (classId) => {
    try {
      await api.post(
        `/createUserClass/${classId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDoneClass = async (classId) => {
    try {
      await api.delete(`/deleteUserClass/${classId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('bananana');
    getClassesUser(track);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="user-classes-container">
      <Header page="user-classes" />
      <div className="user-classes-main">
        <div className="user-classes-top">
          <h1>Nome da trilha</h1>
        </div>
        <div className="user-classes-content">
          <div className="user-classes-header">HEADER</div>
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
      <Footer page="user-classes" />
    </div>
  );
}

export default UserClasses;
