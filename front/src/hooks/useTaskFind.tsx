import { TaskContext } from "@/contexts/TaskContext";
import { Task } from "@/interface/Task.interface";
import { useContext, useEffect, useState } from "react";

function useFindTask(){
    const { setTaskList } = useContext(TaskContext)
    const [ find, setFind ] = useState<boolean>(false);

    useEffect(
        ()=>{
            if(find){
                fetch("http://localhost:8080/task")
                .then((response) => response.json())
                .then((data: Task[]) => {
                    setTaskList(data);
                }).catch((err) => {
                    console.log(err);
                });
                setFind(false);
            }
        },[find]
    )

    return {
        setFind
    }
}

export default useFindTask;