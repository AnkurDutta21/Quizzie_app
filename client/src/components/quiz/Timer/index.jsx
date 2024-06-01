import styles from './styles.module.css';
import { useTimer } from '@mzaleski/use-timer';

export default function Timer({ timer, onTimerEnd }) {
  const { timeRemaining } = useTimer(timer, false, onTimerEnd);
  console.log(timeRemaining,'oooo')
  const displayTime = timer ? timeRemaining + '00' : '00';
  return (
    <div className={!timer ? styles.hide : styles.timer}>
      <p>{displayTime}s</p>
    </div>
  );
}
