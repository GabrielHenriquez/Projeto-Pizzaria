import type { NextPage } from 'next'
import { useState, useContext, FormEvent } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';

import styles from '../../styles/home.module.scss';
import logoImg from '../../public/logo.svg';

import { AuthContext } from '../contexts/AuthContext';
import { Input } from '../components/ui/input/input';
import { Button } from '../components/ui/button';

import { canSSRGuest } from '../utils/canSSRGuest';

import { toast } from 'react-toastify';

const Home: NextPage = () => {

  //CONTEXT
  const {signIn, user} = useContext(AuthContext)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  //FUNCTIONS
  async function handleLogin(event: FormEvent){
    event.preventDefault()
    console.log('entrei na função handle login')

    if(email == '' || password == ''){
      toast.warning('preencha os dados')
      return
    }

    setLoading(true)
    let data = {email, password}
    await signIn(data)
    setLoading(false)
  }

  //APLICATION
  return (
    <>
    <Head>
      <title>CristinaPizzas - Faça seu login</title> 
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

      <div className={styles.login}>
        <form onSubmit={handleLogin}>
          <Input
            placeholder="Digite seu email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Sua senha"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Button
            type="submit"
            loading={loading}
          >
            Acessar
          </Button>        

        </form>

        <Link href='/signup'>
          <a className={styles.text}>Nao possui uma conta? Cadastre-se</a>
        </Link>

      </div>
    </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async context => {

  return{
    props: {}
  }
})

export default Home
