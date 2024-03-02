import React from "react";
import ClientSupporter from "./ClientSupporter";
import styles from "./Client.module.css";
import ModalSupporter from "./ModalSupporter";

const Client = () => {
    
  return (
    <div className={styles.container}>
      <div>
        <span>Connected : </span>
        <span>
          <ClientSupporter />
        </span>
      </div>
     
      <div className="d-flex gap-3">
            <ModalSupporter/>
            <button className="btn btn-primary btn-sm">Copy room id</button>
        </div>
    </div>
  );
};

export default Client;
