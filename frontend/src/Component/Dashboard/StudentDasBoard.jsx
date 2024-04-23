import React, { useState } from "react";
import SideBar from "./SideBar";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const studentData = [
  {
    id: 1,
    name: "Jessica Smith",
    email: "jessica.smith@gmail.com",
    idNumber: "12345",
    gender: "Female",
    age: 20,
    nationality: "American",
  },
  {
    id: 2,
    name: "Mason Musk",
    email: "mason.willy@gmail.com",
    idNumber: "23456",
    gender: "Male",
    age: 21,
    nationality: "British",
  },
  {
    id: 3,
    name: "Emily Stone",
    email: "mily.stone@gmail.com",
    idNumber: "34567",
    gender: "Female",
    age: 25,
    nationality: "Spanish",
  },
  {
    id: 4,
    name: "Nelson Matt",
    email: "nelson.matt@gmail.com",
    idNumber: "45678",
    gender: "Male",
    age: 28,
    nationality: "Egyptian",
  },
];

const StudentDasBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState(studentData);
  const [filtereddata, setFilteredData] = useState(studentData);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowecase();
    setSearchTerm(term);
    const filtered = studentData.filter(
      (student) =>
        student.name.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  const handleDelete = (studentId) => {
    const updatedStudents = students.filter(
      (student) => student.id !== studentId
    );
    setStudents(updatedStudents);
    const updatedFilteredData = filtereddata.filter(
      (student) => student.id !== studentId
    );
    setFilteredData(updatedFilteredData);
  };

  return (
    <div className="container --flex-start">
      <SideBar />
      <div className="right">
        <p>Students</p>
        <p>Search Students</p>

        <input
          placeholder="Search by name, email, or ID number"
          type="text"
          className="search"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div className="table">
          <table className="table__wrapper">
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
              {filtereddata.map((student, index) => (
                <tr key={index} className="table__row">
                  <td className="same__class">{student.name}</td>
                  <td className="same__class">{student.email}</td>
                  <td className="same__class">{student.idNumber}</td>
                  <td className="same__class">{student.gender}</td>
                  <td className="same__class">{student.age}</td>
                  <td className="same__class">{student.nationality}</td>
                  <td className="same__class">
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
          <Link to="/student-reg">Add a Student</Link>
        </button>
      </div>
    </div>
  );
};

export default StudentDasBoard;
