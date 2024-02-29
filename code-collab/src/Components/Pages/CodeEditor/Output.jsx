import React, { useState } from 'react'
import Button2 from './Button2';
import { Input } from 'antd';
const { TextArea } = Input;

const Output = ({editorRef , language}) => {
    const [input , setinput] = useState("");
  return (
    <div className="d-flex flex-column" style={{ overflow: "auto" }}>
      <Button2 editorRef={editorRef} language={language} input={input}/>
      <hr />
          <p>Terminal</p> 
          <TextArea
        value={input}
        onChange={(e) => setinput(e.target.value)}
        placeholder="input..."
        autoSize={{
          minRows: 3,
          maxRows: 5,
        }}
      />
    </div>
  )
}

export default Output
