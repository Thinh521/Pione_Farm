import {ERROR_MESSAGE_MAP} from './errorMessages';

export const getTranslatedError = error => {
  const rawMessage = error?.message || '';
  return ERROR_MESSAGE_MAP[rawMessage] || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
};
