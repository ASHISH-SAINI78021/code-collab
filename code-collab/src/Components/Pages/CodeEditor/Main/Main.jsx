import React from 'react'
import CodeEditor from '../CodeEditor'
import { useParams } from 'react-router-dom'

const Main = () => {
  const {id} = useParams();
  localStorage.setItem(id , `main${id}`);
  return (
    <>
      <CodeEditor/>

    </>
  )
}

export default Main
