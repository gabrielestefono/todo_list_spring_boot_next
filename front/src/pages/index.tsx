import Head from "next/head";
import Header from "@/components/Header";
import Form from "@/components/Form";
import TaskList from "@/components/TaskList";
import { Task } from "@/interface/Task.interface";
import { GetServerSideProps } from "next";
import { TaskContext } from "@/contexts/TaskContext";
import { useContext, useEffect } from "react";

export const getServerSideProps: GetServerSideProps = async (context)=>{
  const res: Task[] = await fetch('http://localhost:8080/task')
    .then(response => response.json())
    .catch(err => console.error(err))

  return {
    props: {
      taskList: res,
    },
  };
}

export default function Home( {taskList} : Readonly<{ taskList : Task[] }>){
  const { setTaskList } = useContext(TaskContext);
  useEffect(()=>{
    setTaskList(taskList);
  }, [taskList])
  return (
    <>
      <Head>
        <title>To Do List</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main>
        <Header/>
        <Form id={0}/>
        <TaskList/>
      </main>
    </>
  );
}
