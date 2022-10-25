import React, { useContext, useState } from "react"
import { SafeAreaView, View, Text, Button, StyleSheet , TextInput, TouchableOpacity} from "react-native"
import {useNavigation} from '@react-navigation/native'

import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StackParamsList } from "../../routes/app.routes"

import {Feather} from '@expo/vector-icons'

import {api} from '../../services/api'

import { AuthContext } from "../../contexts/AuthContext"

export default function Dashboard(){
    const Navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    //STATES
    const [number, setNumber] = useState('')
    const {signOut} = useContext(AuthContext)

    //FUNCTIONS
    async function openOrder(){
            if(number === '') return 

            const response = await api.post('/order', {
                table: Number(number)
            })
    
            const {id, table} = response.data
            
            Navigation.navigate('Order', 
            {
             number: table,
             order_id: id
            })
            
            setNumber('')
    }

    //APLICATION
    return(
        <SafeAreaView style={styles.background}>

            <View style={styles.header}>
                <TouchableOpacity onPress={signOut}>
                    <Feather name="log-out" size={35} color='#FFF'/>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <Text style={styles.title}>Novo Pedido</Text>

                <TextInput 
                style={styles.input}
                placeholder="Número da mesa"
                placeholderTextColor='#f0f0f092'
                keyboardType="numeric"
                value={number}
                onChangeText={setNumber}
                />

                <TouchableOpacity onPress={openOrder} style={styles.button}>
                    <Text style={styles.txtButton}>Abrir mesa</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background:{
        flex: 1,
        backgroundColor: '#1d1d2e',
    },
    header:{
        alignItems: 'flex-end',
        backgroundColor: '#1d1d2e',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#1d1d2e',
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 24
    },
    input:{
        width: '90%',
        height: 60,
        backgroundColor: '#101026',
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 22,
        color: '#FFF',
    },
    button:{
        width: '90%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        marginVertical: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtButton:{
        fontSize: 18,
        color: '#101026',
        fontWeight: 'bold'
    }
})