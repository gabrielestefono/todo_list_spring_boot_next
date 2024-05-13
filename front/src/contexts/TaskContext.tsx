import { ChildrenProps } from "@/interface/ChildrenProps.interface";
import { Task } from "@/interface/Task.interface";
import { TaskChild } from "@/interface/TaskChild.interface";
import React, { useEffect, useState, createContext } from "react";

export interface TaskContextInterface{
    taskList: Task[];
    setAtualizar: (value: boolean) => void;
    setAtualizarEspecifico: (value: boolean) => void;
}

export const TaskContext = createContext <TaskContextInterface>({taskList: [], setAtualizar: () => {}, setAtualizarEspecifico: () => {}});

export const TaskContextProvider = ({children, initialTasks, id}: ChildrenProps & { initialTasks: Task[], id?: number }) => {
    const [taskList, setTaskList] = useState<Task[]>(initialTasks);
    const [atualizar, setAtualizar] = useState<boolean>(false);
    const [atualizarEspecifico, setAtualizarEspecifico] = useState<boolean>(false);

    useEffect(()=>{
      async function fetchTasks(){
        const res = await fetch(`http://localhost:8080/task`);
        const tasks: Task[] = await res.json();
        setTaskList(tasks);
      };

      async function fetchTasksFilhas(){
        const res = await fetch(`http://localhost:8080/task/${id}`);
        const tasks: TaskChild = await res.json();
        setTaskList(tasks.tasksFilhas);
      };

      if (atualizar) {
        fetchTasks();
        setAtualizar(false);
      }

      if (atualizarEspecifico) {
        fetchTasksFilhas();
        setAtualizarEspecifico(false);
      }
    },[atualizar, atualizarEspecifico]);
    
    return (
        <TaskContext.Provider value={{taskList, setAtualizar, setAtualizarEspecifico}}>
          {children}
        </TaskContext.Provider>
    )
}