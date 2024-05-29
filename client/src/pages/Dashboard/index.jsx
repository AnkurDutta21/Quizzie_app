import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import eyes from "../../assets/eyes.png";
import StatusCard from "../../components/dashboard/statusCard";
import Trending from "../../components/dashboard/trending";
import useFetchData from "../../hooks/useFetchData";
import { ENDPOINTS, URL } from "../../utils/apiService";
import Loader from "../../components/common/loader";
import { errorToast, successToast } from "../../utils/showToast";

const Dashboard = () => {
  const { getApiData, loading } = useFetchData();

  const [trendingData, setTrendingData] = useState([]);

  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trendingResponse = await getApiData(URL + ENDPOINTS.TRENDINGS);
        setTrendingData(trendingResponse?.data?.data);
        const analyticsResponse = await getApiData(URL + ENDPOINTS.ANALYTICS);
        setAnalyticsData(analyticsResponse?.data);
        successToast(trendingResponse?.message)
      } catch (error) {
        errorToast(error?.response?.data?.error)
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className={styles.container}>
        <div className={styles.dashboardWrp}>
          <div className={styles.stats}>
            <StatusCard
              color={"#FF5D01"}
              number={analyticsData?.totalQuizzesAndPolls}
              smallText="Quiz"
              text="created"
            />
            <StatusCard
              color={"#60B84B"}
              number={analyticsData?.totalQuestions}
              smallText="Questions"
              text=" created"
            />
            <StatusCard
              color={"#5076FF"}
              number={analyticsData?.totalImpressions}
              smallText="Total"
              text=" Impressions"
            />
          </div>
          <Trending icon={eyes} list={trendingData} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
