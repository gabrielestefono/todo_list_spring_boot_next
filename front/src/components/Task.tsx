import { Task as TaskItem } from "@/interface/Task.interface";
import styles from "./Task.module.scss";
import { useRouter } from "next/router";
import Swal from 'sweetalert2';
import Link from "next/link";
import useFindTask from "@/hooks/useTaskFind";
import useFindChildTask from "@/hooks/useTaskChildFind";

export default function Task({ taskItem }: Readonly<{ taskItem: TaskItem }>) {
  const router = useRouter();
  const { setFind } = useFindTask();
  const { setFindchild } = useFindChildTask(taskItem.elementoPai);
  
  function markAsMade() {
    fetch(`http://localhost:8080/task/made/${taskItem.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        if(taskItem.elementoPai == 0){
          setFind(true);
        }else{
          setFindchild(true);
        }
      })
      .catch(error => {
        console.log(error);
        router.push("/404")
      })
  }

  function editName(){
    Swal.fire({
      input: "text",
      inputValue: taskItem.nome,
      showCancelButton: true,
      confirmButtonText: "Alterar",
      cancelButtonText: "Cancelar",
      background: "#1a1a1a",
      color: "white",
      animation: true,
      titleText: "Editar tarefa",
      text: "Digite o nome para a tarefa:",
      cancelButtonColor: "#4EA8DE",
    }).then(result => {
      if(result.isConfirmed && result.value != ''){
        fetch(`http://localhost:8080/task/name/${taskItem.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify({
            nome: result.value
          })
        }).then(()=>{
          if(taskItem.elementoPai == 0){
            setFind(true);
          }else{
            setFindchild(true);
          }
        }).catch(err=>console.log(err));
      }
    })
  }


  function deleteTask(){
    Swal.fire({
      showCancelButton: true,
      confirmButtonText: "Deletar",
      cancelButtonText: "Cancelar",
      background: "#1a1a1a",
      color: "white",
      animation: true,
      titleText: "Deletar tarefa",
      text: "Tem certeza que deseja deletar?",
      cancelButtonColor: "#4EA8DE",
      confirmButtonColor: "#C92722"
    }).then(result => {
      if(result.isConfirmed){
        fetch(`http://localhost:8080/task/${taskItem.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
        }).then(()=>{
          if(taskItem.elementoPai == 0){
            setFind(true);
          }else{
            setFindchild(true);
          }
        }).catch(err=>console.log(err));
      }
    })
  }

  return (
    <div className={styles.task}>
      <button onClick={markAsMade} className={taskItem.concluida ? styles.concluida : ""}></button>
      <Link href={`/task/${taskItem.id}`}>{taskItem.nome}</Link>
      <button onClick={editName}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          ></path>
        </svg>
      </button>
      <button onClick={deleteTask}>
        <img
          src="/icons/lixo.svg"
          alt="excluir tarefa"
          width="16px"
          height="16px"
        />
      </button>
    </div>
  );
}
