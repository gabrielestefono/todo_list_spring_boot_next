import { Task } from "@/interface/Task.interface";
import { swalConfirmation } from "./functions/SwalConfirmation";

export default async function markAsMade(task: Task, callback: Function): Promise<boolean>{

  if(!task.concluida && !task.temFilhos){
    await fazerRequisicao(`http://localhost:8080/task/made/${task.id}`);
  }else if(task.concluida && !task.temFilhos){
    await fazerRequisicao(`http://localhost:8080/task/unmade/${task.id}`);
  }else if(!task.concluida && task.temFilhos){
    const modal = await swalConfirmation(false, "Sim", "Subtarefas serão marcadas como concluídas!", "Marcar Subtarefas?");
    if(modal.isConfirmed){
      await fazerRequisicao(`http://localhost:8080/task/made/${task.id}`);
    }
  }else if(task.concluida && task.temFilhos){
    const modal = await swalConfirmation(false, "Sim", "Subtarefas serão desmarcadas como concluídas!", "Desmarcar Subtarefas?");
    if(modal.isConfirmed){
      await fazerRequisicao(`http://localhost:8080/task/unmade/${task.id}`);
    }
  }
  callback(true);
  return true;
}

async function fazerRequisicao(url: string){
 return await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  })
}