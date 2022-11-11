import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useAuthContext } from '../../contexts/AuthenticationContext';
import './styles.css';
import Logo from '../../assets/logo-orange.png';

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
      setWarning(error.message);
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <header className="login-header"> </header>
      <img className="logo" src={Logo} alt="logo" />
      <div className="login-main">
        <div className="login-form">
          <h1>LOGIN</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="label" htmlFor="email">
              E-mail
            </label>
            <input
              className="input"
              type="text"
              name="email"
              {...register('email')}
            />

            <p className="error">{errors.email?.message}</p>
            <label className="label" htmlFor="password">
              Senha
            </label>
            <input
              className="input"
              type="password"
              name="password"
              {...register('password')}
            />

            <p className="error">{errors.password?.message}</p>
            <p className="error">{warning}</p>
            <div className="remember-password">
              <input type="checkbox" id="remember" name="remember" />
              <label htmlFor="remember">Lembre de mim</label>
            </div>
            <p className="signup-link">
              Novo na Orange Juice? <Link to="/cadastrar">CRIAR UMA CONTA</Link>
            </p>
            <button type="submit">Conecte-se</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
