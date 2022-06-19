import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {StackParamsList} from '../../routes/app.routes'

type RouteDetailParams = {
    FinishOrder:{
        number: string | number;
        order_id: string;
    }
}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>

import {Feather} from '@expo/vector-icons'
import { api } from "../../services/api";

export default function FinishOrder(){

    const route = useRoute<FinishOrderRouteProp>()
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    //Functions
    async function handleFinish(){
        try{
            await api.put('order/send', {
                order_id: route.params?.order_id
            })

            navigation.popToTop();
        }catch(error){
            console.log('Erro ao finalizar, tente mais tarde')
        } 
    }
    
    //Aplication
    return(
        <View style={style.container}>
            <Text style={style.alert}>Você deseja finalizar esse pedido?</Text>
            <Text style={style.title}>Mesa {route.params?.number}</Text>

            <TouchableOpacity style={style.button} onPress={handleFinish}>
                <Text style={style.textButton}>Finalizar pedido</Text>
                <Feather name="shopping-cart" size={20} color="#1d1d2e" />
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingHorizontal: '4%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    alert:{
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 12,
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 12
    },
    button:{
        backgroundColor: '#3fffa3',
        flexDirection: 'row',
        width: '65%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    },
    textButton:{
        fontSize: 18,
        marginRight: 8,
        fontWeight: 'bold',
        color: '#1d1d2e'
    }
})