import React from 'react';
import styles from './styles.module.css';
import Auth from '../../auth';
import CreateQuiz from '../../createQuiz';
import CreateQuestion from '../../createQuestion';

const Modal = () => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
               {/* <CreateQuiz/> */}
               <CreateQuestion/>
               {/* <Auth/> */}
            </div>
        </div>
    );
};

export default Modal;