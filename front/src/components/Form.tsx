import React, { useContext, useState } from 'react';
import styles from './Form.module.scss';
import { TaskContext } from '@/contexts/TaskContext';

export default function Form({ id }: {id? : number}){
  const [name, setName] = useState("");

  const { setAtualizar, setAtualizarEspecifico } = useContext(TaskContext);

  function criarTarefa(e: React.FormEvent<HTMLFormElement>){
    const options = id != 0 ? JSON.stringify({nome: name, elementoPai: id}) : JSON.stringify({nome: name});
    e.preventDefault();
    if(name !== ""){
      fetch("http://localhost:8080/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: options,
    })
     .then((response) => response.json())
     .then((data) => {
        if(id){
          setAtualizarEspecifico(true);
        }else{
          setAtualizar(true);
        }
        setName("");
      });
    }
  }

  return (
      <form className={styles.form} onSubmit={criarTarefa}>
        <input type="text" placeholder="Adicione uma nova tarefa" name="task" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} required/>
        <button type="submit"> Criar <img src="/icons/plus.svg" alt="Criar nova Tarefa" width="16px" height="16px"/>
        </button>
      </form>
    )
}