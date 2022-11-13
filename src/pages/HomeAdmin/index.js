import { useEffect, useState } from 'react';
import AdminList from '../../components/AdminList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SearchInput from '../../components/SearchInput';
import api from '../../services/api';
import { getLocalItem } from '../../utils/localStorage';
import './styles.css';

function HomeAdmin() {
  const token = getLocalItem('token');
  // eslint-disable-next-line
  const [classes, setClasses] = useState();
  // eslint-disable-next-line
  const [localClasses, setLocalClasses] = useState();

  const setAdminList = (data) => {
    const adminList = [];
    data.forEach((track) => {
      track.categories.forEach((category) => {
        category.classes.forEach((item) => {
          const line = {
            id: item.id,
            title: item.title,
            type: item.contentType,
            author: item.author,
            duration: item.duration,
            link: item.link,
            categoryId: category.id,
            categoryName: category.name,
            trackId: track.id,
            trackName: track.name,
            usersCount: item._count.UsersOnClasses,
          };
          adminList.push(line);
        });
      });
    });
    setClasses(adminList);
    setLocalClasses(adminList);
  };

  const getClassesAdmin = async () => {
    try {
      const { data } = await api.get(`/getTracksAdmin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setAdminList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addClass = async () => {
    try {
      const response = await api.post(
        `/createNewClassAdmin`,
        // {
        //   title,
        //   contentType,
        //   author,
        //   duration,
        //   link,
        //   categoryId
        // },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteClass = async (classId) => {
    try {
      const response = await api.delete(`/deleteClassAdmin/${classId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const classesUptaded = classes.filter((item) => {
        return item.id !== classId;
      });
      setLocalClasses(classesUptaded);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClassesAdmin();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container-admin">
      <Header page="admin" />
      <div className="admin-main">
        <div className="admin-main-top">
          <SearchInput />
          <button className="add-content-button" onClick={addClass}>
            + Adicionar conteúdo
          </button>
        </div>
        <div className="admin-main-bottom">
          <div className="admin-header-info"></div>
          <div className="admin-content-table">
            {localClasses &&
              localClasses.map((adminClass) => {
                return (
                  <AdminList
                    key={adminClass.id}
                    classInfo={adminClass}
                    addClass={addClass}
                    deleteClass={deleteClass}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <Footer page="admin" />
    </div>
  );
}

export default HomeAdmin;
