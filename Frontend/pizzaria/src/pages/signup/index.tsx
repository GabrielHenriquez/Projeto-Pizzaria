import {useState, useContext, FormEvent} from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../styles/home.module.scss'

import logoImg from '../../../public/logo.svg';

import { Input } from '../../components/ui/input/input';
import { Button } from '../../components/ui/button';

import { AuthContext } from '../../contexts/AuthContext';

import{toast} from 'react-toastify'

const SignUp: NextPage = () => {

  //STATES
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const {signUp} = useContext(AuthContext)

  //FUNCTIONS

  async function handleSignUp(event: FormEvent){
    event.preventDefault()

    if(name == '' || email == '' || password == ''){
      toast.warning('Preencha todos os dados')
      return
    }

    let data = {name, email, password}
    setLoading(true)
    await signUp(data)
    setLoading(false)
  }

  //APLICATION

  return (
    <>
    <Head>
      <title>Faça seu cadastro agora!</title> 
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

      <div className={styles.login}>
        <form onSubmit={handleSignUp}>

          <Input
            placeholder="Nome da empresa"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Digite seu email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Sua senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Button
            type="submit"
            loading={loading}
          >
            Cadastrar
          </Button>        

        </form>

        <Link href='/'>
          <a className={styles.text}>Já possuo uma conta</a>
        </Link>

      </div>
    </div>
    </>
  )
}

export default SignUp