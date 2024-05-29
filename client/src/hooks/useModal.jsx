import React, { useReducer } from "react";

// Action types
const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

// Reducer function
const modalReducer = (state, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      console.log(action.payload, "from reducer");
      return { ...state, isOpen: true, ModalType: action.payload.modalType,modalData:action.payload.modalData };
    case CLOSE_MODAL:
      return { ...state, isOpen: false, ModalType: "" };
    default:
      return state;
  }
};

// Custom hook
const useModal = () => {
  const [modalState, dispatch] = useReducer(modalReducer, {
    isOpen: false,
    ModalType: "",
    ModalData:"",
  });

  const openModal = (modalType,modalData) => {
    dispatch({ type: OPEN_MODAL, payload: {modalType,modalData}});
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  return { modalState, openModal, closeModal };
};

export default useModal;
