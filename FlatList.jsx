import React, { useState } from 'react'
import { FlatList, Text, View, StyleSheet } from 'react-native'

// create data from  nothing
// {id:number, value:some_number}

const data=Array.from({length:50}).map((_, i)=>({id:i.toString(), value:i+1}))
console.log("my data is: ", data)

const ListFlat = () => {
    const [numColumns, setNumColumns]=useState(2)
  return (
    <View style={styles.container}>
        <FlatList
        data={data}
        key={3}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(
            <View style={styles.item}>
                <Text>{item.value}</Text>
            </View>
        )}
numColumns={numColumns}
columnWrapperStyle={styles.row}
showsVerticalScrollIndicator={false}
        />
      
    </View>
  )
}

export default ListFlat

const styles=StyleSheet.create({
    container:{
        backgroundColor:'teal',
        flex:1,
        padding:12,
        gap:12
    },
    item:{

        width:'46%',
        height:200,
        backgroundColor:'red',
        gap:12,
        marginTop:25

    },
    row:{
    justifyContent:'space-around',
    // gap:12

    }
})