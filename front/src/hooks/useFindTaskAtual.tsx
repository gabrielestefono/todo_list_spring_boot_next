import { TaskAtualContext } from "@/contexts/TaskAtualContext";
import { TaskChild } from "@/interface/TaskChild.interface";
import { useContext, useEffect, useState } from "react";

function useFindTaskAtual(id: number){
    const { setTarefaatual } = useContext(TaskAtualContext)
    const [ findchild, setFindchild ] = useState<boolean>(false);

    useEffect(
        ()=>{
            if(findchild){
                fetch(`http://localhost:8080/task/${id}`)
                .then((response) => response.json())
                .then((data: TaskChild) => {
                    setTarefaatual(data.taskAtual);
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

export default useFindTaskAtual;