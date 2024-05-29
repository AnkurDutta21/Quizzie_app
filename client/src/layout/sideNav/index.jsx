import React, { useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModalContext";
import useFetchData from "../../hooks/useFetchData";
import { ENDPOINTS, URL } from "../../utils/apiService";
import { errorToast, successToast } from "../../utils/showToast";

const SideNav = () => {
  const navigate = useNavigate();
  const {postApiData} = useFetchData()
  const {openModal} = useModal()
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

  const handleLogout = async()=>{
    try {
      const response = await postApiData(URL+ENDPOINTS.LOGOUT)
      if(response){
        localStorage.removeItem('Token')
      }
      successToast(response.message)
    } catch (error) {
      errorToast(error?.response?.data?.error)
    }
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
