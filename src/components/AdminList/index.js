import './styles.css';

function AdminList({ classInfo, deleteClass }) {
  const { trackName, categoryName, id, title, type, author } = classInfo;

  return (
    <div className="admin-class-container">
      <div className="asmin-class-info">
        <p>
          {trackName} | {categoryName} | {type} | {author} | {title} |
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
