import React, { useEffect, useRef, useState } from "react";
import { throttle } from 'lodash';
import Editor from "@monaco-editor/react";
import Layout2 from "../../Layout/Layout2";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS, extension } from "../helper/constant";
import Output from "./Output";
import DarkMode from "./DarkMode";
import LightMode from "./LightMode";
import Nav from "./Nav/Nav";
import { useAuth } from "../../context/auth";
import { initSocket } from "../helper/socket";
import { ACTIONS } from "../helper/action";

import {
  useLocation,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";
import Client from "../Client/Client";

const CodeEditor = () => {
  const [value, setvalue] = useState(CODE_SNIPPETS["javascript"]);
  const [language, setlanguage] = useState("javascript");
  const [state, setstate] = useState(false);
  const editorRef = useRef();
  const codeRef = useRef(null);
  const socketRef = useRef(null);
  const [Clients, setclients] = useState([]);
  const [editorKey , seteditorKey] = useState(1);
  const location = useLocation();
  const navigation = useNavigate();
  const { id } = useParams();

  const onSelect = (lang) => {
    setlanguage(lang);
    setvalue(CODE_SNIPPETS[lang]);
  };

  const downloadCode = () => {
    const codeToDownload = editorRef.current.getValue();
    const blob = new Blob([codeToDownload], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${extension[language]}`; // Change the filename as needed
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const darkmode = () => {
    setstate(!state);
  };
  // useEffect(()=> {
  //   files?.map((file , index)=> {
  //     localStorage.setItem(file , value);
  // })
  // } , []);

  // useEffect(()=> {
  //   const id = localStorage.getItem("value");
  //   if (id) {
  //     const parsedData = JSON.parse(id);
  //     localStorage.setItem(`Main${parsedData}.jsx` , value);
  //   }
  // } , [value]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => {
        handleErrors(err);
      }); // if error occurs
      socketRef.current.on("connect_failed", (err) => {
        handleErrors(err);
      }); // if connection failed

      function handleErrors(err) {
        console.log("socket error", err);
        toast.error("Socket connection failed try again later");
      }
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId: id,
        username: localStorage.getItem("user"),
      });
      // setclients((prevClients)=> [...prevClients , localStorage.getItem("user")]);

      // listening for the joined event
      socketRef.current?.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
        if (username !== localStorage.getItem("user")) {
          toast.success(`${username} joined the room`);
          console.log(`${username} joined the room`);
        }
        setclients(clients);
      
        const currentCode = editorRef.current.getValue();
        socketRef?.current.emit(ACTIONS.SYNC_CODE, {
          code: currentCode,
          socketId,
        });
      });


      

      // listening the disconnected event
      socketRef.current?.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        setclients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
     
    };

    init();

    // after listening of events , we have to clear the events
    // to prevent the memory leakage problem

    return () => {
      socketRef.current?.off(ACTIONS.JOINED); // off() -> it is used to clear the event from the memory
      socketRef.current?.off(ACTIONS.DISCONNECTED); // off() -> it is used to clear the event from the memory
      socketRef.current?.disconnect();
    };
  }, []);

  

  useEffect(() => {
    const handleCodeChange = throttle((code) => {
      socketRef.current?.emit(ACTIONS.CODE_CHANGE, {
        roomId: id,
        code,
      });
    }, 1000);
  
    editorRef.current?.onDidChangeModelContent(() => {
      const code = editorRef.current.getValue();
      codeRef.current = code;
  
      if (origin !== 'setValue') {
        handleCodeChange(code);
      }
    });
  }, [editorRef?.current, origin, id, socketRef]);
  
  
  
  useEffect(()=> {
    const init = ()=> {
      socketRef.current?.on(ACTIONS.SYNC_CODE, ({ code }) => {
        console.log('Syncing code...', code);
        setvalue(code);
        
      });
    }
    init();
  } , [socketRef.current])


  

  useEffect(() => {
    if (socketRef.current) {
      socketRef?.current?.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        console.log('Receiving code change...', code);
        if (code !== null && code !== editorRef.current?.getValue()) {
          setvalue(code);
        }
      });
    }
  }, [socketRef?.current]);


  if (!location.state) {
    return <Navigate />;
  }

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus(); // it means that editor is ready to accept user input and cursor is placed inside the editor for typing
  };


  // useEffect(()=> {
  //   const init = async ()=> {
      
  //   }

  //   init();
  // } , [socketRef.current]);
  


  return (
    <Layout2>
      <Client clients={Clients} roomId={id}/>
      <div className="d-flex gap-5 justify-content-center">
        <LanguageSelector language={language} onSelect={onSelect} />
        {!state ? (
          <LightMode onClick={darkmode} />
        ) : (
          <DarkMode onClick={darkmode} />
        )}
      </div>
      <Nav onClick={downloadCode} editorRef={editorRef} />
      <div className="d-flex gap-2 ">
        <Editor
          key={editorKey}
          height="70vh"
          width={"70%"}
          theme={!state ? "" : "vs-dark"}
          language={language}
          defaultValue="// some comment"
          value={value}
          onMount={onMount}
          // onChange={(value)=> setvalue(value)}
          onChange={(value)=> setvalue(value)}
        />
        <div>
          <Output editorRef={editorRef} language={language} />
        </div>
      </div>
    </Layout2>
  );
};

export default CodeEditor;
