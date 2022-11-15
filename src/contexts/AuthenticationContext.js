import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { getLocalItem, setLocalItem } from '../utils/localStorage';

const AuthenticationContext = createContext({});

export function AuthenticationProvider({ children }) {
  const [token, setToken] = useState(getLocalItem('token'));
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const setAuthInfos = (response) => {
    const { token, user } = response.data;

    setToken(token);
    setUser(user);
    setLocalItem('token', token);
    setLocalItem('userId', user.id);
    setLocalItem('userName', user.name);
    setLocalItem('role', user.role);
    user.role === 'user' ? navigate('/home') : navigate('/admin');
  };

  const login = async ({ email, password }) => {
    const response = await api.post('/login', {
      email,
      password,
    });
    setAuthInfos(response);
  };

  const signUp = async ({ name, email, password, confirmPassword, role }) => {
    const response = await api.post('/signup', {
      name,
      email,
      password,
      confirmPassword,
      role,
    });
    setAuthInfos(response);
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
