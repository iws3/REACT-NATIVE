// src/navigation/AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

// Import screens - think of these as different rooms in our house
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import LeaguePlayersScreen from '../screens/LeaguePlayersScreen';
import FavGoatsScreen from '../screens/FavGoatsScreen';
import AboutScreen from '../screens/AboutScreen';
import SignInModal from '../screens/SignInModal';

// Create navigators - these are like different types of hallway systems
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// This is our Bottom Tab Navigator - the main area where users spend time
// Think of it like the ground floor of a building with easy access
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarLabel: 'Leagues',
        }}
      />
      <Tab.Screen
        name="FavGoats"
        component={FavGoatsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" size={size} color={color} />
          ),
          tabBarLabel: 'My GOATs',
        }}
      />
    </Tab.Navigator>
  );
}

// This is our Drawer Navigator - for secondary screens
// Think of it like a side panel that slides out
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: '#4A90E2',
        drawerInactiveTintColor: '#8E8E93',
      }}
    >
      <Drawer.Screen
        name="Main"
        component={TabNavigator}
        options={{
          title: 'FavGoaT',
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'About FavGoaT',
          drawerLabel: 'About',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// This is our Main App Navigator - the master controller
// It's like the main entrance and routing system of our entire building
export default function AppNavigator() {
  // useState will later help us track if user has completed onboarding
  // For now, we'll default to showing onboarding
  const [hasOnboarded, setHasOnboarded] = React.useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen
          name="SignInModal"
          component={SignInModal}
          options={{
            presentation: 'modal', // This makes it appear as a modal
            animation: 'slide_from_bottom',
          }}
        />
        <>
          <Stack.Screen name="Drawer" component={DrawerNavigator} />
          <Stack.Screen 
            name="LeaguePlayers" 
            component={LeaguePlayersScreen}
            options={{
              presentation: 'modal', // This makes it slide up like a modal
              headerShown: true,
            }}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*
KEY CONCEPTS EXPLAINED:

1. NAVIGATOR TYPES:
   - Stack: Screens stacked on top of each other (like a deck of cards)
   - Tab: Bottom tabs for quick switching (like browser tabs)
   - Drawer: Side menu that slides in (like a drawer opening)

2. NESTING NAVIGATORS:
   We nest them like Russian dolls:
   Stack (outer) → Drawer → Tabs (inner)
   
   Why? Because we want:
   - Stack for onboarding (one-time flow)
   - Drawer for settings/about (occasional access)
   - Tabs for main features (frequent switching)

3. CONDITIONAL RENDERING:
   The {!hasOnboarded ? ... : ...} pattern shows different screens
   based on app state. It's like a bouncer at a club - if you're
   not on the list (haven't onboarded), you can't enter the main area.

4. EXPO VECTOR ICONS:
   - Import Ionicons from '@expo/vector-icons'
   - tabBarIcon receives { color, size } props automatically
   - Icons used: 'home', 'star', 'home-outline', 'information-circle-outline'
   - You can explore more icons at: https://icons.expo.fyi
*/