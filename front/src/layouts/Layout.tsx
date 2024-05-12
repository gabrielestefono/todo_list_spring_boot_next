import { TaskContextProvider } from "@/contexts/TaskContext";
import { Task } from "@/interface/Task.interface";
import { ReactNode } from "react";


export default function Layout({children, taskList}: Readonly<{children: ReactNode, taskList: Task[]}>){
    return (
      <TaskContextProvider initialTasks={taskList}>
        <div>Olá, Mundo!</div>
          {children}
        <div>Tchau, Mundo!</div>
      </TaskContextProvider>
  )
}