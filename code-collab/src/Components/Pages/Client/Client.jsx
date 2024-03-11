import React from "react";
import ClientSupporter from "./ClientSupporter";
import styles from "./Client.module.css";
import ModalSupporter from "./ModalSupporter";
import toast  from "react-hot-toast";
import Link from "antd/es/typography/Link";

const Client = ({clients , roomId}) => {

  // we will use browser api's here
  const copyHandler = async()=> {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room id has been copied");
    } catch (err) {
      toast.error("could not copy room id");
      console.log(err);
    }
  }
    
  return (
    <div className={styles.container}>
      <div>
        <span>Connected : </span>
        <span>
          <ClientSupporter clients={clients} />
        </span>
      </div>
     
      <div className="d-flex gap-3">
            <ModalSupporter name={"Leave room"}/>
            <button className="btn btn-primary btn-sm" onClick={copyHandler}>Copy room id</button>
            <a className="btn btn-warning" style={{color:"black"}} href="https://65e89ba79b81df186142b30b--whimsical-sunflower-38afcf.netlify.app/" target="_blank" >Whiteboard</a>
        </div>
    </div>
  );
};

export default Client;
