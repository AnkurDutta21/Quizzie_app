import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { formatDate } from "../../../utils/formatDate";
import { copyLink } from "../../../utils/CopyLink";
const Trending = ({icon,list}) => {

  const trendingArray = Array.isArray(list) ? list : Object.values(list);

  return (
    <div className={styles.container}>
      <h2>Trending Quizzes</h2>

      {trendingArray && (
        <div className={styles.quizCards}>
          {trendingArray?.map((item,index) => (
            <div
              type="button"
              onClick={() => copyLink(trendingArray.id, trendingArray.type)} 
              key={item._id}
              className={styles.card}
            >
              <div>
                <p className={styles.name}>{item.category === "quiz" ? item.quizName : item.pollName}</p>
                <div className={styles.impressions}>
                  <p>{item.impressions}</p>
                  <img src={icon} />
                </div>
              </div>
              <p className={styles.date}>
                Created on: {formatDate(item.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trending;
