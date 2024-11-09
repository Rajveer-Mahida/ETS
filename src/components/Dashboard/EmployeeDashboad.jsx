import React from "react";
import Header from "../Header/Header";
import TaskStatusInfo from "../TaskList/TaskStatusInfo";
import TaskList from "../TaskList/TaskList";

const EmployeeDashboad = ({ user }) => {
 
  return (
    <div className='w-full  p-8  '>
      <Header user={user} />
      <TaskStatusInfo user={user} />
      <TaskList user={user} />
    </div>
  );
};

export default EmployeeDashboad;
