import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import styles from './ChatbotStyles'

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Chào bạn! Tôi là AI Assistant. Tôi có thể giúp gì cho bạn hôm nay?',
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString('vi-VN'),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const scrollRef = useRef(null);

  // Mô phỏng phản hồi AI
  const aiResponses = [
    'Tôi hiểu bạn đang hỏi về điều đó. Đây là câu trả lời của tôi...',
    'Đó là một câu hỏi thú vị! Theo như tôi biết...',
    'Tôi sẽ giúp bạn giải quyết vấn đề này...',
    'Cảm ơn bạn đã hỏi. Tôi nghĩ rằng...',
    'Đây là thông tin mà bạn cần...',
    'Tôi có thể giúp bạn với điều đó. Hãy xem...',
    'Theo kinh nghiệm của tôi...',
    'Đó là một cách tiếp cận hay. Tôi khuyên bạn...',
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('vi-VN'),
      };

      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      setIsTyping(true);

      // Mô phỏng thời gian phản hồi của AI
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString('vi-VN'),
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1000 + Math.random() * 2000);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInputText('Đây là tin nhắn từ voice input');
      }, 3000);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: 'Chào bạn! Tôi là AI Assistant. Tôi có thể giúp gì cho bạn hôm nay?',
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString('vi-VN'),
      },
    ]);
  };

  const renderMessage = message => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.sender === 'user'
          ? styles.userMessageContainer
          : styles.aiMessageContainer,
      ]}>
      <View
        style={[
          styles.avatar,
          message.sender === 'user' ? styles.userAvatar : styles.aiAvatar,
        ]}>
        <Text style={styles.avatarText}>
          {message.sender === 'user' ? 'U' : 'AI'}
        </Text>
      </View>
      <View
        style={[
          styles.messageBubble,
          message.sender === 'user' ? styles.userBubble : styles.aiBubble,
        ]}>
        <Text
          style={[
            styles.messageText,
            message.sender === 'user'
              ? styles.userMessageText
              : styles.aiMessageText,
          ]}>
          {message.text}
        </Text>
        <Text
          style={[
            styles.timestamp,
            message.sender === 'user'
              ? styles.userTimestamp
              : styles.aiTimestamp,
          ]}>
          {message.timestamp}
        </Text>
      </View>
    </View>
  );

  const renderTypingIndicator = () => (
    <View style={[styles.messageContainer, styles.aiMessageContainer]}>
      <View style={[styles.avatar, styles.aiAvatar]}>
        <Text style={styles.avatarText}>AI</Text>
      </View>
      <View style={[styles.messageBubble, styles.aiBubble]}>
        <View style={styles.typingContainer}>
          <View style={[styles.typingDot, styles.typingDot1]} />
          <View style={[styles.typingDot, styles.typingDot2]} />
          <View style={[styles.typingDot, styles.typingDot3]} />
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.headerAvatar}>
              <Text style={styles.headerAvatarText}>AI</Text>
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>AI Assistant</Text>
              <View style={styles.statusContainer}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Đang hoạt động</Text>
              </View>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerButton} onPress={clearChat}>
              <Text style={styles.headerButtonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Text style={styles.headerButtonText}>⚙</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Chat Messages */}
      <ScrollView
        ref={scrollRef}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}>
        {messages.map(renderMessage)}
        {isTyping && renderTypingIndicator()}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputContent}>
          <TouchableOpacity
            style={[styles.micButton, isRecording && styles.micButtonActive]}
            onPress={toggleRecording}>
            <Text
              style={[
                styles.micButtonText,
                isRecording && styles.micButtonTextActive,
              ]}>
              {isRecording ? '🎤' : '🎙️'}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Nhập tin nhắn của bạn..."
            placeholderTextColor="#999"
            multiline
            maxLength={500}
          />

          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputText.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSendMessage}
            disabled={!inputText.trim()}>
            <Text style={styles.sendButtonText}>➤</Text>
          </TouchableOpacity>
        </View>

        {isRecording && (
          <View style={styles.recordingIndicator}>
            <Text style={styles.recordingText}>🎤 Đang ghi âm...</Text>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatbotScreen;
