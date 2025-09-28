import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

const Welcome = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={styles.content}>
            <View style={styles.imgContainer}>
                <Image source={require('../assets/us.png')} resizeMode='contain' style={styles.img}/>
            </View>
            <View style={styles.textContainer}>
            <Text style={styles.title}>Stay</Text>
<Text style={[styles.title, styles.special]}>Connected</Text>
<View style={styles.slantedLine}/>
            </View>
            

            <Text style={styles.subText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus incidunt animi maxime modi? Illum voluptate aliquam iusto possimus eaque dolores ducimus cum architecto!</Text>

            <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>Get Started</Text>
                </View>
            </TouchableOpacity>

        </View>
    </View>
  )
}

export default Welcome

const styles=StyleSheet.create({
container:{
    flex:1,
    backgroundColor:'#6C63FF',
    alignItems:'center',
    justifyContent:'center',
    // padding:50
},

imgContainer:{
    width:300,
    height:300
},

textContainer:{
    flexDirection:'row',
    gap:5,
    // backgroundColor:'green',
    position:'relative'

},

slantedLine:{
   width:'40%',
   backgroundColor:'white',
   height:2,
   position:'absolute',
   top:65,
   left:'18%',
   transform:[{'rotate':'-3deg'}]
},


special:{
// backgroundColor:'red',
paddingHorizontal:12,

},

content:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'

},
img:{
    // width:'100%'
    width:'100%'
    // padding:20
       // height:'400'
},
title:{
    fontSize:30,
    color:'#fff',
    marginVertical:20
},
subText:{
    color:'#ddd',
    alignSelf:'center',
    textAlign:'center',
    fontSize:17
},

btn:{
     backgroundColor:'#fff',
     marginVertical:20,
     paddingVertical:14,
     paddingHorizontal:30,
     borderRadius:14,
     elevation:7,
     width:200,
     
},
btnText:{
    textAlign:'center'
}

})