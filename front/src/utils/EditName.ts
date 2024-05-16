function editName() {
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
    }).then((result) => {
      if (result.isConfirmed && result.value != "") {
        fetch(`http://localhost:8080/task/name/${taskItem.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify({
            nome: result.value,
          }),
        })
          .then(() => {
            if (taskItem.elementoPai == 0) {
              setFind(true);
            } else {
              setFindchild(true);
            }
          })
          .catch((err) => console.log(err));
      }
    });
  }