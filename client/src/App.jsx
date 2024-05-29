import React from 'react'
import Router from './Routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import { ModalProvider } from './hooks/useModalContext';
const App = () => {
  return (
    <>
    <ModalProvider>
    <Router/>
    <ToastContainer position="bottom-right" />
    </ModalProvider>
    </>
  )
}

export default App