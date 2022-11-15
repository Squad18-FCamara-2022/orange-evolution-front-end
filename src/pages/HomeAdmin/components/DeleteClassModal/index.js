import './styles.css';

function DeleteClassModal({ deleteClass, modalState, classId }) {
  return (
    <div className="modal-background">
      <div className="delete-class-modal-container">
        <i className="bi bi-exclamation-triangle"></i>
        <h2>Tem certeza que deseja excluir esta aula?</h2>
        <div className="delete-class-buttons">
          <button
            type="button"
            className="confirm-delete"
            onClick={() => {
              modalState();
              deleteClass(classId);
            }}
          >
            Sim
          </button>
          <button
            type="button"
            className="cancel-delete"
            onClick={() => modalState()}
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteClassModal;
