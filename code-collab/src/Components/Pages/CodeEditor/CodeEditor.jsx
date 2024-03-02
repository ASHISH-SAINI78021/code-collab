import React, { useEffect, useRef, useState } from "react";
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
import { useLocation , Navigate, useParams, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";



const CodeEditor = () => {
  const [value, setvalue] = useState(CODE_SNIPPETS["javascript"]);
  const [language, setlanguage] = useState("javascript");
  const [state, setstate] = useState(false);
  const editorRef = useRef();
  const socketRef = useRef(null);
  const [clients , setclients] = useState([]);
  const [auth , setauth] = useAuth();
  const location = useLocation();
  const navigation = useNavigate();
  const {id} = useParams();

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus(); // it means that editor is ready to accept user input and cursor is placed inside the editor for typing
  };

  const onSelect = (lang) => {
    setlanguage(lang);
    setvalue(CODE_SNIPPETS[lang]);
  };

  const downloadCode = () => {
    const codeToDownload = editorRef.current.getValue();
    const blob = new Blob([codeToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${extension[language]}`;  // Change the filename as needed
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

  useEffect(()=> {
    const init = async ()=> {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error' , (err)=> {handleErrors(err)}); // if error occur
      socketRef.current.on('connect_failed' , (err)=> {handleErrors(err)}); // if connection failed

      function handleErrors(err){
        console.log("socket error" , err);
        toast.error("Socket connection failed try again later");
      }
      socketRef.current.emit(ACTIONS.JOIN , {
        roomId : id , 
        username : location?.state?.username
      })
    }

    // listening for the joined event
    // socketRef.current.on(ACTIONS.JOINED , ({clients , username , socketId})=> {
    //   if (username !== location?.state?.username){
    //     toast.success(`${username} joined the room`);
    //     console.log(`${username} joined the room`);
    //   }
      
    // })

    console.log(clients);
    init();
  } , []);

  if (!location.state){
    return <Navigate/>
  }


  return (
    <Layout2>
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
          height="70vh"
          width={"70%"}
          theme={!state ? "" : "vs-dark"}
          language={language}
          defaultValue="// some comment"
          value={value}
          onMount={onMount}
          onChange={(value) => setvalue(value)}
        />
        <div >
          <Output editorRef={editorRef} language={language} />
        </div>
      </div>
    </Layout2>
  );
};

export default CodeEditor;
