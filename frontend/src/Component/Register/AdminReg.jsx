import React, { useContext, useEffect, useState } from "react";
import "./Register.css";
import Loader from "../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../PasswordInput/PasswordInput";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import {BaCheck2All} from "react-icons/bs"


const AdminReg = () => {
  const [loading, setLoading] = useState(true);
  const {setUser} = useState(UserContext);
  const [formValidFormMessage, setFormValidMessage] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  const navigate = useNavigate();

  const timesIcon = <FaTimes color="red" size={20} />;
  const checkIcon = <BaCheck2All color="green" size={20} />;

  const switchIcon = (condition) => {
    return condition ? checkIcon : timesIcon;
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({
     ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container form__ --100vh">
          <div className="form-container">
            <p className="title">Create an account</p>
            <form className="form">
              <div className="--dir-column">
                <label htmlFor="name">Full name:</label>
                <input
                  type="text"
                  className="input"
                  name="name"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="--dir-column">
                <label htmlFor="name">Email:</label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="--dir-column">
                <label htmlFor="name">Password:</label>
             <PasswordInput
             placeholder="password"
             name="password"
             />
              </div>

              <div className="--dir-column">
                <label htmlFor="name">Confirm password:</label>
                <PasswordInput
             placeholder="password"
             name="password"
             />
              </div>
              <button className="--btn">Create account</button>
            </form>
            <p>
              Already have an account? <Link to="/login">Login</Link> ||{" "}
              <Link to="/homedash">Go Home</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminReg;