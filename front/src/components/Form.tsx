import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Form.module.scss';
import { TaskContext } from '@/contexts/TaskContext';
import { Task } from '@/interface/Task.interface';
import { TaskChild } from '@/interface/TaskChild.interface';
import { LoadingContext } from '@/contexts/LoadingContext';

export default function Form({ id }: Readonly<{id? : number}>){
  const [name, setName] = useState("");
  const { setTaskList } = useContext(TaskContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const {loading, setLoading} = useContext(LoadingContext);

  useEffect(()=>{
    inputRef.current?.focus();
  },[name])


  function criarTarefa(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setLoading(true);
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
      .then(async () => {
        if(!id){
          await fetch("http://localhost:8080/task")
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
        setLoading(false);
        setName("");
      })
  }

  return (
      <form className={styles.form} onSubmit={criarTarefa}>
        <input ref={inputRef} type="text" placeholder="Adicione uma nova tarefa" name="task" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} required/>
        <button type="submit" disabled={loading}> Criar <img src="/icons/plus.svg" alt="Criar nova Tarefa" width="16px" height="16px"/>
        </button>
      </form>
    )
}