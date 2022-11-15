import './styles.css';
import ProgressBar from './ProgressBar';

function UserProgress({ value }) {
  return (
    <div className="progress-container">
      <h4>Progresso</h4>
      <ProgressBar value={value} />
      <p>{value}%</p>
    </div>
  );
}

export default UserProgress;
