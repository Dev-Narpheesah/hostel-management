import { useState } from "react";
import "./AdminPreview.css";
import { CiSearch } from "react-icons/ci";
import UserTable from "./UserTable";

const UserData = [
  { name: "Nafisah", email: "nafisah@gmail.com", role: "Admin", id: 1 },
  { name: "Zainab", email: "zainab@gmail.com", role: "User", id: 2 },
  { name: "Basirat", email: "basirat@gmail.com", role: "Member", id: 3 },
  { name: "Azeez", email: "azeez@gmail.com", role: "Admin", id: 4 },
  { name: "Soliu", email: "soliu@gmail.com", role: "Member", id: 5 },
];

const AdminPreview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(UserData);
  const [filteredData, setFilteredData] = useState(UserData);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    setFilteredData(updatedUsers);
  };

  const handleUpdateRole = (userId, newRole) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
    setFilteredData(updatedUsers);
  };

  return <div className="__prevCon">
    <h2 className="__prevHeader">Admins</h2>

    <div className="__prevSearchCon">
        <CiSearch className="__prevSearchIcon"/>

        <input 
        type="text"
        className="__prevSearch"
        placeholder="Search by nameor email or role"
        value={searchTerm}
        onChange={handleSearchChange} />
    </div>

    <div className="__prevList">
        <UserTable data={filteredData} onDelete={handleDelete} onUpdateRole={handleUpdateRole}/>
    </div>

    <div className="__inviteBtnCon">
        <button className="__inviteBtn">
            Invite Admin
        </button>

    </div>

  </div>
};

export default AdminPreview;
