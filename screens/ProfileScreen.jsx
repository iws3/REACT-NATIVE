// screens/ProfileScreen.js
import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  Image,
  Alert
} from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContent}>
        {/* Profile card with avatar */}
        <View style={styles.profileCard}>
          {/* Avatar image */}
          <View style={styles.avatarContainer}>
            <Image 
              source={
                require('../assets/gita.png')
              }
              style={styles.avatar}
            />
          </View>
          
          <Text style={styles.profileName}>Fonyuy Gita</Text>
          <Text style={styles.profileEmail}>gita@veggieapp.com</Text>
          <Text style={styles.profileInfo}>Vegetarian since 2020 🌱</Text>
        </View>
        
        {/* Settings button */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => Alert.alert("Settings", "Profile settings pressed!")}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        
        {/* Go to Home button */}
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Go to Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  profileContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50, // Makes it circular
    borderWidth: 3,
    borderColor: '#4CAF50', // Our brand green border
  },
  profileName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222',
  },
  profileEmail: {
    fontSize: 15,
    color: '#555',
    marginTop: 6,
  },
  profileInfo: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#1B5E20',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#1B5E20',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#1B5E20',
  },
});

export default ProfileScreen;