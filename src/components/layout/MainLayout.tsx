import React from "react";

import Back from "../../images/back.svg";
import "./layout.css";

const MainLayout = () => {
  return (
    <div className='layout'>
      <div className='layout_inner'>
        <div className='layout_inner_table'>
          <div className='layout_inner_title'>
            <h2>Table Name 123</h2>
            <img src={Back} alt='Back icon' className='back-icon' width={40} />
          </div>
          {/* <UsersGrid /> */}
        </div>
        {/* <div className='layout_inner_chat'>
          <ChatBox />
        </div> */}
      </div>
    </div>
  );
};

export default MainLayout;