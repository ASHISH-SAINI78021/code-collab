import React, { useEffect, useState } from 'react'
import CodeEditor from '../CodeEditor'
import { useParams } from 'react-router-dom'

const Main = () => {
  const {id} = useParams();
  
  // useEffect(()=> {
  //   const data = localStorage.getItem(`main${id}`);
  //   if (data) {
  //     const parsedData = JSON.parse(data);
  //     localStorage.setItem("value" , parsedData);
  //   }
  //   localStorage.setItem('value' , id);
  // } , [id ]);


  return (
    <>
      <CodeEditor />

    </>
  )
}

export default Main
