// src/screens/FavGoatsScreen.js

import React from 'react';
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
THE FAV GOATS SCREEN PURPOSE:
This screen displays all the players that the user has favorited.
It's their personal collection of GOATs (Greatest Of All Time).

For now, we'll show a placeholder since we don't have Context yet.
Once we implement Context, this screen will display the actual
favorited players from all leagues.

FEATURES NEEDED (will implement with Context):
- Display all favorited players
- Show count of favorites
- Allow removing players from favorites
- Empty state when no favorites
*/

export default function FavGoatsScreen() {
  // PLACEHOLDER - will get from Context later
  const favorites = [];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My GOATs</Text>
        <Text style={styles.headerSubtitle}>
          Your collection of legendary players
        </Text>
        
        {/* Favorites Counter Badge */}
        <View style={styles.counterBadge}>
          <Text style={styles.counterText}>
            {favorites.length} / 2 Players
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {favorites.length === 0 ? (
          // Empty State - shown when no favorites
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>⚽</Text>
            <Text style={styles.emptyTitle}>No GOATs Yet</Text>
            <Text style={styles.emptyMessage}>
              Start building your collection by exploring leagues and selecting
              your favorite players!
            </Text>
            <Text style={styles.emptyHint}>
              💡 Tip: Go to the Leagues tab, select a player, then tap the ❤️ icon
            </Text>
          </View>
        ) : (
          // List of Favorite Players (will implement with Context)
          favorites.map((player) => (
            <View key={player.id} style={styles.playerCard}>
              <Image
                source={{ uri: player.image }}
                style={styles.playerImage}
              />
              
              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={styles.playerTeam}>{player.team}</Text>
                <Text style={styles.playerPosition}>{player.position}</Text>
                <Text style={styles.playerLeague}>
                  {player.league} {player.leagueIcon}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => {
                  // Will implement with Context
                  alert('Remove functionality coming soon!');
                }}
              >
                <Text style={styles.removeIcon}>🗑️</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
    marginBottom: 12,
  },
  counterBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#4A90E2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  counterText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  emptyHint: {
    fontSize: 14,
    color: '#4A90E2',
    textAlign: 'center',
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  playerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  playerLeague: {
    fontSize: 13,
    color: '#888',
    fontWeight: '600',
  },
  removeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE0E0',
    borderRadius: 22,
    marginLeft: 12,
  },
  removeIcon: {
    fontSize: 20,
  },
});

/*
KEY CONCEPTS IN THIS SCREEN:

1. EMPTY STATE PATTERN:
   {favorites.length === 0 ? <EmptyView /> : <ListView />}
   
   Empty states are crucial for good UX. When a screen has no data,
   don't just show nothing - guide the user on what to do next!
   
   Think of it like walking into an empty restaurant. A good one
   has signs saying "Please seat yourself" or "Wait to be seated".
   A bad one is just empty and confusing.

2. CONDITIONAL RENDERING:
   We use the ternary operator (? :) to decide what to show.
   If favorites is empty, show helpful empty state.
   Otherwise, show the list of favorites.
   
   This is like a fork in the road - go left if condition is true,
   go right if it's false.

3. PLACEHOLDER DATA:
   Notice we have const favorites = []; at the top.
   This is temporary! Once we implement Context, we'll replace
   this line with:
   const { favorites } = useFavContext();
   
   It's like building a house - we put up temporary supports
   while constructing, then replace them with permanent structures.

4. VISUAL HIERARCHY:
   Look at the font sizes: 28 for title, 14 for subtitle, etc.
   This creates a clear hierarchy - users' eyes naturally flow
   from most important (title) to less important (details).
   
   It's like a newspaper - headlines are big, subheadings medium,
   body text small. This guides attention.

5. SELF-DOCUMENTING UI:
   The empty state doesn't just say "No favorites" - it tells
   users HOW to add favorites. This reduces support requests
   and improves user experience.
*/