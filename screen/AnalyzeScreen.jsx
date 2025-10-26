import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { medicareApi } from "../api/medicareApi";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const AnalyzeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [language, setLanguage] = useState("en");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSkeleton, setShowSkeleton] = useState(false);

  const translateX = useSharedValue(0);

  // ✅ Pick from gallery / files
  const pickImage = async () => {
    if (Platform.OS === "web") {
      const fileResult = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: true,
      });

      if (fileResult.type === "success") {
        setSelectedImage(fileResult.uri);
        setResult(null);
      }
    } else {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission Required", "Please allow access to your photos");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        setResult(null);
      }
    }
  };

  // ✅ Take photo (mobile only)
  const takePhoto = async () => {
    if (Platform.OS === "web") {
      Alert.alert("Not supported", "Camera capture is not available on web.");
      return;
    }

    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "Please allow camera access");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setResult(null);
    }
  };

 const analyzeImage = async () => {
  if (!selectedImage) return;

  setLoading(true);
  setShowSkeleton(true);
  setResult(null);

  try {
    const response = await medicareApi.analyzeImage(selectedImage, language);
    
    // Simulate minimum loading time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setResult(response);
    setShowSkeleton(false);
  } catch (error) {
    setShowSkeleton(false);
    
    // ✅ Better error handling with specific messages
    let errorMessage = "Failed to analyze image. Please try again.";
    
    if (error.message === "Network request failed" || !error.response) {
      errorMessage = "Network error. Please check your internet connection and try again.";
    } else if (error.response?.status === 408 || error.code === 'ECONNABORTED') {
      errorMessage = "Request timeout. The image might be too large. Try a smaller image.";
    } else if (error.response?.status === 500) {
      errorMessage = "Server error. Please try again in a few moments.";
    } else if (error.response?.status === 413) {
      errorMessage = "Image file is too large. Please select a smaller image.";
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    
    Alert.alert(
      "Analysis Failed", 
      errorMessage,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Retry", onPress: () => analyzeImage() }
      ]
    );
    
    console.error("Analysis error:", error);
  } finally {
    setLoading(false);
  }
};

  const resetAnalysis = () => {
    setSelectedImage(null);
    setResult(null);
    setShowSkeleton(false);
  };

  // ✅ Swipe gesture handler
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: (event) => {
      if (Math.abs(event.translationX) > width * 0.3) {
        translateX.value = withSpring(event.translationX > 0 ? width : -width);
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* ✅ Language Switcher */}
        <View style={styles.languageBar}>
          {["en", "fr"].map((lang) => (
            <TouchableOpacity
              key={lang}
              style={[
                styles.langButton,
                language === lang && styles.langButtonActive,
              ]}
              onPress={() => setLanguage(lang)}
            >
              <Text
                style={[
                  styles.langText,
                  language === lang && styles.langTextActive,
                ]}
              >
                {lang === "en" ? "🇺🇸 English" : "🇫🇷 Français"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>📄 Analyze Medical Records</Text>
          <Text style={styles.subtitle}>
            Upload or take a photo of lab results, prescriptions, or medical
            documents
          </Text>
        </View>

        {/* Action Buttons - Only show if no image selected */}
        {!selectedImage && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
              <MaterialCommunityIcons name="image-plus" size={32} color="#2E7D32" />
              <Text style={styles.actionButtonText}>Upload / Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
              <Ionicons name="camera" size={32} color="#2E7D32" />
              <Text style={styles.actionButtonText}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ✅ Image Preview Section */}
        {selectedImage && !result && (
          <View style={styles.previewContainer}>
            <View style={styles.previewHeader}>
              <Text style={styles.previewTitle}>📸 Selected Image</Text>
              <TouchableOpacity onPress={resetAnalysis}>
                <Ionicons name="close-circle" size={24} color="#EF4444" />
              </TouchableOpacity>
            </View>

            <Image source={{ uri: selectedImage }} style={styles.previewImage} />

            <TouchableOpacity
              style={styles.analyzeButton}
              onPress={analyzeImage}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <MaterialCommunityIcons name="brain" size={24} color="#fff" />
                  <Text style={styles.analyzeButtonText}>Analyze Document</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.changeImageButton} onPress={pickImage}>
              <Text style={styles.changeImageText}>Change Image</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ✅ Loading Skeleton with Swipe */}
        {showSkeleton && (
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.skeletonContainer, animatedStyle]}>
              <View style={styles.skeletonHeader}>
                <ActivityIndicator size="small" color="#34D399" />
                <Text style={styles.skeletonHeaderText}>
                  Analyzing your document...
                </Text>
              </View>

              <View style={styles.swipeHint}>
                <Ionicons name="swap-horizontal" size={20} color="#9CA3AF" />
                <Text style={styles.swipeHintText}>Swipe left or right</Text>
              </View>

              {[1, 2, 3, 4].map((item) => (
                <View key={item} style={styles.skeletonCard}>
                  <View style={styles.skeletonTitle} />
                  <View style={styles.skeletonLine} />
                  <View style={styles.skeletonLine} />
                  <View style={[styles.skeletonLine, { width: "70%" }]} />
                </View>
              ))}
            </Animated.View>
          </PanGestureHandler>
        )}

        {/* ✅ Results */}
        {result && !showSkeleton && (
          <View style={styles.resultContainer}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>✅ Analysis Results</Text>
              <TouchableOpacity onPress={resetAnalysis} style={styles.newAnalysisButton}>
                <Ionicons name="add-circle" size={20} color="#34D399" />
                <Text style={styles.newAnalysisText}>New Analysis</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📝 Extracted Text</Text>
              <Text style={styles.text}>{result.extracted_text}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📊 Summary</Text>
              <Text style={styles.text}>{result.analysis.summary}</Text>
            </View>

            {result.analysis.key_findings?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🔍 Key Findings</Text>
                {result.analysis.key_findings.map((finding, index) => (
                  <Text key={index} style={styles.listItem}>
                    • {finding}
                  </Text>
                ))}
              </View>
            )}

            {result.analysis.recommendations?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>💡 Recommendations</Text>
                {result.analysis.recommendations.map((rec, index) => (
                  <Text key={index} style={styles.listItem}>
                    • {rec}
                  </Text>
                ))}
              </View>
            )}

            {result.analysis.next_steps?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>➡️ Next Steps</Text>
                {result.analysis.next_steps.map((step, index) => (
                  <Text key={index} style={styles.listItem}>
                    {index + 1}. {step}
                  </Text>
                ))}
              </View>
            )}

            <View style={styles.disclaimer}>
              <Ionicons name="information-circle" size={20} color="#F57C00" />
              <Text style={styles.disclaimerText}>
                {result.analysis.disclaimer}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default AnalyzeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },

  languageBar: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  langButton: {
    marginHorizontal: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
  },
  langButtonActive: { backgroundColor: "#34D399" },
  langText: { fontSize: 14, color: "#374151" },
  langTextActive: { color: "#fff", fontWeight: "600" },

  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#111827", marginBottom: 6 },
  subtitle: { fontSize: 14, color: "#6B7280" },

  buttonContainer: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#34D399",
    borderStyle: "dashed",
  },
  actionButtonText: {
    marginTop: 8,
    color: "#34D399",
    fontWeight: "600",
    textAlign: "center",
  },

  // ✅ Image Preview Styles
  previewContainer: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  previewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  previewImage: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
    resizeMode: "contain",
    backgroundColor: "#F3F4F6",
  },
  analyzeButton: {
    backgroundColor: "#34D399",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  analyzeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  changeImageButton: {
    padding: 12,
    alignItems: "center",
  },
  changeImageText: {
    color: "#6B7280",
    fontSize: 14,
  },

  // ✅ Skeleton Loader Styles
  skeletonContainer: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  skeletonHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  skeletonHeaderText: {
    marginLeft: 8,
    color: "#6B7280",
    fontSize: 14,
  },
  swipeHint: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    marginBottom: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
  },
  swipeHintText: {
    marginLeft: 6,
    color: "#9CA3AF",
    fontSize: 12,
  },
  skeletonCard: {
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  skeletonTitle: {
    width: "40%",
    height: 18,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    marginBottom: 12,
  },
  skeletonLine: {
    width: "100%",
    height: 14,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    marginBottom: 8,
  },

  // Results
  resultContainer: { margin: 16 },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  newAnalysisButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0FDF4",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  newAnalysisText: {
    marginLeft: 4,
    color: "#34D399",
    fontWeight: "600",
    fontSize: 12,
  },
  section: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#34D399",
    marginBottom: 10,
  },
  text: { fontSize: 14, lineHeight: 20, color: "#374151" },
  listItem: { fontSize: 14, lineHeight: 20, color: "#374151", marginBottom: 6 },

  disclaimer: {
    flexDirection: "row",
    backgroundColor: "#FFF7ED",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  disclaimerText: { flex: 1, marginLeft: 8, fontSize: 12, color: "#F57C00" },
});