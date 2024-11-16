import React, { useContext } from "react";
import { TaskContext } from "../../context/TaskProvider";

const TaskStatusInfo = () => {
  const { tasks, isLoading, error } = useContext(TaskContext);

  const colorClasses = {
    red: "bg-red-400",
    blue: "bg-blue-400",
    orange: "bg-orange-400",
    green: "bg-green-400",
    gray: "bg-gray-400",
  };

  const textColorClasses = {
    white: "text-white",
    black: "text-black",
    red: "text-red-600",
    blue: "text-blue-600",
    orange: "text-orange-600",
    green: "text-green-600",
  };

  const taskCount = (status) => tasks?.filter((task) => task.taskStatus === status).length || 0;

  const items = [
    { initValue: taskCount("Pending"), title: "Pending", bgColor: "red", textColor: "white" },
    { initValue: taskCount("In Progress"), title: "In Progress", bgColor: "orange", textColor: "white" },
    { initValue: taskCount("Completed"), title: "Completed", bgColor: "green", textColor: "white" },
    { initValue: taskCount("Failed"), title: "Failed", bgColor: "blue", textColor: "white" },
  ];

  if (isLoading) {
    return <div className="text-center text-gray-400">Loading status info...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-5">
      {items.map((item, index) => (
        <div
          key={index}
          className={`${colorClasses[item.bgColor] || "bg-gray-400"} ${
            textColorClasses[item.textColor] || "text-gray-700"
          } w-full sm:w-[30%] py-6 px-9 rounded-2xl select-none transition-all duration-300 transform hover:scale-105`}
        >
          <h2 className="text-3xl font-semibold">{item.initValue}</h2>
          <h3 className="text-2xl font-medium mt-5">{item.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default TaskStatusInfo;
