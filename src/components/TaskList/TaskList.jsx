import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import db from "../../appwrite/databases.js";

const TaskList = ({ user }) => {
  const [tasks, setTasks] = useState(null);
  const listTasks = async () => {
    const res = await db.tasks.list();
    setTasks(res.documents);
  };
  useEffect(() => {
    listTasks();
  }, []);

  return (
    <div
      id='taskslist'
      className='h-[60vh] py-5 mt-10 p-5 flex gap-5 overflow-x-auto md:overflow-x-hidden md:flex-wrap md:justify-start'
    >
      {tasks &&
        tasks.map((task, index) => (
          <TaskCard
            key={task.$id}
            id={task.$id}
            priority={task.priority}
            assignedDate={task.assignedDate}
            deadline={task.deadline}
            title={task.title}
            description={task.description}
            status={task.taskStatus}
            category={task.category}
          />
        ))}
    </div>
  );
};

export default TaskList;
