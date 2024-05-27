import React from 'react';
import styles from './styles.module.css';
import edit from '../../assets/edit.png'
import share from '../../assets/share.png'
import del from '../../assets/del.png'

const quizzes = [
  { id: 1, name: 'Quiz 1', createdOn: '01 Sep, 2023', impressions: '345' },
  { id: 2, name: 'Quiz 2', createdOn: '04 Sep, 2023', impressions: '667' },
  { id: 3, name: 'Quiz 3', createdOn: '06 Sep, 2023', impressions: '1.6K' },
  { id: 4, name: 'Quiz 4', createdOn: '09 Sep, 2023', impressions: '789' },
  { id: 5, name: 'Quiz 5', createdOn: '11 Sep, 2023', impressions: '995' },
  { id: 6, name: 'Quiz 6', createdOn: '13 Sep, 2023', impressions: '2.5K' },
  { id: 7, name: 'Quiz 7', createdOn: '14 Sep, 2023', impressions: '231' },
  { id: 8, name: 'Quiz 8', createdOn: '17 Sep, 2023', impressions: '1.3K' },
];

const QuizAnalysis = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Quiz Analysis</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Quiz Name</th>
            <th>Created on</th>
            <th>Impression</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz, index) => (
            <tr key={quiz.id}>
              <td>{index + 1}</td>
              <td>{quiz.name}</td>
              <td>{quiz.createdOn}</td>
              <td>{quiz.impressions}</td>
              <td className={styles.iconWrp}>
                <img src={edit} className={styles.icon}/>
                <img src={del} className={styles.icon}/>
                <img src={share} className={styles.icon}/>
              </td>
              <td><a href="#" className={styles.detailsLink}>Question Wise Analysis</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizAnalysis;
