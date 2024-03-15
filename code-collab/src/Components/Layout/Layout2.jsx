import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
// import GroupChat from '../Pages/GroupChat/GroupChat';
const { Header, Content, Sider } = Layout;
import toast from "react-hot-toast";
import { useAuth } from '../context/auth';
import MainUser from '../Pages/User/MainUser';
import ModalSupporter from '../Pages/Client/ModalSupporter';
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `Folder ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});
const Layout2 = ({children}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const [auth , setauth] = useAuth();
  const handleLogout = ()=> {
    localStorage.removeItem("auth");
    toast.success("successfuly logged out");
    localStorage.removeItem("user");
    setauth({
      ...auth , user : null , token: ""
    })
    navigate("/");
  }
  return (
    <Layout>
      <Layout>
        
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0', 
              display: "flex" ,
              justifyContent: "space-between" ,
            }}
          >
          <div 
            style={{
              display: "flex" ,
              justifyContent: "flex-end" ,
              width : "90vw"
            }}
          >
          
          <div className='d-flex gap-3'>
          <MainUser/>
          <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
          </div>
          
          </div>
          
          
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: "75vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Layout2;