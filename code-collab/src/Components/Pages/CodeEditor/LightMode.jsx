import React from 'react';
import { MoonFilled , MoonOutlined} from '@ant-design/icons';

const LightMode = ({onClick}) => {
  return (
    <div>
      <MoonOutlined onClick={onClick} style={{fontSize:"25px" , cursor: "pointer"}}/>
    </div>
  )
}

export default LightMode
