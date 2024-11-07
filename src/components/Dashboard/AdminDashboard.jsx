import React from "react";
import Header from "../Header/Header";
import CreateTask from "../Admin/CreateTask";
import AllTask from "../Admin/AllTask";
import AuthProvider from "../../context/AuthProvider";

const AdminDashboard = ({ user }) => {
  return (
    <div className='p-8'>
      <Header user={user} />
      <CreateTask />
      <AllTask />
    </div>
  );
};

export default AdminDashboard;
