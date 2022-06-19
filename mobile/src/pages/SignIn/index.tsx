import React , {useState, useContext} from 'react'
import {View, Text, Image, StyleSheet , TextInput, TouchableOpacity, ActivityIndicator} from 'react-native'

import { AuthContext } from '../../contexts/AuthContext'

export default function SignIn(){

    //STATES
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const {signIn, loadingAuth} = useContext(AuthContext)

    //FUNCTIONS
    async function handleLogin(){
        if(email === '' && password === '') return  
        await signIn({email, password})
        setEmail('')
        setPassword('')
    }

    //APLICATION
    return(
        <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require('../../assets/logo.png')}
            />


            <View style={styles.inputContainer}>
                <TextInput 
                  placeholder='Digite seu email'
                  placeholderTextColor='#f0f0f092'
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                />
                <TextInput 
                  placeholderTextColor='#f0f0f092'
                  placeholder='Digite sua senha'
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    {loadingAuth ? (
                        <ActivityIndicator size={25} color="#FFF" />
                    ) : (
                        <Text style={styles.txtButton}>Acessar</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1d1d2e'
    },
    logo:{
        marginBottom: 25,
    },
    inputContainer:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 28,
        paddingHorizontal: 8

    },
    input:{
        width: "90%",
        height: 45,
        backgroundColor: '#101026',
        marginBottom: 15,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: '#FFF',
        fontSize: 15
    },
    button:{
        width: '45%',
        height: 45,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtButton:{
        fontSize: 17,
        fontWeight: 'bold',
        color: '#101026'
    }
})