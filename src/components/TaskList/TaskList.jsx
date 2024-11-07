import { Chip, Button } from "@material-tailwind/react";
import TaskCard from "./TaskCard";

// const TaskCard = ({ priority, date, title, description }) => (
//   <div className='min-h-[300px] flex-shrink-0 w-[330px] bg-purple-600 rounded-md'>
//     <div className='flex justify-between items-center p-5'>
//       <Chip color={priority === "High" ? "red" : "green"} value={priority} />
//       <h3 className='text-md font-normal'>{date}</h3>
//     </div>
//     <div className='flex flex-col ml-5 gap-3 mb-6'>
//       <h2 className='text-xl font-bold'>{title}</h2>
//       <p className='text-sm break-words line-clamp-6'>{description}</p>
//     </div>
//     <div className='flex justify-between items-center p-5'>
//       <button className='px-3 py-1 bg-white text-black rounded-md'>Completed</button>
//       <button className='px-3 py-1 bg-white text-black rounded-md'></button>
//     </div>
//   </div>
// );

const TaskList = ({ user }) => {
  console.log("tasklist :: user: ", user);
  return (
    <div
      id='taskslist'
      className='h-[60vh] py-5 mt-10 p-5 flex gap-5 overflow-x-auto md:overflow-x-hidden md:flex-wrap md:justify-start'
    >
      {user.tasks.map((task, index) => (
        <TaskCard
          key={index}
          priority={task.priority}
          assignedDate={task.assignedDate}
          deadline={task.deadline}
          title={task.name}
          description={task.description}
          status={task.taskStatus}
          category={task.category}
        />
      ))}
    </div>
  );
};

export default TaskList;
