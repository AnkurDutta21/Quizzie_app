import React from 'react'
import Modal from '../../components/common/modal/Modal'
import styles from './styles.module.css'
import Dashboard from '../../components/dashboard'
import QuizAnalysis from '../../components/analytics'
import CreateQuiz from '../../components/createQuiz'

const Home = () => {
  return (
    <>
     <div className={styles.homeContainer}>
      <div className={styles.homeWrp}>
        {/* <QuizAnalysis/> */}
      </div>
     </div>

     <Modal/>
    </>
  )
}

export default Home