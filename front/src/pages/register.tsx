import Header from '@/components/Header';
import styles from '@/styles/register.module.scss';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Login(){
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
    return(
        <>
        <Head>
          <title>To Do List</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <main>
          <Header/>
          <div className={styles.register}>
            <div>
                <form>
                <label htmlFor="nome">Nome</label>
                    <input type="text" name="nome" id="nome" placeholder="Digite o seu nome" value={nome} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setNome(e.target.value)}} autoComplete='off'/>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Digite o seu email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setEmail(e.target.value)}} autoComplete='off'/>
                    <label htmlFor="senha">Senha</label>
                    <input type="password" name="senha" id="senha" placeholder="Digite a sua senha" value={senha} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setSenha(e.target.value)}} autoComplete='off'/>
                    <button type="submit">Registre-se</button>
                </form>
            <p>Já possui uma conta? <Link href="/login">Entre aqui</Link></p>
            </div>
        </div>
        </main>
      </>
    );
}