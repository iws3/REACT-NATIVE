import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Welcome = () => {
  return (
    <View style={styles.container}>
        <Text>Hello Welcome to my app</Text>
    </View>
  )
}

export default Welcome
const styles=StyleSheet.create({
container:{
    flex:1,
    backgroundColor:'red'
}
})