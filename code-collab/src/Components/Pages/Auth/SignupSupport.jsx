import React, { useState } from 'react';
import { Button, Form, Input, Radio } from 'antd';
import styles from "./Auth.module.css"
import Password from './Password';
import toast  from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
const SignupSupport = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const [email , setemail] = useState(null);
  const [password , setpassword] = useState(null);
  const [answer , setanswer] = useState(null);
  const navigate = useNavigate();
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const formItemLayout =
    formLayout === 'horizontal'
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
    formLayout === 'horizontal'
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;


      const handleSubmit = async()=> {
        if (!password || password.length < 8) {
          toast.error("Password must be at least 8 characters long");
          return;
        }
  
        // Ensure the password contains at least one special character
        const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharacterRegex.test(password)) {
          toast.error("Password must contain at least one special character");
          return;
        }
  
        try {
          let response = await fetch("http://localhost:8080/api/v1/auth/register" , {
            method: "POST" ,
            headers : {
             "Content-Type" : "application/json"
            } ,
            body : JSON.stringify({email , password , answer})
          });
          console.log(response);
          if (response.ok){
            response = await response.json();
            console.log(response);
            if (response.success){
              toast.success("Signup successfuly");
              navigate("/"); // go to login page
            }
            else {
              toast.success("User is already registered");
            }           
          }
        } catch (err) {
          console.log(err);
          toast.error("Error in signup");
        }
      }
  return (
    <Form
      {...formItemLayout}
      layout={formLayout}
      form={form}
      initialValues={{
        layout: formLayout,
      }}
      onValuesChange={onFormLayoutChange}
      style={{
        maxWidth: formLayout === 'inline' ? 'none' : 600,
      }}
    >
        <h1 className={styles.h1}>Register</h1>
      <Form.Item label="Email " >
        <Input placeholder="Example@gmail.com" value={email} onChange={(event)=> setemail(event.target.value)} required />
      </Form.Item>
      <Form.Item label="Password: ">
        {/* <Input placeholder="xyzQI1\23@" required /> */}
        <Password password={password} setpassword={setpassword} onChange={(event)=> setpassword(event.target.value)} required />
      </Form.Item>
      <p>What is favourite dish ? </p>
      <Form.Item label="Answer " >
       
        <Input placeholder="Example@gmail.com" value={answer} onChange={(event)=> setanswer(event.target.value)} required />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
            <Button type="primary" className={styles.signupButton} onClick={handleSubmit}>Sign Up</Button>
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
            <Button type="primary" className={styles.loginButton} onClick={()=> navigate("/")}>Login</Button>
        </Form.Item>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonContainerItem}></div>
        <p><b>or Signup with</b></p>
        <div className={styles.buttonContainerItem}></div>
      </div>
      <div className={styles.ExtraFunctionality}>
        <img src="google.png" alt="" />
        <img src="facebook.png" alt="" />
        <img src="twitter.png" alt="" />
      </div>
      
      
    </Form>
  );
};
export default SignupSupport;