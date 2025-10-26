// start working with data

import { Text, View, StyleSheet, ScrollView } from "react-native"
import { data } from "./data.js"


console.log("My data is: ", data)


const Data=()=>{
    return(
        <ScrollView contentContainerStyle={styles.container}>
            
            {data.map((item)=>(
                <View key={item.id} style={styles.item}>
                    <Text style={styles.number}>{item.value}</Text>
                </View>

            ))}

            <Text>Text again...</Text>
        </ScrollView>
    )
}
export default Data

const styles=StyleSheet.create({
    // write styles here
    container:{
        // flex:1,
        backgroundColor:'teal',
        paddingTop:32,
        // alignItems:'center',
        flexDirection:'row',
        flexWrap:'wrap',
        gap:20,
        justifyContent:'center',
        paddingBottom:22
    },
    item:{
        width:100,
        height:100,
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center'
    },
    number:{
        color:'#fff',
    }
})
