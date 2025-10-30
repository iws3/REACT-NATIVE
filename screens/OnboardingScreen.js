import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Hero Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800',
          }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        {/* Overlay gradient effect could go here */}
        <View style={styles.overlay} />
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <Text style={styles.emoji}>🐐⚽</Text>
        <Text style={styles.title}>Welcome to FavGoaT</Text>
        <Text style={styles.subtitle}>
          Your Ultimate Football Legends Tracker
        </Text>
        
        <Text style={styles.description}>
          Discover and collect the greatest football players across all major
          leagues. Build your dream GOAT list and celebrate the legends of the
          beautiful game.
        </Text>

        {/* Features List */}
        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🏆</Text>
            <Text style={styles.featureText}>Explore 7 major leagues</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>⭐</Text>
            <Text style={styles.featureText}>Select your favorite GOATs</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🌓</Text>
            <Text style={styles.featureText}>Dark & Light mode support</Text>
          </View>
        </View>
      </View>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignInModal')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Get Started</Text>
        <Text style={styles.buttonArrow}>→</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1E',
  },
  imageContainer: {
    width: width,
    height: height * 0.4,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#00D9FF',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  featuresContainer: {
    gap: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureText: {
    fontSize: 15,
    color: '#FFFFFF',
    flex: 1,
  },
  button: {
    backgroundColor: '#00D9FF',
    marginHorizontal: 24,
    marginBottom: 32,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#00D9FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#0F0F1E',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonArrow: {
    color: '#0F0F1E',
    fontSize: 20,
    fontWeight: 'bold',
  },
});