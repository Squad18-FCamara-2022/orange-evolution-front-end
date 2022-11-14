import './styles.css';
import ProgressBar from './ProgressBar';

function UserProgress({ value }) {
  return (
    <div className="progress-container">
      <ProgressBar value={value} />
      <p>{value}%</p>
      <h4>Progresso</h4>
    </div>
  );
}

export default UserProgress;
