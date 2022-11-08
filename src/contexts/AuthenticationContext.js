import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { getLocalItem, setLocalItem } from '../utils/localStorage';

const AuthenticationContext = createContext({});

export function AuthenticationProvider({ children }) {
  const [token, setToken] = useState(getLocalItem('token'));
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    const response = await api.post('/signin', {
      email,
      password,
    });

    const { token, user } = response.data;
    setToken(token);
    setUser(user);

    setLocalItem('token', token);
    setLocalItem('userId', user.id);
    setLocalItem('userName', user.name);

    navigate('/home');
  };

  const signUp = async ({ name, email, password, confirmPassword }) => {
    const response = await api.post('/signup', {
      name,
      email,
      password,
      confirmPassword,
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
