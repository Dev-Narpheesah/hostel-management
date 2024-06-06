import { Route, Routes } from "react-router-dom";
import AdminReg from "./Component/Register/AdminReg";
import Login from "./Component/Register/Login";
import StudentReg from "./Component/Register/StudentReg";
import HomeDash from "./Component/Dashboard/HomeDash";
import Layout from "./Component/Layout/Layout";
import StudentDasBoard from "./Component/Dashboard/StudentDasBoard";
import Rooms from "./Component/Dashboard/Rooms";
import AdminPreview from "./Component/AdminPreview/AdminPreview";
import Attendance from "./Component/Attendance/Attendance";
import Loader from "./Component/Loader/Loader";
import { useEffect, useState } from "react";

function App() {
  const renderRoute = () => (
    <Routes>
      <Route path="/" element={<AdminReg />} />
      <Route path="/login" element={<Login />} />
      <Route path="/student-reg" element={<StudentReg />} />
      <Route
        path="/homedash"
        element={
          <Layout>
            <HomeDash />
          </Layout>
        }
      />
      <Route path="/room" element={<Rooms />} />
      <Route path="/studentdash" element={<StudentDasBoard />} />
      <Route path="/adminPrev" element={<AdminPreview />} />
      <Route
        path="/attendance"
        element={
          <Layout>
            <Attendance />
          </Layout>
        }
      />
    </Routes>
  );
  return <> {renderRoute()} </>;
}

export default App;
