import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { medicareApi } from '../api/medicareApi';

const ResearchScreen=()=> {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [language, setLanguage] = useState('en');
  const [maxResults, setMaxResults] = useState(5);

  const searchResearch = async () => {
    if (!query.trim()) {
      Alert.alert('Error', 'Please enter a search query');
      return;
    }

    setLoading(true);
    setResults(null);

    try {
      const response = await medicareApi.research(query, maxResults, language);
      setResults(response);
    } catch (error) {
      Alert.alert('Error', 'Failed to search research. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Cannot open this URL');
    }
  };

  const suggestedTopics = [
    'diabetes treatment',
    'hypertension management',
    'COVID-19 vaccines',
    'mental health therapy',
    'cancer screening',
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.languageToggle}>
        <TouchableOpacity
          style={[styles.langButton, language === 'en' && styles.langButtonActive]}
          onPress={() => setLanguage('en')}
        >
          <Text style={[styles.langText, language === 'en' && styles.langTextActive]}>
            English
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.langButton, language === 'fr' && styles.langButtonActive]}
          onPress={() => setLanguage('fr')}
        >
          <Text style={[styles.langText, language === 'fr' && styles.langTextActive]}>
            Français
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Medical Research</Text>
        <Text style={styles.subtitle}>
          Search trusted medical sources for latest research and information
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons name="search" size={20} color="#757575" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Search medical research..."
            placeholderTextColor="#9E9E9E"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={searchResearch}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={20} color="#757575" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.resultsSelector}>
          <Text style={styles.resultsSelectorLabel}>Results:</Text>
          {[3, 5, 10].map(num => (
            <TouchableOpacity
              key={num}
              style={[
                styles.resultsButton,
                maxResults === num && styles.resultsButtonActive,
              ]}
              onPress={() => setMaxResults(num)}
            >
              <Text
                style={[
                  styles.resultsButtonText,
                  maxResults === num && styles.resultsButtonTextActive,
                ]}
              >
                {num}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.searchButton, !query.trim() && styles.searchButtonDisabled]}
          onPress={searchResearch}
          disabled={!query.trim() || loading}
        >
          <Text style={styles.searchButtonText}>
            {loading ? 'Searching...' : 'Search'}
          </Text>
        </TouchableOpacity>
      </View>

      {!results && !loading && (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Suggested Topics:</Text>
          <View style={styles.suggestionsGrid}>
            {suggestedTopics.map((topic, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionChip}
                onPress={() => {
                  setQuery(topic);
                  searchResearch();
                }}
              >
                <Text style={styles.suggestionText}>{topic}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text style={styles.loadingText}>Searching medical databases...</Text>
        </View>
      )}

      {results && (
        <View style={styles.resultsContainer}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <MaterialCommunityIcons name="lightbulb" size={24} color="#F57C00" />
              <Text style={styles.summaryTitle}>AI Summary</Text>
            </View>
            <Text style={styles.summaryText}>{results.summary}</Text>
          </View>

          <Text style={styles.resultsTitle}>
            Found {results.results.length} Research Articles
          </Text>

          {results.results.map((result, index) => (
            <View key={index} style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <View style={styles.scoreContainer}>
                  <MaterialCommunityIcons
                    name="chart-line"
                    size={16}
                    color="#2E7D32"
                  />
                  <Text style={styles.scoreText}>
                    {(result.score * 100).toFixed(0)}% relevant
                  </Text>
                </View>
              </View>

              <Text style={styles.resultTitle}>{result.title}</Text>
              <Text style={styles.resultContent} numberOfLines={4}>
                {result.content}
              </Text>

              <TouchableOpacity
                style={styles.readMoreButton}
                onPress={() => openLink(result.url)}
              >
                <Text style={styles.readMoreText}>Read Full Article</Text>
                <Ionicons name="open-outline" size={16} color="#2E7D32" />
              </TouchableOpacity>

              <Text style={styles.resultUrl} numberOfLines={1}>
                {result.url}
              </Text>
            </View>
          ))}

          <View style={styles.disclaimer}>
            <Ionicons name="information-circle" size={20} color="#F57C00" />
            <Text style={styles.disclaimerText}>
              Results from trusted medical sources including PubMed, WHO, CDC, and major medical journals.
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

export default ResearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  languageToggle: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  langButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: '#F5F5F5',
  },
  langButtonActive: {
    backgroundColor: '#2E7D32',
  },
  langText: {
    textAlign: 'center',
    color: '#757575',
    fontWeight: '600',
  },
  langTextActive: {
    color: '#FFFFFF',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#212121',
  },
  resultsSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultsSelectorLabel: {
    fontSize: 14,
    color: '#757575',
    marginRight: 8,
  },
  resultsButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  resultsButtonActive: {
    backgroundColor: '#2E7D32',
  },
  resultsButtonText: {
    fontSize: 14,
    color: '#757575',
    fontWeight: '600',
  },
  resultsButtonTextActive: {
    color: '#FFFFFF',
  },
  searchButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  searchButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  suggestionsContainer: {
    padding: 16,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 12,
  },
  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionChip: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2E7D32',
  },
  suggestionText: {
    color: '#1B5E20',
    fontSize: 14,
    fontWeight: '500',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#757575',
    fontSize: 14,
  },
  resultsContainer: {
    padding: 16,
  },
  summaryCard: {
    backgroundColor: '#FFF8E1',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F57C00',
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    marginLeft: 8,
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#424242',
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 12,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreText: {
    fontSize: 12,
    color: '#1B5E20',
    fontWeight: '600',
    marginLeft: 4,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
    lineHeight: 22,
  },
  resultContent: {
    fontSize: 14,
    lineHeight: 20,
    color: '#616161',
    marginBottom: 12,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  readMoreText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  resultUrl: {
    fontSize: 12,
    color: '#9E9E9E',
    fontStyle: 'italic',
  },
  disclaimer: {
    flexDirection: 'row',
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  disclaimerText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    color: '#F57C00',
    lineHeight: 16,
  },
});