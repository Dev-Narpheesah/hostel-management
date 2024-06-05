import { useState } from "react";
import "./Register.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  age: "",
  roomNum: "",
  email: "",
  g_name: "",
  g_email: "",
  gender: "",
  nationality: "",
};
const StudentReg = () => {
  const [formData, setFormData] = useState(initialState);
  const [formValidMessage, setFormValidMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { name, age, roomNum, email, g_name, g_email, gender, nationality } =
    formData;
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const registerStudent = (e) => {
    e.preventDefault();
    if (
      !name ||
      !age ||
      !roomNum ||
      !email ||
      !g_name ||
      !g_email ||
      !gender ||
      !nationality
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    setIsSubmitting(true);
    axios
      .post("http://localhost:3500/student/register-student", formData)
      .then((response) => {
        console.log(response);
        setIsSubmitting(false);
        toast.success("Registration successful");
        navigate("/studentdash");
      })

      .catch((error) => {
        setIsSubmitting(false);
        const message =
          error.response?.status === 401
            ? "A student with same email already exists"
            : "Server error unable to process the reg";
        setFormValidMessage(message);
        toast.error(message);
      });

    };
    return (
      <div className="container form__ ">
        <div className="form-container">
          <p className="title"> Student Registration.</p>

          <form className="form" onSubmit={registerStudent}>
            <div className="--dir-column">
              <label htmlFor="name">Student&apos;s Name:</label>
              <input
                type="text"
                className="input"
                name="name"
                placeholder="Enter student's name"
                required
                onChange={handleInputChange}
                value={formData.name}
              />
            </div>

            <div className="--dir-column">
              <label htmlFor="age">Age:</label>
              <input
                type="text"
                className="input"
                name="age"
                placeholder="18"
                required
                min={0}
                onChange={handleInputChange}
                value={formData.age}
              />
            </div>
            <div className="--dir-column">
              <label htmlFor="gender">Gender:</label>
              <input
                type="text"
                className="input"
                name="gender"
                placeholder="gender"
                required
                onChange={handleInputChange}
                value={formData.gender}
              />
            </div>
            <div className="--dir-column">
              <label htmlFor="nationality">Nationality:</label>
              <input
                type="text"
                className="input"
                name="nationality"
                placeholder="nationality"
                required
                onChange={handleInputChange}
                value={formData.nationality}
              />
            </div>

            <div className="--dir-column">
              <label htmlFor="roomNum">Room Number:</label>
              <input
                type="text"
                className="input"
                name="roomNum"
                placeholder="306"
                required
                onChange={handleInputChange}
                value={formData.roomNum}
              />
            </div>

            <div className="--dir-column">
              <label htmlFor="email">Contact Email:</label>
              <input
                type="email"
                className="input"
                name="email"
                placeholder="example@yahoo.com"
                required
                onChange={handleInputChange}
                value={formData.email}
              />
            </div>

            <div className="--dir-column">
              <label htmlFor="g_name">Guardian&apos;s Name:</label>
              <input
                type="text"
                className="input"
                name="g_name"
                placeholder="Enter guardian's name"
                required
                onChange={handleInputChange}
                value={formData.g_name}
              />
            </div>

            <div className="--dir-column">
              <label htmlFor="g_email">Guardian&apos;s Email:</label>
              <input
                type="email"
                className="input"
                name="g_email"
                placeholder="example@yahoo.com"
                required
                onChange={handleInputChange}
                value={formData.g_email}
              />
            </div>

            <button className="--btn" disabled={isSubmitting}>
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>
          {formValidMessage && (
            <p className="error-message">{formValidMessage}</p>
          )}
        </div>
      </div>
    );
};

export default StudentReg;