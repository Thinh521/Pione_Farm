import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {sendMessageToAI} from '../../services/chatbotService';

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Xin chào! Tôi có thể giúp gì cho bạn?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'AI Bot',
          avatar: 'https://placeimg.com/140/140/tech',
        },
      },
    ]);
  }, []);

  const onSend = useCallback(async (newMessages = []) => {
    const userMessage = newMessages[0];
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [userMessage]),
    );

    setIsTyping(true);
    const aiText = await sendMessageToAI(userMessage.text);
    setIsTyping(false);

    const botMessage = {
      _id: new Date().getTime(),
      text: aiText,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'AI Bot',
        avatar: 'https://placeimg.com/140/140/tech',
      },
    };

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [botMessage]),
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{_id: 1}}
      isTyping={isTyping}
      showUserAvatar
      renderUsernameOnMessage
      placeholder="Nhập tin nhắn..."
    />
  );
};

export default ChatbotScreen;
