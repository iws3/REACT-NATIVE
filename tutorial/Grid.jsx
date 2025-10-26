 import React from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native'



// new es7 feature

const data =Array.from({length:20}).map((_, i)=>({id:i.toString(), value:i+1}))

const Grid = () => {
  return (
    
        <ScrollView  contentContainerStyle={styles.container}>
     
       {Array.from({length:20}).map((_, i)=>(
           <View style={styles.item} key={i}>
            <Text style={styles.number}>{i+1}</Text>
        </View>
       ))}
       
</ScrollView>
        
   
  )
}
export default Grid

const styles=StyleSheet.create({
    // CODE HERE
    container:{
        // flex:1,
        paddingTop:15,
        backgroundColor:'teal',
        gap:20,
        alignItems:'center',
        flexDirection:'row',
        flexWrap:'wrap',
        padding:12,
    },
    item:{
        backgroundColor:'red',
        width:'46%',
        height:100,
        alignItems:'center',
        color:'#fff',
        fontSize:27,
        justifyContent:'center',
        // marginRight:12
    }
})

// 

