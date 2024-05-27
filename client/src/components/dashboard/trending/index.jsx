import React, { useEffect } from "react";
import styles from "./styles.module.css";
import useFetchData from "../../../hooks/useFetchData";
import { ENDPOINTS, URL } from "../../../utils/apiService";
import { formatDate } from "../../../utils/formatDate";
const Trending = ({icon}) => {
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await useFetchData(URL+ENDPOINTS.);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, [third]);

const list = [
    {
      _id: "1",
      name: "Quiz 1",
      impressions: 120,
      createdAt: "2023-05-26T12:00:00Z"
    },
    {
      _id: "2",
      name: "Quiz 2",
      impressions: 85,
      createdAt: "2023-05-20T12:00:00Z"
    },
    {
      _id: "3",
      name: "Quiz 3",
      impressions: 200,
      createdAt: "2023-05-15T12:00:00Z"
    },
    {
        _id: "1",
        name: "Quiz 1",
        impressions: 120,
        createdAt: "2023-05-26T12:00:00Z"
      },
      {
        _id: "2",
        name: "Quiz 2",
        impressions: 85,
        createdAt: "2023-05-20T12:00:00Z"
      },
      {
        _id: "3",
        name: "Quiz 3",
        impressions: 200,
        createdAt: "2023-05-15T12:00:00Z"
      },  {
        _id: "1",
        name: "Quiz 1",
        impressions: 120,
        createdAt: "2023-05-26T12:00:00Z"
      },
      {
        _id: "2",
        name: "Quiz 2",
        impressions: 85,
        createdAt: "2023-05-20T12:00:00Z"
      },
      {
        _id: "3",
        name: "Quiz 3",
        impressions: 200,
        createdAt: "2023-05-15T12:00:00Z"
      },
      {
          _id: "1",
          name: "Quiz 1",
          impressions: 120,
          createdAt: "2023-05-26T12:00:00Z"
        },
        {
          _id: "2",
          name: "Quiz 2",
          impressions: 85,
          createdAt: "2023-05-20T12:00:00Z"
        },
        {
          _id: "3",
          name: "Quiz 3",
          impressions: 200,
          createdAt: "2023-05-15T12:00:00Z"
        }
  ];

  return (
    <div className={styles.container}>
      <h2>Trending Quizzes</h2>

      {list && (
        <div className={styles.quizCards}>
          {list.map((el) => (
            <div
              type="button"
            //   onClick={() => copyLink(el._id, el.category)}
              key={el._id}
              className={styles.card}
            >
              <div>
                <p className={styles.name}>{el.name}</p>
                <div className={styles.impressions}>
                  <p>{el.impressions}</p>
                  <img src={icon} />
                </div>
              </div>
              <p className={styles.date}>
                Created on: {formatDate(el.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trending;
