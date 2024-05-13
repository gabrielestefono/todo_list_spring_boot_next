import { Task } from '@/interface/Task.interface';
import styles from './InfoDescription.module.scss';

export default function InfoDescription({task}: {task: Task}){
    return (
        <div className={styles.info}>
            <h2>{task.nome}</h2>
            {task.descriptionId ? <p>{task.descriptionId}</p> : false  }
            <div>
                <button>Alterar Descrição</button>
                <button>Cancelar</button>
            </div>
        </div>
    )
}