import styles from './Form.module.scss';

export default function Form(){
  return (
      <form className={styles.form}>
        <input type="text" placeholder="Adicione uma nova tarefa" name="task"/>
        <button type="submit"> Criar <img src="/icons/plus.svg" alt="Criar nova Tarefa" width="16px" height="16px"/>
        </button>
      </form>
    )
}