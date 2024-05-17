import Swal from "sweetalert2";

export async function swalInput(inputValue: string){
    return Swal.fire(
        {
            input: "text",
            inputValue,
            showCancelButton: true,
            confirmButtonText: "Alterar",
            cancelButtonText: "Cancelar",
            background: "#1a1a1a",
            color: "white",
            animation: true,
            titleText: "Editar tarefa",
            text: "Digite o nome para a tarefa: ",
            cancelButtonColor: "#4EA8DE",
        }
    )
}