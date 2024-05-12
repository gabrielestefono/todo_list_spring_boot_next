import { useContext } from 'react';
import styles from './TaskList.module.scss';
import { TaskContext } from '@/contexts/TaskContext';
import Task from './Task';

export default function TaskList() {
  const {taskList} = useContext(TaskContext);
  return (
      <div className={styles.taskList}>
        <div>
          <div>
            <div className={styles.created}>
              <p>Tarefas criadas</p>
              <span>16</span>
            </div>
            <div className={styles.concluded}>
              <p>Concluídas</p>
              <span>0</span>
            </div>
          </div>
          <hr/>
          <div>
            {taskList?.map((taskItem) => <Task key={taskItem.id} taskItem={taskItem}/>)}
          </div>
        </div>
      </div>
  );
}
