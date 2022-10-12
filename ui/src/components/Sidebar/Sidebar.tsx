import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption.tsx";
import { SettingOutlined, SearchOutlined  } from '@ant-design/icons';

function Sidebar() {
  return (
    <div className="sidebar">

      <SidebarOption Icon={SearchOutlined} text="Explore" />
      <SidebarOption Icon={SettingOutlined} text="Settings" />

    </div>
  );
}

export default Sidebar;