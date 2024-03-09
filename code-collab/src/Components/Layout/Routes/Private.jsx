import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
import { useAuth } from "../../context/auth";

const Private = () => {
  const [ok, setok] = useState(false);
  const [auth , setauth] = useAuth();
  useEffect(() => {
    const init = async () => {
      try {
        let response = await fetch(
          "http://localhost:8080/api/v1/auth/auth-user",
          {
            method: "GET",
            headers: {
              Authorization : auth?.token
            },
          }
        );

        if (response.ok){
          response = await response.json();
          if (response.success){
            setok(true);
          }
          else {
            setok(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

   if (auth?.token) init();
  }, [auth?.token]);


  return <div>
    {
      (ok) ? <Outlet/> : <Spinner/>
    }
  </div>;
};

export default Private;
