import Head from "next/head";
import Header from "@/components/Header";
import Form from "@/components/Form";
import TaskList from "@/components/TaskList";
import Layout from "@/layouts/Layout";
import { Task } from "@/interface/Task.interface";
import { GetServerSideProps } from "next";
import { useParams } from "next/navigation";
import { TaskChild } from "@/interface/TaskChild.interface";
import InfoDescription from "@/components/InfoDescription";

export const getServerSideProps: GetServerSideProps = async (context)=>{
  const id = context.params!.id;
  const res: TaskChild = await fetch(`http://localhost:8080/task/${id}`)
    .then(response => response.json())
    .catch(err => console.log(err))

  return {
    props: {
      taskAtual: res.taskAtual,
      taskList: res.tasksFilhas,
    },
  };
}

export default function TaskPage( props : Readonly<{taskAtual: Task, taskList: Task[]}>){
  const { id } = useParams();
  return (
    <>
      <Head>
        <title>To Do List</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Layout taskList={props.taskList} id={+id}>
        <main>
          <Header/>
          <Form id={props.taskAtual.id}/>
          <InfoDescription task={props.taskAtual}/>
          <TaskList/>
        </main>
      </Layout>
    </>
  );
}
