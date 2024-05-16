import { Task } from "@/interface/Task.interface";
import React, { useState, createContext, useMemo, ReactNode } from "react";

export interface TaskContextInterface{
    taskList: Task[];
    setTaskList: (value: Task[]) => void
}

export const TaskContext = createContext<any>({taskList: [], setTaskList: (value: Task[]) => {}});

export const TaskContextProvider = ({children}: {children: ReactNode}) => {
  const [taskList, setTaskList] = useState<Task[]>([]);

  const value = useMemo(() => ({ taskList, setTaskList }), [taskList]);

  return (
      <TaskContext.Provider value={value}>
        {children}
      </TaskContext.Provider>
  )
}