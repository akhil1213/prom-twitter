import React from "react";
import "./SidebarOption.css";

interface Props {
  text: string
  Icon: React.ForwardRefExoticComponent<any>
}
function SidebarOption({ text, Icon }: Props) {
  return (
    <div className="sidebarOption">
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}

export default SidebarOption;