import React from 'react'
import styles from "./Auth.module.css";
import SignupSupport from "./SignupSupport";
const Login = () => {
  return (
    <div className={styles.signup}>
      <div className={styles.container}>
        <SignupSupport/>
      </div>
    </div>
  )
}

export default Login
