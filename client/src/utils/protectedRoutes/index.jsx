import { useEffect } from 'react';
import { useModal } from "../../hooks/useModalContext";

const ProtectedRoutes = ({ children }) => {
  const { openModal } = useModal();
  
  useEffect(() => {
    if (!localStorage.getItem('Token')) {
      openModal('AUTH');
    }
  }, []);

  if (localStorage.getItem('Token')) {
    return children;
  } else {
    return null;
  }
};

export default ProtectedRoutes;