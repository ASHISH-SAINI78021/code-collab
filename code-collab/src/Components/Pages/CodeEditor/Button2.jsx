import React, { useState } from 'react';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { LANGUAGE_VERSIONS } from '../helper/constant';

const Button2 = ({ editorRef, language , input }) => {
  const [loadings, setLoadings] = useState([]);
  const [output, setOutput] = useState(null);

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 2000);
  };

  const clear = ()=> {
    setOutput(null);
  }

  const executeCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) {
      return;
    }

    try {
      setOutput(null); // Clear previous output
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "language": `${language}`,
          "version": `${LANGUAGE_VERSIONS[language]}`,
          "files": [
            {
              "name": `Main.java`,
              "content": sourceCode,
            }
          ] ,
          "stdin" : input
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setOutput(result.run.output.split("\n"));
      } else {
        console.error(`Error: ${response.statusText}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      // Set loading state to false after the fetch operation is complete
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[0] = false;
        return newLoadings;
      });
    }
  };

  return (
    <div>
      <Button
        className='btn btn-outline-success'
        onClick={executeCode}
      >
        Run
      </Button>
      <span>    </span>
      
      <Button className='btn btn-outline-primary' onClick={clear}>Clear</Button>
      <br /><br />
      <p style={{maxHeight: "30vh" , overflowY:"auto"}}>
        {output ? 
          output?.map((value, index) => <p key={index}>{value}</p>) : 
          "Click 'Run' to see the output"
        }
      </p>
    </div>
  );
};

export default Button2;
