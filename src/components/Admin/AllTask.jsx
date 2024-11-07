import { Button } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { getLocalStorage } from "../../utils/localStorage";

const AllTask = () => {
  const [filter, setFilter] = useState("All"); // State to manage the current filter
  const [employees, setEmployees] = useState([]); // State to store employees

  useEffect(() => {
    const { employees: storedEmployees } = getLocalStorage() || {}; // Retrieve employees from local storage
    setEmployees(storedEmployees || []);
  }, [getLocalStorage]); // Only re-run if getLocalStorage reference changes

  // Combine tasks from all employees and include employee names
  const tasksdata = employees.reduce((acc, employee) => {
    if (employee?.name && Array.isArray(employee.tasks)) {
      const tasksWithNames = employee.tasks.map((task) => ({
        ...task,
        empName: employee.name, // Add employee name to each task
      }));
      return [...acc, ...tasksWithNames];
    }
    return acc;
  }, []);

  // Extract unique categories from tasks
  const uniqueCategories = ["All", ...new Set(tasksdata.map((task) => task.category))];

  // Filter tasks based on the selected category
  const filteredTasks = tasksdata.filter((task) => filter === "All" || task.category === filter);

  // Function to delete a task from tasksdata
  const handleDelete = (index) => {
    const updatedEmployees = employees.map((employee) => {
      const updatedTasks = employee.tasks.filter((_, taskIndex) => taskIndex !== index);
      return { ...employee, tasks: updatedTasks };
    });
    setEmployees(updatedEmployees);
  };

  return (
    <div className='bg-[#1c1c1c] p-4 sm:p-5 rounded mt-5 h-full pb-10'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center'>
        <h2 className='text-2xl font-semibold mb-2 sm:mb-0'>All Tasks</h2>
        {/* <div className='flex space-x-2 overflow-auto'>
          {uniqueCategories.map((category) => (
            <button
              key={category}
              className={`px-3 py-1 rounded ${filter === category ? "bg-blue-500" : "bg-gray-500"}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div> */}
      </div>
      <div className='mt-5'>
        {filteredTasks.map((task, index) => (
          <div key={index} className='flex justify-between items-center bg-[#2c2c2c] p-3 rounded-xl mb-2'>
            <div className='flex-1'>
              <h3 className='text-lg font-semibold'>{task.name}</h3>
              <span className='text-sm text-gray-300'>{task.description}</span>
              <p className='text-sm text-gray-300'>{task.deadline}</p>
            </div>
            <div className='flex flex-col items-end'>
              <p className='text-md font-semibold'>{task.empName}</p>
              <p className='text-sm text-gray-300'>{task.category}</p>
            </div>
            <Button size='sm' color='red' onClick={() => handleDelete(index)} className='ml-4'>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTask;
