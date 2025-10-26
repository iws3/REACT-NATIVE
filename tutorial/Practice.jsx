import React from 'react'

import {Text, View, Image, ImageBackground, TouchableOpacity, StatusBar, StyleSheet} from "react-native"
// TEXT-> FOR PRINTING TEXT
// VIEW=>FOR CONTAINARIZATION
// IMAGEBACKGROUND-> ADDING BG IMAGE
// TOUCHABLE OPACITY: FOR CREATING CUSTOM BUTTONS

export default function OnboardingScreen(){
    return(
        <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={"white"} hidden={false}/>
        <Image style={styles.img} source={require('./assets/gita.png')} width={200} height={200}/>
        <View style={styles.content}>
            <Text style={styles.name}>Fonyuy Gita</Text>
            <Text style={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum reiciendis dignissimos beatae similique quasi numquam architecto pariatur expedita repellendus, quaerat incidunt modi earum!</Text>
            {/* Create a custom button */}
            <TouchableOpacity>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>More About Me</Text>
                </View>
            </TouchableOpacity>
            {/* <View></View> */}
        </View>


        </View>
    )
}

// CREATE MY STYLE SHEET (STYLESHEET, MUST BE AFTER THE COMPONENT)
const styles=StyleSheet.create(
    {
        container:{
            flex:1,
            backgroundColor:'#ffffff',
            alignItems:'center',
            justifyContent: 'center',
        },
        img:{
            height:200,
            width:200,
            borderRadius:100,
            borderColor:'teal ',
            borderWidth:5,
            elevation:4
        },
        content:{
            // flex:0.5,
            alignContent:'center',
            // justifyContent:'center'
            width:'100%',
            padding:34,
            gap:12,
        },
        name:{
         textAlign:'center',
         fontSize:20,
         fontWeight:'bold'
        },
        btn:{
            alignSelf:'center',
            backgroundColor:'teal',
            paddingHorizontal:23,
            paddingVertical:12,
            borderRadius:11
        },
        btnText:{
            color:"#fff"
        },
        desc:{
            textAlign:'center'
        }
        

    }
)