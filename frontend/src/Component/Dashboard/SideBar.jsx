import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const SideBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const dashboardLinks = [
    { title: "Students", url: "/studentdash" },
    { title: "Rooms", url: "/room" },
    { title: "RoomType", url: "/room-type" },
    { title: "Reports", url: "/report" },
  ];
  return (
    <div className="--flex-start">
      <div className="left">
        {dashboardLinks.map(({ title, url }, index) => (
          <div className="--flex-center --dir-column" key={index}>
            <Link to={url}>{title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
