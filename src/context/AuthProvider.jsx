import { createContext, useState, useEffect } from "react";
import db from "../appwrite/databases";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogin = async (email, password) => {
    try {
      const auth = db.authentication;
      const res = await auth.list();
      const foundUser = res.documents.find((user) => user.email === email);

      if (foundUser && foundUser.password === password) {
        const userData = {
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role,
          employeeId: foundUser.empId,
        };
        setUser(foundUser.role);
        setLoggedInUserData(userData);
        localStorage.setItem("loggedInUser", JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, message: "Invalid email or password" };
      }
    } catch (err) {
      return { success: false, message: "Unable to connect to the server" };
    }
  };

  const handleLogout = () => {
    setUser(null);
    setLoggedInUserData(null);
    localStorage.removeItem("loggedInUser");
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser.role);
      setLoggedInUserData(loggedInUser);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loggedInUserData,
        handleLogin,
        handleLogout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
