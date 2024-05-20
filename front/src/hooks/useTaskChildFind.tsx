import { TaskContext } from "@/contexts/TaskContext";
import { TaskChild } from "@/interface/TaskChild.interface";
import { useContext, useEffect, useState } from "react";

function useFindChildTask(id: number){
    const { setTaskList } = useContext(TaskContext)
    const [ findchild, setFindchild ] = useState<boolean>(false);

    useEffect(
        ()=>{
            if(findchild){
                fetch(`http://localhost:8080/task/${id}`)
                .then((response) => response.json())
                .then((data: TaskChild) => {
                    setTaskList(data.tasksFilhas);
                }).catch((err) => {
                    console.error(err);
                });
                setFindchild(false);
            }
        },[findchild]
    )

    return {
        setFindchild
    }
}

export default useFindChildTask;