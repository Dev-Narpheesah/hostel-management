import React, {useContext} from "react";
import "./HomeDash.css";
import useAuthRedirect from "../../../context/useAuth"
import { lady, bash, blacky, tallest } from "../../assets";
import { UserContext } from "../../../context/UserContext";
import {Link} from "react-router-dom";

const HomeDash = () => {
  useAuthRedirect();
  const { user } = useContext(UserContext);

  const activities = [
    {
      userPic: lady,
      userName: "Tunmise",
      action: "Tunmise has checked out now",
      time: "Now",
    },
    {
      userPic: blacky,
      userName: "Soliu",
      action: "Soliu has checked out now",
      time: "3 min ago",
    },
    {
      userPic: tallest,
      userName: "Bode",
      action: "Bode has checked out now",
      time: "5 min ago",
    },
    {
      userPic: bash,
      userName: "Kenny",
      action: "Kenny has checked out now",
      time: "Yesterday",
    },
  ];

  return (
    <div className="--flex-center _homeDashCon">
      <div className="__paraCon">
        <h1 className="__paraHeader"> Welcome back, {user.fullname}</h1>
      </div>

      <div className="__secondCon">
        <h3 className="__quickTitle">Quick Stats</h3>

        <div className="__flex __boards">
          <div className="__board">
            <p className="__boardHead">120</p>
            <p className="__boardDetails">Total Students</p>
          </div>

          <div className="__board">
            <p className="__boardHead">100</p>
            <p className="__boardDetails">Active Students</p>
          </div>

          <div className="__board">
            <p className="__boardHead">20</p>
            <p className="__boardDetails">Inactive Students</p>
          </div>

          <div className="__board">
            <p className="__boardHead">$20,000</p>
            <p className="__boardDetails">Total Revenue</p>
          </div>
        </div>
      </div>

    

      <div className="--flex-center __firstCon">
        <h4 className="__title">Recent Activity</h4>

        {activities.map((activity, index) => (
          <div className="__users" key={index}>
            <div className="__firstUserPic">
              <img src={activity.userPic} alt="" />
            </div>

            <div className="__userData">
              <div>
                <h5>{activity.userName}</h5>
                <p>{activity.action}</p>
              </div>
              <p>{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="__lastCon">
        <h3 className="__lastTitle">Quick Actions</h3>

        <div className="__homeBtn">
          <button className="__addBtn"><Link to='/student-reg'>Add a student</Link></button>
          <button className="__attendBtn"><Link to='/attendance'>Attendance</Link></button>
        </div>
      </div>
    </div>
  );
};

export default HomeDash;
