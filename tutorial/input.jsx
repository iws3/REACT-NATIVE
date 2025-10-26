import React, { useState } from 'react'
import {View, Text, TouchableOpacity, Button, StatusBar, StyleSheet, TextInput} from "react-native"

const Input = () => {
  const [input, setInput]=useState('')

  const handleText=(textInput)=>{
    setInput(textInput)
    console.log(input)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Starting with Input</Text>
      <View style={styles.line}></View>

      <View style={styles.textInputContainer}>

        <TextInput
        placeholder='Enter your username'
        style={styles.input}
        value={input}
        onChangeText={handleText}
        // secureTextEntry
        />

      </View>
    </View>
    
  )
}

styles=StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    backgroundColor:'purple',
    justifyContent:'center',
    alignItems:'center',
    color:'#fff'
  },
  text:{
    color:'#fff',
    fontSize:20
  },
  line:{
    width:60,
    height:2,
    backgroundColor:'#fff',
    marginTop:7
  },
  input:{
    borderWidth:2,
    marginTop:8,
    paddingHorizontal:9,
    width:300,
    borderColor:'#666',
    backgroundColor:'#b98bcdff',
    borderRadius:16
    // flex
  }
})

export default Input
