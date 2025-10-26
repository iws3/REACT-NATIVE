import axios from 'axios';

const API_BASE_URL = 'https://medical-ai-assistant-production-ready.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const medicareApi = {
  // Chat endpoint
  chat: async (message, language = 'en') => {
    const response = await api.post('/chat', {
      message,
      language,
    });
    return response.data;
  },

  // Analyze text endpoint
  analyzeText: async (text, context = '', language = 'en') => {
    const response = await api.post('/analyze-text', {
      text,
      context,
      language,
    });
    return response.data;
  },

  // Analyze image endpoint
  analyzeImage: async (imageUri, language = 'en') => {
    const formData = new FormData();
    
    const filename = imageUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';

    formData.append('file', {
      uri: imageUri,
      name: filename,
      type,
    });
    formData.append('language', language);

    const response = await api.post('/analyze-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Research endpoint
  research: async (query, maxResults = 5, language = 'en') => {
    const response = await api.post('/research', {
      query,
      max_results: maxResults,
      language,
    });
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};