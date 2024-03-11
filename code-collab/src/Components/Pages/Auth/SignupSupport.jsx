import React, { useEffect, useState } from 'react';
import styles from "./Auth.module.css"
import{ Link} from 'react-router-dom';
import toast  from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useTypewriter , Cursor} from 'react-simple-typewriter'
const SignupSupport = () => {
  const [email , setemail] = useState(null);
  const [password , setpassword] = useState(null);
  const [answer , setanswer] = useState(null);
  const navigate = useNavigate();
 
  const [text1] = useTypewriter({
    words: ["Code Collab Sign up"],
    loop: 'infinite' , 
    typeSpeed: 50,
  });


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
  })


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
            body : JSON.stringify({email , password})
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
    <form
    onSubmit={(e)=> e.preventDefault()}
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
          onChange={(event)=> setemail(event.target.value)}
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
          onChange={(event)=> setpassword(event.target.value)}
        />
      </div>
    </div>
    <div className={styles.button}>
      <button
        type="primary"
        className={styles.loginButton}
        onClick={handleSubmit}
      >
        Sign up
      </button>
    </div>
    <p className={styles.p1}>Already has an account? <Link to="/">Login</Link></p>
  </form>
  );
};
export default SignupSupport;