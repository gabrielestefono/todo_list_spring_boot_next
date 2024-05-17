import { Task } from '@/interface/Task.interface';
import styles from './InfoDescription.module.scss';
import Link from 'next/link';
import Swal from 'sweetalert2';
import useFindTaskAtual from '@/hooks/useFindTaskAtual';
import { useContext } from 'react';
import { LoadingContext } from '@/contexts/LoadingContext';

export default function InfoDescription({task}: Readonly<{task: Task}>){
    const { setFindchild } = useFindTaskAtual(task?.id);
    const {loading, setLoading} = useContext(LoadingContext);

    function atualizarDescricao(){
        setLoading(true);
        Swal.fire({
            background: "rgb(26, 26, 26)",
            title: "Descrição",
            input: "textarea",
            inputValue: task.description ? task.description.descricao : "",
            showCancelButton: true,
            confirmButtonText: "Atualizar",
            confirmButtonColor: "#4ea8de",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#5e60ce",
            color: "white",
            animation: true,
        }).then(result => {
            if(result.isConfirmed){
                fetch(`http://localhost:8080/task/description/${task.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        descricao: result.value,
                    })
                })
               .then(response => response.json())
               .then(()=>{
                setFindchild(true);
                setLoading(false);
               })
            }
        })
    }

    return (
        <div className={styles.info}>
            <h2>{task?.nome}</h2>
            {task?.description && task?.description.descricao !== "" ? <p>{task.description.descricao}</p> : false  }
            <div>
                <button onClick={atualizarDescricao} disabled={loading}>{!task?.description || task?.description?.descricao === "" ? "Criar Descrição" : "Alterar Descrição"}</button>
                <Link href={task?.elementoPai == 0 ? "/" : `/task/${task?.elementoPai}`}>
                    <button>
                        Voltar
                    </button>
                </Link>
            </div>
        </div>
    )
}