import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { Avatar, Divider, Tooltip } from 'antd';

const MainUser = () => (
  <>  
      <Tooltip title={`${localStorage.getItem("user")}`} placement="top">
        <Avatar
        src="https://api.dicebear.com/7.x/miniavs/svg?seed=3" 
          style={{
            backgroundColor: '#87d068',
          }}
          icon={<UserOutlined />}
        />
      </Tooltip>
  </>
);
export default MainUser;