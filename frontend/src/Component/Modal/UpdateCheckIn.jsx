import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdateCheckIn = ({ student, onClose }) => {
  const [action, setAction] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [currentRoomNumber, setCurrentRoomNumber] = useState("");

  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (student.room) {
        try {
          const response = await axios.get(
            `https://hostel-management-sand.vercel.app/room/${student.room}`
          );
          setCurrentRoomNumber(response.data.roomNumber);
        } catch (error) {
          console.error("Error fetching room details", error);
        }
      }
    };
    fetchRoomDetails();
  }, [student.room]);

  const handleActionChange = (e) => {
    setAction(e.target.value);
  };

  const handleRoomNumberChange = (e) => {
    setRoomNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://hostel-management-sand.vercel.app//student/check-in-status`,
        {
          action,
          roomNumber,
          studentId: student._id,
        }
      );
      onClose();
    } catch (error) {
      console.error("Error updating check in status", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Update Check-In Status</h2>

        <p>
          Current Status: {student.checkedIn ? "Checked In" : "Checked Out"}
        </p>

        <p>Current Room : {currentRoomNumber || "Not Assigned"}</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Room Number</label>
            <input type="text" value={roomNumber} onChange={handleRoomNumberChange} placeholder="Enter room Number" />
          </div>

         <div>
         <label htmlFor="">Action</label>

<select value={action} onChange={handleActionChange}>
  <option value="&nbsp;">Select An Action</option>
  <option value="checkIn" disabled={student.checkedIn}>Check In</option>
  <option value="checkOut" disabled={!student.checkedIn}>Check Out</option>
</select>
         </div>

         <button>Update Status</button>
         <button onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCheckIn;
