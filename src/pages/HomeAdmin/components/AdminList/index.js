import './styles.css';
import DeleteClassModal from '../DeleteClassModal';
import { useState } from 'react';

function AdminList({ classInfo, deleteClass }) {
  // eslint-disable-next-line
  const { trackName, categoryName, id, title, type, author } = classInfo;

  const [deleteClassModal, setDeleteClassModal] = useState(false);
  const handleModalDeleteClass = () => {
    setDeleteClassModal(!deleteClassModal);
  };

  return (
    <div className="admin-class-container">
      <div className="admin-class-info">
        <p className="desktop-list">
          Trilha: {trackName} | Categoria: {categoryName} | Tipo: {type} | Por:{' '}
          {author} | {title}
        </p>
        <p className="mobile-list">
          {trackName} | {categoryName} <br /> {type} | {author} | {title}
        </p>
      </div>
      <button className="admin-edit-button">
        <i className="bi bi-pencil-square"></i>
      </button>
      <button
        className="admin-delete-button"
        onClick={() => handleModalDeleteClass()}
      >
        <i className="bi bi-trash"></i>
      </button>
      {deleteClassModal && (
        <DeleteClassModal
          deleteClass={deleteClass}
          modalState={handleModalDeleteClass}
          classId={id}
        />
      )}
    </div>
  );
}

export default AdminList;
