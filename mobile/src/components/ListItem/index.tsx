import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

import {Feather} from '@expo/vector-icons'

interface ItemProps {
    data:{
        id: string;
        product_id: string;
        name: string;
        amount: string | number;
    }
    deleteItem: (item_id: string) => void;
}

export function ListItem({data, deleteItem}: ItemProps){

    //function
    function handleDeleteItem(){
       deleteItem(data.id)
    }


    //Aplication
    return(
        <View style={style.container}>
            <Text style={style.item}>{data.amount} - {data.name}</Text>

            <TouchableOpacity onPress={handleDeleteItem}>
               <Feather name="trash-2" size={25} color='#ff4f4b' />
            </TouchableOpacity>

        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#101026',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#8a8a8a'
    },
    item:{
        color: '#FFF'
    },

})