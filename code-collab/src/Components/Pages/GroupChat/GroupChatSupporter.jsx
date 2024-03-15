// import React, { useEffect, useRef, useState } from 'react'
// import { initSocket2 } from '../helper/socket2';
// import { ACTIONS } from '../helper/action';
// import styles from "./GroupChat.module.css";
// import { useParams } from 'react-router-dom';
// import toast  from 'react-hot-toast';

// const GroupChatSupporter = () => {
//     const socketRef = useRef(null);
//     const [message , setmessage] = useState("");
//     const [messages , setmessages] = useState([]);
//     const {id} = useParams();
//     useEffect(()=> {
//         const init = async()=> {
//             socketRef.current = await initSocket2();
//             socketRef.current?.on("connect_error" , (err)=> {
//                 handleErrors(err);
//             }); // if error is there
//             socketRef.current?.on("connect_failed" , (err)=> {
//                 handleErrors(err);
//             });

//             function handleErrors(err){
//                 console.log("socket error" , err);
//                 toast.error("Socket connection failed try again later");
//             }
//         }
//         init();
//     } , []);

   
    
//     const sendMessage = () => {
//         socketRef.current.emit(ACTIONS.CHAT_MESSAGE, {
//           roomId: id,
//           message: message,
//           username: localStorage.getItem("user"),
//         });
//         setmessage("");
//       };
      
//       // Handle receiving a chat message
//       useEffect(() => {
//         socketRef.current?.on(ACTIONS.CHAT_MESSAGE, ({ message, username }) => {
//           setmessages((prevMessages) => [
//             ...prevMessages,
//             { message, username },
//           ]);
//         });
//       }, [socketRef?.current]);


  
//   return (
//     <div className={styles.container}>
//       <div className={styles.chat}>
//       {
//   messages?.map((msg, index) => (
//     <div className={styles.left} key={index}>
//       {msg}
//     </div>
//   ))
// }
//         <div className={styles.right}>
//             {message}
//         </div>
//       </div>
//       <div className={styles.send}>
//         <input type="text" className={styles.input} value={message}  onChange={(event)=> setmessage(event.target.value)}/>
//         <button className={styles.button} onClick={sendMessage}>send</button>
//       </div>
//     </div>
//   )
// }

// export default GroupChatSupporter
