import React, {useState, useContext} from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { IoCloseOutline, IoMenu } from "react-icons/io5";
import HeaderSideNav from "./HeaderSideNav";
import { lady } from "../../assets";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";


const items = [
  { title: "Students", url: "/studentdash" },
  { title: "Rooms", url: "/room" },
];

const Header = () => {
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);
  const [navToggle, setNavToggle] = useState(false);

  const logOutUser = async () => {
    try {
      await axios.post("https://hostel-management-sand.vercel.app/admin/logout", null, {
        withCredentials: true
      })
      setUser(null);
      toast.success("User logged out successfully! 😊")
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out user", error);
    }
  }


  
  return (
    
    <>
     {navToggle && (
      <div className="mobile-sidebar">
        <HeaderSideNav items={items} setNavToggle={setNavToggle}/>
      </div>
    )} 
    <header>

      <nav className="navigation --flex-between">
      <div className="logo">
        {navToggle ? (
          <IoCloseOutline
          className="sidebar-toggle-icon"
          onClick={() => setNavToggle(false)}
          />
        ) : (
          <IoMenu 
          className="sidebar-toggle-icon" 
          onClick={() => setNavToggle(true)}
          />
        )}
      
       
        
          <Link to="/homedash">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.3327 3.57867C12.3315 3.58457 12.3292 3.59483 12.3249 3.6098C12.3145 3.64663 12.2983 3.69137 12.2782 3.73917C12.2723 3.75323 12.2663 3.7669 12.2604 3.77993C11.8368 4.07043 10.9929 4.47977 10.2365 4.66037C9.32917 4.877 8.21377 5.00723 7 5.00723C5.78623 5.00723 4.67083 4.877 3.7635 4.66037C3.0004 4.4782 2.14835 4.06323 1.72846 3.77227C1.72461 3.76417 1.72072 3.75567 1.71684 3.74693C1.69973 3.7083 1.68574 3.67047 1.67659 3.637C1.66785 3.60507 1.6668 3.5889 1.66668 3.58707C1.66667 3.5869 1.66668 3.587 1.66668 3.58707C1.66668 3.57863 1.67013 3.47443 1.89495 3.28953C2.11515 3.10847 2.47407 2.91563 2.97637 2.74092C3.97473 2.39366 5.3973 2.16667 7 2.16667C8.6027 2.16667 10.0253 2.39366 11.0236 2.74092C11.5259 2.91563 11.8848 3.10847 12.105 3.28953C12.3002 3.45003 12.3286 3.54963 12.3327 3.57867ZM0.650593 4.57707L6.15143 13.3991C6.54293 14.027 7.45707 14.027 7.84857 13.3991L13.3511 4.57433C13.357 4.56493 13.3626 4.5554 13.368 4.5457L12.7854 4.2216C13.368 4.5457 13.3679 4.5458 13.368 4.5457L13.3684 4.545L13.3688 4.54417L13.37 4.54203L13.3733 4.53607C13.3759 4.53133 13.3792 4.52513 13.3832 4.51757C13.3913 4.5025 13.4021 4.48183 13.4147 4.4567C13.4397 4.40693 13.4732 4.337 13.5072 4.2561C13.5634 4.12263 13.6667 3.8563 13.6667 3.58697C13.6667 3.0191 13.3343 2.57418 12.9519 2.2597C12.5649 1.94142 12.0451 1.68454 11.4617 1.48159C10.2885 1.07352 8.711 0.833333 7 0.833333C5.289 0.833333 3.71153 1.07352 2.53833 1.48159C1.95488 1.68454 1.4351 1.94143 1.04806 2.2597C0.66565 2.57418 0.33333 3.0191 0.33333 3.58697C0.33333 3.87583 0.43088 4.13593 0.497737 4.2869C0.534583 4.37007 0.57116 4.43987 0.598957 4.48963C0.612993 4.5148 0.625157 4.5355 0.6345 4.55097C0.63918 4.55873 0.64318 4.56523 0.646387 4.57037L0.648873 4.57433L0.650593 4.57707ZM10.9956 5.832L7 12.24L3.00437 5.832C3.15537 5.8797 3.30597 5.92193 3.4539 5.95727C4.47603 6.2013 5.6967 6.34057 7 6.34057C8.3033 6.34057 9.52397 6.2013 10.5461 5.95727C10.694 5.92193 10.8446 5.8797 10.9956 5.832Z"
                fill="#121417"
              />
            </svg>
            <span>Campus Hostel</span>
          </Link>
        </div>

        <div className="navItems">
          {items.map(({ title, url, i }) => (
            <div key={i}>
              <Link to={url}>{title}</Link>
            </div>
          ))}
        </div>

        <div className="btn__wrapper --flex-center">
          <button className="btn-danger" onClick={logOutUser}>Logout</button>
          <button className="notification">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.3281 12.2453C14.8945 11.4984 14.25 9.38516 14.25 6.625C14.25 3.17322 11.4518 0.375 8 0.375C4.54822 0.375 1.75 3.17322 1.75 6.625C1.75 9.38594 1.10469 11.4984 0.671094 12.2453C0.445722 12.6318 0.444082 13.1092 0.666796 13.4973C0.889509 13.8853 1.30261 14.1247 1.75 14.125H4.93828C5.23556 15.5796 6.51529 16.6243 8 16.6243C9.48471 16.6243 10.7644 15.5796 11.0617 14.125H14.25C14.6972 14.1244 15.1101 13.8849 15.3326 13.4969C15.5551 13.109 15.5534 12.6317 15.3281 12.2453ZM8 15.375C7.20562 15.3748 6.49761 14.8739 6.23281 14.125H9.76719C9.50239 14.8739 8.79438 15.3748 8 15.375ZM1.75 12.875C2.35156 11.8406 3 9.44375 3 6.625C3 3.86358 5.23858 1.625 8 1.625C10.7614 1.625 13 3.86358 13 6.625C13 9.44141 13.6469 11.8383 14.25 12.875H1.75Z"
                fill="#121417"
              />
            
            </svg>
          </button>


          <div>
            <Link to="/adminPrev">
            <img src={lady} alt="nav-image" />
            </Link>
          </div>
        </div>
      </nav>
    </header>

    </>
  );
};

export default Header;