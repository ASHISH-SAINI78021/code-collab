import React, { useEffect, useState } from "react";
import styles from "./Auth.module.css";
import LoginSupport from "./LoginSupport";
import Lottie from "lottie-react";
import animationData from "../helper/animation-1.json";
import animation2 from "../helper/animation-2.json";
const Login = () => {
  const [loading, setloading] = useState(true);
  const [count, setcount] = useState(7);


  useEffect(() => {
    const interval = setInterval(() => {
      setcount((prev) => prev - 1);
    }, 1000);

    // Clear the interval when count reaches zero
    if (count <= 0) {
      clearInterval(interval);
      setloading(false);
    }

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(interval);
  }, [count]); // Include count as a dependency

  if (loading){
    return (
      <Lottie style={{height:"100vh" , backgroundColor:"#111"}} animationData={animationData}/>
    )
  }

  return (
    <div className={styles.login}>
      <div className={styles.container1}>
        <Lottie animationData={animation2} />
      </div>
      <div className={styles.container2}>
        <LoginSupport />
      </div>
    </div>
  );
};

export default Login;
