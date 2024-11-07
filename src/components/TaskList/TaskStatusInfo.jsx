import React from "react";

const TaskStatusInfo = ({ user }) => {
  // Define an array of items to display
  // const items = [
  //   {
  //     initValue: 10,
  //     title: "Pending",
  //     bgColor: "red",
  //     textColor: "white",
  //   },
  //   {
  //     initValue: 28,
  //     title: "In Progress",
  //     bgColor: "orange",
  //     textColor: "white",
  //   },
  //   {
  //     initValue: 49,
  //     title: "Completed",
  //     bgColor: "green",
  //     textColor: "white",
  //   },
  //   {
  //     initValue: 89,
  //     title: "Failed",
  //     bgColor: "blue",
  //     textColor: "white",
  //   },
  // ];

  const items = [
    {
      initValue: user.tasks.filter((task) => task.taskStatus === "Pending").length,
      title: "Pending",
      bgColor: "red",
      textColor: "white",
    },
    {
      initValue: user.tasks.filter((task) => task.taskStatus === "In Progress").length,
      title: "In Progress",
      bgColor: "orange",
      textColor: "white",
    },
    {
      initValue: user.tasks.filter((task) => task.taskStatus === "Completed").length,
      title: "Completed",
      bgColor: "green",
      textColor: "white",
    },
    {
      initValue: user.tasks.filter((task) => task.taskStatus === "Failed").length,
      title: "Failed",
      bgColor: "blue",
      textColor: "white",
    },
  ];

  // Define a mapping of color names to Tailwind CSS classes
  const colorClasses = {
    red: "bg-red-400",
    blue: "bg-blue-400",
    orange: "bg-orange-400",
    yellow: "bg-yellow-400",
    green: "bg-green-400",
    teal: "bg-teal-400",
    purple: "bg-purple-400",
    pink: "bg-pink-400",
    white: "bg-white",
    black: "bg-black",
  };

  return (
    <div className=' flex flex-col sm:flex-row justify-between items-start mt-10 gap-5'>
      {items.map((item, index) => (
        <div
          key={index}
          className={`${colorClasses[item.bgColor] || "bg-gray-400"} text-${
            item.textColor
          } w-full sm:w-[30%] py-6 px-9 rounded-2xl select-none`}
        >
          <h2 className='text-3xl font-semibold'>{item.initValue}</h2>
          <h3 className='text-2xl font-medium mt-5'>{item.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default TaskStatusInfo;
