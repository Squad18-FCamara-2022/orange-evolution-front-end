import api from "../services/api";
import { getLocalItem } from "../utils/localStorage";

export async function getTrackDetails(trackId) {
  try {
    // pegar o token no localStorage
    const token = getLocalItem("token");
    // buscar os dados da trilha no backend
    const response = await api.get(`/getUserTrack/${trackId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    // retornar os dados da requisição
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
