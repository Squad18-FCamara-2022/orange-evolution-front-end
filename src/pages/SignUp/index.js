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

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { signUp } = useAuthContext();
  const [warning, setWarning] = useState();
  const onSubmit = async (data, e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = data;

    try {
      await signUp({ name, email, password, confirmPassword });
    } catch (error) {
      setWarning(error.message);
      console.log(error);
    }
  };

  return (
    <div className="signup-container">
      <Header page="signup" />

      <div className="signup-main">
        <div className="signup-form">
          <h1>CADASTRE-SE</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="label" htmlFor="name">
              <h3>Nome</h3>
            </label>
            <input
              type="text"
              name="name"
              {...register('name')}
              className="input"
            />
            <p className="error">{errors.name?.message}</p>
            <label className="label" htmlFor="email">
              <h3>E-mail</h3>
            </label>
            <input
              type="text"
              name="email"
              {...register('email')}
              className="input"
            />
            <p className="error">{errors.email?.message}</p>
            <label className="label" htmlFor="password">
              <h3>Senha</h3>
            </label>
            <input
              type="text"
              name="password"
              {...register('password')}
              className="input"
            />
            <p className="error">{errors.password?.message}</p>
            <label className="label" htmlFor="confirmPassword">
              <h3>Confirme a senha</h3>
            </label>
            <input
              type="text"
              name="confirmPassword"
              {...register('confirmPassword')}
              className="input"
            />
            <p className="error">{errors.confirmPassword?.message}</p>
            <p className="error">{warning}</p>
            <h3 className="login-link">
              Já possui uma conta? <Link to="/">FAÇA SEU LOGIN</Link>
            </h3>
            <button type="submit" className="submit-button">
              <h2>Conecte-se</h2>
            </button>
          </form>
        </div>
      </div>
      <Footer page="signup" />
    </div>
  );
}

export default SignUp;
