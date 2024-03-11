import React, { useEffect, useState } from "react";
import { Form } from "antd";
import styles from "./Auth.module.css";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useTypewriter, Cursor } from 'react-simple-typewriter'

const LoginSupport = () => {
  const [formLayout, setFormLayout] = useState("horizontal");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();
  const [auth, setauth] = useAuth();

  const fetchCard = () => {
    let cards = document.querySelectorAll(`.${styles.container2}`);
    cards.forEach(card => {
      card.onmousemove = function (e) {
        let x = e.pageX - card.offsetLeft;
        let y = e.pagey - card.offsetTop;

        card.style.setProperty('--x', x + "px");
        card.style.setProperty('--y', y + "px");
      }
    })
  }

  useEffect(() => {
    fetchCard();
  })

  const [text1] = useTypewriter({
    words: ["Code Collab Login"],
    loop: 'infinite',
    typeSpeed: 50,
  });

  const handleSubmit = async () => {
    try {
      setLoading(true); // Set loading to true when starting the login process

      let response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        response = await response.json();
        if (response.success) {
          toast.success("Login successful");
          setauth({ ...auth, user: response.user, token: response.token });
          localStorage.setItem("auth", JSON.stringify(response));
          navigate("/dashboard/user");
        }
      } else {
        toast.error("Error in login");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error in login");
    } finally {
      setLoading(false); // Set loading to false after the login process is complete
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={styles.form}
    >
      <h1 className={styles.h1}>{text1}<Cursor cursorColor='white' /></h1>
      <div>
        <div className="d-flex align-items-center gap-3" >
          <i className={`fa-regular fa-user ${styles.icon}`}></i>
          <input
            type="text"
            className={styles.inputfield}
            placeholder="Email..."
            value={email}
            onChange={(event) => setemail(event.target.value)}
          />
        </div>
      </div>
      <div>
        <div className="d-flex align-items-center gap-3">
          <i class={`fa-solid fa-lock ${styles.icon}`}></i>
          <input
            type="password"
            className={styles.inputfield}
            placeholder="password..."
            value={password}
            onChange={(event) => setpassword(event.target.value)}
          />
        </div>
      </div>
      <div>
        <button
          type="primary"
          className={styles.loginButton}
          onClick={handleSubmit}
          disabled={loading} // Disable the button when loading
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
      <p className={styles.p1}>Don't have an account? <Link to="/signup">Register</Link></p>
    </form>
  );
};

export default LoginSupport;
