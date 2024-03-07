import React from 'react'
import styles from "./Auth.module.css";
import LoginSupport from './LoginSupport';
const Login = () => {
  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <LoginSupport/>
      </div>
    </div>
  )
}

export default Login
