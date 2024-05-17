import { Task as TaskItem } from "@/interface/Task.interface";
import styles from "./Task.module.scss";
import Link from "next/link";
import useFindTask from "@/hooks/useTaskFind";
import useFindChildTask from "@/hooks/useTaskChildFind";
import markAsMade from "@/utils/MarkAsMade";
import editName from "@/utils/EditName";
import deleteTask from "@/utils/DeleteTask";
import { useContext } from "react";
import { LoadingContext } from "@/contexts/LoadingContext";

export default function Task({ taskItem }: Readonly<{ taskItem: TaskItem }>) {
  const { setFind } = useFindTask();
  const { setFindchild } = useFindChildTask(taskItem.elementoPai);
  const {loading, setLoading} = useContext(LoadingContext);

  async function markAsMadeFunction() {
    setLoading(true);
    const funcaoCallBack = taskItem.elementoPai === 0 ? setFind : setFindchild;
    await markAsMade(taskItem, funcaoCallBack);
    setLoading(false);
  }

  async function editNameFuncion(){
    setLoading(true);
    const funcaoCallBack = taskItem.elementoPai === 0 ? setFind : setFindchild;
    await editName(taskItem.nome, taskItem.id, funcaoCallBack);
    setLoading(false);
  }

  async function deleteTaskFunction(){
    setLoading(true);
    const funcaoCallBack = taskItem.elementoPai === 0 ? setFind : setFindchild;
    await deleteTask(taskItem.id, taskItem.temFilhos, funcaoCallBack);
    setLoading(false);
  }

  return (
    <div className={styles.task}>
      <button
        disabled={loading}
        onClick={markAsMadeFunction}
        className={taskItem.concluida ? styles.concluida : ""}
      ></button>
      <Link href={`/task/${taskItem.id}`} className={loading ? styles.disabled : ""}>{taskItem.nome}</Link>
      <button onClick={editNameFuncion} disabled={loading}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          ></path>
        </svg>
      </button>
      <button onClick={deleteTaskFunction} disabled={loading}>
        <img
          src="/icons/lixo.svg"
          alt="excluir tarefa"
          width="16px"
          height="16px"
        />
      </button>
    </div>
  );
}
