// act like container holding every thing navigation
import { NavigationContainer } from "@react-navigation/native";
// is used to stack screens
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Welcome from "./screens/Welcome";
// import Login from "./screens/Login";
import Team from "./screens/Team";
import Welcome from "./components/Welcome";
import Login from "./components/Login";

const Stack = createNativeStackNavigator();

export default function App() {


  return(

<NavigationContainer>
    {/* start configuring the various screens */}
    <Stack.Navigator
      initialRouteName="welcome"
      screenOptions={{
        headerStyle: {
          backgroundColor: "red",
        },
      }}
    >
      <Stack.Screen name="welcome" component={Welcome} options={{headerShown:false}}/>

      <Stack.Screen name="Login" component={Login} options={{title:"Login Screen", headerShown:false, presentation:'modal', animation:'slide_from_bottom'}} />

      <Stack.Screen name="Team" component={Team} options={{title:"Our Team"}}/>
    </Stack.Navigator>
  </NavigationContainer>

  )
  // configure navigation in here
  
}
