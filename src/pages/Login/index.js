import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useAuthContext } from '../../contexts/AuthenticationContext';
import './styles.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

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
      <Header page="login" />

      <div className="login-main">
        <div className="login-form">
          <h1>LOGIN</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="label" htmlFor="email">
              <h3>E-mail</h3>
            </label>
            <input
              className="input"
              type="text"
              name="email"
              {...register('email')}
            />

            <p className="error">{errors.email?.message}</p>
            <label className="label" htmlFor="password">
              <h3>Senha</h3>
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
              <label htmlFor="remember">
                <h4>Lembre de mim</h4>
              </label>
            </div>
            <h3 className="signup-link">
              Novo na Orange Juice? <Link to="/cadastrar">CRIAR UMA CONTA</Link>
            </h3>
            <button type="submit" className="submit-button">
              <h2>Conecte-se</h2>
            </button>
          </form>
        </div>
      </div>
      <Footer page="login" />
    </div>
  );
}

export default Login;
