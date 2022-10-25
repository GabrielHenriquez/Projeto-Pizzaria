import { useState, ChangeEvent, useEffect, FormEvent } from "react"
import Head from "next/head"
import { Header } from "../../components/header"
import { canSSRAuth } from "../../utils/canSSRAuth"
import styles from './styles.module.scss'
import { FiUpload } from "react-icons/fi"
import { setupAPIClient } from "../../services/api"
import { api } from "../../services/apiClient"
import { toast } from "react-toastify"


type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps{
    categoryList: ItemProps[];
}


export default function Product({categoryList}: CategoryProps){

    //STATES
    const [imageURL, setImageURL] = useState('')
    const [image, setImage] = useState(null)
    const [category, setCategory] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0)

    //FUNCTIONS
    async function handleRegister(event: FormEvent){
        event.preventDefault()

        try{
            const data = new FormData()

            if(name === '' || price === '' || description === '' || image === null){
                toast.warning('Preencha todos os campos!')
                return
            }

            data.append('name', name)
            data.append('price', price)
            data.append('description', description)
            data.append('category_id', categories[categorySelected].id)
            data.append('file', image)

            const response = await api.get('/products')
            const index = response.data.findIndex(text => text.name == name)
    
            if(index < 0){
                await api.post('/product', data)
                toast.success('Cadastrado com sucesso!')

                setName('')
                setDescription('')
                setPrice('')
                setImage(null)
                setImageURL('')
            }else{
                toast.warning('Este produto já existe!')
            }

        }catch(error){
            console.log(error)
            toast.error('Ops erro ao cadastrar!')
        }
        
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files) return 

        const image = e.target.files[0]
        if(!image) return

        if(image.type === 'image/png' || image.type === 'image/jpeg') {
            setImage(image)
            setImageURL(URL.createObjectURL(e.target.files[0]))
        }
    }

    function handleChangeCategory(event){
        setCategorySelected(event.target.value)
    }

    //APLICATION
    return(
        <>
        <Head>
            <title>Adicionar Produto - CristinaPizzas</title>
        </Head>

        <main>
            <Header/>
            <div className={styles.container}>
                <h1>Novo produto</h1>

                <form onSubmit={handleRegister} className={styles.form} >
                    
                    <label className={styles.labelAvatar}>
                        <span>
                            <FiUpload size={30} color="#FFF" />
                        </span>
                        <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />

                        {imageURL && (
                            <img 
                                className={styles.preview}
                                src={imageURL}
                                alt="Foto do produto" 
                                width={250}
                                height={250}                         
                            />
                        )}

                    </label>
                    
                    <select value={categorySelected} onChange={handleChangeCategory}>
                        {categories.map((item, index) => {
                            return(
                                <option key={item.id} value={index}>
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>
         

                    <input 
                        type="text" 
                        placeholder="Digite o nome do produto" 
                        className={styles.input} 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        
                    />

                    <input 
                        type="text" 
                        placeholder="Preço do produto" 
                        className={styles.input} 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <textarea 
                        placeholder="Descrição" 
                        className={styles.input}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button 
                        type="submit" 
                        className={styles.buttonAdd}>
                            Cadastrar
                    </button>

                </form>
            </div>
        </main>
        
        </>
    )
}

export const getServerSideProps = canSSRAuth(async context => {
    const apiClient = setupAPIClient(context)

    const response = await apiClient.get('/categories')                 

    return{
        props:{
            categoryList: response.data
        }
    }
})