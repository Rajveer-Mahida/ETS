import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboad";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { Spinner } from "@material-tailwind/react";

const App = () => {
  const { user, loggedInUserData, handleLogin, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-[#1f1f1f]'>
        <Spinner color='blue' className='h-12 w-12' />
      </div>
    );
  }

  return (
    <>
      {user === "employee" ? (
        <EmployeeDashboard user={loggedInUserData} />
      ) : user === "admin" ? (
        <AdminDashboard user={loggedInUserData} />
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
