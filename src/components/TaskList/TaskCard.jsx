import { useState } from "react";
import { Chip, Button, Option } from "@material-tailwind/react";
import { useEffect } from "react";

const TaskCard = ({ priority, assignedDate, deadline, title, description, status = "Pending", category }) => {
  const [isEditing, setIsEditing] = useState(false);

  

  // const [status, setStatus] = useState("Pending");

  // const handleEditClick = () => {
  //   setIsEditing(!isEditing);
  // };

  // const handleStatusChange = (newStatus) => {
  //   setStatus(newStatus);
  //   setIsEditing(false);
  // };

  // useEffect(() => {
  //   console.log(status);
  // }, [status]);

  return (
    <div className='min-h-[300px] flex flex-col justify-between flex-shrink-0 w-[330px] bg-purple-600 rounded-md shadow-lg'>
      <div className='flex justify-between items-center p-4 border-b border-purple-400'>
        <Chip color={priority === "High" ? "red" : "green"} value={priority} />
        <h3 className='text-sm font-medium text-gray-200'>{assignedDate}</h3>
        <p className='text-sm text-gray-100 line-clamp-6 font-semibold'>{category}</p>
      </div>
      <div className='flex flex-col p-4 gap-2'>
        <h2 className='text-lg font-bold text-white'>{title}</h2>
        <p className='text-sm text-gray-300 line-clamp-6'>{description}</p>
        <h4 className='text-sm font-medium '>Deadline: {deadline}</h4>
      </div>
      <div className='flex justify-between items-center p-4 '>
        <span className='text-sm font-medium text-white'>Status: {status}</span>
        <button className='text-xs px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700' onClick={() => {}}>
          Edit
        </button>
      </div>
      {isEditing && <div>Edit Status</div>}
    </div>
  );
};

export default TaskCard;
