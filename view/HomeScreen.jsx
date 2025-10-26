import React, { useLayoutEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView, FlatList, Pressable } from "react-native";
import { leagues } from "../constants/data.js";
// import { leagues } from "../constants/CLUB.js";

console.log("here are is my league data:", JSON.stringify(leagues[0]))

const HomeScreen = ({navigation, route}) => {
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>{
                return(
                    <View style={styles.logo}>
                    <Text style={styles.logoIcon}>⚽</Text>
                    <Text style={styles.logoText}>Ball</Text>
                    </View>
                )
            },
            
        })
    })

const handlePageChange=(data)=>{
  console.log("added to page")
  console.log(`My data is ${JSON.stringify(data)}`)
  navigation.navigate("clubs", {leagueData: data})
}

    const renderTeam =(league)=>{
      return (
         <Pressable onPress={()=>handleClick(league.item)}>
            <View key={league.item.id} style={styles.leagueItem}>
                <Text>{league.item.title}</Text>
                <Text>{league.item.description?.toString().slice(0, 50)}...</Text>
            </View>
            </Pressable>
      )    
    }
  return (
    <ScrollView contentContainerStyle={styles.container}alwaysBounceVertical >
      <View style={styles.imgContainer}>
        <Image
          source={require("../assets/football.png")}
          resizeMode="contain"
          style={styles.coverImg}
        />
      </View>
    <View style={styles.leageContainer}>
{/* 
        <FlatList
        data={leagues}
        keyExtractor={(item)=>item.id}
        renderItem={renderTeam}
        
        /> */}
     {
        leagues.map((league)=>(
            <Pressable onPress={()=>handlePageChange(league)} key={league.id} style={styles.leagueItem}>
                <Text>{league.title}</Text>
                <Text>{league.description.toString().slice(0, 50)}...</Text>
                <Text>Happy writing code</Text>
            </Pressable>
        ))
      }    
    </View> 

    
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    // backgroundColor:"#999999",
    // flex: 1,
    backgroundColor: "#fff",
    alignItems:'center'
  },
  imgContainer: {
    width: "100%",
    backgroundColor: "#ffffffff",
    borderRadius: 20,
    elevation: 23,
  },
  coverImg: {
    width: "100%",
  },
  leageContainer: {
    width:'90%',
    alignItems:'center',
    marginTop:23,
    elevation:5,
    backgroundColor:'#fff',
    padding:23,
    // borderWidth:12,
    
    marginBottom:42
  },

  leagueItem:{
    backgroundColor:'#fff',
    elevation:23,
    marginTop:12,
    padding:12,
    cursor:'pointer',
    borderBottomWidth:2,
    borderBottomColor:'red',
    // marginBottom:34
  },
  logo:{
    width:40,
    height:40,
    padding:5,
    backgroundColor:'#000',
    borderRadius:12,
    alignItems:'center',
    justifyContent:'center',
    marginRight:12
  },
  logoText:{
    color:"#fff"
  }
});
