import React, { useEffect } from 'react';
import {
  DownloadOutlined,
} from '@ant-design/icons';
import { Button, Menu, Dropdown, Space, Tooltip } from 'antd';
import { files } from '../../helper/constant';
import { useNavigate } from 'react-router-dom';
const Nav = ({onClick , editorRef}) => {
  const navigate = useNavigate();
  console.log(editorRef);

  
  return (
  
  <div>
    <Space.Compact block>
        
      
      <Tooltip title="Download code">
        <Button icon={<DownloadOutlined />} onClick={onClick} />
      </Tooltip>
    </Space.Compact>
    <br />
  </div>
)};
export default Nav;