import React, {createContext, ReactNode, useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../../src/services/api'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    loadingAuth: boolean;
    loading: boolean
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => Promise<void>
}

type SignInProps = {
    email: string;
    password: string;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export default function AuthProvider({children}: AuthProviderProps){

    //STATES
    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    })

    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] =useState(true)

    const isAuthenticated =  !!user.name

    //FUNCTIONS 

    useEffect(() => {
        async function getUser(){
            const userInfo = await AsyncStorage.getItem('@CristinaPizzas')
            let hasUser: UserProps = JSON.parse(userInfo || '{}')

            if(Object.keys(hasUser).length > 0){
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token
                })
            }
            setLoading(false)
        }

        getUser()
        
    }, [])

    async function signIn({email, password}: SignInProps){
        setLoadingAuth(true)
        try{
            const response = await api.post('/session', {
                email, password
            })

            const{id, name, token} = response.data

            const data = {
                ...response.data
            }

            await AsyncStorage.setItem('@CristinaPizzas', JSON.stringify(data))

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({id, name, email, token})

            setLoadingAuth(false)

        }catch(error){
            console.log('erro ao acessar', + error)
            setLoadingAuth(false)
        }
    }

    async function signOut(){
        await AsyncStorage.clear()
        .then(() => {
            setUser({
                id: '',
                name: '',
                email: '',
                token: ''
            })
        })
    }

    //APLICATION
    return(
        <AuthContext.Provider value={{user, signIn, signOut, isAuthenticated, loadingAuth, loading}}>
            {children}
        </AuthContext.Provider>
    )
}