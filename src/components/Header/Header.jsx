import { Button } from "@material-tailwind/react";
import React from "react";

const Header = ({ user }) => {
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
  };  

  const { name } = user;

  return (
    <div className='flex justify-between items-end '>
      <h1 className='text-2xl font-medium'>
        Hello <span className='text-2xl font-extrabold'> {name} </span> 👋{" "}
      </h1>
      {/* <button className='px-4 py-2 bg-red-500 text-white rounded-lg text-md font-bold'>Log Out</button> */}
      <Button variant='outlined' size='md' color='red' onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );
};

export default Header;
