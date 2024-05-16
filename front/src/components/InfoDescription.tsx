import { Task } from '@/interface/Task.interface';
import styles from './InfoDescription.module.scss';
import Link from 'next/link';

export default function InfoDescription({task}: Readonly<{task: Task}>){
    return (
        <div className={styles.info}>
            <h2>{task.nome}</h2>
            {task.descriptionId ? <p>{task.descriptionId}</p> : false  }
            <div>
                <button>Alterar Descrição</button>
                <Link href={task.elementoPai == 0 ? "/" : `/task/${task.elementoPai}`}>
                    <button>
                        Voltar
                    </button>
                </Link>
            </div>
        </div>
    )
}