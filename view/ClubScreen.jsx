import React, { useLayoutEffect } from "react";
import { Text, View, StyleSheet, Image, Button } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

const ClubScreen = ({ navigation, route }) => {
  const data = route.params;
  const gridData=data.leagueData.clubs
  console.log("here is the data");
  console.log("**********************************");
  console.log("here is data " + JSON.stringify(data));
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Ionicons name={"favorite"} size={32} color={"red"} />;
      },
    });
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.leagueData.title}</Text>

      <View style={styles.imageContainer}>
        <Image
          style={styles.img}
          source={require("../assets/laliga.png")}
          alt=""
          resizeMode="cover"
        />
      </View>
           {/* name: "Real Madrid",
        trophies: ["Champions League", "Club World Cup", "Copa del Rey"],
        fans: 6000000,
        stadium: "Santiago Bernabéu",
        president: "Ana Betiz-López",
      }, */}

      <View style={styles.content}>
        <Text>{data.leagueData.description}</Text>
        <Text>{data.leagueData.numClubs}</Text>
        <Text>{data.leagueData.rating}</Text>
        <View style={styles.clubs}>
          {gridData.map((club,i)=>(
            <View style={styles.club} key={club.name}>
              <Text>{club.name}</Text>
              <Text>{club.fans}</Text>
              <Text>{club.stadium}</Text>
              <Text>{club.president}</Text>
<Button title="add favorite"/>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ClubScreen;
const styles = StyleSheet.create({
  container: {
    // backgroundColor:'red',
    // alignItems:'center',
    paddingLeft: 22,
    justifyContent: "center",
  },
  title: {
    color: "#999",
    fontSize: 22,
    paddingTop: 22,
  },
  imageContainer: {
    width: "100%",
    backgroundColor: "red",
    // padding:12,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "100%",
    borderRadius: 34,
  },

  content:{
    justifyContent:'center',
    marginTop:22,
    paddingHorizontal:12,
  },
  clubs:{
    backgroundColor:"red",
    padding:12,
    alignItems:'center',
    flexDirection:'row',
    flexWrap:'wrap',
    gap:12
  },
  club:{
    backgroundColor:'#fff',
    width:'40%',
    borderRadius:1,
    padding:12


  }
});
