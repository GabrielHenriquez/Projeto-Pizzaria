import React, {useState, useEffect} from "react"
import { View, Text , StyleSheet, TouchableOpacity, TextInput, Modal, FlatList} from "react-native"

import { useRoute, RouteProp, useNavigation } from "@react-navigation/native"

import {Feather} from '@expo/vector-icons'
import { api } from "../../services/api"
import { ModalPicker } from "../../components/ModalPicker"
import {ListItem} from '../../components/ListItem'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamsList } from '../../routes/app.routes'

type RouteDetailParams = {
    Order:{
        number: string | number;
        order_id: string
    }
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export type CategoryProps = {
    id: string;
    name: string;
}

type ProductProps = {
    id: string;
    name: string
}

type ItensProps = {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
}

export default function Order(){
    const route = useRoute<OrderRouteProps>()
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    //STATES 
    const [category, setCategory] = useState<CategoryProps[] | []>([])
    const [categorySelected, setCategorySelected] = useState<CategoryProps>()
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false)

    const [products, setProducts] = useState<ProductProps[] | []>([])
    const [productSelected, setProductSelected] = useState<ProductProps | []>()
    const [modalProductVisible, setModalProductVisible] = useState(false)

    const[amount, setAmount] = useState('1')

    const [itens, setItens] = useState<ItensProps[]>([])

    //FUNCTIONS
    useEffect(() => {
        async function loadInfo(){
            const response = await api.get('/categories')
            setCategory(response.data)
            setCategorySelected(response.data[0])
        }

        loadInfo()
    }, [])

    useEffect(() => {
        async function loadProducts(){
            const response = await api.get('/products', {
                params:{
                    category_id: categorySelected?.id
                }
            })

            setProducts(response.data)
            setProductSelected(response.data[0])
        }

        loadProducts()
    }, [categorySelected])

    async function handleCloseOrder(){

        try{
            await api.delete('/order', {
                params:{
                    order_id: route.params.order_id
                }
            })

            navigation.goBack()
        }catch(error){
            alert(error)
        }
    }

    function handleChangedCategory(item: CategoryProps){
        setCategorySelected(item)
    }

    function handleChangedProduct(item: ProductProps){
        setProductSelected(item)
    }

    async function handleAddItem(){
        const response = await api.post('/order/addItem', {
            order_id: route.params?.order_id,
            product_id: productSelected?.id,
            amount: Number(amount)
        })

        let data = {
            id: response.data.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount
        }

        setItens(oldArray => [...oldArray, data])
    }

    async function handleDeleteItem(item_id: string){
        await api.delete('order/removeItem', {
            params:{
                item_id
            }
        })

        let removeItem = itens.filter(item => item.id !== item_id)

        setItens(removeItem)
    }

    function handleFinishOrder(){
        navigation.navigate('FinishOrder', {
            number: route.params?.number,
            order_id: route.params?.order_id
        })
    }

    //APLICATION
    return(
        <View style={styles.container}>
            
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.number}</Text>
                {itens.length === 0 &&(
                    <TouchableOpacity onPress={handleCloseOrder}>
                        <Feather name="trash-2" size={30} color='#FF3f4b' />
                    </TouchableOpacity>
                )}
            </View>
            
            {category.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                    <Text style={{color: '#FFF'}}>{categorySelected?.name}</Text>
                </TouchableOpacity>
            )}

            {products.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)} >
                    <Text style={{color: '#FFF'}}>{productSelected?.name}</Text>
                </TouchableOpacity>
            )}            

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput 
                  style={[styles.input, {width: '60%', textAlign:'center'}]}
                  placeholderTextColor='#f0f0f092'
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAddItem}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                   style={[styles.button, {opacity: itens.length === 0 ? 0.3 : 1}]} 
                   disabled={itens.length === 0}
                   onPress={handleFinishOrder}
                >
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>

            <FlatList 
              showsVerticalScrollIndicator={false}
              style={{ flex: 1, marginTop: 24 }}
              data={itens}
              keyExtractor={item => item.id}
              renderItem={ ( ({item}) =>  <ListItem  data={item} deleteItem={handleDeleteItem} /> )}
            />

            <Modal
              transparent={true}
              visible={modalCategoryVisible}
              animationType='fade'
            >
                <ModalPicker  
                    handleCloseModal={() => setModalCategoryVisible(false)}
                    options={category}
                    selectedItem={handleChangedCategory}
                />
            </Modal>

            <Modal
              transparent={true}
              visible={modalProductVisible}
              animationType='fade'
            >
                <ModalPicker  
                  handleCloseModal={() => setModalProductVisible(false)}
                  options={products}
                  selectedItem={handleChangedProduct}
                />
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingHorizontal: '4%'
    },
    header:{
        flexDirection: "row",
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24
    },
    title:{
        fontSize: 35,
        fontWeight: "bold",
        color: '#FFF',
        marginRight: 12,
    },
    input:{
        backgroundColor: '#101026',
        borderRadius: 4,
        width: '100%',
        height: 50,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#FFF',
        fontSize: 25
    },
    qtdContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    qtdText:{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF'
    },
    actions:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    buttonAdd:{
        width: '20%',
        backgroundColor: '#3fd1ff',
        borderRadius: 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        color: '#101026',
        fontSize: 18,
        fontWeight: 'bold'
    },
    button:{
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        height: 40,
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})