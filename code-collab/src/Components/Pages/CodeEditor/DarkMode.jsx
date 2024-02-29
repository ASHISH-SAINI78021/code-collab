import React from 'react';
import { MoonFilled , MoonOutlined} from '@ant-design/icons';

const DarkMode = ({onClick}) => {
  return (
    <span>
        
      <MoonFilled onClick={onClick} style={{fontSize:"25px" , cursor: "pointer"}} />
    </span>
  )
}

export default DarkMode
