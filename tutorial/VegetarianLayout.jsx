import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert, 
  Image,
  StatusBar
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import FoodsScreen from '../screens/FoodsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';


const Tab = createBottomTabNavigator();


const Layout = () => {
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let IconComponent;

            if (route.name === 'Home') {
              IconComponent = Ionicons;
              iconName = focused ? 'leaf' : 'leaf-outline';
            } else if (route.name === 'Foods') {
              IconComponent = MaterialIcons;
              iconName = 'restaurant-menu';
            } else if (route.name === 'Profile') {
              IconComponent = FontAwesome5;
              iconName = focused ? 'user-alt' : 'user';
            }

            return <IconComponent name={iconName} size={size} color={color} />
            // <Ionicons name='Home' />  
          },
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: '#8E8E93',
          headerStyle: { backgroundColor: '#054107ff' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        })}
        initialRouteName="Home"
      >
        <Tab.Screen
         name="Home" 
         component={HomeScreen} 
         options={{ title: 'VeLi',tabBarLabel:'Home', 
            tabBarBadge:!isNotify ? 5 : undefined,
          
          }} 
        
        
        />
        <Tab.Screen name="Foods" component={FoodsScreen} options={{ title: 'Foods' }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Profile' }} />
      </Tab.Navigator>
   </NavigationContainer>
  );
};

export default Layout;

// STYLES
const styles = StyleSheet.create({
   icon:{
    width:33,
    height:33,
    backgroundColor:'#fff',
    marginRight:23,
    // color:'#fff',
    padding:8,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:'50%'

  },

  textLogo:{
    color:"green",
    fontSize:12,
  }
  });

