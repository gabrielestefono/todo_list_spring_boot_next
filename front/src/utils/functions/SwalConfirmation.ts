import Swal from "sweetalert2";

export async function swalConfirmation(showDenyButton: boolean, confirmButtonText: string, text: string, titleText: string, denyButtonText?: string){
    return Swal.fire({
        icon: "warning",
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText: "Cancelar",
        background: "#1a1a1a",
        color: "white",
        animation: true,
        titleText,
        text,
        cancelButtonColor: "#4EA8DE",
        confirmButtonColor: "#C92722",
        showDenyButton,
        denyButtonColor: "#7066e0",
        denyButtonText,
      });
}