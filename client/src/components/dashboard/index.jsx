import React from "react";
import styles from "./styles.module.css";
import eyes from "../../assets/eyes.png";
import StatusCard from "./statusCard";
import Trending from "./trending";
const Dashboard = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.stats}>
          <StatusCard
            color={"#FF5D01"}
            number="12"
            smallText="Quiz"
            text="created"
          />
          <StatusCard
            color={"#60B84B"}
            number="21"
            smallText="Questions"
            text=" created"
          />
          <StatusCard
            color={"#5076FF"}
            number="13"
            smallText="Total"
            text=" Impressions"
          />
        </div>

<Trending icon={eyes}/>

      </div>
    </>
  );
};

export default Dashboard;
