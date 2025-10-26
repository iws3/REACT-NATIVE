// import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { ImageBackground, View, StyleSheet, StatusBar, Text, TouchableOpacity } from 'react-native'
import { Ionicons, PlayIcon } from '@expo/vector-icons';


const Check = () => {
  return (
    <View style={styles.container}>
        {/* <StatusBar barStyle={"dark-content"} backgroundColor={'red'} /> */}
        <ImageBackground
        source={require('./assets/bg.png')}
        style={styles.bg}
        imageStyle={{opacity:1}}
        resizeMode='cover'
        
        >
            <View style={styles.overlay}>
                <View style={styles.logo}>
                    <Text style={styles.logoText}>W</Text>
                </View>
                <Text style={styles.text}>Wintro</Text>
                <Text style={styles.subTitle}>An introductory app for Wocians</Text>
                <Text style={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam veniam, numquam accusantium fugiat culpa sit quis magni .</Text>
                 {/* <Icon name="settings" size={24} color="#fff" /> */}
                 <TouchableOpacity>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Get Started Now</Text>
                    </View>
                 </TouchableOpacity>
            </View>
            {/* wamt to put content imnside our image bg */}

        </ImageBackground>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:'red'
    },
    bg:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'

    },
    overlay:{
        backgroundColor:'rgba(9, 12, 23, 0.9)',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        // width:'100%'
    },
    text:{
        color:"white",
        fontSize:34
    },
    subTitle:{
        color:'#fff',
        marginTop:5,
        fontSize:20
    },
    desc:{
        color:'#fff',
        fontSize:15,
        marginTop:15,
        textAlign:'center',
        paddingHorizontal:15
    },

    btn:{
       paddingVertical:12,
       paddingHorizontal:24,
       backgroundColor:'red',
       elevation:5,
       borderRadius:13,
       marginTop:12,
    //    color:'#fff' 
    },
    btnText:{
        color:'#fff'
    },
    logo:{
        width:100,
        height:100,
        backgroundColor:'red',
        borderRadius:'50%',
        marginVertical:33,
        elevation:23,
        alignItems:'center',
        justifyContent:'center'

    },
    logoText:{
        color:'white',
        fontWeight:'bold',
        fontSize:40,
    }

})

export default Check