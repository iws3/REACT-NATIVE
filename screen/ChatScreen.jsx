import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { medicareApi } from "../api/medicareApi";

const TypingIndicator = () => {
  const [dot1] = useState(new Animated.Value(0));
  const [dot2] = useState(new Animated.Value(0));
  const [dot3] = useState(new Animated.Value(0));

  React.useEffect(() => {
    const animate = (dot, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animate(dot1, 0);
    animate(dot2, 200);
    animate(dot3, 400);
  }, []);

  const translateY = (animatedValue) => ({
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -8],
        }),
      },
    ],
  });

  return (
    <View style={styles.typingContainer}>
      <Animated.View style={[styles.typingDot, translateY(dot1)]} />
      <Animated.View style={[styles.typingDot, translateY(dot2)]} />
      <Animated.View style={[styles.typingDot, translateY(dot3)]} />
    </View>
  );
};

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en");
  const [isTyping, setIsTyping] = useState(false);

  const languages = [
    { code: "en", label: "🇺🇸 English" },
    { code: "fr", label: "🇫🇷 French" },
    { code: "es", label: "🇪🇸 Spanish" },
    { code: "de", label: "🇩🇪 German" },
  ];

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await medicareApi.chat(input, language);
      const botMessage = {
        text: response.response,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        text: "⚠️ Something went wrong. Please try again.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "user" ? styles.userBubble : styles.botBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.languageBar}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.langButton,
              language === lang.code && styles.langButtonActive,
            ]}
            onPress={() => setLanguage(lang.code)}
          >
            <Text
              style={[
                styles.langText,
                language === lang.code && styles.langTextActive,
              ]}
            >
              {lang.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.chatContainer}
        ListFooterComponent={
          isTyping ? (
            <View style={[styles.messageBubble, styles.botBubble]}>
              <TypingIndicator />
            </View>
          ) : null
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          placeholderTextColor="#aaa"
          onSubmitEditing={sendMessage}
          returnKeyType="send"
          editable={!isTyping}
        />
        <TouchableOpacity
          style={[styles.sendButton, isTyping && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={isTyping}
        >
          <Text style={styles.sendText}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  chatContainer: {
    padding: 15,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
    marginBottom: 8,
    maxWidth: "75%",
  },
  userBubble: {
    backgroundColor: "#34D399",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: "#D1FAE5",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: "#111827",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    marginRight: 8,
    color: "#111827",
  },
  sendButton: {
    backgroundColor: "#34D399",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  sendButtonDisabled: {
    backgroundColor: "#9CA3AF",
    opacity: 0.6,
  },
  sendText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  languageBar: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  langButton: {
    marginHorizontal: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
  },
  langButtonActive: {
    backgroundColor: "#34D399",
  },
  langText: {
    fontSize: 14,
    color: "#374151",
  },
  langTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  typingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#34D399",
    marginHorizontal: 3,
  },
});