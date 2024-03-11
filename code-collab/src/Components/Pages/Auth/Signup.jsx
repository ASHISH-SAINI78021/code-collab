import React from 'react'
import styles from "./Auth.module.css";
import SignupSupport from "./SignupSupport";
import Lottie from "lottie-react";
import animation2 from "../helper/animation-2.json";
const Login = () => {
  return (
    <div className={styles.login}>
      <div className={styles.container1}>
        <Lottie animationData={animation2} />
      </div>
      <div className={styles.container2}>
        <SignupSupport />
      </div>
    </div>
  )
}

export default Login
