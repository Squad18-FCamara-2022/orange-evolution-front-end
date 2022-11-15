import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import './styles.css';

const errorMessages = {
  required: 'Campo obrigatório',
  category: '',
};

const validationSchema = yup.object().shape({
  title: yup.string().trim().required(errorMessages.required),
  type: yup.string().trim().required(errorMessages.required),
  author: yup.string().trim().required(errorMessages.required),
  duration: yup
    .string(errorMessages.required)
    .trim()
    .matches(/^\d{2}:\d{2}:\d{2}$/, 'Digite o tempo no formato hh:mm:ss'),
  link: yup.string().trim().required(errorMessages.required),
  category: yup.string().trim().required(errorMessages.required),
});

function AddClassModal({ addClass, categories, modalState }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [warning, setWarning] = useState();

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const { title, type, author, duration, link, category } = data;

    try {
      await addClass({ title, type, author, duration, link, category });
      modalState();
    } catch (error) {
      setWarning(error.message);
      console.log(error);
    }
  };

  return (
    <div className="modal-background">
      <div className="add-class-modal-container">
        <button
          className="close-button"
          onClick={() => {
            modalState();
          }}
        >
          <i className="bi bi-x-lg"></i>
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Adicionar conteúdo</h2>
          <label className="label" htmlFor="title">
            <h3>Título</h3>
          </label>
          <input
            type="text"
            name="title"
            {...register('title')}
            className="input"
          />
          <p className="error">{errors.title?.message}</p>
          <label className="label" htmlFor="author">
            <h3>Conteúdo por</h3>
          </label>
          <input
            type="text"
            name="author"
            {...register('author')}
            className="input"
          />
          <p className="error">{errors.author?.message}</p>
          <div className="input-divided">
            <div className="input-type">
              <label className="label" htmlFor="type">
                <h3>Tipo</h3>
              </label>
              <input
                type="text"
                name="type"
                {...register('type')}
                className="input"
              />
              <p className="error">{errors.type?.message}</p>
            </div>
            <div className="input-duration">
              <label className="label" htmlFor="duration">
                <h3>Duração (hh:mm:ss)</h3>
              </label>
              <input
                type="text"
                name="duration"
                {...register('duration')}
                className="input"
              />
              <p className="error">{errors.duration?.message}</p>
            </div>
          </div>
          <label className="label" htmlFor="link">
            <h3>Link</h3>
          </label>
          <input
            type="text"
            name="link"
            {...register('link')}
            className="input"
          />
          <p className="error">{errors.link?.message}</p>
          <label className="label" htmlFor="category">
            <h3>Categoria (id)</h3>
          </label>
          <input
            type="text"
            name="category"
            {...register('category')}
            className="input"
          />
          <p className="error">{errors.category?.message}</p>
          <p className="error">{warning}</p>
          <div className="add-class-buttons">
            <button
              type="button"
              className="cancel-add"
              onClick={() => modalState()}
            >
              Cancelar
            </button>
            <button type="submit" className="confirm-add">
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddClassModal;
