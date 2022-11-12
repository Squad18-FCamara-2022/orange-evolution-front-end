import { useState, useEffect } from 'react';
import './styles.css';

function UserClass({ classInfo, addDoneClass, deleteDoneClass }) {
  const { id, title, type, author, duration, link, status } = classInfo;
  const [checked, setChecked] = useState();

  const setStatus = () => {
    if (status === 'checked') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  const handleClassStatus = () => {
    if (checked === true) {
      setChecked(!checked);
      deleteDoneClass(id);
    } else {
      setChecked(!checked);
      addDoneClass(id);
    }
  };

  useEffect(() => {
    setStatus();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="class-container">
      <div className="class column1">
        <span>{title}</span>
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
      <div className="class column6">
        <span>{link}</span>
      </div>
      <div className="class column5">
        <input
          type="checkbox"
          defaultChecked={status === 'checked'}
          onChange={handleClassStatus}
        ></input>
      </div>
    </div>
  );
}

export default UserClass;
