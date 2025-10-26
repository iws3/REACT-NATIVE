import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from './screen/OnboardingScreen';
import AnalyzeScreen from './screen/AnalyzeScreen';
import ResearchScreen from './screen/ResearchScreen';
import ProfileScreen from './screen/ProfileScreen';
import ChatScreen from './screen/ChatScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          const iconSize = focused ? 30 : 26; // bigger icons

          if (route.name === 'Chat') {
            return (
              <Ionicons
                name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
                size={iconSize}
                color={color}
              />
            );
          } else if (route.name === 'Analyze') {
            return (
              <MaterialCommunityIcons
                name={focused ? 'file-document' : 'file-document-outline'}
                size={iconSize}
                color={color}
              />
            );
          } else if (route.name === 'Research') {
            return (
              <MaterialCommunityIcons
                name={focused ? 'book-search' : 'book-search-outline'}
                size={iconSize}
                color={color}
              />
            );
          } else if (route.name === 'Profile') {
            return (
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={iconSize}
                color={color}
              />
            );
          }
        },
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E0E0E0',
          borderTopWidth: 1,
          paddingBottom: 8, // more breathing room
          paddingTop: 5,
          height: 70,       // taller bar to avoid notch issues
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#1B5E20',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        // Add a logout/back-to-onboarding button
        headerRight: () => (
          <Ionicons
            name="log-out-outline"
            size={24}
            color="#fff"
            style={{ marginRight: 15 }}
            onPress={async () => {
              await AsyncStorage.removeItem('hasSeenOnboarding'); // reset onboarding flag
              navigation.replace('Onboarding'); // navigate back
            }}
          />
        ),
      })}
    >
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen}
        options={{ title: 'Medical Assistant' }}
      />
      <Tab.Screen 
        name="Analyze" 
        component={AnalyzeScreen}
        options={{ title: 'Analyze Records' }}
      />
      <Tab.Screen 
        name="Research" 
        component={ResearchScreen}
        options={{ title: 'Research' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
}

export default function Layout() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('hasSeenOnboarding');
      if (value === 'true') {
        setShowOnboarding(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      setShowOnboarding(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showOnboarding ? (
          <Stack.Screen name="Onboarding">
            {props => <OnboardingScreen {...props} onComplete={completeOnboarding} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="MainTabs" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
