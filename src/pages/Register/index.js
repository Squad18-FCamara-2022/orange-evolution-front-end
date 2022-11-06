import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import api from '../../services/api';
import './styles.css';

const errorMessages = {
  name: 'Nome obrigatório',
  email: 'Digite um e-mail válido',
  password: 'A senha deve ter entre 4 e 10 caracteres',
  confirmPassword: 'Senhas não conferem',
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(4, errorMessages.name)
    .required(errorMessages.name),
  email: yup.string().email(errorMessages.email).required(errorMessages.email),
  password: yup
    .string()
    .trim()
    .min(4, errorMessages.password)
    .max(10, errorMessages.password)
    .required(errorMessages.password),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], errorMessages.confirmPassword),
});

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate('/');
  };

  const [warning, setWarning] = useState();
  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log(form);

    try {
      await api.post('/signup', {
        ...form,
      });
      setWarning(
        'Usuário cadastrado com sucesso! Você será redirecionado para a página de login.'
      );
      setTimeout(() => {
        navigateLogin();
      }, 2000);
    } catch (error) {
      setWarning(error.response.data);
    }
  };

  return (
    <div className="register-container">
      <h1>Cadastre-se</h1>
      <div className="register-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="name"
            placeholder="Digite seu nome"
            {...register('name')}
            value={form.nome}
            onChange={(e) => handleFormChange(e)}
          />
          <p>{errors.name?.message}</p>
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
          <input
            type="text"
            name="confirmPassword"
            placeholder="Repita sua senha"
            {...register('confirmPassword')}
            value={form.confirmPassword}
            onChange={(e) => handleFormChange(e)}
          />
          <p>{errors.confirmPassword?.message}</p>
          <p>{warning}</p>
          <button type="submit">Enviar</button>
        </form>
      </div>
      <p className="login-route">
        Já possui uma conta? Faça seu{' '}
        <Link to="/" className="link">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
