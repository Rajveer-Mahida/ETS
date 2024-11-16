import { useState, useEffect } from "react";
import { Chip, Button, Option, Select } from "@material-tailwind/react";
import db from "../../appwrite/databases.js";

const TaskCard = ({
  priority,
  id,
  assignedDate,
  deadline,
  title,
  description,
  status: initialStatus,
  category,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(initialStatus); // Initialize with prop
  const [employees, setEmployees] = useState([]); // State to store employees

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    
  }, []);

  const handleStatusChange = async(newStatus) => {
    setStatus(newStatus);
    setIsEditing(false);
    // #TODO: Update task status in database
    const res = await db.tasks.update(id, { taskStatus: newStatus });
    console.log(res);
    const updateTask = async () => {
    };

  };

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
      <div className='flex justify-between items-center p-4'>
        <span className='text-sm font-medium text-white'>Status: {status}</span>
        <Button size='sm' color='blue' onClick={handleEditClick}>
          Edit
        </Button>
      </div>
      {isEditing && (
        <div className='p-4 text-black'>
          <Select
            color='blue'
            value={status}
            size='md'
            onChange={handleStatusChange}
            label='Change Status'
            className='text-black'
            labelProps={{ className: "text-white" }} // Custom label color
          >
            <Option value='Pending' className='text-black mt-2'>
              Pending
            </Option>
            <Option value='In Progress' className='text-black mt-2'>
              In Progress
            </Option>
            <Option value='Completed' className='text-black mt-2'>
              Completed
            </Option>
            <Option value='Failed' className='text-black mt-2'>
              Failed
            </Option>
          </Select>
        </div>
      )}
    </div>
  );
};

export default TaskCard;