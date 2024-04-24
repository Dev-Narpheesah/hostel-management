import React from 'react'
import './Dashboard.css'
import { useState} from 'react'
import {Link} from 'react-router-dom'
import {RiDeleteBin6Line} from "react-icons/ri"
import SideBar from './SideBar'


const studentsData=[
  {
    id:1,
    name:"Jessica Smith",
    email:"jessicasmith@gmail.com",
    idNumber:"12345",
    gender:"female",
    age:21,
    nationality:"Spanish"

  },
  {
    id:2,
    name:"Jason Musk",
    email:"musk312@gmail.com",
    idNumber:"23456",
    gender:"Male",
    age:25,
    nationality:"American"

  },
  {
    id:3,
    name:"Emily Stone",
    email:"emilystone@gmail.com",
    idNumber:"34567",
    gender:"Female",
    age:32,
    nationality:"Egyptian"

  }
]

const StudentDashBoard = () => {
  const [searchTerm, setSearchTerm]= useState('')
  const [students, setStudents]= useState(studentsData)
  const [filteredData, setFilteredData]= useState(studentsData)

//targetting the searchbar that will be call later
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    const filtered = studentsData.filter(
      (student) =>
      student.name.toLowerCase().includes(term) ||
      student.email.toLowerCase().includes(term)


    );
    setFilteredData(filtered)
  }


  const handleDelete = (studentId) => {
     // Filter out the deleted student from the students array
    const updatedStudents = students.filter(
      (student) => student.id !==studentId
    );
    setStudents(updatedStudents);

    const updatedFilteredData= filteredData.filter(
      (student) => student.id !==studentId
    );
    setFilteredData(updatedFilteredData)
  }





  return (
    <div className="container --flex-start">
      <SideBar/>
      <div className='right'>
        <p>students</p>
        <p>Search students</p>

        <input placeholder='search by name, email, or ID number'
        type='text'
        className='search'
        value={searchTerm}
        onChange={handleSearchChange} />

        < div className='table'>
          <table className='table_wrapper'>
            <thead className='table_head'> 
              <tr className='table__row'>
                <th className='same_class'>Student Name</th>
                <th className='same_class'>Email</th>
                <th className='same_class'>ID number</th>
                <th className='same_class'>Gender</th>
                <th className='same_class'>Age</th>
                <th className='same_class'>Nationality</th>
                <th className='same_class'>Actions</th>

              </tr>
            </thead>

            <tbody className='table__body'>
              {filteredData.map((student, index) =>(
                <tr key={index} className='table__row'>
                  <td className='same_class'>{student.name}</td>
                  <td className='same_class'>{student.email}</td>
                  <td className='same_class'>{student.idNumber}</td>
                  <td className='same_class'>{student.gender}</td>
                  <td className='same_class'>{student.age}</td>
                  <td className='same_class'>{student.nationality}</td>
                  <td className='same_class'>
                    <RiDeleteBin6Line size={25} color="red"
                    onClick={() => handleDelete(student.id)} />
                  </td>

                </tr>
              ))
              }

            </tbody>
          </table>
        </div>
        <button className='btn-secondary'>
              <Link to="/student-reg">Add a student</Link>
        </button>


      </div>
    </div>
  )
}

export default StudentDashBoard