import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Avatar, Divider, Tooltip } from 'antd';
const ClientSupporter = () => {


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
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      <Avatar
        style={{
          backgroundColor: '#f56a00',
        }}
      >
        K
      </Avatar>
      <Tooltip title="Ant User" placement="top">
        <Avatar
          style={{
            backgroundColor: '#87d068',
          }}
          icon={<UserOutlined />}
        />
      </Tooltip>
      <Avatar
        style={{
          backgroundColor: '#1677ff',
        }}
        icon={<AntDesignOutlined />}
      />
    </Avatar.Group>
    
  </>
)};
export default ClientSupporter;