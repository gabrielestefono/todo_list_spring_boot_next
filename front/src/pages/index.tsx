import Head from "next/head";
import styles from './index.module.scss';
import Header from "@/components/Header";
import Form from "@/components/Form";
import TaskList from "@/components/TaskList";
import Layout from "@/layouts/Layout";
import { Task } from "@/interface/Task.interface";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context)=>{
  const res: Task[] = await fetch('http://localhost:8080/task')
    .then(response => response.json())
    .catch(err => console.log(err))

  return {
    props: {
      taskList: res,
    },
  };
}

export default function Home( props : Readonly<{ taskList: Task[] }>){
  return (
    <>
      <Head>
        <title>To Do List</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Layout taskList={props.taskList}>
        <main className={styles.index}>
          <Header/>
          <Form/>
          <TaskList/>
        </main>
      </Layout>
    </>
  );
}
