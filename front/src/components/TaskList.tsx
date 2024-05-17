import { useContext } from 'react';
import styles from './TaskList.module.scss';
import { TaskContext } from '@/contexts/TaskContext';
import Task from './Task';
import { Task as TaskItems } from '@/interface/Task.interface';

export default function TaskList() {
  const { taskList } = useContext(TaskContext);
  const concluidas = taskList.filter((task: TaskItems) => task.concluida)
  return (
      <div className={styles.taskList}>
        <div>
          <div>
            <div className={styles.created}>
              <p>Tarefas criadas</p>
              <span>{taskList.length}</span>
            </div>
            <div className={styles.concluded}>
              <p>Concluídas</p>
              <span>{concluidas.length === 0 ? "0" : `${concluidas.length} de ${taskList.length}`}</span>
            </div>
          </div>
          <hr/>
          <div>
            {taskList?.map((taskItem: TaskItems) => <Task key={taskItem.id} taskItem={taskItem}/>)}
          </div>
        </div>
      </div>
  );
}