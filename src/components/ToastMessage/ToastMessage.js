import {showMessage} from 'react-native-flash-message';
import {scale} from '~/utils/scaling';

const defaultStyle = {
  marginTop: scale(10),
  paddingVertical: scale(16),
};

const resolveIcon = icon => {
  if (icon === false || icon === undefined || icon === null) return undefined;
  return () => (typeof icon === 'function' ? icon() : icon);
};

export const showSuccessMessage = ({
  message = 'Thành công',
  description = '',
  icon,
  duration = 3000,
  customStyle = {},
}) => {
  showMessage({
    message,
    description,
    type: 'success',
    icon: resolveIcon(icon),
    duration,
    floating: true,
    style: {
      ...defaultStyle,
      ...customStyle,
    },
  });
};

export const showErrorMessage = ({
  message = 'Lỗi',
  description = '',
  icon,
  duration = 3000,
  customStyle = {},
}) => {
  showMessage({
    message,
    description,
    type: 'danger',
    icon: resolveIcon(icon),
    duration,
    floating: true,
    style: {
      ...defaultStyle,
      ...customStyle,
    },
  });
};

export const showWarningMessage = ({
  message = 'Cảnh báo',
  description = '',
  icon,
  duration = 3000,
  customStyle = {},
}) => {
  showMessage({
    message,
    description,
    type: 'warning',
    icon: resolveIcon(icon),
    duration,
    floating: true,
    style: {
      ...defaultStyle,
      ...customStyle,
    },
  });
};
