// src/screens/HomeScreen.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { leaguesData } from '../data/leagueData';

/*
THE HOME SCREEN PURPOSE:
This is the main hub where users see all available leagues.
Think of it like a menu at a restaurant - you're presented
with categories (leagues) and you choose which one to explore.

When a user taps a league, we'll navigate to the LeaguePlayersScreen
and pass that league's data along.
*/

export default function HomeScreen({ navigation }) {
  // Function to handle when a league is pressed
  const handleLeaguePress = (league) => {
    // We'll navigate to the LeaguePlayers screen and pass the league data
    navigation.navigate('LeaguePlayers', { league });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Football Leagues</Text>
        <Text style={styles.headerSubtitle}>
          Select a league to explore legendary players
        </Text>
      </View>

      {/* Leagues Grid */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.leaguesGrid}>
          {leaguesData.map((league) => (
            <TouchableOpacity
              key={league.id}
              style={[styles.leagueCard, { borderColor: league.color }]}
              onPress={() => handleLeaguePress(league)}
              activeOpacity={0.7}
            >
              {/* League Icon - Now using Image component */}
              <View style={[styles.iconContainer, { backgroundColor: league.color }]}>
                <Image 
                  source={{uri:league.icon}}
                  style={styles.leagueIcon}
                  resizeMode="cover"
                />
              </View>
              
              {/* League Name */}
              <Text style={styles.leagueName}>{league.name}</Text>
              
              {/* Player Count Badge */}
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {league.players.length} Players
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  leaguesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  leagueCard: {
    width: '48%', // Two columns with space between
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    overflow: 'hidden', // Important: clips the image to the circular shape
  },
  leagueIcon: {
    width: '100%',
    height: '100%',
  },
  leagueName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});

// /*
// KEY CONCEPTS IN THIS SCREEN:

// 1. IMAGE COMPONENT:
//    <Image source={{ uri: league.icon }} />
   
//    The Image component displays images from various sources.
//    When using a URL (like from Unsplash), we use the { uri: 'url' } format.
//    For local images, you'd use require('./path/to/image.png').
   
//    The 'resizeMode' prop controls how the image fits:
//    - 'cover': fills the container, may crop sides
//    - 'contain': fits entire image, may have empty space
//    - 'stretch': distorts to fill (usually not recommended)

// 2. OVERFLOW HIDDEN:
//    overflow: 'hidden' in iconContainer
   
//    This is crucial for circular images. Without it, the rectangular
//    image would show corners outside the circular border. It's like
//    using a cookie cutter - anything outside the shape gets trimmed.

// 3. MAP FUNCTION:
//    leaguesData.map((league) => (...))
   
//    The map function is like a factory assembly line. You have a conveyor
//    belt (leaguesData array) with raw materials (league objects), and for
//    each item that comes through, you perform the same operation (create a
//    TouchableOpacity card). The result is an array of React components.
   
//    IMPORTANT: Notice the key={league.id}. React uses this to efficiently
//    track which items have changed. Without it, React would have to
//    re-render everything. The key is like giving each factory product
//    a serial number.

// 4. NAVIGATION WITH PARAMETERS:
//    navigation.navigate('LeaguePlayers', { league })
   
//    This is like mailing a letter with both an address and contents.
//    The first argument ('LeaguePlayers') is the address - where to go.
//    The second argument ({ league }) is the package we're sending along.
//    The destination screen will receive this data and can use it.

// 5. DYNAMIC STYLING:
//    style={[styles.leagueCard, { borderColor: league.color }]}
   
//    The square brackets [] let us apply multiple style objects.
//    The first is our base style (leagueCard), the second adds
//    dynamic properties based on data (borderColor from league.color).
//    It's like wearing a standard uniform but each person gets to
//    choose their hat color.

// 6. FLEXBOX LAYOUT:
//    flexDirection: 'row'  - arranges children horizontally
//    flexWrap: 'wrap'      - wraps to next line when full
//    justifyContent: 'space-between' - adds space between items
//    width: '48%'          - two columns (48% + 48% + 4% gap = 100%)
   
//    This creates a responsive grid that automatically adjusts.

// 7. SAFEAREAVIEW:
//    This component ensures content doesn't get hidden behind
//    notches, status bars, or home indicators on modern phones.
//    It's like padding that automatically adjusts to each device's
//    unique screen shape.