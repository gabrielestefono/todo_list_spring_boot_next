import { ChildrenProps } from "@/interface/ChildrenProps.interface";
import { Task } from "@/interface/Task.interface";
import React, { useEffect, useState, createContext } from "react";

export interface TaskContextInterface{
    taskList: Task[];
    setAtualizar: (value: boolean) => void;
}

export const TaskContext = createContext <TaskContextInterface>({taskList: [],setAtualizar: () => {}});

export const TaskContextProvider = ({children, initialTasks}: ChildrenProps & { initialTasks: Task[] }) => {
    const [taskList, setTaskList] = useState<Task[]>(initialTasks);
    const [atualizar, setAtualizar] = useState<boolean>(false);

    useEffect(()=>{
      async function fetchTasks(){
        const res = await fetch(`http://localhost:8080/task`);
        const tasks: Task[] = await res.json();
        setTaskList(tasks);
      };

      if (atualizar) {
        fetchTasks();
        setAtualizar(false);
      }
    },[atualizar]);
    
    return (
        <TaskContext.Provider value={{taskList, setAtualizar}}>
            {children}
        </TaskContext.Provider>
    )
}