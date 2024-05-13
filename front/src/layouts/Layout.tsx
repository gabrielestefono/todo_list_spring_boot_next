import { TaskContextProvider } from "@/contexts/TaskContext";
import { Task } from "@/interface/Task.interface";
import { ReactNode } from "react";


export default function Layout({children, taskList, id}: Readonly<{children: ReactNode, taskList: Task[], id?: number}>){
    return (
      <TaskContextProvider initialTasks={taskList} id={id}>
        <div>Olá, Mundo!</div>
          {children}
        <div>Tchau, Mundo!</div>
      </TaskContextProvider>
  )
}