import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useAuthContext } from '../../contexts/AuthenticationContext';
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
      <h1>Cadastre-se</h1>
      <div className="signup-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="name"
            placeholder="Digite seu nome"
            {...register('name')}
          />
          <p>{errors.name?.message}</p>
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
          <input
            type="text"
            name="confirmPassword"
            placeholder="Repita sua senha"
            {...register('confirmPassword')}
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

export default SignUp;
