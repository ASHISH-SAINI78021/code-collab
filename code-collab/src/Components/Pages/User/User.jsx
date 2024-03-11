// User.js
import React, { useEffect, useState } from "react";
import styles from "./User.module.css";
import {v4 as uuidv4} from "uuid";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animation2 from "../helper/animation-2.json";
import { useTypewriter , Cursor} from 'react-simple-typewriter'
import animationData from "../helper/animation-1.json";

const User = () => {
  const [roomid, setroomid] = useState("");
  const [username, setusername] = useState("");
  const navigate = useNavigate();

  const [loading, setloading] = useState(true);
  const [count, setcount] = useState(3);





  const [text1] = useTypewriter({
    words: ["Code Collab"],
    loop: 'infinite' , 
    typeSpeed: 50,
  });


  const handleSubmit = (event)=> {
    event.preventDefault();
    if (username.trim() === "") {
      toast.error("Enter the usernames first ");
      return ;
    }
    toast.success("Created new room successfuly");
    localStorage.setItem("user" , username);
    navigate(`/dashboard/user/${roomid}` , {
      state : username
    });
  }

  const fetchCard = ()=> {
    let cards = document.querySelectorAll(`.${styles.container2}`);
    cards.forEach(card=> {
      card.onmousemove = function(e){
        let x = e.pageX - card.offsetLeft;
        let y = e.pagey - card.offsetTop;

        card.style.setProperty('--x' , x + "px");
        card.style.setProperty('--y' , y + "px");
      }
    })
  }

  useEffect(()=> {
    fetchCard();
  } )

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

  const handleCreateId = ()=> {
    const id = uuidv4();
    setroomid(id);
  }
  return (
    <div >
      <div className={styles.login}>
        <div className={styles.container1}>
        <Lottie animationData={animation2} />
        </div>

      <div className={styles.container2}>
      <h1 className={styles.h1}>{text1}<Cursor cursorColor='white' /></h1>
        <form className={styles.form} onSubmit={(event)=> handleSubmit(event)}>
          <div className={styles.inputGroup}>
            <label htmlFor="roomid" className={styles.label}>
              Room Id:
            </label>
            <input
              type="roomid"
              id="roomid"
              value={roomid}
              onChange={(e)=> setroomid(e.target.value)}
              name="roomid"
              placeholder="Your room id"
              className={styles.inputfield}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>
              Username:
            </label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e)=> setusername(e.target.value)}
              name="username"
              className={styles.inputfield}
              placeholder="Your username"
              required
            />
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.loginButton}>
              Enter Room
            </button>
            <button onClick={handleCreateId} className={styles.loginButton}>
              Create id
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default User;
