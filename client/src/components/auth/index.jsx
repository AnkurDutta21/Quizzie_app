import React, { useState } from "react";
import styles from "./styles.module.css";
import useFetchData from "../../hooks/useFetchData";
import { URL, ENDPOINTS } from "../../utils/apiService";
import Loader from "../common/loader";
import { errorToast, successToast } from "../../utils/showToast";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModalContext";

const Auth = () => {
  const navigate = useNavigate()
  const {closeModal} = useModal()
  const { postApiData, loading, error } = useFetchData();
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    const errors = {};
    if (isSignUp && !formData.name) {
      errors.name = "Invalid name";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid Email";
    }
    if (formData.password.length < 6) {
      errors.password = "Invalid password";
    }
    if (isSignUp && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Password doesn't match";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const endpoint = isSignUp ? ENDPOINTS.REGISTER : ENDPOINTS.LOGIN;
      try {
        const data = await postApiData(URL + endpoint, formData);
        if (!isSignUp && data) {
          localStorage.setItem("Token", data?.data?.token);
        }
        successToast(data?.message)
        closeModal()
        navigate('/')
      } catch (error) {
        console.log(error,'sdsdsd')
        if(error?.response){
          errorToast(error?.response?.data?.error)
        }
        else{
          errorToast(error?.message)
        }
      }
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className={styles.auth}>
        <h1>QUIZZIE</h1>
        <div className={styles.authSwitch}>
          <button
            onClick={() => setIsSignUp(true)}
            className={isSignUp ? styles.active : ""}
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsSignUp(false)}
            className={!isSignUp ? styles.active : ""}
          >
            Log In
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrp}>
            {isSignUp && (
              <div className={styles.inputGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={errors.name || "Name"}
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? styles.error : ""}
                />
              </div>
            )}
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={errors.email || "Email"}
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? styles.error : ""}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder={errors.password || "Password"}
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? styles.error : ""}
              />
            </div>
            {isSignUp && (
              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder={errors.confirmPassword || "Confirm Password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? styles.error : ""}
                />
              </div>
            )}
          </div>
          <button className={styles.authSubmitBtn} type="submit">{isSignUp ? "Sign Up" : "Log In"}</button>
        </form>
      </div>
    </>
  );
};

export default Auth;
