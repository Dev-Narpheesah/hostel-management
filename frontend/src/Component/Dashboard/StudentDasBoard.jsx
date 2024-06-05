import React,  { useState, useEffect } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCloseOutline, IoMenu } from "react-icons/io5";
import '../Header/Header.css'
import SideBar from "./SideBar";
import {Link} from "react-router-dom"
import { IoMenu, IoCloseOutline } from "react-icons/io5";
import { FaPenFancy } from "react-icons/fa";
import {confirmAlert} from "react-confirm-alert";
import useAuthRedirect from "../../../context/useAuth"
import axios from "axios";
import UpdateCheckIn from "../../../Modal/UpdateCheckIn"
import ChangeStudentRoom from "../../../Modal/ChangeStudentRoom";
import UpdateStudentProfile from "../../../Modal/UpdateStudentProfile";
 

const studentsData = [
  {
    id: 1,
    name: "Jessica Smith",
    email: "jessicasmith@gmail.com",
    idNumber: "12345",
    gender: "female",
    age: 21,
    nationality: "Spanish",
  },
  {
    id: 2,
    name: "Jason Musk",
    email: "musk312@gmail.com",
    idNumber: "23456",
    gender: "Male",
    age: 25,
    nationality: "American",
  },
  {
    id: 3,
    name: "Emily Stone",
    email: "emilystone@gmail.com",
    idNumber: "34567",
    gender: "Female",
    age: 32,
    nationality: "Egyptian",
  },
];

const StudentDashBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState(studentsData);
  const [filteredData, setFilteredData] = useState(studentsData);
  const [isSidebarToggle, setIsSidebarToggle] = useState(false);
  const [data, setData] = useState([])
  const [message, setMessage] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchsStudent = async () => {
      try {
        const response = await axios.get("http://localhost:3500/student/")
        setData(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchsStudent()
  },[])

  const handleModalOpen = (student) => {
    setSelectedModal("");
    setIsModalOpen(true);
    setSelectedStudent(student);
  }

  const handleModalClose = () => {
    setSelectedModal("");
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleModalSelect = (modalType) => {
    setSelectedModal(modalType);
    setIsModalOpen(true);
  }

  //targetting the searchbar that will be call later
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = studentsData.filter(
      (student) =>
        student.name.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  const handleDelete = (studentId) => {
    // Filter out the deleted student from the students array
    const updatedStudents = students.filter(
      (student) => student.id !== studentId
    );
    setStudents(updatedStudents);

    const updatedFilteredData = filteredData.filter(
      (student) => student.id !== studentId
    );
    setFilteredData(updatedFilteredData);
  };

  return (
    <div>
      {isSidebarToggle && (   <div className="mobile-side-nav"> <SideBar/> </div>)}
   

      <div className="--flex --overflow-hidden">
  <div className="desktop-side-nav"> 
    <SideBar/>
  </div>

  <div className=" --flex-dir-column --overflow-y-hidden  --overflow-y-auto --flex-1 --overflow-x-hidden  ">
    
    <main className="--flex-justify-center w-full">
      <div className="right dash-main">
        <div className="--flex-justify-between">
          <p>Students</p>

          {isSidebarToggle ? (
            <IoCloseOutline
              className="sidebar-toggle-iconB"
              onClick={() => setIsSidebarToggle(false)}
            />
          ) : (
            <IoMenu
              className="sidebar-toggle-iconB"
              onClick={() => setIsSidebarToggle(true)}
            />
          )}
        </div>
        <p>Search Students</p>

        <input
          placeholder="search by name, email, or ID number"
          type="text"
          className="search"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div className="table">
          <table className="table_wrapper">
            <thead className="table_head">
              <tr className="table__row">
                <th className="same_class">Student Name</th>
                <th className="same_class">Email</th>
                <th className="same_class">ID number</th>
                <th className="same_class">Gender</th>
                <th className="same_class">Age</th>
                <th className="same_class">Nationality</th>
                <th className="same_class">Actions</th>
              </tr>
            </thead>

            <tbody className="table__body">
              {filteredData.map((student, index) => (
                <tr key={index} className="table__row">
                  <td className="same_class">{student.name}</td>
                  <td className="same_class">{student.email}</td>
                  <td className="same_class">{student.idNumber}</td>
                  <td className="same_class">{student.gender}</td>
                  <td className="same_class">{student.age}</td>
                  <td className="same_class">{student.nationality}</td>
                  <td className="same_class">
                    <RiDeleteBin6Line
                      size={25}
                      color="red"
                      onClick={() => handleDelete(student.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn-secondary">
          <Link to="/student-reg">Add a student</Link>
        </button>
      </div>
    </main>
  </div>
</div>

    </div>


    
  );
};

export default StudentDashBoard;
