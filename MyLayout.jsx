import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import HomeScreen from './view/HomeScreen';
import ClubScreen from './view/ClubScreen';
import LeagueScreen from './view/LeaguesScreen';


const Tab = createBottomTabNavigator();

export default function App() {
  const [hasNotifications, setHasNotifications] = useState(true);
  const [notificationCount, setNotificationCount] = useState(5);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return (
                <Ionicons 
                  name={focused ? 'home' : 'home-outline'} 
                  size={size} 
                  color={color} 
                />
              );
            } else if (route.name === 'leagues') {
              return (
                <MaterialIcons 
                  name="restaurant-menu" 
                  size={size} 
                  color={color} 
                />
              );
            } else if (route.name === 'clubs') {
              return (
                <FontAwesome5 
                  name={focused ? 'ball' : 'ball-outline'} 
                  size={size} 
                  color={color} 
                />
              );
            }
          },
          tabBarActiveTintColor: '#950104ff',
          tabBarInactiveTintColor: '#07078cff',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#EAEAEA',
            borderTopWidth: 1,
          },
          headerStyle: {
            backgroundColor: '#ffffffff',
            elevation:12
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ 
            title: 'favPlayer',
            tabBarBadge: hasNotifications ? notificationCount : undefined,
          }}
        />
        <Tab.Screen 
          name="clubs" 
          component={ClubScreen}
          options={{ title: 'Football Clubs' }}
        />
        <Tab.Screen 
          name="leagues" 
          component={LeagueScreen}
          options={{ title: 'Our Leagues' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}