import React, { useState } from "react";
import { LANGUAGE_VERSIONS } from "../helper/constant";
import { Button, Dropdown, Menu } from "antd";

const LanguageSelector = ({language , onSelect}) => {
  const [selectedLanguage, setselectedLanguage] = useState("javascript");
  const languages = Object.entries(LANGUAGE_VERSIONS);

  const handleItemClick = (key) => {
    setselectedLanguage(key);
    onSelect(key);
  };

  const items = [
    {
      key: "1",
      value: "javascript" ,
      label: <span>javascript - 18.15.0</span>,
    },
    {
      key: "2",
      value: "typescript" ,
      label: <span>typescript - 5.0.3</span>,
    },
    {
      key: "3",
      value: "python" ,
      label: <span>python - 13.10.0</span>,
    },
    {
      key: "4",
      value: "java" ,
      label: <span>java - 15.0.2</span>,
    },
  ];

  return (
    <div>
      <Dropdown
        overlay={
          <Menu onClick={(e) => handleItemClick(e.key)}>
            {items.map((item) => (
              <Menu.Item key={item.value}>{item.label}</Menu.Item>
            ))}
          </Menu>
        }
        placement="bottomLeft"
        arrow
      >
        <Button style={{ marginBottom: "1rem" }}>Language: {selectedLanguage}</Button>
      </Dropdown>
    </div>
  );
};

export default LanguageSelector;
