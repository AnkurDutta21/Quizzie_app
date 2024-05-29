import React from 'react';
import styles from './styles.module.css';
import Auth from '../../auth';
import CreateQuiz from '../../createQuiz';
import DeleteQuiz from '../../deleteQuiz';
import { useModal } from '../../../hooks/useModalContext';

const Modal = () => {
  const {modalState} = useModal()
  console.log(modalState.modalType,'ppppfrom modal')
  const renderComponent = () => {
    switch (modalState.modalType) {
      case 'AUTH':
        return <Auth />;
      case 'CREATEQUIZ':
        console.log('create')
        return <CreateQuiz/>;
        case 'EDITQUIZ':
        console.log('edit')
        return <CreateQuiz/>;
        case 'DELETEQUIZ':
          console.log('delete')
        return <DeleteQuiz/>;
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
