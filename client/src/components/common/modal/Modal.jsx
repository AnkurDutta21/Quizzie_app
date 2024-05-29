import React from 'react';
import styles from './styles.module.css';
import Auth from '../../auth';
import CreateQuiz from '../../createQuiz';
import DeleteQuiz from '../../deleteQuiz';
import useModal from '../../../hooks/useModal';

const Modal = ({modalState,closeModal}) => {
  console.log(modalState, 'from modal');
  
  const renderComponent = () => {
    switch (modalState.ModalType) {
      case 'AUTH':
        return <Auth />;
      case 'CREATEQUIZ':
        console.log('create')
        return <CreateQuiz closeModal={closeModal}/>;
        case 'DELETEQUIZ':
          console.log('delete')
        return <DeleteQuiz closeModal={closeModal} modalData={modalState.ModalData}/>;
      default:
        return null;
    }
  };

  return (
    modalState.isOpen && (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          {renderComponent()}
        </div>
      </div>
    )
  );
};

export default Modal;
