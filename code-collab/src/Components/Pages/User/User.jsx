// User.js
import React, { useEffect, useState } from "react";
import styles from "./User.module.css";
import {v4 as uuidv4} from "uuid";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const User = () => {
  const [roomid, setroomid] = useState("");
  const [username, setusername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event)=> {
    event.preventDefault();
    if (username.trim() === "") {
      toast.error("Enter the usernames first ");
      return ;
    }
    toast.success("Created new room successfuly");
    localStorage.setItem("user" , username);
    navigate(`/user/${roomid}` , {
      state : username
    });
  }

  const handleCreateId = ()=> {
    const id = uuidv4();
    setroomid(id);
  }
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className={styles.loginContainer}>
        <h2 className={styles.h2}>Code collab</h2>
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
              className={styles.input}
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
              className={styles.input}
              placeholder="Your username"
              required
            />
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.button}>
              Create Room
            </button>
            <Link onClick={handleCreateId} className={styles.button}>
              Create new id
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default User;
