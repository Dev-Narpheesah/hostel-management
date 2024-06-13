import { useState } from "react";
import "./Dashboard.css";
import axios from "axios";

const EditStatusModal = ({ room, onUpdateRoom, onClose }) => {
  const [newStatus, setNewStatus] = useState(room.status);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");



  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError("");

    try {
      const response = await axios.patch(`https://hostel-management-sand.vercel.app/room/update-room/${room._id}`, {
        roomStatus: newStatus
      }) 

      console.log("Room Updated!");
      onUpdateRoom(response.data);
      onClose();
    } catch (error) {
      setError("Failed to update room status, please try again!")
      console.log(error);
    } finally {
      setIsSubmitting(false)
    }
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-title">Edit Room Status</h2>
        <p className="room-number">Room Number:{room.roomNumber}</p>
        <label htmlFor="status" className="status-label">
          New Status
        </label>

        <div className="right">
          <input
            type="text"
            className="search"
            id="status"
            value={newStatus}
            onChange={handleStatusChange}
          />
        </div>

        <div className="button-group">
          <button className="save-button" onClick={handleSubmit}>
            Save
          </button>
          <button className="cancel-button" onClick={onClose}>
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStatusModal;
