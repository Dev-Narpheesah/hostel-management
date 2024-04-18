import React from 'react'
import "./Register.css"



const StudentReg = () => {
//   return (
//     <div>
//       Student reg page

//       {/*  Student's name, Age, Room Number, Contact Email, Guardian's Name, Guardian's Email*/}
//       {/*  Button should have Register as the text*/}
      
//     </div>
//   )

return (
    <div className="container form__ --100vh">
      <div className="form-container">
        <p className="title"> Student Registration. </p>

        <form className="form">
          <div className="--dir-column">
            <label htmlFor="text">Student&apos;s name:</label>
            <input
              type="text"
              className="input"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="--dir-column">
            <label htmlFor="email">Student&apos;s email:</label>
            <input
              type="email"
              className="input"
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div className="--dir-column">
            <label htmlFor="text">Age:</label>
            <input
              type="text"
              className="input"
              placeholder="20"
              required
            />
          </div>
          <div className="--dir-column">
            <label htmlFor="text">Room Number:</label>
            <input
              type="text"
              className="input"
              placeholder="001"
              required
            />
          </div>
        
          <div className="--dir-column">
            <label htmlFor="text">Guardian&apos;s name:</label>
            <input
              type="text"
              className="input"
              placeholder="Enter guardian's name"
              required
            />
          </div>
          <div className="--dir-column">
            <label htmlFor="email">Guardian&apos;s email:</label>
            <input
              type="email"
              className="input"
              placeholder="example@gmail.com"
              required
            />
          </div>
          <button className="--btn">Add Student</button>
        </form>
      </div>
    </div>
  );
}

export default StudentReg
