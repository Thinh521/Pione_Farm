import axios from 'axios';
import {OPENAI_API_KEY} from '@env';

export const sendMessageToAI = async userInput => {
  try {
    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{role: 'user', content: userInput}],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      },
    );
    return res.data.choices?.[0]?.message?.content?.trim();
  } catch (error) {
    if (error.response?.status === 429) {
      return 'Hệ thống đang quá tải, vui lòng thử lại sau.';
    }
    return 'Đã xảy ra lỗi khi kết nối đến AI.';
  }
};
