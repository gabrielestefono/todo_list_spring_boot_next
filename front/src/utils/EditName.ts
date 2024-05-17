import { swalInput } from "./functions/SwalInput";

export default async function editName(nome: string, id: number, callback: Function) {
    const showModal = await swalInput(nome);
    if(showModal.isConfirmed && showModal.value!= ""){
      await fetch(`http://localhost:8080/task/name/${id}`, {
        headers: {"Content-Type": "application/json"}, 
        method: "PATCH", 
        body: JSON.stringify({nome: showModal.value})});
      callback(true);
    }
}