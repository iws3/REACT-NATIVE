// src/screens/LeaguePlayersScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

/*
THE LEAGUE PLAYERS SCREEN PURPOSE:
This screen shows all players from a specific league.
Users can:
1. Select a player (by tapping on them - gets a blue border)
2. Add selected player to favorites (by tapping the heart icon)

SELECTION LOGIC (Important!):
- User must first SELECT a player (tap on card)
- Only then can they add it to favorites (tap heart icon on SELECTED card)
- This two-step process prevents accidental additions

For now, we'll use local state. Later, we'll move favorites
to Context so all screens can access them.
*/

export default function LeaguePlayersScreen({ route, navigation }) {
  // Get the league data that was passed from HomeScreen
  const { league } = route.params;
  
  // Local state for now (will move to Context later)
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState([]);

  // Handle player card tap - selects/deselects the player
  const handlePlayerPress = (player) => {
    // If tapping the same player, deselect them
    if (selectedPlayer?.id === player.id) {
      setSelectedPlayer(null);
    } else {
      // Otherwise, select this player
      setSelectedPlayer(player);
    }
  };

  // Handle favorite button tap - adds selected player to favorites
  const handleFavoritePress = (player) => {
    // Check if this player is currently selected
    if (selectedPlayer?.id !== player.id) {
      alert('Please select this player first before adding to favorites!');
      return;
    }

    // Check if already in favorites
    if (favoriteIds.includes(player.id)) {
      alert('This player is already in your favorites!');
      return;
    }

    // Add to favorites
    setFavoriteIds([...favoriteIds, player.id]);
    alert(`${player.name} added to your GOATs! ⚽`);
    
    // Deselect after adding
    setSelectedPlayer(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header with League Info */}
      <View style={[styles.header, { backgroundColor: league.color }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Image
  source={{uri:league.icon}} // e.g. leagueIcons['premier-league']
  style={styles.leagueIcon}
/>
          <Text style={styles.headerTitle}>{league.name}</Text>
          <Text style={styles.headerSubtitle}>
            Select a player, then tap ❤️ to add to your GOATs
          </Text>
        </View>
      </View>

      {/* Players List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {league.players.map((player) => {
          const isSelected = selectedPlayer?.id === player.id;
          const isFavorited = favoriteIds.includes(player.id);
          
          return (
            <TouchableOpacity
              key={player.id}
              style={[
                styles.playerCard,
                isSelected && styles.playerCardSelected,
              ]}
              onPress={() => handlePlayerPress(player)}
              activeOpacity={0.7}
            >
              {/* Player Image */}
              <Image
                source={{ uri: player.image }}
                style={styles.playerImage}
              />

              {/* Player Info */}
              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={styles.playerTeam}>{player.team}</Text>
                <Text style={styles.playerPosition}>{player.position}</Text>
                <Text style={styles.playerAchievements}>
                  {player.achievements}
                </Text>
                <Text style={styles.playerGoals}>⚽ {player.goals} Goals</Text>
              </View>

              {/* Favorite Button */}
              <TouchableOpacity
                style={[
                  styles.favoriteButton,
                  isFavorited && styles.favoriteButtonActive,
                ]}
                onPress={() => handleFavoritePress(player)}
              >
                <Text style={styles.favoriteIcon}>
                  {isFavorited ? '❤️' : '🤍'}
                </Text>
              </TouchableOpacity>

              {/* Selection Indicator */}
              {isSelected && (
                <View style={styles.selectionBadge}>
                  <Text style={styles.selectionText}>SELECTED</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Bottom Info Bar */}
      {selectedPlayer && (
        <View style={styles.bottomBar}>
          <Text style={styles.bottomBarText}>
            ✓ {selectedPlayer.name} selected - Tap ❤️ to add to favorites
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    marginBottom: 12,
  },
  backIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  headerContent: {
    alignItems: 'center',
  },
  leagueIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  playerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: 'transparent',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerCardSelected: {
    borderColor: '#4A90E2',
    backgroundColor: '#F0F7FF',
  },
  playerImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
  },
  playerInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  playerTeam: {
    fontSize: 14,
    color: '#4A90E2',
    marginBottom: 2,
  },
  playerPosition: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  playerAchievements: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  playerGoals: {
    fontSize: 13,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  favoriteButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 24,
    marginLeft: 12,
  },
  favoriteButtonActive: {
    backgroundColor: '#FFE0E0',
  },
  favoriteIcon: {
    fontSize: 24,
  },
  selectionBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#4A90E2',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  selectionText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bottomBar: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  bottomBarText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
});

/*
KEY CONCEPTS IN THIS SCREEN:

1. ROUTE PARAMETERS:
   const { league } = route.params;
   
   Remember how we sent league data from HomeScreen using
   navigation.navigate('LeaguePlayers', { league })?
   We receive it here through route.params.
   
   It's like a relay race - HomeScreen is the first runner who
   passes the baton (league data) to this screen (the second runner).

2. CONDITIONAL STYLING:
   style={[styles.playerCard, isSelected && styles.playerCardSelected]}
   
   The && operator is a clever trick. If isSelected is true,
   the second style is applied. If false, it's ignored.
   
   Think of it like: "Apply base style, AND IF selected, apply selected style too"

3. SPREAD OPERATOR (...):
   setFavoriteIds([...favoriteIds, player.id])
   
   The ... (spread operator) "unpacks" an array. It's like dumping
   out a box of items, then adding a new item, then putting everything
   back in a new box.
   
   Why not just push? Because in React, we NEVER modify state directly.
   We always create a NEW array/object. This tells React that something
   changed and triggers a re-render.

4. OPTIONAL CHAINING (?.):
   selectedPlayer?.id
   
   The ?. says "if selectedPlayer exists, give me its id property.
   If selectedPlayer is null or undefined, just return undefined
   instead of crashing."
   
   It's like asking "if this person exists, what's their phone number?"
   instead of assuming they exist and crashing when they don't.

5. TWO-STEP SELECTION PATTERN:
   This is a UX pattern to prevent accidents. Users must:
   1. Tap card to select (indicates intention)
   2. Tap heart to favorite (confirms action)
   
   It's like: "Pick up the item" → "Put it in your cart"
   Not just: "Accidentally touched item? PURCHASED!"
*/