import Head from "next/head";
import Header from "@/components/Header";
import Form from "@/components/Form";
import TaskList from "@/components/TaskList";
import { Task } from "@/interface/Task.interface";
import { GetServerSideProps } from "next";
import { TaskChild } from "@/interface/TaskChild.interface";
import InfoDescription from "@/components/InfoDescription";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "@/contexts/TaskContext";
import { TaskAtualContext } from "@/contexts/TaskAtualContext";

export const getServerSideProps: GetServerSideProps = async (context)=>{
  const id = context.params!.id;
  let idNumber: number = 0;
  idNumber = +id!;

  if(idNumber === undefined || isNaN(idNumber)){
    idNumber = 0;
  }
  
  const res: TaskChild = await fetch(`http://localhost:8080/task/${id}`)
    .then(response => {
      if(response.status === 200) {
        return response.json()
      }else if(response.status === 500){
        return null;
      }
      return undefined;
    })
    .catch(err => {
      console.log(err);
    });
  
  if(res === undefined || res === null){
    return {notFound: true};
  }

  return {
    props: {
      taskAtual: res.taskAtual,
      taskList: res.tasksFilhas,
      idNumber,
    },
  };
}

export default function TaskPage( {taskAtual, taskList, idNumber} : Readonly<{taskAtual: Task, taskList: Task[], idNumber: number}>){
  const { setTaskList } = useContext(TaskContext);
  const { tarefaatual, setTarefaatual } = useContext(TaskAtualContext);

  useEffect(()=>{
    setTaskList(taskList);
    setTarefaatual(taskAtual);
  }, [idNumber, taskAtual, taskList])

  return (
    <>
      <Head>
        <title>To Do List</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main>
        <Header/>
        <Form id={taskAtual.id}/>
        <InfoDescription task={tarefaatual}/>
        <TaskList/>
      </main>
    </>
  );
}
