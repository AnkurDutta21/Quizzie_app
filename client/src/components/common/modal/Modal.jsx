import React from 'react';
import styles from './styles.module.css';
import Auth from '../../auth';
import CreateQuiz from '../../createQuiz';

const Modal = ({ modalState, closeModal }) => {
  console.log(modalState.ModalType, 'from modal');
  
  const renderComponent = () => {
    switch (modalState.ModalType) {
      case 'AUTH':
        return <Auth />;
      case 'CREATEQUIZ':
        return <CreateQuiz closeModal={closeModal}/>;
      default:
        return null;
    }
  };

  return (
    modalState.isOpen && (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          {/* <button className={styles.closeButton} onClick={closeModal}>X</button> */}
          {renderComponent()}
        </div>
      </div>
    )
  );
};

export default Modal;
