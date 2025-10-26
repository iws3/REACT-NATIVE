// domensions
// introduce native device features

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  useWindowDimensions,
} from "react-native";

const screenSize=Dimensions.get('screen')
console.log("My screensize is:",screenSize)

// {
//     W, H, S, FS
// }

const DimensionScreen = () => {
  const {width, height} = useWindowDimensions();
  console.log("Width and Height from hook:", width, height);

  const isLandscape=height<width
  return (
    <View styles={{height:isLandscape ? '100%' : '50%'}}>
      <Text style={styles.view}>View</Text>
    </View>
  );
};

export default DimensionScreen;
const styles = StyleSheet.create({
  // WRITE MY STYLES HERE
  container:{
    width:'100%',
    // height:isLandscape ? '100%' : '50%',
    backgroundColor:'red',
    padding: 12,
    // DIP=> dENSITY INDEPENDENT PIXELS, VALUE * SCALE=DIP
  }
});
