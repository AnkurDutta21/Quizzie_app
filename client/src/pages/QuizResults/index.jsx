import { useEffect, useState } from 'react';
import trophy from '../../assets/tropy.png';
import styles from './styles.module.css';
import { useLocation } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import { ENDPOINTS, URL } from '../../utils/apiService';
 const QuizResults=()=> {
    const location = useLocation();
    const {postApiData,loading,error} = useFetchData()
    const {results,quizId} = location.state || {}
    console.log(results,quizId,'qwertyuiop')
const [score,setScore]=useState({})
     useEffect(() => {
     const attemptQuiz = async()=>{
        try {
            const response = await postApiData(URL+ENDPOINTS.ATTEMPTQUIZ+ quizId,{results})
            setScore(response?.data)
        } catch (error) {
            console.log(error)
        }
     }
     attemptQuiz()
     }, [])
  return (
    <div>
      <h1>Congrats quiz is complete</h1>
      <div className="image">
        <img src={trophy} alt="" />
      </div>
      {score && (
        <h1>
          Your score is{' '}
          <span className={styles.score}>
            0{score.corrects}/0{score.totalQuestions}
          </span>
        </h1>
      )}
    </div>
  );
}

export default QuizResults