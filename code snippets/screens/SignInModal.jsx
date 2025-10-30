import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

export default function SignInModal({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  // Validation function
  const validateInputs = () => {
    const newErrors = {};

    // Username validation: must be at least 3 characters
    if (username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Email validation: simple regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = () => {
    if (validateInputs()) {
      // If validation passes, navigate to main app
      Alert.alert('Success', `Welcome, ${username}!`, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Drawer'),
        },
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.modalContent}>
        {/* Handle bar */}
        <View style={styles.handleBar} />

        {/* Header */}
        <Text style={styles.title}>Join FavGoaT</Text>
        <Text style={styles.subtitle}>
          Create your account to start collecting GOATs
        </Text>

        {/* Username Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={[styles.input, errors.username && styles.inputError]}
            placeholder="Enter your username"
            placeholderTextColor="#666"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (errors.username) {
                setErrors({ ...errors, username: null });
              }
            }}
            autoCapitalize="none"
          />
          {errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Enter your email"
            placeholderTextColor="#666"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) {
                setErrors({ ...errors, email: null });
              }
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleSignIn}
          activeOpacity={0.8}
        >
          <Text style={styles.signInButtonText}>Get Started</Text>
        </TouchableOpacity>

        {/* Terms and Privacy */}
        <Text style={styles.termsText}>
          By continuing, you agree to our{' '}
          <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
    minHeight: '60%',
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 4,
  },
  signInButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  link: {
    color: '#007AFF',
    fontWeight: '600',
  },
});