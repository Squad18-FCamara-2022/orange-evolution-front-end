import { createContext, useContext, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthenticationContext = createContext({});

export function AuthenticationProvider({ children }) {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const login = async (data) => {
    const response = await api.post('/signin', {
      ...data,
    });

    const { token, user } = response.data;
    setToken(token);
    setUser(user);

    navigate('/home');
  };

  const signUp = async (data) => {
    const response = await api.post('/signup', {
      ...data,
    });

    const { token, user } = response.data;
    setToken(token);
    setUser(user);

    navigate('/home');
  };

  return (
    <AuthenticationContext.Provider
      value={{ token, setToken, user, setUser, login, signUp }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthenticationContext);
}
