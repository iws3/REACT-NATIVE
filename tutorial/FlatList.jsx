// start working with data

import { Text, View, StyleSheet, ScrollView, FlatList, Dimensions, useWindowDimensions } from "react-native";
// import { useDimensions, useDeviceOrientation } from "@react-native-community/hooks";
import { data } from "./data.js";
import { useState } from "react";


// console.log("Dimensions are:",useDimensions());

console.log("My data is: ", data);

// {
//     id:string,
//     value:number
// }

const dimensionScreen = Dimensions.get('screen');
const dataString = JSON.stringify(dimensionScreen);
console.log(dataString);


const List = () => {
  const [columsSize, setColumSize] = useState(3);
  const { width, height } = useWindowDimensions();
  console.log("Width and Height are:", width, height);
  return (
    <View style={styles.container}>
     
    </View>
  );
};
export default List;

const styles = StyleSheet.create({
  // write styles here
  container: {
    height:'50%',
    width:'100%',
    backgroundColor: "red",
    // gap: 20,
  },
  row:{
justifyContent:'space-around'
  },
  item: {
    width: 100,
    height: 100,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    marginTop:12
  },
  number: {
    color: "#fff",
  },
});
