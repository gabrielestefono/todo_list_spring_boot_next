import React, { useContext, useState } from 'react';
import styles from './Form.module.scss';
import { TaskContext } from '@/contexts/TaskContext';
import { Task } from '@/interface/Task.interface';
import { TaskChild } from '@/interface/TaskChild.interface';

export default function Form({ id }: Readonly<{id? : number}>){
  const [name, setName] = useState("");
  const { setTaskList } = useContext(TaskContext);

  function criarTarefa(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    fetch("http://localhost:8080/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: name,
        elementoPai: id
      }),
    })
      .then(response => response.json)
      .then(() => {
        if(!id){
          fetch("http://localhost:8080/task")
           .then(response => response.json())
           .then((data : Task[]) => {
            setTaskList(data);
           });
        }else{
          fetch(`http://localhost:8080/task/${id}`)
           .then(response => response.json())
           .then((data : TaskChild) => {
            setTaskList(data.tasksFilhas);
           });
        }
      })
  }

  return (
      <form className={styles.form} onSubmit={criarTarefa}>
        <input type="text" placeholder="Adicione uma nova tarefa" name="task" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} required/>
        <button type="submit"> Criar <img src="/icons/plus.svg" alt="Criar nova Tarefa" width="16px" height="16px"/>
        </button>
      </form>
    )
}