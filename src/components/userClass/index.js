import { getLocalItem } from "../../utils/localStorage";
import { useState, useEffect } from "react";
import "./styles.css";

function UserClass({ classInfo, addDoneClass, deleteDoneClass }) {
  // eslint-disable-next-line
  const { id, title, type, author, duration, link, status } = classInfo;
  // eslint-disable-next-line
  const [checked, setChecked] = useState();

  // eslint-disable-next-line
  const token = getLocalItem("token");

  const setStatus = () => {
    if (status === "checked") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  useEffect(() => {
    setStatus();
    // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line
  const handleClassStatus = async () => {
    setChecked(!checked);
    try {
      await addDoneClass(token, id);
    } catch (error) {
      console.log(error);
      setChecked(!checked);
    }
  };

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
          defaultChecked={checked}
          onChange={handleClassStatus}
        ></input>
      </div>
    </div>
  );
}

export default UserClass;
