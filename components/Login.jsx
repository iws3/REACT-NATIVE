import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

const Login = () => {
  return (
    <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Welcome Back 👋</Text>
          <Text style={styles.subTitle}>Sign In to contine</Text>
          <TextInput
          placeholder='Email'
          keyboardType='phone-pad'
          style={styles.input}
          />


          <TextInput
          placeholder='Passwords'
          secureTextEntry
          style={styles.input}
          />

        <TouchableOpacity>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Sign In here</Text>
          </View>
        </TouchableOpacity>

        </View>

    </View>
  )
}

export default Login
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.4)',
    alignItems:'center',
    justifyContent:'flex-end'
  },
  loginContainer:{
    backgroundColor:'#fff',
    minHeight:'55%',
    // height:'55%',
    // height:40,
    width:'95%',
    marginBottom:20,
    paddingBottom:20,
    padding:30,
    elevation:5,
    borderTopLeftRadius:30,
    borderTopRightRadius:30
    
  },

  title:{
    fontSize:24,
    fontWeight:'bold'
  },
  subTitle:{
    fontSize:15,
    marginVertical:7
  },
  btn:{
    backgroundColor:'#6C63FF',
    paddingVertical:16,
    paddingHorizontal:20,
    textAlign:'center',
    borderRadius:8

  },

  btnText:{
    color:"#fff",
    fontSize:17,
    textAlign:'center'
  },
  input:{
    backgroundColor:'green',
    marginVertical:7,
    borderRadius:8,
    backgroundColor:'#ddd',
    paddingHorizontal:8,
  }
})