import { swalConfirmation } from "./functions/SwalConfirmation";

export default async function deleteTask(id: number, temFilhos: boolean, callback: Function) {
    const showModal = await swalConfirmation(false, "Deletar", "Tem certeza que deseja deletar?", "Deletar tarefa");
    if(showModal.isConfirmed){
      if(temFilhos){
        const showModal = await swalConfirmation(true, "Sim, deletar todas!", "Há subtarefas nessa tarefa!", "Deletar tarefa", "Sim, manter subtarefas!");
        if(showModal.isConfirmed){
          await fetch(`http://localhost:8080/task/delete-all/${id}`, {
            method: "DELETE",
          });
          callback(true);
        }else if(showModal.isDenied){
          await fetch(`http://localhost:8080/task/delete-one/${id}`, {
            method: "DELETE",
          });
          callback(true);
        }
      }else{
        await fetch(`http://localhost:8080/task/delete-one/${id}`, {
            method: "DELETE",
          });
          callback(true);
      }
    }
}