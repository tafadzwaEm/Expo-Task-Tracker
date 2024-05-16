import { Button, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { firestoreDb } from '../../firebaseConfig'
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const List = ({navigation}) => {

    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])

    const docRef = collection(firestoreDb,'ttd')

    // Add data to the firestore db
    const addTodo = async (todo) => {
        await addDoc(docRef,{task:String(todo),done: false})
        setTodo('')
    }

    // Read data from the firestore db
    useEffect(()=>{
        const subscriber = onSnapshot(docRef,{
            next: (snap) => {
                const newTodos = []
                snap.docs.forEach((doc)=>{
                    newTodos.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                setTodos(newTodos)
            }
        })
        return ()=> subscriber()
    },[])

    const toggleDone = async(item) => {
        const docRef = doc(firestoreDb,`ttd/${item.id}`)
        updateDoc(docRef,{done : !item.done})
    }
    const deleteItem = async(item) => {
        const docRef = doc(firestoreDb,`ttd/${item.id}`)
        deleteDoc(docRef)
    }

  return (
    <View>
      
      <TextInput placeholder='Write here' 
        value={todo}
        onChangeText={(text)=>setTodo(text)}
        style={{padding: 5,marginVertical:10, fontSize:15}}
      />
      
      <Button onPress={()=>addTodo(todo)} title='Add Task' disabled={todo===''}/>


    <FlatList 
        data={todos}
        renderItem={({item})=>(
            <View style={{flexDirection:"row",alignItems:'center',marginHorizontal:5}}>
                <TouchableOpacity style={styles.item} onPress={()=>toggleDone(item)}>
                    { item.done ? <AntDesign name="checkcircle" size={24} color="green" />:<Entypo name="circle" size={24} color="black" />}
                    <Text>{item.task}</Text>
                </TouchableOpacity>
                <Fontisto name="trash" size={24} color="red" style={{justifyContent:'center'}} onPress={()=>deleteItem(item)}/>
            </View>
  )}
    />


    </View>
  )
}

export default List

const styles = StyleSheet.create({
    item:{
        padding:15,
        margin: 5,
        elevation: 1,
        shadowColor: 'green',
        shadowOpacity:0.8,
        shadowRadius:6,
        borderWidth: 0,
        shadowOffset: { width: 0, height: 12 },
        flex:5,
        flexDirection:'row',
        gap: 10
    }
})