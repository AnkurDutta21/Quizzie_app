import React from 'react';
import styles from './styles.module.css';
import Auth from '../../auth';

const Modal = () => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <Auth/>
            </div>
        </div>
    );
};

export default Modal;