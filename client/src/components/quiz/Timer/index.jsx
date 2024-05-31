import styles from './styles.module.css';
import { useTimer } from '@mzaleski/use-timer';

export default function Timer({ timer, onTimerEnd }) {
  const { timeRemaining } = useTimer(timer, false, onTimerEnd);
  return (
    <div className={styles.timer}>
      <p>{timeRemaining}s</p>
    </div>
  );
}
