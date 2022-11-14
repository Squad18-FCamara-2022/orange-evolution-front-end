import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import TrackTabs from "../../components/TrackTabs";
import TrackTabsHeader from "../../components/TrackTabs/TrackTabsHeader";
import TabLine from "../../components/TrackTabs/TabLine";
import { getUserTrackDetails } from "../../hooks/useTrack";
import "./styles.css";

// componente principal da página
// um componente no React é uma função JavaScript que retorna um HTML
function UserClasses() {
  // pegar o trackId do location
  const location = useLocation();
  const { trackId } = location.state;

  // estado para as aulas
  const [aba, setAba] = useState(0);
  // estado para as categorias
  const [categories, setCategories] = useState();
  // estado para os dados da trilha do usuário
  const [userTrackDetails, setUserTrackDetails] = useState();
  // estado para as aulas da trilha do usuário
  const [userCategoryClasses, setUserCategoryClasses] = useState();
  // função para definir o estado da aula
  const setClassStatus = (classId, doneClasses) => {
    return doneClasses.find((item) => item.classId === classId);
  };

  useEffect(() => {
    getUserTrackDetails(trackId).then((data) => {
      setUserTrackDetails(data);

      // atualizar as categorias
      setCategories(data.trackDetails.categories);

      // iniciar um array vazio para armazenar as aulas
      const userClassesArray = [];

      // pegar aulas da trilha que o usuário já fez
      const doneClasses = data.userTrackClasses;

      // pegar aulas da categoria (aba) que o user clicou
      const categoryClasses = data.trackDetails.categories[aba].classes;

      categoryClasses.forEach((classItem) => {
        const classStatus = setClassStatus(classItem.id, doneClasses)
          ? "checked"
          : "undone";

        // montar objeto da aula para inserir no array
        const line = {
          id: classItem.id,
          title: classItem.title,
          type: classItem.contentType,
          author: classItem.author,
          duration: classItem.duration,
          link: classItem.link,
          status: classStatus,
        };

        // inserir a aula no array
        userClassesArray.push(line);
      });

      setUserCategoryClasses(userClassesArray);
    });
  }, [aba]);

  return (
    <div className="user-classes-container">
      <Header />
      {userTrackDetails && categories && userCategoryClasses && (
        <div className="user-classes-main">
          <div className="user-classes-top">
            <h1>{userTrackDetails.trackDetails.name}</h1>
          </div>
          <div className="user-classes-content">
            <TrackTabs aba={aba} categories={categories} setAba={setAba} />
            <TrackTabsHeader />
            {userCategoryClasses.map((dados, i) => (
              <TabLine key={`linha-${i}`} dados={dados} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserClasses;
