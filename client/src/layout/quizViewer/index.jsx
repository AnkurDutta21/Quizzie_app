import styles from './styles.module.css';

export default function QuizViewer({children}) {
  return (
    <div className={styles.main}>
      <div className={styles.childrenContainer}>
        {children}
      </div>
    </div>
  );
}
