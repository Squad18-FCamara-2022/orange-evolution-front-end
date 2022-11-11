import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import api from '../../services/api';
import { getLocalItem } from '../../utils/localStorage';
import './styles.css';

function UserClasses() {
  // eslint-disable-next-line
  const [classes, setClasses] = useState();
  const token = getLocalItem('token');
  const location = useLocation();
  const { track } = location.state;

  const setClassesData = (data) => {
    const localClasses = [];
    const doneClasses = data.userTrackClasses;
    console.log(doneClasses);
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
        localClasses.push(line);
      });
    });
    console.log(localClasses);
    setClasses(localClasses);
  };

  const setClassStatus = (classId, doneClasses) => {
    return doneClasses.find((item) => item.classId === classId);
  };

  // eslint-disable-next-line
  const getClassesUser = async (token, trackId) => {
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
  // eslint-disable-next-line
  const addDoneClass = async (token, classId) => {
    try {
      const { data } = await api.post(`/createUserClass/${classId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  // eslint-disable-next-line
  const deleteDoneClass = async (token, classId) => {
    try {
      const { data } = await api.delete(`/deleteUserClass/${classId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClassesUser(token, track);
    // eslint-disable-next-line
  }, []);

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
            {/* {localClasses.length !== 0 &&
              localClasses.map((userClass) => {
                return (
                  <div className="user-class-row" key={userClass.classId}>
                    <UserClass classInfo={userClass} />
                  </div>
                );
              })} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserClasses;
