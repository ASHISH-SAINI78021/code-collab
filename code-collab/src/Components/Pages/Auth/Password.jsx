import React, { useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
const Password = ({password , setpassword}) => {
  return (
    <Space direction="vertical">
      <Input.Password
        placeholder="zxyADFA1432!$#@dsfc"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        value={password}
        onChange={(event)=>setpassword(event.target.value)}
      />
    </Space>
  );
};
export default Password;