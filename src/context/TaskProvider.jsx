import React, { createContext, useState, useEffect, useCallback } from "react";
import db from "../appwrite/databases.js";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const listTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await db.tasks.list();
      setTasks(res.documents || []);
    } catch (err) {
      setError(err.message);
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    listTasks();
  }, [listTasks]);

  const value = {
    tasks,   
    isLoading,
    error,
    listTasks,
  };

  return <TaskContext.Provider value={value}> {children}</TaskContext.Provider>;
};

export { TaskProvider, TaskContext };
