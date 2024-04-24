import { useState } from "react";
import RoomTable from "./RoomTable";
import SideBar from "./SideBar";

const initialRooms = [
  {
    roomNumber: "101",
    capacity: 4,
    occupancy: 2,
    status: "Available",
    location: "Lakeside Manor, Riverside",
  },
  {
    roomNumber: "102",
    capacity: 3,
    occupancy: 3,
    status: "Occupied",
    location: "Hillview Hostel, Springfield",
  },
  {
    roomNumber: "103",
    capacity: 4,
    occupancy: 3,
    status: "Available",
    location: "Maplewood Lodge, Greenfield",
  },
];

const Rooms = () => {
  const [searchTerm, setSearchTerm] = useState(""); // input handler
  const [rooms, setRooms] = useState(initialRooms); // our data state
  const [filteredData, setFilteredData] = useState(initialRooms); // filter your data according to our input

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = rooms.filter(
      (room) =>
        room.roomNumber.toLowerCase().includes(term) ||
        room.status.toLowerCase().includes(term) ||
        room.location.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  const handleAddRoom = (newRoomData) => {
    setRooms([...rooms, newRoomData]);
    setFilteredData([...rooms, newRoomData]);
  };

  const handleUpdateRoom = (roomNumber, newStatus) => {
    const updatedRooms = rooms.map((room) =>
      room.roomNumber === roomNumber ? { ...room, status: newStatus } : room
    );
    setRooms(updatedRooms);
    setFilteredData(updatedRooms);
  };

  const handleDeleteRoom = (roomNumber) => {
    const updatedRooms = rooms.filter((room) => room.roomNumber !== roomNumber);
    setRooms(updatedRooms);
    setFilteredData(updatedRooms);
  };

  return (
    <div className="container --flex-start --gap">
      <SideBar />
      <div>
        <h1>Hostel Room Listing</h1>
        <input
          placeholder="Search by room number, status, or location"
          type="text"
          className="search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <RoomTable
          rooms={filteredData}
          onAddRoom={handleAddRoom}
          onUpdateRoom={handleUpdateRoom}
          onDeleteRoom={handleDeleteRoom}
        />
      </div>
    </div>
  );
};

export default Rooms;
