// CREATE OUR COUNTER APP
import React from 'react'
import { View, Text, StyleSheet, Button } from "react-native";
import { useState } from 'react';


export default function Counter(){
    const [counter, setCounter]=useState(0)

    const handleCount=()=>{
        setCounter(prev=>prev+1)
        console.log(counter)
    }
    return(
        <View style={styles.container}>
            <Text>Welcome to my Counter App</Text>
            <View style={styles.numberBox}>
                <Text style={styles.number}>{counter}</Text>
            </View>
            <View style={styles.btns}>
               <Button title="add" color='green' onPress={handleCount}/>
            <Button title="Subtract" color='red'/>  
            </View>
           
        </View>
    )
}

const styles=StyleSheet.create({
container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
},

numberBox:{
width:200,
height:200,
backgroundColor:'black',
borderRadius:100,
justifyContent:'center',
alignItems:'center'
},

number:{
color:'#fff',
fontSize:50
},
btns:{
    flexDirection:'row',
    gap:12,
    marginTop:13
}
})