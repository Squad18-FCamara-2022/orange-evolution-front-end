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
      <header className="login-header">
        {' '}
        <img className="logo" src={Logo} alt="logo" />
      </header>
      <div className="login-main">
        <div className="login-form">
          <h1>LOGIN</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label for="email">E-mail</label>
            <input type="text" name="email" {...register('email')} />

            <p>{errors.email?.message}</p>
            <label for="password">Senha</label>
            <input type="password" name="password" {...register('password')} />

            <p>{errors.password?.message}</p>
            <p>{warning}</p>
            <div className="remember-password">
              <input type="checkbox" id="remember" name="remember" />
              <label for="remember">Lembre de mim</label>
            </div>
            <button type="submit">Conecte-se</button>
          </form>
          <p className="signup-link">
            Novo na Orange Juice? <Link to="/cadastrar">CRIAR UMA CONTA</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
