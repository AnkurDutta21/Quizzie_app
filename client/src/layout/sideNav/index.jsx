import React, { useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const SideNav = ({openModal,closeModal}) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  const handleNavigation = (option) => {
    setSelected(option);
    switch (option) {
      case "Dashboard":
        navigate("/dashboard");
        break;
      case "Analytics":
        navigate("/analytics");
        break;
      case "Create Quiz":
        navigate("/create-quiz");
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.sideNavContainer}>
      <div className={styles.sideNavHeader}>
        <h1>QUIZZIE</h1>
      </div>
      <div className={styles.sidenavOptions}>
        <div className={`${styles.options} ${selected === "Dashboard" && styles.active}`} onClick={() => handleNavigation("Dashboard")}>
          Dashboard
        </div>
        <div className={`${styles.options} ${selected === "Analytics" && styles.active}`} onClick={() => handleNavigation("Analytics")}>
          Analytics
        </div>
        <div className={`${styles.options} ${selected === "Create Quiz" && styles.active}`} onClick={() =>openModal('CREATEQUIZ')}>
          Create Quiz
        </div>
      </div>
      <div className={styles.sideNavFooter}>
        <hr />
        <div className={styles.options}>Log Out</div>
      </div>
    </div>
  );
};

export default SideNav;
