import React, { useState } from "react";
import axios from "axios";

const UpdateStudentProfile = ({ student, onClose }) => {
  const [formData, setFormData] = useState({
    name: student.name,
    age: student.age,
    nationality: student.nationality,
    g_name: student.guardian.guardianName,
    g_email: student.guardian.guardianEmail,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(
        `https://hostel-management-sand.vercel.app/student/${student._id}`,
        formData
      );
    } catch (error) {
      console.log("Error updating student profile", error);
    }

    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Update Student Profile</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="age">Age</label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="nationality">Nationality</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="g_name">Guardian Name</label>
            <input
              type="text"
              name="g_name"
              value={formData.g_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="g_email">Guardian Email</label>
            <input
              type="text"
              name="g_email"
              value={formData.g_email}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Update</button>

          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudentProfile;
