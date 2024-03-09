import React, { useEffect, useState } from "react";
import { Form} from "antd";
import styles from "./Auth.module.css";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useTypewriter , Cursor} from 'react-simple-typewriter'

const LoginSupport = () => {
  const [formLayout, setFormLayout] = useState("horizontal");
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const navigate = useNavigate();
  const [auth, setauth] = useAuth();
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;


      const [text1] = useTypewriter({
        words: ["Code Collab Login"],
        loop: 1 , 
        typeSpeed: 0,
      });

  const handleSubmit = async () => {
    try {
      let response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      // console.log(response);
      if (response.ok) {
        response = await response.json();
        // console.log(response);
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
    }
  };

  return (
    <Form
      
    >
    <h1 className={styles.h1}>{text1}</h1>
      <Form.Item>
        <div className="d-flex align-items-center gap-3">
          <i className={`fa-regular fa-user ${styles.icon}`}></i>
          <input
            type="text"
            className={styles.inputfield}
            placeholder="Email..."
          />
        </div>
      </Form.Item>
      <Form.Item>
        <div className="d-flex align-items-center gap-3">
          <i class={`fa-solid fa-lock ${styles.icon}`}></i>
          <input
            type="password"
            className={styles.inputfield}
            placeholder="password..."
          />
        </div>
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <button
          type="primary"
          className={styles.loginButton}
          onClick={handleSubmit}
        >
          Login
        </button>
      </Form.Item>
      <p className={styles.p1}>Don't have an account? <Link to="/signup">Register</Link></p>
    </Form>
  );
};
export default LoginSupport;
