import axios from 'axios';
import {OPENAI_API_KEY} from '@env';

const openaiApi = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const fetchAIResponse = async message => {
  if (!OPENAI_API_KEY) {
    console.error('Thiếu OpenAI API Key');
    return 'Lỗi cấu hình hệ thống. Vui lòng kiểm tra API Key.';
  }

  try {
    const response = await openaiApi.post('/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        {role: 'system', content: 'Bạn là một trợ lý AI hữu ích.'},
        {role: 'user', content: message},
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    const choices = response?.data?.choices;
    const aiText = choices?.[0]?.message?.content;

    return aiText?.trim() || 'Tôi không có phản hồi phù hợp lúc này.';
  } catch (error) {
    console.error(
      'Lỗi khi gọi API OpenAI:',
      error?.response?.data || error.message,
    );

    if (error?.response?.status === 429) {
      return 'Bạn đang gửi quá nhanh. Vui lòng đợi một chút rồi thử lại.';
    }

    return 'Xin lỗi, tôi không thể phản hồi ngay lúc này.';
  }
};
