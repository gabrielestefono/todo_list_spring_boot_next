import Header from "@/components/Header";
import Head from "next/head";
import styles from '@/styles/login.module.scss';
import Link from "next/link";

export default function Login(){
    return(
      <>
        <Head>
          <title>To Do List</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <main>
          <Header/>
          <div className={styles.login}>
              <div>
                  <form>
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" placeholder="Digite o seu email"/>
                  <label htmlFor="senha">Senha</label>
                  <input type="password" name="senha" id="senha" placeholder="Digite a sua senha"/>
                  {/* <a href="/recuperacao">Esqueceu sua senha?</a> */}
                  <button type="submit">Login</button>
                  </form>
                  <p>Não possui uma conta? <Link href="/register">Registre-se</Link></p>
              </div>
          </div>
        </main>
      </>
    );
}