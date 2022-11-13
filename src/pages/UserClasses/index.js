import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { getTrackDetails } from "../../hooks/useTrack";
import "./styles.css";

// componente principal da página
function UserClasses() {
  const location = useLocation();
  const { trackId } = location.state;
  const [trackDetails, setTrackDetails] = useState();

  // ao recarregar a página
  useEffect(() => {
    // buscar os dados da trilha do usuário
    getTrackDetails(trackId).then((data) => setTrackDetails(data));
  }, []);

  console.log(trackDetails);

  return (
    <div className="user-classes-container">
      <Header />
      {trackDetails && (
        <div className="user-classes-main">
          <div className="user-classes-top">
            <h1>{trackDetails.trackDetails.name}</h1>
          </div>
          <div className="user-classes-content"></div>
        </div>
      )}
    </div>
  );
}

export default UserClasses;
