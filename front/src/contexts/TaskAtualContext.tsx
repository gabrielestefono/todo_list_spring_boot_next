import { Task } from "@/interface/Task.interface";
import { ReactNode, createContext, useMemo, useState } from "react";

export const TaskAtualContext = createContext<any>({} as Task);

export const TaskAtualContextProvider = ({children}: {children: ReactNode}) => {
    const [tarefaatual, setTarefaatual]= useState<Task>();

    const value = useMemo(() => ({ tarefaatual, setTarefaatual }), [tarefaatual]);

    return (
        <TaskAtualContext.Provider value={value}>
            {children}
        </TaskAtualContext.Provider>
    )
}