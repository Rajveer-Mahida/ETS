import { useState, useContext, useEffect } from "react";
import Login from "./components/Auth/Login";
import { AuthContext } from "./context/AuthProvider";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboad";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { Spinner } from "@material-tailwind/react";
import { setLocalStorage } from "./utils/localStorage";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [employeeTasks, setEmployeeTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const authData = useContext(AuthContext);

  const handleLogin = (email, password) => {
    const { employees, admin } = authData;
    const employeeUser = employees.find((employee) => employee.email === email);
    const adminUser = admin.find((admin) => admin.email === email);

    if (employeeUser && employeeUser.password === password) {
      setUser("employee");
      const employeeData = {
        email: employeeUser.email,
        name: employeeUser.name,
        role: "employee",
        tasks: employeeUser.tasks,
      };
      setLoggedInUserData(employeeData);
      localStorage.setItem("loggedInUser", JSON.stringify(employeeData));
    } else if (adminUser && adminUser.password === password) {
      setUser("admin");
      const adminData = { email: adminUser.email, name: adminUser.name, role: "admin" };
      setLoggedInUserData(adminData);
      localStorage.setItem("loggedInUser", JSON.stringify(adminData));
    } else {
      console.error("Invalid login");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("employees") || !localStorage.getItem("admin")) {
      setLocalStorage();
    }

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
      setUser(loggedInUser.role);
      setLoggedInUserData(loggedInUser); // Set loggedInUserData from localStorage
    }

    console.log("loggedInUserData: ", loggedInUserData);
    // console.log("user: ", employeeUser);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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
        <Login handleLogin={handleLogin} />
      )}
    </>
  );
};

export default App;
