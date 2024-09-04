import React from "react";
import Logo from "../../images/A79_4.svg";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar_inner'>
        <img src={Logo} alt='Logo' className='logo' />
        <p>
          Home / <span>Chat Name</span>
        </p>
        <div className='profile_pic'></div>
      </div>
    </div>
  );
};

export default Navbar;