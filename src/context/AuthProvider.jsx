import React, { useEffect, useState } from "react";
import { getLocalStorage } from "../utils/localStorage";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [usersInfo, setUsersInfo] = useState({});

  useEffect(() => {
    const { employees, admin } = getLocalStorage();
    setUsersInfo({ employees, admin });
    // console.log("AuthProvider :: usersInfo:", { employees, admin });
  }, []);

  return <AuthContext.Provider value={usersInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
