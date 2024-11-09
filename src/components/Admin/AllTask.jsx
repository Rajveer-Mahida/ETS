import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import db from "../../appwrite/databases";

const AllTask = () => {
  const [filter, setFilter] = useState("All"); // State to manage the current filter
  const [tasks, setTasks] = useState([]); // State to store tasks with employee details

  // Function to fetch tasks from the database and set them to the state
  const listTasks = async () => {
    try {
      const res = await db.tasks.list(); // Fetch tasks from the database
      const taskData = res.documents || []; // Ensure we have an array
      setTasks(taskData);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    listTasks(); // Fetch tasks when component mounts
  }, []);

  // Extract unique categories from tasks
  const uniqueCategories = ["All", ...new Set(tasks.map((task) => task.category))];

  // Filter tasks based on the selected category
  const filteredTasks = tasks.filter((task) => filter === "All" || task.category === filter);

  // Function to delete a task from the database and update the state
  const handleDelete = async (taskId) => {
    try {
      console.log("Deleting task with ID:", taskId);
      await db.tasks.delete(taskId); // Delete the task from the database
      setTasks(tasks.filter((task) => task.$id !== taskId)); // Remove the task from the state
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className='bg-[#1c1c1c] p-4 sm:p-5 rounded mt-5 h-full pb-10'>
    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center'>
  <h2 className='text-xl sm:text-2xl font-semibold mb-2 sm:mb-0'>All Tasks</h2>

  {/* Dropdown for category filtering */}
  <div className='mt-2 sm:mt-0'>
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className='px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
    >
      {uniqueCategories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  </div>
</div>

      <div className='mt-5'>
        {filteredTasks.map((task) => (
          <div
            key={task.$id}
            className='flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#2c2c2c] p-3 rounded-xl mb-2'
          >
            <div className='flex-1 mb-2 sm:mb-0'>
              <h3 className='text-lg font-semibold'>{task.title}</h3>
              <span className='text-sm text-gray-300'>{task.description}</span>
              <p className='text-sm text-gray-300'>{task.deadline}</p>
            </div>
            <div className='flex flex-col items-start sm:items-end mb-2 sm:mb-0'>
              <p className='text-md font-semibold'>{task.empName}</p>
              <p className='text-sm text-gray-300'>{task.category}</p>
            </div>
            <Button
              size='sm'
              color='red'
              onClick={() => handleDelete(task.$id)} // Pass task.$id to handleDelete
              className='ml-0 sm:ml-4'
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTask;
