import {createContext, ReactNode, useState, useEffect} from 'react'
import {destroyCookie, setCookie, parseCookies} from 'nookies'
import Router from 'next/router'
import {api} from '../services/apiClient'

import {toast} from 'react-toastify'
import { sign } from 'crypto'


type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string
}

type SignUpProps = {
    name: string,
    email: string;
    password: string
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try{
        destroyCookie(undefined, '@project.token')
        Router.push('/')
    }catch(error){
        console.log('erro ao deslogar')
        throw new Error(error)
    }
}

export function AuthProvider({children}: AuthProviderProps){
    //STATES
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user

    //FUNCTIONS

    useEffect(() => {
        //TENTAR PEGA ALGO NO COOKIE (O TOKEN)
        const {'@project.token': token} = parseCookies()

        if(token){
            api.get('/info').then(response => {
                const {id, name, email} = response.data

                setUser({id, name, email})
            }).catch(() => {
                signOut()
            })
        }

    }, [])

    async function signIn({email, password}: SignInProps){
        try{
            const response = await api.post('/session', {
                email, password
            })
            const {id, name, token} = response.data

            setCookie(undefined, '@project.token', token, {
                maxAge: 60 * 60 * 24 * 30,  //expirar em 1 mes
                path: "/"   //quais caminhos terão acesso ao cookie
            })

            setUser({id, name, email})

            //passar para as próximas requisições o nosso token
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            toast.success('Logado com sucesso!')

            //Redirecionar o usuário para a página dashboard(últimos pedidos)
            Router.push('/dashboard')

        }catch(error){
            toast.error('Erro ao acessar')
            console.log('error', error)
        }
    }

    async function signUp({name, email, password}: SignUpProps){
        try{
            const response = await api.post('/users', {
                name, email, password
            })
            
            toast.success('Cadastrado com sucesso')
            Router.push('/')
            
        }catch(error){
            toast.error('Erro ao cadastrar')
        }
    }

    //APLICATION

    return(
        <AuthContext.Provider value={{ user ,isAuthenticated, signIn, signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}