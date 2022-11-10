import './styles.css';

function UserClass(classInfo) {
  const { name, type, author, duration, status, link } = classInfo;

  //add função de mudar o status

  return (
    <div className="class-container">
      <div className="class column1">
        <span>{name}</span>
      </div>
      <div className="class column2">
        <span>{type}</span>
      </div>
      <div className="class column3">
        <span>{author}</span>
      </div>
      <div className="class column4">
        <span>{duration}</span>
      </div>
      <div className="class column5">
        <span>{status}</span>
      </div>
      <div className="class column6">
        <span>{link}</span>
      </div>
    </div>
  );
}

export default UserClass;
