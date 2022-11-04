import './styles.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const errorMessages = {
  required: 'Campo obrigatório',
};

const validationSchema = yup.object().shape({
  email: yup.string().email().required(errorMessages.required),
  password: yup.string().min(4).max(10).required(),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
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
