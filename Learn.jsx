import React from "react";
import { View, Text, StatusBar, StyleSheet, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
//
const Learn = () => {
  const [count, setCount]=useState(0)
  const handleCountUp=()=>{
    setCount(prev=>prev+1)
  
    
  }

  const handleCountDown=()=>{
    setCount(prev=>prev <=0 ? 0 : prev-1 )
    // if(count<=0){
    //   setCount(0)
    // }
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="green"
        hidden={false}
      />
      <Text style={styles.title}>Counter App for WoCians 💛</Text>
      {count===10 ? (
<View style={styles.stop}>
        <Text style={styles.number}>STOP HERE IS  ☺</Text>
      </View>
      ) : (
     <View style={styles.numberContainer}>
        <Text style={styles.number}>{count}</Text>
      </View>

      )}
      
      <View style={styles.btn}>
      <Button title="+" color={'green'} onPress={handleCountUp} />
      <Button title="-" color={'red'} onPress={handleCountDown} />
      {/* CUSTOMIZE BUTTONS */}
      <TouchableOpacity onPress={()=>console.log("click me")}>
      <View style={styles.customBtn}>
        <Text style={styles.btnText}>Custom Button</Text>
      </View>
      </TouchableOpacity>
      </View>

      {/* <View style={styles.child1}></View> */}
    </SafeAreaView>
  );
};

// styles after the main component

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "teal",
    // paddingTop:300,
    // paddingLeft:100
    // width:
    // flexDirection:'row',
    alignItems: "center",
    justifyContent: "center",
  },
  title:{
    fontSize:20,
    paddingHorizontal:12,
    fontWeight:'900',
    color:'#fff'
  },
  numberContainer:{
    marginTop:12,
    width:200,
    height:200,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:'50%',
    marginTop:12,
    marginBottom:12,
  },
  number:{
    fontSize:65,
  },
  btn:{
    flexDirection:'row',
    gap:12,
  },
  stop:{
fontSize:40,
backgroundColor:'white',
paddingHorizontal:12,

  },
  customBtn:{
    marginTop:42,
    backgroundColor:'red',
    paddingVertical:12,
    paddingHorizontal:24,
    borderRadius:9,
    
  },
  btnText:{
    color:'white'
  }

});

export default Learn;
