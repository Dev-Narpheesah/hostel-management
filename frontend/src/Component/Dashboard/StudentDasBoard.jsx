import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import "./Dashboard.css"
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom"
import { MdMenu } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { FaPenFancy } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import useAuthRedirect from "../../../context/useAuth";
import axios from "axios";
import UpdateCheckIn from "../Modal/UpdateCheckIn";
import UpdateStudentProfile from "../Modal/UpdateStudentProfile";
import ChangeStudentRoom from "../Modal/ChangeStudentRoom";




const StudentDasboard = () => {
  const [search, setSearch] = useState("");
  // const [filteredData, setFilteredData] = useState(studentsData);
  const [isSidebarToggle, setIsSidebarToggle] = useState(false);

  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3500/student");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleModalOpen = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedModal("");
    setSelectedStudent(null);
  };

  const handleModalSelect = (modalType) => {
    setSelectedModal(modalType);
  };

  const removeUser = async (_id) => {
    try {
      console.log(`Delete student by id: ${_id}`);
      const response = await axios.delete(
        `http://localhost:3500/student/delete-student/${_id}`
      );
      console.log(response.data);

      // filtering out the the deleted student from the database
      setData((prevData) => prevData.filter((student) => student._id !== _id));

      // setting success message
      setMessage("Student deleted successfully");
    } catch (error) {
      message("Failed to delete student");
      console.error("Error deleting:", error);
    }
  }

  const confirmDelete = (_id) => {
    confirmAlert({
      title: "Delete This Student",
      message: "Are you sure to delete this student?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(_id),
        },
        {
          label: "Cancel",
          onClick: () => alert("Deletion cancelled"),
        },
      ],
    });
  };

    const filteredData = data.filter(
      (item) =>
        item.nationality.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
    );

    // return(
    //   <div>
    //     {isSidebarToggle && (
    //       <div className="mobile-side-nav">
    //         <Sidebar />
    //       </div>
    //     )}
    //   </div>
    // )

    return (
      <div>
        {isSidebarToggle && (
          <div className="mobile-side-nav">
            <Sidebar />
          </div>
        )}

        <div className="--flex --overflow-hidden">
          <div className="desktop-side-nav">
            <Sidebar />
          </div>
          <div className="--flex-dir-column --overflow-y-auto --flex-1 --overflow-x-hidden">
            <main className="--flex-justify-center W-full">
              <div className="right dash-main">
                <div className="--flex-justify-between">
                  <p>Students</p>
                  {isSidebarToggle ? (
                    <FaTimes
                      className="sidebar-toggle-iconB"
                      onClick={() => setIsSidebarToggle(false)}
                    />
                  ) : (
                    <MdMenu
                      className="sidebar-toggle-iconB"
                      onClick={() => setIsSidebarToggle(true)}
                    />
                  )}
                </div>
                <p>Search Students</p>

                <input
                  placeholder="Search by name, email, or ID number"
                  type="text"
                  className="search"
                  value={search}
                  onChange={(e)=> setSearch(e.target.value)}
                />

                <div className="table">
                  <table className="table_wrapper">
                    <thead className="table__head">
                      <tr className="table__row">
                        <th className="same__class">Student Name</th>
                        <th className="same__class">Email</th>
                        <th className="same__class">ID Number</th>
                        <th className="same__class">Gender</th>
                        <th className="same__class">Age</th>
                        <th className="same__class">Nationality</th>
                        <th className="same__class">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="table__body">
                      {filteredData.map((student, index) => (
                        <tr key={index} className="table__row">
                          <td className="same__class">{student.name}</td>
                          <td className="same__class">{student.email}</td>
                          <td className="same__class">{student._id}</td>
                          <td className="same__class">{student.gender}</td>
                          <td className="same__class">{student.age}</td>
                          <td className="same__class">{student.nationality}</td>
                          <td className="same__class">
                            <RiDeleteBin6Line
                              size={25}
                              color="red"
                              onClick={() => confirmDelete(student._id)}
                            />
                            &nbsp;&nbsp;
                            <FaPenFancy
                              size={25}
                              color="blue"
                              onClick={() => handleModalOpen(student)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="btn-secondary">
                  <Link to="/studentreg">Add a student</Link>
                </button>
              </div>
            </main>
          </div>
        </div>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Select an Option</h2>
              <button
                onClick={() => handleModalSelect("UpdateStudentProfile")}
                className="one"
              >
                Update Student Profile
              </button>

              <button
                onClick={() => handleModalSelect("ChangeStudentRoom")}
                className="two"
              >
                Change Student Room
              </button>

              <button
                onClick={() => handleModalSelect("UpdateCheckIn")}
                className="three"
              >
                Update Check-In
              </button>
              <button onClick={handleModalClose}>Close</button>
            </div>
          </div>
        )}

        {
          selectedModal === "UpdateStudentProfile" && (
            <UpdateStudentProfile
              student={selectedStudent}
              onClose={handleModalClose}
            />
          )
        }
        {
          selectedModal === "ChangeStudentRoom" && (
            <ChangeStudentRoom
              student={selectedStudent}
              onClose={handleModalClose}
            />
          )
        }
        {
          selectedModal === "UpdateCheckIn" && (
            <UpdateCheckIn
              student={selectedStudent}
              onClose={handleModalClose}
            />
          )
        }
      </div>
    );
  };


export default StudentDasboard;