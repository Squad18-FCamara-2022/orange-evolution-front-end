import { useEffect, useState } from 'react';
import AddClassModal from '../../components/AddClassModal';
import AdminList from '../../components/AdminList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SearchInput from '../../components/SearchInput';
import api from '../../services/api';
import { getLocalItem } from '../../utils/localStorage';
import SimpleBackdrop from '../../components/Backdrop';
import './styles.css';

function HomeAdmin() {
  const token = getLocalItem('token');
  // eslint-disable-next-line
  const [classes, setClasses] = useState();
  const [categories, setCategories] = useState();
  const [localClasses, setLocalClasses] = useState();
  const [addClassModal, setAddClassModal] = useState(false);

  const [isLoading, setIsloading] = useState(false);

  const handleModalAddClass = () => {
    setAddClassModal(!addClassModal);
  };

  const setAdminList = (data) => {
    const adminClassList = [];
    const categoryList = [];
    data.forEach((track) => {
      track.categories.forEach((category) => {
        const categoryListItem = {
          trackName: track.name,
          trackId: track.id,
          categoryName: category.name,
          categoryId: category.id,
        };
        categoryList.push(categoryListItem);

        category.classes.forEach((item) => {
          const classListItem = {
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
          adminClassList.push(classListItem);
        });
      });
      setCategories(categoryList);
    });
    setClasses(adminClassList);
    setLocalClasses(adminClassList);
  };

  const getClassesAdmin = async () => {
    setIsloading(true);
    try {
      const { data } = await api.get(`/getTracksAdmin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdminList(data);
      setIsloading(false);
    } catch (error) {
      console.log(error);
      setIsloading(false);
    }
  };

  const addClass = async (classInfo) => {
    setIsloading(true);
    try {
      const response = await api.post(
        `/createNewClassAdmin`,
        {
          title: classInfo.title,
          contentType: classInfo.type,
          author: classInfo.author,
          duration: classInfo.duration,
          link: classInfo.link,
          categoryId: classInfo.category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getClassesAdmin();

      console.log(response);
      setIsloading(false);
    } catch (error) {
      console.log(error);
      setIsloading(false);
    }
  };

  const deleteClass = async (classId) => {
    setIsloading(true);
    try {
      await api.delete(`/deleteClassAdmin/${classId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const classesUptaded = localClasses.filter((item) => {
        return item.id !== classId;
      });
      setLocalClasses(classesUptaded);
      setIsloading(false);
    } catch (error) {
      console.log(error);
      setIsloading(false);
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
          <button
            className="add-content-button"
            onClick={() => handleModalAddClass()}
          >
            + Adicionar conteúdo
          </button>
        </div>
        <div className="admin-main-bottom">
          <div className="admin-header-table">
            <h4>Resumo das informações</h4>
            <div>
              <h4>Editar</h4>
              <h4>Deletar</h4>
            </div>
          </div>
          <div className="admin-content-table">
            {isLoading === false ? (
              localClasses.map((adminClass) => {
                return (
                  <AdminList
                    key={adminClass.id}
                    classInfo={adminClass}
                    deleteClass={deleteClass}
                  />
                );
              })
            ) : (
              <SimpleBackdrop />
            )}
          </div>
        </div>
      </div>
      {addClassModal && (
        <AddClassModal
          addClass={addClass}
          categories={categories}
          modalState={handleModalAddClass}
        />
      )}
      <Footer page="admin" />
    </div>
  );
}

export default HomeAdmin;
