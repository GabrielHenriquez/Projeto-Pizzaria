import { FormEvent, useState } from "react"
import Head from "next/head"
import { Header } from "../../components/header"
import { toast } from "react-toastify"

import styles from './styles.module.scss'
import { api } from "../../services/apiClient"
import { canSSRAuth } from "../../utils/canSSRAuth"

export default function Category(){

    //STATES
    const [name, setName] = useState('')

    //FUNCTIONS
    async function handleRegister(event: FormEvent){
        event.preventDefault()

        if(name == ''){
            toast.warning('Preencha o campo para adicionar')
            return
        }

        const response = await api.get('/categories')
        const id = response.data.findIndex(text => text.name == name)

        if(id < 0){
            await api.post('/category', {name})
            toast.success('Categoria adicionada!')
            setName('')
        }else{
            toast.warning('Esta categoria já existe!')
        }
    }
    //APLICATION
    return(
        <>
        <Head>
            <title>Nova Categoria - CristinaPizzas</title>
        </Head>

        <Header/>
        <div>
            
            <main className={styles.container}>
                <h1>Cadastrar categorias</h1>

                <form onSubmit={handleRegister} className={styles.form}>
                    <input 
                     type="text"
                     placeholder="Digite o nome da categoria"
                     className={styles.input}
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                    />

                    <button className={styles.buttonAdd} type="submit">
                        Adicionar
                    </button>
                </form>
            </main>

        </div>
        </>
    )
}

const getServerSideProps = canSSRAuth (async context =>{
    return{
        props:{}
    }
})