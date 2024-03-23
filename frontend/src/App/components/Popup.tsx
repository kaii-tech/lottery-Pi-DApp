import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const Popup: FC<Props> = ({ children }) => {
  return (
    <div className="popup">
      <div className="popup-inner">{children}</div>
    </div>
  );
};

export default Popup;
