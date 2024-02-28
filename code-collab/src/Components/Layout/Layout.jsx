import React from 'react';
import { Layout, Flex } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};
const siderStyle = {
  textAlign: 'center',
  lineHeight: '90px',
  color: '#fff',
  backgroundColor: '#1677ff',
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};
const layoutStyle = {
  borderRadius: 8,
  width: '100vw',
  minHeight: '100vh'
};
const Layout2 = ({children}) => (
  <Flex gap="middle" wrap="wrap">
    

    <Layout style={layoutStyle}>
      <Header style={headerStyle}>Header</Header>
      <Layout>
        <Sider width="10%" style={siderStyle}>
          Sider
        </Sider>
        <Content style={contentStyle}>{children}</Content>
      </Layout>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  </Flex>
);
export default Layout2;