import React, { useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModalContext";
import { errorToast, successToast } from "../../utils/showToast";

const SideNav = () => {
  const navigate = useNavigate();
  const {openModal} = useModal()
  const [selected, setSelected] = useState("");

  const handleNavigation = (option) => {
    setSelected(option);
    switch (option) {
      case "Dashboard":
        navigate("/");
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

  const handleLogout = async()=>{
        localStorage.removeItem('Token')
        window.location.reload();
      successToast("Logged out succesfully")
  }

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
        <div className={`${styles.options} ${selected === "Create Quiz" && styles.active}`} onClick={() =>openModal('CREATEQUIZ',{id:'',type:'',edit:false})}>
          Create Quiz
        </div>
      </div>
      <div className={styles.sideNavFooter}>
        <hr />
        <div className={styles.options} onClick={handleLogout}>Log Out</div>
      </div>
    </div>
  );
};

export default SideNav;
