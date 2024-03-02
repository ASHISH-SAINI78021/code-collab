import React, { createContext } from 'react';
import { Button, Modal, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const ReachableContext = createContext(null);
const UnreachableContext = createContext(null);

const ModalSupporter = () => {
  const navigate = useNavigate(); // Move the useNavigate hook here

  const [modal, contextHolder] = Modal.useModal();

  const config = {
    title: 'Use Hook!',
    content: (
      <>
        <ReachableContext.Consumer>{(name) => `Are you sure you want to leave the room?`}</ReachableContext.Consumer>
      </>
    ),
    okText: 'Yes',
    okCancel: [
      {
        text: 'No',
        onPress: () => console.log('You clicked No'),
      },
    ],
    onOk: () => navigate("/"),
  };

  return (
    <ReachableContext.Provider value="Light">
      <Space>
        <button
          className='btn btn-danger'
          onClick={() => {
            modal.warning(config);
          }}
        >
          Leave room
        </button>
      </Space>

      {contextHolder}
      <UnreachableContext.Provider value="Bamboo" />
    </ReachableContext.Provider>
  );
};

export default ModalSupporter;
