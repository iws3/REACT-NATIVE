import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function OnboardingScreen({ onComplete }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#1B5E20', '#2E7D32', '#4CAF50']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png' }}
            style={styles.image}
          />
          
          <Text style={styles.title}>MediCare AI</Text>
          <Text style={styles.subtitle}>Your Personal Medical Assistant</Text>
          
          <View style={styles.features}>
            <Feature 
              icon="💬" 
              text="Chat with AI medical assistant in English & French" 
            />
            <Feature 
              icon="📄" 
              text="Analyze medical records and lab results instantly" 
            />
            <Feature 
              icon="🔍" 
              text="Search latest medical research from trusted sources" 
            />
            <Feature 
              icon="🔒" 
              text="Your privacy is our priority - data stays secure" 
            />
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={onComplete}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            This app provides information only. Always consult qualified healthcare professionals for medical advice.
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

function Feature({ icon, text }) {
  return (
    <View style={styles.feature}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 24,
    tintColor: '#FFFFFF',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#E8F5E9',
    marginBottom: 40,
    textAlign: 'center',
  },
  features: {
    width: '100%',
    marginBottom: 40,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 12,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  featureText: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#1B5E20',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disclaimer: {
    marginTop: 24,
    fontSize: 12,
    color: '#C8E6C9',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});