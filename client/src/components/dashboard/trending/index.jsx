import React from "react";
import styles from "./styles.module.css";
import { formatDate } from "../../../utils/formatDate";
import { copyLink } from "../../../utils/CopyLink";

const Trending = ({ icon, list }) => {
  const trendingArray = Array.isArray(list) ? list : Object.values(list);

  const handleCopyLink = (id, type) => {
    copyLink(id, type);
  };

  return (
    <div className={styles.container}>
      <h2>Trending Quizzes</h2>

      {trendingArray.length > 0 ? (
        <div className={styles.quizCards}>
          {trendingArray.map((item, index) => (
            <div
              type="button"
              onClick={() => handleCopyLink(item?._id, item?.category)}
              key={item._id}
              className={styles.card}
            >
              <div>
                <p className={styles.name}>
                  {item.category === "quiz" ? item.quizName : item.pollName}
                </p>
                <div className={styles.impressions}>
                  <p>{item.impressions}</p>
                  <img src={icon} alt="Impressions Icon" />
                </div>
              </div>
              <p className={styles.date}>
                Created on: {formatDate(item.createdAt)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noData}>No trending quizzes available</p>
      )}
    </div>
  );
};

export default Trending;
