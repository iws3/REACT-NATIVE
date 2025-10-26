import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { medicareApi } from '../api/medicareApi';

const ProfileScreen=()=> {
  const [defaultLanguage, setDefaultLanguage] = useState('en');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [apiStatus, setApiStatus] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(false);

  useEffect(() => {
    loadSettings();
    checkApiHealth();
  }, []);

  const loadSettings = async () => {
    try {
      const language = await AsyncStorage.getItem('defaultLanguage');
      const notifications = await AsyncStorage.getItem('notificationsEnabled');
      
      if (language) setDefaultLanguage(language);
      if (notifications) setNotificationsEnabled(notifications === 'true');
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveLanguage = async (language) => {
    try {
      await AsyncStorage.setItem('defaultLanguage', language);
      setDefaultLanguage(language);
      Alert.alert('Success', 'Default language updated');
    } catch (error) {
      Alert.alert('Error', 'Failed to save language preference');
    }
  };

  const toggleNotifications = async (value) => {
    try {
      await AsyncStorage.setItem('notificationsEnabled', value.toString());
      setNotificationsEnabled(value);
    } catch (error) {
      Alert.alert('Error', 'Failed to save notification preference');
    }
  };

  const checkApiHealth = async () => {
    setLoadingStatus(true);
    try {
      const response = await medicareApi.healthCheck();
      setApiStatus(response);
    } catch (error) {
      setApiStatus({ status: 'error', message: 'API unavailable' });
    } finally {
      setLoadingStatus(false);
    }
  };

  const clearCache = async () => {
    Alert.alert(
      'Clear Cache',
      'This will clear all saved data. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert('Success', 'Cache cleared successfully');
              loadSettings();
            } catch (error) {
              Alert.alert('Error', 'Failed to clear cache');
            }
          },
        },
      ]
    );
  };

  const openLink = (url) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Cannot open link');
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <MaterialCommunityIcons name="hospital-box" size={60} color="#2E7D32" />
        </View>
        <Text style={styles.appName}>MediCare AI</Text>
        <Text style={styles.version}>Version 2.0.0</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="language" size={24} color="#2E7D32" />
            <Text style={styles.settingLabel}>Default Language</Text>
          </View>
          <View style={styles.languageButtons}>
            <TouchableOpacity
              style={[
                styles.langButton,
                defaultLanguage === 'en' && styles.langButtonActive,
              ]}
              onPress={() => saveLanguage('en')}
            >
              <Text
                style={[
                  styles.langButtonText,
                  defaultLanguage === 'en' && styles.langButtonTextActive,
                ]}
              >
                EN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.langButton,
                defaultLanguage === 'fr' && styles.langButtonActive,
              ]}
              onPress={() => saveLanguage('fr')}
            >
              <Text
                style={[
                  styles.langButtonText,
                  defaultLanguage === 'fr' && styles.langButtonTextActive,
                ]}
              >
                FR
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="notifications" size={24} color="#2E7D32" />
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Notifications</Text>
              <Text style={styles.settingDescription}>
                Get health tips and reminders
              </Text>
            </View>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: '#BDBDBD', true: '#81C784' }}
            thumbColor={notificationsEnabled ? '#2E7D32' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System</Text>

        <TouchableOpacity style={styles.settingItem} onPress={checkApiHealth}>
          <View style={styles.settingInfo}>
            <MaterialCommunityIcons name="cloud-check" size={24} color="#2E7D32" />
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>API Status</Text>
              <Text style={styles.settingDescription}>
                {loadingStatus
                  ? 'Checking...'
                  : apiStatus
                  ? `${apiStatus.status} - ${apiStatus.message}`
                  : 'Tap to check'}
              </Text>
            </View>
          </View>
          <Ionicons name="refresh" size={20} color="#757575" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={clearCache}>
          <View style={styles.settingInfo}>
            <Ionicons name="trash-outline" size={24} color="#F44336" />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingLabel, { color: '#F44336' }]}>
                Clear Cache
              </Text>
              <Text style={styles.settingDescription}>
                Remove all saved data
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#757575" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resources</Text>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => openLink('https://github.com/iws3/Medical-AI-Assistant---Production-Ready-Healthcare-Application')}
        >
          <View style={styles.settingInfo}>
            <MaterialCommunityIcons name="github" size={24} color="#212121" />
            <Text style={styles.settingLabel}>GitHub Repository</Text>
          </View>
          <Ionicons name="open-outline" size={20} color="#757575" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => openLink('https://medical-ai-assistant-production-ready.onrender.com/docs')}
        >
          <View style={styles.settingInfo}>
            <Ionicons name="document-text" size={24} color="#2E7D32" />
            <Text style={styles.settingLabel}>API Documentation</Text>
          </View>
          <Ionicons name="open-outline" size={20} color="#757575" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => openLink('https://ai.google.dev/')}
        >
          <View style={styles.settingInfo}>
            <MaterialCommunityIcons name="robot" size={24} color="#4285F4" />
            <Text style={styles.settingLabel}>Powered by Gemini AI</Text>
          </View>
          <Ionicons name="open-outline" size={20} color="#757575" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>What is MediCare AI?</Text>
          <Text style={styles.infoText}>
            MediCare AI is a free medical assistant that helps you understand medical
            information, analyze health records, and search trusted medical research.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Important Disclaimer</Text>
          <Text style={styles.infoText}>
            This app provides information only and is not a substitute for professional
            medical advice, diagnosis, or treatment. Always seek the advice of qualified
            healthcare providers with any questions you may have.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Tech Stack</Text>
          <Text style={styles.infoText}>
            • Frontend: React Native + Expo{'\n'}
            • Backend: FastAPI + Python{'\n'}
            • AI: Google Gemini 2.0{'\n'}
            • Framework: LangChain{'\n'}
            • Research: Tavily AI
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with care for Cameroon</Text>
        <Text style={styles.footerText}>© 2025 MediCare AI</Text>
      </View>
    </ScrollView>
  );
}
export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
    color: '#757575',
  },
  section: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#757575',
    paddingHorizontal: 16,
    paddingVertical: 8,
    textTransform: 'uppercase',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#212121',
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  languageButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  langButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  langButtonActive: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  langButtonText: {
    fontSize: 14,
    color: '#757575',
    fontWeight: '600',
  },
  langButtonTextActive: {
    color: '#FFFFFF',
  },
  infoCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#424242',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9E9E9E',
    marginBottom: 4,
  },
});