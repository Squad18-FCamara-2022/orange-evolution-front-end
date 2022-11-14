import './styles.css';

function AdminList({ classInfo, deleteClass }) {
  const { trackName, categoryName, id, title, type, author } = classInfo;

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
      <button className="admin-delete-button" onClick={() => deleteClass(id)}>
        <i className="bi bi-trash"></i>
      </button>
    </div>
  );
}

export default AdminList;
