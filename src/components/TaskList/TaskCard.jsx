import { Button } from "@material-tailwind/react";
import { useState, useContext } from "react";
import db from "../../appwrite/databases";
import { TaskContext } from "../../context/TaskProvider";
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

const AllTask = ({

}) => {
  const [filter, setFilter] = useState("All");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { tasks, isLoading, error, listTasks } = useContext(TaskContext);
  console.log(tasks);

  const uniqueCategories = ["All", ...new Set(tasks.map((task) => task.category))];
  const filteredTasks = tasks.filter((task) => filter === "All" || task.category === filter);

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setOpenDialog(true);
    setDeleteError(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTaskToDelete(null);
    setDeleteError(null);
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;

    try {
      setIsDeleting(true);
      await db.tasks.delete(taskToDelete.$id);

      // Fetch the latest tasks after deletion
      await listTasks();

      handleCloseDialog();
    } catch (error) {
      console.error("Failed to delete task:", error);
      setDeleteError("Failed to delete task. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className='bg-[#1c1c1c] p-4 sm:p-5 rounded mt-5 h-100vh w-full pb-10'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center'>
        <h2 className='text-xl sm:text-2xl font-semibold mb-2 sm:mb-0'>All Tasks</h2>

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

      {isLoading ? (
        <div className='text-center py-8 text-gray-400'>Loading tasks...</div>
      ) : error ? (
        <div className='text-center py-8 text-red-500'>Error: {error}</div>
      ) : (
        <div className='mt-5 space-y-3'>
          {filteredTasks.length === 0 ? (
            <div className='text-center py-8 text-gray-400'>No tasks found for the selected category</div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.$id}
                className='flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#2c2c2c] p-4 rounded-xl transition-all hover:bg-[#323232]'
              >
                <div className='flex-1 mb-2 sm:mb-0'>
                  <h3 className='text-lg font-semibold'>{task.title}</h3>
                  <span className='text-sm text-gray-300'>{task.description}</span>
                  <p className='text-sm text-gray-300 mt-1'>Deadline: {task.deadline}</p>
                </div>
                <div className='flex flex-col items-start sm:items-end mb-2 sm:mb-0'>
                  <p className='text-md font-semibold'>{task.empName}</p>
                  <span className='text-sm px-2 py-1 rounded bg-purple-500/20 text-purple-300 mt-1'>
                    {task.category}
                  </span>
                </div>
                <Button
                  size='sm'
                  color='red'
                  onClick={() => handleDeleteClick(task)}
                  className='ml-0 sm:ml-4 mt-2 sm:mt-0'
                  disabled={isDeleting && taskToDelete?.$id === task.$id}
                >
                  Delete
                </Button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} handler={handleCloseDialog}>
        <DialogHeader>Confirm Deletion</DialogHeader>
        <DialogBody className='text-gray-700'>
          Are you sure you want to delete the task "{taskToDelete?.title}"?
          {deleteError && <p className='text-red-500 mt-2 text-sm'>{deleteError}</p>}
        </DialogBody>
        <DialogFooter>
          <Button variant='text' color='gray' onClick={handleCloseDialog} disabled={isDeleting} className='mr-2'>
            Cancel
          </Button>
          <Button variant='gradient' color='red' onClick={handleConfirmDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Confirm Delete"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default AllTask;
