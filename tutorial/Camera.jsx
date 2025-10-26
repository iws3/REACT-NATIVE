import { CameraView } from "expo-camera";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Camera = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState(null);

  const cameraRef = useRef(null);

  // function to help us take picture

  const takePicture = async () => {
    setShowCamera(true);
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        base64: false,
      });

      setPhoto(photoData.uri);
      setShowCamera(false);
    }
  };
  return (
    <View style={styles.container}>
      {/* show camera here */}

      <View style={styles.openCamera}>
        <TouchableOpacity onPress={() => setShowCamera(true)}>
          <Text>Take Picture</Text>
        </TouchableOpacity>
      </View>
      {showCamera && (
        <>
          <CameraView style={styles.camera} ref={cameraRef} facing="back">
            <View style={styles.btns}>
              <TouchableOpacity style={styles.snap} onPress={takePicture}>
                <View style={styles.snapBtn} />
              </TouchableOpacity>
            </View>
          </CameraView>

          <TouchableOpacity
            style={styles.snap}
            onPress={() => setShowCamera(false)}
          >
            <Text>Closebtn</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 23,
    backgroundColor:'teal',
    alignItems:'center',
    justifyContent:'center'
  },

  camera:{
    width:'100%',
    height:'100%',
    position:'absolute',    
  },
  btns:{
    backgroundColor:'red',
    width:300,
    height:100
  },
  openCamera:{
    width:200,
    height:50,
    backgroundColor:'orange',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:100
  }

});
