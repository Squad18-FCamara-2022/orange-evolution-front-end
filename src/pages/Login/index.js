import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useAuthContext } from '../../contexts/AuthenticationContext';
import './styles.css';

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

  const { login } = useAuthContext();
  const [warning, setWarning] = useState();
  const onSubmit = async (data, e) => {
    e.preventDefault();

    const { email, password } = data;

    try {
      await login({ email, password });
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
          />
          <p>{errors.email?.message}</p>
          <input
            type="text"
            name="password"
            placeholder="Digite sua senha"
            {...register('password')}
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
