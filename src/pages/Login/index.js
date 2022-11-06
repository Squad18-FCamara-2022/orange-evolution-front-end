import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import './styles.css';
import { setLocalItem } from '../../utils/localStorage';
import api from '../../services/api';
import { warning } from '@remix-run/router';

const errorMessages = {
  email: 'Digite um e-mail válido',
  password: 'A senha deve ter entre 4 e 10 caracteres',
};

const validationSchema = yup.object().shape({
  email: yup.string().email(errorMessages.email).required(errorMessages.email),
  password: yup
    .string()
    .min(4, errorMessages.password)
    .max(10, errorMessages.password)
    .required(errorMessages.password),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const navigateHome = () => {
    navigate('/home');
  };

  const [warning, setWarning] = useState();
  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log(form);

    try {
      const response = await api.post('/signin', {
        ...form,
      });
      setLocalItem('token', response.token);
      setLocalItem('userId', response.user.id);
      setLocalItem('userName', response.user.name);
      navigateHome();
    } catch (error) {
      setWarning(error.response.data);
    }
  };

  return (
    <div className="login-container">
      <h1>Faça seu login!</h1>
      <div className="login-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="email"
            placeholder="Digite seu e-mail"
            {...register('email')}
            value={form.email}
            onChange={(e) => handleFormChange(e)}
          />
          <p>{errors.email?.message}</p>
          <input
            type="text"
            name="password"
            placeholder="Digite sua senha"
            {...register('password')}
            value={form.password}
            onChange={(e) => handleFormChange(e)}
          />
          <p>{errors.password?.message}</p>
          <p>{warning}</p>
          <button type="submit">Entrar</button>
        </form>
      </div>
      <p className="register-route">
        Ainda não possui uma conta?
        <Link to="/cadastrar">Cadastre-se</Link>
      </p>
    </div>
  );
}

export default Login;
