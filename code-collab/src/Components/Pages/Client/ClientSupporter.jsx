import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Avatar, Divider, Tooltip } from 'antd';
const ClientSupporter = ({clients}) => {

  console.log(clients);

  return (
  <>
    <Avatar.Group
      maxCount={2}
      maxPopoverTrigger="hover"
      size="large"
      maxStyle={{
        color: '#f56a00',
        backgroundColor: '#fde3cf',
        cursor: 'pointer',
      }}
    >
     
      {
        clients?.map((user)=> {
          return <>
              <Tooltip title={user.username} placement="top">
            <Avatar
              style={{
                backgroundColor: '#87d068',
              }}
              icon={<UserOutlined />}
            />
          </Tooltip>
          </>
        })
      }
     
      
    </Avatar.Group>
    
  </>
)};
export default ClientSupporter;