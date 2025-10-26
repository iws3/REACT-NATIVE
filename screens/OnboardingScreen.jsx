// screens/OnboardingScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Top decorative circle */}
      <View style={styles.circleTop} />
      
      {/* Main content */}
      <View style={styles.content}>
        {/* App icon/logo area */}
        <View style={styles.iconContainer}>
          <Ionicons name="leaf" size={80} color="#4CAF50" />
        </View>
        
        <Text style={styles.title}>Welcome to VeLi</Text>
        <Text style={styles.subtitle}>Vegetarian Living Made Simple</Text>
        
        {/* Feature highlights */}
        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Ionicons name="restaurant-outline" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>Discover healthy recipes</Text>
          </View>
          
          <View style={styles.feature}>
            <Ionicons name="heart-outline" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>Track your journey</Text>
          </View>
          
          <View style={styles.feature}>
            <Ionicons name="people-outline" size={24} color="#4CAF50" />
            <Text style={styles.featureText}>Join the community</Text>
          </View>
        </View>
      </View>
      
      {/* Bottom action buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.replace('MainApp')}
        >
          <Text style={styles.secondaryButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
      
      {/* Bottom decorative circle */}
      <View style={styles.circleBottom} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  circleTop: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: (width * 1.5) / 2,
    backgroundColor: '#E8F5E9',
    top: -width * 0.7,
    right: -width * 0.5,
    opacity: 0.3,
  },
  circleBottom: {
    position: 'absolute',
    width: width,
    height: width,
    borderRadius: width / 2,
    backgroundColor: '#C8E6C9',
    bottom: -width * 0.5,
    left: -width * 0.3,
    opacity: 0.2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 50,
    textAlign: 'center',
  },
  featuresContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    fontWeight: '500',
  },
  buttonContainer: {
    paddingHorizontal: 30,
    paddingBottom: 50,
    zIndex: 10,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#4CAF50',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default OnboardingScreen;