import React from 'react';
import styles from './styles.module.css';
import Auth from '../../auth';
import AddQuiz from '../../addQuiz';


const Modal = () => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
           <AddQuiz/>
            </div>
        </div>
    );
};

export default Modal;