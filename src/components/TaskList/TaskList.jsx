import { useEffect, useState, useContext } from "react";
import TaskCard from "./TaskCard";
import db from "../../appwrite/databases";
import { TaskContext } from "../../context/TaskProvider";

const TaskList = () => {
  const taskData = useContext(TaskContext);
  const { tasks, loading, error } = taskData;

  return (
    <div
      id='taskslist'
      className='h-[60vh] py-5 mt-10 p-5 flex gap-5 overflow-x-auto md:overflow-x-hidden md:flex-wrap md:justify-start'
    >
      {loading && <p>Loading tasks...</p>}
      {error && <p className='text-red-500'>Failed to load tasks</p>}
      {!loading && tasks?.length === 0 && <p>No tasks available</p>}

      {tasks && <TaskCard />}
    </div>
  );
};

export default TaskList;
