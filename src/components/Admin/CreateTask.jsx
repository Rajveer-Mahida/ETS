import React, { useState, useEffect } from "react";
import { Input, Textarea, Button, Select, Option } from "@material-tailwind/react";
import db from "../../appwrite/databases";

const CreateTask = () => {
  const [tasks, setTasks] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task, setTask] = useState({
    title: "",
    deadline: "",
    assignTo: "",
    category: "",
    priority: "",
    description: "",
    taskStatus: "Pending",
    assignedDate: dayjs().format('DD-MM-YYYY'),
    isCompleted: false,
  });

  const listTasks = async () => {
    const res = await db.tasks.list();
    setTasks(res.documents);
  };

  const createTask = async (task) => {
    try {
      const payload = task;

      console.log("Creating new task:", payload);

      await db.tasks.create(payload);
      listTasks();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();

    await createTask(task);

    // Reset form fields and close modal
    setTask({
      title: "",
      deadline: "",
      assignTo: "",
      category: "",
      priority: "",
      description: "",
    });
    toggleModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  return (
    <>
      <div className='w-full mx-auto p-6 bg-[#1c1c1c] rounded-md shadow-md mt-10 text-white space-y-6'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-semibold'>Admin Dashboard</h2>
          <Button color='blue' size='md' onClick={toggleModal}>
            Create Task
          </Button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className='fixed inset-0 z-[999] flex justify-center bg-gray-800 bg-opacity-80 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn'
          onClick={toggleModal}
        >
          <div
            className='relative mt-10 p-6 w-full max-w-2xl h-full max-h-fit rounded-lg bg-[#2c2c2c] text-white shadow-lg animate-slideDown'
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={toggleModal} className='absolute top-6 right-6 text-gray-500 hover:text-gray-300'>
              <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='white'>
                <path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
              </svg>
            </button>
            <h2 className='text-xl font-semibold'>Create Task</h2>

            {/* Form Fields */}
            <form onSubmit={handleTaskSubmit}>
              <div className='space-y-4 mt-4'>
                <Input
                  label='Task Title'
                  type='text'
                  required
                  color='white'
                  className='w-full text-white'
                  name='title'
                  value={task.title}
                  onChange={handleChange}
                />
                <Input
                  label='Deadline'
                  type='date'
                  required
                  color='white'
                  className='w-full text-white'
                  name='deadline'
                  value={task.date}
                  onChange={handleChange}
                />
                <Input
                  label='Assign To ( Employee ID )'
                  type='text'
                  required
                  color='white'
                  className='w-full text-white'
                  name='assignTo'
                  value={task.assignTo}
                  onChange={handleChange}
                />
                <Select
                  label='Task Category'
                  required
                  className='w-full text-black'
                  value={task.category}
                  onChange={(value) => handleSelectChange("category", value)}
                >
                  {[
                    "Development",
                    "Testing",
                    "Deployment",
                    "Maintenance",
                    "Documentation",
                    "Research",
                    "Project Management",
                    "Client Communication",
                  ].map((category) => (
                    <Option key={category} className='text-black mt-2' value={category}>
                      {category}
                    </Option>
                  ))}
                </Select>
                <Select
                  required
                  label='Priority'
                  className='w-full text-black'
                  value={task.priority}
                  onChange={(value) => handleSelectChange("priority", value)}
                >
                  {["High", "Medium", "Low"].map((priority) => (
                    <Option key={priority} className='text-black mt-2' value={priority}>
                      {priority}
                    </Option>
                  ))}
                </Select>

                <Textarea
                  variant='standard'
                  label='Description'
                  rows={4}
                  required
                  color='white'
                  className='w-full text-white'
                  name='description'
                  value={task.description}
                  onChange={handleChange}
                />
                <div className='flex justify-end mt-4'>
                  <Button color='blue' size='md' type='submit'>
                    Submit Task
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTask;
