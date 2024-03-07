import React, { useState } from 'react';
import { Button, Form, Input, Radio } from 'antd';
import styles from "./Auth.module.css"
import Password from './Password';
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
const LoginSupport = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const [email , setemail] = useState();
  const [password , setpassword] = useState();
  const navigate = useNavigate();
  const [auth , setauth] = useState();
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
        try {
          let response = await fetch("http://localhost:8080/api/v1/auth/login" , {
            method:"POST" ,
            headers: {
              "Content-Type": "application/json"
            } ,
            body: JSON.stringify({email , password})
          });
          // console.log(response);
          if (response.ok){
            response = await response.json();
            console.log(response);
            if (response.success){
              toast.success("Login successful");
              setauth({...auth ,
                user : response.user ,
                token : response.token
              })
              localStorage.setItem("auth" , JSON.stringify(response));
              navigate("/user");
            }
            else {
              toast.error("User does not exist");
              navigate("/signup");
            }
            
          }
          else {
            toast.error("Error in login");
          }
        } catch (err) {
          console.log(err);
          toast.error("Error in login");
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
        <h1 className={styles.h1}>Welcome Back !</h1>
      <Form.Item label="Email " >
        <Input placeholder="Example@gmail.com" value={email} onChange={(event)=> setemail(event.target.value)} required />
      </Form.Item>
      <Form.Item label="Password: ">
        {/* <Input placeholder="xyzQI1\23@" required /> */}
        <Password password={password} setpassword={setpassword} />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
            <Button type="primary" className={styles.loginButton} onClick={handleSubmit}>Login</Button>
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
            <Button type="primary" className={styles.signupButton} onClick={()=> navigate("/signup")}>Sign up</Button>
        </Form.Item>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonContainerItem}></div>
        <p><b>or Login with</b></p>
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
export default LoginSupport;