import React from 'react';
import styles from './styles.module.css';
import errImg from '../../assets/err.png'

const ErrorPage = ({ message }) => {
    return (
        <div className={styles.errorContainer}>
            <img src={errImg} alt="Error" className={styles.errorImage} />
            <h1 className={styles.errorTitle}>Something went wrong!</h1>
            <p className={styles.errorMessage}>{message}</p>
        </div>
    );
};

export default ErrorPage;