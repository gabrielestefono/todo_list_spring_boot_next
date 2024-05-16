export default async function markAsMade(id: number, elementoPai: number): Promise<boolean>{
  return await fetch(`http://localhost:8080/task/made/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(() => {
      if (elementoPai == 0) {
        return true;
      } else {
        return false;
      }
    })
}
