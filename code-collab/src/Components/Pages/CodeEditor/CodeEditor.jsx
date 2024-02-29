import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import Layout2 from "../../Layout/Layout2";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS, extension } from "../helper/constant";
import Output from "./Output";
import DarkMode from "./DarkMode";
import LightMode from "./LightMode";
import Nav from "./Nav/Nav";
import { files } from "../helper/constant";

const CodeEditor = () => {
  const [value, setvalue] = useState(CODE_SNIPPETS["javascript"]);
  const [language, setlanguage] = useState("javascript");
  const [input , setinput] = useState(null);
  const [state, setstate] = useState(false);
  const [local , setlocal] = useState();
  const editorRef = useRef();

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
  //     const data = localStorage.getItem()
  //     if (){
  //       localStorage.setItem(file , value);
  //     }
  // })
  // } , [value]);
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
