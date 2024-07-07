"use client";
import axios, { AxiosError } from "axios";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

// export const TaskContext = createContext<Project[]>([]);
interface TaskContextType {
  tasks: Task[];
  fetchTasks: () => void;
}
export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  fetchTasks: () => {},
});

export interface Task {
  id: number;
  name: string;
  details: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const TaskProvider = ({ children }: PropsWithChildren) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [axiosError, setAxiosError] = useState<AxiosError | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/task");
      setTasks(response.data);
    } catch (error: AxiosError | any) {
      setAxiosError(error as AxiosError);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
